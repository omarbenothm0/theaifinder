import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonService } from '../../../lib/services/comparison.service';
import { ToolService } from '../../../lib/services/tool.service';
import { CategoryService } from '../../../lib/services/category.service';
import { PersonaService } from '../../../lib/services/persona.service';
import { ComparisonTable } from '../../../components/comparison/ComparisonTable';
import { InternalLinks } from '../../../components/shared/InternalLinks';
import { JsonLd } from '../../../components/shared/JsonLd';
import { generateComparisonMetadata } from '../../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../../lib/seo/jsonld';
import { siteUrl } from '../../../lib/site-config';
import { Zap } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const comparisons = await ComparisonService.getComparisons();
  return comparisons.map((comp) => ({
    slug: comp.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comp = await ComparisonService.getComparisonBySlug(slug);
  if (!comp) return { title: 'Comparison Not Found' };
  return generateComparisonMetadata(comp);
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = await ComparisonService.getComparisonBySlug(slug);

  if (!comp) {
    notFound();
  }

  const [tool1, tool2, categories, personas, comparisons] = await Promise.all([
    ToolService.getToolBySlug(comp.tool1Slug),
    ToolService.getToolBySlug(comp.tool2Slug),
    CategoryService.getCategories(),
    PersonaService.getPersonas(),
    ComparisonService.getComparisons()
  ]);

  if (!tool1 || !tool2) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl() },
    { name: 'Comparisons', url: siteUrl('/ai-tools-directory') },
    { name: comp.title, url: siteUrl(`/compare/${comp.slug}`) }
  ]);

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-400" />
          Head-to-Head Software Evaluation
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {comp.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Comprehensive comparison of feature sets, pricing plans, accuracy, and workflow fit.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <ComparisonTable comparison={comp} tool1={tool1} tool2={tool2} />

      {/* Internal Linking Block */}
      <InternalLinks
        categories={categories}
        personas={personas}
        comparisons={comparisons.filter((c) => c.slug !== comp.slug)}
      />
    </div>
  );
}
