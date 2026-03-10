
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // load environment variables

export default async function connectDB() {
    try {
        const MONGO_URI = process.env.MONGO_URI;  // fetch from environment variables
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    }

    catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}
