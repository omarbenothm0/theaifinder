import { dbRepository } from '../dbRepository';
import { Category } from '../../types/tool';

export class CategoryRepository {
  static async getAll(): Promise<Category[]> {
    return dbRepository.getCategories();
  }

  static async getBySlug(slug: string): Promise<Category | null> {
    const category = dbRepository.getCategoryBySlug(slug);
    return category || null;
  }
}
