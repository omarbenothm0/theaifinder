import { Tool } from '../../../types/tool';
import { resolveToolLogo } from '../tool-logos';

export const notionAiTool: Tool = {
  id: 'tool-notion-ai',
  name: 'Notion AI',
  slug: 'notion-ai',
  logo: resolveToolLogo('notion-ai'),
  tagline: 'Integrated workspace assistant for notes, project docs, Q&A synthesis, and database search.',
  description: 'Notion AI connects your personal or team wiki notes, tasks, and project docs with an AI assistant that answers workspace questions, drafts documentation, and auto-fills database properties.',
  categoryId: 'cat-productivity',
  categoryName: 'Productivity & Workspace',
  tags: ['Workspace', 'Notes', 'Q&A', 'Productivity'],
  pricingModel: 'Paid',
  monthlyPrice: 10,
  hasFreeTrial: true,
  companyName: 'Notion',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://notion.so/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Notion AI add-on pricing and plan requirements on official pricing page.'
    },
    {
      type: 'features',
      url: 'https://notion.so/product/ai',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed AI assistant capabilities and workspace integration features from Notion AI product page.'
    },
    {
      type: 'company',
      url: 'https://notion.so',
      verifiedAt: '2026-08-07',
      notes: 'Verified Notion company branding and platform details.'
    }
  ],
  pricingSource: 'https://notion.so/pricing',
  featureSource: 'https://notion.so/product/ai',
  platforms: ['Web', 'Windows', 'macOS', 'iOS', 'Android'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Basic workspace tools', 'Limited AI credits', 'Personal notes']
    },
    {
      name: 'Plus',
      price: 10,
      billingPeriod: 'monthly',
      features: ['AI assistant access', 'Expanded workspace limits', 'Collaboration features']
    }
  ],
  websiteUrl: 'https://notion.so/product/ai',
  features: ['Q&A over entire Notion workspace', 'Auto-fill database rows & summaries', 'Action item extraction from meeting notes', 'Tone & language translation'],
  pros: ['Directly embedded in daily workflow docs', 'Understands custom database context'],
  cons: ['Add-on fee on top of standard Notion plan'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['/screenshots/notion-1.png'],
  alternatives: ['chatgpt', 'claude'],
  targetUsers: ['entrepreneurs', 'developers', 'writers', 'marketers', 'project-managers', 'small-business'],
  verified: true,
  featured: true,
  trending: false,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: true,
  createdAt: '2024-01-18T00:00:00.000Z',
  updatedAt: '2026-07-29T00:00:00.000Z'
};