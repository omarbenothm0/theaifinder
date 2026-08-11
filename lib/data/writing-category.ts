import { Category } from '../../types/tool';
import { WRITER_TOOL_USE_CASES, WRITER_USE_CASES } from './writer-cluster';

const CAT_WRITING = 'cat-writing';

/** Marketing copy tools on the writing category page — Marketers cluster only. */
export const WRITING_MARKETING_TOOL_SLUGS = ['jasper', 'copy-ai'] as const;

/** Author/editor sections derived from existing Writers workflow mappings (no mapping edits). */
export const WRITING_AUTHOR_SECTIONS = WRITER_USE_CASES.map((useCase) => ({
  slug: useCase.slug,
  title: useCase.title,
  toolSlugs: WRITER_TOOL_USE_CASES.filter((m) => m.useCaseSlug === useCase.slug)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((m) => m.toolSlug),
}));

export const WRITING_CATEGORY: Category = {
  id: CAT_WRITING,
  name: 'Writing & Copywriting',
  slug: 'writing',
  iconName: 'PenTool',
  description:
    'Curated directory of AI writing tools for authors, editors, and marketing teams — with separate paths for creative writing and copywriting workflows.',
  longDescription:
    'Explore verified AI writing software for the best ai writing tools intent: drafting, editing, research, long-form manuscripts, and marketing copy. Author and editor workflows are separated from marketing and copywriting tools so you can choose the right hub without overlap.',
  toolCount: 0,
  faqs: [
    {
      question: 'What is the difference between the Writers and Marketers hubs?',
      answer:
        'The Writers hub covers author and editor workflows — drafting, proofreading, writing research, long-form manuscripts, and project organization. The Marketers hub covers SEO, campaigns, ad copy, email automation, and marketing analytics. This category page links to both without mixing their tool lists.',
    },
    {
      question: 'Which AI tools are best for drafting versus proofreading?',
      answer:
        'ChatGPT and Claude are commonly used for first drafts and rewrites. Grammarly is the dedicated proofreading platform in our verified inventory, with Claude and ChatGPT useful for clarity and tone passes. See the Writers hub for fit-tier details on each workflow.',
    },
    {
      question: 'Are Jasper and Copy.ai author tools or marketing tools?',
      answer:
        'Jasper and Copy.ai are marketing-first copy platforms mapped to the Marketers hub — not the Writers hub. Authors and editors should start with ChatGPT, Claude, Grammarly, Perplexity, and Notion AI on the Writers path.',
    },
    {
      question: 'Where should I look for academic or essay writing tools?',
      answer:
        'Student-focused study, homework, and essay workflows live on the Students hub and Study & Education category — not this writing directory. Use /for/students for academic writing intent.',
    },
    {
      question: 'Are there free AI writing assistants in this directory?',
      answer:
        'Several verified tools offer free tiers or trials — including ChatGPT, Claude, Grammarly, and Perplexity — with paid upgrades for higher limits. Check each tool profile for current pricing from official sources.',
    },
  ],
  seoTitle: 'Best AI Writing Tools (2026)',
  seoDescription:
    'Curated directory of verified AI writing tools for authors, editors, and marketers — drafting, editing, research, and copywriting with separate workflow guides.',
};
