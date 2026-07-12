import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  width?: string;
  height?: string;
  requirements?: string;
}

export interface IOrderRequest extends Document {
  name: string;
  phone: string;
  email: string;
  city: string;
  items: IOrderItem[];
  referenceImage?: string;
  additionalNotes?: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
}

const orderSchema = new Schema<IOrderRequest>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    items: [
      {
        productId: String,
        productName: String,
        quantity: Number,
        width: String,
        height: String,
        requirements: String,
      },
    ],
    referenceImage: String,
    additionalNotes: String,
    status: {
      type: String,
      enum: ['new', 'processing', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const OrderRequest = mongoose.model<IOrderRequest>('OrderRequest', orderSchema);
