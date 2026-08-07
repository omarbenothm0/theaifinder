import { Tool } from '../../../types/tool';

export const cursorTool: Tool = {
  id: 'tool-cursor',
  name: 'Cursor',
  slug: 'cursor',
  logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'AI-first code editor designed for rapid multi-file engineering and intelligent code generation.',
  description: 'Cursor is an AI-powered IDE built on top of VS Code. It combines local codebase indexing with models like Claude 3.5 Sonnet and GPT-4o to offer instant inline edits, multi-file code generation via Composer, and intelligent bug fixing.',
  categoryId: 'cat-coding',
  categoryName: 'Coding & Software Development',
  tags: ['IDE', 'Code Generation', 'Developer Tools', 'Claude Sonnet'],
  pricingModel: 'Freemium',
  monthlyPrice: 20,
  hasFreeTrial: true,
  companyName: 'Anysphere',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://cursor.com/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified pricing tiers and plan names from Cursor official pricing page.'
    },
    {
      type: 'features',
      url: 'https://cursor.com',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed Cursor feature set and Composer workflow from product landing page.'
    },
    {
      type: 'company',
      url: 'https://anysphere.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified company name and platform branding.'
    }
  ],
  pricingSource: 'https://cursor.com/pricing',
  featureSource: 'https://cursor.com',
  platforms: ['Windows', 'macOS', 'Linux'],
  pricingTiers: [
    {
      name: 'Hobby',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Limited agent requests', 'Limited tab completions', 'Access to core editor features']
    },
    {
      name: 'Pro',
      price: 20,
      billingPeriod: 'monthly',
      features: ['Extended agent and tab usage', 'Access to premium models', 'Priority support']
    },
    {
      name: 'Business',
      price: 40,
      billingPeriod: 'monthly',
      features: ['Per-user pricing', 'Centralized team billing', 'Admin dashboard and usage analytics', 'Privacy mode enforced org-wide']
    },
    {
      name: 'Enterprise',
      price: null,
      billingPeriod: 'custom',
      features: ['Custom contract pricing', 'SAML SSO', 'Dedicated support', 'Advanced security and compliance controls']
    }
  ],
  websiteUrl: 'https://cursor.com',
  features: ['Composer multi-file edit mode', 'Full codebase semantic indexing', 'Inline Cmd+K generation', 'AI terminal command execution', '1-click VS Code extensions import'],
  pros: ['Dramatically accelerates frontend and full-stack coding', 'Seamless transition from standard VS Code', 'Composer mode handles complex refactors across files'],
  cons: ['Pro subscription required for high-speed requests', 'Can consume significant local RAM on massive monorepos'],
  rating: 4.8,
  reviewCount: 1950,
  screenshots: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['github-copilot', 'v0', 'claude'],
  targetUsers: ['developers', 'entrepreneurs'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: false,
  hasMobileApp: false,
  hasExtension: true,
  createdAt: '2024-03-01T00:00:00.000Z',
  updatedAt: '2026-08-03T00:00:00.000Z'
};