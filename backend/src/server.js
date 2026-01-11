
import express from 'express';
import dotenv from 'dotenv';

import wallRouter from './routes/wallRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

// Load .env file
dotenv.config();

// Create an express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());           // enable JSON body parsing
app.use(rateLimiter);              // add rate limiter
app.use("/api/wall", wallRouter);  // mount the api routes

// Connect to the MongoDB database
connectDB().then(() => {
    // Start listening for requests
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
