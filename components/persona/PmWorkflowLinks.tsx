import Link from 'next/link';
import { ArrowRight, Kanban } from 'lucide-react';

/** Contextual links between PM category, persona hub, and use-case pages. */
export function PmWorkflowLinks({ variant = 'category' }: { variant?: 'category' | 'compact' }) {
  const useCases = [
    { slug: 'meeting-notes', label: 'AI Meeting Notes' },
    { slug: 'task-management', label: 'Task Management & Planning' },
    { slug: 'project-reporting', label: 'Project Reporting' },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-2">
        {useCases.map((uc) => (
          <Link
            key={uc.slug}
            href={`/for/project-managers/${uc.slug}`}
            className="text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
          >
            {uc.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-background-raised rounded-2xl border border-border/50 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Kanban className="w-5 h-5 text-foreground" />
        <h3 className="font-bold text-foreground-strong text-sm">Project Manager Workflows</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Browse verified PM use-case guides — meeting notes, task planning, and status reporting — curated from official sources.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/for/project-managers"
          className="inline-flex items-center gap-2 text-xs font-bold text-primary-foreground bg-primary hover:bg-foreground/90 px-3 py-2 rounded-xl transition-colors"
        >
          PM Persona Hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        {useCases.map((uc) => (
          <Link
            key={uc.slug}
            href={`/for/project-managers/${uc.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-foreground bg-background-raised border border-border/50 px-3 py-2 rounded-xl hover:border-border transition-colors"
          >
            {uc.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
