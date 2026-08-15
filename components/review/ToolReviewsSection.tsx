import { Star } from 'lucide-react';
import { ReviewRepository } from '../../lib/repositories/review.repository';
import { ReviewList } from './ReviewList';
import { ReviewForm } from './ReviewForm';

interface ToolReviewsSectionProps {
  toolSlug: string;
  toolName: string;
}

export async function ToolReviewsSection({ toolSlug, toolName }: ToolReviewsSectionProps) {
  const reviews = await ReviewRepository.getApprovedReviewsForTool(toolSlug);
  const approvedCount = reviews.length;
  const aggregateRating =
    approvedCount > 0
      ? parseFloat(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / approvedCount).toFixed(1)
        )
      : 0;

  return (
    <div className="bg-background-raised rounded-2xl border border-border/50 p-6 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/30 pb-4">
        <h2 className="text-lg font-bold text-foreground-strong">User Reviews</h2>
        {approvedCount > 0 && aggregateRating > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 font-bold text-foreground-strong">
              <Star className="w-4 h-4 fill-rating text-rating" />
              <span>{aggregateRating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">
              based on {approvedCount} approved review{approvedCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      <ReviewList reviews={reviews} />
      <ReviewForm toolSlug={toolSlug} toolName={toolName} />
    </div>
  );
}
