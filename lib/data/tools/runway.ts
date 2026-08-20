import { Tool } from '../../../types/tool';
import { resolveToolLogo } from '../tool-logos';

export const runwayTool: Tool = {
  id: 'tool-runway',
  name: 'Runway Gen-3',
  slug: 'runway',
  logo: resolveToolLogo('runway'),
  tagline: 'Pioneering text-to-video and image-to-video generative media suite for filmmakers.',
  description: 'Runway Gen-3 Alpha offers high-definition video generation with precise camera movement controls, motion brush painting, and temporal consistency for film production, marketing videos, and visual FX.',
  categoryId: 'cat-video',
  categoryName: 'Video & Motion',
  tags: ['Video Generation', 'Text to Video', 'Motion Control'],
  pricingModel: 'Freemium',
  monthlyPrice: 15,
  hasFreeTrial: true,
  companyName: 'Runway AI, Inc.',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://runwayml.com/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Runway Gen-3 plan pricing and credit details from official pricing page.'
    },
    {
      type: 'features',
      url: 'https://runwayml.com',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed video generation and motion control features from Runway product site.'
    },
    {
      type: 'company',
      url: 'https://runwayml.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified company branding and platform details.'
    }
  ],
  pricingSource: 'https://runwayml.com/pricing',
  featureSource: 'https://runwayml.com',
  platforms: ['Web', 'iOS'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['One-time trial credits', 'Limited resolution export', 'Access to core generation tools']
    },
    {
      name: 'Standard',
      price: 15,
      billingPeriod: 'monthly',
      features: ['Monthly credit allowance', 'Full resolution export', 'Commercial usage rights']
    },
    {
      name: 'Pro',
      price: 35,
      billingPeriod: 'monthly',
      features: ['Expanded monthly credits', 'Priority generation queue', 'Early access to new models']
    },
    {
      name: 'Enterprise',
      price: null,
      billingPeriod: 'custom',
      features: ['Custom contract pricing', 'Dedicated support', 'Advanced security and compliance']
    }
  ],
  websiteUrl: 'https://runwayml.com',
  features: ['Gen-3 Alpha video synthesis', 'Motion brush regional animation', 'Camera control keyframing', 'Text to video & image to video', '4K video upscaling'],
  pros: ['Gen-3 text-to-video and image-to-video per Runway product pages', 'Motion brush and camera control tools'],
  cons: ['Video credit consumption can be rapid', 'High render times during peak server loads'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['/screenshots/runway-1.png'],
  alternatives: ['sora', 'synthesia', 'heygen'],
  targetUsers: ['content-creators', 'marketers'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: false,
  createdAt: '2024-03-15T00:00:00.000Z',
  updatedAt: '2026-08-01T00:00:00.000Z'
};