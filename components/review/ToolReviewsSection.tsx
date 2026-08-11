import { Star } from 'lucide-react';
import { dbRepository } from '../../lib/dbRepository';
import { ReviewList } from './ReviewList';
import { ReviewForm } from './ReviewForm';

interface ToolReviewsSectionProps {
  toolSlug: string;
  toolName: string;
}

export async function ToolReviewsSection({ toolSlug, toolName }: ToolReviewsSectionProps) {
  const reviews = await dbRepository.getApprovedReviewsForTool(toolSlug);
  const approvedCount = reviews.length;
  const aggregateRating =
    approvedCount > 0
      ? parseFloat(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / approvedCount).toFixed(1)
        )
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">User Reviews</h2>
        {approvedCount > 0 && aggregateRating > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{aggregateRating.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">
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
