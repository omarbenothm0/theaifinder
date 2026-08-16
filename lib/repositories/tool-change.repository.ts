import { ToolChangeRecord, ChangeStatus, ChangeCategory, ChangeSeverity } from '../../types/monitoring';
import { prisma } from '../prisma';

export interface ToolChangeRecordWithTool extends ToolChangeRecord {
  toolName: string;
  toolSlug: string;
}

export class ToolChangeRecordRepository {
  private static mapToolChangeRecord(row: any): ToolChangeRecord {
    return {
      id: row.id,
      toolId: row.toolId,
      snapshotId: row.snapshotId,
      category: row.category as ChangeCategory,
      fieldName: row.fieldName,
      previousValue: row.previousValue,
      currentValue: row.currentValue,
      sourceUrl: row.sourceUrl,
      severity: row.severity as ChangeSeverity,
      status: row.status as ChangeStatus,
      detectedAt: row.detectedAt.toISOString(),
    };
  }

  private static mapToolChangeRecordWithTool(row: any): ToolChangeRecordWithTool {
    return {
      id: row.id,
      toolId: row.toolId,
      snapshotId: row.snapshotId,
      category: row.category as ChangeCategory,
      fieldName: row.fieldName,
      previousValue: row.previousValue,
      currentValue: row.currentValue,
      sourceUrl: row.sourceUrl,
      severity: row.severity as ChangeSeverity,
      status: row.status as ChangeStatus,
      detectedAt: row.detectedAt.toISOString(),
      toolName: row.tool.name,
      toolSlug: row.tool.slug,
    };
  }

  public static async createChange(
    toolId: string,
    snapshotId: string,
    category: ChangeCategory,
    fieldName: string,
    previousValue: string | null,
    currentValue: string | null,
    sourceUrl: string | null,
    severity: ChangeSeverity = 'info'
  ): Promise<ToolChangeRecord> {
    const created = await prisma.toolChangeRecord.create({
      data: {
        toolId,
        snapshotId,
        category,
        fieldName,
        previousValue,
        currentValue,
        sourceUrl,
        severity,
        status: 'needs_review',
      },
    });
    return ToolChangeRecordRepository.mapToolChangeRecord(created);
  }

  public static async getChangesForTool(toolId: string): Promise<ToolChangeRecord[]> {
    const rows = await prisma.toolChangeRecord.findMany({
      where: { toolId },
      orderBy: { detectedAt: 'desc' },
    });
    return rows.map((row) => ToolChangeRecordRepository.mapToolChangeRecord(row));
  }

  public static async getPendingChanges(): Promise<ToolChangeRecord[]> {
    const rows = await prisma.toolChangeRecord.findMany({
      where: { status: 'needs_review' },
      orderBy: { detectedAt: 'desc' },
    });
    return rows.map((row) => ToolChangeRecordRepository.mapToolChangeRecord(row));
  }

  public static async getAllChanges(limit = 100): Promise<ToolChangeRecordWithTool[]> {
    const rows = await prisma.toolChangeRecord.findMany({
      orderBy: { detectedAt: 'desc' },
      take: limit,
      include: {
        tool: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return rows.map((row) => ToolChangeRecordRepository.mapToolChangeRecordWithTool(row));
  }

  public static async markChangeReviewed(
    changeId: string,
    notes?: string
  ): Promise<ToolChangeRecord> {
    const updated = await prisma.toolChangeRecord.update({
      where: { id: changeId },
      data: {
        status: 'reviewed',
      },
    });
    return ToolChangeRecordRepository.mapToolChangeRecord(updated);
  }

  public static async markChangeResolved(changeId: string): Promise<ToolChangeRecord> {
    const updated = await prisma.toolChangeRecord.update({
      where: { id: changeId },
      data: {
        status: 'resolved',
      },
    });
    return ToolChangeRecordRepository.mapToolChangeRecord(updated);
  }
}
