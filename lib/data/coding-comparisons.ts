import { Comparison } from '../../types/tool';

/** Curated coding-cluster head-to-head comparisons (verified tool pairs from research). */
export const CODING_COMPARISONS: Comparison[] = [
  {
    id: 'comp-claude-code-vs-cursor',
    slug: 'claude-code-vs-cursor',
    tool1Slug: 'claude-code',
    tool2Slug: 'cursor',
    title: 'Claude Code vs Cursor: Agentic Coding Compared (2026)',
    overview:
      'Comparing Anthropic Claude Code and Cursor for agentic software development. This is not a simple CLI-versus-IDE choice — Claude Code ships an official Cursor extension, so the decision is whether to standardize on Claude’s agentic coding stack (terminal, extension, desktop, web, CI) or Cursor’s native AI IDE with its own Agent, Composer, and model routing.',
    bestFor1:
      'Teams standardizing on Anthropic’s agent across terminal, CI, Slack, and IDE surfaces — especially git/PR automation, MCP-heavy workflows, and headless `claude -p` pipelines.',
    bestFor2:
      'Developers who want a single AI-native VS Code–forked IDE with Cursor Agent, Composer, MCP/skills/hooks, and team billing without managing a separate Anthropic coding subscription stack.',
    verdict:
      'No universal winner. Choose Claude Code if you need the same Anthropic agent in terminal, CI, and multiple surfaces with deep git automation. Choose Cursor if your daily workflow lives in one AI IDE with Cursor’s agent stack and team controls. Many teams can run both — Claude Code inside Cursor for Anthropic workflows plus Cursor Agent for IDE-native features — but that means two billing relationships and overlapping capabilities.',
    winnerSlug: 'tie',
    featureBreakdown: [
      {
        feature: 'Core workflow model',
        tool1Value:
          'Agentic coding tool — terminal-first with shared engine across IDE extensions, desktop, web, and CI (official docs)',
        tool2Value:
          'AI-native IDE forked from VS Code — Agent, Composer, and editor unified in Cursor (official site)',
        winnerSlug: 'tie',
      },
      {
        feature: 'Inside Cursor IDE',
        tool1Value:
          'Official Anthropic VS Code/Cursor extension — Claude Code runs inside Cursor (official overview docs)',
        tool2Value:
          'Native Cursor Agent + Composer — built into the IDE without requiring Claude Code',
        winnerSlug: 'tie',
      },
      {
        feature: 'Multi-surface / headless use',
        tool1Value:
          'Terminal CLI, desktop app, claude.ai/code, mobile, Slack, GitHub Actions / GitLab CI (official docs)',
        tool2Value: 'Desktop IDE primary; cloud agents cited on official pricing — no equivalent CLI/CI agent surface',
        winnerSlug: 'claude-code',
      },
      {
        feature: 'Git & PR automation',
        tool1Value:
          'Official docs: stage, commit, branch, open PRs, plus GitHub Actions / GitLab CI integrations',
        tool2Value: 'Agentic edits in-repo; git workflows depend on IDE agent — no first-party CI agent product cited',
        winnerSlug: 'claude-code',
      },
      {
        feature: 'Pricing & access',
        tool1Value:
          'Included with Claude Pro (~$20/mo) and Max plans; usage limits apply (code.claude.com/pricing)',
        tool2Value:
          'Free Hobby tier; Individual Pro $20/mo; usage-based model billing beyond included limits (cursor.com/pricing)',
        winnerSlug: 'tie',
      },
      {
        feature: 'Extensibility',
        tool1Value: 'MCP, CLAUDE.md, hooks, subagents, Agent SDK, routines (official docs)',
        tool2Value: 'MCPs, skills, hooks, cloud agents, team marketplace (official pricing)',
        winnerSlug: 'tie',
      },
      {
        feature: 'Team / enterprise controls',
        tool1Value: 'Team & Enterprise tabs on Claude Code pricing; Console API path for orgs',
        tool2Value: 'Teams ($40/user/mo) and Enterprise with SSO, SCIM, audit logs (official pricing)',
        winnerSlug: 'tie',
      },
    ],
  },
];
