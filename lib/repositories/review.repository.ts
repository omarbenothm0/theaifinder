import { Review, ReviewStatus } from '../../types/tool';
import { prisma } from '../prisma';
import { mapReview, mapApprovedReviewAggregate, PUBLISHED_TOOL_WHERE } from '../repository-shared';

export class ReviewRepository {
  public static async getApprovedReviewsForTool(toolSlug: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: {
        status: 'approved',
        tool: { slug: { equals: toolSlug, mode: 'insensitive' }, ...PUBLISHED_TOOL_WHERE },
      },
      include: { tool: true },
      orderBy: { createdAt: 'desc' },
    });
    return reviews.map((r) => mapReview(r));
  }

  /** @deprecated Use getApprovedReviewsForTool for public reads */
  public static async getReviewsForTool(toolSlug: string): Promise<Review[]> {
    return ReviewRepository.getApprovedReviewsForTool(toolSlug);
  }

  public static async getReviewsForModeration(options: {
    status?: ReviewStatus | 'all';
    limit?: number;
  } = {}): Promise<Review[]> {
    const where =
      options.status && options.status !== 'all' ? { status: options.status } : {};

    const reviews = await prisma.review.findMany({
      where,
      include: { tool: true },
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
      take: options.limit ?? 200,
    });

    return reviews.map((r) => mapReview(r, { includePrivate: true }));
  }

  public static async getReviewById(id: string): Promise<Review | undefined> {
    const review = await prisma.review.findUnique({
      where: { id },
      include: { tool: true },
    });
    return review ? mapReview(review, { includePrivate: true }) : undefined;
  }

  public static async getPendingReviewCount(): Promise<number> {
    return prisma.review.count({ where: { status: 'pending' } });
  }

  /**
   * Approved visitor-review aggregates from the Review table.
   * Public tool reads apply these via enrichToolsWithPublicReviewSignals().
   */
  public static async getApprovedReviewAggregates(toolId: string): Promise<{ rating: number; count: number }> {
    const agg = await prisma.review.aggregate({
      where: { toolId, status: 'approved' },
      _avg: { rating: true },
      _count: { rating: true },
    });
    return mapApprovedReviewAggregate(agg._count.rating, agg._avg.rating);
  }

  public static async addReview(input: {
    toolSlug: string;
    authorName: string;
    authorRole?: string;
    rating: number;
    comment: string;
    email?: string;
  }): Promise<Review> {
    const tool = await prisma.tool.findFirst({
      where: { slug: { equals: input.toolSlug, mode: 'insensitive' }, ...PUBLISHED_TOOL_WHERE },
    });
    if (!tool) {
      throw new Error(`Tool not found: ${input.toolSlug}`);
    }

    if (input.email) {
      const duplicate = await prisma.review.findFirst({
        where: {
          toolId: tool.id,
          email: input.email,
          status: { in: ['pending', 'approved'] },
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      });
      if (duplicate) {
        throw new Error('A review for this tool was already submitted recently.');
      }
    }

    const created = await prisma.review.create({
      data: {
        toolId: tool.id,
        authorName: input.authorName,
        authorRole: input.authorRole ?? '',
        rating: input.rating,
        comment: input.comment,
        email: input.email ?? null,
        status: 'pending',
        date: new Date(),
        verifiedUser: false,
      },
      include: { tool: true },
    });

    return mapReview(created);
  }

  public static async moderateReview(
    id: string,
    status: ReviewStatus,
    moderatedBy: string,
    moderationNotes?: string
  ): Promise<Review | undefined> {
    const existing = await prisma.review.findUnique({ where: { id } });
    if (!existing) return undefined;

    const updated = await prisma.review.update({
      where: { id },
      data: {
        status,
        moderatedAt: new Date(),
        moderatedBy,
        moderationNotes: moderationNotes?.trim() || null,
      },
      include: { tool: true },
    });

    return mapReview(updated, { includePrivate: true });
  }

  public static async deleteReview(id: string): Promise<boolean> {
    const existing = await prisma.review.findUnique({
      where: { id },
      include: { tool: true },
    });
    if (!existing) return false;

    await prisma.review.delete({ where: { id } });
    return true;
  }
}
