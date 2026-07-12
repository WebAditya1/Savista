import { Request, Response } from 'express';
import { ContactRequest } from '../models/ContactRequest.js';
import { sendEmail } from '../utils/mailer.js';
import { contactAdminEmail, contactAckEmail } from '../utils/emailTemplates.js';

export async function submitContact(req: Request, res: Response): Promise<void> {
  const { name, phone, email, city, requirement, message } = req.body;

  const contact = await ContactRequest.create({
    name,
    phone,
    email,
    city,
    requirement,
    message,
  });

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  await Promise.all([
    adminEmail
      ? sendEmail({
          to: adminEmail,
          subject: `New Contact: ${name} — ${requirement}`,
          html: contactAdminEmail({ name, phone, email, city, requirement, message }),
        })
      : Promise.resolve(false),
    sendEmail({
      to: email,
      subject: 'Thank you for contacting Savista',
      html: contactAckEmail(name),
    }),
  ]);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been submitted successfully',
    data: { id: contact._id },
  });
}

export async function getContacts(req: Request, res: Response): Promise<void> {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    ContactRequest.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    ContactRequest.countDocuments(),
  ]);

  res.json({
    success: true,
    data,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function updateContactStatus(req: Request, res: Response): Promise<void> {
  const contact = await ContactRequest.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!contact) {
    res.status(404).json({ success: false, error: 'Not found' });
    return;
  }
  res.json({ success: true, data: contact });
}
