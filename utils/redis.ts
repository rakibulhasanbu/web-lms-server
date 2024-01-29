require("dotenv").config();
import { Redis } from "ioredis";

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log(`Redis database connected successfully`);
    return process.env.REDIS_URL;
  }
  throw new Error("Redis database connection failed");
};

export const redis = new Redis(redisClient());
