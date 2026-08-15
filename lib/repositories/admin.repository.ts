import { prisma } from '../prisma';

export class AdminRepository {
  public static async getAdminStats() {
    const [
      totalTools,
      totalCategories,
      totalPersonas,
      totalComparisons,
      totalReviews,
      pendingReviews,
      verifiedTools,
      featuredTools,
    ] = await Promise.all([
      prisma.tool.count(),
      prisma.category.count(),
      prisma.persona.count(),
      prisma.comparison.count(),
      prisma.review.count({ where: { status: 'approved' } }),
      prisma.review.count({ where: { status: 'pending' } }),
      prisma.tool.count({ where: { verified: true } }),
      prisma.tool.count({ where: { featured: true } }),
    ]);

    return {
      totalTools,
      totalCategories,
      totalPersonas,
      totalComparisons,
      totalReviews,
      pendingReviews,
      verifiedTools,
      featuredTools,
    };
  }
}
