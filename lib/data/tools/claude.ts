import { Tool } from '../../../types/tool';
import { resolveToolLogo } from '../tool-logos';

export const claudeTool: Tool = {
  id: 'tool-claude',
  name: 'Claude',
  slug: 'claude',
  logo: resolveToolLogo('claude'),
  tagline: 'Next-generation AI assistant built for nuanced writing, complex code analysis, and large context windows.',
  description: 'Claude by Anthropic is built around safety and deep context comprehension. Powered by Claude 3.5 Sonnet and Haiku, it excels at nuanced prose generation, large-scale document editing, code architecture analysis, and interactive Artifact rendering.',
  categoryId: 'cat-writing',
  categoryName: 'Writing & Copywriting',
  tags: ['AI Assistant', 'Artifacts', 'Writing', 'Code Analysis'],
  pricingModel: 'Freemium',
  monthlyPrice: 20,
  hasFreeTrial: true,
  companyName: 'Anthropic',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://claude.ai/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Anthropic pricing tiers and Free/Pro/Team details from official pricing page.'
    },
    {
      type: 'features',
      url: 'https://claude.ai',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed core feature set, context window, Artifacts, and vision capabilities from product site.'
    },
    {
      type: 'company',
      url: 'https://www.anthropic.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified company information and platform branding.'
    }
  ],
  pricingSource: 'https://claude.ai/pricing',
  featureSource: 'https://claude.ai',
  platforms: ['Web', 'iOS', 'Android', 'Windows', 'macOS'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Access to Claude with usage limits', 'Standard response speed', 'Access to core Claude models']
    },
    {
      name: 'Pro',
      price: 20,
      billingPeriod: 'monthly',
      features: ['Expanded usage limits', 'Access to Projects and Artifacts', 'Priority access during high traffic', 'Extended context window']
    },
    {
      name: 'Team',
      price: 30,
      billingPeriod: 'monthly',
      features: ['Per-user pricing, minimum seats required', 'Higher usage limits than Pro', 'Shared workspaces and collaboration', 'Central billing and admin controls']
    },
    {
      name: 'Enterprise',
      price: null,
      billingPeriod: 'custom',
      features: ['Custom contract pricing', 'Expanded context window', 'Advanced admin & security controls', 'SSO and audit logs', 'Dedicated support']
    }
  ],
  websiteUrl: 'https://claude.ai',
  features: ['200K token context window', 'Artifacts live preview canvas', 'Claude 3.5 Sonnet architecture', 'Project workspace folders', 'Vision and document upload'],
  pros: ['Exceptionally natural human prose', 'Artifacts UI renders code & SVG live', 'High accuracy on technical documentation'],
  cons: ['Hourly message volume caps on Pro', 'No built-in web search grounding on default UI'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['/screenshots/claude1.png'],
  alternatives: ['chatgpt', 'gemini', 'cursor'],
  targetUsers: ['writers', 'developers', 'content-creators', 'teachers'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: false,
  createdAt: '2024-02-10T00:00:00.000Z',
  updatedAt: '2026-08-02T00:00:00.000Z'
};