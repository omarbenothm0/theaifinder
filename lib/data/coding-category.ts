import { Category } from '../../types/tool';

const CAT_CODING = 'cat-coding';

/** Agentic coding tools — IDE and multi-surface agents. */
export const CODING_AGENTIC_TOOL_SLUGS = ['cursor', 'claude-code'] as const;

/** Generative UI tools in the coding category. */
export const CODING_UI_TOOL_SLUGS = ['v0'] as const;

export const CODING_SECTIONS = [
  {
    slug: 'agentic-coding',
    title: 'Agentic Coding Assistants',
    description:
      'Tools that read your repository, edit multiple files, run commands, and automate git workflows. Cursor is a full AI-native IDE; Claude Code is Anthropic’s agent across terminal, IDE extensions, desktop, web, and CI.',
    toolSlugs: [...CODING_AGENTIC_TOOL_SLUGS],
  },
  {
    slug: 'ui-generation',
    title: 'Generative UI & React Components',
    description:
      'Turn prompts and mockups into React, Tailwind, and Shadcn UI code — useful for front-end iteration before wiring logic in your main codebase.',
    toolSlugs: [...CODING_UI_TOOL_SLUGS],
  },
] as const;

export const CODING_CATEGORY: Category = {
  id: CAT_CODING,
  name: 'Coding & Software Development',
  slug: 'coding',
  iconName: 'Code',
  description:
    'Verified AI coding assistants for agentic development, IDE workflows, and generative UI — curated from official product sources.',
  longDescription:
    'Explore our verified inventory of AI coding tools for the best ai coding tools intent: agentic assistants that work inside your repository, and generative UI builders for React components. Each listing links to official pricing and capability sources — no inflated review counts.',
  toolCount: 0,
  faqs: [
    {
      question: 'What is the difference between Cursor and Claude Code?',
      answer:
        'Cursor is an AI-native IDE forked from VS Code with Cursor Agent, Composer, and team billing. Claude Code is Anthropic’s agentic coding product for terminal, IDE extensions (including an official Cursor extension), desktop, web, and CI. The choice is often whether to standardize on Cursor’s native IDE stack or Anthropic’s multi-surface agent — see /compare/claude-code-vs-cursor for a detailed breakdown.',
    },
    {
      question: 'Is Claude Code the same as Claude chat?',
      answer:
        'No. The consumer Claude assistant lives at /tools/claude. Claude Code (/tools/claude-code) is a separate agentic coding product with repository editing, terminal use, and CI integrations documented on Anthropic’s Claude Code overview.',
    },
    {
      question: 'What is v0 by Vercel used for?',
      answer:
        'v0 generates React UI from text prompts and visual inputs, exporting Tailwind- and Shadcn-style components. It fits front-end prototyping and component iteration rather than whole-repository agentic refactors handled by Cursor or Claude Code.',
    },
    {
      question: 'Do these tools offer free tiers?',
      answer:
        'Cursor lists a free Hobby tier and v0 offers a free credit tier on official pricing pages. Claude Code is included with paid Claude Pro and Max plans per Anthropic documentation — not a standalone free coding product.',
    },
    {
      question: 'Why are only three tools listed here?',
      answer:
        'This category shows verified tools currently in our coding inventory — Cursor, Claude Code, and v0. We add tools only after official-source verification; we do not list unverified products to pad category size.',
    },
  ],
  seoTitle: 'Best AI Coding Tools (2026)',
  seoDescription:
    'Verified AI coding tools — Cursor, Claude Code, and v0 — with agentic IDE workflows, generative UI, and an official-sources comparison guide.',
};
