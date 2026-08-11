import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCard } from '../../components/tool/ToolCard';
import { InternalLinks } from '../../components/shared/InternalLinks';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import { DollarSign, CheckCircle2 } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Free AI Tools & Freemium Software Directory'),
    description: 'Discover completely free AI tools and platforms with generous free tiers or trial credits across all categories.',
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
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          Zero Dollar Software Hub
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Free AI Tools Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          High-performing AI applications you can use for free without entering credit card details or paying mandatory subscriptions.
        </p>
      </div>

      {/* Tools List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
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
