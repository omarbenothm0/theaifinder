import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

const WORKFLOW_SECTIONS = [
  { slug: 'ai-study-tools', label: 'AI Study Tools' },
  { slug: 'homework-problem-solving', label: 'Homework & Problem Solving' },
  { slug: 'flashcards-quizzes', label: 'Flashcards & Quizzes' },
  { slug: 'research-academic-tools', label: 'Research & Academic Tools' },
  { slug: 'writing-assignments', label: 'Writing & Assignments' },
  { slug: 'lecture-notes', label: 'Lecture Notes' },
];

interface StudentWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function StudentWorkflowLinks({ variant = 'compact' }: StudentWorkflowLinksProps) {
  if (variant === 'category') {
    return (
      <div className="max-w-4xl mx-auto bg-background-raised border border-border/50 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground-strong uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          Student Workflow Guides
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/for/students#${section.slug}`}
              className="text-xs font-bold text-foreground bg-background-raised border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href="/for/students"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground-strong transition-colors"
        >
          View full Students hub
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/for/students"
        className="text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
      >
        All Student Workflows
      </Link>
      {WORKFLOW_SECTIONS.map((section) => (
        <Link
          key={section.slug}
          href={`/for/students#${section.slug}`}
          className="text-xs font-bold text-foreground bg-background border border-border/50 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors"
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}
