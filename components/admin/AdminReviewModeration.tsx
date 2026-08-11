'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  Flag,
  Trash2,
  Loader2,
  RefreshCw,
  MessageSquare,
  Star,
} from 'lucide-react';
import { Review, ReviewStatus } from '../../types/tool';

type StatusFilter = ReviewStatus | 'all';

interface AdminReviewModerationProps {
  initialPendingCount?: number;
}

const STATUS_LABELS: Record<ReviewStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  flagged: 'Flagged',
};

const STATUS_COLORS: Record<ReviewStatus, string> = {
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  rejected: 'bg-slate-100 text-slate-600 border-slate-200',
  flagged: 'bg-rose-50 text-rose-800 border-rose-200',
};

export function AdminReviewModeration({ initialPendingCount = 0 }: AdminReviewModerationProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pendingCount, setPendingCount] = useState(initialPendingCount);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [moderationNotes, setModerationNotes] = useState<Record<string, string>>({});

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/reviews?status=${statusFilter}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load reviews');
      setReviews(data.reviews ?? []);
      setPendingCount(data.pendingCount ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleModerate = async (id: string, action: 'approve' | 'reject' | 'flag') => {
    setActionId(id);
    setError('');
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          moderationNotes: moderationNotes[id]?.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Moderation failed');
      await fetchReviews();
      setExpandedId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Moderation failed');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Permanently delete this review? This cannot be undone.')) return;

    setActionId(id);
    setError('');
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      await fetchReviews();
      setExpandedId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            Review Moderation
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {pendingCount} review{pendingCount !== 1 ? 's' : ''} awaiting approval
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="flex-1 sm:flex-none bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="flagged">Flagged</option>
            <option value="all">All</option>
          </select>
          <button
            type="button"
            onClick={fetchReviews}
            disabled={loading}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-slate-500 italic py-8 text-center">
          No {statusFilter === 'all' ? '' : STATUS_LABELS[statusFilter as ReviewStatus]?.toLowerCase()}{' '}
          reviews found.
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => {
            const isExpanded = expandedId === review.id;
            const isBusy = actionId === review.id;

            return (
              <div
                key={review.id}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : review.id)}
                  className="w-full text-left p-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">
                          {review.toolName || review.toolSlug}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            STATUS_COLORS[review.status]
                          }`}
                        >
                          {STATUS_LABELS[review.status]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{review.authorName}</span>
                        <span className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((v) => (
                            <Star
                              key={v}
                              className={`w-3 h-3 ${
                                v <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </span>
                        <span>{review.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{review.comment}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {isExpanded ? 'Hide details' : 'View details'}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block">Tool</span>
                        <Link
                          href={`/tools/${review.toolSlug}`}
                          className="font-bold text-emerald-700 hover:underline"
                          target="_blank"
                        >
                          {review.toolName || review.toolSlug}
                        </Link>
                        <span className="block text-[10px] text-slate-400 font-mono">
                          /tools/{review.toolSlug}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block">Submitted</span>
                        <span className="font-medium text-slate-800">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleString()
                            : review.date}
                        </span>
                      </div>
                      {review.email && (
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 font-semibold block">
                            Email (admin only)
                          </span>
                          <span className="font-mono text-slate-800">{review.email}</span>
                        </div>
                      )}
                      {review.moderatedBy && (
                        <div>
                          <span className="text-slate-400 font-semibold block">Moderated by</span>
                          <span className="font-medium text-slate-800">{review.moderatedBy}</span>
                          {review.moderatedAt && (
                            <span className="block text-slate-500">
                              {new Date(review.moderatedAt).toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-slate-700 whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-100">
                      {review.comment}
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Moderation notes (optional)
                      </label>
                      <input
                        type="text"
                        value={moderationNotes[review.id] ?? review.moderationNotes ?? ''}
                        onChange={(e) =>
                          setModerationNotes((prev) => ({
                            ...prev,
                            [review.id]: e.target.value,
                          }))
                        }
                        placeholder="Internal note..."
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleModerate(review.id, 'approve')}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-3 py-2 rounded-lg"
                      >
                        {isBusy ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        Approve
                      </button>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleModerate(review.id, 'reject')}
                        className="inline-flex items-center gap-1.5 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 text-white font-bold text-xs px-3 py-2 rounded-lg"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleModerate(review.id, 'flag')}
                        className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-bold text-xs px-3 py-2 rounded-lg"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        Flag
                      </button>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleDelete(review.id)}
                        className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs px-3 py-2 rounded-lg ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
