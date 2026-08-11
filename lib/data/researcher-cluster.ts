import { Persona } from '../../types/tool';
import { UseCaseFitTier } from './pm-cluster';

export interface ResearcherUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ResearcherPersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface ResearcherToolUseCaseSeed {
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

export const RESEARCHER_PERSONA: Persona = {
  id: 'per-researchers',
  title: 'Researchers',
  slug: 'researchers',
  iconName: 'Microscope',
  subtitle: 'Literature discovery, paper reading, evidence synthesis, writing, and reference organization',
  description:
    'Verified AI tools for academic and professional researchers — literature discovery, paper reading, evidence synthesis, web research, academic writing, and reference organization. Curated from official product sources.',
  targetRole: 'Researcher',
  keyBenefits: [
    'Search peer-reviewed literature with citation-backed answers',
    'Summarize and interrogate papers from uploaded sources',
    'Check whether citations support or contrast a claim',
    'Draft and refine academic prose with grammar and clarity feedback',
  ],
  topToolSlugs: ['consensus', 'elicit', 'scite-ai', 'notebooklm', 'perplexity', 'grammarly', 'remnote'],
  faqs: [
    {
      question: 'What AI tools do researchers use for literature review?',
      answer:
        'Verified options include Elicit (semantic paper search and data extraction), Consensus (200M+ paper search with Consensus Meter), and Scite.ai (Smart Citations showing support/contrast context).',
    },
    {
      question: 'Can these tools replace reference managers like Zotero?',
      answer:
        'No — RemNote and NotebookLM offer partial source organization and annotation, but none of the mapped tools are dedicated citation managers. Use them alongside your existing reference workflow.',
    },
  ],
};

export const RESEARCHER_USE_CASES: ResearcherUseCaseSeed[] = [
  {
    slug: 'literature-discovery',
    title: 'Literature Discovery',
    description:
      'Semantic and academic search across peer-reviewed papers to find relevant literature for a research question.',
    primaryKeyword: 'ai literature discovery tools',
    seoTitle: 'Best AI Literature Discovery Tools for Researchers (2026)',
    seoDescription:
      'Verified AI literature discovery tools — semantic paper search and academic databases.',
  },
  {
    slug: 'paper-reading-understanding',
    title: 'Paper Reading & Understanding',
    description:
      'Summarize papers, extract key claims, and ask grounded questions about uploaded research sources.',
    primaryKeyword: 'ai paper reading tools',
    seoTitle: 'Best AI Paper Reading Tools for Researchers (2026)',
    seoDescription:
      'Verified AI tools for reading, summarizing, and understanding academic papers.',
  },
  {
    slug: 'evidence-synthesis-citation-checking',
    title: 'Evidence Synthesis & Citation Checking',
    description:
      'Synthesize findings across papers and verify whether citations support or contrast a claim.',
    primaryKeyword: 'ai citation checking tools',
    seoTitle: 'Best AI Evidence Synthesis & Citation Tools (2026)',
    seoDescription:
      'Verified AI tools for evidence synthesis, Smart Citations, and citation credibility checks.',
  },
  {
    slug: 'research-web-discovery',
    title: 'Research & Web Discovery',
    description:
      'Live web and academic research with inline citations for background reading and discovery.',
    primaryKeyword: 'ai research discovery tools',
    seoTitle: 'Best AI Research & Web Discovery Tools (2026)',
    seoDescription:
      'Verified AI research discovery tools with live web search and cited answers.',
  },
  {
    slug: 'academic-writing',
    title: 'Academic Writing',
    description:
      'Grammar, clarity, and tone feedback for research manuscripts, proposals, and academic prose.',
    primaryKeyword: 'ai academic writing tools',
    seoTitle: 'Best AI Academic Writing Tools for Researchers (2026)',
    seoDescription:
      'Verified AI writing assistants for academic grammar, clarity, and tone.',
  },
  {
    slug: 'reference-management-organization',
    title: 'Reference Management & Organization',
    description:
      'Organize research sources, annotate PDFs, and maintain hierarchical notes tied to reading workflows.',
    primaryKeyword: 'ai reference organization tools',
    seoTitle: 'Best AI Reference Organization Tools for Researchers (2026)',
    seoDescription:
      'Verified AI tools for organizing research sources, notes, and PDF annotations.',
  },
];

export const RESEARCHER_PERSONA_USE_CASES: ResearcherPersonaUseCaseSeed[] = [
  {
    useCaseSlug: 'literature-discovery',
    order: 1,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — literature discovery tools on this page.',
  },
  {
    useCaseSlug: 'paper-reading-understanding',
    order: 2,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — paper reading tools on this page.',
  },
  {
    useCaseSlug: 'evidence-synthesis-citation-checking',
    order: 3,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — evidence synthesis and citation tools on this page.',
  },
  {
    useCaseSlug: 'research-web-discovery',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — research and web discovery tools on this page.',
  },
  {
    useCaseSlug: 'academic-writing',
    order: 5,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — academic writing tools on this page.',
  },
  {
    useCaseSlug: 'reference-management-organization',
    order: 6,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — reference organization tools on this page.',
  },
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

/** Maps existing verified tools only — no new tool records. */
export const RESEARCHER_TOOL_USE_CASES: ResearcherToolUseCaseSeed[] = [
  // literature-discovery
  {
    toolSlug: 'elicit',
    useCaseSlug: 'literature-discovery',
    fitTier: 'primary',
    capabilities: 'Semantic search across 138M+ papers, literature review automation',
    evidenceUrl: 'https://elicit.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'consensus',
    useCaseSlug: 'literature-discovery',
    fitTier: 'primary',
    capabilities: '200M+ peer-reviewed paper search with citation-backed answers',
    evidenceUrl: 'https://consensus.app',
    displayOrder: 2,
  },
  {
    toolSlug: 'scite-ai',
    useCaseSlug: 'literature-discovery',
    fitTier: 'strong',
    capabilities: 'Smart Citations to surface supporting and contrasting papers',
    limitation: 'Citation context focus — not a full semantic literature search engine',
    evidenceUrl: 'https://scite.ai',
    displayOrder: 3,
  },
  // paper-reading-understanding
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'paper-reading-understanding',
    fitTier: 'primary',
    capabilities: 'Grounded Q&A, study guides, and summaries from uploaded sources',
    limitation: 'Answers restricted to uploaded sources only',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'elicit',
    useCaseSlug: 'paper-reading-understanding',
    fitTier: 'strong',
    capabilities: 'Full-text summaries and data extraction from papers',
    evidenceUrl: 'https://elicit.com',
    displayOrder: 2,
  },
  {
    toolSlug: 'scite-ai',
    useCaseSlug: 'paper-reading-understanding',
    fitTier: 'partial',
    capabilities: 'Citation context — whether a paper supports or contrasts a claim',
    limitation: 'Citation analysis — not full paper summarization',
    evidenceUrl: 'https://scite.ai',
    displayOrder: 3,
  },
  // evidence-synthesis-citation-checking
  {
    toolSlug: 'scite-ai',
    useCaseSlug: 'evidence-synthesis-citation-checking',
    fitTier: 'primary',
    capabilities: 'Smart Citations — support/contrast classification and reference checks',
    limitation: 'No permanent free tier — 7-day trial per official pricing',
    evidenceUrl: 'https://scite.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'consensus',
    useCaseSlug: 'evidence-synthesis-citation-checking',
    fitTier: 'primary',
    capabilities: 'Consensus Meter agree/disagree classifier across paper findings',
    evidenceUrl: 'https://consensus.app',
    displayOrder: 2,
  },
  {
    toolSlug: 'elicit',
    useCaseSlug: 'evidence-synthesis-citation-checking',
    fitTier: 'strong',
    capabilities: 'Data extraction tables comparing findings across papers',
    evidenceUrl: 'https://elicit.com',
    displayOrder: 3,
  },
  // research-web-discovery
  {
    toolSlug: 'perplexity',
    useCaseSlug: 'research-web-discovery',
    fitTier: 'primary',
    capabilities: 'Live web research with inline footnote citations',
    evidenceUrl: 'https://perplexity.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'consensus',
    useCaseSlug: 'research-web-discovery',
    fitTier: 'strong',
    capabilities: 'Academic paper search with citation-backed synthesis',
    limitation: 'Peer-reviewed literature focus — not general live web browsing',
    evidenceUrl: 'https://consensus.app',
    displayOrder: 2,
  },
  {
    toolSlug: 'elicit',
    useCaseSlug: 'research-web-discovery',
    fitTier: 'strong',
    capabilities: 'Semantic discovery across 138M+ academic papers',
    limitation: 'Academic corpus — not live open-web search',
    evidenceUrl: 'https://elicit.com',
    displayOrder: 3,
  },
  // academic-writing
  {
    toolSlug: 'grammarly',
    useCaseSlug: 'academic-writing',
    fitTier: 'partial',
    capabilities: 'Grammar, spelling, clarity, and tone suggestions for prose',
    limitation: 'General writing assistant — not academic-specific; institutions may regulate AI usage',
    evidenceUrl: 'https://www.grammarly.com',
    displayOrder: 1,
  },
  // reference-management-organization
  {
    toolSlug: 'remnote',
    useCaseSlug: 'reference-management-organization',
    fitTier: 'partial',
    capabilities: 'Hierarchical notes, PDF annotation, and spaced-repetition from sources',
    limitation: 'Notes workspace — not a dedicated citation manager like Zotero',
    evidenceUrl: 'https://www.remnote.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'reference-management-organization',
    fitTier: 'partial',
    capabilities: 'Source-grounded notebooks organizing uploaded research materials',
    limitation: '50 sources/notebook cap on free tier; not a bibliography manager',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 2,
  },
];

export const RESEARCHER_VERIFIED_AT = VERIFIED_AT;
