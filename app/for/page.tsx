import { Metadata } from 'next';
import Link from 'next/link';
import { PersonaService } from '../../lib/services/persona.service';
import { JsonLd } from '../../components/shared/JsonLd';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { getBaseUrl, absoluteUrl } from '../../lib/seo/base-url';
import { sitePageTitle } from '../../lib/brand';
import { sortPublicPersonasByNavOrder } from '../../lib/seo/persona-visibility';
import { Users, ArrowRight } from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../../components/ui/PageHero';

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
  const personas = sortPublicPersonasByNavOrder(allPersonas);
  const baseUrl = getBaseUrl();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'By Role', url: absoluteUrl('/for') }
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      <PageHero
        badge={
          <PageHeroAccentBadge icon={<Users className="w-4 h-4 text-inverted-foreground/80" />}>
            Workflow Guides
          </PageHeroAccentBadge>
        }
        title="Find AI Tools For Your Role"
        description="Curated AI tool recommendations organized by profession and workflow — pick your role to get started."
      />

      {/* Personas Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Users className="w-5 h-5 text-foreground" />
            All Roles ({personas.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p) => (
            <Link
              key={p.slug}
              href={`/for/${p.slug}`}
              className="bg-background-raised p-5 rounded-2xl border border-border/50 hover:border-border shadow-2xs hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-foreground-strong text-sm mb-1 group-hover:text-foreground-strong transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{p.description}</p>
              <div className="flex items-center justify-between text-[11px] font-bold text-foreground pt-2 border-t border-border/30">
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