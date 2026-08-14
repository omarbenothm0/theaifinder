import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryService } from '../../lib/services/category.service';
import { ComparisonService } from '../../lib/services/comparison.service';
import { CategoryCard } from '../../components/category/CategoryCard';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { isComparisonIndexable } from '../../lib/seo/indexability';
import { sitePageTitle } from '../../lib/brand';
import { Layers, Zap, ArrowRight, Database } from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../../components/ui/PageHero';
import { orderPublicCategories } from '../../lib/data/category-nav-links';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('AI Tools Category Taxonomy & Comparison Index'),
    description: 'Structural map of all software categories plus curated head-to-head comparisons — browse the site architecture by topic.',
    canonicalUrl: '/ai-tools-directory'
  });
}

export default async function AIToolsDirectoryPage() {
  const [categories, comparisons] = await Promise.all([
    CategoryService.getCategories(),
    ComparisonService.getComparisons()
  ]);
  const orderedCategories = orderPublicCategories(categories);
  const indexableComparisons = comparisons.filter((c) => isComparisonIndexable(c).indexable);

  return (
    <div className="space-y-12">
      <PageHero
        badge={
          <PageHeroAccentBadge icon={<Database className="w-4 h-4 text-inverted-foreground/80" />}>
            Full Taxonomy Sitemap
          </PageHeroAccentBadge>
        }
        title={<>Category Taxonomy &amp; Comparison Index</>}
        description="Browse every software category and curated comparison in one structural index — useful for exploring the site by topic rather than searching individual tools."
      />

      {/* Categories Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Layers className="w-5 h-5 text-foreground" />
            Software Categories ({categories.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>

      {/* Comparisons Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Zap className="w-5 h-5 text-rating" />
            Head-to-Head Comparisons ({indexableComparisons.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indexableComparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="bg-background-raised p-5 rounded-2xl border border-border/50 hover:border-rating-border shadow-2xs hover:shadow-xs transition-all group"
            >
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
      </div>
    </div>
  );
}