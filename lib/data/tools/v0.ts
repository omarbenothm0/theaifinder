import { Tool } from '../../../types/tool';
import { resolveToolLogo } from '../tool-logos';

export const v0Tool: Tool = {
  id: 'tool-v0',
  name: 'v0 by Vercel',
  slug: 'v0',
  logo: resolveToolLogo('v0'),
  tagline: 'Generative UI system powered by AI to craft React, Tailwind, and Shadcn components instantly.',
  description: 'v0 by Vercel turns text prompts and image mockups into production-ready React JSX code styled with Tailwind CSS and Radix UI primitives. It allows engineers to visually refine UI elements before copying code into projects.',
  categoryId: 'cat-coding',
  categoryName: 'Coding & Software Development',
  tags: ['Generative UI', 'React', 'Tailwind CSS', 'Vercel'],
  pricingModel: 'Freemium',
  monthlyPrice: 20,
  hasFreeTrial: true,
  companyName: 'Vercel',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://v0.dev/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified v0 plan pricing and credit tiers from official pricing page.'
    },
    {
      type: 'features',
      url: 'https://v0.dev',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed React UI generation and code export features from product site.'
    },
    {
      type: 'company',
      url: 'https://vercel.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified Vercel ownership and branding.'
    }
  ],
  pricingSource: 'https://v0.dev/pricing',
  featureSource: 'https://v0.dev',
  platforms: ['Web'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Limited monthly credits', 'Community model access', 'Public projects only']
    },
    {
      name: 'Premium',
      price: 20,
      billingPeriod: 'monthly',
      features: ['Expanded monthly credits', 'Private projects', 'Priority generation queue']
    },
    {
      name: 'Team',
      price: 30,
      billingPeriod: 'monthly',
      features: ['Per-user pricing', 'Shared team workspace', 'Centralized billing']
    },
    {
      name: 'Enterprise',
      price: null,
      billingPeriod: 'custom',
      features: ['Custom contract pricing', 'SSO and advanced security', 'Dedicated support']
    }
  ],
  websiteUrl: 'https://v0.dev',
  features: ['Instant text-to-React UI', 'Shadcn & Tailwind native output', 'Figma & visual upload support', 'One-click copy or npx CLI import', 'Interactive component editing'],
  pros: ['Generates clean modern React code', 'Integrates smoothly into Vercel stack', 'Fast visual iteration'],
  cons: ['Limited backend API logic generation', 'Credit quota on free tier'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['/screenshots/v0-1.png'],
  alternatives: ['cursor', 'claude', 'github-copilot'],
  targetUsers: ['developers', 'marketers', 'entrepreneurs'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: true,
  hasMobileApp: false,
  hasExtension: false,
  createdAt: '2024-02-15T00:00:00.000Z',
  updatedAt: '2026-08-01T00:00:00.000Z'
};