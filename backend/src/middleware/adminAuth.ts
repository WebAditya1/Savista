import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';

export function adminAuth(req: Request, _res: Response, next: NextFunction): void {
  const apiKey = req.headers['x-api-key'] || req.headers.authorization?.replace('Bearer ', '');
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey || apiKey !== adminKey) {
    throw new AppError(401, 'Unauthorized');
  }
  next();
}
