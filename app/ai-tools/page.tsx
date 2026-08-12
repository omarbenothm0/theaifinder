import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCatalogClient } from './ToolCatalogClient';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Search & Filter the Full AI Tools Catalog'),
    description: 'Searchable index of all listed AI tools — filter by category, pricing model, persona fit, and developer API availability.',
    canonicalUrl: '/ai-tools'
  });
}

export default async function AIToolsPage() {
  const [toolsRes, categories, personas] = await Promise.all([
    ToolService.getTools({ limit: 100 }),
    CategoryService.getCategories(),
    PersonaService.getPersonas()
  ]);

  return (
    <Suspense fallback={null}>
      <ToolCatalogClient
        initialTools={toolsRes.tools}
        totalCount={toolsRes.total}
        categories={categories}
        personas={personas}
      />
    </Suspense>
  );
}
