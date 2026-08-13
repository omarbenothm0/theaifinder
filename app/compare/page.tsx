import { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonService } from '../../lib/services/comparison.service';
import { JsonLd } from '../../components/shared/JsonLd';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { isComparisonIndexable } from '../../lib/seo/indexability';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { getBaseUrl, absoluteUrl } from '../../lib/seo/base-url';
import { sitePageTitle } from '../../lib/brand';
import { Zap, ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Curated AI Tool Comparisons (2026)'),
    description: 'Side-by-side evaluations of curated AI tool matchups — Claude Code vs Cursor, Otter.ai vs Fireflies.ai, ClickUp Brain vs Asana AI, and Sembly AI vs OnPlana.',
    canonicalUrl: '/compare',
  });
}

export default async function CompareIndexPage() {
  const comparisons = await ComparisonService.getComparisons();
  const indexableComparisons = comparisons.filter((c) => isComparisonIndexable(c).indexable);
  const baseUrl = getBaseUrl();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Comparisons', url: absoluteUrl('/compare') },
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Header */}
      <div className="bg-inverted text-inverted-foreground rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-rating/100/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-rating" />
          Head-to-Head Evaluations
        </div>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight">
          AI Tool Comparisons
        </h1>
        <p className="text-sm sm:text-base text-inverted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Curated side-by-side evaluations of top AI platforms — feature matrices, pricing, and editorial verdicts to help you choose with confidence.
        </p>
      </div>

      {/* Comparisons Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Zap className="w-5 h-5 text-rating" />
            All Comparisons ({indexableComparisons.length})
          </h2>
        </div>

        {indexableComparisons.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">
            No comparisons available yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indexableComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="bg-background-raised p-5 rounded-2xl border border-border/50 hover:border-amber-300 shadow-2xs hover:shadow-xs transition-all group"
              >
                <div className="inline-flex items-center gap-1.5 bg-rating/10 text-amber-800 border border-rating/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-3">
                  <Zap className="w-3 h-3 text-rating" />
                  Head-to-Head
                </div>
                <h3 className="font-bold text-foreground-strong text-sm mb-1 group-hover:text-rating transition-colors">
                  {comp.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{comp.verdict}</p>
                <div className="flex items-center justify-between text-[11px] font-bold text-rating pt-2 border-t border-border/30">
                  <span>View Comparison</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
