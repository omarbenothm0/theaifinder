import { Tool } from '../../../types/tool';
import { resolveToolLogo } from '../tool-logos';

const VERIFIED_DATE = '2026-08-12';

export const cursorTool: Tool = {
  id: 'tool-cursor',
  name: 'Cursor',
  slug: 'cursor',
  logo: resolveToolLogo('cursor'),
  tagline:
    'AI-native code editor forked from VS Code with agents, Composer, MCP, and team controls.',
  description:
    'Cursor is an AI-powered IDE from Anysphere built on VS Code. Official pricing cites Agent requests, Composer, frontier models, MCPs, skills, hooks, cloud agents, and Bugbot. Plans include a free Hobby tier, Individual paid tiers (Pro and higher usage tiers), Teams, and Enterprise with usage-based model billing on paid plans.',
  categoryId: 'cat-coding',
  categoryName: 'Coding & Software Development',
  tags: ['IDE', 'AI Agent', 'Code Generation', 'Developer Tools', 'MCP'],
  pricingModel: 'Freemium',
  monthlyPrice: 20,
  hasFreeTrial: true,
  companyName: 'Anysphere',
  lastVerifiedDate: VERIFIED_DATE,
  verifiedBy: 'AI Find Research (official sources)',
  reviewState: 'verified',
  sources: [
    {
      type: 'pricing',
      url: 'https://cursor.com/pricing',
      verifiedAt: VERIFIED_DATE,
      notes:
        'Verified Hobby, Individual (Pro/Pro+/Ultra), Teams, and Enterprise tiers; usage-based pricing described on official page.',
    },
    {
      type: 'features',
      url: 'https://cursor.com',
      verifiedAt: VERIFIED_DATE,
      notes: 'Verified AI IDE positioning and agent/composer workflow from product site.',
    },
    {
      type: 'company',
      url: 'https://anysphere.com',
      verifiedAt: VERIFIED_DATE,
      notes: 'Verified company name Anysphere.',
    },
  ],
  pricingSource: 'https://cursor.com/pricing',
  featureSource: 'https://cursor.com',
  platforms: ['Windows', 'macOS', 'Linux'],
  pricingTiers: [
    {
      name: 'Hobby',
      price: 0,
      billingPeriod: 'monthly',
      features: [
        'No credit card required per official pricing',
        'Limited Agent requests',
        'Access to Composer',
      ],
    },
    {
      name: 'Individual Pro',
      price: 20,
      billingPeriod: 'monthly',
      features: [
        'Extended Agent limits',
        'Frontier models, MCPs, skills, and hooks',
        'Cloud agents',
        'Bugbot on usage-based billing',
      ],
    },
    {
      name: 'Teams',
      price: 40,
      billingPeriod: 'monthly',
      features: [
        'Per-user team billing and admin',
        'Team marketplace for rules, skills, and plugins',
        'Agentic code reviews with Bugbot',
        'Team-wide privacy mode and SAML/OIDC SSO',
      ],
    },
    {
      name: 'Enterprise',
      price: null,
      billingPeriod: 'custom',
      features: [
        'Pooled usage, invoice/PO billing, SCIM',
        'Repository, model, and MCP access controls',
        'Audit logs and priority support per official pricing',
      ],
    },
  ],
  websiteUrl: 'https://cursor.com',
  features: [
    'AI Agent and Composer multi-file editing inside a VS Code–based IDE',
    'Tab completions and inline edits with codebase context',
    'MCPs, skills, hooks, and cloud agents per official pricing',
    'Bugbot agentic code review (usage-based on paid plans)',
    'VS Code extension import and familiar editor workflow',
    'Team admin, privacy mode, and enterprise access controls',
  ],
  pros: [
    'Unified AI-native IDE — agents, Composer, and editor in one product',
    'Free Hobby tier with no credit card per official pricing',
    'Strong team and enterprise controls on Teams and Enterprise plans',
  ],
  cons: [
    'Paid Individual tiers required for extended agent and model usage',
    'Usage-based model billing beyond included plan limits per official docs',
    'Separate Claude subscription needed if you also want Anthropic Claude Code outside Cursor’s stack',
  ],
  rating: 0,
  reviewCount: 0,
  screenshots: [],
  alternatives: ['claude-code', 'v0', 'claude'],
  targetUsers: ['developers', 'entrepreneurs'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: false,
  hasMobileApp: false,
  hasExtension: true,
  createdAt: '2024-03-01T00:00:00.000Z',
  updatedAt: `${VERIFIED_DATE}T00:00:00.000Z`,
};
