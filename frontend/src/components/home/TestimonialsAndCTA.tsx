import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { GalleryHoverCard } from '@/components/ui/GalleryHoverCard';
import { testimonialApi, galleryApi } from '@/services/api';
import type { Testimonial, GalleryItem } from '../../../../shared/types';
import { Button } from '@/components/ui/Button';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { _id: '1', name: 'Rajesh Sharma', role: 'Homeowner', city: 'Delhi', content: 'Savista transformed our home. The sliding doors are stunning and the installation was flawless.', rating: 5, featured: true },
  { _id: '2', name: 'Priya Mehta', role: 'Architect', city: 'Mumbai', content: 'I specify Savista for all my premium residential projects. Quality and finish are consistently excellent.', rating: 5, featured: true },
  { _id: '3', name: 'Vikram Singh', role: 'Builder', city: 'Bangalore', content: 'Reliable partner for our 200+ unit project. On-time delivery and professional support throughout.', rating: 5, featured: true },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    testimonialApi.getAll().then((res) => {
      if (res.data?.length) setTestimonials(res.data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">What Our Clients Say</h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div key={t._id} variants={staggerItem} className="card-premium p-8 relative">
              <Quote className="w-8 h-8 text-brand-200 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">"{t.content}"</p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role} · {t.city}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function GalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    galleryApi.getAll({ featured: 'true', limit: '6' }).then((res) => {
      if (res.data?.length) setItems(res.data);
    }).catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <FadeIn className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Project Gallery</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((item) => (
            <motion.div key={item._id} variants={staggerItem}>
              <GalleryHoverCard title={item.title} image={item.image} />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="section-padding">
      <FadeIn>
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-700 via-brand-600 to-accent-500 px-8 py-16 md:px-16 md:py-20 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="text-white/75 mb-8">
                Get a free consultation and customized quote for your dream doors and windows.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button to="/inquiry" className="bg-white text-brand-600 hover:bg-white/90 shadow-none">
                  Request Free Quote
                </Button>
                <Button to="/contact" variant="secondary">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
