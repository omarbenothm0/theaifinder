import { Tool } from '../../../types/tool';

export const dallE3Tool: Tool = {
  id: 'tool-dall-e-3',
  name: 'DALL-E 3',
  slug: 'dall-e-3',
  logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'OpenAI native image generation model integrated seamlessly inside ChatGPT.',
  description: 'DALL-E 3 translates complex, detailed prompts into clear visual graphics, illustrations, and photorealistic imagery. It natively parses context nuances via ChatGPT conversational prompts.',
  categoryId: 'cat-image',
  categoryName: 'Image & Design',
  tags: ['Image Generation', 'OpenAI', 'DALL-E', 'Illustrations'],
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
      notes: 'Verified API and ChatGPT pricing for DALL-E 3 usage from OpenAI pricing details.'
    },
    {
      type: 'features',
      url: 'https://openai.com/dall-e-3',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed DALL-E 3 feature set and ChatGPT integration from OpenAI product page.'
    },
    {
      type: 'company',
      url: 'https://openai.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified OpenAI branding and platform ownership.'
    }
  ],
  pricingSource: 'https://openai.com/pricing',
  featureSource: 'https://openai.com/dall-e-3',
  platforms: ['Web', 'iOS', 'Android', 'API'],
  pricingTiers: [
    {
      name: 'Free (via ChatGPT)',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Limited image generations per day', 'Standard resolution output', 'Access through ChatGPT conversation']
    },
    {
      name: 'Plus (via ChatGPT)',
      price: 20,
      billingPeriod: 'monthly',
      features: ['Expanded daily image generations', 'Priority generation queue', 'Higher resolution output']
    },
    {
      name: 'API',
      price: null,
      billingPeriod: 'custom',
      features: ['Pay-per-image API pricing', 'Programmatic access for developers', 'Multiple resolution and quality options']
    }
  ],
  websiteUrl: 'https://openai.com/dall-e-3',
  features: ['Native ChatGPT conversation prompt refinement', 'High prompt adherence', 'Built-in text rendering capability', 'API image endpoint integration'],
  pros: ['Follows prompt instructions with unmatched fidelity', 'Renders readable English text inside images'],
  cons: ['Strict safety filters block certain stylized art', 'Requires Plus subscription for unlimited ChatGPT usage'],
  rating: 4.7,
  reviewCount: 1750,
  screenshots: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['midjourney'],
  targetUsers: ['content-creators', 'marketers', 'teachers', 'real-estate-agents'],
  verified: true,
  featured: false,
  trending: true,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: true,
  createdAt: '2024-02-01T00:00:00.000Z',
  updatedAt: '2026-07-28T00:00:00.000Z'
};