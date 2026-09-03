import { describe, expect, it } from "vitest";
import { ClientLoginRateLimiter } from "./clientLoginRateLimit";

describe("ClientLoginRateLimiter", () => {
  it("does not penalize repeated valid sign-ins when successful attempts are cleared", () => {
    const limiter = new ClientLoginRateLimiter(15 * 60 * 1000, 5);
    limiter.recordFailure("gateway:amr.owner", 1_000);
    limiter.clear("gateway:amr.owner");
    limiter.clear("gateway:amr.owner");

    expect(limiter.isLimited("gateway:amr.owner", 1_500)).toBe(false);
  });

  it("blocks only after the configured number of failed attempts and resets after the window", () => {
    const limiter = new ClientLoginRateLimiter(1_000, 3);
    limiter.recordFailure("gateway:nabta.owner", 1_000);
    limiter.recordFailure("gateway:nabta.owner", 1_100);
    expect(limiter.isLimited("gateway:nabta.owner", 1_200)).toBe(false);
    limiter.recordFailure("gateway:nabta.owner", 1_300);

    expect(limiter.isLimited("gateway:nabta.owner", 1_400)).toBe(true);
    expect(limiter.isLimited("gateway:nabta.owner", 2_001)).toBe(false);
  });
});
