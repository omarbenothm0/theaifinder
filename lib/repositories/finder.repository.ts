import { FinderAnswer, Tool } from '../../types/tool';
import { prisma } from '../prisma';
import {
  mapTool,
  PUBLISHED_TOOL_WHERE,
  TOOL_INCLUDE,
  getApprovedReviewAggregatesByToolIds,
  enrichToolsWithPublicReviewSignals,
} from '../repository-shared';
import { toolMatchesUseCase } from '../utils/useCaseMatch';

export class FinderRepository {
  public static async evaluateFinder(answer: FinderAnswer) {
    const { useCase, role, budgetPreference } = answer;

    const allTools = await prisma.tool.findMany({
      where: PUBLISHED_TOOL_WHERE,
      include: TOOL_INCLUDE,
    });

    const enrichedTools = await enrichToolsWithPublicReviewSignals(allTools.map(mapTool));

    const scored = enrichedTools.map((tool) => {
      let score = 50;
      const matchReasons: string[] = [];

      if (toolMatchesUseCase(tool, useCase)) {
        score += 35;
        matchReasons.push(`Direct match for ${useCase.replace(/-/g, ' ')} workflows`);
      }

      if (tool.targetUsers.includes(role)) {
        score += 25;
        matchReasons.push(`Optimized for ${role.replace(/-/g, ' ')} workflows`);
      }

      if (budgetPreference === 'free-only' && (tool.pricingModel === 'Free' || tool.monthlyPrice === 0)) {
        score += 20;
        matchReasons.push('100% Free plan available');
      } else if (budgetPreference === 'freemium' && (tool.pricingModel === 'Freemium' || tool.hasFreeTrial)) {
        score += 15;
        matchReasons.push('Includes free trial or freemium tier');
      }

      if (tool.verified) {
        score += 5;
        if (tool.rating === 0) {
          matchReasons.push('Verified listing from official sources');
        }
      }
      if (tool.rating >= 4.8) score += 10;

      return { tool, score: Math.min(100, score), matchReasons };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 5);
  }
}
