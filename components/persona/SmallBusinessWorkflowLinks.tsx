import { Store } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const SMALL_BUSINESS_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'small-business',
  personaTitle: 'Small Business',
  icon: Store,
  workflowSections: [
    { slug: 'marketing-content', label: 'Marketing & Content' },
    { slug: 'sales-customer-management', label: 'Sales & CRM' },
    { slug: 'customer-support', label: 'Customer Support' },
    { slug: 'research-business-strategy', label: 'Research & Strategy' },
    { slug: 'operations-productivity', label: 'Operations & Productivity' },
    { slug: 'finance-administration', label: 'Finance & Admin' },
  ],
  linkType: 'anchor',
};

interface SmallBusinessWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function SmallBusinessWorkflowLinks({ variant = 'compact' }: SmallBusinessWorkflowLinksProps) {
  return <WorkflowLinks config={SMALL_BUSINESS_CONFIG} variant={variant} />;
}
