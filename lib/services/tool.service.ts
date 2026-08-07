import { ToolRepository } from '../repositories/tool.repository';
import { ToolFilterOptions, Tool } from '../../types/tool';

export class ToolService {
  static async getTools(options?: ToolFilterOptions) {
    return ToolRepository.getAll(options);
  }

  static async getToolBySlug(slug: string): Promise<Tool | null> {
    return ToolRepository.getBySlug(slug);
  }

  static async getToolsByPersona(personaSlug: string): Promise<Tool[]> {
    const res = await ToolRepository.getAll({ persona: personaSlug });
    return res.tools;
  }

  static async getFeaturedTools(): Promise<Tool[]> {
    return ToolRepository.getFeatured();
  }

  static async getTrendingTools(): Promise<Tool[]> {
    return ToolRepository.getTrending();
  }

  static async getAlternatives(slug: string): Promise<Tool[]> {
    return ToolRepository.getAlternatives(slug);
  }

  static async saveTool(tool: Partial<Tool>): Promise<Tool> {
    return ToolRepository.save(tool);
  }

  static async deleteTool(id: string): Promise<boolean> {
    return ToolRepository.delete(id);
  }
}
