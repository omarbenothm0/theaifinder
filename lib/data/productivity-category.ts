import { Category } from '../../types/tool';

export const CAT_PRODUCTIVITY = 'cat-productivity';

/** Primary catalog assignments for this category (categoryId on tool records). */
export const PRODUCTIVITY_PRIMARY_TOOL_SLUGS = ['notion-ai', 'todoist-assist'] as const;

/** Cross-listed from Project Management — meeting capture intent only. */
export const PRODUCTIVITY_MEETING_CROSS_LIST_SLUGS = ['otter-ai', 'fathom'] as const;

export const PRODUCTIVITY_SECTIONS = [
  {
    slug: 'workspace-knowledge',
    title: 'Workspace & Knowledge',
    description:
      'AI assistants embedded in docs, wikis, and databases — Q&A over your workspace, summaries, and structured admin docs.',
    toolSlugs: ['notion-ai'],
    crossListed: false,
  },
  {
    slug: 'personal-tasks',
    title: 'Personal Tasks & Planning',
    description:
      'Lightweight AI for individual and small-team task breakdown, natural-language filters, email-to-task, and voice capture — not full PM platforms.',
    toolSlugs: ['todoist-assist'],
    crossListed: false,
  },
  {
    slug: 'meeting-capture',
    title: 'Meeting & Lecture Capture',
    description:
      'Transcription, AI summaries, and action items for general meetings and lectures. These tools are cataloged primarily under Project Management; they appear here for everyday capture intent.',
    toolSlugs: [...PRODUCTIVITY_MEETING_CROSS_LIST_SLUGS],
    crossListed: true,
  },
] as const;

export const PRODUCTIVITY_CATEGORY: Category = {
  id: CAT_PRODUCTIVITY,
  name: 'Productivity & Workspace',
  slug: 'productivity',
  iconName: 'Zap',
  description:
    'Verified AI workspace and personal productivity tools — knowledge bases, lightweight task planning, and general meeting capture.',
  longDescription:
    'Explore our curated inventory of AI productivity tools for workspace knowledge (Notion AI), personal task planning (Todoist Assist), and general meeting capture cross-listed from our Project Management category. Marketing CRM and social scheduling tools live on the Marketing & CRM category instead.',
  toolCount: 0,
  faqs: [
    {
      question: 'What is the difference between Productivity & Workspace and Project Management?',
      answer:
        'This category covers everyday workspace knowledge and personal/small-team task workflows — Notion AI for docs and Q&A, Todoist Assist for individual task AI. Project Management (/category/project-management) covers PM-specific stacks: meeting intelligence tied to reporting, Gantt plans, stakeholder status decks, and AI-native PM platforms like ClickUp Brain and Asana AI.',
    },
    {
      question: 'Why is Notion AI here and also on the Writers hub?',
      answer:
        'Notion AI’s primary catalog home is Productivity & Workspace because it is a workspace copilot (Q&A, databases, agents). The Writers hub (/for/writers) maps it as a partial fit for organizing long-form writing projects — the same tool, different workflow context. ChatGPT, Claude, and Grammarly remain the primary writing-assistant listings.',
    },
    {
      question: 'Why do Otter.ai and Fathom appear here if their catalog category is Project Management?',
      answer:
        'Meeting capture is a legitimate general productivity intent — lectures, 1:1s, and team syncs — not only formal PM workflows. Otter.ai and Fathom stay cataloged under Project Management (/category/project-management) for PM meeting-notes and reporting guides, but are cross-listed here so visitors do not need to browse the full PM inventory for basic notetaking.',
    },
    {
      question: 'Where did HubSpot and Hootsuite go?',
      answer:
        'HubSpot (marketing CRM, email, analytics) and Hootsuite (social scheduling with OwlyWriter AI) were incorrectly assigned to this category. They now live on Marketing & CRM (/category/marketing). Copy platforms like Jasper and Copy.ai remain under Writing; SEO tools like Semrush under SEO & Web Research; design under Image & Design.',
    },
    {
      question: 'Which tools on this page offer free tiers?',
      answer:
        'Notion AI includes limited AI credits on Notion’s free workspace tier per official pricing. Todoist Assist includes Filter Assist on all plans; Task Assist and Email Assist require Todoist Pro/Business per todoist.com/todoist-assist. Fathom offers an unlimited free recording tier per fathom.video pricing. Otter.ai lists a free Basic tier per otter.ai/pricing — check each tool profile for current limits.',
    },
  ],
  seoTitle: 'AI Productivity & Workspace Tools (2026)',
  seoDescription:
    'Curated AI workspace and personal productivity tools — Notion AI, Todoist Assist, and cross-listed meeting capture — with honest category boundaries vs PM and marketing.',
};
