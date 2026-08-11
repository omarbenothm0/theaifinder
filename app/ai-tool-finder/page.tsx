import { Metadata } from 'next';
import { ToolService } from '../../lib/services/tool.service';
import { FinderWizard } from '../../components/finder/FinderWizard';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Interactive AI Tool Finder & Match Recommendation Quiz'),
    description: 'Answer 3 quick questions about your task and workflow to get personalized AI tool recommendations with score breakdowns.',
    canonicalUrl: '/ai-tool-finder'
  });
}

export default async function AIToolFinderPage() {
  const toolsRes = await ToolService.getTools({ limit: 100 });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FinderWizard initialTools={toolsRes.tools} />
    </div>
  );
}
