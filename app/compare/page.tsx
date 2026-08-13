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
import { PageHero, PageHeroRatingBadge } from '../../components/ui/PageHero';

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

      <PageHero
        badge={
          <PageHeroRatingBadge icon={<Zap className="w-4 h-4 text-rating" />}>
            Head-to-Head Evaluations
          </PageHeroRatingBadge>
        }
        title="AI Tool Comparisons"
        description="Curated side-by-side evaluations of top AI platforms — feature matrices, pricing, and editorial verdicts to help you choose with confidence."
      />

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
                className="bg-background-raised p-5 rounded-2xl border border-border/50 hover:border-rating-border shadow-2xs hover:shadow-xs transition-all group"
              >
                <div className="home-rating-badge mb-3">
                  <Zap className="w-3 h-3 text-rating" />
                  Head-to-Head
                </div>
                <h3 className="font-medium text-foreground-strong text-sm mb-1 group-hover:text-rating transition-colors">
                  {comp.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{comp.verdict}</p>
                <div className="flex items-center justify-between text-[11px] font-medium text-rating pt-2 border-t border-border/30">
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
