import { Persona, Tool } from '../../types/tool';
import { UseCaseFitTier } from './pm-cluster';

export interface MarketerUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface MarketerPersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface MarketerToolUseCaseSeed {
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
const CAT_WRITING = 'cat-writing';
const CAT_IMAGE = 'cat-image';
const CAT_SEO = 'cat-seo';
const CAT_PRODUCTIVITY = 'cat-productivity';

function favicon(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

type MarketerToolInput = Partial<Tool> &
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

function marketerTool(partial: MarketerToolInput): Tool {
  return {
    id: partial.id ?? `tool-${partial.slug}`,
    categoryId: partial.categoryId ?? CAT_WRITING,
    categoryName: partial.categoryName ?? 'Writing & Copywriting',
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

/** Replaces seed placeholder — same slug `marketers`, verified hub persona. */
export const MARKETER_PERSONA: Persona = {
  id: 'per-marketers',
  title: 'Marketers & Growth Leads',
  slug: 'marketers',
  iconName: 'TrendingUp',
  subtitle: 'Content, SEO, social, email, ads, and marketing analytics',
  description:
    'Verified AI tools for marketers — content creation, SEO research, social publishing, email campaigns, ad creative, and marketing analytics. Curated from official product sources.',
  targetRole: 'Marketer',
  keyBenefits: [
    'Draft on-brand marketing copy and campaign assets',
    'Research keywords and track SEO performance',
    'Schedule social posts and generate captions with AI',
    'Run email workflows and measure campaign analytics',
  ],
  topToolSlugs: ['jasper', 'hubspot', 'semrush', 'copy-ai', 'canva', 'hootsuite'],
  faqs: [
    {
      question: 'What AI tools do marketers use most?',
      answer:
        'Common verified categories include AI copy platforms (Jasper, Copy.ai), design and ad creative (Canva), SEO suites (Semrush), and marketing CRM hubs with AI (HubSpot, Hootsuite for social).',
    },
    {
      question: 'Can one tool cover every marketing workflow?',
      answer:
        'HubSpot spans email, ads, and analytics, but most teams combine specialized tools — e.g. Semrush for SEO, Canva for creative, and Jasper or Copy.ai for copy — mapped to workflows on this hub.',
    },
  ],
};

export const MARKETER_USE_CASES: MarketerUseCaseSeed[] = [
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    description:
      'Blog posts, landing pages, campaign copy, and brand-voice content for marketing teams.',
    primaryKeyword: 'best ai tools for content marketing',
    seoTitle: 'Best AI Content Marketing Tools (2026)',
    seoDescription:
      'Verified AI content marketing tools — copy, brand voice, and visual content from official sources.',
  },
  {
    slug: 'seo-search',
    title: 'SEO & Search',
    description:
      'Keyword research, competitive analysis, SEO content optimization, and search visibility tracking.',
    primaryKeyword: 'ai seo tools',
    seoTitle: 'Best AI SEO Tools for Marketers (2026)',
    seoDescription:
      'Verified AI SEO and search tools for keyword research and content optimization.',
  },
  {
    slug: 'social-media',
    title: 'Social Media',
    description:
      'AI-assisted social captions, scheduling, and multi-channel publishing for marketing teams.',
    primaryKeyword: 'ai tools for social media managers',
    seoTitle: 'Best AI Social Media Tools for Marketers (2026)',
    seoDescription:
      'Verified AI social media tools — caption generation, scheduling, and publishing.',
  },
  {
    slug: 'email-marketing',
    title: 'Email Marketing',
    description:
      'AI-assisted email copy, campaign workflows, and nurture sequences for marketing teams.',
    primaryKeyword: 'ai tools for email automation',
    seoTitle: 'Best AI Email Marketing Tools (2026)',
    seoDescription:
      'Verified AI email marketing tools — copy generation and campaign automation.',
  },
  {
    slug: 'ad-creation',
    title: 'Ad Creation',
    description:
      'Ad copy variants, visual creative, and campaign assets for paid and organic channels.',
    primaryKeyword: 'ai ad generator',
    seoTitle: 'Best AI Ad Creation Tools for Marketers (2026)',
    seoDescription:
      'Verified AI ad creation tools — copy and visual creative from official sources.',
  },
  {
    slug: 'marketing-analytics',
    title: 'Marketing Analytics',
    description:
      'Campaign reporting, SEO analytics, and marketing performance dashboards.',
    primaryKeyword: 'ai marketing analytics',
    seoTitle: 'Best AI Marketing Analytics Tools (2026)',
    seoDescription:
      'Verified AI marketing analytics and reporting tools for growth teams.',
  },
];

export const MARKETER_PERSONA_USE_CASES: MarketerPersonaUseCaseSeed[] = [
  {
    useCaseSlug: 'content-marketing',
    order: 1,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — verified content marketing tools on this page.',
  },
  {
    useCaseSlug: 'seo-search',
    order: 2,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — SEO and search tools on this page.',
  },
  {
    useCaseSlug: 'social-media',
    order: 3,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — social media tools on this page.',
  },
  {
    useCaseSlug: 'email-marketing',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — email marketing tools on this page.',
  },
  {
    useCaseSlug: 'ad-creation',
    order: 5,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — ad creation tools on this page.',
  },
  {
    useCaseSlug: 'marketing-analytics',
    order: 6,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — marketing analytics tools on this page.',
  },
];

export const MARKETER_TOOLS: Tool[] = [
  marketerTool({
    name: 'Copy.ai',
    slug: 'copy-ai',
    logo: favicon('copy.ai'),
    tagline: 'GTM AI platform for marketing copy, workflows, and sales enablement content.',
    description:
      'Copy.ai provides AI workflows for marketing and go-to-market teams — blog posts, emails, social copy, and campaign content. Verified from copy.ai official product pages.',
    tags: ['Marketing', 'Copywriting', 'GTM', 'Workflows'],
    pricingModel: 'Freemium',
    monthlyPrice: 36,
    hasFreeTrial: true,
    companyName: 'Copy.ai',
    websiteUrl: 'https://www.copy.ai',
    featureSource: 'https://www.copy.ai',
    pricingSource: 'https://www.copy.ai/prices',
    sources: [{ type: 'features', url: 'https://www.copy.ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Marketing copy workflows', 'Email and social templates', 'Brand voice', 'Workflow automation'],
    pros: ['GTM-focused workflow templates'],
    cons: ['Advanced workflows on paid tiers per official pricing'],
    alternatives: ['jasper'],
    targetUsers: ['marketers', 'entrepreneurs', 'small-business'],
  }),
  marketerTool({
    name: 'Canva',
    slug: 'canva',
    categoryId: CAT_IMAGE,
    categoryName: 'Image & Design',
    logo: favicon('canva.com'),
    tagline: 'AI design platform — Magic Write, visual content, social posts, and ad creative.',
    description:
      'Canva offers Magic Write AI text generation, AI image tools, and design templates for social posts, ads, and marketing visuals. Verified from canva.com official AI pages.',
    tags: ['Marketing', 'Design', 'Social Media', 'Ad Creative'],
    pricingModel: 'Freemium',
    monthlyPrice: 15,
    hasFreeTrial: true,
    companyName: 'Canva',
    websiteUrl: 'https://www.canva.com',
    featureSource: 'https://www.canva.com/ai/',
    pricingSource: 'https://www.canva.com/pricing/',
    sources: [{ type: 'features', url: 'https://www.canva.com/ai/', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'iOS', 'Android'],
    hasMobileApp: true,
    features: ['Magic Write', 'AI image generation', 'Social post templates', 'Brand kits'],
    pros: ['Visual + copy in one design platform'],
    cons: ['Advanced AI features on Pro tier per official pricing'],
    alternatives: ['gamma'],
    targetUsers: ['marketers', 'content-creators', 'teachers', 'small-business', 'real-estate-agents'],
  }),
  marketerTool({
    name: 'Semrush',
    slug: 'semrush',
    categoryId: CAT_SEO,
    categoryName: 'SEO & Research',
    logo: favicon('semrush.com'),
    tagline: 'SEO and content marketing platform with AI writing and keyword research tools.',
    description:
      'Semrush provides keyword research, site audits, competitive analysis, and AI-assisted SEO content tools for marketing teams. Verified from semrush.com official product pages.',
    tags: ['Marketing', 'SEO', 'Analytics', 'Keyword Research'],
    pricingModel: 'Paid',
    monthlyPrice: 139.95,
    hasFreeTrial: true,
    companyName: 'Semrush',
    websiteUrl: 'https://www.semrush.com',
    featureSource: 'https://www.semrush.com/ai/',
    pricingSource: 'https://www.semrush.com/prices/',
    sources: [{ type: 'features', url: 'https://www.semrush.com/ai/', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    hasApi: true,
    features: ['Keyword research', 'Site audit', 'Competitive analysis', 'AI writing assistant'],
    pros: ['Deep SEO and competitive data'],
    cons: ['Premium pricing for full toolkit per official pricing'],
    alternatives: [],
    targetUsers: ['marketers', 'small-business', 'real-estate-agents'],
  }),
  marketerTool({
    name: 'HubSpot',
    slug: 'hubspot',
    categoryId: CAT_PRODUCTIVITY,
    categoryName: 'Productivity & Search',
    logo: favicon('hubspot.com'),
    tagline: 'Marketing CRM with Breeze AI — email, ads, social, SEO, and analytics in one hub.',
    description:
      'HubSpot Marketing Hub includes Breeze AI assistants for content, email campaigns, social publishing, ad workflows, and reporting dashboards. Verified from hubspot.com official AI product pages.',
    tags: ['Marketing', 'CRM', 'Email', 'Analytics'],
    pricingModel: 'Freemium',
    monthlyPrice: 20,
    hasFreeTrial: true,
    companyName: 'HubSpot',
    websiteUrl: 'https://www.hubspot.com',
    featureSource: 'https://www.hubspot.com/products/ai',
    pricingSource: 'https://www.hubspot.com/pricing/marketing',
    sources: [{ type: 'features', url: 'https://www.hubspot.com/products/ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    hasApi: true,
    features: ['Breeze AI content assistant', 'Email marketing', 'Social tools', 'Ads', 'Marketing analytics'],
    pros: ['Unified marketing CRM with AI'],
    cons: ['Advanced AI and automation on higher tiers per official pricing'],
    alternatives: [],
    targetUsers: ['marketers', 'entrepreneurs', 'small-business'],
  }),
  marketerTool({
    name: 'Hootsuite',
    slug: 'hootsuite',
    categoryId: CAT_PRODUCTIVITY,
    categoryName: 'Productivity & Search',
    logo: favicon('hootsuite.com'),
    tagline: 'Social media management with OwlyWriter AI for captions, hashtags, and content ideas.',
    description:
      'Hootsuite provides social scheduling, publishing, and OwlyWriter AI for caption and hashtag generation across networks. Verified from hootsuite.com official OwlyWriter product pages.',
    tags: ['Marketing', 'Social Media', 'Scheduling', 'OwlyWriter AI'],
    pricingModel: 'Paid',
    monthlyPrice: 99,
    hasFreeTrial: true,
    companyName: 'Hootsuite',
    websiteUrl: 'https://www.hootsuite.com',
    featureSource: 'https://www.hootsuite.com/platform/owlywriter-ai',
    pricingSource: 'https://www.hootsuite.com/plans',
    sources: [
      {
        type: 'features',
        url: 'https://www.hootsuite.com/platform/owlywriter-ai',
        verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z`,
      },
    ],
    platforms: ['Web', 'iOS', 'Android'],
    hasMobileApp: true,
    features: ['Social scheduling', 'OwlyWriter AI captions', 'Multi-network publishing', 'Content calendar'],
    pros: ['AI captions tied to scheduling workflow'],
    cons: ['OwlyWriter AI on paid plans per official pricing'],
    alternatives: [],
    targetUsers: ['marketers', 'content-creators'],
  }),
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

export const MARKETER_TOOL_USE_CASES: MarketerToolUseCaseSeed[] = [
  // content-marketing
  {
    toolSlug: 'jasper',
    useCaseSlug: 'content-marketing',
    fitTier: 'primary',
    capabilities: 'Brand voice, marketing templates, blog and campaign copy',
    evidenceUrl: 'https://www.jasper.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'copy-ai',
    useCaseSlug: 'content-marketing',
    fitTier: 'primary',
    capabilities: 'GTM workflows, marketing copy, blog and landing page content',
    evidenceUrl: 'https://www.copy.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'canva',
    useCaseSlug: 'content-marketing',
    fitTier: 'strong',
    capabilities: 'Magic Write, visual content and marketing design templates',
    limitation: 'Design-first — not a long-form copy platform',
    evidenceUrl: 'https://www.canva.com/ai/',
    displayOrder: 3,
  },
  // seo-search
  {
    toolSlug: 'semrush',
    useCaseSlug: 'seo-search',
    fitTier: 'primary',
    capabilities: 'Keyword research, site audit, competitive analysis, AI SEO writing',
    evidenceUrl: 'https://www.semrush.com/ai/',
    displayOrder: 1,
  },
  {
    toolSlug: 'hubspot',
    useCaseSlug: 'seo-search',
    fitTier: 'partial',
    capabilities: 'SEO recommendations and content optimization in Marketing Hub',
    limitation: 'Broader CRM platform — SEO is one module',
    evidenceUrl: 'https://www.hubspot.com/products/ai',
    displayOrder: 2,
  },
  // social-media
  {
    toolSlug: 'hootsuite',
    useCaseSlug: 'social-media',
    fitTier: 'primary',
    capabilities: 'OwlyWriter AI captions, scheduling, multi-network publishing',
    evidenceUrl: 'https://www.hootsuite.com/platform/owlywriter-ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'canva',
    useCaseSlug: 'social-media',
    fitTier: 'strong',
    capabilities: 'Social post templates, Magic Write, AI visual content',
    evidenceUrl: 'https://www.canva.com/ai/',
    displayOrder: 2,
  },
  {
    toolSlug: 'hubspot',
    useCaseSlug: 'social-media',
    fitTier: 'partial',
    capabilities: 'Social publishing and AI content in Marketing Hub',
    limitation: 'Not a dedicated social scheduling specialist',
    evidenceUrl: 'https://www.hubspot.com/products/ai',
    displayOrder: 3,
  },
  // email-marketing
  {
    toolSlug: 'hubspot',
    useCaseSlug: 'email-marketing',
    fitTier: 'primary',
    capabilities: 'Email campaigns, Breeze AI content, automation workflows',
    evidenceUrl: 'https://www.hubspot.com/products/ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'jasper',
    useCaseSlug: 'email-marketing',
    fitTier: 'strong',
    capabilities: 'Email campaign copy, brand voice, marketing templates',
    limitation: 'Copy generation — requires separate ESP for sending',
    evidenceUrl: 'https://www.jasper.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'copy-ai',
    useCaseSlug: 'email-marketing',
    fitTier: 'strong',
    capabilities: 'Email copy workflows and nurture sequence templates',
    limitation: 'Copy generation — requires separate ESP for sending',
    evidenceUrl: 'https://www.copy.ai',
    displayOrder: 3,
  },
  // ad-creation
  {
    toolSlug: 'canva',
    useCaseSlug: 'ad-creation',
    fitTier: 'primary',
    capabilities: 'Ad creative templates, AI visuals, Magic Write for ad copy',
    evidenceUrl: 'https://www.canva.com/ai/',
    displayOrder: 1,
  },
  {
    toolSlug: 'jasper',
    useCaseSlug: 'ad-creation',
    fitTier: 'strong',
    capabilities: 'Ad copy variants, campaign templates, brand voice',
    evidenceUrl: 'https://www.jasper.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'hubspot',
    useCaseSlug: 'ad-creation',
    fitTier: 'partial',
    capabilities: 'Ad campaign workflows and AI content in Marketing Hub',
    limitation: 'Not a dedicated ad creative design tool',
    evidenceUrl: 'https://www.hubspot.com/products/ai',
    displayOrder: 3,
  },
  // marketing-analytics
  {
    toolSlug: 'hubspot',
    useCaseSlug: 'marketing-analytics',
    fitTier: 'primary',
    capabilities: 'Marketing dashboards, campaign reporting, attribution in CRM',
    evidenceUrl: 'https://www.hubspot.com/products/ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'semrush',
    useCaseSlug: 'marketing-analytics',
    fitTier: 'primary',
    capabilities: 'SEO analytics, keyword tracking, competitive intelligence',
    limitation: 'SEO/search analytics focus — not full-funnel CRM reporting',
    evidenceUrl: 'https://www.semrush.com/ai/',
    displayOrder: 2,
  },
];

export const MARKETER_VERIFIED_AT = VERIFIED_AT;
