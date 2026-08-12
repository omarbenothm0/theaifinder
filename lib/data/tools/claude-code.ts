import { Tool } from '../../../types/tool';
import { resolveToolLogo } from '../tool-logos';

const VERIFIED_DATE = '2026-08-12';

/** Distinct from `/tools/claude` (consumer chat). Agentic coding product from Anthropic. */
export const claudeCodeTool: Tool = {
  id: 'tool-claude-code',
  name: 'Claude Code',
  slug: 'claude-code',
  logo: resolveToolLogo('claude-code'),
  tagline:
    'Anthropic agentic coding assistant for terminal, IDE extensions, desktop, web, and CI workflows.',
  description:
    'Claude Code is Anthropic’s agentic coding tool that reads your codebase, edits files, runs commands, and integrates with development tools. It runs in the terminal, VS Code and Cursor extensions, JetBrains IDEs, a desktop app, the web at claude.ai/code, and CI via GitHub Actions or GitLab. Requires a Claude subscription or Anthropic Console access per official documentation.',
  categoryId: 'cat-coding',
  categoryName: 'Coding & Software Development',
  tags: ['Agentic Coding', 'CLI', 'IDE Extension', 'Developer Tools', 'Anthropic'],
  pricingModel: 'Freemium',
  monthlyPrice: 20,
  hasFreeTrial: false,
  companyName: 'Anthropic',
  lastVerifiedDate: VERIFIED_DATE,
  verifiedBy: 'AI Find Research (official sources)',
  reviewState: 'verified',
  sources: [
    {
      type: 'documentation',
      url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
      verifiedAt: VERIFIED_DATE,
      notes:
        'Verified surfaces (terminal, VS Code/Cursor/JetBrains, desktop, web, CI), capabilities, and subscription requirements.',
    },
    {
      type: 'pricing',
      url: 'https://code.claude.com/pricing',
      verifiedAt: VERIFIED_DATE,
      notes: 'Verified Claude Code included in Claude Pro and Max plans; usage limits apply.',
    },
    {
      type: 'website',
      url: 'https://code.claude.com',
      verifiedAt: VERIFIED_DATE,
      notes: 'Verified product landing page.',
    },
    {
      type: 'company',
      url: 'https://www.anthropic.com',
      verifiedAt: VERIFIED_DATE,
      notes: 'Verified company branding.',
    },
  ],
  pricingSource: 'https://code.claude.com/pricing',
  featureSource: 'https://docs.anthropic.com/en/docs/claude-code/overview',
  platforms: ['Windows', 'macOS', 'Linux', 'Web', 'iOS', 'Android'],
  pricingTiers: [
    {
      name: 'Pro (includes Claude Code)',
      price: 20,
      billingPeriod: 'monthly',
      features: [
        'Claude Code included per official pricing page',
        '$17/mo with annual billing ($200 billed upfront) cited on pricing page',
        'Usage limits apply',
      ],
    },
    {
      name: 'Max 5x (includes Claude Code)',
      price: 100,
      billingPeriod: 'monthly',
      features: ['Higher Claude Code usage limits per official Max 5x plan'],
    },
    {
      name: 'Max 20x (includes Claude Code)',
      price: 200,
      billingPeriod: 'monthly',
      features: ['Highest Claude Code usage limits per official Max 20x plan'],
    },
    {
      name: 'Anthropic Console',
      price: null,
      billingPeriod: 'custom',
      features: ['API-based access path cited in official Claude Code docs'],
    },
  ],
  websiteUrl: 'https://code.claude.com',
  features: [
    'Terminal CLI with codebase-aware edits and command execution',
    'VS Code and Cursor extensions (official Anthropic extension)',
    'JetBrains, desktop app, and claude.ai/code web surfaces',
    'Git staging, commits, branches, and pull requests from agent workflows',
    'MCP integrations, CLAUDE.md project instructions, hooks, and subagents',
    'GitHub Actions and GitLab CI/CD integrations per official docs',
  ],
  pros: [
    'Same agentic engine across terminal, IDE extension, desktop, web, and CI',
    'Deep git and PR automation workflows from official documentation',
    'MCP, hooks, and subagents for customizable agentic pipelines',
  ],
  cons: [
    'Requires Claude subscription or Console access — not a standalone free coding tier',
    'Usage limits apply on consumer plans per official pricing',
    'Some surface handoffs (e.g. desktop teleport) require claude.ai subscription per docs',
  ],
  rating: 0,
  reviewCount: 0,
  screenshots: [],
  alternatives: ['cursor', 'claude'],
  targetUsers: ['developers'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: true,
  createdAt: `${VERIFIED_DATE}T00:00:00.000Z`,
  updatedAt: `${VERIFIED_DATE}T00:00:00.000Z`,
};
