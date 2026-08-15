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
    'AI project management software for meeting capture, task planning, and status reporting. Compare capabilities across meeting notetakers, AI PM platforms, and report generators.',
  longDescription:
    'Explore AI project management software by type: meeting notetakers with transcription and action items, AI-native PM platforms with intelligent task management, and status report generators for stakeholder updates. Compare features, integrations, and capabilities to find the right software for your needs.',
  toolCount: 0,
  faqs: [
    {
      question: 'What types of AI project management software exist?',
      answer:
        'The main categories are AI meeting notetakers (Otter.ai, Fireflies.ai), AI-native PM platforms (ClickUp Brain, Asana AI, Monday.com AI, Motion), and status report generators (Sembly AI, Onplana Status Report Writer, Microsoft 365 Copilot). Each type serves different PM workflows.',
    },
    {
      question: 'How do I choose between AI meeting notetakers?',
      answer:
        'Compare transcription accuracy, platform support (Zoom, Meet, Teams), action item extraction, and PM platform integrations. Otter.ai and Fireflies.ai are both strong choices — see /compare/otter-ai-vs-fireflies-ai for a detailed comparison.',
    },
    {
      question: 'What should I look for in AI task management platforms?',
      answer:
        'Key capabilities include AI task prioritization, automated assignment, project planning assistance, Gantt/timeline views, and team collaboration features. ClickUp Brain and Asana AI are leading platforms — see /compare/clickup-brain-vs-asana-ai.',
    },
    {
      question: 'How do AI status report generators work?',
      answer:
        'Tools like Sembly AI generate reports from meeting transcripts, while Onplana Status Report Writer formats pasted updates into executive reports. Compare data sources and output formats — see /compare/sembly-ai-vs-onplana-status-report-writer.',
    },
    {
      question: 'Is AI project planning separate from task management?',
      answer:
        'Many platforms combine both. This category includes planning-capable tools in the Task Management & Planning section since verified tool overlap exceeds 70%. For role-specific guidance, see the Project Managers workflow hub.',
    },
  ],
  seoTitle: 'Best AI Project Management Software (2026 Directory)',
  seoDescription:
    'Verified AI project management software organized by type, features, and capabilities — compare AI meeting notes, task planning, reporting, and related tools.',
};
