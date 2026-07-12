import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { COMPANY } from '@/utils/constants';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1920&q=80';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Modern home with premium UPVC windows"
          className="w-full h-full object-cover scale-110"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-700/80 to-brand-600/50" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative container-custom pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-accent-400 text-sm font-medium mb-6 border border-accent-500/30">
            Precision uPVC Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-6 text-balance">
            {COMPANY.tagline}
          </h1>
          <p className="text-lg text-white/75 mb-8 leading-relaxed max-w-xl">
            Transform your space with German-engineered UPVC doors and windows.
            Energy efficient, weather resistant, and built to last a lifetime.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button to="/products">
              Explore Products <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/inquiry" variant="secondary">
              Get Free Quote
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#why-us" className="flex flex-col items-center text-white/50 hover:text-white transition-colors" aria-label="Scroll down">
          <span className="text-xs mb-2 tracking-widest uppercase">Discover</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
