import { Persona, UseCaseFitTier } from '../../types/tool';

export interface SmallBusinessUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface SmallBusinessPersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface SmallBusinessToolUseCaseSeed {
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

/** New researched persona — distinct from seed `entrepreneurs` placeholder. */
export const SMALL_BUSINESS_PERSONA: Persona = {
  id: 'per-small-business',
  title: 'Small Business Owners',
  slug: 'small-business',
  iconName: 'Store',
  subtitle: 'Marketing, sales, support, research, operations, and admin',
  description:
    'Verified AI tools for small business owners — marketing content, CRM, customer support, business research, team productivity, and admin workflows. Curated from official product sources.',
  targetRole: 'Small Business Owner',
  keyBenefits: [
    'Create marketing copy and visual content without a full agency',
    'Manage contacts, email, and sales workflows in one CRM hub',
    'Research competitors and market trends with cited sources',
    'Run tasks, docs, and team operations from verified AI workspaces',
  ],
  topToolSlugs: ['hubspot', 'notion-ai', 'jasper', 'copy-ai', 'canva', 'perplexity', 'todoist-assist'],
  faqs: [
    {
      question: 'What AI tools do small businesses use most?',
      answer:
        'Common verified categories include marketing copy (Jasper, Copy.ai), visual content (Canva), CRM and email (HubSpot), business research (Perplexity, Semrush), and operations workspaces (Notion AI, Todoist Assist).',
    },
    {
      question: 'Is this the same as the Entrepreneurs hub?',
      answer:
        'No — this hub targets small business operators with workflow sections mapped to day-to-day business jobs. The Entrepreneurs seed persona remains separate for startup-founder tooling.',
    },
  ],
};

export const SMALL_BUSINESS_USE_CASES: SmallBusinessUseCaseSeed[] = [
  {
    slug: 'marketing-content',
    title: 'Marketing & Content',
    description:
      'Blog posts, landing pages, social copy, and visual marketing assets for small business teams.',
    primaryKeyword: 'ai marketing tools for small business',
    seoTitle: 'Best AI Marketing Tools for Small Business (2026)',
    seoDescription:
      'Verified AI marketing and content tools for small businesses — copy, design, and campaigns.',
  },
  {
    slug: 'sales-customer-management',
    title: 'Sales & Customer Management',
    description:
      'CRM, contact management, email campaigns, and customer pipeline workflows.',
    primaryKeyword: 'ai crm for small business',
    seoTitle: 'Best AI CRM Tools for Small Business (2026)',
    seoDescription:
      'Verified AI CRM and customer management tools for small business sales teams.',
  },
  {
    slug: 'customer-support',
    title: 'Customer Support',
    description:
      'AI-assisted customer communication, service workflows, and support content.',
    primaryKeyword: 'ai customer support tools',
    seoTitle: 'Best AI Customer Support Tools for Small Business (2026)',
    seoDescription:
      'Verified AI customer support tools for small business service teams.',
  },
  {
    slug: 'research-business-strategy',
    title: 'Research & Business Strategy',
    description:
      'Market research, competitive intelligence, and strategy prep with cited sources.',
    primaryKeyword: 'ai tools for business research',
    seoTitle: 'Best AI Business Research Tools for Small Business (2026)',
    seoDescription:
      'Verified AI research tools for small business strategy and competitive analysis.',
  },
  {
    slug: 'operations-productivity',
    title: 'Operations & Productivity',
    description:
      'Task management, team docs, and daily operational workflows for small teams.',
    primaryKeyword: 'ai productivity tools for small business',
    seoTitle: 'Best AI Operations Tools for Small Business (2026)',
    seoDescription:
      'Verified AI productivity and operations tools for small business teams.',
  },
  {
    slug: 'finance-administration',
    title: 'Finance & Administration',
    description:
      'Admin docs, meeting notes, database summaries, and operational record-keeping.',
    primaryKeyword: 'ai tools for business administration',
    seoTitle: 'Best AI Admin Tools for Small Business (2026)',
    seoDescription:
      'Verified AI administration tools for small business back-office workflows.',
  },
];

export const SMALL_BUSINESS_PERSONA_USE_CASES: SmallBusinessPersonaUseCaseSeed[] = [
  {
    useCaseSlug: 'marketing-content',
    order: 1,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — marketing and content tools on this page.',
  },
  {
    useCaseSlug: 'sales-customer-management',
    order: 2,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — sales and CRM tools on this page.',
  },
  {
    useCaseSlug: 'customer-support',
    order: 3,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — customer support tools on this page.',
  },
  {
    useCaseSlug: 'research-business-strategy',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — research and strategy tools on this page.',
  },
  {
    useCaseSlug: 'operations-productivity',
    order: 5,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — operations and productivity tools on this page.',
  },
  {
    useCaseSlug: 'finance-administration',
    order: 6,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — finance and admin tools on this page.',
  },
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

/** Maps existing verified tools only — no new tool records. */
export const SMALL_BUSINESS_TOOL_USE_CASES: SmallBusinessToolUseCaseSeed[] = [
  // marketing-content
  {
    toolSlug: 'jasper',
    useCaseSlug: 'marketing-content',
    fitTier: 'primary',
    capabilities: 'Brand voice, marketing templates, blog and campaign copy',
    evidenceUrl: 'https://www.jasper.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'copy-ai',
    useCaseSlug: 'marketing-content',
    fitTier: 'primary',
    capabilities: 'GTM workflows, marketing copy, landing page content',
    evidenceUrl: 'https://www.copy.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'canva',
    useCaseSlug: 'marketing-content',
    fitTier: 'strong',
    capabilities: 'Magic Write, social templates, AI visual marketing assets',
    evidenceUrl: 'https://www.canva.com/ai/',
    displayOrder: 3,
  },
  {
    toolSlug: 'gamma',
    useCaseSlug: 'marketing-content',
    fitTier: 'partial',
    capabilities: 'AI slide decks and visual documents for marketing collateral',
    limitation: 'Presentation builder — not a dedicated copywriting platform',
    evidenceUrl: 'https://gamma.app',
    displayOrder: 4,
  },
  // sales-customer-management
  {
    toolSlug: 'hubspot',
    useCaseSlug: 'sales-customer-management',
    fitTier: 'primary',
    capabilities: 'CRM, Breeze AI content, email campaigns, contact pipelines',
    evidenceUrl: 'https://www.hubspot.com/products/ai',
    displayOrder: 1,
  },
  // customer-support
  {
    toolSlug: 'hubspot',
    useCaseSlug: 'customer-support',
    fitTier: 'partial',
    capabilities: 'CRM customer records and AI content in Marketing Hub workflows',
    limitation: 'Current evidence covers Marketing Hub — not a dedicated support desk',
    evidenceUrl: 'https://www.hubspot.com/products/ai',
    displayOrder: 1,
  },
  // research-business-strategy
  {
    toolSlug: 'perplexity',
    useCaseSlug: 'research-business-strategy',
    fitTier: 'primary',
    capabilities: 'Live web research with inline citations for market and competitor analysis',
    evidenceUrl: 'https://perplexity.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'semrush',
    useCaseSlug: 'research-business-strategy',
    fitTier: 'strong',
    capabilities: 'Keyword research, competitive analysis, SEO intelligence',
    evidenceUrl: 'https://www.semrush.com/ai/',
    displayOrder: 2,
  },
  {
    toolSlug: 'notion-ai',
    useCaseSlug: 'research-business-strategy',
    fitTier: 'partial',
    capabilities: 'Workspace Q&A and Research Mode reports over business docs',
    limitation: 'Internal workspace research — not live web competitive data',
    evidenceUrl: 'https://www.notion.com/product/ai',
    displayOrder: 3,
  },
  // operations-productivity
  {
    toolSlug: 'notion-ai',
    useCaseSlug: 'operations-productivity',
    fitTier: 'primary',
    capabilities: 'Workspace Q&A, docs, Custom Agents, task routing',
    evidenceUrl: 'https://www.notion.com/product/ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'todoist-assist',
    useCaseSlug: 'operations-productivity',
    fitTier: 'strong',
    capabilities: 'Task Assist, Filter Assist, Email Assist, Ramble voice tasks',
    limitation: 'Individual/small-team scope — not enterprise PM',
    evidenceUrl: 'https://www.todoist.com/todoist-assist',
    displayOrder: 2,
  },
  {
    toolSlug: 'clickup-brain',
    useCaseSlug: 'operations-productivity',
    fitTier: 'partial',
    capabilities: 'Brain² AI tasks, projects, assign and prioritize for small teams',
    limitation: 'Full PM platform — may exceed solo-operator needs',
    evidenceUrl: 'https://clickup.com/brain',
    displayOrder: 3,
  },
  // finance-administration
  {
    toolSlug: 'notion-ai',
    useCaseSlug: 'finance-administration',
    fitTier: 'partial',
    capabilities: 'Database auto-fill, meeting action items, admin doc drafting',
    limitation: 'General workspace — not accounting or bookkeeping software',
    evidenceUrl: 'https://www.notion.com/product/ai',
    displayOrder: 1,
  },
];

export const SMALL_BUSINESS_VERIFIED_AT = VERIFIED_AT;
