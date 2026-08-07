import { MetadataRoute } from 'next';
import { ToolService } from '../lib/services/tool.service';
import { CategoryService } from '../lib/services/category.service';
import { PersonaService } from '../lib/services/persona.service';
import { ComparisonService } from '../lib/services/comparison.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aifind.io';

  const [toolsRes, categories, personas, comparisons] = await Promise.all([
    ToolService.getTools({ limit: Number.MAX_SAFE_INTEGER }),
    CategoryService.getCategories(),
    PersonaService.getPersonas(),
    ComparisonService.getComparisons()
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/ai-tools`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/best-ai-tools`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/free-ai-tools`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ai-apps`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ai-tool-finder`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ai-tools-directory`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/for`, changeFrequency: 'weekly', priority: 0.8 }
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolsRes.tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: cat.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const personaRoutes: MetadataRoute.Sitemap = personas.map((p) => ({
    url: `${baseUrl}/for/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: comp.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...personaRoutes,
    ...comparisonRoutes
  ];
}
