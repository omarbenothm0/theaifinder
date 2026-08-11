import { Persona } from '../../types/tool';
import { UseCaseFitTier } from './pm-cluster';

export interface TeacherUseCaseSeed {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
}

export interface TeacherPersonaUseCaseSeed {
  useCaseSlug: string;
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
}

export interface TeacherToolUseCaseSeed {
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

/** Replaces seed placeholder — Educators merged into `teachers`. */
export const TEACHER_PERSONA: Persona = {
  id: 'per-teachers',
  title: 'Teachers & Educators',
  slug: 'teachers',
  iconName: 'GraduationCap',
  subtitle: 'Lesson plans, materials, quizzes, grading, research, and classroom support',
  description:
    'Verified AI tools for K–12 teachers, university professors, and tutors — lesson planning, worksheets, quizzes, writing feedback, research prep, and classroom support. Curated from official product sources.',
  targetRole: 'Teacher',
  keyBenefits: [
    'Turn curriculum sources into lesson plans and slide decks',
    'Generate worksheets, visuals, and practice materials',
    'Build quizzes and assessments from course content',
    'Give grammar and clarity feedback on student writing',
  ],
  topToolSlugs: ['gamma', 'notebooklm', 'quizlet', 'grammarly', 'canva', 'perplexity', 'otter-ai'],
  faqs: [
    {
      question: 'What AI tools do teachers use most?',
      answer:
        'Common verified categories include lesson deck builders (Gamma), source-grounded assistants (NotebookLM), quiz platforms (Quizlet, Monic.ai), writing feedback (Grammarly), visual materials (Canva), and lecture capture (Otter.ai).',
    },
    {
      question: 'Is Educators a separate hub?',
      answer:
        'No — Educators is merged into this Teachers hub. All educator workflows live at /for/teachers with anchored workflow sections.',
    },
  ],
};

export const TEACHER_USE_CASES: TeacherUseCaseSeed[] = [
  {
    slug: 'lesson-planning',
    title: 'Lesson Planning',
    description:
      'AI-assisted lesson outlines, slide decks, and curriculum materials from prompts or uploaded sources.',
    primaryKeyword: 'ai lesson plan generator',
    seoTitle: 'Best AI Lesson Planning Tools for Teachers (2026)',
    seoDescription:
      'Verified AI lesson planning tools — slide decks, outlines, and curriculum materials from official sources.',
  },
  {
    slug: 'worksheets-materials',
    title: 'Worksheets & Teaching Materials',
    description:
      'Visual worksheets, handouts, and teaching assets for classroom and online instruction.',
    primaryKeyword: 'ai worksheet generator for teachers',
    seoTitle: 'Best AI Worksheet & Teaching Material Tools (2026)',
    seoDescription:
      'Verified AI tools for worksheets, handouts, and visual teaching materials.',
  },
  {
    slug: 'quizzes-assessments',
    title: 'Quizzes & Assessments',
    description:
      'AI-generated quizzes, practice tests, and assessment items from course materials.',
    primaryKeyword: 'ai quiz generator for teachers',
    seoTitle: 'Best AI Quiz & Assessment Tools for Teachers (2026)',
    seoDescription:
      'Verified AI quiz and assessment tools — practice tests and question generation.',
  },
  {
    slug: 'grading-feedback',
    title: 'Grading & Feedback',
    description:
      'Writing feedback — grammar, clarity, tone, and revision suggestions for student work.',
    primaryKeyword: 'ai grading assistant for teachers',
    seoTitle: 'Best AI Grading & Feedback Tools for Teachers (2026)',
    seoDescription:
      'Verified AI writing feedback tools for teacher grading and student revision support.',
  },
  {
    slug: 'research-lesson-prep',
    title: 'Research & Lesson Preparation',
    description:
      'Topic research, source-grounded summaries, and academic reference discovery for lesson prep.',
    primaryKeyword: 'ai research tools for teachers',
    seoTitle: 'Best AI Research Tools for Lesson Preparation (2026)',
    seoDescription:
      'Verified AI research tools for teachers — citations, summaries, and lesson preparation.',
  },
  {
    slug: 'classroom-support',
    title: 'Classroom Support',
    description:
      'Lecture capture, AI tutoring support, and in-class content assistance for educators.',
    primaryKeyword: 'ai classroom tools',
    seoTitle: 'Best AI Classroom Support Tools for Teachers (2026)',
    seoDescription:
      'Verified AI classroom tools — lecture capture, tutoring, and in-class support.',
  },
];

export const TEACHER_PERSONA_USE_CASES: TeacherPersonaUseCaseSeed[] = [
  {
    useCaseSlug: 'lesson-planning',
    order: 1,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — verified lesson planning tools on this page.',
  },
  {
    useCaseSlug: 'worksheets-materials',
    order: 2,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — worksheets and teaching materials on this page.',
  },
  {
    useCaseSlug: 'quizzes-assessments',
    order: 3,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — quiz and assessment tools on this page.',
  },
  {
    useCaseSlug: 'grading-feedback',
    order: 4,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — grading and feedback tools on this page.',
  },
  {
    useCaseSlug: 'research-lesson-prep',
    order: 5,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — research and lesson prep tools on this page.',
  },
  {
    useCaseSlug: 'classroom-support',
    order: 6,
    isPrimary: true,
    pageEnabled: false,
    hubNote: 'Hub section — classroom support tools on this page.',
  },
];

const VERIFIED_AT = `${VERIFIED_DATE}T00:00:00.000Z`;

/** Maps existing verified tools only — no new tool records. */
export const TEACHER_TOOL_USE_CASES: TeacherToolUseCaseSeed[] = [
  // lesson-planning
  {
    toolSlug: 'gamma',
    useCaseSlug: 'lesson-planning',
    fitTier: 'primary',
    capabilities: 'AI slide decks and visual lesson materials from prompts or imported files',
    evidenceUrl: 'https://gamma.app',
    displayOrder: 1,
  },
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'lesson-planning',
    fitTier: 'strong',
    capabilities: 'Study guides and lesson content grounded in uploaded curriculum sources',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 2,
  },
  {
    toolSlug: 'perplexity',
    useCaseSlug: 'lesson-planning',
    fitTier: 'partial',
    capabilities: 'Live web research with citations for lesson topic outlines',
    limitation: 'General research engine — not a dedicated lesson-plan template tool',
    evidenceUrl: 'https://perplexity.ai',
    displayOrder: 3,
  },
  // worksheets-materials
  {
    toolSlug: 'canva',
    useCaseSlug: 'worksheets-materials',
    fitTier: 'primary',
    capabilities: 'Magic Write, design templates for worksheets, handouts, and visual materials',
    evidenceUrl: 'https://www.canva.com/ai/',
    displayOrder: 1,
  },
  {
    toolSlug: 'gamma',
    useCaseSlug: 'worksheets-materials',
    fitTier: 'strong',
    capabilities: 'Visual documents and slide-based handouts from prompts',
    evidenceUrl: 'https://gamma.app',
    displayOrder: 2,
  },
  {
    toolSlug: 'quizlet',
    useCaseSlug: 'worksheets-materials',
    fitTier: 'partial',
    capabilities: 'Study sets and practice materials teachers can assign',
    limitation: 'Student-facing study platform — not a worksheet design tool',
    evidenceUrl: 'https://quizlet.com',
    displayOrder: 3,
  },
  // quizzes-assessments
  {
    toolSlug: 'quizlet',
    useCaseSlug: 'quizzes-assessments',
    fitTier: 'primary',
    capabilities: 'Practice tests, Magic Notes, Q-Chat AI tutor for assessment prep',
    evidenceUrl: 'https://quizlet.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'quizzes-assessments',
    fitTier: 'primary',
    capabilities: 'Generate quizzes from uploaded sources with grounded citations',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 2,
  },
  {
    toolSlug: 'monic-ai',
    useCaseSlug: 'quizzes-assessments',
    fitTier: 'strong',
    capabilities: 'Quizzes and exam simulation from course materials',
    limitation: 'Token-based free tier',
    evidenceUrl: 'https://monic.ai',
    displayOrder: 3,
  },
  // grading-feedback
  {
    toolSlug: 'grammarly',
    useCaseSlug: 'grading-feedback',
    fitTier: 'primary',
    capabilities: 'Grammar, spelling, clarity, and tone suggestions for student writing',
    limitation: 'Institutions may regulate AI usage in assignments',
    evidenceUrl: 'https://www.grammarly.com',
    displayOrder: 1,
  },
  // research-lesson-prep
  {
    toolSlug: 'notebooklm',
    useCaseSlug: 'research-lesson-prep',
    fitTier: 'primary',
    capabilities: 'Grounded Q&A and summaries from uploaded lesson sources',
    evidenceUrl: 'https://notebooklm.google.com',
    displayOrder: 1,
  },
  {
    toolSlug: 'perplexity',
    useCaseSlug: 'research-lesson-prep',
    fitTier: 'strong',
    capabilities: 'Live web search with inline citations for topic research',
    evidenceUrl: 'https://perplexity.ai',
    displayOrder: 2,
  },
  {
    toolSlug: 'consensus',
    useCaseSlug: 'research-lesson-prep',
    fitTier: 'partial',
    capabilities: 'Peer-reviewed paper search with citation-backed answers',
    limitation: 'Scientific/academic literature focus — not general K–12 topic research',
    evidenceUrl: 'https://consensus.app',
    displayOrder: 3,
  },
  // classroom-support
  {
    toolSlug: 'otter-ai',
    useCaseSlug: 'classroom-support',
    fitTier: 'primary',
    capabilities: 'Lecture transcription, AI summaries, speaker ID for classroom capture',
    limitation: '30-min session cap on free tier per official pricing',
    evidenceUrl: 'https://otter.ai',
    displayOrder: 1,
  },
  {
    toolSlug: 'quizlet',
    useCaseSlug: 'classroom-support',
    fitTier: 'strong',
    capabilities: 'Q-Chat AI tutor for student practice and review',
    evidenceUrl: 'https://quizlet.com',
    displayOrder: 2,
  },
  {
    toolSlug: 'monic-ai',
    useCaseSlug: 'classroom-support',
    fitTier: 'strong',
    capabilities: 'AI tutor sessions from uploaded course materials',
    limitation: 'Token-based free tier',
    evidenceUrl: 'https://monic.ai',
    displayOrder: 3,
  },
];

export const TEACHER_VERIFIED_AT = VERIFIED_AT;
