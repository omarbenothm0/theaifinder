import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCard } from '../../components/tool/ToolCard';
import { InternalLinks } from '../../components/shared/InternalLinks';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import { Sparkles, Trophy, Star } from 'lucide-react';
import { PageHero, PageHeroRatingBadge } from '../../components/ui/PageHero';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Editorially Featured AI Tools (2026)'),
    description: 'Hand-picked featured AI tool listings selected by our editorial team — browse standout options across major categories.',
    canonicalUrl: '/best-ai-tools'
  });
}

export default async function BestAIToolsPage() {
  const [featuredTools, categories, personas] = await Promise.all([
    ToolService.getFeaturedTools(),
    CategoryService.getCategories(),
    PersonaService.getPersonas()
  ]);

  return (
    <div className="space-y-10">
      <PageHero
        badge={
          <PageHeroRatingBadge icon={<Trophy className="w-4 h-4 text-rating" />}>
            Editorial Selections &bull; 2026 Rankings
          </PageHeroRatingBadge>
        }
        title="Editorially Featured AI Tools"
        description="Standout listings flagged by our editorial team — not algorithmic rankings. Each profile links to full pricing, features, and alternatives."
      />

      {/* Featured Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Star className="w-5 h-5 fill-rating text-rating" />
            Top Ranked Software
          </h2>
          <span className="text-xs font-medium text-muted-foreground">{featuredTools.length} Curated Tools</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Internal SEO Hub Links */}
      <InternalLinks
        categories={categories}
        personas={personas}
        title="Explore Related Top Category Rankings"
      />
    </div>
  );
}
