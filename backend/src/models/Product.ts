import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: 'door' | 'window';
  subcategory: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  specifications: { label: string; value: string }[];
  sizes: { width: string; height: string; label: string }[];
  frameMaterial: string[];
  glassOptions: string[];
  colorOptions: string[];
  hardwareOptions: string[];
  applications: string[];
  features: string[];
  brochureUrl?: string;
  featured: boolean;
  order: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, enum: ['door', 'window'], required: true },
    subcategory: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    specifications: [{ label: String, value: String }],
    sizes: [{ width: String, height: String, label: String }],
    frameMaterial: [String],
    glassOptions: [String],
    colorOptions: [String],
    hardwareOptions: [String],
    applications: [String],
    features: [String],
    brochureUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ slug: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
