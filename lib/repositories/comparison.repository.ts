import { dbRepository } from '../dbRepository';
import { Comparison } from '../../types/tool';

export class ComparisonRepository {
  static async getAll(): Promise<Comparison[]> {
    return dbRepository.getComparisons();
  }

  static async getBySlug(slug: string): Promise<Comparison | null> {
    const comparison = dbRepository.getComparisonBySlug(slug);
    return comparison || null;
  }
}
