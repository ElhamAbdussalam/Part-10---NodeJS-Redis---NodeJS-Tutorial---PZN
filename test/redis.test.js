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

  // it("should support string", async () => {
  //   await redis.setex("name", 2, "Eko");
  //   let name = await redis.get("name");
  //   expect(name).toBe("Eko");

  //   // sleep 5 seconds
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   name = await redis.get("name");
  //   expect(name).toBe(null);
  // });

  // it("should support list data structure", async () => {
  //   await redis.del("names"); // 🔥 reset dulu

  //   await redis.rpush("names", "Elham");
  //   await redis.rpush("names", "Abdussalam");
  //   await redis.rpush("names", "Muhammad");

  //   expect(await redis.llen("names")).toBe(3);
  //   const names = await redis.lrange("names", 0, -1);
  //   expect(names).toEqual(["Elham", "Abdussalam", "Muhammad"]);

  //   expect(await redis.lpop("names")).toBe("Elham");
  //   expect(await redis.rpop("names")).toBe("Muhammad");
  //   expect(await redis.llen("names")).toBe(1);

  //   await redis.del("names");
  // });

  it("should support set data structure", async () => {
    await redis.sadd("names", "Muhammad");
    await redis.sadd("names", "Muhammad");
    await redis.sadd("names", "Elham");
    await redis.sadd("names", "Elham");
    await redis.sadd("names", "Abdussalam");
    await redis.sadd("names", "Abdussalam");

    expect(await redis.scard("names")).toBe(3);
    const names = await redis.smembers("names");
    expect(names).toEqual(["Muhammad", "Elham", "Abdussalam"]);

    await redis.del("names");
  });
});
