import Link from 'next/link';
import { Category, Persona, Tool } from '../../types/tool';
import { ToolService } from '../../lib/services/tool.service';
import { ComparisonService } from '../../lib/services/comparison.service';
import { ToolCard } from '../tool/ToolCard';
import { InternalLinks } from '../shared/InternalLinks';
import { JsonLd } from '../shared/JsonLd';
import { CODING_SECTIONS } from '../../lib/data/coding-category';
import { getFAQSchema, getCollectionPageSchema } from '../../lib/seo/jsonld';
import {
  ArrowRight,
  Code2,
  Compass,
  Layers,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../ui/PageHero';

interface CodingCategoryContentProps {
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

export async function CodingCategoryContent({
  category,
  categories,
  personas,
}: CodingCategoryContentProps) {
  const allSlugs = CODING_SECTIONS.flatMap((section) => section.toolSlugs);
  const [toolMap, comparisons] = await Promise.all([
    loadToolsBySlugs(allSlugs),
    ComparisonService.getComparisons(),
  ]);

  const curatedCount = allSlugs.filter((slug) => toolMap.has(slug)).length;
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
        title={<>Best AI Coding Tools</>}
        description={category.longDescription || category.description}
      />

      {/* Intent split */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-background-raised border border-border/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            Agentic repo workflows
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Multi-file edits, terminal agents, git automation, and IDE-native coding — Cursor and Claude
            Code cover overlapping but distinct surfaces.
          </p>
          <Link
            href="/compare/claude-code-vs-cursor"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong"
          >
            Compare Claude Code vs Cursor
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-background-raised border border-intent-secondary-border rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-intent-secondary-foreground uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            Generative UI output
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Prompt-to-React components with Tailwind and Shadcn-style output — v0 fits front-end
            prototyping before you integrate into a larger codebase.
          </p>
          <Link
            href="/tools/v0"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-intent-secondary hover:text-intent-secondary-hover"
          >
            v0 profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Comparison CTA */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/compare/claude-code-vs-cursor"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Zap className="w-4 h-4 text-inverted-foreground/80" />
          Compare Claude Code vs Cursor
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tool sections */}
      {CODING_SECTIONS.map((section) => {
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
          href="/free-ai-tools"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-2 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          Free-tier tools directory
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
