import { Tool } from '../../types/tool';

const MAX_SUGGESTIONS = 5;

/** Lower tier = higher priority. null = no match. */
type MatchTier = 0 | 1 | 2;

interface RankedTool {
  tool: Tool;
  tier: MatchTier;
}

function getNameMatchTier(name: string, query: string): MatchTier | null {
  const normalized = name.toLowerCase();
  if (normalized.startsWith(query)) return 0;
  if (normalized.includes(query)) return 1;
  return null;
}

function getSecondaryMatchTier(tool: Tool, query: string): MatchTier | null {
  const tagMatch = tool.tags.some((tag) => tag.toLowerCase() === query);
  if (tagMatch) return 2;

  const category = tool.categoryName.toLowerCase();
  if (category.startsWith(query)) return 2;

  return null;
}

function getMatchTier(tool: Tool, query: string): MatchTier | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  const nameTier = getNameMatchTier(tool.name, q);
  if (nameTier !== null) return nameTier;

  return getSecondaryMatchTier(tool, q);
}

function compareRanked(a: RankedTool, b: RankedTool): number {
  if (a.tier !== b.tier) return a.tier - b.tier;
  return a.tool.name.localeCompare(b.tool.name, undefined, { sensitivity: 'base' });
}

export interface NavToolSuggestionsResult {
  suggestions: Tool[];
  totalMatches: number;
  hasMore: boolean;
}

export function getNavToolSuggestions(
  tools: Tool[],
  query: string,
  limit = MAX_SUGGESTIONS
): NavToolSuggestionsResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return { suggestions: [], totalMatches: 0, hasMore: false };
  }

  const ranked = tools
    .map((tool) => {
      const tier = getMatchTier(tool, trimmed);
      return tier === null ? null : { tool, tier };
    })
    .filter((item): item is RankedTool => item !== null)
    .sort(compareRanked);

  return {
    suggestions: ranked.slice(0, limit).map((item) => item.tool),
    totalMatches: ranked.length,
    hasMore: ranked.length > limit,
  };
}
