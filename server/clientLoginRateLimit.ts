export class ClientLoginRateLimiter {
  private readonly windows = new Map<string, { attempts: number; resetAt: number }>();

  constructor(
    private readonly lockoutMs: number,
    private readonly maxFailures: number,
  ) {}

  isLimited(key: string, now = Date.now()): boolean {
    const window = this.windows.get(key);
    if (!window) return false;
    if (window.resetAt <= now) {
      this.windows.delete(key);
      return false;
    }
    return window.attempts >= this.maxFailures;
  }

  recordFailure(key: string, now = Date.now()): void {
    const window = this.windows.get(key);
    if (!window || window.resetAt <= now) {
      this.windows.set(key, { attempts: 1, resetAt: now + this.lockoutMs });
      return;
    }
    window.attempts += 1;
  }

  clear(key: string): void {
    this.windows.delete(key);
  }
}
