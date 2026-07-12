import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/upvc-premium';
  try {
    await mongoose.connect(uri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection failed', { error });
    process.exit(1);
  }
}
