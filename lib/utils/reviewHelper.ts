import { Tool, ToolSourceType } from '../../types/tool';
import { getVerificationFreshnessConfig } from '../monitoring/config';

export function parseDate(date: string | undefined): Date | null {
  if (!date) return null;
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export function daysSince(date: Date): number {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((now.getTime() - date.getTime()) / msPerDay);
}

export function hasRequiredSources(tool: Tool): boolean {
  if (!tool.sources || tool.sources.length === 0) return false;
  const hasPricing = tool.sources.some((source) => source.type === 'pricing');
  const hasFeatures = tool.sources.some((source) => source.type === 'features');
  return hasPricing && hasFeatures && !!tool.pricingSource && !!tool.featureSource;
}

export function getReviewStaleness(tool: Tool) {
  const { staleDays, highPriorityDays } = getVerificationFreshnessConfig();
  const result = {
    isStale: false,
    daysSinceLastVerified: null as number | null,
    needsReview: false as boolean,
    highPriorityReview: false as boolean
  };

  const lastVerified = parseDate(tool.lastVerifiedDate);
  if (!lastVerified) {
    result.needsReview = true;
    return result;
  }

  const elapsed = daysSince(lastVerified);
  result.daysSinceLastVerified = elapsed;
  result.isStale = elapsed >= staleDays;
  result.highPriorityReview = elapsed >= highPriorityDays;

  if (!tool.verified) {
    result.needsReview = true;
  } else if (!hasRequiredSources(tool)) {
    result.needsReview = true;
  } else if (result.isStale) {
    result.needsReview = true;
  }

  return result;
}

export function getReviewState(tool: Tool) {
  if (tool.reviewState) {
    return tool.reviewState;
  }

  const review = getReviewStaleness(tool);
  if (review.needsReview) {
    return 'needsReview' as const;
  }
  return 'verified' as const;
}

export function shouldMarkAsVerified(tool: Tool): boolean {
  return tool.reviewState === 'verified' || (!tool.reviewState && !getReviewStaleness(tool).needsReview);
}

export function getMissingSourceTypes(tool: Tool): ToolSourceType[] {
  const required: ToolSourceType[] = ['pricing', 'features'];
  const sources = tool.sources?.map((source) => source.type) ?? [];
  return required.filter((type) => !sources.includes(type));
}
