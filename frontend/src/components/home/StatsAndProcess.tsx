import { FadeIn } from '@/components/animations/FadeIn';
import { Counter } from '@/components/animations/Counter';
import { STATS, PROCESS_STEPS, BRANDS } from '@/utils/constants';

export function StatsSection() {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <FadeIn key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">Our Process</h2>
        </FadeIn>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-brand-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1} className="text-center relative">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-white shadow-lg border-2 border-brand-200 flex items-center justify-center mb-6 relative z-10">
                  <span className="text-3xl font-display font-bold gradient-text">{step.step}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandsSection() {
  return (
    <section className="py-10 md:py-12 border-y border-slate-100">
      <div className="container-custom">
        <FadeIn className="text-center mb-10">
          <p className="text-sm text-slate-500 uppercase tracking-widest">Trusted Partners</p>
        </FadeIn>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {BRANDS.map((brand) => (
            <FadeIn key={brand}>
              <span className="text-xl md:text-2xl font-display font-semibold text-slate-300 hover:text-brand-400 transition-colors cursor-default">
                {brand}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
