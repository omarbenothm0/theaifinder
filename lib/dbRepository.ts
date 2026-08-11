import {
  Tool,
  Category,
  Persona,
  Comparison,
  Review,
  Article,
  ToolFilterOptions,
  FinderAnswer
} from '../types/tool';
import { ToolMonitoringCheck, MonitoringCheckStatus } from '../types/monitoring';
import { prisma } from './prisma';

// --- Mapping helpers: Prisma model -> app-facing Tool/Category/etc shape ---

function mapTool(t: any): Tool {
  return {
    id: t.id,
    name: t.name,
    slug: t.slug,
    logo: t.logo,
    tagline: t.tagline,
    description: t.description,
    categoryId: t.categoryId,
    categorySlug: t.category?.slug ?? '',
    categoryName: t.category?.name ?? '',
    tags: t.tags ?? [],
    pricingModel: t.pricingModel,
    monthlyPrice: t.monthlyPrice ?? undefined,
    hasFreeTrial: t.hasFreeTrial,
    companyName: t.companyName ?? undefined,
    lastVerifiedDate: t.lastVerifiedDate
      ? t.lastVerifiedDate.toISOString().split('T')[0]
      : undefined,
    verifiedBy: t.verifiedBy ?? undefined,
    sources: t.sources
      ? t.sources.map((s: any) => ({
          type: s.type,
          url: s.url,
          verifiedAt: s.verifiedAt.toISOString(),
          notes: s.notes ?? undefined,
        }))
      : undefined,
    pricingSource: t.pricingSource ?? undefined,
    featureSource: t.featureSource ?? undefined,
    reviewState: t.reviewState ?? undefined,
    reviewRequestedAt: t.reviewRequestedAt
      ? t.reviewRequestedAt.toISOString()
      : undefined,
    reviewAssignedTo: t.reviewAssignedTo ?? undefined,
    reviewNotes: t.reviewNotes ?? undefined,
    pricingTiers: t.pricingTiers
      ? t.pricingTiers.map((pt: any) => ({
          name: pt.name,
          price: pt.price,
          billingPeriod: pt.billingPeriod,
          features: pt.features,
        }))
      : undefined,
    platforms: t.platforms ?? [],
    websiteUrl: t.websiteUrl,
    features: t.features ?? [],
    pros: t.pros ?? [],
    cons: t.cons ?? [],
    rating: t.rating,
    reviewCount: t.reviewCount,
    screenshots: t.screenshots ?? [],
    alternatives: t.alternativesFrom
      ? t.alternativesFrom.map((a: any) => a.targetTool?.slug).filter(Boolean)
      : [],
    targetUsers: t.targetUsers ?? [],
    verified: t.verified,
    featured: t.featured,
    trending: t.trending,
    hasApi: t.hasApi,
    hasMobileApp: t.hasMobileApp,
    hasExtension: t.hasExtension,
    publishStatus: t.publishStatus ?? 'published',
    createdAt: t.createdAt ? t.createdAt.toISOString() : undefined,
    updatedAt: t.updatedAt ? t.updatedAt.toISOString() : undefined,
  };
}

function mapCategory(c: any, toolCount = 0): Category {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    iconName: c.iconName,
    description: c.description,
    longDescription: c.longDescription,
    toolCount,
    faqs: c.faqs
      ? c.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))
      : [],
    seoTitle: c.seoTitle,
    seoDescription: c.seoDescription,
    publishStatus: c.publishStatus ?? 'published',
  };
}

function mapPersona(p: any): Persona {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    iconName: p.iconName,
    subtitle: p.subtitle,
    description: p.description,
    targetRole: p.targetRole,
    keyBenefits: p.keyBenefits ?? [],
    topToolSlugs: p.topTools
      ? p.topTools
          .sort((a: any, b: any) => a.order - b.order)
          .map((tt: any) => tt.tool?.slug)
          .filter(Boolean)
      : [],
    faqs: p.faqs
      ? p.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))
      : [],
    publishStatus: p.publishStatus ?? 'published',
  };
}

function mapComparison(c: any): Comparison {
  return {
    id: c.id,
    slug: c.slug,
    tool1Slug: c.tool1?.slug ?? '',
    tool2Slug: c.tool2?.slug ?? '',
    title: c.title,
    overview: c.overview,
    bestFor1: c.bestFor1,
    bestFor2: c.bestFor2,
    verdict: c.verdict,
    winnerSlug: c.winnerSlug,
    featureBreakdown: c.features
      ? c.features.map((f: any) => ({
          feature: f.feature,
          tool1Value: f.tool1Value,
          tool2Value: f.tool2Value,
          winnerSlug: f.winnerSlug,
        }))
      : [],
    isCurated: true,
    publishStatus: c.publishStatus ?? 'published',
  };
}

function mapReview(r: any): Review {
  return {
    id: r.id,
    toolSlug: r.tool?.slug ?? '',
    authorName: r.authorName,
    authorRole: r.authorRole,
    rating: r.rating,
    comment: r.comment,
    date: r.date.toISOString().split('T')[0],
    verifiedUser: r.verifiedUser,
  };
}

function mapArticle(a: any): Article {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    author: a.author,
    readTime: a.readTime,
    publishedAt: a.publishedAt.toISOString(),
    relatedCategorySlug: a.relatedCategorySlug ?? undefined,
    relatedToolSlugs: a.relatedToolSlugs ?? [],
    publishStatus: a.publishStatus ?? 'published',
  };
}

const PUBLISHED_TOOL_WHERE = { publishStatus: 'published' as const };

const TOOL_INCLUDE = {
  category: true,
  sources: true,
  pricingTiers: true,
  alternativesFrom: { include: { targetTool: true } },
};

class DBRepository {
  // --- Tools CRUD & Querying ---
  public async getTools(options: ToolFilterOptions = {}) {
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
    const page = options.page || 1;
    const limit = options.limit || 50;

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

  public async getToolBySlug(
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
    return tool ? mapTool(tool) : undefined;
  }

  public async getFeaturedTools(limit = 12): Promise<Tool[]> {
    const results = await prisma.tool.findMany({
      where: { ...PUBLISHED_TOOL_WHERE, featured: true },
      orderBy: [{ reviewCount: 'desc' }, { rating: 'desc' }],
      take: limit,
      include: TOOL_INCLUDE,
    });
    return results.map(mapTool);
  }

  public async getTrendingTools(limit = 12): Promise<Tool[]> {
    const results = await prisma.tool.findMany({
      where: { ...PUBLISHED_TOOL_WHERE, trending: true },
      orderBy: [{ reviewCount: 'desc' }, { rating: 'desc' }],
      take: limit,
      include: TOOL_INCLUDE,
    });
    return results.map(mapTool);
  }

  public async getToolsPageForSitemap(page: number, limit: number) {
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

  public async createTool(data: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tool> {
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
        lastVerifiedDate: data.lastVerifiedDate ? new Date(data.lastVerifiedDate) : null,
        verifiedBy: data.verifiedBy ?? null,
        pricingSource: data.pricingSource ?? null,
        featureSource: data.featureSource ?? null,
        reviewState: data.reviewState ?? null,
        reviewRequestedAt: data.reviewRequestedAt ? new Date(data.reviewRequestedAt) : null,
        reviewAssignedTo: data.reviewAssignedTo ?? null,
        reviewNotes: data.reviewNotes ?? null,
        websiteUrl: data.websiteUrl,
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
    return mapTool(created);
  }

  public async updateTool(slug: string, updates: Partial<Tool>): Promise<Tool | undefined> {
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
    if (updates.lastVerifiedDate !== undefined)
      data.lastVerifiedDate = updates.lastVerifiedDate ? new Date(updates.lastVerifiedDate) : null;
    if (updates.verifiedBy !== undefined) data.verifiedBy = updates.verifiedBy;
    if (updates.pricingSource !== undefined) data.pricingSource = updates.pricingSource;
    if (updates.featureSource !== undefined) data.featureSource = updates.featureSource;
    if (updates.reviewState !== undefined) data.reviewState = updates.reviewState;
    if (updates.reviewRequestedAt !== undefined)
      data.reviewRequestedAt = updates.reviewRequestedAt ? new Date(updates.reviewRequestedAt) : null;
    if (updates.reviewAssignedTo !== undefined) data.reviewAssignedTo = updates.reviewAssignedTo;
    if (updates.reviewNotes !== undefined) data.reviewNotes = updates.reviewNotes;
    if (updates.websiteUrl !== undefined) data.websiteUrl = updates.websiteUrl;
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

    const updated = await prisma.tool.update({
      where: { id: existing.id },
      data,
      include: TOOL_INCLUDE,
    });
    return mapTool(updated);
  }

  public async deleteTool(slug: string): Promise<boolean> {
    const existing = await prisma.tool.findFirst({
      where: { slug: { equals: slug, mode: 'insensitive' } },
    });
    if (!existing) return false;
    await prisma.tool.delete({ where: { id: existing.id } });
    return true;
  }

  // --- Categories ---
  public async getCategories(options: { includeUnpublished?: boolean } = {}): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: options.includeUnpublished ? {} : { publishStatus: 'published' },
      include: {
        faqs: true,
        _count: {
          select: {
            tools: {
              where: PUBLISHED_TOOL_WHERE,
            },
          },
        },
      },
    });
    return categories.map((c: any) => mapCategory(c, c._count.tools));
  }

  public async getCategoryBySlug(
    slug: string,
    options: { includeUnpublished?: boolean } = {}
  ): Promise<Category | undefined> {
    const cat = await prisma.category.findFirst({
      where: {
        slug: { equals: slug, mode: 'insensitive' },
        ...(options.includeUnpublished ? {} : { publishStatus: 'published' }),
      },
      include: {
        faqs: true,
        _count: {
          select: {
            tools: {
              where: PUBLISHED_TOOL_WHERE,
            },
          },
        },
      },
    });
    return cat ? mapCategory(cat, (cat as any)._count.tools) : undefined;
  }

  // --- Personas ---
  public async getPersonas(options: { includeUnpublished?: boolean } = {}): Promise<Persona[]> {
    const personas = await prisma.persona.findMany({
      where: options.includeUnpublished ? {} : { publishStatus: 'published' },
      include: { faqs: true, topTools: { include: { tool: true } } },
    });
    return personas.map(mapPersona);
  }

  public async getPersonaBySlug(
    slug: string,
    options: { includeUnpublished?: boolean } = {}
  ): Promise<Persona | undefined> {
    const persona = await prisma.persona.findFirst({
      where: {
        slug: { equals: slug, mode: 'insensitive' },
        ...(options.includeUnpublished ? {} : { publishStatus: 'published' }),
      },
      include: { faqs: true, topTools: { include: { tool: true } } },
    });
    return persona ? mapPersona(persona) : undefined;
  }

  public async getPersonaLinkedToolCounts(): Promise<Record<string, number>> {
    const tools = await prisma.tool.findMany({
      where: PUBLISHED_TOOL_WHERE,
      select: { targetUsers: true },
    });
    const counts: Record<string, number> = {};
    for (const tool of tools) {
      for (const slug of tool.targetUsers) {
        counts[slug] = (counts[slug] ?? 0) + 1;
      }
    }
    return counts;
  }

  public async getPersonaLinkedToolCount(slug: string): Promise<number> {
    return prisma.tool.count({
      where: {
        ...PUBLISHED_TOOL_WHERE,
        targetUsers: { has: slug },
      },
    });
  }

  // --- Comparisons ---
  public async getComparisons(options: { includeUnpublished?: boolean } = {}): Promise<Comparison[]> {
    const comparisons = await prisma.comparison.findMany({
      where: options.includeUnpublished ? {} : { publishStatus: 'published' },
      include: { tool1: true, tool2: true, features: true },
    });
    return comparisons.map(mapComparison);
  }

  public async getComparisonBySlug(slug: string): Promise<Comparison | undefined> {
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

  // --- Reviews ---
  public async getReviewsForTool(toolSlug: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: { tool: { slug: { equals: toolSlug, mode: 'insensitive' } } },
      include: { tool: true },
      orderBy: { createdAt: 'desc' },
    });
    return reviews.map(mapReview);
  }

  public async addReview(review: Omit<Review, 'id' | 'date'>): Promise<Review> {
    const tool = await prisma.tool.findFirst({
      where: { slug: { equals: review.toolSlug, mode: 'insensitive' } },
    });
    if (!tool) {
      throw new Error(`Tool not found: ${review.toolSlug}`);
    }

    const created = await prisma.review.create({
      data: {
        toolId: tool.id,
        authorName: review.authorName,
        authorRole: review.authorRole,
        rating: review.rating,
        comment: review.comment,
        date: new Date(),
        verifiedUser: review.verifiedUser,
      },
      include: { tool: true },
    });

    const agg = await prisma.review.aggregate({
      where: { toolId: tool.id },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await prisma.tool.update({
      where: { id: tool.id },
      data: {
        rating: agg._avg.rating ? parseFloat(agg._avg.rating.toFixed(1)) : tool.rating,
        reviewCount: agg._count.rating,
      },
    });

    return mapReview(created);
  }

  // --- Interactive Finder Evaluator ---
  public async evaluateFinder(answer: FinderAnswer) {
    const { useCase, role, budgetPreference } = answer;

    const allTools = await prisma.tool.findMany({
      where: PUBLISHED_TOOL_WHERE,
      include: TOOL_INCLUDE,
    });

    const scored = allTools.map((toolRaw: any) => {
      const tool = mapTool(toolRaw);
      let score = 50;
      const matchReasons: string[] = [];

      if (
        tool.categoryId.includes(useCase) ||
        tool.categoryName.toLowerCase().includes(useCase) ||
        tool.tags.some((t) => t.toLowerCase().includes(useCase))
      ) {
        score += 35;
        matchReasons.push(`Direct match for ${useCase} workflows`);
      }

      if (tool.targetUsers.includes(role)) {
        score += 25;
        matchReasons.push(`Optimized specifically for ${role.replace('-', ' ')}`);
      }

      if (budgetPreference === 'free-only' && (tool.pricingModel === 'Free' || tool.monthlyPrice === 0)) {
        score += 20;
        matchReasons.push('100% Free plan available');
      } else if (budgetPreference === 'freemium' && (tool.pricingModel === 'Freemium' || tool.hasFreeTrial)) {
        score += 15;
        matchReasons.push('Includes free trial or freemium tier');
      }

      if (tool.verified) score += 5;
      if (tool.rating >= 4.8) score += 10;

      return { tool, score: Math.min(100, score), matchReasons };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 5);
  }

  // --- Admin Stats ---
  public async getAdminStats() {
    const [totalTools, totalCategories, totalPersonas, totalComparisons, totalReviews, verifiedTools, featuredTools] =
      await Promise.all([
        prisma.tool.count(),
        prisma.category.count(),
        prisma.persona.count(),
        prisma.comparison.count(),
        prisma.review.count(),
        prisma.tool.count({ where: { verified: true } }),
        prisma.tool.count({ where: { featured: true } }),
      ]);

    return {
      totalTools,
      totalCategories,
      totalPersonas,
      totalComparisons,
      totalReviews,
      verifiedTools,
      featuredTools,
    };
  }

  // --- Tool monitoring ---
  private mapMonitoringCheck(row: any): ToolMonitoringCheck {
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

  public async createMonitoringCheck(input: {
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
    return this.mapMonitoringCheck(created);
  }

  public async getLatestMonitoringChecksForTools(
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
        map.set(row.toolId, this.mapMonitoringCheck(row));
      }
    }
    return map;
  }

  public async getLastSuccessfulMonitoringCheck(
    toolId: string
  ): Promise<ToolMonitoringCheck | undefined> {
    const row = await prisma.toolMonitoringCheck.findFirst({
      where: { toolId, status: 'success' },
      orderBy: { checkedAt: 'desc' },
    });
    return row ? this.mapMonitoringCheck(row) : undefined;
  }

  public async getMonitoringChecksForTool(
    toolId: string,
    limit = 10
  ): Promise<ToolMonitoringCheck[]> {
    const rows = await prisma.toolMonitoringCheck.findMany({
      where: { toolId },
      orderBy: { checkedAt: 'desc' },
      take: limit,
    });
    return rows.map((row) => this.mapMonitoringCheck(row));
  }

  public async getToolById(
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

  // --- Articles ---
  public async getArticles(): Promise<Article[]> {
    const articles = await prisma.article.findMany({ orderBy: { publishedAt: 'desc' } });
    return articles.map(mapArticle);
  }

  public async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const article = await prisma.article.findFirst({
      where: { slug: { equals: slug, mode: 'insensitive' } },
    });
    return article ? mapArticle(article) : undefined;
  }
}

export const dbRepository = new DBRepository();