import { Persona } from '../../types/tool';
import { UseCaseFitTier } from './pm-cluster';

export interface WriterUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface WriterPersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface WriterToolUseCaseSeed {
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

/** Replaces seed placeholder — same slug `writers`. */
export const WRITER_PERSONA: Persona = {
  id: 'per-writers',
  title: 'Writers & Authors',
  slug: 'writers',
  iconName: 'BookOpen',
  subtitle: 'Drafting, editing, research, long-form manuscripts, and writing organization',
  description:
    'Role-focused AI tool picks for authors, editors, bloggers, and professional writers — drafting, rewriting, proofreading, writing research, long-form manuscripts, and project organization. For browsing tools by writing capability, see the Writing & Copywriting category hub.',
  targetRole: 'Writer',
  keyBenefits: [
    'Draft articles, essays, newsletters, and creative prose with general writing assistants',
    'Proofread and refine grammar, clarity, and tone with dedicated editing tools',
    'Research topics and fact-check with cited web sources',
    'Organize outlines, drafts, and multi-document writing projects',
  ],
  topToolSlugs: ['claude', 'chatgpt', 'grammarly', 'perplexity', 'notion-ai'],
  faqs: [
    {
      question: 'Is this the same as the Marketers hub?',
      answer:
        'No — Writers focuses on author and editor workflows: drafting, rewriting, proofreading, manuscript writing, and organizing writing projects. SEO strategy, ad copy, social campaigns, email automation, and marketing analytics belong on the Marketers or Small Business hubs.',
    },
    {
      question: 'What AI tools do professional writers use most?',
      answer:
        'Common verified categories include general writing assistants (ChatGPT, Claude), proofreading platforms (Grammarly), cited web research (Perplexity), and workspace drafting tools (Notion AI). This hub excludes marketing-first platforms like Jasper and Copy.ai.',
    },
    {
      question: 'Can these tools replace a human editor?',
      answer:
        'Grammarly and LLM assistants can accelerate drafts and surface grammar or clarity issues, but official product evidence covers assistive editing — not professional developmental editing, fact verification, or publication-ready quality assurance on their own.',
    },
  ],
};

export const WRITER_USE_CASES: WriterUseCaseSeed[] = [
  {
    slug: 'drafting-composition',
    title: 'Drafting & Composition',
    description:
      'First drafts, rewriting, ideation, and composition for articles, newsletters, essays, and creative prose.',
    primaryKeyword: 'ai drafting tools for writers',
    seoTitle: 'Best AI Drafting Tools for Writers (2026)',
    seoDescription:
      'Verified AI drafting and composition tools for authors, bloggers, and professional writers.',
  },
  {
    slug: 'editing-proofreading',
    title: 'Editing & Proofreading',
    description:
      'Grammar, spelling, clarity, tone, and proofreading passes for professional and creative writing.',
    primaryKeyword: 'ai proofreading tools for writers',
    seoTitle: 'Best AI Editing & Proofreading Tools for Writers (2026)',
    seoDescription:
      'Verified AI editing and proofreading tools for authors and professional writers.',
  },
  {
    slug: 'research-for-writing',
    title: 'Research for Writing',
    description:
      'Background research, topic discovery, and fact-checking with cited sources for writing projects.',
    primaryKeyword: 'ai research tools for writers',
    seoTitle: 'Best AI Research Tools for Writers (2026)',
    seoDescription:
      'Verified AI research and fact-checking tools for authors and journalists.',
  },
  {
    slug: 'long-form-manuscripts',
    title: 'Long-Form & Manuscript Writing',
    description:
      'Extended prose, books, essays, and manuscript-length drafting with long-context assistants.',
    primaryKeyword: 'ai tools for long form writing',
    seoTitle: 'Best AI Long-Form Writing Tools (2026)',
    seoDescription:
      'Verified AI tools for long-form manuscripts, books, and extended prose.',
  },
  {
    slug: 'writing-organization',
    title: 'Outlines & Writing Organization',
    description:
      'Outlines, draft organization, project folders, and manuscript notes for writing workflows.',
    primaryKeyword: 'ai writing organization tools',
    seoTitle: 'Best AI Writing Organization Tools (2026)',
    seoDescription:
      'Verified AI tools for outlines, draft organization, and writing project management.',
  },
];

export const WRITER_PERSONA_USE_CASES: WriterPersonaUseCaseSeed[] = [
  {
    useCaseSlug: 'drafting-composition',
    order: 1,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — drafting and composition tools on this page.',
  },
  {
    useCaseSlug: 'editing-proofreading',
    order: 2,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — editing and proofreading tools on this page.',
  },
  {
    useCaseSlug: 'research-for-writing',
    order: 3,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — research for writing tools on this page.',
  },
  {
    useCaseSlug: 'long-form-manuscripts',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — long-form and manuscript tools on this page.',
  },
  {
    useCaseSlug: 'writing-organization',
    order: 5,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — outlines and writing organization tools on this page.',
  },
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

/** Maps existing verified tools only — no new tool records. Excludes Jasper, Copy.ai, and marketing platforms. */
export const WRITER_TOOL_USE_CASES: WriterToolUseCaseSeed[] = [
  // drafting-composition
  {
    toolSlug: 'chatgpt',
    useCaseSlug: 'drafting-composition',
    fitTier: 'primary',
    capabilities: 'Creative writing, ideation, rewriting, and article/newsletter drafting via conversational AI',
    limitation: 'General assistant — not an author-specific manuscript platform',
    evidenceUrl: 'https://openai.com/chatgpt',
    displayOrder: 1,
  },
  {
    toolSlug: 'claude',
    useCaseSlug: 'drafting-composition',
    fitTier: 'primary',
    capabilities: 'Nuanced prose generation, rewriting, and draft composition',
    limitation: 'No default live web search on standard UI',
    evidenceUrl: 'https://claude.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'notion-ai',
    useCaseSlug: 'drafting-composition',
    fitTier: 'partial',
    capabilities: 'Inline draft generation and tone adjustment inside Notion documents',
    limitation: 'Workspace-embedded — not a standalone drafting application',
    evidenceUrl: 'https://notion.so/product/ai',
    displayOrder: 3,
  },
  // editing-proofreading
  {
    toolSlug: 'grammarly',
    useCaseSlug: 'editing-proofreading',
    fitTier: 'primary',
    capabilities: 'Real-time grammar, spelling, clarity, and tone suggestions via browser and desktop extensions',
    limitation: 'Free tier limits full rewrites and plagiarism checks per official pricing',
    evidenceUrl: 'https://www.grammarly.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'claude',
    useCaseSlug: 'editing-proofreading',
    fitTier: 'strong',
    capabilities: 'Large-document rewrite, clarity passes, and prose refinement',
    limitation: 'General LLM — not a dedicated proofreading product with style-guide enforcement',
    evidenceUrl: 'https://claude.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'chatgpt',
    useCaseSlug: 'editing-proofreading',
    fitTier: 'strong',
    capabilities: 'Rewrite, clarity, and tone adjustment passes on pasted prose',
    limitation: 'General assistant — not a dedicated grammar checker like Grammarly',
    evidenceUrl: 'https://openai.com/chatgpt',
    displayOrder: 3,
  },
  // research-for-writing
  {
    toolSlug: 'perplexity',
    useCaseSlug: 'research-for-writing',
    fitTier: 'primary',
    capabilities: 'Live web research with inline footnote citations for topic background and fact-checking',
    evidenceUrl: 'https://perplexity.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'chatgpt',
    useCaseSlug: 'research-for-writing',
    fitTier: 'partial',
    capabilities: 'Web browsing and research assistance for writing background (model/plan dependent)',
    limitation: 'Web grounding availability depends on model tier and browsing features',
    evidenceUrl: 'https://openai.com/chatgpt',
    displayOrder: 2,
  },
  // long-form-manuscripts
  {
    toolSlug: 'claude',
    useCaseSlug: 'long-form-manuscripts',
    fitTier: 'primary',
    capabilities: 'Long-context prose generation, extended editing, and Artifacts for manuscript sections',
    evidenceUrl: 'https://claude.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'chatgpt',
    useCaseSlug: 'long-form-manuscripts',
    fitTier: 'strong',
    capabilities: 'Extended creative writing and chapter-level drafting',
    limitation: 'Default context window shorter than Claude for very long manuscripts',
    evidenceUrl: 'https://openai.com/chatgpt',
    displayOrder: 2,
  },
  {
    toolSlug: 'notion-ai',
    useCaseSlug: 'long-form-manuscripts',
    fitTier: 'partial',
    capabilities: 'Long-form draft generation inside Notion pages and databases',
    limitation: 'Not a dedicated book-writing or manuscript management platform',
    evidenceUrl: 'https://notion.so/product/ai',
    displayOrder: 3,
  },
  // writing-organization
  {
    toolSlug: 'notion-ai',
    useCaseSlug: 'writing-organization',
    fitTier: 'partial',
    capabilities: 'Workspace Q&A, draft docs, outlines, and organized writing notes in Notion',
    limitation: 'General workspace — official PM/reporting evidence stronger than creative manuscript management',
    evidenceUrl: 'https://notion.so/product/ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'claude',
    useCaseSlug: 'writing-organization',
    fitTier: 'strong',
    capabilities: 'Project folders and multi-document context for organizing manuscript drafts',
    limitation: 'Project workspace — not a dedicated writing studio like Scrivener',
    evidenceUrl: 'https://claude.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'chatgpt',
    useCaseSlug: 'writing-organization',
    fitTier: 'partial',
    capabilities: 'Outline generation and structural planning for writing projects',
    limitation: 'Outline assistance only — not a persistent manuscript organization system',
    evidenceUrl: 'https://openai.com/chatgpt',
    displayOrder: 3,
  },
];

export const WRITER_VERIFIED_AT = VERIFIED_AT;
