import { MetadataRoute } from 'next';
import { dbRepository } from '../lib/dbRepository';
import {
  SITEMAP_PAGE_SIZE,
  buildStaticSitemapEntries,
  buildToolSitemapEntries,
  buildCategorySitemapEntries,
  buildPersonaSitemapEntries,
  buildComparisonSitemapEntries,
  buildUseCaseSitemapEntries,
  getSitemapBaseUrl,
} from '../lib/seo/sitemap-builder';

async function getAllToolsForSitemap() {
  const { tools, totalPages } = await dbRepository.getToolsPageForSitemap(1, SITEMAP_PAGE_SIZE);
  const allTools = [...tools];

  for (let page = 2; page <= totalPages; page += 1) {
    const pageResult = await dbRepository.getToolsPageForSitemap(page, SITEMAP_PAGE_SIZE);
    allTools.push(...pageResult.tools);
  }

  return allTools;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSitemapBaseUrl();

  const [categories, personas, comparisons, personaToolCounts, useCasePages, tools] =
    await Promise.all([
      dbRepository.getCategories(),
      dbRepository.getPersonas(),
      dbRepository.getComparisons(),
      dbRepository.getPersonaLinkedToolCounts(),
      dbRepository.getIndexablePersonaUseCasePages(),
      getAllToolsForSitemap(),
    ]);

  return [
    ...buildStaticSitemapEntries(baseUrl),
    ...buildCategorySitemapEntries(categories, baseUrl),
    ...buildPersonaSitemapEntries(personas, baseUrl, personaToolCounts),
    ...buildUseCaseSitemapEntries(useCasePages, baseUrl),
    ...buildComparisonSitemapEntries(comparisons, baseUrl),
    ...buildToolSitemapEntries(tools, baseUrl),
  ];
}
