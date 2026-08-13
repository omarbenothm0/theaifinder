import { Metadata } from 'next';
import Link from 'next/link';
import { ToolService } from '../../lib/services/tool.service';
import { FinderWizard } from '../../components/finder/FinderWizard';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('AI Tool Finder — Match by Task, Role & Budget'),
    description: 'Answer three short questions about your task, role, and budget to get personalized AI tool recommendations from our verified catalog.',
    canonicalUrl: '/ai-tool-finder'
  });
}

export default async function AIToolFinderPage() {
  const toolsRes = await ToolService.getTools({ limit: 100 });

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <section className="bg-background border border-border/50 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-medium text-foreground-strong">How the AI Tool Finder works</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Not sure where to start in the full catalog? The finder narrows {toolsRes.total} verified listings
          to a short list based on your primary use case, professional role, and budget preference.
          Recommendations use the same published tool data as the rest of the site — including approved user
          review signals where they exist.
        </p>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li><strong>Step 1 — Use case:</strong> Pick the task type (writing, coding, video, PM, etc.).</li>
          <li><strong>Step 2 — Role:</strong> Match tools commonly used by your job function.</li>
          <li><strong>Step 3 — Budget:</strong> Prefer free-only, freemium/trial, or any pricing.</li>
        </ul>
        <p className="text-xs text-muted-foreground">
          Prefer browsing manually?{' '}
          <Link href="/ai-tools" className="text-foreground font-semibold hover:underline inline-flex items-center gap-1">
            Search the full catalog <ArrowRight className="w-3 h-3" />
          </Link>
          {' '}or explore{' '}
          <Link href="/ai-tools-directory" className="text-foreground font-semibold hover:underline">
            categories by topic
          </Link>.
        </p>
      </section>

      <FinderWizard initialTools={toolsRes.tools} />
    </div>
  );
}
