import { GraduationCap } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const STUDENT_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'students',
  personaTitle: 'Student',
  icon: GraduationCap,
  workflowSections: [
    { slug: 'ai-study-tools', label: 'AI Study Tools' },
    { slug: 'homework-problem-solving', label: 'Homework & Problem Solving' },
    { slug: 'flashcards-quizzes', label: 'Flashcards & Quizzes' },
    { slug: 'research-academic-tools', label: 'Research & Academic Tools' },
    { slug: 'writing-assignments', label: 'Writing & Assignments' },
    { slug: 'lecture-notes', label: 'Lecture Notes' },
  ],
  linkType: 'anchor',
};

interface StudentWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function StudentWorkflowLinks({ variant = 'compact' }: StudentWorkflowLinksProps) {
  return <WorkflowLinks config={STUDENT_CONFIG} variant={variant} />;
}
