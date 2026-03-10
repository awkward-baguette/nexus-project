
import rateLimit from "../lib/upstash.js";

export default async function rateLimiter(_, res, next) {
    try {
        // Limits how often the endpoint can be called
        const { success } = await rateLimit.limit("limit-key");

        if (!success) {
            res.status(429).json({
                message: "Too many requests",
            });
        }

        next();
    }

    catch (error) {
        console.log(`Rate limit error: ${error}`);
        next(error);
    }
}
