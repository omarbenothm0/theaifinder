import { MetadataRoute } from 'next';
import { ToolRepository } from '../lib/repositories/tool.repository';
import { CategoryRepository } from '../lib/repositories/category.repository';
import { PersonaRepository } from '../lib/repositories/persona.repository';
import { ComparisonRepository } from '../lib/repositories/comparison.repository';
import { UseCaseRepository } from '../lib/repositories/use-case.repository';
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
  const { tools, totalPages } = await ToolRepository.getToolsPageForSitemap(1, SITEMAP_PAGE_SIZE);
  const allTools = [...tools];

  for (let page = 2; page <= totalPages; page += 1) {
    const pageResult = await ToolRepository.getToolsPageForSitemap(page, SITEMAP_PAGE_SIZE);
    allTools.push(...pageResult.tools);
  }

  return allTools;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSitemapBaseUrl();

  const [categories, personas, comparisons, personaToolCounts, useCasePages, tools] =
    await Promise.all([
      CategoryRepository.getCategories(),
      PersonaRepository.getPersonas(),
      ComparisonRepository.getComparisons(),
      PersonaRepository.getPersonaLinkedToolCounts(),
      UseCaseRepository.getIndexablePersonaUseCasePages(),
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
