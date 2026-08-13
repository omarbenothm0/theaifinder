import Link from 'next/link';
import { Category, Persona, Tool } from '../../types/tool';
import { ToolService } from '../../lib/services/tool.service';
import { ComparisonService } from '../../lib/services/comparison.service';
import { ToolCard } from '../tool/ToolCard';
import { InternalLinks } from '../shared/InternalLinks';
import { JsonLd } from '../shared/JsonLd';
import { SEO_SECTIONS } from '../../lib/data/seo-category';
import { getFAQSchema, getCollectionPageSchema } from '../../lib/seo/jsonld';
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Layers,
  Microscope,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface SeoCategoryContentProps {
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

export async function SeoCategoryContent({
  category,
  categories,
  personas,
}: SeoCategoryContentProps) {
  const allSlugs = SEO_SECTIONS.flatMap((section) => section.toolSlugs);
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
      <div className="bg-inverted text-inverted-foreground rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-accent" />
          Category Hub &bull; {curatedCount} Curated {curatedCount === 1 ? 'Tool' : 'Tools'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight">
          AI SEO &amp; Web Research Tools
        </h1>
        <p className="text-sm sm:text-base text-inverted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          {category.longDescription || category.description}
        </p>
      </div>

      {/* Intent split */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-background-raised border border-accent/20 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Search className="w-4 h-4" />
            Cited web research
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Live web answers with inline source links — Perplexity AI for discovery and synthesis,
            not rank tracking or site audits.
          </p>
          <Link
            href="/for/researchers#research-web-discovery"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-foreground-strong"
          >
            Researchers — web discovery workflow
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-background-raised border border-violet-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-800 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            SEO toolkits
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Keyword research, competitive analysis, and site workflows — Semrush for marketing SEO
            operations, not general answer synthesis.
          </p>
          <Link
            href="/for/marketers#seo-search"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900"
          >
            Marketers — SEO &amp; search workflow
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Related hubs */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
        <Link
          href="/category/study-education"
          className="inline-flex items-center gap-2 text-xs font-bold text-accent bg-accent/10 border border-accent/20 px-4 py-2.5 rounded-xl hover:bg-accent/15 transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          Study &amp; Education (academic research)
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/category/marketing"
          className="inline-flex items-center gap-2 text-xs font-bold text-accent bg-accent/10 border border-accent/20 px-4 py-2.5 rounded-xl hover:bg-accent/15 transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          Marketing &amp; CRM category
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/for/researchers"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-background border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Microscope className="w-4 h-4" />
          Researchers hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/for/marketers"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-background border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          Marketers hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tool sections */}
      {SEO_SECTIONS.map((section) => {
        const sectionTools = section.toolSlugs
          .map((slug) => toolMap.get(slug))
          .filter(Boolean) as Tool[];
        if (sectionTools.length === 0) return null;

        return (
          <div key={section.slug} className="space-y-4">
            <div className="border-b border-border/50 pb-3 space-y-2">
              <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
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
