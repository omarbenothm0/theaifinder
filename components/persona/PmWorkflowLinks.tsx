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
            className="text-xs font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full hover:bg-accent/15 transition-colors"
          >
            {uc.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-accent/10/80 rounded-2xl border border-accent/20 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Kanban className="w-5 h-5 text-accent" />
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
            className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-background-raised border border-accent/20 px-3 py-2 rounded-xl hover:border-accent/30 transition-colors"
          >
            {uc.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
