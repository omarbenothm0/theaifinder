import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { CategoryService } from '../../lib/services/category.service';
import { PersonaService } from '../../lib/services/persona.service';
import { ToolCard } from '../../components/tool/ToolCard';
import { InternalLinks } from '../../components/shared/InternalLinks';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import { Smartphone, Sparkles } from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../../components/ui/PageHero';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('AI Mobile Apps for iOS & Android'),
    description: 'Native iOS and Android AI applications — on-the-go assistants, image tools, voice apps, and mobile-first workflows.',
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
      <PageHero
        badge={
          <PageHeroAccentBadge icon={<Smartphone className="w-4 h-4 text-inverted-foreground/80" />}>
            Mobile Software Directory
          </PageHeroAccentBadge>
        }
        title={<>AI Apps for iOS &amp; Android</>}
        description="Artificial intelligence software available as mobile applications on Apple App Store and Google Play Store."
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-foreground" />
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
