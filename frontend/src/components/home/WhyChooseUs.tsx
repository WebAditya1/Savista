import {
  Award, CloudRain, Zap, Wrench, Volume2, Clock,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US } from '@/utils/constants';

const ICON_MAP: Record<string, LucideIcon> = {
  Award, CloudRain, Zap, Wrench, Volume2, Clock,
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding bg-surface">
      <div className="container-custom">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-accent-500 text-sm font-semibold tracking-widest uppercase">Why Savista</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-4">
            Engineered for <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-slate-600">
            Every product is crafted with precision, using the finest materials and German technology.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = ICON_MAP[item.icon] || Award;
            return (
              <motion.div key={item.title} variants={staggerItem} className="card-premium p-8 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
