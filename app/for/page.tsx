import { Metadata } from 'next';
import Link from 'next/link';
import { PersonaService } from '../../lib/services/persona.service';
import { JsonLd } from '../../components/shared/JsonLd';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { getBaseUrl, absoluteUrl } from '../../lib/seo/base-url';
import { sitePageTitle } from '../../lib/brand';
import { isDeprecatedPersonaNavSlug } from '../../lib/seo/persona-visibility';
import { Users, ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Browse AI Tools by Role & Profession'),
    description: 'Find the best AI tools curated for your role — project managers, marketers, writers, teachers, small business owners, and more.',
    canonicalUrl: '/for'
  });
}

export default async function ForIndexPage() {
  const allPersonas = await PersonaService.getPersonas();
  const personas = allPersonas.filter((p) => !isDeprecatedPersonaNavSlug(p.slug));
  const baseUrl = getBaseUrl();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'By Role', url: absoluteUrl('/for') }
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Header */}
      <div className="bg-inverted text-inverted-foreground rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4 text-accent" />
          Workflow Guides
        </div>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight">
          Find AI Tools For Your Role
        </h1>
        <p className="text-sm sm:text-base text-inverted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Curated AI tool recommendations organized by profession and workflow — pick your role to get started.
        </p>
      </div>

      {/* Personas Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            All Roles ({personas.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p) => (
            <Link
              key={p.slug}
              href={`/for/${p.slug}`}
              className="bg-background-raised p-5 rounded-2xl border border-border/50 hover:border-accent/30 shadow-2xs hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-foreground-strong text-sm mb-1 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{p.description}</p>
              <div className="flex items-center justify-between text-[11px] font-bold text-accent pt-2 border-t border-border/30">
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