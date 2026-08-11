import { Star } from 'lucide-react';
import { Review } from '../../types/tool';

interface ReviewListProps {
  reviews: Review[];
}

function formatReviewDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-slate-500 italic">
        No approved reviews yet. Be the first to share your experience.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2"
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">{review.authorName}</span>
              {review.verifiedUser && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              )}
            </div>
            <time className="text-xs text-slate-400" dateTime={review.date}>
              {formatReviewDate(review.date)}
            </time>
          </div>

          <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`w-3.5 h-3.5 ${
                  value <= review.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>

          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
