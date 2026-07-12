import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, MessageCircle, Check, ArrowLeft } from 'lucide-react';
import { AddToQuoteButton } from '@/components/cart/AddToQuoteButton';
import { SEO } from '@/components/seo/SEO';
import { FadeIn } from '@/components/animations/FadeIn';
import { LazyImage } from '@/components/ui/LazyImage';
import { Button } from '@/components/ui/Button';
import { productApi } from '@/services/api';
import type { Product } from '../../../shared/types';
import { cn } from '@/utils/cn';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    productApi.getBySlug(slug).then((res) => {
      if (res.data) setProduct(res.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 section-padding container-custom">
        <div className="animate-pulse grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-slate-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-2/3" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 section-padding container-custom text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button to="/products">Back to Products</Button>
      </div>
    );
  }

  const images = [product.image, ...(product.gallery || [])];

  const specSections = [
    { title: 'Available Sizes', items: product.sizes?.map((s) => `${s.label}: ${s.width} × ${s.height}`) },
    { title: 'Frame Material', items: product.frameMaterial },
    { title: 'Glass Options', items: product.glassOptions },
    { title: 'Color Options', items: product.colorOptions },
    { title: 'Hardware Options', items: product.hardwareOptions },
    { title: 'Applications', items: product.applications },
  ];

  return (
    <>
      <SEO title={product.name} description={product.shortDescription} path={`/products/${product.slug}`} image={product.image} type="product" />

      <div className="pt-28 pb-16">
        <div className="container-custom">
          <Link to="/products" className="inline-flex items-center gap-2 text-brand-600 text-sm font-medium mb-8 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn>
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <LazyImage fill src={images[activeImage]} alt={product.name} />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors',
                        activeImage === i ? 'border-brand-400' : 'border-transparent'
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </FadeIn>

            <FadeIn delay={0.2}>
              <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">{product.name}</h1>
              <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {product.features?.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm">
                    <Check className="w-3.5 h-3.5" /> {f}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                <AddToQuoteButton product={product} variant="primary" />
                <Button to={`/inquiry?product=${product.slug}`} variant="outline">
                  <MessageCircle className="w-4 h-4" /> Quick Inquiry
                </Button>
                {product.brochureUrl && (
                  <Button variant="outline" href={product.brochureUrl}>
                    <Download className="w-4 h-4" /> Download Brochure
                  </Button>
                )}
              </div>

              {product.specifications?.length > 0 && (
                <div className="border-t pt-8">
                  <h2 className="font-display font-semibold text-lg mb-4">Specifications</h2>
                  <dl className="space-y-3">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="flex justify-between py-2 border-b border-slate-100">
                        <dt className="text-slate-500 text-sm">{spec.label}</dt>
                        <dd className="text-sm font-medium">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </FadeIn>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specSections.map((section) =>
              section.items?.length ? (
                <FadeIn key={section.title}>
                  <div className="card-premium p-6">
                    <h3 className="font-display font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-brand-400 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}
