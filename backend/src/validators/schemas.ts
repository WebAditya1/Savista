import { z } from 'zod';

export const contactSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    city: z.string().min(2).max(100),
    requirement: z.string().min(2).max(200),
    message: z.string().min(10).max(2000),
  }),
});

export const orderSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    city: z.string().min(2).max(100),
    items: z
      .array(
        z.object({
          productId: z.string(),
          productName: z.string(),
          quantity: z.number().min(1).max(100),
          width: z.string().optional(),
          height: z.string().optional(),
          requirements: z.string().optional(),
        })
      )
      .min(1),
    referenceImage: z.string().optional(),
    additionalNotes: z.string().max(2000).optional(),
  }),
});

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    category: z.enum(['door', 'window']),
    subcategory: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    image: z.string().url(),
    gallery: z.array(z.string()).optional(),
    specifications: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    sizes: z
      .array(z.object({ width: z.string(), height: z.string(), label: z.string() }))
      .optional(),
    frameMaterial: z.array(z.string()).optional(),
    glassOptions: z.array(z.string()).optional(),
    colorOptions: z.array(z.string()).optional(),
    hardwareOptions: z.array(z.string()).optional(),
    applications: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    brochureUrl: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    type: z.enum(['door', 'window']),
    description: z.string(),
    image: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const gallerySchema = z.object({
  body: z.object({
    title: z.string().min(2),
    image: z.string().url(),
    category: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

export const testimonialSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    role: z.string(),
    city: z.string(),
    content: z.string().min(10),
    rating: z.number().min(1).max(5).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const faqSchema = z.object({
  body: z.object({
    question: z.string().min(5),
    answer: z.string().min(10),
    category: z
      .enum(['installation', 'warranty', 'pricing', 'maintenance', 'delivery', 'general'])
      .optional(),
    order: z.number().optional(),
  }),
});

export const paginationSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    type: z.string().optional(),
  }),
});
