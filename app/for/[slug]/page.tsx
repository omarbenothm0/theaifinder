import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PersonaService } from '../../../lib/services/persona.service';
import { ToolService } from '../../../lib/services/tool.service';
import { CategoryService } from '../../../lib/services/category.service';
import { UseCaseService } from '../../../lib/services/use-case.service';
import { ComparisonService } from '../../../lib/services/comparison.service';
import { PersonaToolsFilter } from '../../../components/tool/PersonaToolsFilter';
import { PersonaUseCaseCards } from '../../../components/persona/PersonaUseCaseCards';
import { StudentHubSections } from '../../../components/persona/StudentHubSections';
import { InternalLinks } from '../../../components/shared/InternalLinks';
import { JsonLd } from '../../../components/shared/JsonLd';
import { generatePersonaMetadata, generateNotFoundMetadata } from '../../../lib/seo/metadata';
import { isPersonaIndexable } from '../../../lib/seo/indexability';
import { dbRepository } from '../../../lib/dbRepository';
import { generateBreadcrumbSchema } from '../../../lib/seo/jsonld';
import { getBaseUrl, absoluteUrl } from '../../../lib/seo/base-url';
import { getPersonaCategoryMapping } from '../../../lib/data/persona-category-mapping';
import { Users, CheckCircle2, Compass, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { PageHero, PageHeroAccentBadge } from '../../../components/ui/PageHero';

export const revalidate = 3600;

const HUB_PERSONA_SLUGS = new Set(['students', 'marketers', 'teachers', 'small-business', 'researchers', 'real-estate-agents', 'writers']);

const HUB_SECTION_HEADINGS: Record<string, string> = {
  students: 'Student Workflows',
  marketers: 'Marketing Workflows',
  teachers: 'Teaching Workflows',
  'small-business': 'Small Business Workflows',
  researchers: 'Researcher Workflows',
  'real-estate-agents': 'Real Estate Workflows',
  writers: 'Writer Workflows',
};

export async function generateStaticParams() {
  const personas = await PersonaService.getPersonas();
  const linkedToolCounts = await dbRepository.getPersonaLinkedToolCounts();
  return personas
    .filter((p) => isPersonaIndexable(p, linkedToolCounts[p.slug] ?? 0).indexable)
    .map((p) => ({
      slug: p.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const persona = await PersonaService.getPersonaBySlug(slug);
  if (!persona) return generateNotFoundMetadata('Persona Not Found');
  const linkedToolCount = await dbRepository.getPersonaLinkedToolCount(slug);
  return generatePersonaMetadata(persona, linkedToolCount);
}

export default async function PersonaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const persona = await PersonaService.getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  const [toolsRes, categories, personas, useCases, comparisons, hubSections] = await Promise.all([
    ToolService.getToolsByPersona(persona.slug),
    CategoryService.getCategories(),
    PersonaService.getPersonas(),
    UseCaseService.getPersonaUseCases(persona.slug),
    ComparisonService.getComparisons(),
    HUB_PERSONA_SLUGS.has(persona.slug)
      ? UseCaseService.getPersonaHubSections(persona.slug)
      : Promise.resolve([]),
  ]);

  const personaCategoryMapping = getPersonaCategoryMapping(persona.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: getBaseUrl() },
    { name: 'By Role', url: absoluteUrl('/for') },
    { name: persona.title, url: absoluteUrl(`/for/${persona.slug}`) }
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      <PageHero
        badge={
          <PageHeroAccentBadge icon={<Users className="w-4 h-4 text-inverted-foreground/80" />}>
            Workflow Guide &bull; {persona.title}
          </PageHeroAccentBadge>
        }
        title={persona.title}
        description={persona.description}
      />

      {personaCategoryMapping && (
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
          <Link
            href={`/category/${personaCategoryMapping.categorySlug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
          >
            <Layers className="w-4 h-4" />
            Browse all {categories.find((c) => c.slug === personaCategoryMapping.categorySlug)?.name || 'category'} tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {personaCategoryMapping.secondaryCategorySlug && (
            <Link
              href={`/category/${personaCategoryMapping.secondaryCategorySlug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-background border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
            >
              Browse {categories.find((c) => c.slug === personaCategoryMapping.secondaryCategorySlug)?.name || 'category'} tools
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}

      {HUB_PERSONA_SLUGS.has(persona.slug) && hubSections.length > 0 && (
        <StudentHubSections
          sections={hubSections}
          heading={HUB_SECTION_HEADINGS[persona.slug] ?? 'Workflows'}
        />
      )}

      {persona.slug === 'project-managers' && useCases.length > 0 && (
        <PersonaUseCaseCards personaSlug={persona.slug} useCases={useCases} />
      )}

      {/* Recommended Tools List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-foreground" />
            Recommended Tools for {persona.title} ({toolsRes.length})
          </h2>
        </div>

        <PersonaToolsFilter tools={toolsRes} />
      </div>

      {/* Tool Finder CTA */}
      <div className="bg-background-raised rounded-2xl border border-border/50 p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Compass className="w-8 h-8 text-foreground shrink-0" />
          <div>
            <h3 className="font-bold text-foreground-strong text-sm">Not seeing the right fit?</h3>
            <p className="text-xs text-muted-foreground">Take the 30-second Tool Finder quiz for a personalized match.</p>
          </div>
        </div>
        <Link
          href="/ai-tool-finder"
          className="bg-inverted text-inverted-foreground text-xs font-bold px-5 py-2.5 rounded-xl transition-colors hover:bg-inverted-foreground/10 flex items-center gap-1.5 shrink-0"
        >
          Try the AI Tool Finder
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <InternalLinks
        categories={categories}
        personas={personas}
        comparisons={comparisons}
        excludePersonaSlug={persona.slug}
      />
    </div>
  );
}