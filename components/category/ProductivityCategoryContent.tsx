import Link from 'next/link';
import { Category, Persona, Tool } from '../../types/tool';
import { ToolService } from '../../lib/services/tool.service';
import { ComparisonService } from '../../lib/services/comparison.service';
import { ToolCard } from '../tool/ToolCard';
import { InternalLinks } from '../shared/InternalLinks';
import { JsonLd } from '../shared/JsonLd';
import { PRODUCTIVITY_SECTIONS } from '../../lib/data/productivity-category';
import { getFAQSchema, getCollectionPageSchema } from '../../lib/seo/jsonld';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Compass,
  Kanban,
  Layers,
  Mic,
  Sparkles,
  Store,
  Zap,
} from 'lucide-react';

interface ProductivityCategoryContentProps {
  category: Category;
  categories: Category[];
  personas: Persona[];
}

async function loadToolsBySlugs(slugs: string[]): Promise<Map<string, Tool>> {
  const uniqueSlugs = [...new Set(slugs)];
  const tools = await Promise.all(uniqueSlugs.map((slug) => ToolService.getToolBySlug(slug)));
  const map = new Map<string, Tool>();
  for (const tool of tools) {
    if (tool) map.set(tool.slug, tool);
  }
  return map;
}

export async function ProductivityCategoryContent({
  category,
  categories,
  personas,
}: ProductivityCategoryContentProps) {
  const allSlugs = PRODUCTIVITY_SECTIONS.flatMap((section) => section.toolSlugs);
  const [toolMap, comparisons] = await Promise.all([
    loadToolsBySlugs(allSlugs),
    ComparisonService.getComparisons(),
  ]);

  const curatedCount = new Set(allSlugs.filter((slug) => toolMap.has(slug))).size;
  const faqSchema = category.faqs.length > 0 ? getFAQSchema(category.faqs) : null;
  const collectionSchema = getCollectionPageSchema(category);

  return (
    <div className="space-y-10">
      {faqSchema && <JsonLd schema={faqSchema} />}
      <JsonLd schema={collectionSchema} />

      {/* Hero */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-emerald-400" />
          Category Hub &bull; {curatedCount} Curated {curatedCount === 1 ? 'Tool' : 'Tools'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          AI Productivity &amp; Workspace Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {category.longDescription || category.description}
        </p>
      </div>

      {/* Intent split */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-indigo-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Workspace
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Docs, wikis, and database Q&amp;A — Notion AI is the primary workspace copilot in this
            inventory.
          </p>
        </div>
        <div className="bg-white border border-violet-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-800 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Personal tasks
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Individual and small-team task AI — breakdown, filters, email-to-task, and voice capture
            with Todoist Assist.
          </p>
        </div>
        <div className="bg-white border border-emerald-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Mic className="w-4 h-4" />
            Meeting capture
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            General meeting and lecture notetakers cross-listed from Project Management — catalog
            home remains PM for formal workflows.
          </p>
        </div>
      </div>

      {/* Related hubs */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
        <Link
          href="/for/small-business#operations-productivity"
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
        >
          <Store className="w-4 h-4" />
          Small Business — operations &amp; productivity
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/category/project-management"
          className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-4 py-2.5 rounded-xl hover:bg-violet-100 transition-colors"
        >
          <Kanban className="w-4 h-4" />
          Project Management category
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/for/writers"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Writers hub (Notion for manuscripts)
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Comparison CTA */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/compare/otter-ai-vs-fireflies-ai"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors"
        >
          <Mic className="w-4 h-4 text-emerald-600" />
          Otter.ai vs Fireflies.ai (PM catalog)
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tool sections */}
      {PRODUCTIVITY_SECTIONS.map((section) => {
        const sectionTools = section.toolSlugs
          .map((slug) => toolMap.get(slug))
          .filter(Boolean) as Tool[];
        if (sectionTools.length === 0) return null;

        return (
          <div key={section.slug} className="space-y-4">
            <div className="border-b border-slate-200 pb-3 space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                {section.title}
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">{section.description}</p>
              {section.crossListed && (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-3xl leading-relaxed">
                  Primary catalog category:{' '}
                  <Link
                    href="/category/project-management"
                    className="font-bold text-amber-900 hover:underline"
                  >
                    Project Management
                  </Link>
                  . Listed here for general meeting and lecture capture — not a duplicate catalog
                  assignment.
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectionTools.map((tool) => (
                <ToolCard key={`${section.slug}-${tool.id}`} tool={tool} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Helper links */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
        <Link
          href="/category/marketing"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          Marketing &amp; CRM category
        </Link>
        <Link
          href="/ai-tool-finder"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          AI Tool Finder
        </Link>
      </div>

      {/* FAQs */}
      {category.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {category.faqs.map((faq) => (
              <div key={faq.question} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">{faq.question}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <InternalLinks
        categories={categories}
        personas={personas}
        comparisons={comparisons}
        excludeCategorySlug={category.slug}
        title="Explore Related Hubs & Comparisons"
      />
    </div>
  );
}
