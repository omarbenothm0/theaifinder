import { Category, Persona, Comparison } from '../../types/tool';

/** Surface PM-relevant hubs first without changing InternalLinks layout. */
export function prioritizePmLinks<T extends { slug: string }>(items: T[], slug: string): T[] {
  const match = items.find((item) => item.slug === slug);
  if (!match) return items;
  return [match, ...items.filter((item) => item.slug !== slug)];
}

export function getContextualInternalLinks(
  toolSlug: string,
  targetUsers: string[],
  categories: Category[],
  personas: Persona[],
  comparisons: Comparison[]
) {
  const isPmTool = targetUsers.includes('project-managers');
  const isStudentTool = targetUsers.includes('students');
  const isMarketerTool = targetUsers.includes('marketers');
  const isTeacherTool = targetUsers.includes('teachers');
  const isSmallBusinessTool = targetUsers.includes('small-business');
  const isResearcherTool = targetUsers.includes('researchers');
  const isRealEstateTool = targetUsers.includes('real-estate-agents');

  if (isPmTool) {
    return {
      categories: prioritizePmLinks(categories, 'project-management'),
      personas: prioritizePmLinks(personas, 'project-managers'),
      comparisons: [
        ...comparisons.filter((c) => c.tool1Slug === toolSlug || c.tool2Slug === toolSlug),
        ...comparisons.filter((c) => c.tool1Slug !== toolSlug && c.tool2Slug !== toolSlug),
      ],
    };
  }

  if (isStudentTool) {
    return {
      categories: prioritizePmLinks(categories, 'study-education'),
      personas: prioritizePmLinks(personas, 'students'),
      comparisons,
    };
  }

  if (isMarketerTool) {
    return {
      categories: prioritizePmLinks(categories, 'writing'),
      personas: prioritizePmLinks(personas, 'marketers'),
      comparisons,
    };
  }

  if (isTeacherTool) {
    return {
      categories: prioritizePmLinks(categories, 'study-education'),
      personas: prioritizePmLinks(personas, 'teachers'),
      comparisons,
    };
  }

  if (isSmallBusinessTool) {
    return {
      categories: prioritizePmLinks(categories, 'productivity'),
      personas: prioritizePmLinks(personas, 'small-business'),
      comparisons,
    };
  }

  if (isResearcherTool) {
    return {
      categories: prioritizePmLinks(categories, 'study-education'),
      personas: prioritizePmLinks(personas, 'researchers'),
      comparisons,
    };
  }

  if (isRealEstateTool) {
    return {
      categories: prioritizePmLinks(categories, 'image'),
      personas: prioritizePmLinks(personas, 'real-estate-agents'),
      comparisons,
    };
  }

  return {
    categories,
    personas,
    comparisons,
  };
}
