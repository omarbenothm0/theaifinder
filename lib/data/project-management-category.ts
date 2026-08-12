import { Category } from '../../types/tool';
import { PM_TOOLS, PM_TOOL_USE_CASES, PM_USE_CASES } from './pm-cluster';

const CAT_PM = 'cat-project-management';

const PM_INVENTORY_SLUGS = new Set(PM_TOOLS.map((t) => t.slug));

function useCaseMeta(useCaseSlug: string) {
  const useCase = PM_USE_CASES.find((u) => u.slug === useCaseSlug);
  if (!useCase) {
    throw new Error(`Missing PM use case: ${useCaseSlug}`);
  }
  return useCase;
}

/** Tool slugs for a PM use case, ordered by cluster mappings and limited to PM inventory. */
export function pmToolSlugsForUseCase(useCaseSlug: string): string[] {
  const seen = new Set<string>();
  const slugs: string[] = [];
  const mappings = PM_TOOL_USE_CASES.filter(
    (m) => m.useCaseSlug === useCaseSlug && m.fitTier !== 'exclude'
  ).sort((a, b) => a.displayOrder - b.displayOrder);

  for (const mapping of mappings) {
    if (!PM_INVENTORY_SLUGS.has(mapping.toolSlug) || seen.has(mapping.toolSlug)) continue;
    seen.add(mapping.toolSlug);
    slugs.push(mapping.toolSlug);
  }
  return slugs;
}

const meetingNotes = useCaseMeta('meeting-notes');
const taskManagement = useCaseMeta('task-management');
const projectReporting = useCaseMeta('project-reporting');

export const PM_SECTIONS = [
  {
    slug: 'meeting-notes',
    title: meetingNotes.title,
    description: meetingNotes.description,
    toolSlugs: pmToolSlugsForUseCase('meeting-notes'),
  },
  {
    slug: 'task-management',
    title: taskManagement.title,
    description: taskManagement.description,
    toolSlugs: pmToolSlugsForUseCase('task-management'),
  },
  {
    slug: 'project-reporting',
    title: 'AI Project Reporting & Decks',
    description: `${projectReporting.description} Includes status report generators and presentation deck builders for stakeholder updates.`,
    toolSlugs: pmToolSlugsForUseCase('project-reporting'),
  },
] as const;

export const PROJECT_MANAGEMENT_CATEGORY: Category = {
  id: CAT_PM,
  name: 'Project Management',
  slug: 'project-management',
  iconName: 'Kanban',
  description:
    'Verified AI tools for project managers — meeting notes, task planning, status reporting, and stakeholder decks from official product sources.',
  longDescription:
    'Explore verified AI project management tools for meeting capture, task and plan execution, and stakeholder reporting. Each section maps to PM workflows in our research cluster — meeting notetakers, AI-native PM platforms, and status report or deck generators — with listings sourced from official product pages.',
  toolCount: 0,
  faqs: [
    {
      question: 'What AI tools do project managers use most?',
      answer:
        'Common verified categories include AI meeting notetakers (Otter.ai, Fireflies.ai), AI-native PM platforms (ClickUp Brain, Asana AI, Monday.com AI, Motion), and status report generators (Sembly AI, Onplana Status Report Writer, Microsoft 365 Copilot in PowerPoint). See the Project Managers hub at /for/project-managers for workflow-level guides.',
    },
    {
      question: 'Is AI project planning the same as AI task management?',
      answer:
        'Many platforms cover both. On TheRadarHub, project planning content is merged into the task-management guide because verified tool overlap exceeded 70%. This category page lists planning-capable tools in the Task Management & Planning section.',
    },
    {
      question: 'Should I choose Otter.ai or Fireflies.ai for PM meetings?',
      answer:
        'Both are verified meeting notetakers with transcription, summaries, and action items. Otter.ai is often chosen for streamlined PM action-item workflows; Fireflies.ai for broader language support and CRM integrations. See /compare/otter-ai-vs-fireflies-ai for a detailed breakdown.',
    },
    {
      question: 'How do ClickUp Brain and Asana AI compare for PM teams?',
      answer:
        'ClickUp Brain suits teams consolidating tasks, docs, Gantt, and multi-model AI in one workspace. Asana AI fits orgs already on Asana timelines that want AI Teammates and official AI project plan templates. See /compare/clickup-brain-vs-asana-ai.',
    },
    {
      question: 'What is the difference between Sembly AI and Onplana for status reports?',
      answer:
        'Sembly AI generates project status reports from meeting transcripts as part of a full meeting-intelligence platform. Onplana Status Report Writer is a free paste-only tool that formats Slack, meeting, or ticket updates into RAG executive reports. See /compare/sembly-ai-vs-onplana-status-report-writer.',
    },
  ],
  seoTitle: 'Best AI Project Management Tools (2026)',
  seoDescription:
    'Verified AI PM tools — meeting notes, task planning, and status reporting — with workflow sections and official-sources comparison guides.',
};
