import { Category } from '../../types/tool';
import {
  STUDENT_PERSONA_USE_CASES,
  STUDENT_TOOL_USE_CASES,
  STUDENT_TOOLS,
  STUDENT_USE_CASES,
} from './student-cluster';

const CAT_STUDY = 'cat-study-education';

/** Tools cataloged under Study & Education (excludes cross-category entries like Grammarly). */
const STUDY_INVENTORY_SLUGS = new Set(
  STUDENT_TOOLS.filter((t) => (t.categoryId ?? CAT_STUDY) === CAT_STUDY).map((t) => t.slug)
);

function useCaseMeta(useCaseSlug: string) {
  const useCase = STUDENT_USE_CASES.find((u) => u.slug === useCaseSlug);
  if (!useCase) {
    throw new Error(`Missing student use case: ${useCaseSlug}`);
  }
  return useCase;
}

/** Tool slugs for a student use case, ordered by cluster mappings and limited to study inventory. */
export function studyToolSlugsForUseCase(useCaseSlug: string): string[] {
  const seen = new Set<string>();
  const slugs: string[] = [];
  const mappings = STUDENT_TOOL_USE_CASES.filter(
    (m) => m.useCaseSlug === useCaseSlug && m.fitTier !== 'exclude'
  ).sort((a, b) => a.displayOrder - b.displayOrder);

  for (const mapping of mappings) {
    if (!STUDY_INVENTORY_SLUGS.has(mapping.toolSlug) || seen.has(mapping.toolSlug)) continue;
    seen.add(mapping.toolSlug);
    slugs.push(mapping.toolSlug);
  }
  return slugs;
}

export const STUDY_SECTIONS = [...STUDENT_PERSONA_USE_CASES]
  .sort((a, b) => a.order - b.order)
  .map(({ useCaseSlug }) => {
    const meta = useCaseMeta(useCaseSlug);
    return {
      slug: useCaseSlug,
      title: meta.title,
      description: meta.description,
      toolSlugs: studyToolSlugsForUseCase(useCaseSlug),
    };
  });

export const STUDY_EDUCATION_CATEGORY: Category = {
  id: CAT_STUDY,
  name: 'Study & Education',
  slug: 'study-education',
  iconName: 'GraduationCap',
  description:
    'Verified AI study tools for students — flashcards, homework help, academic research, and lecture notes from official product sources.',
  longDescription:
    'Explore verified AI study and education tools organized by student workflows: study assistants, homework problem-solving, flashcards and quizzes, academic research, and lecture capture. Each section maps to use cases in our student research cluster — with listings sourced from official product pages.',
  toolCount: 0,
  faqs: [
    {
      question: 'What AI tools do students use most?',
      answer:
        'Common verified categories include AI study assistants (NotebookLM, RemNote, Quizlet), homework engines (Wolfram Alpha), research tools (Consensus, Elicit, Scite.ai), writing assistants (Grammarly), and lecture notetakers (Otter.ai, NoteGPT). This category page lists tools in the study-education catalog; see /for/students for the full workflow hub including cross-category mappings.',
    },
    {
      question: 'Are these tools verified for academic use?',
      answer:
        'Every tool on the Students hub is mapped to a student workflow with capabilities and limitations cited from official product pages. Check your institution’s AI policy before submitting AI-assisted work.',
    },
    {
      question: 'Where are writing tools like Grammarly?',
      answer:
        'Grammarly is mapped to the writing-assignments workflow on /for/students#writing-assignments but is cataloged under Writing & Copywriting (/category/writing) because it is a general writing assistant. Gamma for assignment decks lives under Presentations. This page shows study-education inventory only.',
    },
    {
      question: 'Where is Otter.ai for lecture notes?',
      answer:
        'Otter.ai is mapped to the lecture-notes workflow on /for/students#lecture-notes but is cataloged under Project Management for meeting capture. This category lists NoteGPT, RemNote, and NotebookLM for lecture notes within the study-education inventory.',
    },
    {
      question: 'How do NotebookLM, Quizlet, and RemNote differ?',
      answer:
        'NotebookLM generates grounded study guides, flashcards, and quizzes from uploaded sources. Quizlet focuses on flashcards, practice tests, and a large study-set ecosystem with Magic Notes and Q-Chat. RemNote combines hierarchical notes, PDF annotation, flashcards, and spaced-repetition scheduling in one workspace. See /for/students for fit-tier details on each workflow.',
    },
  ],
  seoTitle: 'Best AI Study Tools for Students (2026)',
  seoDescription:
    'Verified AI study tools — flashcards, homework helpers, research assistants, and lecture notetakers — organized by student workflow with official sources.',
};
