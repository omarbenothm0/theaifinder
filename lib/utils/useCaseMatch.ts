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

  if (uc === 'small-business') {
    return (
      tool.targetUsers.includes('small-business') ||
      tool.tags.some((tag) => tag.toLowerCase().includes('small business'))
    );
  }

  if (uc === 'researchers') {
    return (
      tool.targetUsers.includes('researchers') ||
      tool.tags.some((tag) => tag.toLowerCase().includes('research'))
    );
  }

  if (uc === 'real-estate') {
    return (
      tool.targetUsers.includes('real-estate-agents') ||
      tool.tags.some((tag) => tag.toLowerCase().includes('real estate'))
    );
  }

  if (uc === 'writers') {
    return (
      tool.targetUsers.includes('writers') ||
      tool.tags.some((tag) => tag.toLowerCase().includes('writing'))
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
