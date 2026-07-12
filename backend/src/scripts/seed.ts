import 'dotenv/config';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Gallery } from '../models/Gallery.js';
import { Testimonial } from '../models/Testimonial.js';
import { FAQ } from '../models/FAQ.js';
import { connectDB } from '../config/database.js';

const IMG = {
  slidingWindow:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  casementWindow:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  fixedWindow:
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  bayWindow:
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
  slidingDoor:
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  casementDoor:
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  frenchDoor:
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
  foldingDoor:
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  factory:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  hero: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1920&q=80',
};

const categories = [
  { name: 'Sliding Windows', slug: 'sliding-windows', type: 'window', description: 'Smooth sliding UPVC windows', order: 1 },
  { name: 'Casement Windows', slug: 'casement-windows', type: 'window', description: 'Classic hinged casement windows', order: 2 },
  { name: 'Fixed Windows', slug: 'fixed-windows', type: 'window', description: 'Fixed picture windows', order: 3 },
  { name: 'Bay Windows', slug: 'bay-windows', type: 'window', description: 'Elegant bay window designs', order: 4 },
  { name: 'Sliding Doors', slug: 'sliding-doors', type: 'door', description: 'Space-saving sliding doors', order: 5 },
  { name: 'Casement Doors', slug: 'casement-doors', type: 'door', description: 'Secure casement door systems', order: 6 },
  { name: 'French Doors', slug: 'french-doors', type: 'door', description: 'Elegant French door designs', order: 7 },
  { name: 'Folding Doors', slug: 'folding-doors', type: 'door', description: 'Bi-fold folding door systems', order: 8 },
];

const products = [
  {
    name: 'Premium Sliding Window',
    slug: 'premium-sliding-window',
    category: 'window',
    subcategory: 'sliding-windows',
    shortDescription: 'Smooth-gliding UPVC windows with multi-point locking.',
    description:
      'Our premium sliding windows feature reinforced UPVC profiles, double-glazed units, and whisper-quiet rollers. Perfect for balconies, bedrooms, and living spaces.',
    image: IMG.slidingWindow,
    gallery: [IMG.slidingWindow, IMG.casementWindow],
    specifications: [
      { label: 'Profile', value: 'Multi-chamber UPVC 2.5mm' },
      { label: 'U-Value', value: '1.4 W/m²K' },
      { label: 'Wind Load', value: 'Up to 2000 Pa' },
    ],
    sizes: [
      { width: '1200mm', height: '1200mm', label: 'Standard' },
      { width: '1800mm', height: '1500mm', label: 'Large' },
    ],
    frameMaterial: ['UPVC White', 'UPVC Woodgrain', 'UPVC Anthracite'],
    glassOptions: ['Single Glazed', 'Double Glazed', 'Triple Glazed', 'Laminated'],
    colorOptions: ['White', 'Ivory', 'Walnut', 'Anthracite Grey', 'Black'],
    hardwareOptions: ['Standard Handle', 'Premium Handle', 'Multi-point Lock'],
    applications: ['Residential', 'Commercial', 'High-rise'],
    features: ['Weather Resistant', 'Sound Insulation', 'Energy Efficient', 'Low Maintenance'],
    featured: true,
    order: 1,
  },
  {
    name: 'Classic Casement Window',
    slug: 'classic-casement-window',
    category: 'window',
    subcategory: 'casement-windows',
    shortDescription: 'Outward-opening casement windows with superior ventilation.',
    description:
      'Engineered for maximum airflow and security, our casement windows open outward with friction stays and espagnolette locking.',
    image: IMG.casementWindow,
    gallery: [IMG.casementWindow],
    specifications: [
      { label: 'Profile', value: 'Reinforced UPVC 2.8mm' },
      { label: 'Opening', value: 'Outward / Tilt-Turn' },
    ],
    sizes: [{ width: '900mm', height: '1200mm', label: 'Standard' }],
    frameMaterial: ['UPVC White', 'UPVC Woodgrain'],
    glassOptions: ['Double Glazed', 'Triple Glazed'],
    colorOptions: ['White', 'Walnut', 'Anthracite Grey'],
    hardwareOptions: ['Friction Stay', 'Espagnolette Lock'],
    applications: ['Residential', 'Villas'],
    features: ['Superior Ventilation', 'Multi-point Security', 'Thermal Break'],
    featured: true,
    order: 2,
  },
  {
    name: 'Picture Fixed Window',
    slug: 'picture-fixed-window',
    category: 'window',
    subcategory: 'fixed-windows',
    shortDescription: 'Uninterrupted views with fixed UPVC frames.',
    description: 'Large fixed windows designed to maximize natural light and panoramic views.',
    image: IMG.fixedWindow,
    gallery: [IMG.fixedWindow],
    specifications: [{ label: 'Type', value: 'Fixed Non-Opening' }],
    sizes: [{ width: '2400mm', height: '1800mm', label: 'Panoramic' }],
    frameMaterial: ['UPVC White', 'UPVC Anthracite'],
    glassOptions: ['Double Glazed', 'Laminated Safety'],
    colorOptions: ['White', 'Anthracite Grey', 'Black'],
    hardwareOptions: ['N/A'],
    applications: ['Living Rooms', 'Offices', 'Showrooms'],
    features: ['Maximum Light', 'Structural Strength', 'Acoustic Performance'],
    featured: false,
    order: 3,
  },
  {
    name: 'Elegant Bay Window',
    slug: 'elegant-bay-window',
    category: 'window',
    subcategory: 'bay-windows',
    shortDescription: 'Architectural bay windows that add character and space.',
    description: 'Custom bay window configurations with optional seating ledge and reinforced structural support.',
    image: IMG.bayWindow,
    gallery: [IMG.bayWindow],
    specifications: [{ label: 'Configuration', value: '3-5 Panel Bay' }],
    sizes: [{ width: '3000mm', height: '1500mm', label: 'Custom' }],
    frameMaterial: ['UPVC White', 'UPVC Woodgrain'],
    glassOptions: ['Double Glazed', 'Decorative Glazing'],
    colorOptions: ['White', 'Walnut', 'Ivory'],
    hardwareOptions: ['Casement + Fixed Combo'],
    applications: ['Heritage Homes', 'Modern Villas'],
    features: ['Custom Design', 'Added Interior Space', 'Premium Finish'],
    featured: true,
    order: 4,
  },
  {
    name: 'Slimline Sliding Door',
    slug: 'slimline-sliding-door',
    category: 'door',
    subcategory: 'sliding-doors',
    shortDescription: 'Ultra-slim profiles for seamless indoor-outdoor living.',
    description: 'Floor-to-ceiling sliding doors with minimal sightlines and heavy-duty rollers for effortless operation.',
    image: IMG.slidingDoor,
    gallery: [IMG.slidingDoor],
    specifications: [{ label: 'Max Panel', value: '3.2m × 2.7m' }],
    sizes: [{ width: '3000mm', height: '2400mm', label: 'Standard' }],
    frameMaterial: ['UPVC Reinforced', 'Aluminium Clad UPVC'],
    glassOptions: ['Double Glazed', 'Low-E Coated'],
    colorOptions: ['White', 'Anthracite Grey', 'Black'],
    hardwareOptions: ['Soft-Close Rollers', 'Multi-point Lock'],
    applications: ['Patios', 'Terraces', 'Pool Areas'],
    features: ['Slim Sightlines', 'Smooth Operation', 'Weather Sealed'],
    featured: true,
    order: 5,
  },
  {
    name: 'Secure Casement Door',
    slug: 'secure-casement-door',
    category: 'door',
    subcategory: 'casement-doors',
    shortDescription: 'Heavy-duty casement doors with reinforced security.',
    description: 'Outward-opening casement doors with steel reinforcement and multi-point locking for maximum security.',
    image: IMG.casementDoor,
    gallery: [IMG.casementDoor],
    specifications: [{ label: 'Security', value: 'RC2 Rated' }],
    sizes: [{ width: '900mm', height: '2100mm', label: 'Standard Entry' }],
    frameMaterial: ['Steel Reinforced UPVC'],
    glassOptions: ['Double Glazed', 'Laminated'],
    colorOptions: ['White', 'Walnut', 'Anthracite Grey'],
    hardwareOptions: ['3-Point Lock', 'Anti-Lift Hinges'],
    applications: ['Main Entrance', 'Side Entry'],
    features: ['High Security', 'Thermal Insulation', 'Durable'],
    featured: false,
    order: 6,
  },
  {
    name: 'Designer French Door',
    slug: 'designer-french-door',
    category: 'door',
    subcategory: 'french-doors',
    shortDescription: 'Timeless French doors with elegant glazing bars.',
    description: 'Double-leaf French doors that bring elegance and abundant natural light to any space.',
    image: IMG.frenchDoor,
    gallery: [IMG.frenchDoor],
    specifications: [{ label: 'Style', value: 'Georgian / Colonial Bars' }],
    sizes: [{ width: '1800mm', height: '2100mm', label: 'Standard Pair' }],
    frameMaterial: ['UPVC White', 'UPVC Woodgrain'],
    glassOptions: ['Double Glazed', 'Decorative'],
    colorOptions: ['White', 'Ivory', 'Walnut'],
    hardwareOptions: ['Mortice Lock', 'Premium Handles'],
    applications: ['Garden Access', 'Balconies', 'Interiors'],
    features: ['Classic Design', 'Wide Opening', 'Premium Hardware'],
    featured: true,
    order: 7,
  },
  {
    name: 'Bi-Fold Folding Door',
    slug: 'bi-fold-folding-door',
    category: 'door',
    subcategory: 'folding-doors',
    shortDescription: 'Space-transforming bi-fold doors for open-plan living.',
    description: 'Multi-panel folding doors that stack neatly to one side, creating a seamless transition between indoors and outdoors.',
    image: IMG.foldingDoor,
    gallery: [IMG.foldingDoor],
    specifications: [{ label: 'Panels', value: '2-7 Panel Configurations' }],
    sizes: [{ width: '4800mm', height: '2400mm', label: 'Wide Opening' }],
    frameMaterial: ['Aluminium Clad UPVC'],
    glassOptions: ['Double Glazed', 'Triple Glazed'],
    colorOptions: ['White', 'Anthracite Grey', 'Black'],
    hardwareOptions: ['Top-Hung Track', 'Soft-Close'],
    applications: ['Conservatories', 'Restaurants', 'Luxury Homes'],
    features: ['Full Opening', 'Premium Track System', 'Weather Proof'],
    featured: true,
    order: 8,
  },
];

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Homeowner', city: 'Delhi', content: 'Savista transformed our home. The sliding doors are stunning and the installation was flawless.', rating: 5, featured: true },
  { name: 'Priya Mehta', role: 'Architect', city: 'Mumbai', content: 'I specify Savista for all my premium residential projects. Quality and finish are consistently excellent.', rating: 5, featured: true },
  { name: 'Vikram Singh', role: 'Builder', city: 'Bangalore', content: 'Reliable partner for our 200+ unit project. On-time delivery and professional support throughout.', rating: 5, featured: true },
];

const faqs = [
  { question: 'How long does installation take?', answer: 'Standard installation takes 1-2 days per home depending on the number of units. We provide a detailed timeline during consultation.', category: 'installation', order: 1 },
  { question: 'What warranty do you offer?', answer: 'We provide a 10-year warranty on UPVC profiles and 5-year warranty on hardware and installation workmanship.', category: 'warranty', order: 2 },
  { question: 'How much do UPVC windows cost?', answer: 'Pricing depends on size, glass type, and hardware. Contact us for a free customized quotation based on your requirements.', category: 'pricing', order: 3 },
  { question: 'How do I maintain UPVC windows?', answer: 'Simply wipe with mild soap and water quarterly. No painting or polishing required. Lubricate hinges annually.', category: 'maintenance', order: 4 },
  { question: 'What is the delivery timeline?', answer: 'Manufacturing typically takes 2-3 weeks after final measurements. Delivery and installation are scheduled together.', category: 'delivery', order: 5 },
];

async function seed() {
  await connectDB();

  const existing = await Product.countDocuments();
  if (process.env.SEED_IF_EMPTY === 'true' && existing > 0) {
    console.log('⏭️  Database already has data — skipping seed (SEED_IF_EMPTY=true)');
    await mongoose.disconnect();
    return;
  }

  await Promise.all([
    Product.deleteMany({}),
    Category.deleteMany({}),
    Gallery.deleteMany({}),
    Testimonial.deleteMany({}),
    FAQ.deleteMany({}),
  ]);

  await Category.insertMany(categories);
  await Product.insertMany(products);
  await Testimonial.insertMany(testimonials);
  await FAQ.insertMany(faqs);

  const galleryItems = [
    ...products.slice(0, 6).map((p, i) => ({
      title: p.name,
      image: p.image,
      category: p.category,
      featured: i < 4,
      order: i,
    })),
    { title: 'Manufacturing Facility', image: IMG.factory, category: 'factory', featured: true, order: 10 },
  ];
  await Gallery.insertMany(galleryItems);

  console.log('✅ Database seeded successfully');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
