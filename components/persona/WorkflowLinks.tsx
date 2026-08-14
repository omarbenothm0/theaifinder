import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

export interface WorkflowSection {
  slug: string;
  label: string;
}

export interface WorkflowLinksConfig {
  personaSlug: string;
  personaTitle: string;
  icon: LucideIcon;
  workflowSections: WorkflowSection[];
  linkType: 'anchor' | 'use-case';
  description?: string;
}

interface WorkflowLinksProps {
  config: WorkflowLinksConfig;
  variant?: 'category' | 'compact';
}

export function WorkflowLinks({ config, variant = 'compact' }: WorkflowLinksProps) {
  const { personaSlug, personaTitle, icon: Icon, workflowSections, linkType, description } = config;

  if (variant === 'category') {
    // PM has a different category variant structure
    if (linkType === 'use-case' && description) {
      return (
        <div className="bg-background-raised rounded-2xl border border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-foreground" />
            <h3 className="font-bold text-foreground-strong text-sm">{personaTitle} Workflows</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/for/${personaSlug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary-foreground bg-primary hover:bg-foreground/90 px-3 py-2 rounded-xl transition-colors"
            >
              {personaTitle} Persona Hub
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {workflowSections.map((section) => (
              <Link
                key={section.slug}
                href={`/for/${personaSlug}/${section.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground bg-background-raised border border-border/50 px-3 py-2 rounded-xl hover:border-border transition-colors"
              >
                {section.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    // Standard category variant for anchor link personas
    return (
      <div className="max-w-4xl mx-auto bg-background-raised border border-border/50 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
          <Icon className="w-4 h-4" />
          {personaTitle} Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {workflowSections.map((section) => (
            <Link
              key={section.slug}
              href={`/for/${personaSlug}#${section.slug}`}
              className="text-xs font-bold text-foreground bg-background-raised border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href={`/for/${personaSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong transition-colors"
        >
          View full {personaTitle} hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  // Compact variant
  if (linkType === 'use-case') {
    // PM compact variant - direct use-case links
    return (
      <div className="flex flex-wrap gap-2">
        {workflowSections.map((section) => (
          <Link
            key={section.slug}
            href={`/for/${personaSlug}/${section.slug}`}
            className="text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
          >
            {section.label}
          </Link>
        ))}
      </div>
    );
  }

  // Standard compact variant for anchor link personas
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/for/${personaSlug}`}
        className="text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
      >
        All {personaTitle} Workflows
      </Link>
      {workflowSections.map((section) => (
        <Link
          key={section.slug}
          href={`/for/${personaSlug}#${section.slug}`}
          className="text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
