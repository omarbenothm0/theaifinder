import { Tool } from '../../../types/tool';

export const jasperTool: Tool = {
  id: 'tool-jasper',
  name: 'Jasper AI',
  slug: 'jasper',
  logo: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'Enterprise marketing AI platform for brand voice, ad campaigns, and multi-channel copy.',
  description: 'Jasper AI empowers enterprise marketing teams to draft on-brand blog posts, ad variants, social content, and email campaigns while strictly adhering to company style guidelines and brand guidelines.',
  categoryId: 'cat-writing',
  categoryName: 'Writing & Copywriting',
  tags: ['Marketing', 'Brand Voice', 'Copywriting', 'Enterprise'],
  pricingModel: 'Paid',
  monthlyPrice: 39,
  hasFreeTrial: true,
  companyName: 'Jasper',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://jasper.ai/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Jasper subscription pricing and plans from official pricing page.'
    },
    {
      type: 'features',
      url: 'https://jasper.ai',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed marketing AI features, brand voice, and SEO integrations from homepage.'
    },
    {
      type: 'company',
      url: 'https://jasper.ai',
      verifiedAt: '2026-08-07',
      notes: 'Verified company and platform details.'
    }
  ],
  pricingSource: 'https://jasper.ai/pricing',
  featureSource: 'https://jasper.ai',
  platforms: ['Web', 'Chrome Extension', 'iOS', 'Android'],
  pricingTiers: [
    {
      name: 'Creator',
      price: 39,
      billingPeriod: 'monthly',
      features: ['Brand Voice', 'Templates for marketing content', 'SEO mode']
    },
    {
      name: 'Pro',
      price: 59,
      billingPeriod: 'monthly',
      features: ['Advanced collaboration', 'Team workspaces', 'Expanded usage limits']
    }
  ],
  websiteUrl: 'https://jasper.ai',
  features: ['Custom Brand Voice memory', 'Multi-channel marketing campaigns', 'Browser extension integration', 'SEO mode with SurferSEO integration', 'Plagiarism checker'],
  pros: ['Maintains strict corporate brand tone', 'Excellent built-in marketing templates'],
  cons: ['Higher price point compared to standalone ChatGPT'],
  rating: 4.6,
  reviewCount: 1490,
  screenshots: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['chatgpt', 'claude'],
  targetUsers: ['marketers', 'content-creators', 'entrepreneurs', 'writers', 'small-business', 'real-estate-agents'],
  verified: true,
  featured: false,
  trending: false,
  hasApi: true,
  hasMobileApp: false,
  hasExtension: true,
  createdAt: '2024-01-05T00:00:00.000Z',
  updatedAt: '2026-07-15T00:00:00.000Z'
};