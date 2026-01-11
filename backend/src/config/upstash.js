
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Add rate limiter to allow only 200 requests per minute
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(200, "60 s"),
});

// Export rate limiter
export default rateLimit;
