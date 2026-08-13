import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

const WORKFLOW_SECTIONS = [
  { slug: 'lesson-planning', label: 'Lesson Planning' },
  { slug: 'worksheets-materials', label: 'Worksheets & Materials' },
  { slug: 'quizzes-assessments', label: 'Quizzes & Assessments' },
  { slug: 'grading-feedback', label: 'Grading & Feedback' },
  { slug: 'research-lesson-prep', label: 'Research & Lesson Prep' },
  { slug: 'classroom-support', label: 'Classroom Support' },
];

interface TeacherWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function TeacherWorkflowLinks({ variant = 'compact' }: TeacherWorkflowLinksProps) {
  if (variant === 'category') {
    return (
      <div className="max-w-4xl mx-auto bg-background-raised border border-border/50 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          Teacher Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/for/teachers#${section.slug}`}
              className="text-xs font-bold text-foreground bg-background-raised border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href="/for/teachers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong transition-colors"
        >
          View full Teachers hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/for/teachers"
        className="text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
      >
        All Teacher Workflows
      </Link>
      {WORKFLOW_SECTIONS.map((section) => (
        <Link
          key={section.slug}
          href={`/for/teachers#${section.slug}`}
          className="text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
