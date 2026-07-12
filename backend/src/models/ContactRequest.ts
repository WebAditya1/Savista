import mongoose, { Schema, Document } from 'mongoose';

export interface IContactRequest extends Document {
  name: string;
  phone: string;
  email: string;
  city: string;
  requirement: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
}

const contactSchema = new Schema<IContactRequest>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    requirement: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export const ContactRequest = mongoose.model<IContactRequest>('ContactRequest', contactSchema);
