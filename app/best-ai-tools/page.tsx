import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCard } from '../../components/tool/ToolCard';
import { InternalLinks } from '../../components/shared/InternalLinks';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import { Sparkles, Trophy, Star } from 'lucide-react';

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
      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          Editorial Selections &bull; 2026 Rankings
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Editorially Featured AI Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Standout listings flagged by our editorial team — not algorithmic rankings. Each profile links to full pricing, features, and alternatives.
        </p>
      </div>

      {/* Featured Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            Top Ranked Software
          </h2>
          <span className="text-xs font-bold text-slate-500">{featuredTools.length} Curated Tools</span>
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
