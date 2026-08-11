import { Persona } from '../../types/tool';
import { UseCaseFitTier } from './pm-cluster';

export interface RealEstateUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface RealEstatePersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface RealEstateToolUseCaseSeed {
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

/** Replaces seed placeholder — same slug `real-estate-agents`. */
export const REAL_ESTATE_PERSONA: Persona = {
  id: 'per-real-estate-agents',
  title: 'Real Estate Agents',
  slug: 'real-estate-agents',
  iconName: 'Home',
  subtitle: 'Listing copy, property visuals, client decks, market research, and client meetings',
  description:
    'Verified AI tools for real estate agents and brokers — listing descriptions, property visuals, client presentations, market research, social marketing, and client meeting notes. Curated from official product sources.',
  targetRole: 'Real Estate Agent',
  keyBenefits: [
    'Draft listing descriptions and client-facing copy faster',
    'Generate property visuals and marketing graphics',
    'Build client presentation decks from prompts',
    'Research neighborhoods and market trends with cited sources',
  ],
  topToolSlugs: ['chatgpt', 'midjourney', 'gamma', 'canva', 'perplexity', 'otter-ai', 'jasper'],
  faqs: [
    {
      question: 'What AI tools do real estate agents use most?',
      answer:
        'Common verified categories include listing copy assistants (ChatGPT, Jasper), image generators (Midjourney, DALL-E 3), presentation builders (Gamma, Beautiful.ai), market research (Perplexity), and meeting notetakers (Otter.ai, Fathom).',
    },
    {
      question: 'Can AI replace professional real estate photography?',
      answer:
        'Image generators can produce marketing visuals and staging concepts, but official product evidence covers general generative artwork — not MLS-compliant photography workflows. Use AI visuals as supplements, not automatic replacements for licensed listing media.',
    },
  ],
};

export const REAL_ESTATE_USE_CASES: RealEstateUseCaseSeed[] = [
  {
    slug: 'listing-copy-descriptions',
    title: 'Listing Copy & Descriptions',
    description:
      'Draft, refine, and polish property listing descriptions and client-facing marketing copy.',
    primaryKeyword: 'ai listing description generator',
    seoTitle: 'Best AI Listing Description Tools for Real Estate (2026)',
    seoDescription:
      'Verified AI writing tools for real estate listing descriptions and property marketing copy.',
  },
  {
    slug: 'property-visuals-staging',
    title: 'Property Visuals & Staging',
    description:
      'Generate property marketing images, staging concepts, and visual assets for listings.',
    primaryKeyword: 'ai real estate staging',
    seoTitle: 'Best AI Property Visual Tools for Real Estate (2026)',
    seoDescription:
      'Verified AI image tools for real estate marketing visuals and staging concepts.',
  },
  {
    slug: 'client-presentations-pitch-decks',
    title: 'Client Presentations & Pitch Decks',
    description:
      'Build buyer/seller presentation decks, property pitch materials, and visual client reports.',
    primaryKeyword: 'ai real estate presentation',
    seoTitle: 'Best AI Presentation Tools for Real Estate Agents (2026)',
    seoDescription:
      'Verified AI presentation tools for real estate client decks and pitch materials.',
  },
  {
    slug: 'market-neighborhood-research',
    title: 'Market & Neighborhood Research',
    description:
      'Research neighborhoods, comps context, and market trends with cited web sources.',
    primaryKeyword: 'ai tools for real estate market research',
    seoTitle: 'Best AI Market Research Tools for Real Estate (2026)',
    seoDescription:
      'Verified AI research tools for real estate market and neighborhood analysis.',
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    description:
      'Create social captions, listing promo graphics, and multi-channel marketing assets.',
    primaryKeyword: 'ai social media tools for real estate',
    seoTitle: 'Best AI Social Media Tools for Real Estate (2026)',
    seoDescription:
      'Verified AI social media and visual marketing tools for real estate agents.',
  },
  {
    slug: 'client-meetings-follow-ups',
    title: 'Client Meetings & Follow-ups',
    description:
      'Capture client meeting notes, summarize walkthroughs, and draft follow-up messages.',
    primaryKeyword: 'ai meeting notes for real estate',
    seoTitle: 'Best AI Client Meeting Tools for Real Estate (2026)',
    seoDescription:
      'Verified AI meeting and follow-up tools for real estate client conversations.',
  },
];

export const REAL_ESTATE_PERSONA_USE_CASES: RealEstatePersonaUseCaseSeed[] = [
  {
    useCaseSlug: 'listing-copy-descriptions',
    order: 1,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — listing copy tools on this page.',
  },
  {
    useCaseSlug: 'property-visuals-staging',
    order: 2,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — property visual tools on this page.',
  },
  {
    useCaseSlug: 'client-presentations-pitch-decks',
    order: 3,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — client presentation tools on this page.',
  },
  {
    useCaseSlug: 'market-neighborhood-research',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — market research tools on this page.',
  },
  {
    useCaseSlug: 'social-media-marketing',
    order: 5,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — social marketing tools on this page.',
  },
  {
    useCaseSlug: 'client-meetings-follow-ups',
    order: 6,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — client meeting tools on this page.',
  },
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

/** Maps existing verified tools only — no new tool records. */
export const REAL_ESTATE_TOOL_USE_CASES: RealEstateToolUseCaseSeed[] = [
  // listing-copy-descriptions
  {
    toolSlug: 'chatgpt',
    useCaseSlug: 'listing-copy-descriptions',
    fitTier: 'partial',
    capabilities: 'Drafting and editing property listing prose via conversational AI',
    limitation: 'General writing assistant — not a dedicated real estate MLS listing platform',
    evidenceUrl: 'https://openai.com/chatgpt',
    displayOrder: 1,
  },
  {
    toolSlug: 'jasper',
    useCaseSlug: 'listing-copy-descriptions',
    fitTier: 'partial',
    capabilities: 'Brand voice and marketing copy templates for property descriptions',
    limitation: 'Marketing copy platform — not real-estate-specific listing compliance tooling',
    evidenceUrl: 'https://www.jasper.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'grammarly',
    useCaseSlug: 'listing-copy-descriptions',
    fitTier: 'partial',
    capabilities: 'Grammar, spelling, clarity, and tone suggestions for listing prose',
    limitation: 'Writing polish only — does not generate full listing templates',
    evidenceUrl: 'https://www.grammarly.com',
    displayOrder: 3,
  },
  // property-visuals-staging
  {
    toolSlug: 'midjourney',
    useCaseSlug: 'property-visuals-staging',
    fitTier: 'primary',
    capabilities: 'Photorealistic image generation for property marketing visuals',
    limitation: 'Generative artwork — not a substitute for licensed MLS listing photography',
    evidenceUrl: 'https://midjourney.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'dall-e-3',
    useCaseSlug: 'property-visuals-staging',
    fitTier: 'strong',
    capabilities: 'Generative images with strong prompt adherence and readable text in visuals',
    limitation: 'Safety filters and Plus subscription limits on heavy ChatGPT usage',
    evidenceUrl: 'https://openai.com/dall-e-3',
    displayOrder: 2,
  },
  // client-presentations-pitch-decks
  {
    toolSlug: 'gamma',
    useCaseSlug: 'client-presentations-pitch-decks',
    fitTier: 'partial',
    capabilities: 'AI slide decks and visual documents from prompts or imported files',
    limitation: 'Presentation builder — no real-estate-specific CMA or listing schema',
    evidenceUrl: 'https://gamma.app',
    displayOrder: 1,
  },
  {
    toolSlug: 'beautiful-ai',
    useCaseSlug: 'client-presentations-pitch-decks',
    fitTier: 'partial',
    capabilities: 'AI presentation maker with Reports templates and PPTX export',
    limitation: 'General deck builder — not a dedicated real estate CMA tool',
    evidenceUrl: 'https://www.beautiful.ai',
    displayOrder: 2,
  },
  // market-neighborhood-research
  {
    toolSlug: 'perplexity',
    useCaseSlug: 'market-neighborhood-research',
    fitTier: 'primary',
    capabilities: 'Live web research with inline citations for market and neighborhood context',
    evidenceUrl: 'https://perplexity.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'semrush',
    useCaseSlug: 'market-neighborhood-research',
    fitTier: 'partial',
    capabilities: 'Keyword research, competitive analysis, and SEO intelligence',
    limitation: 'SEO/marketing intelligence — not MLS comps or transaction data',
    evidenceUrl: 'https://www.semrush.com/ai/',
    displayOrder: 2,
  },
  // social-media-marketing
  {
    toolSlug: 'canva',
    useCaseSlug: 'social-media-marketing',
    fitTier: 'strong',
    capabilities: 'Magic Write, social templates, and AI visual marketing assets',
    evidenceUrl: 'https://www.canva.com/ai/',
    displayOrder: 1,
  },
  {
    toolSlug: 'midjourney',
    useCaseSlug: 'social-media-marketing',
    fitTier: 'partial',
    capabilities: 'Generative visual assets for social listing promotions',
    limitation: 'Image generator — not a social scheduling platform',
    evidenceUrl: 'https://midjourney.com',
    displayOrder: 2,
  },
  // client-meetings-follow-ups
  {
    toolSlug: 'otter-ai',
    useCaseSlug: 'client-meetings-follow-ups',
    fitTier: 'primary',
    capabilities: 'Transcription, AI summaries, action items for client meetings',
    evidenceUrl: 'https://otter.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'fathom',
    useCaseSlug: 'client-meetings-follow-ups',
    fitTier: 'strong',
    capabilities: 'Recordings, transcripts, AI summaries, and action items',
    evidenceUrl: 'https://www.fathom.video',
    displayOrder: 2,
  },
  {
    toolSlug: 'chatgpt',
    useCaseSlug: 'client-meetings-follow-ups',
    fitTier: 'partial',
    capabilities: 'Draft follow-up emails and client communication from meeting notes',
    limitation: 'General assistant — requires manual paste of meeting context',
    evidenceUrl: 'https://openai.com/chatgpt',
    displayOrder: 3,
  },
];

export const REAL_ESTATE_VERIFIED_AT = VERIFIED_AT;
