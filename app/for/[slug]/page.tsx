import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PersonaService } from '../../../lib/services/persona.service';
import { ToolService } from '../../../lib/services/tool.service';
import { CategoryService } from '../../../lib/services/category.service';
import { PersonaToolsFilter } from '../../../components/tool/PersonaToolsFilter';
import { InternalLinks } from '../../../components/shared/InternalLinks';
import { JsonLd } from '../../../components/shared/JsonLd';
import { generatePersonaMetadata } from '../../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../../lib/seo/jsonld';
import { Users, CheckCircle2, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateStaticParams() {
  const personas = await PersonaService.getPersonas();
  return personas.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const persona = await PersonaService.getPersonaBySlug(slug);
  if (!persona) return { title: 'Persona Not Found' };
  return generatePersonaMetadata(persona);
}

export default async function PersonaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const persona = await PersonaService.getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  const [toolsRes, categories, personas] = await Promise.all([
    ToolService.getToolsByPersona(persona.slug),
    CategoryService.getCategories(),
    PersonaService.getPersonas()
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://aifind.io' },
    { name: 'Workflows', url: 'https://aifind.io/ai-tools-directory' },
    { name: persona.title, url: `https://aifind.io/for/${persona.slug}` }
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

      <InternalLinks categories={categories} personas={personas} />
    </div>
  );
}