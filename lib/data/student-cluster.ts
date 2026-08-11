import { Category, Persona, Tool } from '../../types/tool';
import { UseCaseFitTier } from './pm-cluster';

export interface StudentUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface StudentPersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface StudentToolUseCaseSeed {
  toolSlug: string;
  useCaseSlug: string;
  fitTier: UseCaseFitTier;
  capabilities: string;
  limitation?: string;
  evidenceUrl: string;
  displayOrder: number;
  section?: string;
}

const VERIFIED_DATE = '2026-08-11';
const CAT_STUDY = 'cat-study-education';
const CAT_WRITING = 'cat-writing';
const CAT_PRESENTATIONS = 'cat-presentations';

function favicon(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

type StudentToolInput = Partial<Tool> &
  Pick<
    Tool,
    | 'name'
    | 'slug'
    | 'logo'
    | 'tagline'
    | 'description'
    | 'tags'
    | 'pricingModel'
    | 'hasFreeTrial'
    | 'websiteUrl'
    | 'features'
    | 'pros'
    | 'cons'
    | 'targetUsers'
  >;

function studentTool(partial: StudentToolInput): Tool {
  return {
    id: partial.id ?? `tool-${partial.slug}`,
    categoryId: partial.categoryId ?? CAT_STUDY,
    categoryName: partial.categoryName ?? 'Study & Education',
    rating: 0,
    reviewCount: 0,
    verified: true,
    featured: false,
    trending: false,
    hasApi: partial.hasApi ?? false,
    hasMobileApp: partial.hasMobileApp ?? false,
    hasExtension: partial.hasExtension ?? false,
    alternatives: [],
    screenshots: [],
    createdAt: `${VERIFIED_DATE}T00:00:00.000Z`,
    updatedAt: `${VERIFIED_DATE}T00:00:00.000Z`,
    lastVerifiedDate: VERIFIED_DATE,
    verifiedBy: 'AI Find Research (official sources)',
    reviewState: 'verified',
    ...partial,
  };
}

export const STUDENT_CATEGORY: Category = {
  id: CAT_STUDY,
  name: 'Study & Education',
  slug: 'study-education',
  iconName: 'GraduationCap',
  description: 'AI tools for studying, flashcards, homework, research, and lecture capture.',
  longDescription:
    'Discover AI study tools verified for students — flashcards, homework help, academic research, writing assistance, and lecture notes from official product sources.',
  toolCount: 0,
  faqs: [],
  seoTitle: 'Best AI Study Tools for Students (2026 Directory)',
  seoDescription:
    'Compare verified AI study tools — flashcards, homework helpers, research assistants, and lecture notetakers for students.',
};

export const STUDENT_PERSONA: Persona = {
  id: 'per-students',
  title: 'Students',
  slug: 'students',
  iconName: 'GraduationCap',
  subtitle: 'Study, homework, flashcards, research, writing, and lecture notes',
  description:
    'Verified AI tools for K–12, undergraduate, and graduate students — study guides, homework problem-solving, flashcards, academic research, writing assistance, and lecture capture. Curated from official product sources.',
  targetRole: 'Student',
  keyBenefits: [
    'Turn course materials into study guides and flashcards',
    'Get step-by-step help with math and computational homework',
    'Search peer-reviewed papers with citation-backed answers',
    'Capture and summarize lectures into searchable notes',
  ],
  topToolSlugs: ['notebooklm', 'quizlet', 'remnote', 'consensus', 'grammarly', 'otter-ai'],
  faqs: [
    {
      question: 'What AI tools do students use most?',
      answer:
        'Common verified categories include AI study assistants (NotebookLM, RemNote, Quizlet), homework engines (Wolfram Alpha), research tools (Consensus, Elicit, Scite.ai), writing assistants (Grammarly), and lecture notetakers (Otter.ai, NoteGPT).',
    },
    {
      question: 'Are these tools verified for academic use?',
      answer:
        'Every tool on this hub is mapped to a student workflow with capabilities and limitations cited from official product pages. Check your institution’s AI policy before submitting AI-assisted work.',
    },
  ],
};

export const STUDENT_USE_CASES: StudentUseCaseSeed[] = [
  {
    slug: 'ai-study-tools',
    title: 'AI Study Tools',
    description:
      'Study guides, practice modes, and AI-assisted learning from your own course materials and notes.',
    primaryKeyword: 'ai study tools',
    seoTitle: 'Best AI Study Tools for Students (2026)',
    seoDescription:
      'Verified AI study tools — study guides, practice sets, and learning assistants from official sources.',
  },
  {
    slug: 'homework-problem-solving',
    title: 'Homework & Problem Solving',
    description:
      'Step-by-step computational and mathematical problem solving for STEM coursework.',
    primaryKeyword: 'ai homework helper',
    seoTitle: 'Best AI Homework Helpers for Students (2026)',
    seoDescription:
      'Verified AI homework and problem-solving tools for math and computational coursework.',
  },
  {
    slug: 'flashcards-quizzes',
    title: 'Flashcards & Quizzes',
    description:
      'Generate flashcards, practice quizzes, and spaced-repetition study sets for exam prep.',
    primaryKeyword: 'ai flashcard maker',
    seoTitle: 'Best AI Flashcard & Quiz Tools for Students (2026)',
    seoDescription:
      'Verified AI flashcard makers and quiz generators for exam preparation.',
  },
  {
    slug: 'research-academic-tools',
    title: 'Research & Academic Tools',
    description:
      'Search peer-reviewed literature, extract paper insights, and evaluate citation support or contrast.',
    primaryKeyword: 'ai tools for academic research',
    seoTitle: 'Best AI Research Tools for Students (2026)',
    seoDescription:
      'Verified academic AI search and literature review tools with citation-backed evidence.',
  },
  {
    slug: 'writing-assignments',
    title: 'Writing & Assignments',
    description:
      'Grammar, clarity, tone, and presentation support for essays, reports, and assignments.',
    primaryKeyword: 'ai tools for academic writing',
    seoTitle: 'Best AI Writing Tools for Students (2026)',
    seoDescription:
      'Verified AI writing and assignment tools — grammar, clarity, and presentation support.',
  },
  {
    slug: 'lecture-notes',
    title: 'Lecture Notes',
    description:
      'Transcribe, summarize, and organize lectures, videos, PDFs, and audio into searchable notes.',
    primaryKeyword: 'ai lecture notes',
    seoTitle: 'Best AI Lecture Notes Tools for Students (2026)',
    seoDescription:
      'Verified AI lecture capture and note-taking tools for students.',
  },
];

export const STUDENT_PERSONA_USE_CASES: StudentPersonaUseCaseSeed[] = [
  {
    useCaseSlug: 'ai-study-tools',
    order: 1,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — verified study tools on this page.',
  },
  {
    useCaseSlug: 'homework-problem-solving',
    order: 2,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — homework and problem-solving tools on this page.',
  },
  {
    useCaseSlug: 'flashcards-quizzes',
    order: 3,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — flashcard and quiz tools on this page.',
  },
  {
    useCaseSlug: 'research-academic-tools',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — academic research tools on this page.',
  },
  {
    useCaseSlug: 'writing-assignments',
    order: 5,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — writing and assignment tools on this page.',
  },
  {
    useCaseSlug: 'lecture-notes',
    order: 6,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — lecture note tools on this page.',
  },
];

export const STUDENT_TOOLS: Tool[] = [
  studentTool({
    name: 'NotebookLM',
    slug: 'notebooklm',
    logo: favicon('notebooklm.google.com'),
    tagline: 'Google AI research assistant — study guides, flashcards, quizzes, and Audio Overviews from your sources.',
    description:
      'NotebookLM analyzes uploaded documents, PDFs, and URLs to generate study guides, flashcards, quizzes, and Audio Overviews with grounded citations. Verified from notebooklm.google.com official pages.',
    tags: ['Study Guides', 'Flashcards', 'Research', 'Audio Overviews'],
    pricingModel: 'Freemium',
    monthlyPrice: 0,
    hasFreeTrial: false,
    companyName: 'Google',
    websiteUrl: 'https://notebooklm.google.com',
    featureSource: 'https://notebooklm.google.com',
    pricingSource: 'https://notebooklm.google.com',
    sources: [{ type: 'features', url: 'https://notebooklm.google.com', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Study guide generation', 'Flashcards & quizzes', 'Audio Overviews', 'Grounded citations'],
    pros: ['Answers restricted to uploaded sources', 'Free tier with source caps'],
    cons: ['No general web generation unless enabled', '50 sources/notebook cap on free tier cited on official site'],
    alternatives: ['remnote', 'quizlet'],
    targetUsers: ['students', 'teachers', 'researchers'],
  }),
  studentTool({
    name: 'RemNote',
    slug: 'remnote',
    logo: favicon('remnote.com'),
    tagline: 'All-in-one notes, PDF annotation, flashcards, and spaced-repetition scheduling.',
    description:
      'RemNote combines hierarchical notes, PDF annotation, flashcard generation, and spaced-repetition scheduling in one workspace. Verified from remnote.com official product and pricing pages.',
    tags: ['Notes', 'Flashcards', 'Spaced Repetition', 'PDF Annotation'],
    pricingModel: 'Freemium',
    monthlyPrice: 8,
    hasFreeTrial: true,
    companyName: 'RemNote',
    websiteUrl: 'https://www.remnote.com',
    featureSource: 'https://www.remnote.com',
    pricingSource: 'https://www.remnote.com/pricing',
    sources: [{ type: 'features', url: 'https://www.remnote.com', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Desktop', 'Mobile'],
    hasMobileApp: true,
    features: ['Hierarchical notes', 'PDF annotation', 'Flashcard generation', 'Spaced repetition'],
    pros: ['Strong notes + flashcards in one tool'],
    cons: ['Steep learning curve cited on official pricing', 'AI features consume credits on lower tiers'],
    alternatives: ['notebooklm', 'quizlet', 'anki'],
    targetUsers: ['students', 'researchers'],
  }),
  studentTool({
    name: 'Quizlet',
    slug: 'quizlet',
    logo: favicon('quizlet.com'),
    tagline: 'Flashcards, practice tests, Magic Notes, and Q-Chat AI tutor for study sets.',
    description:
      'Quizlet offers flashcards, practice tests, gamified study sets, Magic Notes (notes to flashcards), and Q-Chat AI tutor. Verified from quizlet.com official product and pricing pages.',
    tags: ['Flashcards', 'Practice Tests', 'Study Sets', 'AI Tutor'],
    pricingModel: 'Freemium',
    monthlyPrice: 7.99,
    hasFreeTrial: true,
    companyName: 'Quizlet',
    websiteUrl: 'https://quizlet.com',
    featureSource: 'https://quizlet.com',
    pricingSource: 'https://quizlet.com/upgrade',
    sources: [{ type: 'features', url: 'https://quizlet.com', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'iOS', 'Android'],
    hasMobileApp: true,
    features: ['Flashcards', 'Practice tests', 'Magic Notes', 'Q-Chat AI tutor'],
    pros: ['Large study-set ecosystem'],
    cons: ['Advanced AI and unlimited study modes paywalled on Plus tier'],
    alternatives: ['anki', 'remnote', 'monic-ai'],
    targetUsers: ['students', 'teachers'],
  }),
  studentTool({
    name: 'Anki',
    slug: 'anki',
    logo: favicon('apps.ankiweb.net'),
    tagline: 'Open-source flashcards with SM-2/FSRS spaced-repetition scheduling.',
    description:
      'Anki is an open-source flashcard application using SM-2/FSRS spaced-repetition algorithms. Desktop, AnkiDroid, and web clients are free; AnkiMobile is a one-time iOS purchase. Verified from apps.ankiweb.net.',
    tags: ['Flashcards', 'Spaced Repetition', 'Open Source'],
    pricingModel: 'Free',
    monthlyPrice: 0,
    hasFreeTrial: false,
    companyName: 'Anki',
    websiteUrl: 'https://apps.ankiweb.net',
    featureSource: 'https://apps.ankiweb.net',
    pricingSource: 'https://apps.ankiweb.net',
    sources: [{ type: 'features', url: 'https://apps.ankiweb.net', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Desktop', 'Web', 'Android', 'iOS'],
    hasMobileApp: true,
    features: ['SM-2/FSRS scheduling', 'Community add-ons', 'Cross-platform sync'],
    pros: ['Free on desktop, AnkiDroid, and web'],
    cons: ['No native generative AI — requires community plugins', 'AnkiMobile iOS one-time purchase'],
    alternatives: ['quizlet', 'remnote'],
    targetUsers: ['students'],
  }),
  studentTool({
    name: 'Wolfram Alpha',
    slug: 'wolfram-alpha',
    logo: favicon('wolframalpha.com'),
    tagline: 'Computational knowledge engine for exact math answers, equations, and plotting.',
    description:
      'Wolfram Alpha provides exact mathematical answers, equation solving, data analysis, and plotting via a computational knowledge engine. Student Pro and Student Pro Premium tiers verified from wolframalpha.com.',
    tags: ['Math', 'Homework', 'Computation', 'STEM'],
    pricingModel: 'Freemium',
    monthlyPrice: 6.99,
    hasFreeTrial: false,
    companyName: 'Wolfram',
    websiteUrl: 'https://www.wolframalpha.com',
    featureSource: 'https://www.wolframalpha.com',
    pricingSource: 'https://www.wolframalpha.com/pro/pricing/students',
    sources: [{ type: 'features', url: 'https://www.wolframalpha.com', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Mobile'],
    hasMobileApp: true,
    features: ['Step-by-step solutions', 'Equation solving', 'Data analysis', 'Plotting'],
    pros: ['Deterministic exact answers for STEM'],
    cons: ['Not conversational — requires logical/computational query format'],
    targetUsers: ['students'],
  }),
  studentTool({
    name: 'Grammarly',
    slug: 'grammarly',
    categoryId: CAT_WRITING,
    categoryName: 'Writing & Copywriting',
    logo: favicon('grammarly.com'),
    tagline: 'Real-time grammar, spelling, clarity, and tone AI writing assistant.',
    description:
      'Grammarly provides real-time grammar, spelling, clarity, and tone suggestions via browser and desktop extensions. Verified from grammarly.com official product and pricing pages.',
    tags: ['Writing', 'Grammar', 'Clarity', 'Tone'],
    pricingModel: 'Freemium',
    monthlyPrice: 12,
    hasFreeTrial: true,
    companyName: 'Grammarly',
    websiteUrl: 'https://www.grammarly.com',
    featureSource: 'https://www.grammarly.com',
    pricingSource: 'https://www.grammarly.com/plans',
    sources: [{ type: 'features', url: 'https://www.grammarly.com', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web', 'Desktop', 'Mobile'],
    hasExtension: true,
    hasMobileApp: true,
    features: ['Grammar & spelling', 'Clarity suggestions', 'Tone detection', 'Browser extension'],
    pros: ['Broad writing surface coverage'],
    cons: ['Full rewrites and plagiarism check on Pro tier', 'Institutions may regulate AI usage'],
    targetUsers: ['students', 'writers', 'teachers', 'researchers', 'real-estate-agents'],
  }),
  studentTool({
    name: 'Consensus',
    slug: 'consensus',
    logo: favicon('consensus.app'),
    tagline: 'Academic AI search across 200M+ peer-reviewed papers with citation-backed answers.',
    description:
      'Consensus searches 200M+ peer-reviewed papers and returns citation-backed answers with a Consensus Meter (agree/disagree classifier). Verified from consensus.app official product and pricing pages.',
    tags: ['Research', 'Academic Search', 'Citations', 'Papers'],
    pricingModel: 'Freemium',
    monthlyPrice: 12,
    hasFreeTrial: true,
    companyName: 'Consensus',
    websiteUrl: 'https://consensus.app',
    featureSource: 'https://consensus.app',
    pricingSource: 'https://consensus.app/home/pricing/',
    sources: [{ type: 'features', url: 'https://consensus.app', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['200M+ paper search', 'Consensus Meter', 'Deep reviews', 'Snapshots'],
    pros: ['Scientific literature focus with citations'],
    cons: ['Focused on scientific/academic lit — not general homework'],
    alternatives: ['elicit', 'scite-ai'],
    targetUsers: ['students', 'teachers', 'researchers'],
  }),
  studentTool({
    name: 'Elicit',
    slug: 'elicit',
    logo: favicon('elicit.com'),
    tagline: 'AI research assistant for literature review and semantic paper search.',
    description:
      'Elicit automates literature review with semantic search across 138M+ papers and extracts data into comparison tables. Verified from elicit.com official product and pricing pages.',
    tags: ['Research', 'Literature Review', 'Paper Search'],
    pricingModel: 'Freemium',
    monthlyPrice: 12,
    hasFreeTrial: true,
    companyName: 'Elicit',
    websiteUrl: 'https://elicit.com',
    featureSource: 'https://elicit.com',
    pricingSource: 'https://elicit.com/pricing',
    sources: [{ type: 'features', url: 'https://elicit.com', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Semantic paper search', 'Data extraction tables', 'Full-text summaries'],
    pros: ['Strong literature review automation'],
    cons: ['Pro tier cost-prohibitive for casual undergrads per official pricing'],
    alternatives: ['consensus', 'scite-ai'],
    targetUsers: ['students', 'researchers'],
  }),
  studentTool({
    name: 'Scite.ai',
    slug: 'scite-ai',
    logo: favicon('scite.ai'),
    tagline: 'Smart Citations showing whether papers support or contrast a cited claim.',
    description:
      'Scite.ai provides Smart Citations that show whether referenced papers support, mention, or contrast a claim, plus citation credibility analysis. Verified from scite.ai official pricing pages.',
    tags: ['Citations', 'Research', 'Smart Citations'],
    pricingModel: 'Paid',
    monthlyPrice: 20,
    hasFreeTrial: true,
    companyName: 'Scite',
    websiteUrl: 'https://scite.ai',
    featureSource: 'https://scite.ai',
    pricingSource: 'https://scite.ai/pricing',
    sources: [{ type: 'features', url: 'https://scite.ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Smart Citations', 'Support/contrast classification', 'Reference checks'],
    pros: ['Unique citation context analysis'],
    cons: ['No permanent free tier — 7-day trial only per official pricing'],
    alternatives: ['consensus', 'elicit'],
    targetUsers: ['students', 'researchers'],
  }),
  studentTool({
    name: 'NoteGPT',
    slug: 'notegpt',
    logo: favicon('notegpt.io'),
    tagline: 'Summarize web content, YouTube videos, PDFs, and audio into notes and mind maps.',
    description:
      'NoteGPT summarizes web pages, YouTube videos, PDFs, and audio into structured notes and mind maps. Verified from notegpt.io official product and pricing pages.',
    tags: ['Summarization', 'YouTube Notes', 'PDF', 'Mind Maps'],
    pricingModel: 'Freemium',
    monthlyPrice: 9,
    hasFreeTrial: true,
    companyName: 'NoteGPT',
    websiteUrl: 'https://notegpt.io',
    featureSource: 'https://notegpt.io',
    pricingSource: 'https://notegpt.io/pricing',
    sources: [{ type: 'features', url: 'https://notegpt.io', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['YouTube summarization', 'PDF & audio notes', 'Mind maps'],
    pros: ['Multi-format summarization'],
    cons: ['Free tier: 15 quotas/mo, 1 video at a time max 120 min per official pricing'],
    alternatives: ['otter-ai', 'notebooklm'],
    targetUsers: ['students'],
  }),
  studentTool({
    name: 'Monic.ai',
    slug: 'monic-ai',
    logo: favicon('monic.ai'),
    tagline: 'Convert course materials into flashcards, quizzes, AI tutor sessions, and exam simulation.',
    description:
      'Monic.ai converts PDFs, YouTube, and slides into flashcards, quizzes, AI tutor sessions, and exam simulations. Verified from monic.ai official site; pricing partly from directory listings (see research notes).',
    tags: ['Flashcards', 'Quizzes', 'AI Tutor', 'Exam Prep'],
    pricingModel: 'Freemium',
    monthlyPrice: 4.99,
    hasFreeTrial: true,
    companyName: 'Monic.ai',
    websiteUrl: 'https://monic.ai',
    featureSource: 'https://monic.ai',
    pricingSource: 'https://monic.ai',
    sources: [{ type: 'features', url: 'https://monic.ai', verifiedAt: `${VERIFIED_DATE}T00:00:00.000Z` }],
    platforms: ['Web'],
    features: ['Flashcard generation', 'Quizzes', 'AI tutor', 'Exam simulation'],
    pros: ['All-in-one course-material conversion'],
    cons: ['Token-based free tier restricts high-volume use'],
    alternatives: ['quizlet', 'remnote'],
    targetUsers: ['students', 'teachers'],
  }),
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

export const STUDENT_TOOL_USE_CASES: StudentToolUseCaseSeed[] = [
  // ai-study-tools
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'ai-study-tools',
    fitTier: 'primary',
    capabilities: 'Study guides, flashcards, quizzes, Audio Overviews from uploaded sources',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'remnote',
    useCaseSlug: 'ai-study-tools',
    fitTier: 'primary',
    capabilities: 'Hierarchical notes, flashcards, spaced-repetition scheduling',
    evidenceUrl: 'https://www.remnote.com',
    displayOrder: 2,
  },
  {
    toolSlug: 'quizlet',
    useCaseSlug: 'ai-study-tools',
    fitTier: 'strong',
    capabilities: 'Practice tests, study sets, Magic Notes, Q-Chat AI tutor',
    evidenceUrl: 'https://quizlet.com',
    displayOrder: 3,
  },
  {
    toolSlug: 'monic-ai',
    useCaseSlug: 'ai-study-tools',
    fitTier: 'strong',
    capabilities: 'Course materials to flashcards, quizzes, AI tutor sessions',
    limitation: 'Token-based free tier',
    evidenceUrl: 'https://monic.ai',
    displayOrder: 4,
  },
  // homework-problem-solving
  {
    toolSlug: 'wolfram-alpha',
    useCaseSlug: 'homework-problem-solving',
    fitTier: 'primary',
    capabilities: 'Exact math answers, equation solving, plotting, data analysis',
    limitation: 'Requires logical/computational query format',
    evidenceUrl: 'https://www.wolframalpha.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'notegpt',
    useCaseSlug: 'homework-problem-solving',
    fitTier: 'strong',
    capabilities: 'Summarize study materials from web, YouTube, PDFs, audio',
    limitation: 'Summarization tool — not a dedicated math solver',
    evidenceUrl: 'https://notegpt.io',
    displayOrder: 2,
  },
  // flashcards-quizzes
  {
    toolSlug: 'quizlet',
    useCaseSlug: 'flashcards-quizzes',
    fitTier: 'primary',
    capabilities: 'Flashcards, practice tests, Magic Notes, Q-Chat tutor',
    evidenceUrl: 'https://quizlet.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'remnote',
    useCaseSlug: 'flashcards-quizzes',
    fitTier: 'primary',
    capabilities: 'Flashcard generation, spaced-repetition scheduling',
    evidenceUrl: 'https://www.remnote.com',
    displayOrder: 2,
  },
  {
    toolSlug: 'anki',
    useCaseSlug: 'flashcards-quizzes',
    fitTier: 'strong',
    capabilities: 'SM-2/FSRS spaced-repetition flashcards',
    limitation: 'No native generative AI — community plugins required',
    evidenceUrl: 'https://apps.ankiweb.net',
    displayOrder: 3,
  },
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'flashcards-quizzes',
    fitTier: 'strong',
    capabilities: 'Generate flashcards and quizzes from uploaded sources',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 4,
  },
  {
    toolSlug: 'monic-ai',
    useCaseSlug: 'flashcards-quizzes',
    fitTier: 'primary',
    capabilities: 'Flashcards, quizzes, exam simulation from course materials',
    limitation: 'Token-based free tier',
    evidenceUrl: 'https://monic.ai',
    displayOrder: 5,
  },
  // research-academic-tools
  {
    toolSlug: 'consensus',
    useCaseSlug: 'research-academic-tools',
    fitTier: 'primary',
    capabilities: '200M+ peer-reviewed paper search, Consensus Meter, citation-backed answers',
    evidenceUrl: 'https://consensus.app',
    displayOrder: 1,
  },
  {
    toolSlug: 'elicit',
    useCaseSlug: 'research-academic-tools',
    fitTier: 'primary',
    capabilities: 'Literature review automation, semantic search across 138M+ papers',
    evidenceUrl: 'https://elicit.com',
    displayOrder: 2,
  },
  {
    toolSlug: 'scite-ai',
    useCaseSlug: 'research-academic-tools',
    fitTier: 'primary',
    capabilities: 'Smart Citations — support/contrast classification for references',
    limitation: 'No permanent free tier — 7-day trial',
    evidenceUrl: 'https://scite.ai',
    displayOrder: 3,
  },
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'research-academic-tools',
    fitTier: 'partial',
    capabilities: 'Grounded research summaries from uploaded sources',
    limitation: 'Answers restricted to uploaded sources only',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 4,
  },
  // writing-assignments
  {
    toolSlug: 'grammarly',
    useCaseSlug: 'writing-assignments',
    fitTier: 'primary',
    capabilities: 'Grammar, spelling, clarity, tone suggestions',
    limitation: 'Institutions may regulate AI usage',
    evidenceUrl: 'https://www.grammarly.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'gamma',
    useCaseSlug: 'writing-assignments',
    fitTier: 'partial',
    capabilities: 'AI presentation and document builder for assignment decks',
    limitation: 'General deck builder — not an essay writing tool',
    evidenceUrl: 'https://gamma.app/pricing',
    displayOrder: 2,
  },
  // lecture-notes
  {
    toolSlug: 'otter-ai',
    useCaseSlug: 'lecture-notes',
    fitTier: 'primary',
    capabilities: 'Lecture/meeting transcription, AI summaries, speaker ID',
    limitation: '30-min session cap on free tier per official pricing',
    evidenceUrl: 'https://otter.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'notegpt',
    useCaseSlug: 'lecture-notes',
    fitTier: 'primary',
    capabilities: 'Summarize YouTube lectures, PDFs, and audio into notes',
    evidenceUrl: 'https://notegpt.io',
    displayOrder: 2,
  },
  {
    toolSlug: 'remnote',
    useCaseSlug: 'lecture-notes',
    fitTier: 'strong',
    capabilities: 'PDF annotation, hierarchical lecture notes',
    evidenceUrl: 'https://www.remnote.com',
    displayOrder: 3,
  },
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'lecture-notes',
    fitTier: 'partial',
    capabilities: 'Audio Overviews and summaries from uploaded lecture materials',
    limitation: 'Requires uploaded sources',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 4,
  },
];

export const STUDENT_VERIFIED_AT = VERIFIED_AT;
