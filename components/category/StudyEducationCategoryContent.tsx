import Link from 'next/link';
import { Category, Persona, Tool } from '../../types/tool';
import { ToolService } from '../../lib/services/tool.service';
import { ToolCard } from '../tool/ToolCard';
import { InternalLinks } from '../shared/InternalLinks';
import { JsonLd } from '../shared/JsonLd';
import { StudentWorkflowLinks } from '../persona/StudentWorkflowLinks';
import { TeacherWorkflowLinks } from '../persona/TeacherWorkflowLinks';
import { ResearcherWorkflowLinks } from '../persona/ResearcherWorkflowLinks';
import { STUDY_SECTIONS } from '../../lib/data/study-education-category';
import { getFAQSchema, getCollectionPageSchema } from '../../lib/seo/jsonld';
import { ArrowRight, Compass, GraduationCap, Layers, Sparkles } from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../ui/PageHero';

interface StudyEducationCategoryContentProps {
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

export async function StudyEducationCategoryContent({
  category,
  categories,
  personas,
}: StudyEducationCategoryContentProps) {
  const allSlugs = STUDY_SECTIONS.flatMap((section) => section.toolSlugs);
  const toolMap = await loadToolsBySlugs(allSlugs);

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
          <PageHeroAccentBadge icon={<Layers className="w-4 h-4 text-accent" />}>
            Category Hub &bull; {curatedCount} Curated {curatedCount === 1 ? 'Tool' : 'Tools'}
          </PageHeroAccentBadge>
        }
        title={<>Best AI Study Tools</>}
        description={category.longDescription || category.description}
      >
        <Link
          href="/for/students"
          className="inline-flex items-center gap-2 text-xs font-bold text-primary-foreground bg-primary hover:bg-foreground/90 px-4 py-2.5 rounded-xl transition-colors mt-2"
        >
          <GraduationCap className="w-4 h-4" />
          Students workflow hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </PageHero>

      {/* Workflow links */}
      <StudentWorkflowLinks variant="category" />
      <TeacherWorkflowLinks variant="category" />
      <ResearcherWorkflowLinks variant="category" />

      {/* Tool sections */}
      {STUDY_SECTIONS.map((section) => {
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
              <Link
                href={`/for/students#${section.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-foreground-strong"
              >
                View on Students hub
                <ArrowRight className="w-3.5 h-3.5" />
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

      {/* Helper links */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
        <Link
          href="/for/students"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-2 rounded-xl hover:bg-accent/15 transition-colors"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Full Students hub
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
        excludeCategorySlug={category.slug}
        title="Explore Related Hubs & Comparisons"
      />
    </div>
  );
}
