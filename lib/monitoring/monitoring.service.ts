import { Tool } from '../../types/tool';
import {
  ToolMonitoringCheck,
  ToolMonitoringSummary,
} from '../../types/monitoring';
import { dbRepository } from '../dbRepository';
import { checkWebsiteHealth } from './website-health.service';
import {
  deriveMonitoringSignal,
  getVerificationFreshness,
} from './freshness.service';
import { validateMonitoringUrl } from './url-validation';
import { getMonitoringConfig } from './config';

export class MonitoringService {
  static buildSummary(
    tool: Tool,
    latestCheck: ToolMonitoringCheck | null,
    lastSuccessfulCheck: ToolMonitoringCheck | null
  ): ToolMonitoringSummary {
    const { freshness, daysSinceVerification } = getVerificationFreshness(tool);
    const signal = deriveMonitoringSignal(
      freshness,
      latestCheck,
      lastSuccessfulCheck?.checkedAt ?? null
    );

    return {
      toolId: tool.id,
      toolSlug: tool.slug,
      signal,
      freshness,
      daysSinceVerification,
      lastCheckedAt: latestCheck?.checkedAt ?? null,
      lastSuccessfulCheckAt: lastSuccessfulCheck?.checkedAt ?? null,
      latestCheck,
    };
  }

  static async getSummariesForTools(tools: Tool[]): Promise<ToolMonitoringSummary[]> {
    const toolIds = tools.map((t) => t.id);
    const latestMap = await dbRepository.getLatestMonitoringChecksForTools(toolIds);

    const summaries = await Promise.all(
      tools.map(async (tool) => {
        const latestCheck = latestMap.get(tool.id) ?? null;
        const lastSuccessful =
          latestCheck?.status === 'success'
            ? latestCheck
            : await dbRepository.getLastSuccessfulMonitoringCheck(tool.id);
        return MonitoringService.buildSummary(tool, latestCheck, lastSuccessful ?? null);
      })
    );

    return summaries;
  }

  static async getSummaryForTool(toolId: string): Promise<ToolMonitoringSummary | null> {
    const tool = await dbRepository.getToolById(toolId, { includeUnpublished: true });
    if (!tool) return null;

    const latestMap = await dbRepository.getLatestMonitoringChecksForTools([toolId]);
    const latestCheck = latestMap.get(toolId) ?? null;
    const lastSuccessful =
      latestCheck?.status === 'success'
        ? latestCheck
        : await dbRepository.getLastSuccessfulMonitoringCheck(toolId);

    return MonitoringService.buildSummary(tool, latestCheck, lastSuccessful ?? null);
  }

  /**
   * Run a website health check for a tool already in the database.
   * URL is always loaded from the tool record's official websiteUrl — never affiliateUrl,
   * and never from user-supplied URLs.
   */
  static async runWebsiteCheckForTool(toolId: string): Promise<{
    summary: ToolMonitoringSummary;
    check: ToolMonitoringCheck;
  }> {
    const tool = await dbRepository.getToolById(toolId, { includeUnpublished: true });
    if (!tool) {
      throw new Error('Tool not found');
    }

    const urlValidation = validateMonitoringUrl(tool.websiteUrl);
    if (urlValidation.valid === false) {
      const check = await dbRepository.createMonitoringCheck({
        toolId: tool.id,
        status: 'invalid_url',
        errorCode: urlValidation.errorCode,
        errorMessage: urlValidation.reason,
        requestedUrl: tool.websiteUrl,
        responseTimeMs: 0,
        redirectCount: 0,
      });
      const summary = await MonitoringService.getSummaryForTool(toolId);
      return { summary: summary!, check };
    }

    const health = await checkWebsiteHealth(urlValidation.normalizedUrl);
    const check = await dbRepository.createMonitoringCheck({
      toolId: tool.id,
      status: health.status,
      httpStatus: health.httpStatus ?? null,
      finalUrl: health.finalUrl ?? null,
      responseTimeMs: health.responseTimeMs,
      isHttps: health.isHttps ?? null,
      redirectCount: health.redirectCount,
      errorCode: health.errorCode ?? null,
      errorMessage: health.errorMessage ?? null,
      requestedUrl: health.requestedUrl,
    });

    const summary = await MonitoringService.getSummaryForTool(toolId);
    return { summary: summary!, check };
  }

  static async runWebsiteCheckBatch(toolIds: string[]): Promise<{
    results: Array<{ toolId: string; ok: boolean; error?: string; check?: ToolMonitoringCheck }>;
  }> {
    const config = getMonitoringConfig();
    const uniqueIds = [...new Set(toolIds)].slice(0, config.maxBatchSize);
    const results: Array<{ toolId: string; ok: boolean; error?: string; check?: ToolMonitoringCheck }> =
      [];

    for (const toolId of uniqueIds) {
      try {
        const { check } = await MonitoringService.runWebsiteCheckForTool(toolId);
        results.push({ toolId, ok: true, check });
      } catch (error) {
        results.push({
          toolId,
          ok: false,
          error: error instanceof Error ? error.message : 'Check failed',
        });
      }
    }

    return { results };
  }
}
