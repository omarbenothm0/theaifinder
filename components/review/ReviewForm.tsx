'use client';

import React, { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';

interface ReviewFormProps {
  toolSlug: string;
  toolName: string;
}

export function ReviewForm({ toolSlug, toolName }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      setStatus('error');
      setMessage('Please select a rating from 1 to 5 stars.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug,
          rating,
          comment,
          authorName: authorName.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setStatus('success');
      setMessage('Thank you! Your review has been submitted and is pending moderation.');
      setRating(0);
      setAuthorName('');
      setEmail('');
      setComment('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Failed to submit review');
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t border-border/30 pt-6">
      <h3 className="text-sm font-bold text-foreground-strong">Write a Review for {toolName}</h3>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Your Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5 transition-transform hover:scale-110"
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={`w-6 h-6 ${
                  value <= displayRating
                    ? 'fill-rating text-rating'
                    : 'text-inverted-foreground/70'
                }`}
              />
            </button>
          ))}
          {displayRating > 0 && (
            <span className="text-xs text-muted-foreground ml-2">{displayRating}/5</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="review-name" className="block text-xs font-semibold text-muted-foreground mb-1.5">
            Display Name <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="review-name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={80}
            placeholder="Anonymous"
            className="w-full bg-background border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground-strong placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
        <div>
          <label htmlFor="review-email" className="block text-xs font-semibold text-muted-foreground mb-1.5">
            Email <span className="text-muted-foreground font-normal">(optional, never shown publicly)</span>
          </label>
          <input
            id="review-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={254}
            placeholder="you@example.com"
            className="w-full bg-background border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground-strong placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-xs font-semibold text-muted-foreground mb-1.5">
          Your Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minLength={10}
          maxLength={2000}
          rows={4}
          required
          placeholder="Share your experience with this tool (min 10 characters)..."
          className="w-full bg-background border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground-strong placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-y"
        />
        <p className="text-[10px] text-muted-foreground mt-1">{comment.length}/2000</p>
      </div>

      {message && (
        <p
          className={`text-xs font-medium ${
            status === 'success' ? 'text-success-foreground' : 'text-destructive'
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 bg-primary hover:bg-foreground/90 disabled:opacity-60 text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-xl transition-colors"
      >
        {status === 'submitting' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Submit Review
      </button>
    </form>
  );
}
