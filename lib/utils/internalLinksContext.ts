import { Category, Persona, Comparison } from '../../types/tool';
import { filterPublicPersonas } from '../seo/persona-visibility';

/** Surface PM-relevant hubs first without changing InternalLinks layout. */
export function prioritizePmLinks<T extends { slug: string }>(items: T[], slug: string): T[] {
  const match = items.find((item) => item.slug === slug);
  if (!match) return items;
  return [match, ...items.filter((item) => item.slug !== slug)];
}

function prioritizeComparisonSlug(comparisons: Comparison[], slug: string): Comparison[] {
  const match = comparisons.find((c) => c.slug === slug);
  if (!match) return comparisons;
  return [match, ...comparisons.filter((c) => c.slug !== slug)];
}

export function getContextualInternalLinks(
  toolSlug: string,
  targetUsers: string[],
  categorySlug: string | undefined,
  categories: Category[],
  personas: Persona[],
  comparisons: Comparison[]
) {
  const publicPersonas = filterPublicPersonas(personas);
  const isCodingTool =
    categorySlug === 'coding' ||
    categorySlug === 'cat-coding' ||
    targetUsers.includes('developers');

  if (isCodingTool) {
    return {
      categories: prioritizePmLinks(categories, 'coding'),
      personas: publicPersonas,
      comparisons: prioritizeComparisonSlug(comparisons, 'claude-code-vs-cursor'),
    };
  }

  const isPmTool = targetUsers.includes('project-managers');
  const isStudentTool = targetUsers.includes('students');
  const isMarketerTool = targetUsers.includes('marketers');
  const isTeacherTool = targetUsers.includes('teachers');
  const isSmallBusinessTool = targetUsers.includes('small-business');
  const isResearcherTool = targetUsers.includes('researchers');
  const isRealEstateTool = targetUsers.includes('real-estate-agents');
  const isWriterTool = targetUsers.includes('writers');

  if (isPmTool) {
    return {
      categories: prioritizePmLinks(categories, 'project-management'),
      personas: prioritizePmLinks(publicPersonas, 'project-managers'),
      comparisons: [
        ...comparisons.filter((c) => c.tool1Slug === toolSlug || c.tool2Slug === toolSlug),
        ...comparisons.filter((c) => c.tool1Slug !== toolSlug && c.tool2Slug !== toolSlug),
      ],
    };
  }

  if (isStudentTool) {
    return {
      categories: prioritizePmLinks(categories, 'study-education'),
      personas: prioritizePmLinks(publicPersonas, 'students'),
      comparisons,
    };
  }

  if (isMarketerTool) {
    return {
      categories: prioritizePmLinks(categories, 'writing'),
      personas: prioritizePmLinks(publicPersonas, 'marketers'),
      comparisons,
    };
  }

  if (isTeacherTool) {
    return {
      categories: prioritizePmLinks(categories, 'study-education'),
      personas: prioritizePmLinks(publicPersonas, 'teachers'),
      comparisons,
    };
  }

  if (isSmallBusinessTool) {
    return {
      categories: prioritizePmLinks(categories, 'productivity'),
      personas: prioritizePmLinks(publicPersonas, 'small-business'),
      comparisons,
    };
  }

  if (isResearcherTool) {
    return {
      categories: prioritizePmLinks(categories, 'study-education'),
      personas: prioritizePmLinks(publicPersonas, 'researchers'),
      comparisons,
    };
  }

  if (isRealEstateTool) {
    return {
      categories: prioritizePmLinks(categories, 'image'),
      personas: prioritizePmLinks(publicPersonas, 'real-estate-agents'),
      comparisons,
    };
  }

  if (isWriterTool) {
    return {
      categories: prioritizePmLinks(categories, 'writing'),
      personas: prioritizePmLinks(publicPersonas, 'writers'),
      comparisons,
    };
  }

  return {
    categories,
    personas: publicPersonas,
    comparisons,
  };
}
