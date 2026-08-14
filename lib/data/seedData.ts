import { Category, Persona, Comparison, Article } from '../../types/tool';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-writing',
    name: 'Writing & Copywriting',
    slug: 'writing',
    iconName: 'PenTool',
    description: 'AI tools for drafting articles, sales copy, emails, and long-form documents.',
    longDescription: 'Discover the best artificial intelligence writing software for content creators, marketers, copywriters, and authors. Streamline drafting, editing, SEO optimization, and proofreading.',
    toolCount: 14,
    faqs: [
      {
        question: 'Can AI writing tools replace human copywriters?',
        answer: 'AI writing tools serve as force multipliers for brainstorming, outline creation, and drafting, but human strategy and editing remain critical.'
      },
      {
        question: 'Which AI writing tool has the best output quality?',
        answer: 'Claude 3.5 Sonnet and ChatGPT (GPT-4o) consistently rank highest for nuanced prose, tone adaptation, and contextual understanding.'
      }
    ],
    seoTitle: 'Best AI Writing & Copywriting Tools (2026 Directory)',
    seoDescription: 'Explore top-rated AI writing assistants for copywriting, blogging, documentation, and creative storytelling.'
  },
  {
    id: 'cat-coding',
    name: 'Coding & Software Development',
    slug: 'coding',
    iconName: 'Code',
    description: 'AI code assistants, IDE plugins, and automated debugging platforms.',
    longDescription: 'Boost software engineering productivity with AI coding assistants, code completion tools, and multi-file refactoring engines.',
    toolCount: 10,
    faqs: [
      {
        question: 'What is the best AI code assistant in 2026?',
        answer: 'Cursor leads the market for multi-file editing and repository indexing, while v0 by Vercel excels at React component generation.'
      }
    ],
    seoTitle: 'Top AI Coding Tools & Code Assistants (2026)',
    seoDescription: 'Compare the best AI code completion, debugging, and software engineering tools.'
  },
  {
    id: 'cat-image',
    name: 'Image & Design',
    slug: 'image',
    iconName: 'Image',
    description: 'Generative AI image generators, background removers, and graphic design tools.',
    longDescription: 'Create photorealistic visual artwork, marketing banners, vector icons, and UI concepts with cutting-edge diffusion and generative image models.',
    toolCount: 12,
    faqs: [
      {
        question: 'Which AI image generator produces the most realistic photos?',
        answer: 'Midjourney v6.1 and DALL-E 3 produce industry-leading photorealistic art and graphic design.'
      }
    ],
    seoTitle: 'Best Generative AI Image Tools (2026 Directory)',
    seoDescription: 'Find top AI image generators for photorealistic art, marketing graphics, and design workflows.'
  },
  {
    id: 'cat-video',
    name: 'Video & Motion',
    slug: 'video',
    iconName: 'Video',
    description: 'Text-to-video generators, AI video editors, avatar creators, and subtitle tools.',
    longDescription: 'Automate video creation, generate temporal motion clips from text prompts, and produce synthetic AI avatars for video marketing.',
    toolCount: 9,
    faqs: [
      {
        question: 'What is the highest quality text-to-video tool?',
        answer: 'Runway Gen-3 and Descript lead the industry for generative motion physics and text-based video editing.'
      }
    ],
    seoTitle: 'Top AI Video Generators & Editing Software (2026)',
    seoDescription: 'Compare AI video generators, motion brush animation tools, and automated editors.'
  },
  {
    id: 'cat-voice',
    name: 'Voice & Speech',
    slug: 'voice',
    iconName: 'Mic',
    description: 'Text-to-speech synthesis, voice cloning, audio cleanup, and localization.',
    longDescription: 'Synthesize natural voiceovers in dozens of languages, clone speaker audio with emotional cadence, and transcribe podcasts.',
    toolCount: 8,
    faqs: [
      {
        question: 'How realistic are AI voice clones?',
        answer: 'Modern models from ElevenLabs produce audio indistinguishable from human voice talent.'
      }
    ],
    seoTitle: 'Best AI Voice & Speech Generators (2026)',
    seoDescription: 'Discover realistic text-to-speech, voice cloning, and audio dubbing AI tools.'
  },
  {
    id: 'cat-seo',
    name: 'SEO & Web Research',
    slug: 'seo',
    iconName: 'Search',
    description: 'AI search engines, real-time citation research, and keyword optimization.',
    longDescription: 'Conduct rapid web research, pull verified cited sources, and optimize content for search visibility.',
    toolCount: 6,
    faqs: [],
    seoTitle: 'Best AI Search & SEO Research Tools (2026)',
    seoDescription: 'Find cited AI answer engines, web research platforms, and SEO optimization software.'
  },
  {
    id: 'cat-presentations',
    name: 'Presentations & Decks',
    slug: 'presentations',
    iconName: 'Layout',
    description: 'Automated slide deck builders, pitch deck generators, and visual doc tools.',
    longDescription: 'Generate ready-to-present slide decks, pitch presentations, and visual reports from simple outlines or documents.',
    toolCount: 5,
    faqs: [],
    seoTitle: 'Best AI Presentation & Slide Deck Builders (2026)',
    seoDescription: 'Transform text into stunning pitch decks and slides with AI presentation builders.'
  }
];

export const INITIAL_PERSONAS: Persona[] = [
  {
    id: 'per-creators',
    title: 'Content Creators',
    slug: 'content-creators',
    iconName: 'Sparkles',
    subtitle: 'Scale visual, text, and video content production',
    description: 'Curated AI software stack for digital content creators, social media managers, and influencers to draft posts, design visuals, and edit clips.',
    targetRole: 'Content Creator',
    keyBenefits: ['10x faster social copy drafting', 'Instant thumbnail & visual banner generation', 'Automated captioning and video repurposing'],
    topToolSlugs: ['chatgpt', 'midjourney', 'elevenlabs', 'runway', 'suno-ai'],
    faqs: [
      {
        question: 'What AI tools should every content creator use?',
        answer: 'A solid creator stack includes ChatGPT for copy, Midjourney for visuals, ElevenLabs for voiceovers, and Suno AI for custom audio tracks.'
      }
    ]
  },
  {
    id: 'per-writers',
    title: 'Writers & Bloggers',
    slug: 'writers',
    iconName: 'BookOpen',
    subtitle: 'Brainstorm ideas, eliminate writer block, and polish prose',
    description: 'Essential AI writing platforms for authors, journalists, bloggers, and copywriters.',
    targetRole: 'Writer',
    keyBenefits: ['Deep long-form context editing', 'Grammar and tone refinement', 'Cited research search'],
    topToolSlugs: ['claude', 'chatgpt', 'perplexity', 'jasper'],
    faqs: []
  },
  {
    id: 'per-developers',
    title: 'Developers & Engineers',
    slug: 'developers',
    iconName: 'Terminal',
    subtitle: 'Ship code faster with intelligent multi-file AI IDEs',
    description: 'AI code completion, repository indexing, terminal automation, and refactoring suites built for software developers.',
    targetRole: 'Software Engineer',
    keyBenefits: ['Instant inline code autocomplete', 'Multi-file Composer refactoring', 'Automated test suite generation'],
    topToolSlugs: ['cursor', 'v0', 'claude', 'chatgpt'],
    faqs: []
  },
  {
    id: 'per-marketers',
    title: 'Marketers & Growth Leads',
    slug: 'marketers',
    iconName: 'TrendingUp',
    subtitle: 'Optimize ad copy, landing pages, and campaign assets',
    description: 'AI tools to generate marketing copy, analyze customer search intent, and design high-converting visual campaign banners.',
    targetRole: 'Marketer',
    keyBenefits: ['Rapid ad copy variation testing', 'SEO keyword research synthesis', 'High-converting landing page deck creation'],
    topToolSlugs: ['chatgpt', 'perplexity', 'gamma', 'midjourney', 'jasper'],
    faqs: []
  },
  {
    id: 'per-teachers',
    title: 'Teachers & Educators',
    slug: 'teachers',
    iconName: 'GraduationCap',
    subtitle: 'Build lesson plans, quizzes, and slide presentations instantly',
    description: 'AI assistants helping educators, university professors, and online tutors design interactive curriculum materials.',
    targetRole: 'Teacher',
    keyBenefits: ['Automated lesson plan generation', 'Interactive quiz deck creation', 'Plain-language topic explanations'],
    topToolSlugs: ['chatgpt', 'gamma', 'perplexity'],
    faqs: []
  },
  {
    id: 'per-real-estate-agents',
    title: 'Real Estate Agents',
    slug: 'real-estate-agents',
    iconName: 'Home',
    subtitle: 'Craft property descriptions, pitch decks, and virtual visual assets',
    description: 'Specially selected AI tools to speed up listing descriptions, social marketing, and presentation decks for real estate professionals.',
    targetRole: 'Real Estate Agent',
    keyBenefits: ['Instant high-converting listing copy', 'Property presentation pitch decks in minutes', 'Social media promotional graphics'],
    topToolSlugs: ['chatgpt', 'gamma', 'midjourney'],
    faqs: []
  },
  {
    id: 'per-entrepreneurs',
    title: 'Entrepreneurs & Founders',
    slug: 'entrepreneurs',
    iconName: 'Briefcase',
    subtitle: 'Build MVP prototypes, pitch decks, and launch marketing fast',
    description: 'Full-stack AI tools for startup founders to validate ideas, build prototype web apps, and pitch investors.',
    targetRole: 'Founder & Entrepreneur',
    keyBenefits: ['Rapid React UI prototype generation', 'Automated investor pitch deck creation', 'Competitive research synthesis'],
    topToolSlugs: ['cursor', 'v0', 'gamma', 'perplexity', 'notion-ai'],
    faqs: []
  }
];

export const INITIAL_COMPARISONS: Comparison[] = [
  {
    id: 'comp-chatgpt-vs-claude',
    slug: 'chatgpt-vs-claude',
    tool1Slug: 'chatgpt',
    tool2Slug: 'claude',
    title: 'ChatGPT vs Claude: Complete Head-to-Head Comparison (2026)',
    overview: 'Comparing OpenAI ChatGPT and Anthropic Claude across writing prose, coding capability, multi-modal features, and pricing.',
    bestFor1: 'General multi-modal tasks, custom GPTs, voice mode, and Python data analysis.',
    bestFor2: 'Nuanced prose writing, large document analysis, and Artifacts live UI rendering.',
    verdict: 'Choose ChatGPT for its versatile feature ecosystem (voice mode, web search, custom GPTs). Choose Claude if you prioritize exceptional writing quality, 200k document context, and live code Artifacts.',
    winnerSlug: 'tie',
    featureBreakdown: [
      { feature: 'Top Model', tool1Value: 'GPT-4o & o1 reasoning', tool2Value: 'Claude 3.5 Sonnet', winnerSlug: 'tie' },
      { feature: 'Context Window', tool1Value: '128K tokens', tool2Value: '200K tokens', winnerSlug: 'claude' },
      { feature: 'Live Code Artifacts', tool1Value: 'No (Code Interpreter output)', tool2Value: 'Yes (Live preview canvas)', winnerSlug: 'claude' },
      { feature: 'Voice Mode', tool1Value: 'Yes (Advanced Voice)', tool2Value: 'No', winnerSlug: 'chatgpt' },
      { feature: 'Pricing', tool1Value: 'Free tier / $20/mo Plus', tool2Value: 'Free tier / $20/mo Pro', winnerSlug: 'tie' }
    ]
  },
  {
    id: 'comp-cursor-vs-chatgpt',
    slug: 'cursor-vs-chatgpt',
    tool1Slug: 'cursor',
    tool2Slug: 'chatgpt',
    title: 'Cursor vs ChatGPT for Coding: Which AI Tool Should Engineers Use?',
    overview: 'Evaluating Cursor (AI IDE) against ChatGPT for software development workflows.',
    bestFor1: 'Full-stack software engineering directly inside your codebase files.',
    bestFor2: 'Learning concepts, architecture design, and general assistance.',
    verdict: 'Cursor fits active in-repo coding with Composer multi-file edits. ChatGPT works well for quick algorithmic scratchpad queries and general assistance.',
    winnerSlug: 'cursor',
    featureBreakdown: [
      { feature: 'Codebase Indexing', tool1Value: 'Full local repository semantic index', tool2Value: 'Paste snippet only', winnerSlug: 'cursor' },
      { feature: 'Multi-file Edits', tool1Value: 'Automated via Composer', tool2Value: 'Manual file copy-paste', winnerSlug: 'cursor' },
      { feature: 'Pricing', tool1Value: 'Free tier / $20/mo Pro', tool2Value: 'Free tier / $20/mo Plus', winnerSlug: 'tie' }
    ]
  },
  {
    id: 'comp-midjourney-vs-dall-e-3',
    slug: 'midjourney-vs-dall-e-3',
    tool1Slug: 'midjourney',
    tool2Slug: 'dall-e-3',
    title: 'Midjourney vs DALL-E 3: Which AI Image Generator is Best?',
    overview: 'Comparing Midjourney v6.1 and DALL-E 3 for photorealism, artistic styling, prompt adherence, and ease of use.',
    bestFor1: 'Hyper-realistic textures, cinematic lighting, and fine art synthesis.',
    bestFor2: 'Fulfilling intricate multi-element text prompts and rendering crisp English text.',
    verdict: 'Midjourney emphasizes stylized aesthetics and artistic depth in its v6.x output. DALL-E 3 follows intricate prompt instructions more accurately inside natural conversation.',
    winnerSlug: 'midjourney',
    featureBreakdown: [
      { feature: 'Photorealism Quality', tool1Value: 'Strong stylized and photorealistic output', tool2Value: 'Good, slightly stylized', winnerSlug: 'midjourney' },
      { feature: 'Text Rendering in Images', tool1Value: 'Moderate adherence', tool2Value: 'High precision readable text', winnerSlug: 'dall-e-3' },
      { feature: 'Interface', tool1Value: 'Web app & Discord', tool2Value: 'ChatGPT conversation', winnerSlug: 'dall-e-3' }
    ]
  }
];

export const INITIAL_ARTICLES: Article[] = [];