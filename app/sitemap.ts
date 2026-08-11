import { MetadataRoute } from 'next';
import { dbRepository } from '../lib/dbRepository';
import {
  SITEMAP_PAGE_SIZE,
  buildStaticSitemapEntries,
  buildToolSitemapEntries,
  buildCategorySitemapEntries,
  buildPersonaSitemapEntries,
  buildComparisonSitemapEntries,
  getSitemapBaseUrl,
} from '../lib/seo/sitemap-builder';

export async function generateSitemaps() {
  const { totalPages } = await dbRepository.getToolsPageForSitemap(1, SITEMAP_PAGE_SIZE);
  const ids = [{ id: 'static' }];
  for (let i = 0; i < totalPages; i += 1) {
    ids.push({ id: `tools-${i}` });
  }
  return ids;
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const baseUrl = getSitemapBaseUrl();

  if (id === 'static') {
    const [categories, personas, comparisons, personaToolCounts] = await Promise.all([
      dbRepository.getCategories(),
      dbRepository.getPersonas(),
      dbRepository.getComparisons(),
      dbRepository.getPersonaLinkedToolCounts(),
    ]);

    return [
      ...buildStaticSitemapEntries(baseUrl),
      ...buildCategorySitemapEntries(categories, baseUrl),
      ...buildPersonaSitemapEntries(personas, baseUrl, personaToolCounts),
      ...buildComparisonSitemapEntries(comparisons, baseUrl),
    ];
  }

  const match = id.match(/^tools-(\d+)$/);
  if (match) {
    const page = Number(match[1]) + 1;
    const { tools } = await dbRepository.getToolsPageForSitemap(page, SITEMAP_PAGE_SIZE);
    return buildToolSitemapEntries(tools, baseUrl);
  }

  return [];
}
