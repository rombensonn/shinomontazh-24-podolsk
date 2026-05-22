interface RateLimitBucket {
  count: number;
  resetAt: number;
}

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, RateLimitBucket>();

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const currentBucket = buckets.get(identifier);

  if (!currentBucket || currentBucket.resetAt <= now) {
    buckets.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (currentBucket.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((currentBucket.resetAt - now) / 1000),
    };
  }

  buckets.set(identifier, {
    ...currentBucket,
    count: currentBucket.count + 1,
  });

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}
