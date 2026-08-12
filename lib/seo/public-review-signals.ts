import { Tool, ToolFilterOptions } from '../../types/tool';

export type ApprovedReviewAggregate = {
  rating: number;
  count: number;
};

export const EMPTY_APPROVED_REVIEW_AGGREGATE: ApprovedReviewAggregate = {
  rating: 0,
  count: 0,
};

/** Replace legacy seed/CMS review fields with approved Review-table aggregates for public surfaces. */
export function applyPublicReviewSignals(
  tool: Tool,
  aggregate: ApprovedReviewAggregate
): Tool {
  return {
    ...tool,
    rating: aggregate.count > 0 ? aggregate.rating : 0,
    reviewCount: aggregate.count,
  };
}

export function sortPublicTools(
  tools: Tool[],
  sortBy: ToolFilterOptions['sortBy'] = 'popular'
): Tool[] {
  const sorted = [...tools];
  switch (sortBy) {
    case 'rating':
      sorted.sort(
        (a, b) =>
          b.rating - a.rating ||
          b.reviewCount - a.reviewCount ||
          (b.lastVerifiedDate ?? '').localeCompare(a.lastVerifiedDate ?? '')
      );
      break;
    case 'newest':
      sorted.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
      break;
    case 'price-asc':
      sorted.sort(
        (a, b) => (a.monthlyPrice ?? Number.MAX_SAFE_INTEGER) - (b.monthlyPrice ?? Number.MAX_SAFE_INTEGER)
      );
      break;
    case 'price-desc':
      sorted.sort(
        (a, b) => (b.monthlyPrice ?? -1) - (a.monthlyPrice ?? -1)
      );
      break;
    case 'popular':
    default:
      sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
        return (b.lastVerifiedDate ?? '').localeCompare(a.lastVerifiedDate ?? '');
      });
      break;
  }
  return sorted;
}
