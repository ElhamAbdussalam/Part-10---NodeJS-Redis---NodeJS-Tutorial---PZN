import Redis from "ioredis";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

describe("redis", () => {
  let redis = null;

  beforeEach(async () => {
    redis = new Redis({
      host: "localhost",
      port: 6379,
      db: 0,
    });
  });

  afterEach(async () => {
    await redis.quit();
  });

  it("should can ping", async () => {
    const pong = await redis.ping();
    expect(pong).toBe("PONG");
  });

  it("should support string", async () => {
    await redis.setex("name", 2, "Eko");
    let name = await redis.get("name");
    expect(name).toBe("Eko");

    // sleep 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    name = await redis.get("name");
    expect(name).toBe(null);
  });
});
