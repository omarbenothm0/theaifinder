import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

const WORKFLOW_SECTIONS = [
  { slug: 'listing-copy-descriptions', label: 'Listing Copy' },
  { slug: 'property-visuals-staging', label: 'Property Visuals' },
  { slug: 'client-presentations-pitch-decks', label: 'Client Presentations' },
  { slug: 'market-neighborhood-research', label: 'Market Research' },
  { slug: 'social-media-marketing', label: 'Social Marketing' },
  { slug: 'client-meetings-follow-ups', label: 'Client Meetings' },
];

interface RealEstateWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function RealEstateWorkflowLinks({ variant = 'compact' }: RealEstateWorkflowLinksProps) {
  if (variant === 'category') {
    return (
      <div className="max-w-4xl mx-auto bg-background-raised border border-border/50 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
          <Home className="w-4 h-4" />
          Real Estate Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/for/real-estate-agents#${section.slug}`}
              className="text-xs font-bold text-foreground bg-background-raised border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href="/for/real-estate-agents"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong transition-colors"
        >
          View full Real Estate hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/for/real-estate-agents"
        className="text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
      >
        All Real Estate Workflows
      </Link>
      {WORKFLOW_SECTIONS.map((section) => (
        <Link
          key={section.slug}
          href={`/for/real-estate-agents#${section.slug}`}
          className="text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
