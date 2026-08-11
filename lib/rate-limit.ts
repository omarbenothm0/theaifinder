type RateLimitEntry = { count: number; resetAt: number };

const store = new Map<string, RateLimitEntry>();

export type RateLimitConfig = {
  /** Unique namespace, e.g. "reviews" */
  key: string;
  /** Max requests per window */
  limit: number;
  /** Window size in seconds */
  windowSec: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Simple in-memory rate limiter.
 * Suitable for single-instance deployments; replace with Redis/Upstash at scale.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const storeKey = `${config.key}:${identifier}`;
  const existing = store.get(storeKey);

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + config.windowSec * 1000;
    store.set(storeKey, { count: 1, resetAt });
    return { allowed: true, remaining: config.limit - 1, resetAt };
  }

  if (existing.count >= config.limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  store.set(storeKey, existing);
  return {
    allowed: true,
    remaining: config.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

export function getClientIdentifier(
  request: Request,
  fallback = 'anonymous'
): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || fallback;
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return fallback;
}

export function rateLimitResponse(resetAt: number): Response {
  const retryAfterSec = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(retryAfterSec),
    },
  });
}
