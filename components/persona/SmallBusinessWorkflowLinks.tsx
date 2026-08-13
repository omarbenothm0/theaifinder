import Link from 'next/link';
import { ArrowRight, Store } from 'lucide-react';

const WORKFLOW_SECTIONS = [
  { slug: 'marketing-content', label: 'Marketing & Content' },
  { slug: 'sales-customer-management', label: 'Sales & CRM' },
  { slug: 'customer-support', label: 'Customer Support' },
  { slug: 'research-business-strategy', label: 'Research & Strategy' },
  { slug: 'operations-productivity', label: 'Operations & Productivity' },
  { slug: 'finance-administration', label: 'Finance & Admin' },
];

interface SmallBusinessWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function SmallBusinessWorkflowLinks({ variant = 'compact' }: SmallBusinessWorkflowLinksProps) {
  if (variant === 'category') {
    return (
      <div className="max-w-4xl mx-auto bg-background-raised border border-border/50 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
          <Store className="w-4 h-4" />
          Small Business Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/for/small-business#${section.slug}`}
              className="text-xs font-bold text-foreground bg-background-raised border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href="/for/small-business"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong transition-colors"
        >
          View full Small Business hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/for/small-business"
        className="text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
      >
        All Small Business Workflows
      </Link>
      {WORKFLOW_SECTIONS.map((section) => (
        <Link
          key={section.slug}
          href={`/for/small-business#${section.slug}`}
          className="text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
