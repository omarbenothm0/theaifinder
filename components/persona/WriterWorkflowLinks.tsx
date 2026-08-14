import { BookOpen } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const WRITER_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'writers',
  personaTitle: 'Writer',
  icon: BookOpen,
  workflowSections: [
    { slug: 'drafting-composition', label: 'Drafting' },
    { slug: 'editing-proofreading', label: 'Editing' },
    { slug: 'research-for-writing', label: 'Research' },
    { slug: 'long-form-manuscripts', label: 'Long-Form' },
    { slug: 'writing-organization', label: 'Organization' },
  ],
  linkType: 'anchor',
};

interface WriterWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function WriterWorkflowLinks({ variant = 'compact' }: WriterWorkflowLinksProps) {
  return <WorkflowLinks config={WRITER_CONFIG} variant={variant} />;
}
