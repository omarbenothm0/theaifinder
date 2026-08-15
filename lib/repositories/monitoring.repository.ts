import { ToolMonitoringCheck, MonitoringCheckStatus } from '../../types/monitoring';
import { prisma } from '../prisma';

export class MonitoringRepository {
  private static mapMonitoringCheck(row: any): ToolMonitoringCheck {
    return {
      id: row.id,
      toolId: row.toolId,
      checkedAt: row.checkedAt.toISOString(),
      status: row.status as MonitoringCheckStatus,
      httpStatus: row.httpStatus ?? null,
      finalUrl: row.finalUrl ?? null,
      responseTimeMs: row.responseTimeMs ?? null,
      isHttps: row.isHttps ?? null,
      redirectCount: row.redirectCount ?? null,
      errorCode: row.errorCode ?? null,
      errorMessage: row.errorMessage ?? null,
      requestedUrl: row.requestedUrl,
      createdAt: row.createdAt.toISOString(),
    };
  }

  public static async createMonitoringCheck(input: {
    toolId: string;
    status: MonitoringCheckStatus;
    httpStatus?: number | null;
    finalUrl?: string | null;
    responseTimeMs?: number | null;
    isHttps?: boolean | null;
    redirectCount?: number | null;
    errorCode?: string | null;
    errorMessage?: string | null;
    requestedUrl: string;
  }): Promise<ToolMonitoringCheck> {
    const created = await prisma.toolMonitoringCheck.create({
      data: {
        toolId: input.toolId,
        status: input.status,
        httpStatus: input.httpStatus ?? null,
        finalUrl: input.finalUrl ?? null,
        responseTimeMs: input.responseTimeMs ?? null,
        isHttps: input.isHttps ?? null,
        redirectCount: input.redirectCount ?? null,
        errorCode: input.errorCode ?? null,
        errorMessage: input.errorMessage ?? null,
        requestedUrl: input.requestedUrl,
      },
    });
    return MonitoringRepository.mapMonitoringCheck(created);
  }

  public static async getLatestMonitoringChecksForTools(
    toolIds: string[]
  ): Promise<Map<string, ToolMonitoringCheck>> {
    if (toolIds.length === 0) return new Map();

    const checks = await prisma.toolMonitoringCheck.findMany({
      where: { toolId: { in: toolIds } },
      orderBy: { checkedAt: 'desc' },
    });

    const map = new Map<string, ToolMonitoringCheck>();
    for (const row of checks) {
      if (!map.has(row.toolId)) {
        map.set(row.toolId, MonitoringRepository.mapMonitoringCheck(row));
      }
    }
    return map;
  }

  public static async getLastSuccessfulMonitoringCheck(
    toolId: string
  ): Promise<ToolMonitoringCheck | undefined> {
    const row = await prisma.toolMonitoringCheck.findFirst({
      where: { toolId, status: 'success' },
      orderBy: { checkedAt: 'desc' },
    });
    return row ? MonitoringRepository.mapMonitoringCheck(row) : undefined;
  }

  public static async getMonitoringChecksForTool(
    toolId: string,
    limit = 10
  ): Promise<ToolMonitoringCheck[]> {
    const rows = await prisma.toolMonitoringCheck.findMany({
      where: { toolId },
      orderBy: { checkedAt: 'desc' },
      take: limit,
    });
    return rows.map((row) => MonitoringRepository.mapMonitoringCheck(row));
  }
}
