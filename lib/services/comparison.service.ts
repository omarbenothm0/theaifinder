import { ComparisonRepository } from '../repositories/comparison.repository';
import { Comparison } from '../../types/tool';

export class ComparisonService {
  static async getComparisons(): Promise<Comparison[]> {
    return ComparisonRepository.getAll();
  }

  static async getComparisonBySlug(slug: string): Promise<Comparison | null> {
    return ComparisonRepository.getBySlug(slug);
  }
}
