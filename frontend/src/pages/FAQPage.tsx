import { useEffect, useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '@/components/seo/SEO';
import { FadeIn } from '@/components/animations/FadeIn';
import { faqApi } from '@/services/api';
import type { FAQ } from '../../../shared/types';
import { cn } from '@/utils/cn';

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Installation', value: 'installation' },
  { label: 'Warranty', value: 'warranty' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Delivery', value: 'delivery' },
];

const FALLBACK_FAQS: FAQ[] = [
  { _id: '1', question: 'How long does installation take?', answer: 'Standard installation takes 1-2 days per home depending on the number of units.', category: 'installation', order: 1 },
  { _id: '2', question: 'What warranty do you offer?', answer: 'We provide a 10-year warranty on UPVC profiles and 5-year warranty on hardware.', category: 'warranty', order: 2 },
  { _id: '3', question: 'How much do UPVC windows cost?', answer: 'Pricing depends on size, glass type, and hardware. Contact us for a free customized quotation.', category: 'pricing', order: 3 },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(FALLBACK_FAQS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    faqApi.getAll().then((res) => {
      if (res.data?.length) setFaqs(res.data);
    }).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCategory = !category || faq.category === category;
      const matchSearch =
        !search ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [faqs, category, search]);

  return (
    <>
      <SEO title="FAQ" description="Frequently asked questions about UPVC doors, windows, installation, and warranty." path="/faq" />

      <section className="pt-32 pb-12 bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-white/70">Find answers to common questions about our products and services.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <FadeIn className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    category === cat.value ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-3">
            {filtered.map((faq) => (
              <FadeIn key={faq._id}>
                <div className="card-premium overflow-hidden">
                  <button
                    onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                    aria-expanded={openId === faq._id}
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      className={cn('w-5 h-5 text-brand-400 shrink-0 transition-transform', openId === faq._id && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence>
                    {openId === faq._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-slate-500 py-12">No FAQs match your search.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
