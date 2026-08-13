import Link from 'next/link';
import { Category, Persona, Tool } from '../../types/tool';
import { ToolService } from '../../lib/services/tool.service';
import { ToolCard } from '../tool/ToolCard';
import { InternalLinks } from '../shared/InternalLinks';
import { JsonLd } from '../shared/JsonLd';
import { WriterWorkflowLinks } from '../persona/WriterWorkflowLinks';
import { MarketerWorkflowLinks } from '../persona/MarketerWorkflowLinks';
import {
  WRITING_AUTHOR_SECTIONS,
  WRITING_MARKETING_TOOL_SLUGS,
} from '../../lib/data/writing-category';
import { getFAQSchema, getCollectionPageSchema } from '../../lib/seo/jsonld';
import {
  ArrowRight,
  BookOpen,
  Layers,
  Megaphone,
  PenTool,
  Sparkles,
} from 'lucide-react';

interface WritingCategoryContentProps {
  category: Category;
  categories: Category[];
  personas: Persona[];
}

function prioritizeWritingPersonas(personas: Persona[]): Persona[] {
  const writers = personas.find((p) => p.slug === 'writers');
  const marketers = personas.find((p) => p.slug === 'marketers');
  const rest = personas.filter((p) => p.slug !== 'writers' && p.slug !== 'marketers');
  return [writers, marketers, ...rest].filter(Boolean) as Persona[];
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

export async function WritingCategoryContent({
  category,
  categories,
  personas,
}: WritingCategoryContentProps) {
  const authorSlugs = WRITING_AUTHOR_SECTIONS.flatMap((section) => section.toolSlugs);
  const marketingSlugs = [...WRITING_MARKETING_TOOL_SLUGS];
  const [toolMap, categoryToolsRes] = await Promise.all([
    loadToolsBySlugs([...authorSlugs, ...marketingSlugs]),
    ToolService.getTools({ category: category.slug, limit: 100 }),
  ]);

  const curatedCount = new Set([...authorSlugs, ...marketingSlugs]).size;
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
          Category Hub &bull; {curatedCount} Curated Tools
        </div>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight">Best AI Writing Tools</h1>
        <p className="text-sm sm:text-base text-inverted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          {category.longDescription || category.description}
        </p>
      </div>

      {/* Intent split */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/for/writers"
          className="group bg-background-raised border border-accent/20 rounded-2xl p-5 space-y-2 hover:border-accent/30 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            For Authors &amp; Editors
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Drafting, proofreading, writing research, long-form manuscripts, and project organization.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:text-foreground-strong">
            Writers hub
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
        <Link
          href="/for/marketers"
          className="group bg-background-raised border border-violet-200 rounded-2xl p-5 space-y-2 hover:border-violet-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-violet-800 uppercase tracking-wider">
            <Megaphone className="w-4 h-4" />
            For Marketers &amp; Copy Teams
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Campaign copy, content marketing, email, ads, and SEO workflows — separate from author tools.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 group-hover:text-violet-900">
            Marketers hub
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <WriterWorkflowLinks variant="category" />
      <MarketerWorkflowLinks variant="category" />

      {/* Author & editor sections */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <PenTool className="w-5 h-5 text-accent" />
            Author &amp; Editor Writing Tools
          </h2>
          <Link
            href="/for/writers"
            className="text-xs font-bold text-accent hover:text-foreground-strong transition-colors"
          >
            Full Writers hub
          </Link>
        </div>

        {WRITING_AUTHOR_SECTIONS.map((section) => {
          const sectionTools = section.toolSlugs
            .map((slug) => toolMap.get(slug))
            .filter(Boolean) as Tool[];
          if (sectionTools.length === 0) return null;

          return (
            <div key={section.slug} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-foreground-strong">{section.title}</h3>
                <Link
                  href={`/for/writers#${section.slug}`}
                  className="text-xs font-bold text-muted-foreground hover:text-accent whitespace-nowrap"
                >
                  Workflow guide
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionTools.map((tool) => (
                  <ToolCard key={`${section.slug}-${tool.id}`} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Marketing section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-violet-600" />
            Marketing &amp; Copywriting Tools
          </h2>
          <Link
            href="/for/marketers"
            className="text-xs font-bold text-violet-700 hover:text-violet-900 transition-colors"
          >
            Full Marketers hub
          </Link>
        </div>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Jasper and Copy.ai are marketing-first platforms for campaign copy and content marketing — kept
          separate from the author and editor tools above.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingSlugs
            .map((slug) => toolMap.get(slug))
            .filter(Boolean)
            .map((tool) => (
              <ToolCard key={tool!.id} tool={tool!} />
            ))}
        </div>
      </div>

      {/* Category-native listings */}
      {categoryToolsRes.tools.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              All Tools in {category.name} ({categoryToolsRes.tools.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryToolsRes.tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

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
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/for/students"
              className="text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
            >
              Academic writing (Students hub)
            </Link>
          </div>
        </section>
      )}

      <InternalLinks
        categories={categories}
        personas={prioritizeWritingPersonas(personas)}
        title="Explore Related Writing Hubs"
      />
    </div>
  );
}
