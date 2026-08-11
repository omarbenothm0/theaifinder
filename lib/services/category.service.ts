import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../../types/tool';

export class CategoryService {
  static async getCategories(options?: { includeUnpublished?: boolean }): Promise<Category[]> {
    return CategoryRepository.getAll(options);
  }

  static async getCategoryBySlug(
    slug: string,
    options?: { includeUnpublished?: boolean }
  ): Promise<Category | null> {
    return CategoryRepository.getBySlug(slug, options);
  }
}
