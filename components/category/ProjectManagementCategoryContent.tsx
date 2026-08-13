import Link from 'next/link';
import { Category, Persona, Tool } from '../../types/tool';
import { ToolService } from '../../lib/services/tool.service';
import { ComparisonService } from '../../lib/services/comparison.service';
import { ToolCard } from '../tool/ToolCard';
import { InternalLinks } from '../shared/InternalLinks';
import { JsonLd } from '../shared/JsonLd';
import { PM_SECTIONS } from '../../lib/data/project-management-category';
import { getFAQSchema, getCollectionPageSchema } from '../../lib/seo/jsonld';
import {
  ArrowRight,
  ClipboardList,
  Compass,
  FileText,
  Kanban,
  Layers,
  Mic,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../ui/PageHero';

interface ProjectManagementCategoryContentProps {
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

export async function ProjectManagementCategoryContent({
  category,
  categories,
  personas,
}: ProjectManagementCategoryContentProps) {
  const allSlugs = PM_SECTIONS.flatMap((section) => section.toolSlugs);
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
        title={<>Best AI Project Management Tools</>}
        description={category.longDescription || category.description}
      />

      {/* Intent split */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background-raised border border-border/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
            <Mic className="w-4 h-4" />
            Meeting notes
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Transcription, AI summaries, and action items from Zoom, Meet, Teams, and standalone
            notetakers.
          </p>
          <Link
            href="/for/project-managers/meeting-notes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong"
          >
            Meeting notes guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-background-raised border border-intent-secondary-border rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-intent-secondary-foreground uppercase tracking-wider">
            <Kanban className="w-4 h-4" />
            Task &amp; planning
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI task prioritization, project plans, Gantt views, and Planner Agent workflows on PM
            platforms.
          </p>
          <Link
            href="/for/project-managers/task-management"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-intent-secondary hover:text-intent-secondary-hover"
          >
            Task management guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-background-raised border border-border/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            Reporting &amp; decks
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Status reports, RAG executive updates, and stakeholder presentation decks from meeting
            or pasted content.
          </p>
          <Link
            href="/for/project-managers/project-reporting"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong"
          >
            Project reporting guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Persona hub */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/for/project-managers"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <ClipboardList className="w-4 h-4 text-inverted-foreground/80" />
          Project Managers workflow hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Comparison CTAs */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
        <Link
          href="/compare/otter-ai-vs-fireflies-ai"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Zap className="w-4 h-4 text-inverted-foreground/80" />
          Otter.ai vs Fireflies.ai
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/compare/clickup-brain-vs-asana-ai"
          className="inline-flex items-center gap-2 text-xs font-bold text-intent-secondary bg-intent-secondary-muted border border-intent-secondary-border px-4 py-2.5 rounded-xl hover:bg-intent-secondary-muted transition-colors"
        >
          <Zap className="w-4 h-4 text-intent-secondary" />
          ClickUp Brain vs Asana AI
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/compare/sembly-ai-vs-onplana-status-report-writer"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Zap className="w-4 h-4 text-inverted-foreground/80" />
          Sembly AI vs Onplana
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tool sections */}
      {PM_SECTIONS.map((section) => {
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
          href="/ai-tool-finder"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-2 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          AI Tool Finder
        </Link>
        <Link
          href="/compare"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-2 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          PM tool comparisons
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
