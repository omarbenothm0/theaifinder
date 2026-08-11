import {
  Tool,
  Category,
  Persona,
  Comparison,
  Article,
  PublishStatus,
} from '../../types/tool';

export type IndexabilityResult = {
  indexable: boolean;
  reason?: string;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

export function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isPublished(status?: PublishStatus): boolean {
  return !status || status === 'published';
}

export function isToolIndexable(tool: Tool): IndexabilityResult {
  if (!isPublished(tool.publishStatus)) {
    return { indexable: false, reason: `Tool publish status is "${tool.publishStatus ?? 'draft'}"` };
  }

  if (!tool.name?.trim()) {
    return { indexable: false, reason: 'Missing tool name' };
  }

  if (!tool.slug?.trim() || !isValidSlug(tool.slug)) {
    return { indexable: false, reason: 'Invalid or missing slug' };
  }

  if (!tool.tagline?.trim() || tool.tagline.trim().length < 10) {
    return { indexable: false, reason: 'Tagline too short (min 10 chars)' };
  }

  if (!tool.description?.trim() || tool.description.trim().length < 50) {
    return { indexable: false, reason: 'Description too short (min 50 chars)' };
  }

  if (!tool.websiteUrl?.trim() || !isValidHttpUrl(tool.websiteUrl)) {
    return { indexable: false, reason: 'Invalid or missing website URL' };
  }

  if (!tool.categorySlug?.trim()) {
    return { indexable: false, reason: 'Missing category relationship' };
  }

  if (!tool.logo?.trim() || !isValidHttpUrl(tool.logo)) {
    return { indexable: false, reason: 'Invalid or missing logo URL' };
  }

  return { indexable: true };
}

/** Whether a tool appears in public catalog/listings (broader than indexable). */
export function isToolPublicListing(tool: Tool): boolean {
  if (!isPublished(tool.publishStatus)) return false;
  return Boolean(tool.name?.trim() && tool.slug?.trim() && isValidSlug(tool.slug));
}

export function isCategoryIndexable(category: Category): IndexabilityResult {
  if (!isPublished(category.publishStatus)) {
    return { indexable: false, reason: 'Category not published' };
  }

  if (!category.slug?.trim() || !isValidSlug(category.slug)) {
    return { indexable: false, reason: 'Invalid category slug' };
  }

  if (!category.name?.trim()) {
    return { indexable: false, reason: 'Missing category name' };
  }

  if (!category.description?.trim()) {
    return { indexable: false, reason: 'Missing category description' };
  }

  if ((category.toolCount ?? 0) < 1) {
    return { indexable: false, reason: 'Category has no published tools' };
  }

  return { indexable: true };
}

export function isPersonaIndexable(
  persona: Persona,
  linkedToolCount = 0
): IndexabilityResult {
  if (!isPublished(persona.publishStatus)) {
    return { indexable: false, reason: 'Persona not published' };
  }

  if (!persona.slug?.trim() || !isValidSlug(persona.slug)) {
    return { indexable: false, reason: 'Invalid persona slug' };
  }

  if (!persona.title?.trim() || !persona.description?.trim()) {
    return { indexable: false, reason: 'Missing persona title or description' };
  }

  if (linkedToolCount < 1 && (persona.topToolSlugs?.length ?? 0) < 1) {
    return { indexable: false, reason: 'Persona has no linked tools' };
  }

  return { indexable: true };
}

export function isComparisonIndexable(comparison: Comparison): IndexabilityResult {
  if (comparison.isCurated === false) {
    return { indexable: false, reason: 'Auto-generated comparison (not editorially curated)' };
  }

  if (!isPublished(comparison.publishStatus)) {
    return { indexable: false, reason: 'Comparison not published' };
  }

  if (!comparison.slug?.trim() || !isValidSlug(comparison.slug)) {
    return { indexable: false, reason: 'Invalid comparison slug' };
  }

  if (!comparison.title?.trim() || !comparison.verdict?.trim()) {
    return { indexable: false, reason: 'Missing comparison title or verdict' };
  }

  if (!comparison.tool1Slug || !comparison.tool2Slug) {
    return { indexable: false, reason: 'Missing tool references' };
  }

  if ((comparison.featureBreakdown?.length ?? 0) < 1) {
    return { indexable: false, reason: 'Comparison has no feature breakdown' };
  }

  return { indexable: true };
}

export function isArticleIndexable(article: Article): IndexabilityResult {
  if (!isPublished(article.publishStatus)) {
    return { indexable: false, reason: 'Article not published' };
  }

  if (!article.slug?.trim() || !isValidSlug(article.slug)) {
    return { indexable: false, reason: 'Invalid article slug' };
  }

  if (!article.title?.trim() || !article.excerpt?.trim() || !article.content?.trim()) {
    return { indexable: false, reason: 'Missing article content' };
  }

  return { indexable: true };
}
