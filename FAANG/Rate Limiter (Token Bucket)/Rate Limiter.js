/// rate limiter


class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const tokensToAdd =
      ((now - this.lastRefill) / 1000) * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  allowRequest() {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}

class RateLimiter {
  constructor() {
    this.users = new Map();
  }

  isAllowed(userId) {
    if (!this.users.has(userId)) {
      this.users.set(userId, new TokenBucket(10, 5));
    }
    return this.users.get(userId).allowRequest();
  }
}


