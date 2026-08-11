import { dbRepository } from '../dbRepository';
import { Category, ToolFilterOptions } from '../../types/tool';

export class CategoryRepository {
  static async getAll(options?: { includeUnpublished?: boolean }): Promise<Category[]> {
    return dbRepository.getCategories(options);
  }

  static async getBySlug(
    slug: string,
    options?: { includeUnpublished?: boolean }
  ): Promise<Category | null> {
    const category = await dbRepository.getCategoryBySlug(slug, options);
    return category || null;
  }
}
