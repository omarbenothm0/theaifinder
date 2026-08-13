import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCard } from '../../components/tool/ToolCard';
import { InternalLinks } from '../../components/shared/InternalLinks';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import { DollarSign, CheckCircle2 } from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../../components/ui/PageHero';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Free & Freemium AI Tools Directory'),
    description: 'AI tools with free plans, freemium tiers, or no-credit-card trials — filter the catalog by zero-cost access options.',
    canonicalUrl: '/free-ai-tools'
  });
}

export default async function FreeAIToolsPage() {
  const [toolsRes, categories, personas] = await Promise.all([
    ToolService.getTools({ limit: 100 }),
    CategoryService.getCategories(),
    PersonaService.getPersonas()
  ]);

  const freeTools = toolsRes.tools.filter(
    (t) => t.pricingModel === 'Free' || t.pricingModel === 'Freemium' || t.hasFreeTrial
  );

  return (
    <div className="space-y-10">
      <PageHero
        badge={
          <PageHeroAccentBadge icon={<DollarSign className="w-4 h-4 text-accent" />}>
            Zero Dollar Software Hub
          </PageHeroAccentBadge>
        }
        title={<>Free &amp; Freemium AI Tools</>}
        description="Tools you can start using at no cost — free plans, freemium tiers, or trial access without a mandatory subscription."
      />

      {/* Tools List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            Free &amp; Freemium Applications ({freeTools.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <InternalLinks categories={categories} personas={personas} />
    </div>
  );
}
