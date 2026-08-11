import React from 'react';
import { Metadata } from 'next';
import { ToolService } from '../lib/services/tool.service';
import { CategoryService } from '../lib/services/category.service';
import { PersonaService } from '../lib/services/persona.service';
import { ComparisonService } from '../lib/services/comparison.service';
import { HomePageClient } from '../components/home/HomePageClient';
import { JsonLd } from '../components/shared/JsonLd';
import { getWebsiteSchema } from '../lib/seo/jsonld';
import { generatePageMetadata } from '../lib/seo/metadata';

export const revalidate = 3600;

import { siteRootTitle } from '../lib/brand';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: siteRootTitle(),
    description: 'Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software for writing, coding, video, images, and productivity.',
    canonicalUrl: '/'
  });
}

export default async function HomePage() {
  const [toolsRes, categories, personas, comparisons] = await Promise.all([
    ToolService.getTools({ limit: 100 }),
    CategoryService.getCategories(),
    PersonaService.getPersonas(),
    ComparisonService.getComparisons()
  ]);

  const allTools = toolsRes.tools;
  const featuredTools = allTools.filter((t) => t.featured).slice(0, 6);
  const freeTools = allTools.filter((t) => t.pricingModel === 'Free' || t.pricingModel === 'Freemium' || t.hasFreeTrial).slice(0, 6);
  const trendingTools = allTools.filter((t) => t.trending).slice(0, 6);
  const apiTools = allTools.filter((t) => t.hasApi).slice(0, 6);

  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <JsonLd schema={websiteSchema} />
      <HomePageClient
        featuredTools={featuredTools.length ? featuredTools : allTools.slice(0, 6)}
        freeTools={freeTools.length ? freeTools : allTools.slice(0, 6)}
        trendingTools={trendingTools.length ? trendingTools : allTools.slice(0, 6)}
        apiTools={apiTools.length ? apiTools : allTools.slice(0, 6)}
        categories={categories}
        personas={personas}
        comparisons={comparisons}
      />
    </>
  );
}
