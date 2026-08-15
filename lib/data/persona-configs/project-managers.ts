import { PersonaWorkflowConfig } from './types';

export const PROJECT_MANAGERS_CONFIG: PersonaWorkflowConfig = {
  slug: 'project-managers',
  title: 'Project Managers',
  challengesSectionTitle: 'Common PM Challenges',
  challenges: [
    {
      title: 'Meeting Overload',
      description: 'Back-to-back meetings make it difficult to capture action items and decisions that drive projects forward.',
    },
    {
      title: 'Task Chaos & Prioritization',
      description: 'Multiple workstreams, dependencies, and shifting deadlines create uncertainty about what matters most.',
    },
    {
      title: 'Reporting Pressure',
      description: 'Stakeholder updates and status reports consume hours of manual compilation and formatting work.',
    },
  ],
  workflowSectionTitle: 'PM Workflow Guides',
  selectionCriteriaSectionTitle: 'How We Select Tools for Project Managers',
  selectionCriteriaIntro: 'We evaluate tools based on verified PM workflows from official product sources:',
  selectionCriteria: [
    {
      category: 'Meeting capture',
      description: 'Transcription accuracy, action item extraction, and PM platform integrations',
    },
    {
      category: 'Task management',
      description: 'AI prioritization, planning assistance, and team collaboration features',
    },
    {
      category: 'Reporting',
      description: 'Status report generation, stakeholder deck creation, and update synthesis',
    },
    {
      category: 'PM fit',
      description: 'Designed for or commonly adopted by project managers in real workflows',
    },
  ],
  selectionCriteriaOutro: 'All tools are verified from official product pages, documentation, or pricing information to ensure accuracy for PM decision-making.',
  workflowContext: {
    'meeting-notes': {
      problem: "Meeting overload makes it hard to capture action items and decisions. As a project manager, you're often in back-to-back meetings where critical decisions get lost or action items are forgotten.",
      solution: "AI meeting notetakers automatically transcribe conversations, extract decisions, and identify action items so you can focus on the discussion while ensuring nothing falls through the cracks.",
    },
    'task-management': {
      problem: "Task chaos and unclear prioritization can derail projects. With multiple workstreams, dependencies, and shifting deadlines, it's challenging to keep everyone aligned on what matters most.",
      solution: "AI-powered task management tools help prioritize work, automatically assign tasks based on team capacity, and provide intelligent planning assistance to keep projects on track.",
    },
    'project-reporting': {
      problem: "Reporting pressure and stakeholder updates consume valuable time. Creating status reports and stakeholder presentations often means manually compiling updates from multiple sources and formatting them for different audiences.",
      solution: "AI reporting tools automatically generate status updates and stakeholder presentations by synthesizing information from meetings, tickets, and project updates, saving hours of manual work.",
    },
  },
  categoryLink: {
    href: '/category/project-management',
    text: 'Browse all AI project management software',
  },
  toolReasoningPrefix: 'Why this works for PMs',
  personaSlug: 'project-managers',
};
