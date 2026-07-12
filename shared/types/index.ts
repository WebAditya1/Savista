export type ProductCategory = 'door' | 'window';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductSize {
  width: string;
  height: string;
  label: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  specifications: ProductSpec[];
  sizes: ProductSize[];
  frameMaterial: string[];
  glassOptions: string[];
  colorOptions: string[];
  hardwareOptions: string[];
  applications: string[];
  features: string[];
  brochureUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  type: ProductCategory;
  description: string;
  image?: string;
  order: number;
}

export interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  featured: boolean;
  order: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  city: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: 'installation' | 'warranty' | 'pricing' | 'maintenance' | 'delivery' | 'general';
  order: number;
}

export interface ContactRequest {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  requirement: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  width?: string;
  height?: string;
  requirements?: string;
}

export interface OrderRequest {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  items: OrderItem[];
  referenceImage?: string;
  additionalNotes?: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DashboardStats {
  totalContacts: number;
  totalOrders: number;
  recentContacts: ContactRequest[];
  recentOrders: OrderRequest[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
