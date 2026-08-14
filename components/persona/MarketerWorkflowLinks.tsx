import { TrendingUp } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const MARKETER_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'marketers',
  personaTitle: 'Marketer',
  icon: TrendingUp,
  workflowSections: [
    { slug: 'content-marketing', label: 'Content Marketing' },
    { slug: 'seo-search', label: 'SEO & Search' },
    { slug: 'social-media', label: 'Social Media' },
    { slug: 'email-marketing', label: 'Email Marketing' },
    { slug: 'ad-creation', label: 'Ad Creation' },
    { slug: 'marketing-analytics', label: 'Marketing Analytics' },
  ],
  linkType: 'anchor',
};

interface MarketerWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function MarketerWorkflowLinks({ variant = 'compact' }: MarketerWorkflowLinksProps) {
  return <WorkflowLinks config={MARKETER_CONFIG} variant={variant} />;
}
