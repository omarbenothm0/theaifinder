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
import { Users, CheckCircle2, Compass, ArrowRight, Layers, GraduationCap, TrendingUp, Store, Microscope, Home, BookOpen } from 'lucide-react';
import Link from 'next/link';

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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: getBaseUrl() },
    { name: 'Workflows', url: absoluteUrl('/ai-tools-directory') },
    { name: persona.title, url: absoluteUrl(`/for/${persona.slug}`) }
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4 text-indigo-400" />
          Workflow Guide &bull; {persona.title}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {persona.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {persona.description}
        </p>
      </div>

      {persona.slug === 'project-managers' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/project-management"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <Layers className="w-4 h-4" />
            Browse all Project Management category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {persona.slug === 'students' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/study-education"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            Browse all Study &amp; Education category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {persona.slug === 'marketers' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/writing"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            Browse Writing &amp; Copywriting category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {persona.slug === 'teachers' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/study-education"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            Browse Study &amp; Education category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {persona.slug === 'small-business' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/productivity"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <Store className="w-4 h-4" />
            Browse Productivity &amp; Search category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {persona.slug === 'researchers' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/study-education"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <Microscope className="w-4 h-4" />
            Browse Study &amp; Education category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {persona.slug === 'real-estate-agents' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/image"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <Home className="w-4 h-4" />
            Browse Image &amp; Design category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {persona.slug === 'writers' && (
        <div className="max-w-4xl mx-auto">
          <Link
            href="/category/writing"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Browse Writing &amp; Copywriting category tools
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            Recommended Tools for {persona.title} ({toolsRes.length})
          </h2>
        </div>

        <PersonaToolsFilter tools={toolsRes} />
      </div>

      {/* Tool Finder CTA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Compass className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Not seeing the right fit?</h3>
            <p className="text-xs text-slate-500">Take the 30-second Tool Finder quiz for a personalized match.</p>
          </div>
        </div>
        <Link
          href="/ai-tool-finder"
          className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors hover:bg-slate-800 flex items-center gap-1.5 shrink-0"
        >
          Try the AI Tool Finder
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <InternalLinks categories={categories} personas={personas} comparisons={comparisons} />
    </div>
  );
}