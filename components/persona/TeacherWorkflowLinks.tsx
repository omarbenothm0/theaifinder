import { GraduationCap } from 'lucide-react';
import { WorkflowLinks, WorkflowLinksConfig } from './WorkflowLinks';

const TEACHER_CONFIG: WorkflowLinksConfig = {
  personaSlug: 'teachers',
  personaTitle: 'Teacher',
  icon: GraduationCap,
  workflowSections: [
    { slug: 'lesson-planning', label: 'Lesson Planning' },
    { slug: 'worksheets-materials', label: 'Worksheets & Materials' },
    { slug: 'quizzes-assessments', label: 'Quizzes & Assessments' },
    { slug: 'grading-feedback', label: 'Grading & Feedback' },
    { slug: 'research-lesson-prep', label: 'Research & Lesson Prep' },
    { slug: 'classroom-support', label: 'Classroom Support' },
  ],
  linkType: 'anchor',
};

interface TeacherWorkflowLinksProps {
  variant?: 'category' | 'compact';
}

export function TeacherWorkflowLinks({ variant = 'compact' }: TeacherWorkflowLinksProps) {
  return <WorkflowLinks config={TEACHER_CONFIG} variant={variant} />;
}
