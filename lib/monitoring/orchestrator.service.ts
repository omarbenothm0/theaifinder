import { Tool } from '../../types/tool';
import { ToolRepository } from '../repositories/tool.repository';
import { FieldExtractorService } from './field-extractor.service';
import { ToolSnapshotRepository } from '../repositories/tool-snapshot.repository';
import { ChangeDetectorService } from './change-detector.service';
import { ToolChangeRecordRepository } from '../repositories/tool-change.repository';

// Initial tool slugs for Phase 1 - configurable, can be expanded later
const INITIAL_TOOL_SLUGS = [
  'motion',
  'otter-ai',
  'fireflies-ai',
  'fathom',
  'zoom-ai-my-notes',
];

export interface MonitoringResult {
  toolSlug: string;
  toolName: string;
  success: boolean;
  error?: string;
  changesDetected: number;
}

export interface MonitoringSummary {
  toolsTotal: number;
  toolsChecked: number;
  toolsSkipped: number;
  toolsFailed: number;
  changesDetected: number;
  results: MonitoringResult[];
}

export class MonitoringOrchestratorService {
  static async runMonitoring(toolSlugs?: string[]): Promise<MonitoringSummary> {
    const slugsToMonitor = toolSlugs || INITIAL_TOOL_SLUGS;
    const results: MonitoringResult[] = [];

    for (const slug of slugsToMonitor) {
      const result = await this.monitorTool(slug);
      results.push(result);
    }

    const summary: MonitoringSummary = {
      toolsTotal: slugsToMonitor.length,
      toolsChecked: results.filter((r) => r.success).length,
      toolsSkipped: 0,
      toolsFailed: results.filter((r) => !r.success).length,
      changesDetected: results.reduce((sum, r) => sum + r.changesDetected, 0),
      results,
    };

    return summary;
  }

  private static async monitorTool(slug: string): Promise<MonitoringResult> {
    try {
      const tool = await ToolRepository.getToolBySlug(slug);
      if (!tool) {
        return {
          toolSlug: slug,
          toolName: slug,
          success: false,
          error: 'Tool not found',
          changesDetected: 0,
        };
      }

      // Skip if monitoring is disabled
      if (tool.monitoringEnabled === false) {
        return {
          toolSlug: slug,
          toolName: tool.name,
          success: true,
          error: 'Monitoring disabled',
          changesDetected: 0,
        };
      }

      // Extract facts from official sources
      const { data, sourceUrls } = await FieldExtractorService.extractFacts(tool);

      // Get previous snapshot
      const previousSnapshot = await ToolSnapshotRepository.getLatestSnapshot(tool.id);

      // Detect changes
      const previousData = previousSnapshot
        ? {
            pricingModel: previousSnapshot.pricingModel as 'Free' | 'Freemium' | 'Paid',
            monthlyPrice: previousSnapshot.monthlyPrice,
            hasFreeTrial: previousSnapshot.hasFreeTrial,
            hasFreeTier: previousSnapshot.hasFreeTier,
            pricingTiers: previousSnapshot.pricingTiers,
            features: previousSnapshot.features,
            platforms: previousSnapshot.platforms,
            integrations: previousSnapshot.integrations,
            usageLimits: previousSnapshot.usageLimits,
            languages: previousSnapshot.languages,
            exportFormats: previousSnapshot.exportFormats,
            limitations: previousSnapshot.limitations,
            productName: previousSnapshot.productName || '',
            targetAudience: previousSnapshot.targetAudience || [],
            discontinuedFeatures: previousSnapshot.discontinuedFeatures || [],
            policyChanges: previousSnapshot.policyChanges || [],
          }
        : null;

      const detectedChanges = ChangeDetectorService.detectChanges(
        previousData,
        data,
        previousSnapshot?.sourceUrls,
        sourceUrls
      );

      // Store new snapshot
      const newSnapshot = await ToolSnapshotRepository.createSnapshot(
        tool.id,
        data,
        sourceUrls
      );

      // Store detected changes
      let changesCreated = 0;
      for (const change of detectedChanges) {
        await ToolChangeRecordRepository.createChange(
          tool.id,
          newSnapshot.id,
          change.category,
          change.fieldName,
          change.previousValue,
          change.currentValue,
          sourceUrls.pricing || sourceUrls.features || sourceUrls.product,
          change.severity
        );
        changesCreated++;
      }

      return {
        toolSlug: slug,
        toolName: tool.name,
        success: true,
        changesDetected: changesCreated,
      };
    } catch (error) {
      return {
        toolSlug: slug,
        toolName: slug,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        changesDetected: 0,
      };
    }
  }
}
