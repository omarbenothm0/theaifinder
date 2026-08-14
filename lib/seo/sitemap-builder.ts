import { MetadataRoute } from 'next';
import { getBaseUrl } from './base-url';
import {
  isToolIndexable,
  isCategoryIndexable,
  isPersonaIndexable,
  isComparisonIndexable,
} from './indexability';
import { Tool, Category, Persona, Comparison } from '../../types/tool';

export const SITEMAP_PAGE_SIZE = 500;

export function buildStaticSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/ai-tools', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/best-ai-tools', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/free-ai-tools', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/ai-apps', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/ai-tool-finder', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/ai-tools-directory', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/for', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/compare', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

export function buildToolSitemapEntries(
  tools: Tool[],
  baseUrl: string
): MetadataRoute.Sitemap {
  const now = new Date();
  return tools
    .filter((tool) => isToolIndexable(tool).indexable)
    .map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: tool.updatedAt ? new Date(tool.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
}

export function buildCategorySitemapEntries(
  categories: Category[],
  baseUrl: string
): MetadataRoute.Sitemap {
  const now = new Date();
  return categories
    .filter((cat) => isCategoryIndexable(cat).indexable)
    .map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
}

export function buildPersonaSitemapEntries(
  personas: Persona[],
  baseUrl: string,
  linkedToolCounts: Record<string, number> = {}
): MetadataRoute.Sitemap {
  const now = new Date();
  return personas
    .filter((p) => isPersonaIndexable(p, linkedToolCounts[p.slug] ?? 0).indexable)
    .map((p) => ({
      url: `${baseUrl}/for/${p.slug}`,
      // Use actual update timestamp if available, otherwise fall back to current date
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
}

export function buildUseCaseSitemapEntries(
  pages: Array<{ personaSlug: string; useCaseSlug: string }>,
  baseUrl: string
): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map((page) => ({
    url: `${baseUrl}/for/${page.personaSlug}/${page.useCaseSlug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }));
}

export function buildComparisonSitemapEntries(
  comparisons: Comparison[],
  baseUrl: string
): MetadataRoute.Sitemap {
  const now = new Date();
  return comparisons
    .filter((comp) => isComparisonIndexable(comp).indexable)
    .map((comp) => ({
      url: `${baseUrl}/compare/${comp.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
}

export function getSitemapBaseUrl(): string {
  return getBaseUrl();
}
