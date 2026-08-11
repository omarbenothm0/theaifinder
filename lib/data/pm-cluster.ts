import { Category, Persona, Tool } from '../../types/tool';

export type UseCaseFitTier = 'primary' | 'strong' | 'partial' | 'listed' | 'exclude';

export interface PmUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface PmPersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface PmToolUseCaseSeed {
  toolSlug: string;
  useCaseSlug: string;
  fitTier: UseCaseFitTier;
  capabilities: string;
  limitation?: string;
  evidenceUrl: string;
  displayOrder: number;
  section?: string;
}

const VERIFIED_DATE = '2026-08-11';
const CAT_PM = 'cat-project-management';

function favicon(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

type PmToolInput = Partial<Tool> &
  Pick<
    Tool,
    | 'name'
    | 'slug'
    | 'logo'
    | 'tagline'
    | 'description'
    | 'tags'
    | 'pricingModel'
    | 'hasFreeTrial'
    | 'websiteUrl'
    | 'features'
    | 'pros'
    | 'cons'
    | 'targetUsers'
  >;

function pmTool(partial: PmToolInput): Tool {
  return {
    id: partial.id ?? `tool-${partial.slug}`,
    categoryId: CAT_PM,
    categoryName: 'Project Management',
    rating: 0,
    reviewCount: 0,
    verified: true,
    featured: false,
    trending: false,
    hasApi: partial.hasApi ?? false,
    hasMobileApp: partial.hasMobileApp ?? false,
    hasExtension: partial.hasExtension ?? false,
    alternatives: [],
    screenshots: [],
    createdAt: `${VERIFIED_DATE}T00:00:00.000Z`,
    updatedAt: `${VERIFIED_DATE}T00:00:00.000Z`,
    lastVerifiedDate: VERIFIED_DATE,
    verifiedBy: 'AI Find Research (official sources)',
    reviewState: 'verified',
    ...partial,
  };
}

export const PM_CATEGORY: Category = {
  id: CAT_PM,
  name: 'Project Management',
  slug: 'project-management',
  iconName: 'Kanban',
  description: 'AI tools for project planning, task execution, meeting capture, and stakeholder reporting.',
  longDescription:
    'Discover AI-powered project management software verified for project managers — meeting notes, task planning, status reporting, and team coordination from official product sources.',
  toolCount: 0,
  faqs: [],
  seoTitle: 'Best AI Project Management Tools (2026 Directory)',
  seoDescription: 'Compare AI project management tools for meeting notes, task planning, and status reporting.',
};

export const PM_PERSONA: Persona = {
  id: 'per-project-managers',
  title: 'Project Managers',
  slug: 'project-managers',
  iconName: 'Kanban',
  subtitle: 'Meeting notes, tasks, plans, and stakeholder reports',
  description:
    'Verified AI tools for project managers — capture meeting action items, manage tasks and plans, and generate stakeholder status reports. Curated from official product sources.',
  targetRole: 'Project Manager',
  keyBenefits: [
    'Automate meeting notes and action items',
    'AI-assisted task prioritization and project planning',
    'Generate status reports and stakeholder decks',
  ],
  topToolSlugs: ['otter-ai', 'clickup-brain', 'sembly-ai', 'motion', 'microsoft-365-copilot'],
  faqs: [
    {
      question: 'What AI tools do project managers use most?',
      answer:
        'Common verified categories include AI meeting notetakers (Otter.ai, Fireflies.ai), AI-native PM platforms (ClickUp, Asana, Monday.com, Motion), and status report generators (Sembly AI, Onplana, Microsoft Copilot in PowerPoint).',
    },
    {
      question: 'Is AI project planning the same as AI task management?',
      answer:
        'Many platforms cover both. On AI Find, project planning content is merged into the task-management guide because verified tool overlap exceeded 70%.',
    },
  ],
};

export const PM_USE_CASES: PmUseCaseSeed[] = [
  {
    slug: 'meeting-notes',
    title: 'AI Meeting Notes',
    description:
      'Capture, transcribe, and summarize meetings; extract action items and decisions for project follow-through.',
    primaryKeyword: 'ai meeting notes',
    seoTitle: 'Best AI Meeting Notes Tools for Project Managers (2026)',
    seoDescription:
      'Compare verified AI meeting notetakers — transcription, summaries, and action items from official sources.',
  },
  {
    slug: 'task-management',
    title: 'AI Task Management & Planning',
    description:
      'AI-enhanced task execution, prioritization, and assignment — plus merged project planning (milestones, WBS, Gantt) on one page.',
    primaryKeyword: 'ai task management',
    seoTitle: 'Best AI Task Management & Project Planning Tools (2026)',
    seoDescription:
      'Verified AI task and project planning tools for PMs — official sources for ClickUp, Asana, Motion, and more.',
  },
  {
    slug: 'project-reporting',
    title: 'AI Project Reporting',
    description:
      'Generate status reports, stakeholder updates, and presentation decks on a regular cadence.',
    primaryKeyword: 'ai project reporting',
    seoTitle: 'Best AI Project Reporting Tools (2026)',
    seoDescription:
      'Verified AI status report and deck tools — Sembly, Onplana, Microsoft Copilot, and more from official sources.',
  },
  {
    slug: 'documentation',
    title: 'AI Project Documentation',
    description:
      'Project wikis, specs, and knowledge bases — deferred standalone page; surfaced on persona hub until keyword reframed.',
    primaryKeyword: 'ai project documentation',
    seoTitle: 'AI Project Documentation Tools (Deferred)',
    seoDescription: 'Deferred — fragmented SERP for current B keyword.',
  },
];

export const PM_PERSONA_USE_CASES: PmPersonaUseCaseSeed[] = [
  { useCaseSlug: 'meeting-notes', order: 1, isPrimary: true, pageEnabled: true },
  { useCaseSlug: 'task-management', order: 2, isPrimary: true, pageEnabled: true },
  { useCaseSlug: 'project-reporting', order: 3, isPrimary: true, pageEnabled: true },
  {
    useCaseSlug: 'documentation',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Standalone page deferred — fragmented search intent for current keyword.',
  },
];

export const PM_TOOLS: Tool[] = [
  pmTool({
    name: 'Otter.ai',
    slug: 'otter-ai',
    logo: favicon('otter.ai'),
    tagline: 'AI meeting transcription, summaries, and action items for Zoom, Meet, and Teams.',
    description:
      'Otter.ai joins meetings to transcribe conversations, generate AI summaries with decisions and action items, and integrate with project tools. Verified for PM meeting-notes workflows from otter.ai.',
    tags: ['Meeting Notes', 'Transcription', 'Action Items'],
    pricingModel: 'Freemium',
    monthlyPrice: 8.33,
    hasFreeTrial: true,
    companyName: 'Otter.ai',
    websiteUrl: 'https://otter.ai',
    featureSource: 'https://otter.ai',
    pricingSource: 'https://otter.ai/pricing',
    sources: [{ type: 'features', url: 'https://otter.ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'iOS', 'Android'],
    features: ['Live transcription', 'AI summaries', 'Action items', 'Zoom/Meet/Teams'],
    pros: ['Strong PM meeting capture', 'Official integrations'],
    cons: ['Minute caps on free tier'],
    alternatives: ['fireflies-ai', 'fathom', 'tldv'],
    targetUsers: ['project-managers', 'students', 'teachers'],
  }),
  pmTool({
    name: 'Fireflies.ai',
    slug: 'fireflies-ai',
    logo: favicon('fireflies.ai'),
    tagline: 'AI notetaker with transcription, summaries, and CRM or PM integrations.',
    description:
      'Fireflies.ai records and transcribes meetings, generates AI summaries and action items, and connects to project and CRM tools. Verified from fireflies.ai official pages.',
    tags: ['Meeting Notes', 'Transcription', 'Integrations'],
    pricingModel: 'Freemium',
    monthlyPrice: 10,
    hasFreeTrial: true,
    companyName: 'Fireflies.ai',
    websiteUrl: 'https://fireflies.ai',
    featureSource: 'https://fireflies.ai',
    pricingSource: 'https://fireflies.ai/pricing',
    sources: [{ type: 'features', url: 'https://fireflies.ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Auto-join bot', '100+ languages', 'AskFred Q&A', 'CRM sync'],
    pros: ['Broad integrations', 'Free tier'],
    cons: ['Storage limits on lower tiers'],
    alternatives: ['otter-ai', 'fathom', 'sembly-ai'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Fathom',
    slug: 'fathom',
    logo: favicon('fathom.video'),
    tagline: 'AI meeting assistant with unlimited free recordings and instant summaries.',
    description:
      'Fathom captures meeting audio, provides transcripts and AI summaries with action items, and syncs to workflow tools. Verified from fathom.video pricing and product pages.',
    tags: ['Meeting Notes', 'Free Tier', 'Action Items'],
    pricingModel: 'Freemium',
    monthlyPrice: 15,
    hasFreeTrial: true,
    companyName: 'Fathom',
    websiteUrl: 'https://www.fathom.video',
    featureSource: 'https://www.fathom.video',
    pricingSource: 'https://www.fathom.video/pricing',
    sources: [{ type: 'features', url: 'https://www.fathom.video', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Unlimited free recordings', 'AI summaries', 'CRM sync'],
    pros: ['Generous free tier for individuals'],
    cons: ['Team features require paid seats'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'tl;dv',
    slug: 'tldv',
    logo: favicon('tldv.io'),
    tagline: 'AI meeting minutes for Zoom, Google Meet, and Microsoft Teams.',
    description:
      'tl;dv records and transcribes meetings, offers customizable AI meeting minutes templates, and supports CRM workflow sync. Verified from tldv.io official sources.',
    tags: ['Meeting Notes', 'Templates', 'CRM'],
    pricingModel: 'Freemium',
    monthlyPrice: 18,
    hasFreeTrial: true,
    companyName: 'tl;dv',
    websiteUrl: 'https://tldv.io',
    featureSource: 'https://tldv.io/features/ai-meeting-minutes',
    pricingSource: 'https://tldv.io/app/pricing',
    sources: [{ type: 'features', url: 'https://tldv.io', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Custom AI minutes', 'Topic clustering', 'Action-item assignment'],
    pros: ['Free forever tier cited on official site'],
    cons: ['Pricing displayed in EUR on official page'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Sembly AI',
    slug: 'sembly-ai',
    logo: favicon('sembly.ai'),
    tagline: 'Agentic meeting intelligence with notes, tasks, and project status reports.',
    description:
      'Sembly AI transcribes meetings across major platforms, detects tasks and action items, and generates project status report documents. Verified from sembly.ai official pages.',
    tags: ['Meeting Notes', 'Status Reports', 'Task Detection'],
    pricingModel: 'Paid',
    monthlyPrice: 20,
    hasFreeTrial: true,
    companyName: 'Sembly AI',
    websiteUrl: 'https://www.sembly.ai',
    featureSource: 'https://www.sembly.ai',
    pricingSource: 'https://www.sembly.ai/pricing',
    sources: [{ type: 'features', url: 'https://www.sembly.ai/ai-report-generator/', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['48-language transcription', 'AI meeting notes', 'Project status reports'],
    pros: ['Spans meeting-notes and reporting'],
    cons: ['AI document caps on lower tiers'],
    alternatives: ['otter-ai', 'fireflies-ai', 'microsoft-365-copilot'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Zoom AI My Notes',
    slug: 'zoom-ai-my-notes',
    logo: favicon('zoom.com'),
    tagline: 'AI note-taking across Zoom and third-party meetings with summaries and action items.',
    description:
      'Zoom Workplace AI My Notes provides transcription, post-meeting summaries, and action-item workflows within the Zoom ecosystem. Verified from zoom.com AI note-taking feature page.',
    tags: ['Meeting Notes', 'Platform Feature', 'Zoom'],
    pricingModel: 'Freemium',
    monthlyPrice: 8.33,
    hasFreeTrial: true,
    companyName: 'Zoom',
    websiteUrl: 'https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/',
    featureSource: 'https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/',
    pricingSource: 'https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/',
    sources: [{ type: 'features', url: 'https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Desktop', 'Mobile'],
    features: ['Bot-free capture', 'Summaries', 'Third-party meeting capture'],
    pros: ['Native Zoom integration'],
    cons: ['Requires Zoom Workplace ecosystem'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Google Gemini in Google Meet',
    slug: 'google-gemini-meet',
    logo: favicon('workspace.google.com'),
    tagline: 'Gemini automates Meet notes, summaries, and action items in Google Workspace.',
    description:
      'Google Gemini in Meet transcribes and summarizes calls, extracts insights and action items, and integrates with Google Docs for meeting minutes within Workspace.',
    tags: ['Meeting Notes', 'Google Workspace', 'Platform Feature'],
    pricingModel: 'Paid',
    hasFreeTrial: false,
    companyName: 'Google',
    websiteUrl: 'https://workspace.google.com/products/meet/',
    featureSource: 'https://workspace.google.com/products/meet/',
    pricingSource: 'https://workspace.google.com/pricing',
    sources: [{ type: 'features', url: 'https://workspace.google.com/products/meet/', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Automated Meet notes', 'Docs integration', 'Summaries'],
    pros: ['Native Workspace workflow'],
    cons: ['Requires Google Workspace plan with Gemini in Meet'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Microsoft 365 Copilot',
    slug: 'microsoft-365-copilot',
    logo: favicon('microsoft.com'),
    tagline: 'Copilot across Teams meetings, PowerPoint decks, and Microsoft 365 project workflows.',
    description:
      'Microsoft 365 Copilot provides meeting recap in Teams, project status deck generation in PowerPoint, and Planner Agent capabilities. Verified from learn.microsoft.com and microsoft.com official pages.',
    tags: ['Copilot', 'Teams', 'PowerPoint', 'Planner'],
    pricingModel: 'Paid',
    monthlyPrice: 18,
    hasFreeTrial: false,
    companyName: 'Microsoft',
    websiteUrl: 'https://www.microsoft.com/en-us/microsoft-365/copilot/',
    featureSource: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview',
    pricingSource: 'https://www.microsoft.com/en-us/microsoft-365/copilot/pricing',
    sources: [{ type: 'features', url: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Desktop'],
    features: ['Teams meeting recap', 'PowerPoint status decks', 'M365 Graph integration'],
    pros: ['Enterprise M365 integration'],
    cons: ['Requires M365 Copilot license'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Onplana Status Report Writer',
    slug: 'onplana-status-report-writer',
    logo: favicon('onplana.com'),
    tagline: 'Free AI tool: paste updates into executive status reports with RAG status.',
    description:
      'Onplana Status Report Writer converts pasted Slack, meeting, or ticket updates into structured executive status reports with RAG status, blockers, and next-week plans. Verified from onplana.com official tool page.',
    tags: ['Status Reports', 'RAG', 'Free Tool'],
    pricingModel: 'Free',
    monthlyPrice: 0,
    hasFreeTrial: false,
    companyName: 'Onplana',
    websiteUrl: 'https://onplana.com/tools/status-report-writer',
    featureSource: 'https://onplana.com/tools/status-report-writer',
    pricingSource: 'https://onplana.com/tools/status-report-writer',
    sources: [{ type: 'features', url: 'https://onplana.com/tools/status-report-writer', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['RAG status output', 'Blockers with severity', 'Markdown/PDF export'],
    pros: ['Free paste-only tool'],
    cons: ['No live Jira/Asana import on free tier'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Beautiful.ai',
    slug: 'beautiful-ai',
    logo: favicon('beautiful.ai'),
    tagline: 'AI presentation maker with report templates and smart slide layouts.',
    description:
      'Beautiful.ai helps teams build presentation decks with AI-assisted layouts, Reports & Reviews templates, and PPTX export. Verified as partial fit for PM reporting from beautiful.ai.',
    tags: ['Presentations', 'Decks', 'Reports'],
    pricingModel: 'Paid',
    monthlyPrice: 12,
    hasFreeTrial: true,
    companyName: 'Beautiful.ai',
    websiteUrl: 'https://www.beautiful.ai',
    featureSource: 'https://www.beautiful.ai',
    pricingSource: 'https://www.beautiful.ai/pricing',
    sources: [{ type: 'features', url: 'https://www.beautiful.ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Smart Slides', 'Report templates', 'PPTX export'],
    pros: ['Polished deck output'],
    cons: ['No structured PM status-report schema on official pages'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'ClickUp Brain',
    slug: 'clickup-brain',
    logo: favicon('clickup.com'),
    tagline: 'Brain² AI for tasks, projects, prioritization, and multi-model workspace intelligence.',
    description:
      'ClickUp Brain² adds AI Tasks, project orchestration, Assign & Prioritize, and multi-model chat with workspace context. Verified from clickup.com/brain and pricing pages.',
    tags: ['Tasks', 'Projects', 'AI Agents'],
    pricingModel: 'Paid',
    monthlyPrice: 9,
    hasFreeTrial: true,
    companyName: 'ClickUp',
    websiteUrl: 'https://clickup.com/brain',
    featureSource: 'https://clickup.com/brain',
    pricingSource: 'https://clickup.com/pricing',
    sources: [{ type: 'features', url: 'https://clickup.com/brain', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Desktop', 'Mobile'],
    hasApi: true,
    hasMobileApp: true,
    features: ['AI Tasks', 'AI Projects', 'Gantt & Goals', 'Assign & Prioritize'],
    pros: ['Full PM platform + Brain AI'],
    cons: ['Brain AI on paid add-on tiers'],
    alternatives: ['asana-ai', 'monday-ai', 'motion'],
    targetUsers: ['project-managers', 'entrepreneurs', 'small-business'],
  }),
  pmTool({
    name: 'Asana AI',
    slug: 'asana-ai',
    logo: favicon('asana.com'),
    tagline: 'AI Teammates, AI Studio, Dash priorities, and AI project plan templates.',
    description:
      'Asana AI includes AI Teammates, AI Studio workflow automation, Asana Dash daily priorities, and an official AI project plan template for milestones and dependencies. Verified from asana.com/product/ai.',
    tags: ['Tasks', 'Planning', 'AI Teammates'],
    pricingModel: 'Paid',
    hasFreeTrial: true,
    companyName: 'Asana',
    websiteUrl: 'https://asana.com/product/ai',
    featureSource: 'https://asana.com/product/ai',
    pricingSource: 'https://asana.com/pricing',
    sources: [{ type: 'features', url: 'https://asana.com/templates/ai-project-plan', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'iOS', 'Android'],
    hasApi: true,
    hasMobileApp: true,
    features: ['AI project plan template', 'AI Studio', 'Asana Dash', 'Timeline/Gantt'],
    pros: ['Official AI plan generation template'],
    cons: ['AI on paid tiers with credit limits'],
    alternatives: ['clickup-brain', 'monday-ai', 'motion'],
    targetUsers: ['project-managers', 'entrepreneurs'],
  }),
  pmTool({
    name: 'Monday.com AI',
    slug: 'monday-ai',
    logo: favicon('monday.com'),
    tagline: 'AI agents, Sidekick assistant, Sprint Planner, and Gantt for PM teams.',
    description:
      'monday.com AI offers Sidekick, AI agent workforce, Sprint Planner, Status Reporter agents, and timeline views with AI credits on paid plans. Verified from monday.com/w/ai and pricing.',
    tags: ['Tasks', 'Agents', 'Gantt'],
    pricingModel: 'Freemium',
    monthlyPrice: 9,
    hasFreeTrial: true,
    companyName: 'monday.com',
    websiteUrl: 'https://monday.com/w/ai',
    featureSource: 'https://monday.com/w/ai',
    pricingSource: 'https://monday.com/pricing',
    sources: [{ type: 'features', url: 'https://monday.com/w/ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Mobile'],
    hasApi: true,
    hasMobileApp: true,
    features: ['Sidekick AI', 'Sprint Planner agent', 'AI columns', 'Timeline & Gantt'],
    pros: ['PMO-oriented AI agents'],
    cons: ['AI features credit-metered'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Motion',
    slug: 'motion',
    logo: favicon('usemotion.com'),
    tagline: 'AI Task Planner and AI Project Manager with calendar auto-scheduling.',
    description:
      'Motion provides AI Task Planner prioritization, AI Project Manager plan generation, and AI Calendar Assistant scheduling. Verified from usemotion.com official product and pricing pages.',
    tags: ['Tasks', 'Planning', 'Calendar'],
    pricingModel: 'Paid',
    monthlyPrice: 19,
    hasFreeTrial: true,
    companyName: 'Motion',
    websiteUrl: 'https://www.usemotion.com',
    featureSource: 'https://www.usemotion.com',
    pricingSource: 'https://www.usemotion.com/pricing',
    sources: [{ type: 'features', url: 'https://www.usemotion.com', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Desktop', 'Mobile'],
    hasMobileApp: true,
    features: ['AI Task Planner', 'AI Project Manager', 'AI Calendar', 'Gantt on Business AI'],
    pros: ['Strong task + planning + calendar AI'],
    cons: ['Credit-based AI usage'],
    alternatives: ['clickup-brain', 'asana-ai', 'todoist-assist'],
    targetUsers: ['project-managers', 'entrepreneurs'],
  }),
  pmTool({
    name: 'Todoist Assist',
    slug: 'todoist-assist',
    logo: favicon('todoist.com'),
    tagline: 'Task Assist, Filter Assist, Email Assist, and Ramble voice-to-task for individuals.',
    description:
      'Todoist Assist adds AI task breakdown, natural-language filters, email-to-task, and voice task capture. Verified from todoist.com/todoist-assist for individual and small-team task management.',
    tags: ['Tasks', 'Voice', 'Email'],
    pricingModel: 'Freemium',
    hasFreeTrial: true,
    companyName: 'Doist',
    websiteUrl: 'https://www.todoist.com/todoist-assist',
    featureSource: 'https://www.todoist.com/todoist-assist',
    pricingSource: 'https://todoist.com/pricing',
    sources: [{ type: 'features', url: 'https://www.todoist.com/todoist-assist', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Desktop', 'Mobile'],
    hasMobileApp: true,
    hasExtension: true,
    features: ['Task Assist', 'Filter Assist', 'Email Assist', 'Ramble voice tasks'],
    pros: ['Lightweight individual task AI'],
    cons: ['Not a full PM platform — no Gantt/portfolio'],
    targetUsers: ['project-managers', 'entrepreneurs', 'small-business'],
  }),
  pmTool({
    name: 'Wrike AI',
    slug: 'wrike-ai',
    logo: favicon('wrike.com'),
    tagline: 'Wrike AI agents, Copilot, and Board AI for enterprise task and project work.',
    description:
      'Wrike AI includes Board AI task creation, Copilot Q&A, triage/intake agents, and AI in automation rules. Verified from wrike.com/ai and pricing for enterprise PM task management.',
    tags: ['Tasks', 'Agents', 'Enterprise'],
    pricingModel: 'Paid',
    monthlyPrice: 25,
    hasFreeTrial: true,
    companyName: 'Wrike',
    websiteUrl: 'https://www.wrike.com/ai',
    featureSource: 'https://www.wrike.com/ai',
    pricingSource: 'https://www.wrike.com/price/',
    sources: [{ type: 'features', url: 'https://www.wrike.com/ai/features/', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Mobile'],
    hasApi: true,
    hasMobileApp: true,
    features: ['Board AI task creation', 'Wrike Copilot', 'AI agents', 'AI automations'],
    pros: ['Enterprise-grade AI PM'],
    cons: ['Advanced AI on Business+ with AI Essentials'],
    targetUsers: ['project-managers'],
  }),
  pmTool({
    name: 'Microsoft Planner + Copilot',
    slug: 'microsoft-planner-copilot',
    logo: favicon('microsoft.com'),
    tagline: 'Planner Agent for plan creation, Gantt, and Copilot chat in premium plans.',
    description:
      'Microsoft Planner with Copilot provides Planner Agent for automated plan creation and task execution, premium Gantt/dependencies, and in-app Copilot chat. Verified from learn.microsoft.com Planner Agent documentation.',
    tags: ['Planning', 'Copilot', 'Gantt'],
    pricingModel: 'Paid',
    monthlyPrice: 30,
    hasFreeTrial: true,
    companyName: 'Microsoft',
    websiteUrl: 'https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner',
    featureSource: 'https://learn.microsoft.com/en-us/planner/turn-off-planner-agent',
    pricingSource: 'https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner',
    sources: [{ type: 'features', url: 'https://learn.microsoft.com/en-us/planner/turn-off-planner-agent', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Teams'],
    features: ['Planner Agent', 'Timeline/Gantt', 'Dependencies', 'M365 integration'],
    pros: ['Native M365 planning AI'],
    cons: ['Requires M365 Copilot license for Planner Agent'],
    targetUsers: ['project-managers'],
  }),
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

export const PM_TOOL_USE_CASES: PmToolUseCaseSeed[] = [
  // meeting-notes
  { toolSlug: 'otter-ai', useCaseSlug: 'meeting-notes', fitTier: 'primary', capabilities: 'Transcription, AI summaries, action items, Zoom/Meet/Teams', evidenceUrl: 'https://otter.ai', displayOrder: 1, section: '' },
  { toolSlug: 'fireflies-ai', useCaseSlug: 'meeting-notes', fitTier: 'primary', capabilities: 'Auto-join, transcription, summaries, action items, 100+ languages', evidenceUrl: 'https://fireflies.ai', displayOrder: 2 },
  { toolSlug: 'fathom', useCaseSlug: 'meeting-notes', fitTier: 'primary', capabilities: 'Recordings, transcripts, AI summaries, action items', evidenceUrl: 'https://www.fathom.video', displayOrder: 3 },
  { toolSlug: 'tldv', useCaseSlug: 'meeting-notes', fitTier: 'primary', capabilities: 'AI meeting minutes, templates, action items', evidenceUrl: 'https://tldv.io', displayOrder: 4 },
  { toolSlug: 'sembly-ai', useCaseSlug: 'meeting-notes', fitTier: 'primary', capabilities: 'Transcription, notes, automatic task detection', evidenceUrl: 'https://www.sembly.ai', displayOrder: 5 },
  { toolSlug: 'zoom-ai-my-notes', useCaseSlug: 'meeting-notes', fitTier: 'strong', capabilities: 'AI note-taking, summaries, action items', limitation: 'Platform feature — requires Zoom Workplace', evidenceUrl: 'https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/', displayOrder: 6 },
  { toolSlug: 'google-gemini-meet', useCaseSlug: 'meeting-notes', fitTier: 'strong', capabilities: 'Automated Meet notes, summaries, Docs integration', limitation: 'Requires Google Workspace with Gemini in Meet', evidenceUrl: 'https://workspace.google.com/products/meet/', displayOrder: 7 },
  { toolSlug: 'microsoft-365-copilot', useCaseSlug: 'meeting-notes', fitTier: 'strong', capabilities: 'Teams meeting recap, transcript Q&A', limitation: 'Requires M365 Copilot license', evidenceUrl: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview', displayOrder: 8 },
  // project-reporting
  { toolSlug: 'microsoft-365-copilot', useCaseSlug: 'project-reporting', fitTier: 'primary', capabilities: 'Copilot in PowerPoint — project status update deck generation', limitation: 'Deck-oriented; requires Copilot license', evidenceUrl: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint/ai-powerpoint-generator', displayOrder: 1 },
  { toolSlug: 'sembly-ai', useCaseSlug: 'project-reporting', fitTier: 'primary', capabilities: 'Project Status Report from meeting content', limitation: 'Sourced from meetings unless discussed in calls', evidenceUrl: 'https://www.sembly.ai/ai-report-generator/', displayOrder: 2 },
  { toolSlug: 'onplana-status-report-writer', useCaseSlug: 'project-reporting', fitTier: 'primary', capabilities: 'RAG status reports from pasted updates', limitation: 'Free paste-only tool', evidenceUrl: 'https://onplana.com/tools/status-report-writer', displayOrder: 3 },
  { toolSlug: 'gamma', useCaseSlug: 'project-reporting', fitTier: 'partial', capabilities: 'AI presentations and docs export', limitation: 'General deck builder — no PM status schema', evidenceUrl: 'https://gamma.app/pricing', displayOrder: 4 },
  { toolSlug: 'beautiful-ai', useCaseSlug: 'project-reporting', fitTier: 'partial', capabilities: 'AI presentations, Reports templates', limitation: 'No structured status report generator', evidenceUrl: 'https://www.beautiful.ai', displayOrder: 5 },
  { toolSlug: 'notion-ai', useCaseSlug: 'project-reporting', fitTier: 'partial', capabilities: 'Research Mode reports, weekly reporting automation', limitation: 'General workspace — requires Business+ for full AI', evidenceUrl: 'https://www.notion.com/product/ai', displayOrder: 6 },
  // task-management (execution)
  { toolSlug: 'clickup-brain', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'AI Tasks, Assign & Prioritize, Deep Search', evidenceUrl: 'https://clickup.com/brain', displayOrder: 1, section: 'task' },
  { toolSlug: 'asana-ai', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'Asana Dash, AI Studio, AI Teammates', evidenceUrl: 'https://asana.com/product/ai', displayOrder: 2, section: 'task' },
  { toolSlug: 'monday-ai', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'Sidekick, AI columns, task agents', evidenceUrl: 'https://monday.com/w/ai', displayOrder: 3, section: 'task' },
  { toolSlug: 'motion', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'AI Task Planner, auto-prioritization', evidenceUrl: 'https://www.usemotion.com', displayOrder: 4, section: 'task' },
  { toolSlug: 'todoist-assist', useCaseSlug: 'task-management', fitTier: 'strong', capabilities: 'Task Assist, Filter Assist, Ramble, Email Assist', limitation: 'Individual/small-team scope', evidenceUrl: 'https://www.todoist.com/todoist-assist', displayOrder: 5, section: 'task' },
  { toolSlug: 'notion-ai', useCaseSlug: 'task-management', fitTier: 'strong', capabilities: 'Custom Agents route tasks, Notion Agent', evidenceUrl: 'https://www.notion.com/product/ai', displayOrder: 6, section: 'task' },
  { toolSlug: 'wrike-ai', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'Board AI task creation, agents, Copilot', evidenceUrl: 'https://www.wrike.com/ai', displayOrder: 7, section: 'task' },
  // task-management (merged planning section)
  { toolSlug: 'asana-ai', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'AI project plan template — milestones, dependencies', evidenceUrl: 'https://asana.com/templates/ai-project-plan', displayOrder: 101, section: 'planning' },
  { toolSlug: 'motion', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'AI Project Manager — generate full projects', evidenceUrl: 'https://www.usemotion.com', displayOrder: 102, section: 'planning' },
  { toolSlug: 'clickup-brain', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'AI Projects, Gantt, Goals & Portfolio', evidenceUrl: 'https://clickup.com/brain', displayOrder: 103, section: 'planning' },
  { toolSlug: 'monday-ai', useCaseSlug: 'task-management', fitTier: 'primary', capabilities: 'Sprint Planner, Timeline & Gantt agents', evidenceUrl: 'https://monday.com/w/ai', displayOrder: 104, section: 'planning' },
  { toolSlug: 'microsoft-planner-copilot', useCaseSlug: 'task-management', fitTier: 'strong', capabilities: 'Planner Agent plan creation, premium Gantt', limitation: 'Requires M365 Copilot + premium plan', evidenceUrl: 'https://learn.microsoft.com/en-us/planner/turn-off-planner-agent', displayOrder: 105, section: 'planning' },
  { toolSlug: 'notion-ai', useCaseSlug: 'task-management', fitTier: 'partial', capabilities: 'Brainstorm to roadmap use case', limitation: 'No official WBS/milestone generator', evidenceUrl: 'https://www.notion.com/product/ai', displayOrder: 106, section: 'planning' },
];

export const PM_VERIFIED_AT = VERIFIED_AT;
