import { Tool } from '../../../types/tool';

export const perplexityTool: Tool = {
  id: 'tool-perplexity',
  name: 'Perplexity AI',
  slug: 'perplexity',
  logo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'AI answer engine providing real-time web search results with verifiable web citations.',
  description: 'Perplexity AI functions as an intelligent search answer engine. It searches live web sources, synthesizes clear answers, and attaches inline footnote citations for instant source verification.',
  categoryId: 'cat-seo',
  categoryName: 'SEO & Web Research',
  tags: ['Search Engine', 'Research', 'Citations', 'Live Web'],
  pricingModel: 'Freemium',
  monthlyPrice: 20,
  hasFreeTrial: true,
  companyName: 'Perplexity AI',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://perplexity.ai/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Perplexity AI Free and Pro pricing from official pricing page.'
    },
    {
      type: 'features',
      url: 'https://perplexity.ai',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed web search, citations, and model selection features from product homepage.'
    },
    {
      type: 'company',
      url: 'https://perplexity.ai',
      verifiedAt: '2026-08-07',
      notes: 'Verified company branding and web presence.'
    }
  ],
  pricingSource: 'https://perplexity.ai/pricing',
  featureSource: 'https://perplexity.ai',
  platforms: ['Web', 'iOS', 'Android', 'Windows', 'macOS'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Limited daily Pro Search', 'Basic web answers', 'Standard model access']
    },
    {
      name: 'Pro',
      price: 20,
      billingPeriod: 'monthly',
      features: ['Unlimited Pro Searches', 'Advanced model selection', 'File upload analysis']
    }
  ],
  websiteUrl: 'https://perplexity.ai',
  features: ['Pro Search iterative web crawling', 'Inline source citations', 'Model selection (Sonar, Claude, GPT-4o)', 'File & PDF research analysis', 'Collections workspace sharing'],
  pros: ['Eliminates search engine ad clutter', 'Direct footnote links to trustworthy web sources', 'Fast concise synthesis'],
  cons: ['Pro search credits required for heavy continuous research'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['chatgpt', 'gemini'],
  targetUsers: ['writers', 'teachers', 'developers', 'marketers', 'small-business', 'researchers', 'real-estate-agents'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: true,
  createdAt: '2024-02-01T00:00:00.000Z',
  updatedAt: '2026-08-03T00:00:00.000Z'
};