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

  return {
    categories,
    personas,
    comparisons,
  };
}
