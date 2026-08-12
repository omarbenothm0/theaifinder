import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryService } from '../../lib/services/category.service';
import { ComparisonService } from '../../lib/services/comparison.service';
import { CategoryCard } from '../../components/category/CategoryCard';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { isComparisonIndexable } from '../../lib/seo/indexability';
import { sitePageTitle } from '../../lib/brand';
import { Layers, Zap, ArrowRight, Database } from 'lucide-react';

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
  const indexableComparisons = comparisons.filter((c) => isComparisonIndexable(c).indexable);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Database className="w-4 h-4 text-emerald-400" />
          Full Taxonomy Sitemap
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Category Taxonomy &amp; Comparison Index
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Browse every software category and curated comparison in one structural index — useful for exploring the site by topic rather than searching individual tools.
        </p>
      </div>

      {/* Categories Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Software Categories ({categories.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>

      {/* Comparisons Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Head-to-Head Comparisons ({indexableComparisons.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indexableComparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                {comp.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{comp.verdict}</p>
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-600 pt-2 border-t border-slate-100">
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