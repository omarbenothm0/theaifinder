import { Microscope } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const RESEARCHER_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'researchers',
  personaTitle: 'Researcher',
  icon: Microscope,
  workflowSections: [
    { slug: 'literature-discovery', label: 'Literature Discovery' },
    { slug: 'paper-reading-understanding', label: 'Paper Reading' },
    { slug: 'evidence-synthesis-citation-checking', label: 'Evidence & Citations' },
    { slug: 'research-web-discovery', label: 'Research & Web Discovery' },
    { slug: 'academic-writing', label: 'Academic Writing' },
    { slug: 'reference-management-organization', label: 'Reference Organization' },
  ],
  linkType: 'anchor',
};

interface ResearcherWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function ResearcherWorkflowLinks({ variant = 'compact' }: ResearcherWorkflowLinksProps) {
  return <WorkflowLinks config={RESEARCHER_CONFIG} variant={variant} />;
}
