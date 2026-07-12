import { Response } from 'express';
import { ContactRequest } from '../models/ContactRequest.js';
import { OrderRequest } from '../models/OrderRequest.js';

export async function getDashboardStats(_req: unknown, res: Response): Promise<void> {
  const [totalContacts, totalOrders, recentContacts, recentOrders] = await Promise.all([
    ContactRequest.countDocuments(),
    OrderRequest.countDocuments(),
    ContactRequest.find().sort({ createdAt: -1 }).limit(5),
    OrderRequest.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.json({
    success: true,
    data: { totalContacts, totalOrders, recentContacts, recentOrders },
  });
}
