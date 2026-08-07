import { dbRepository } from '../dbRepository';
import { Tool, ToolFilterOptions } from '../../types/tool';

export class ToolRepository {
  static async getAll(options?: ToolFilterOptions) {
    return dbRepository.getTools(options || {});
  }

  static async getBySlug(slug: string): Promise<Tool | null> {
    const tool = dbRepository.getToolBySlug(slug);
    return tool || null;
  }

  static async getFeatured(): Promise<Tool[]> {
    const res = dbRepository.getTools({});
    return res.tools.filter((t) => t.featured);
  }

  static async getTrending(): Promise<Tool[]> {
    const res = dbRepository.getTools({});
    return res.tools.filter((t) => t.trending);
  }

  static async getAlternatives(slug: string): Promise<Tool[]> {
    const tool = dbRepository.getToolBySlug(slug);
    if (!tool || !tool.alternatives) return [];
    return tool.alternatives
      .map((altSlug) => dbRepository.getToolBySlug(altSlug))
      .filter((t): t is Tool => Boolean(t));
  }

  static async save(tool: Partial<Tool>): Promise<Tool> {
    if (tool.slug) {
      const existing = dbRepository.getToolBySlug(tool.slug);
      if (existing) {
        const updated = dbRepository.updateTool(tool.slug, tool);
        if (updated) return updated;
      }
    }
    return dbRepository.createTool(tool as any);
  }

  static async delete(idOrSlug: string): Promise<boolean> {
    return dbRepository.deleteTool(idOrSlug);
  }
}
