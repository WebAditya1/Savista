import { Router } from 'express';
import { createCrudController } from '../controllers/crudController.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Gallery } from '../models/Gallery.js';
import { Testimonial } from '../models/Testimonial.js';
import { FAQ } from '../models/FAQ.js';
import { submitContact, getContacts, updateContactStatus } from '../controllers/contactController.js';
import { submitOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { validate } from '../middleware/validate.js';
import { adminAuth } from '../middleware/adminAuth.js';
import {
  contactSchema,
  orderSchema,
  productSchema,
  categorySchema,
  gallerySchema,
  testimonialSchema,
  faqSchema,
} from '../validators/schemas.js';

const productCtrl = createCrudController(Product);
const categoryCtrl = createCrudController(Category);
const galleryCtrl = createCrudController(Gallery);
const testimonialCtrl = createCrudController(Testimonial);
const faqCtrl = createCrudController(FAQ);

const router = Router();

// Public routes
router.get('/products', productCtrl.getAll);
router.get('/products/slug/:slug', productCtrl.getBySlug);
router.get('/products/:id', productCtrl.getById);
router.get('/categories', categoryCtrl.getAll);
router.get('/gallery', galleryCtrl.getAll);
router.get('/testimonials', testimonialCtrl.getAll);
router.get('/faqs', faqCtrl.getAll);

router.post('/contact', validate(contactSchema), submitContact);
router.post('/orders', validate(orderSchema), submitOrder);

// Admin routes
router.use('/admin', adminAuth);

router.get('/admin/dashboard', getDashboardStats);

router.get('/admin/products', productCtrl.getAll);
router.post('/admin/products', validate(productSchema), productCtrl.create);
router.put('/admin/products/:id', productCtrl.update);
router.delete('/admin/products/:id', productCtrl.remove);

router.get('/admin/categories', categoryCtrl.getAll);
router.post('/admin/categories', validate(categorySchema), categoryCtrl.create);
router.put('/admin/categories/:id', categoryCtrl.update);
router.delete('/admin/categories/:id', categoryCtrl.remove);

router.get('/admin/gallery', galleryCtrl.getAll);
router.post('/admin/gallery', validate(gallerySchema), galleryCtrl.create);
router.put('/admin/gallery/:id', galleryCtrl.update);
router.delete('/admin/gallery/:id', galleryCtrl.remove);

router.get('/admin/testimonials', testimonialCtrl.getAll);
router.post('/admin/testimonials', validate(testimonialSchema), testimonialCtrl.create);
router.put('/admin/testimonials/:id', testimonialCtrl.update);
router.delete('/admin/testimonials/:id', testimonialCtrl.remove);

router.get('/admin/faqs', faqCtrl.getAll);
router.post('/admin/faqs', validate(faqSchema), faqCtrl.create);
router.put('/admin/faqs/:id', faqCtrl.update);
router.delete('/admin/faqs/:id', faqCtrl.remove);

router.get('/admin/contacts', getContacts);
router.patch('/admin/contacts/:id', updateContactStatus);

router.get('/admin/orders', getOrders);
router.patch('/admin/orders/:id', updateOrderStatus);

export default router;
