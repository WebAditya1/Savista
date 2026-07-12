import axios from 'axios';
import type {
  Product,
  Category,
  GalleryItem,
  Testimonial,
  FAQ,
  DashboardStats,
  ApiResponse,
  PaginatedResponse,
} from '../../../shared/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export const productApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Product>>('/products', { params }).then((r) => r.data),
  getBySlug: (slug: string) =>
    api.get<ApiResponse<Product>>(`/products/slug/${slug}`).then((r) => r.data),
};

export const categoryApi = {
  getAll: () => api.get<PaginatedResponse<Category>>('/categories').then((r) => r.data),
};

export const galleryApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<GalleryItem>>('/gallery', { params }).then((r) => r.data),
};

export const testimonialApi = {
  getAll: () => api.get<PaginatedResponse<Testimonial>>('/testimonials').then((r) => r.data),
};

export const faqApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<FAQ>>('/faqs', { params }).then((r) => r.data),
};

export const contactApi = {
  submit: (data: {
    name: string;
    phone: string;
    email: string;
    city: string;
    requirement: string;
    message: string;
  }) => api.post<ApiResponse<{ id: string }>>('/contact', data).then((r) => r.data),
};

export const orderApi = {
  submit: (data: {
    name: string;
    phone: string;
    email: string;
    city: string;
    items: {
      productId: string;
      productName: string;
      quantity: number;
      width?: string;
      height?: string;
      requirements?: string;
    }[];
    referenceImage?: string;
    additionalNotes?: string;
  }) => api.post<ApiResponse<{ id: string }>>('/orders', data).then((r) => r.data),
};

export const adminApi = {
  getDashboard: (apiKey: string) =>
    api
      .get<ApiResponse<DashboardStats>>('/admin/dashboard', {
        headers: { 'X-Api-Key': apiKey },
      })
      .then((r) => r.data),
};

export default api;
