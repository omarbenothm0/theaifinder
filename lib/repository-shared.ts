import {
  Tool,
  Category,
  Persona,
  Comparison,
  Review,
  ToolSource,
  PricingTier,
  UseCase,
  ToolWithUseCaseFit,
  UseCaseFitTier,
  Article,
} from '../types/tool';
import {
  ApprovedReviewAggregate,
  applyPublicReviewSignals,
  EMPTY_APPROVED_REVIEW_AGGREGATE,
} from './seo/public-review-signals';
import { prisma } from './prisma';

// --- Shared Constants ---

export const PUBLISHED_TOOL_WHERE = { publishStatus: 'published' as const };

export const TOOL_INCLUDE = {
  category: true,
  sources: true,
  pricingTiers: true,
  alternativesFrom: { include: { targetTool: true } },
};

// --- Mapping helpers: Prisma model -> app-facing Tool/Category/etc shape ---

export function mapTool(t: any): Tool {
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
    hasFreeTier: t.hasFreeTier ?? undefined,
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
    affiliateUrl: t.affiliateUrl ?? undefined,
    affiliateEnabled: t.affiliateEnabled ?? false,
    affiliateProgram: t.affiliateProgram ?? undefined,
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
    monitoringEnabled: t.monitoringEnabled ?? undefined,
    pricingSourceUrl: t.pricingSourceUrl ?? undefined,
    featuresSourceUrl: t.featuresSourceUrl ?? undefined,
  };
}

export function mapCategory(c: any, toolCount = 0): Category {
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

export function mapPersona(p: any): Persona {
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

export function mapUseCase(uc: any): UseCase {
  return {
    id: uc.id,
    title: uc.title,
    slug: uc.slug,
    description: uc.description,
    primaryKeyword: uc.primaryKeyword,
    seoTitle: uc.seoTitle,
    seoDescription: uc.seoDescription,
    publishStatus: uc.publishStatus ?? 'published',
  };
}

export function isStrongPlusFitTier(fitTier: UseCaseFitTier): boolean {
  return fitTier === 'primary' || fitTier === 'strong';
}

export function mapToolUseCaseFit(link: any): ToolWithUseCaseFit {
  return {
    ...mapTool(link.tool),
    useCaseFit: {
      fitTier: link.fitTier,
      capabilities: link.capabilities,
      limitation: link.limitation ?? undefined,
      evidenceUrl: link.evidenceUrl,
      verifiedAt: link.verifiedAt.toISOString().split('T')[0],
      displayOrder: link.displayOrder,
      section: link.section ?? '',
    },
  };
}

export function mapComparison(c: any): Comparison {
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

export function mapReview(r: any, options: { includePrivate?: boolean } = {}): Review {
  const review: Review = {
    id: r.id,
    toolSlug: r.tool?.slug ?? '',
    authorName: r.authorName,
    authorRole: r.authorRole ?? '',
    rating: r.rating,
    comment: r.comment,
    date: r.date.toISOString().split('T')[0],
    verifiedUser: r.verifiedUser,
    status: r.status ?? 'approved',
  };

  if (options.includePrivate) {
    review.toolName = r.tool?.name ?? undefined;
    review.moderatedAt = r.moderatedAt ? r.moderatedAt.toISOString() : undefined;
    review.moderatedBy = r.moderatedBy ?? undefined;
    review.moderationNotes = r.moderationNotes ?? undefined;
    review.createdAt = r.createdAt ? r.createdAt.toISOString() : undefined;
    review.updatedAt = r.updatedAt ? r.updatedAt.toISOString() : undefined;
    if (r.email) {
      review.email = r.email;
    }
  }

  return review;
}

export function mapArticle(a: any): Article {
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

export function mapSourcesForDb(sources: ToolSource[]) {
  return sources.map((s) => ({
    type: s.type,
    url: s.url,
    verifiedAt: new Date(s.verifiedAt),
    notes: s.notes ?? null,
  }));
}

export function mapPricingTiersForDb(tiers: PricingTier[]) {
  return tiers.map((tier) => ({
    name: tier.name,
    price: tier.price ?? null,
    billingPeriod: tier.billingPeriod,
    features: tier.features ?? [],
  }));
}

export async function syncToolSources(toolId: string, sources: ToolSource[] | undefined) {
  if (sources === undefined) return;
  await prisma.toolSource.deleteMany({ where: { toolId } });
  if (sources.length === 0) return;
  await prisma.toolSource.createMany({
    data: mapSourcesForDb(sources).map((row) => ({ ...row, toolId })),
  });
}

export async function syncToolPricingTiers(toolId: string, tiers: PricingTier[] | undefined) {
  if (tiers === undefined) return;
  await prisma.pricingTier.deleteMany({ where: { toolId } });
  if (tiers.length === 0) return;
  await prisma.pricingTier.createMany({
    data: mapPricingTiersForDb(tiers).map((row) => ({ ...row, toolId })),
  });
}

export async function syncToolAlternatives(sourceToolId: string, altSlugs: string[] | undefined) {
  if (altSlugs === undefined) return;
  await prisma.toolAlternative.deleteMany({ where: { sourceToolId } });
  if (altSlugs.length === 0) return;

  const normalized = [...new Set(altSlugs.map((s) => s.trim().toLowerCase()).filter(Boolean))];
  const targets = await prisma.tool.findMany({
    where: { slug: { in: normalized, mode: 'insensitive' } },
    select: { id: true, slug: true },
  });

  const rows = normalized
    .map((slug) => targets.find((t) => t.slug.toLowerCase() === slug))
    .filter((t): t is { id: string; slug: string } => Boolean(t && t.id !== sourceToolId))
    .map((t) => ({ sourceToolId, targetToolId: t.id }));

  if (rows.length === 0) return;
  await prisma.toolAlternative.createMany({ data: rows, skipDuplicates: true });
}

export function mapApprovedReviewAggregate(
  count: number,
  avgRating: number | null
): ApprovedReviewAggregate {
  return {
    count,
    rating: count > 0 && avgRating != null ? parseFloat(avgRating.toFixed(1)) : 0,
  };
}

// --- Shared review enrichment functions ---

export async function getApprovedReviewAggregatesByToolIds(
  toolIds: string[]
): Promise<Map<string, ApprovedReviewAggregate>> {
  if (toolIds.length === 0) return new Map();

  const groups = await prisma.review.groupBy({
    by: ['toolId'],
    where: { toolId: { in: toolIds }, status: 'approved' },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return new Map(
    groups.map((group) => [
      group.toolId,
      {
        count: group._count.rating,
        rating: group._count.rating > 0 && group._avg.rating != null 
          ? parseFloat(group._avg.rating.toFixed(1)) 
          : 0,
      },
    ])
  );
}

export async function enrichToolsWithPublicReviewSignals(tools: Tool[]): Promise<Tool[]> {
  if (tools.length === 0) return tools;

  const aggregates = await getApprovedReviewAggregatesByToolIds(
    tools.map((tool) => tool.id)
  );

  return tools.map((tool) =>
    applyPublicReviewSignals(
      tool,
      aggregates.get(tool.id) ?? EMPTY_APPROVED_REVIEW_AGGREGATE
    )
  );
}
