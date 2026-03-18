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

  // it("should support set data structure", async () => {
  //   await redis.sadd("names", "Muhammad");
  //   await redis.sadd("names", "Muhammad");
  //   await redis.sadd("names", "Elham");
  //   await redis.sadd("names", "Elham");
  //   await redis.sadd("names", "Abdussalam");
  //   await redis.sadd("names", "Abdussalam");

  //   expect(await redis.scard("names")).toBe(3);
  //   const names = await redis.smembers("names");
  //   expect(names).toEqual(["Muhammad", "Elham", "Abdussalam"]);

  //   await redis.del("names");
  // });

  // it("should support sorted set", async () => {
  //   await redis.zadd("names", 100, "Eko");
  //   await redis.zadd("names", 85, "Budi");
  //   await redis.zadd("names", 95, "Joko");

  //   expect(await redis.zcard("names")).toBe(3);
  //   const names = await redis.zrange("names", 0, -1);
  //   expect(names).toEqual(["Budi", "Joko", "Eko"]);

  //   expect(await redis.zpopmax("names")).toEqual(["Eko", "100"]);
  //   expect(await redis.zpopmax("names")).toEqual(["Joko", "95"]);
  //   expect(await redis.zpopmax("names")).toEqual(["Budi", "85"]);

  //   await redis.del("names");
  // });

  // it("should support hash", async () => {
  //   await redis.hset("user:1", {
  //     id: "1",
  //     name: "Eko",
  //     email: "eko@example.com",
  //   });

  //   const user = await redis.hgetall("user:1");
  //   expect(user).toEqual({
  //     id: "1",
  //     name: "Eko",
  //     email: "eko@example.com",
  //   });

  //   await redis.del("user:1");
  // });

  // it("should support geo point", async () => {
  //   await redis.geoadd("sellers", 106.822702, -6.17759, "Toko A");
  //   await redis.geoadd("sellers", 106.820889, -6.174964, "Toko B");

  //   const distance = await redis.geodist("sellers", "Toko A", "Toko B", "KM");
  //   expect(distance).toBe(String(0.3543));

  //   const result = await redis.geosearch(
  //     "sellers",
  //     "fromlonlat",
  //     106.821825,
  //     -6.175105,
  //     "byradius",
  //     5,
  //     "km",
  //   );
  //   expect(result).toEqual(["Toko A", "Toko B"]);
  // });

  // it("should support hyper log log", async () => {
  //   await redis.pfadd("visitors", "muhammad", "elham", "abdussalam");
  //   await redis.pfadd("visitors", "eko", "budi", "joko");
  //   await redis.pfadd("visitors", "budi", "joko", "rully");

  //   const total = await redis.pfcount("visitors");
  //   expect(total).toBe(7);
  // });

  // it("should support pipeline", async () => {
  //   const pipeline = redis.pipeline();

  //   pipeline.setex("name", 2, "Eko");
  //   pipeline.setex("address", 2, "Indonesia");

  //   await pipeline.exec();

  //   expect(await redis.get("name")).toBe("Eko");
  //   expect(await redis.get("address")).toBe("Indonesia");
  // });

  // it("should support transaction", async () => {
  //   const transaction = redis.multi();

  //   transaction.setex("name", 2, "Eko");
  //   transaction.setex("address", 2, "Indonesia");

  //   await transaction.exec();

  //   expect(await redis.get("name")).toBe("Eko");
  //   expect(await redis.get("address")).toBe("Indonesia");
  // });

  // it("should support publish stream", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     await redis.xadd(
  //       "members",
  //       "*",
  //       "name",
  //       `Eko ${i}`,
  //       "address",
  //       "Indonesia",
  //     );
  //   }
  // });

  // it("should support customer group stream", async () => {
  //   await redis.del("members");

  //   await redis.xgroup("CREATE", "members", "group-1", "0", "MKSTREAM");
  //   await redis.xgroup("CREATECONSUMER", "members", "group-1", "consumer-1");
  //   await redis.xgroup("CREATECONSUMER", "members", "group-1", "consumer-2");
  // });

  // it("should can consume stream", async () => {
  //   await redis.del("members");

  //   // bikin stream + group
  //   await redis.xgroup("CREATE", "members", "group-1", "0", "MKSTREAM");

  //   // tambahkan data ke stream
  //   await redis.xadd("members", "*", "name", "elham");
  //   await redis.xadd("members", "*", "name", "budi");

  //   const result = await redis.xreadgroup(
  //     "GROUP",
  //     "group-1",
  //     "consumer-1",
  //     "COUNT",
  //     2,
  //     "BLOCK",
  //     3000,
  //     "STREAMS",
  //     "members",
  //     ">",
  //   );

  //   expect(result).not.toBeNull();
  //   console.info(JSON.stringify(result, null, 2));
  // });

  it("should can subscribe pubsub", async () => {
    redis.subscribe("channel-1");
    redis.on("message", (channel, message) => {
      console.info(`Message from channel ${channel}: ${message}`);
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }, 5000);
});
