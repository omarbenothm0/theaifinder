import { ToolService } from './tool.service';
import { Tool, ToolFilterOptions } from '../../types/tool';

export interface SearchResult {
  tools: Tool[];
  total: number;
  page?: number;
  totalPages?: number;
  categoriesCount?: Record<string, number>;
}

export interface SearchProvider {
  search(options: ToolFilterOptions): Promise<SearchResult>;
}

export class DefaultSearchProvider implements SearchProvider {
  async search(options: ToolFilterOptions): Promise<SearchResult> {
    const res = await ToolService.getTools(options);
    return {
      tools: res.tools,
      total: res.total,
      page: res.page,
      totalPages: res.totalPages,
    };
  }
}

export class SearchService {
  private static provider: SearchProvider = new DefaultSearchProvider();

  static setProvider(provider: SearchProvider) {
    this.provider = provider;
  }

  static async search(options: ToolFilterOptions): Promise<SearchResult> {
    return this.provider.search(options);
  }
}
