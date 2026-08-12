import { Tool } from '../../../types/tool';

export const midjourneyTool: Tool = {
  id: 'tool-midjourney',
  name: 'Midjourney',
  slug: 'midjourney',
  logo: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'Text-to-image generation via web app and Discord for concept art, marketing visuals, and design assets.',
  description: 'Midjourney generates hyper-realistic, highly artistic images from natural language text prompts. Used globally by graphic designers, concept artists, and content creators for visual storytelling and asset design.',
  categoryId: 'cat-image',
  categoryName: 'Image & Design',
  tags: ['Image Generation', 'Photorealism', 'Art Synthesis'],
  pricingModel: 'Paid',
  monthlyPrice: 10,
  hasFreeTrial: false,
  companyName: 'Midjourney, Inc.',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://www.midjourney.com/account/billing',
      verifiedAt: '2026-08-07',
      notes: 'Verified monthly tier pricing and generation limits from Midjourney billing documentation.'
    },
    {
      type: 'features',
      url: 'https://www.midjourney.com',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed image generation capabilities, Discord workflow, and style controls from official site.'
    },
    {
      type: 'company',
      url: 'https://www.midjourney.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified Midjourney company details and product branding.'
    }
  ],
  pricingSource: 'https://www.midjourney.com/account/billing',
  featureSource: 'https://www.midjourney.com',
  platforms: ['Web', 'Discord'],
  pricingTiers: [
    {
      name: 'Basic',
      price: 10,
      billingPeriod: 'monthly',
      features: ['~200 image generations per month', 'General commercial usage terms', 'Access to member gallery']
    },
    {
      name: 'Standard',
      price: 30,
      billingPeriod: 'monthly',
      features: ['Unlimited relaxed generations', '15 hours fast generation', 'General commercial usage terms']
    },
    {
      name: 'Pro',
      price: 60,
      billingPeriod: 'monthly',
      features: ['Unlimited relaxed generations', '30 hours fast generation', 'Stealth mode for private generations']
    },
    {
      name: 'Mega',
      price: 120,
      billingPeriod: 'monthly',
      features: ['Unlimited relaxed generations', '60 hours fast generation', 'Stealth mode for private generations']
    }
  ],
  websiteUrl: 'https://midjourney.com',
  features: ['v6.1 photorealistic rendering engine', 'Web application canvas interface', 'Discord bot interface', 'Pan, zoom, & inpainting controls', 'Style raw and style reference parameters'],
  pros: ['v6.x image generation via web app and Discord', 'Extremely realistic textures and lighting', 'Active community showcase gallery'],
  cons: ['No permanent free trial tier', 'Prompt engineering required for exact composition'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['dall-e-3', 'stable-diffusion'],
  targetUsers: ['content-creators', 'marketers', 'youtubers', 'real-estate-agents'],
  verified: true,
  featured: true,
  trending: false,
  hasApi: false,
  hasMobileApp: false,
  hasExtension: false,
  createdAt: '2024-01-20T00:00:00.000Z',
  updatedAt: '2026-07-25T00:00:00.000Z'
};