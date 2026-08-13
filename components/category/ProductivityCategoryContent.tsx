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
import { PageHero, PageHeroAccentBadge } from '../ui/PageHero';

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
      <PageHero
        badge={
          <PageHeroAccentBadge icon={<Layers className="w-4 h-4 text-inverted-foreground/80" />}>
            Category Hub &bull; {curatedCount} Curated {curatedCount === 1 ? 'Tool' : 'Tools'}
          </PageHeroAccentBadge>
        }
        title={<>AI Productivity &amp; Workspace Tools</>}
        description={category.longDescription || category.description}
      />

      {/* Intent split */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background-raised border border-border/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Workspace
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Docs, wikis, and database Q&amp;A — Notion AI is the primary workspace copilot in this
            inventory.
          </p>
        </div>
        <div className="bg-background-raised border border-intent-secondary-border rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-intent-secondary-foreground uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Personal tasks
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Individual and small-team task AI — breakdown, filters, email-to-task, and voice capture
            with Todoist Assist.
          </p>
        </div>
        <div className="bg-background-raised border border-border/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
            <Mic className="w-4 h-4" />
            Meeting capture
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            General meeting and lecture notetakers cross-listed from Project Management — catalog
            home remains PM for formal workflows.
          </p>
        </div>
      </div>

      {/* Related hubs */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
        <Link
          href="/for/small-business#operations-productivity"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Store className="w-4 h-4" />
          Small Business — operations &amp; productivity
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/category/project-management"
          className="inline-flex items-center gap-2 text-xs font-bold text-intent-secondary bg-intent-secondary-muted border border-intent-secondary-border px-4 py-2.5 rounded-xl hover:bg-intent-secondary-muted transition-colors"
        >
          <Kanban className="w-4 h-4" />
          Project Management category
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/for/writers"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-background border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
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
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Mic className="w-4 h-4 text-inverted-foreground/80" />
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
            <div className="border-b border-border/50 pb-3 space-y-2">
              <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-foreground" />
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">{section.description}</p>
              {section.crossListed && (
                <p className="text-xs text-rating-foreground bg-rating/10 border border-rating/20 rounded-lg px-3 py-2 max-w-3xl leading-relaxed">
                  Primary catalog category:{' '}
                  <Link
                    href="/category/project-management"
                    className="font-bold text-rating-foreground hover:underline"
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
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-2 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          Marketing &amp; CRM category
        </Link>
        <Link
          href="/ai-tool-finder"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-2 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          AI Tool Finder
        </Link>
      </div>

      {/* FAQs */}
      {category.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto bg-background-raised rounded-3xl border border-border/50 p-8 sm:p-10 space-y-6">
          <h2 className="text-xl font-medium text-foreground-strong">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {category.faqs.map((faq) => (
              <div key={faq.question} className="bg-background p-4 rounded-xl border border-border/30">
                <h3 className="font-bold text-foreground-strong text-sm">{faq.question}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{faq.answer}</p>
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
