import { Tool } from '../../types/tool';

/** Match finder/catalog use-case slugs against tool category and tags. */
export function toolMatchesUseCase(tool: Tool, useCase: string): boolean {
  const uc = useCase.toLowerCase();

  if (uc === 'marketing') {
    return (
      tool.targetUsers.includes('marketers') ||
      tool.tags.some((tag) => tag.toLowerCase().includes('marketing'))
    );
  }

  if (uc === 'teaching') {
    return (
      tool.targetUsers.includes('teachers') ||
      tool.tags.some((tag) => tag.toLowerCase().includes('education'))
    );
  }

  const normalized = uc.replace(/-/g, ' ');
  const slug = (tool.categorySlug ?? '').toLowerCase();
  const id = tool.categoryId.toLowerCase();
  const name = tool.categoryName.toLowerCase();

  return (
    slug.includes(uc) ||
    id.includes(uc) ||
    name.includes(normalized) ||
    tool.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}
