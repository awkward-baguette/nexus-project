
import rateLimit from "../config/upstash.js";

// Rate limiter middleware function
export default async function rateLimiter(req, res, next) {
    try {
        // Limits how often the endpoint can be called
        const { success } = await rateLimit.limit("limit-key");

        // Return 429 error response if rate limit is exceeded
        if (!success) {
            res.status(429).json({
                message: "Too many requests",
            });
        }

        // Continue to the next middleware if rate limit isn't exceeded
        next();
    }

    // Error handling for rate limit errors
    catch (error) {
        console.log(`Rate limit error: ${error}`);
        next(error);
    }
}
