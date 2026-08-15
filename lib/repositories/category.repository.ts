import { Category } from '../../types/tool';
import { prisma } from '../prisma';
import { mapCategory, PUBLISHED_TOOL_WHERE } from '../repository-shared';

export class CategoryRepository {
  public static async getCategories(options: { includeUnpublished?: boolean } = {}): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: options.includeUnpublished ? {} : { publishStatus: 'published' },
      include: {
        faqs: true,
        _count: {
          select: {
            tools: {
              where: PUBLISHED_TOOL_WHERE,
            },
          },
        },
      },
    });
    return categories.map((c: any) => mapCategory(c, c._count.tools));
  }

  public static async getCategoryBySlug(
    slug: string,
    options: { includeUnpublished?: boolean } = {}
  ): Promise<Category | undefined> {
    const cat = await prisma.category.findFirst({
      where: {
        slug: { equals: slug, mode: 'insensitive' },
        ...(options.includeUnpublished ? {} : { publishStatus: 'published' }),
      },
      include: {
        faqs: true,
        _count: {
          select: {
            tools: {
              where: PUBLISHED_TOOL_WHERE,
            },
          },
        },
      },
    });
    return cat ? mapCategory(cat, (cat as any)._count.tools) : undefined;
  }

  // --- Preserve existing wrapper API for backward compatibility ---

  static async getAll(options?: { includeUnpublished?: boolean }): Promise<Category[]> {
    return CategoryRepository.getCategories(options);
  }

  static async getBySlug(
    slug: string,
    options?: { includeUnpublished?: boolean }
  ): Promise<Category | null> {
    const category = await CategoryRepository.getCategoryBySlug(slug, options);
    return category || null;
  }
}
