import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

const WORKFLOW_SECTIONS = [
  { slug: 'content-marketing', label: 'Content Marketing' },
  { slug: 'seo-search', label: 'SEO & Search' },
  { slug: 'social-media', label: 'Social Media' },
  { slug: 'email-marketing', label: 'Email Marketing' },
  { slug: 'ad-creation', label: 'Ad Creation' },
  { slug: 'marketing-analytics', label: 'Marketing Analytics' },
];

interface MarketerWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function MarketerWorkflowLinks({ variant = 'compact' }: MarketerWorkflowLinksProps) {
  if (variant === 'category') {
    return (
      <div className="max-w-4xl mx-auto bg-accent/10 border border-accent/20 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" />
          Marketer Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/for/marketers#${section.slug}`}
              className="text-xs font-bold text-accent bg-background-raised border border-accent/20 px-3 py-1.5 rounded-full hover:bg-accent/15 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href="/for/marketers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-foreground-strong transition-colors"
        >
          View full Marketers hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/for/marketers"
        className="text-xs font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full hover:bg-accent/15 transition-colors"
      >
        All Marketer Workflows
      </Link>
      {WORKFLOW_SECTIONS.map((section) => (
        <Link
          key={section.slug}
          href={`/for/marketers#${section.slug}`}
          className="text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
