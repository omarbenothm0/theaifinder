import { Home } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const REAL_ESTATE_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'real-estate-agents',
  personaTitle: 'Real Estate',
  icon: Home,
  workflowSections: [
    { slug: 'listing-copy-descriptions', label: 'Listing Copy' },
    { slug: 'property-visuals-staging', label: 'Property Visuals' },
    { slug: 'client-presentations-pitch-decks', label: 'Client Presentations' },
    { slug: 'market-neighborhood-research', label: 'Market Research' },
    { slug: 'social-media-marketing', label: 'Social Marketing' },
    { slug: 'client-meetings-follow-ups', label: 'Client Meetings' },
  ],
  linkType: 'anchor',
};

interface RealEstateWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function RealEstateWorkflowLinks({ variant = 'compact' }: RealEstateWorkflowLinksProps) {
  return <WorkflowLinks config={REAL_ESTATE_CONFIG} variant={variant} />;
}
