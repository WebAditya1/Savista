import { Request, Response } from 'express';
import { OrderRequest } from '../models/OrderRequest.js';
import { sendEmail } from '../utils/mailer.js';
import { orderAdminEmail, orderAckEmail } from '../utils/emailTemplates.js';

export async function submitOrder(req: Request, res: Response): Promise<void> {
  const { name, phone, email, city, items, referenceImage, additionalNotes } = req.body;

  const order = await OrderRequest.create({
    name,
    phone,
    email,
    city,
    items,
    referenceImage,
    additionalNotes,
  });

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  await Promise.all([
    adminEmail
      ? sendEmail({
          to: adminEmail,
          subject: `New Order Inquiry: ${name} — ${items.length} item(s)`,
          html: orderAdminEmail({ name, phone, email, city, items, additionalNotes }),
        })
      : Promise.resolve(false),
    sendEmail({
      to: email,
      subject: 'Your Savista Inquiry Confirmation',
      html: orderAckEmail(name, items.length),
    }),
  ]);

  res.status(201).json({
    success: true,
    message: 'Your order inquiry has been submitted successfully',
    data: { id: order._id },
  });
}

export async function getOrders(req: Request, res: Response): Promise<void> {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    OrderRequest.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    OrderRequest.countDocuments(),
  ]);

  res.json({
    success: true,
    data,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function updateOrderStatus(req: Request, res: Response): Promise<void> {
  const order = await OrderRequest.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!order) {
    res.status(404).json({ success: false, error: 'Not found' });
    return;
  }
  res.json({ success: true, data: order });
}
