import { ToolSnapshot, ToolSnapshotData, SourceUrls, PricingTier, UsageLimits } from '../../types/monitoring';
import { prisma } from '../prisma';

export class ToolSnapshotRepository {
  private static mapToolSnapshot(row: any): ToolSnapshot {
    return {
      id: row.id,
      toolId: row.toolId,
      snapshotAt: row.snapshotAt.toISOString(),
      pricingModel: row.pricingModel,
      monthlyPrice: row.monthlyPrice,
      hasFreeTrial: row.hasFreeTrial,
      hasFreeTier: row.hasFreeTier,
      pricingTiers: row.pricingTiers as PricingTier[],
      features: row.features,
      platforms: row.platforms,
      integrations: row.integrations,
      usageLimits: row.usageLimits as UsageLimits | null,
      languages: row.languages,
      exportFormats: row.exportFormats,
      limitations: row.limitations,
      productName: row.productName || '',
      targetAudience: row.targetAudience || [],
      discontinuedFeatures: row.discontinuedFeatures || [],
      policyChanges: row.policyChanges || [],
      sourceUrls: row.sourceUrls as SourceUrls,
    };
  }

  public static async getLatestSnapshot(toolId: string): Promise<ToolSnapshot | null> {
    const row = await prisma.toolSnapshot.findFirst({
      where: { toolId },
      orderBy: { snapshotAt: 'desc' },
    });
    return row ? ToolSnapshotRepository.mapToolSnapshot(row) : null;
  }

  public static async createSnapshot(
    toolId: string,
    data: ToolSnapshotData,
    sourceUrls: SourceUrls
  ): Promise<ToolSnapshot> {
    const created = await prisma.toolSnapshot.create({
      data: {
        toolId,
        pricingModel: data.pricingModel,
        monthlyPrice: data.monthlyPrice,
        hasFreeTrial: data.hasFreeTrial,
        hasFreeTier: data.hasFreeTier,
        pricingTiers: data.pricingTiers as any,
        features: data.features,
        platforms: data.platforms,
        integrations: data.integrations,
        usageLimits: data.usageLimits as any,
        languages: data.languages,
        exportFormats: data.exportFormats,
        limitations: data.limitations,
        productName: data.productName || '',
        targetAudience: data.targetAudience || [],
        discontinuedFeatures: data.discontinuedFeatures || [],
        policyChanges: data.policyChanges || [],
        sourceUrls: sourceUrls as any,
      },
    });
    return ToolSnapshotRepository.mapToolSnapshot(created);
  }

  public static async getSnapshotHistory(
    toolId: string,
    limit = 10
  ): Promise<ToolSnapshot[]> {
    const rows = await prisma.toolSnapshot.findMany({
      where: { toolId },
      orderBy: { snapshotAt: 'desc' },
      take: limit,
    });
    return rows.map((row) => ToolSnapshotRepository.mapToolSnapshot(row));
  }
}
