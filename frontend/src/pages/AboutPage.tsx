import { SEO } from '@/components/seo/SEO';
import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { LazyImage } from '@/components/ui/LazyImage';
import { ACHIEVEMENTS, TEAM, TIMELINE } from '@/utils/constants';
import { Check, Factory } from 'lucide-react';

const FACTORY_IMG = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80';

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description="Learn about Savista — precision uPVC doors and windows crafted for modern living." path="/about" />

      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Savista</h1>
            <p className="text-white/70 max-w-2xl text-lg">
              For over 18 years, we've been transforming Indian homes with premium UPVC solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Our Story</span>
            <h2 className="text-3xl font-display font-bold mt-3 mb-6">Built on Quality, Driven by Innovation</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Founded in 2008, Savista began with a simple mission: to bring world-class window and door
              solutions to Indian homes. What started as a small fabrication unit has grown into one of the
              country's most trusted UPVC brands.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, we operate a 25,000 sq ft manufacturing facility equipped with German extrusion technology,
              serving customers across 45+ cities with a team of 200+ dedicated professionals.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <LazyImage src={FACTORY_IMG} alt="Savista manufacturing facility" className="w-full rounded-2xl shadow-xl" wrapperClassName="rounded-2xl" />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom grid md:grid-cols-2 gap-12">
          <FadeIn>
            <h2 className="text-2xl font-display font-bold mb-4 gradient-text">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To deliver premium, energy-efficient UPVC solutions that enhance the quality of life while
              contributing to sustainable building practices across India.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-display font-bold mb-4 gradient-text">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To be India's most trusted UPVC brand, setting the standard for quality, innovation, and
              customer satisfaction in the fenestration industry.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <Factory className="w-12 h-12 text-brand-400 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold">Manufacturing Excellence</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {['Profile Extrusion', 'Precision Cutting', 'Quality Assembly'].map((step, i) => (
              <FadeIn key={step} delay={i * 0.1}>
                <div className="card-premium p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 font-bold flex items-center justify-center mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step}</h3>
                  <p className="text-sm text-slate-600">
                    {i === 0 && 'German-engineered multi-chamber profiles extruded to exact specifications.'}
                    {i === 1 && 'CNC precision cutting ensures perfect fit for every custom dimension.'}
                    {i === 2 && 'Hand-assembled with premium hardware and rigorous quality checks.'}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-900 text-white">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold">Quality Assurance</h2>
            <p className="text-white/60 mt-3">Every product passes through 12 quality checkpoints</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <FadeIn key={a}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                  <Check className="w-5 h-5 text-accent-400 shrink-0" />
                  <span className="text-sm">{a}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold">Our Team</h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={staggerItem} className="text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <LazyImage src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-brand-400">{member.role}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold">Our Journey</h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 md:-translate-x-px" />
            {TIMELINE.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1} className={`relative flex items-center gap-8 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                  {i % 2 === 0 && (
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </div>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0 relative z-10">
                  {item.year.slice(2)}
                </div>
                <div className="flex-1">
                  <span className="text-brand-400 font-bold text-sm">{item.year}</span>
                  <h3 className="font-semibold text-lg md:hidden">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
