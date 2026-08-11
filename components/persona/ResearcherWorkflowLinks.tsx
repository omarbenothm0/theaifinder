import Link from 'next/link';
import { ArrowRight, Microscope } from 'lucide-react';

const WORKFLOW_SECTIONS = [
  { slug: 'literature-discovery', label: 'Literature Discovery' },
  { slug: 'paper-reading-understanding', label: 'Paper Reading' },
  { slug: 'evidence-synthesis-citation-checking', label: 'Evidence & Citations' },
  { slug: 'research-web-discovery', label: 'Research & Web Discovery' },
  { slug: 'academic-writing', label: 'Academic Writing' },
  { slug: 'reference-management-organization', label: 'Reference Organization' },
];

interface ResearcherWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function ResearcherWorkflowLinks({ variant = 'compact' }: ResearcherWorkflowLinksProps) {
  if (variant === 'category') {
    return (
      <div className="max-w-4xl mx-auto bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 uppercase tracking-wider">
          <Microscope className="w-4 h-4" />
          Researcher Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/for/researchers#${section.slug}`}
              className="text-xs font-bold text-indigo-700 bg-white border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href="/for/researchers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-colors"
        >
          View full Researchers hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/for/researchers"
        className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
      >
        All Researcher Workflows
      </Link>
      {WORKFLOW_SECTIONS.map((section) => (
        <Link
          key={section.slug}
          href={`/for/researchers#${section.slug}`}
          className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
