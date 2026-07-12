export const PRODUCT_SUBCATEGORIES = {
  window: ['sliding-windows', 'casement-windows', 'fixed-windows', 'bay-windows'],
  door: ['sliding-doors', 'casement-doors', 'french-doors', 'folding-doors'],
} as const;

export const FAQ_CATEGORIES = [
  'installation',
  'warranty',
  'pricing',
  'maintenance',
  'delivery',
  'general',
] as const;

export const COMPANY_INFO = {
  name: 'Savista',
  tagline: 'Precision uPVC Solutions',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  email: 'hello@savista.in',
  address: 'Plot 42, Industrial Estate, Sector 18, Gurugram, Haryana 122015',
  businessHours: 'Mon – Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 4:00 PM',
  social: {
    facebook: 'https://facebook.com/savistaupvc',
    instagram: 'https://instagram.com/savistaupvc',
    linkedin: 'https://linkedin.com/company/savistaupvc',
    youtube: 'https://youtube.com/@savistaupvc',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.0266383!3d28.4594965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf0576f25230900!2sCyber%20Hub%2C%20DLF%20Cyber%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
} as const;
