import { Category } from '../../types/tool';

export const CAT_MARKETING = 'cat-marketing';

export const MARKETING_SECTIONS = [
  {
    slug: 'crm-email',
    title: 'Marketing CRM & Email',
    description:
      'Unified marketing CRM with Breeze AI for content, email campaigns, contact pipelines, ads, and analytics dashboards — verified from hubspot.com.',
    toolSlugs: ['hubspot'],
  },
  {
    slug: 'social-scheduling',
    title: 'Social Media Scheduling',
    description:
      'Multi-network social publishing with OwlyWriter AI for captions, hashtags, and content ideas — verified from hootsuite.com.',
    toolSlugs: ['hootsuite'],
  },
] as const;

export const MARKETING_CATEGORY: Category = {
  id: CAT_MARKETING,
  name: 'Marketing & CRM',
  slug: 'marketing',
  iconName: 'TrendingUp',
  description:
    'Verified AI marketing CRM and social scheduling tools currently in our catalog — not an exhaustive “best of” list.',
  longDescription:
    'This category lists the marketing-platform tools in our verified inventory today: HubSpot for CRM, email, and analytics workflows, and Hootsuite for social scheduling with OwlyWriter AI. Other marketer workflows use sibling categories — copy platforms on Writing, design on Image & Design, SEO on SEO & Web Research — plus the Marketers hub at /for/marketers for workflow-level guides.',
  toolCount: 0,
  faqs: [
    {
      question: 'Why are there only two tools in this category?',
      answer:
        'We list tools only after official-source verification. Today our marketing-platform inventory is HubSpot and Hootsuite. Jasper, Copy.ai, Canva, and Semrush are mapped to Writing, Image & Design, and SEO categories respectively, and appear on the Marketers hub (/for/marketers) by workflow — we do not duplicate them here to inflate category size.',
    },
    {
      question: 'Where should I look for AI copywriting and ad creative?',
      answer:
        'Marketing copy platforms Jasper and Copy.ai are cataloged under Writing & Copywriting (/category/writing) with a dedicated marketing section. Visual ad and social creative often flows through Canva on the Image & Design category. Start at /for/marketers for workflow-level groupings across categories.',
    },
    {
      question: 'Is HubSpot only for email marketing?',
      answer:
        'No. HubSpot Marketing Hub spans Breeze AI content, email campaigns, social publishing modules, ad workflows, and marketing analytics per hubspot.com/products/ai. Our listing reflects Marketing Hub capabilities — not Sales Hub or Service Hub as standalone products.',
    },
    {
      question: 'How is Hootsuite different from Canva for social posts?',
      answer:
        'Hootsuite is a social scheduling and publishing platform with OwlyWriter AI captions tied to a content calendar. Canva is a design-first platform with Magic Write and visual templates on the Image & Design category. Many teams use both — design in Canva, schedule in Hootsuite.',
    },
    {
      question: 'Do HubSpot or Hootsuite offer free tiers?',
      answer:
        'HubSpot lists free and starter Marketing Hub tiers with feature limits per hubspot.com/pricing/marketing. Hootsuite’s OwlyWriter AI is on paid plans per hootsuite.com/plans — check each tool profile for current official pricing before committing.',
    },
  ],
  seoTitle: 'AI Marketing & CRM Tools (2026)',
  seoDescription:
    'Verified HubSpot and Hootsuite listings for marketing CRM, email, and social scheduling — with links to copy, design, and SEO categories for the full marketer stack.',
};
