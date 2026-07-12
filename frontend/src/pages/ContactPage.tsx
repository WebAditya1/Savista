import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { contactApi } from '@/services/api';
import { COMPANY } from '@/utils/constants';
import { cn } from '@/utils/cn';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email'),
  city: z.string().min(2, 'City is required'),
  requirement: z.string().min(2, 'Please specify your requirement'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await contactApi.submit(data);
      setToast({ visible: true, message: 'Thank you! We will contact you within 24 hours.', type: 'success' });
      reset();
    } catch {
      setToast({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with Savista for a free uPVC consultation." path="/contact" />

      <section className="pt-32 pb-12 bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
            <p className="text-white/70">We'd love to hear from you. Get a free consultation today.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid lg:grid-cols-5 gap-12">
          <FadeIn className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="card-premium p-8 space-y-6" noValidate>
              <h2 className="text-2xl font-display font-bold mb-2">Send us a message</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { name: 'name' as const, label: 'Full Name', type: 'text' },
                  { name: 'phone' as const, label: 'Phone', type: 'tel' },
                  { name: 'email' as const, label: 'Email', type: 'email' },
                  { name: 'city' as const, label: 'City', type: 'text' },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type={field.type}
                      {...register(field.name)}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border outline-none transition-all',
                        errors[field.name] ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20'
                      )}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field.name]?.message}</p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="requirement" className="block text-sm font-medium text-slate-700 mb-1.5">Requirement</label>
                <select
                  id="requirement"
                  {...register('requirement')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none"
                >
                  <option value="">Select requirement</option>
                  <option value="New Installation">New Installation</option>
                  <option value="Replacement">Replacement</option>
                  <option value="Commercial Project">Commercial Project</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
                {errors.requirement && <p className="text-red-500 text-xs mt-1">{errors.requirement.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto justify-center">
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: 'Address', value: COMPANY.address },
              { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${COMPANY.whatsapp}` },
              { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { icon: Clock, label: 'Business Hours', value: COMPANY.businessHours },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-xl bg-surface">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  {href ? (
                    <a href={href} className="font-medium text-brand-600 hover:underline" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-xl overflow-hidden h-48">
              <iframe
                src={COMPANY.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office location"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
