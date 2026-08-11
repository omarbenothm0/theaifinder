import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCard } from '../../components/tool/ToolCard';
import { InternalLinks } from '../../components/shared/InternalLinks';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import { Smartphone, Sparkles } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Mobile AI Apps for iOS & Android'),
    description: 'Explore native iOS and Android AI applications with on-the-go speech recognition, photo generation, and smart assistants.',
    canonicalUrl: '/ai-apps'
  });
}

export default async function AIAppsPage() {
  const [toolsRes, categories, personas] = await Promise.all([
    ToolService.getTools({ limit: 100 }),
    CategoryService.getCategories(),
    PersonaService.getPersonas()
  ]);

  const mobileTools = toolsRes.tools.filter((t) => t.hasMobileApp);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Smartphone className="w-4 h-4 text-indigo-400" />
          Mobile Software Directory
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          AI Apps for iOS &amp; Android
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Artificial intelligence software available as mobile applications on Apple App Store and Google Play Store.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Mobile AI Applications ({mobileTools.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mobileTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <InternalLinks categories={categories} personas={personas} />
    </div>
  );
}
