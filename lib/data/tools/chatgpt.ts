import { Tool } from '../../../types/tool';

export const chatgptTool: Tool = {
  id: 'tool-chatgpt',
  name: 'ChatGPT',
  slug: 'chatgpt',
  logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'Conversational AI for writing, analysis, coding, and multi-modal tasks across web and mobile apps.',
  description: 'ChatGPT by OpenAI is a multi-modal AI platform with tiered access to OpenAI models, including GPT-5 on the free plan and advanced reasoning models on paid subscriptions. It assists millions of users worldwide with creative writing, complex data analysis, coding, language translation, and visual image generation via DALL-E 3.',
  categoryId: 'cat-writing',
  categoryName: 'Writing & Copywriting',
  tags: ['AI Assistant', 'Copywriting', 'Coding', 'GPT-5'],
  pricingModel: 'Freemium',
  monthlyPrice: 20,
  hasFreeTrial: true,
  companyName: 'OpenAI',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://openai.com/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified official pricing tiers and Free/Plus plan details from OpenAI pricing page.'
    },
    {
      type: 'features',
      url: 'https://openai.com/chatgpt',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed feature set and multi-modal capabilities from official ChatGPT product page.'
    },
    {
      type: 'company',
      url: 'https://openai.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified company details from OpenAI corporate site.'
    },
    {
      type: 'website',
      url: 'https://chatgpt.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified product landing page and URL.'
    }
  ],
  pricingSource: 'https://openai.com/pricing',
  featureSource: 'https://openai.com/chatgpt',
  platforms: ['Web', 'iOS', 'Android', 'Windows', 'macOS'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['GPT-5 access with usage limits', 'Standard response speed', 'May include ads in some countries']
    },
    {
      name: 'Plus',
      price: 20,
      billingPeriod: 'monthly',
      features: ['Advanced reasoning models', 'Expanded messages and uploads', 'Priority access during high traffic', 'Ad-free']
    },
    {
      name: 'Pro',
      price: 200,
      billingPeriod: 'monthly',
      features: ['Full model suite including top reasoning tier', 'Maximum usage limits', 'Fastest response speed']
    },
    {
      name: 'Business',
      price: 20,
      billingPeriod: 'monthly',
      features: ['Per-user pricing, 2-seat minimum', 'No training on data by default', 'SSO, SOC 2 compliance', 'Shared workspaces']
    },
    {
      name: 'Enterprise',
      price: null,
      billingPeriod: 'custom',
      features: ['Custom contract pricing', 'Advanced admin & security controls', 'Dedicated support']
    }
  ],
  websiteUrl: 'https://chatgpt.com',
  features: ['GPT-5 access on free tier with usage limits', 'Advanced reasoning models on Plus and Pro', 'Custom GPTs marketplace', 'Data analysis & Python runner', 'DALL-E 3 image generation', 'Voice conversational mode'],
  pros: ['GPT-5 free-tier access and advanced reasoning models on paid plans per OpenAI docs', 'Extensive third-party GPT ecosystem', 'Fast real-time responses', 'Native mobile applications'],
  cons: ['Free tier rate limits during peak usage', 'Requires $20/mo Plus subscription for top models'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['claude', 'gemini', 'perplexity'],
  targetUsers: ['content-creators', 'developers', 'writers', 'marketers', 'teachers', 'real-estate-agents'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: true,
  createdAt: '2024-01-15T00:00:00.000Z',
  updatedAt: '2026-08-01T00:00:00.000Z'
};