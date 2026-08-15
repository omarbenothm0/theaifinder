import { Tool, ToolFilterOptions } from '../../types/tool';
import { prisma } from '../prisma';
import {
  mapTool,
  PUBLISHED_TOOL_WHERE,
  TOOL_INCLUDE,
  syncToolSources,
  syncToolPricingTiers,
  syncToolAlternatives,
  getApprovedReviewAggregatesByToolIds,
  enrichToolsWithPublicReviewSignals,
} from '../repository-shared';
import {
  sortPublicTools,
  applyPublicReviewSignals,
} from '../seo/public-review-signals';

export class ToolRepository {
  public static async enrichToolWithPublicReviewSignals(tool: Tool): Promise<Tool> {
    const agg = await prisma.review.aggregate({
      where: { toolId: tool.id, status: 'approved' },
      _avg: { rating: true },
      _count: { rating: true },
    });
    const aggregate = {
      count: agg._count.rating,
      rating: agg._count.rating > 0 && agg._avg.rating != null 
        ? parseFloat(agg._avg.rating.toFixed(1)) 
        : 0,
    };
    return applyPublicReviewSignals(tool, aggregate);
  }

  public static async getTools(options: ToolFilterOptions = {}) {
    const where: any = {};

    if (!options.includeUnpublished) {
      where.publishStatus = 'published';
    }

    if (options.search && options.search.trim()) {
      const q = options.search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { tagline: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { tags: { has: q } },
      ];
    }

    if (options.category && options.category !== 'all') {
      const cat = await prisma.category.findFirst({
        where: {
          OR: [{ id: options.category }, { slug: options.category.toLowerCase() }],
        },
      });
      if (cat) where.categoryId = cat.id;
    }

    if (options.pricing && options.pricing !== 'all') {
      if (options.pricing === 'Free') {
        where.OR = [
          ...(where.OR ?? []),
          { pricingModel: 'Free' },
          { monthlyPrice: 0 },
        ];
      } else {
        where.pricingModel = options.pricing;
      }
    }

    if (options.hasFreeOption) {
      where.OR = [
        ...(where.OR ?? []),
        { pricingModel: 'Free' },
        { pricingModel: 'Freemium' },
        { hasFreeTrial: true },
      ];
    }

    if (options.persona && options.persona !== 'all') {
      where.targetUsers = { has: options.persona };
    }

    if (options.hasApi) where.hasApi = true;
    if (options.hasMobileApp) where.hasMobileApp = true;
    if (options.hasExtension) where.hasExtension = true;

    const page = options.page || 1;
    const limit = options.limit || 50;

    if (!options.includeUnpublished) {
      const allResults = await prisma.tool.findMany({
        where,
        include: TOOL_INCLUDE,
      });

      let tools = await enrichToolsWithPublicReviewSignals(allResults.map(mapTool));

      if (options.minRating) {
        tools = tools.filter((tool) => tool.rating >= options.minRating!);
      }

      tools = sortPublicTools(tools, options.sortBy);
      const total = tools.length;

      return {
        tools: tools.slice((page - 1) * limit, page * limit),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }

    if (options.minRating) where.rating = { gte: options.minRating };

    let orderBy: any = [{ featured: 'desc' }, { reviewCount: 'desc' }];
    switch (options.sortBy) {
      case 'rating':
        orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }];
        break;
      case 'newest':
        orderBy = [{ createdAt: 'desc' }];
        break;
      case 'price-asc':
        orderBy = [{ monthlyPrice: 'asc' }];
        break;
      case 'price-desc':
        orderBy = [{ monthlyPrice: 'desc' }];
        break;
      case 'popular':
      default:
        orderBy = [{ featured: 'desc' }, { reviewCount: 'desc' }];
        break;
    }

    const total = await prisma.tool.count({ where });

    const results = await prisma.tool.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: TOOL_INCLUDE,
    });

    return {
      tools: results.map(mapTool),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  public static async getToolBySlug(
    slug: string,
    options: { includeUnpublished?: boolean } = {}
  ): Promise<Tool | undefined> {
    const tool = await prisma.tool.findFirst({
      where: {
        slug: { equals: slug, mode: 'insensitive' },
        ...(options.includeUnpublished ? {} : PUBLISHED_TOOL_WHERE),
      },
      include: TOOL_INCLUDE,
    });
    if (!tool) return undefined;

    const mapped = mapTool(tool);
    if (options.includeUnpublished) return mapped;
    return ToolRepository.enrichToolWithPublicReviewSignals(mapped);
  }

  public static async getFeaturedTools(limit = 12): Promise<Tool[]> {
    const results = await prisma.tool.findMany({
      where: { ...PUBLISHED_TOOL_WHERE, featured: true },
      orderBy: [{ featured: 'desc' }, { lastVerifiedDate: 'desc' }],
      take: limit,
      include: TOOL_INCLUDE,
    });
    return enrichToolsWithPublicReviewSignals(results.map(mapTool));
  }

  public static async getTrendingTools(limit = 12): Promise<Tool[]> {
    const results = await prisma.tool.findMany({
      where: { ...PUBLISHED_TOOL_WHERE, trending: true },
      orderBy: [{ trending: 'desc' }, { lastVerifiedDate: 'desc' }],
      take: limit,
      include: TOOL_INCLUDE,
    });
    return enrichToolsWithPublicReviewSignals(results.map(mapTool));
  }

  public static async getToolsPageForSitemap(page: number, limit: number) {
    const where = PUBLISHED_TOOL_WHERE;
    const total = await prisma.tool.count({ where });
    const results = await prisma.tool.findMany({
      where,
      orderBy: { slug: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { category: true },
    });
    return {
      tools: results.map(mapTool),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  public static async createTool(data: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tool> {
    const existingSlug = await prisma.tool.findFirst({
      where: { slug: { equals: data.slug, mode: 'insensitive' } },
    });
    if (existingSlug) {
      throw new Error(`A tool with slug "${data.slug}" already exists`);
    }

    const created = await prisma.tool.create({
      data: {
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        tagline: data.tagline,
        description: data.description,
        categoryId: data.categoryId,
        pricingModel: data.pricingModel,
        monthlyPrice: data.monthlyPrice ?? null,
        hasFreeTrial: data.hasFreeTrial,
        companyName: data.companyName ?? null,
        lastVerifiedDate: new Date(),
        verifiedBy: data.verifiedBy ?? null,
        pricingSource: data.pricingSource ?? null,
        featureSource: data.featureSource ?? null,
        reviewState: data.reviewState ?? null,
        reviewRequestedAt: data.reviewRequestedAt ? new Date(data.reviewRequestedAt) : null,
        reviewAssignedTo: data.reviewAssignedTo ?? null,
        reviewNotes: data.reviewNotes ?? null,
        websiteUrl: data.websiteUrl,
        affiliateUrl: data.affiliateUrl?.trim() || null,
        affiliateEnabled: data.affiliateEnabled ?? false,
        affiliateProgram: data.affiliateProgram?.trim() || null,
        rating: data.rating ?? 0,
        reviewCount: data.reviewCount ?? 0,
        verified: data.verified,
        featured: data.featured,
        trending: data.trending,
        hasApi: data.hasApi,
        hasMobileApp: data.hasMobileApp,
        hasExtension: data.hasExtension,
        publishStatus: data.publishStatus ?? 'published',
        tags: data.tags ?? [],
        features: data.features ?? [],
        pros: data.pros ?? [],
        cons: data.cons ?? [],
        screenshots: data.screenshots ?? [],
        platforms: data.platforms ?? [],
        targetUsers: data.targetUsers ?? [],
      },
      include: TOOL_INCLUDE,
    });

    await syncToolSources(created.id, data.sources);
    await syncToolPricingTiers(created.id, data.pricingTiers);
    await syncToolAlternatives(created.id, data.alternatives);

    const withRelations = await prisma.tool.findUnique({
      where: { id: created.id },
      include: TOOL_INCLUDE,
    });
    return mapTool(withRelations!);
  }

  /** Updates lastVerifiedDate after a successful website health check. */
  public static async touchToolLastVerifiedDate(toolId: string): Promise<void> {
    await prisma.tool.update({
      where: { id: toolId },
      data: { lastVerifiedDate: new Date() },
    });
  }

  public static async updateTool(slug: string, updates: Partial<Tool>): Promise<Tool | undefined> {
    const existing = await prisma.tool.findFirst({
      where: { slug: { equals: slug, mode: 'insensitive' } },
    });
    if (!existing) return undefined;

    const data: any = {};
    if (updates.name !== undefined) data.name = updates.name;
    if (updates.slug !== undefined) data.slug = updates.slug;
    if (updates.logo !== undefined) data.logo = updates.logo;
    if (updates.tagline !== undefined) data.tagline = updates.tagline;
    if (updates.description !== undefined) data.description = updates.description;
    if (updates.categoryId !== undefined) data.categoryId = updates.categoryId;
    if (updates.pricingModel !== undefined) data.pricingModel = updates.pricingModel;
    if (updates.monthlyPrice !== undefined) data.monthlyPrice = updates.monthlyPrice;
    if (updates.hasFreeTrial !== undefined) data.hasFreeTrial = updates.hasFreeTrial;
    if (updates.companyName !== undefined) data.companyName = updates.companyName;
    if (updates.verifiedBy !== undefined) data.verifiedBy = updates.verifiedBy;
    if (updates.pricingSource !== undefined) data.pricingSource = updates.pricingSource;
    if (updates.featureSource !== undefined) data.featureSource = updates.featureSource;
    if (updates.reviewState !== undefined) data.reviewState = updates.reviewState;
    if (updates.reviewRequestedAt !== undefined)
      data.reviewRequestedAt = updates.reviewRequestedAt ? new Date(updates.reviewRequestedAt) : null;
    if (updates.reviewAssignedTo !== undefined) data.reviewAssignedTo = updates.reviewAssignedTo;
    if (updates.reviewNotes !== undefined) data.reviewNotes = updates.reviewNotes;
    if (updates.websiteUrl !== undefined) data.websiteUrl = updates.websiteUrl;
    if (updates.affiliateUrl !== undefined)
      data.affiliateUrl = updates.affiliateUrl?.trim() || null;
    if (updates.affiliateEnabled !== undefined) data.affiliateEnabled = updates.affiliateEnabled;
    if (updates.affiliateProgram !== undefined)
      data.affiliateProgram = updates.affiliateProgram?.trim() || null;
    if (updates.verified !== undefined) data.verified = updates.verified;
    if (updates.featured !== undefined) data.featured = updates.featured;
    if (updates.trending !== undefined) data.trending = updates.trending;
    if (updates.hasApi !== undefined) data.hasApi = updates.hasApi;
    if (updates.hasMobileApp !== undefined) data.hasMobileApp = updates.hasMobileApp;
    if (updates.hasExtension !== undefined) data.hasExtension = updates.hasExtension;
    if (updates.publishStatus !== undefined) data.publishStatus = updates.publishStatus;
    if (updates.tags !== undefined) data.tags = updates.tags;
    if (updates.features !== undefined) data.features = updates.features;
    if (updates.pros !== undefined) data.pros = updates.pros;
    if (updates.cons !== undefined) data.cons = updates.cons;
    if (updates.screenshots !== undefined) data.screenshots = updates.screenshots;
    if (updates.platforms !== undefined) data.platforms = updates.platforms;
    if (updates.targetUsers !== undefined) data.targetUsers = updates.targetUsers;
    if (updates.rating !== undefined) data.rating = updates.rating;
    if (updates.reviewCount !== undefined) data.reviewCount = updates.reviewCount;

    data.lastVerifiedDate = new Date();

    await prisma.tool.update({
      where: { id: existing.id },
      data,
    });

    await syncToolSources(existing.id, updates.sources);
    await syncToolPricingTiers(existing.id, updates.pricingTiers);
    await syncToolAlternatives(existing.id, updates.alternatives);

    const updated = await prisma.tool.findUnique({
      where: { id: existing.id },
      include: TOOL_INCLUDE,
    });
    return updated ? mapTool(updated) : undefined;
  }

  public static async deleteTool(slug: string): Promise<boolean> {
    const existing = await prisma.tool.findFirst({
      where: { slug: { equals: slug, mode: 'insensitive' } },
    });
    if (!existing) return false;
    await prisma.tool.delete({ where: { id: existing.id } });
    return true;
  }

  public static async getToolById(
    id: string,
    options: { includeUnpublished?: boolean } = {}
  ): Promise<Tool | undefined> {
    const tool = await prisma.tool.findFirst({
      where: {
        id,
        ...(options.includeUnpublished ? {} : PUBLISHED_TOOL_WHERE),
      },
      include: TOOL_INCLUDE,
    });
    return tool ? mapTool(tool) : undefined;
  }

  // --- Preserve existing wrapper API for backward compatibility ---
  
  static async getAll(options?: ToolFilterOptions) {
    return ToolRepository.getTools(options || {});
  }

  static async getBySlug(slug: string): Promise<Tool | null> {
    const tool = await ToolRepository.getToolBySlug(slug);
    return tool || null;
  }

  static async getFeatured(): Promise<Tool[]> {
    return ToolRepository.getFeaturedTools();
  }

  static async getTrending(): Promise<Tool[]> {
    return ToolRepository.getTrendingTools();
  }

  static async getAlternatives(slug: string): Promise<Tool[]> {
    const tool = await ToolRepository.getToolBySlug(slug);
    if (!tool || !tool.alternatives) return [];
    const results = await Promise.all(
      tool.alternatives.map((altSlug) => ToolRepository.getToolBySlug(altSlug))
    );
    return results.filter((t): t is Tool => Boolean(t));
  }

  static async save(tool: Partial<Tool>): Promise<Tool> {
    if (tool.slug) {
      const existing = await ToolRepository.getToolBySlug(tool.slug);
      if (existing) {
        const updated = await ToolRepository.updateTool(tool.slug, tool);
        if (updated) return updated;
      }
    }
    return ToolRepository.createTool(tool as any);
  }

  static async delete(idOrSlug: string): Promise<boolean> {
    return ToolRepository.deleteTool(idOrSlug);
  }
}
