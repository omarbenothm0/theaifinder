import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCatalogClient } from './ToolCatalogClient';
import { generatePageMetadata } from '../../lib/seo/metadata';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Directory of 1,000+ Best AI Tools & Software (2026)',
    description: 'Browse the complete artificial intelligence software directory. Filter by category, pricing model, workflow persona, and API capabilities.',
    canonicalUrl: 'https://aifind.io/ai-tools'
  });
}

export default async function AIToolsPage() {
  const [toolsRes, categories, personas] = await Promise.all([
    ToolService.getTools({ limit: 100 }),
    CategoryService.getCategories(),
    PersonaService.getPersonas()
  ]);

  return (
    <ToolCatalogClient
      initialTools={toolsRes.tools}
      totalCount={toolsRes.total}
      categories={categories}
      personas={personas}
    />
  );
}
