import { Kanban } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const PM_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'project-managers',
  personaTitle: 'Project Manager',
  icon: Kanban,
  workflowSections: [
    { slug: 'meeting-notes', label: 'AI Meeting Notes' },
    { slug: 'task-management', label: 'Task Management & Planning' },
    { slug: 'project-reporting', label: 'Project Reporting' },
  ],
  linkType: 'use-case',
  description: 'Browse verified PM use-case guides — meeting notes, task planning, and status reporting — curated from official sources.',
};

interface PmWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function PmWorkflowLinks({ variant = 'category' }: PmWorkflowLinksProps) {
  return <WorkflowLinks config={PM_CONFIG} variant={variant} />;
}
