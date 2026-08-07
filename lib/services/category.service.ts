import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../../types/tool';

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    return CategoryRepository.getAll();
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    return CategoryRepository.getBySlug(slug);
  }
}
