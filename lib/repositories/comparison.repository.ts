import { Comparison } from '../../types/tool';
import { prisma } from '../prisma';
import { mapComparison } from '../repository-shared';

export class ComparisonRepository {
  public static async getComparisons(options: { includeUnpublished?: boolean } = {}): Promise<Comparison[]> {
    const comparisons = await prisma.comparison.findMany({
      where: options.includeUnpublished ? {} : { publishStatus: 'published' },
      include: { tool1: true, tool2: true, features: true },
    });
    return comparisons.map(mapComparison);
  }

  public static async getComparisonBySlug(slug: string): Promise<Comparison | undefined> {
    const existing = await prisma.comparison.findFirst({
      where: {
        slug: { equals: slug, mode: 'insensitive' },
        publishStatus: 'published',
      },
      include: { tool1: true, tool2: true, features: true },
    });
    if (existing) return mapComparison(existing);

    return undefined;
  }

  // --- Preserve existing wrapper API for backward compatibility ---

  static async getAll(): Promise<Comparison[]> {
    return ComparisonRepository.getComparisons();
  }

  static async getBySlug(slug: string): Promise<Comparison | null> {
    const comparison = await ComparisonRepository.getComparisonBySlug(slug);
    return comparison || null;
  }
}
