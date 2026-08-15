export interface PersonaWorkflowConfig {
  slug: string;
  title: string;
  challengesSectionTitle: string;
  challenges: Array<{
    title: string;
    description: string;
  }>;
  workflowSectionTitle: string;
  selectionCriteriaSectionTitle: string;
  selectionCriteriaIntro: string;
  selectionCriteria: Array<{
    category: string;
    description: string;
  }>;
  selectionCriteriaOutro: string;
  workflowContext: Record<string, {
    problem: string;
    solution: string;
  }>;
  categoryLink: {
    href: string;
    text: string;
  };
  toolReasoningPrefix: string;
  personaSlug: string;
}
