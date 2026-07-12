import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Upload } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { useCart } from '@/context/CartContext';
import { orderApi, productApi } from '@/services/api';
import type { Product } from '../../../shared/types';
import { cn } from '@/utils/cn';

const itemSchema = z.object({
  productId: z.string().min(1, 'Select a product'),
  productName: z.string(),
  quantity: z.number().min(1).max(100),
  width: z.string().optional(),
  height: z.string().optional(),
  requirements: z.string().optional(),
});

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  city: z.string().min(2),
  items: z.array(itemSchema).min(1, 'Add at least one product'),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function InquiryPage() {
  const [searchParams] = useSearchParams();
  const { items: cartItems, clearCart } = useCart();
  const cartLoadedRef = useRef(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [referenceImage, setReferenceImage] = useState<string>('');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [{ productId: '', productName: '', quantity: 1, width: '', height: '', requirements: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  useEffect(() => {
    productApi.getAll({ limit: '50' }).then((res) => {
      if (res.data) setProducts(res.data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const fromCart = searchParams.get('from') === 'cart';
    if (fromCart && cartItems.length > 0 && !cartLoadedRef.current) {
      reset({
        name: '',
        phone: '',
        email: '',
        city: '',
        additionalNotes: '',
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          width: item.width || '',
          height: item.height || '',
          requirements: item.requirements || '',
        })),
      });
      cartLoadedRef.current = true;
      return;
    }

    const preselect = searchParams.get('product');
    if (preselect && products.length && !cartLoadedRef.current) {
      const p = products.find((pr) => pr.slug === preselect);
      if (p) {
        setValue('items.0.productId', p._id);
        setValue('items.0.productName', p.name);
      }
    }
  }, [searchParams, products, setValue, reset, cartItems]);

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find((p) => p._id === productId);
    setValue(`items.${index}.productId`, productId);
    setValue(`items.${index}.productName`, product?.name || '');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setToast({ visible: true, message: 'Image must be under 5MB', type: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setReferenceImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await orderApi.submit({ ...data, referenceImage: referenceImage || undefined });
      clearCart();
      setToast({ visible: true, message: 'Inquiry submitted! Check your email for confirmation.', type: 'success' });
      reset();
      setReferenceImage('');
    } catch {
      setToast({ visible: true, message: 'Submission failed. Please try again.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Request a Quote" description="Submit your product inquiry and get a customized quote." path="/inquiry" />

      <section className="pt-32 pb-12 bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Request a Quote</h1>
            <p className="text-white/70">Select products, specify dimensions, and we'll prepare a customized quote.</p>
            {searchParams.get('from') === 'cart' && cartItems.length > 0 && (
              <p className="mt-3 text-sm text-accent-200">
                {cartItems.length} product{cartItems.length === 1 ? '' : 's'} loaded from your quote cart.
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <form onSubmit={handleSubmit(onSubmit)} className="card-premium p-8 space-y-8">
              <div>
                <h2 className="text-xl font-display font-bold mb-4">Your Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(['name', 'phone', 'email', 'city'] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mb-1.5 capitalize">{field}</label>
                      <input
                        {...register(field)}
                        className={cn('w-full px-4 py-3 rounded-xl border outline-none', errors[field] ? 'border-red-300' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20')}
                      />
                      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]?.message}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 gap-4">
                  <h2 className="text-xl font-display font-bold">Products</h2>
                  <div className="flex items-center gap-3">
                    {cartItems.length > 0 && searchParams.get('from') !== 'cart' && (
                      <button
                        type="button"
                        onClick={() => {
                          reset({
                            ...watch(),
                            items: cartItems.map((item) => ({
                              productId: item.productId,
                              productName: item.productName,
                              quantity: item.quantity,
                              width: item.width || '',
                              height: item.height || '',
                              requirements: item.requirements || '',
                            })),
                          });
                          cartLoadedRef.current = true;
                        }}
                        className="text-sm text-brand-600 font-medium hover:text-brand-400 whitespace-nowrap"
                      >
                        Load quote cart ({cartItems.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => append({ productId: '', productName: '', quantity: 1, width: '', height: '', requirements: '' })}
                      className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium hover:text-brand-400 whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>
                </div>
                {errors.items?.root && <p className="text-red-500 text-sm mb-2">{errors.items.root.message}</p>}
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-5 rounded-xl bg-surface space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-500">Product {index + 1}</span>
                        {fields.length > 1 && (
                          <button type="button" onClick={() => remove(index)} className="text-red-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <select
                        value={watch(`items.${index}.productId`)}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                      >
                        <option value="">Select product</option>
                        {products.map((p) => (
                          <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                      </select>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-slate-500">Qty</label>
                          <input type="number" min={1} {...register(`items.${index}.quantity`, { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-slate-200" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Width</label>
                          <input placeholder="e.g. 1200mm" {...register(`items.${index}.width`)} className="w-full px-3 py-2 rounded-lg border border-slate-200" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Height</label>
                          <input placeholder="e.g. 1500mm" {...register(`items.${index}.height`)} className="w-full px-3 py-2 rounded-lg border border-slate-200" />
                        </div>
                      </div>
                      <input placeholder="Special requirements (optional)" {...register(`items.${index}.requirements`)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reference Image (optional)</label>
                <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-brand-400 transition-colors">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-sm text-slate-500">Upload image (max 5MB)</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {referenceImage && (
                  <img src={referenceImage} alt="Reference" className="mt-3 h-24 rounded-lg object-cover" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Additional Notes</label>
                <textarea rows={3} {...register('additionalNotes')} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none" />
              </div>

              <Button type="submit" disabled={submitting} className="w-full justify-center">
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>

      <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </>
  );
}
