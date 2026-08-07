import { Metadata } from 'next';
import Link from 'next/link';
import { PersonaService } from '../../lib/services/persona.service';
import { JsonLd } from '../../components/shared/JsonLd';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { Users, ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Browse AI Tools by Role & Profession',
    description: 'Find the best AI tools curated for your role — developers, marketers, content creators, teachers, and more.',
    canonicalUrl: 'https://aifind.io/for'
  });
}

export default async function ForIndexPage() {
  const personas = await PersonaService.getPersonas();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://aifind.io' },
    { name: 'By Role', url: 'https://aifind.io/for' }
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4 text-indigo-400" />
          Workflow Guides
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Find AI Tools For Your Role
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Curated AI tool recommendations organized by profession and workflow — pick your role to get started.
        </p>
      </div>

      {/* Personas Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            All Roles ({personas.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p) => (
            <Link
              key={p.slug}
              href={`/for/${p.slug}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{p.description}</p>
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 pt-2 border-t border-slate-100">
                <span>View Recommendations</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}