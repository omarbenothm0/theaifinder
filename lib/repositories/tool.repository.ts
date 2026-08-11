import { dbRepository } from '../dbRepository';
import { Tool, ToolFilterOptions } from '../../types/tool';

export class ToolRepository {
  static async getAll(options?: ToolFilterOptions) {
    return dbRepository.getTools(options || {});
  }

  static async getBySlug(slug: string): Promise<Tool | null> {
    const tool = await dbRepository.getToolBySlug(slug);
    return tool || null;
  }

  static async getFeatured(): Promise<Tool[]> {
    return dbRepository.getFeaturedTools();
  }

  static async getTrending(): Promise<Tool[]> {
    return dbRepository.getTrendingTools();
  }

  static async getAlternatives(slug: string): Promise<Tool[]> {
    const tool = await dbRepository.getToolBySlug(slug);
    if (!tool || !tool.alternatives) return [];
    const results = await Promise.all(
      tool.alternatives.map((altSlug) => dbRepository.getToolBySlug(altSlug))
    );
    return results.filter((t): t is Tool => Boolean(t));
  }

  static async save(tool: Partial<Tool>): Promise<Tool> {
    if (tool.slug) {
      const existing = await dbRepository.getToolBySlug(tool.slug);
      if (existing) {
        const updated = await dbRepository.updateTool(tool.slug, tool);
        if (updated) return updated;
      }
    }
    return dbRepository.createTool(tool as any);
  }

  static async delete(idOrSlug: string): Promise<boolean> {
    return dbRepository.deleteTool(idOrSlug);
  }
}