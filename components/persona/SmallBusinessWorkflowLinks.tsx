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
      <div className="max-w-4xl mx-auto bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 uppercase tracking-wider">
          <Store className="w-4 h-4" />
          Small Business Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/for/small-business#${section.slug}`}
              className="text-xs font-bold text-indigo-700 bg-white border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href="/for/small-business"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-colors"
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
        className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
      >
        All Small Business Workflows
      </Link>
      {WORKFLOW_SECTIONS.map((section) => (
        <Link
          key={section.slug}
          href={`/for/small-business#${section.slug}`}
          className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
