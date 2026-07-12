import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { AddToQuoteButton } from '@/components/cart/AddToQuoteButton';
import { SEO } from '@/components/seo/SEO';
import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { ProductCardMedia } from '@/components/ui/ProductCardMedia';
import { productApi } from '@/services/api';
import type { Product } from '../../../shared/types';
import { cn } from '@/utils/cn';

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Windows', value: 'window' },
  { label: 'Doors', value: 'door' },
  { label: 'Sliding Windows', value: 'sliding-windows', type: 'window' },
  { label: 'Casement Windows', value: 'casement-windows', type: 'window' },
  { label: 'Sliding Doors', value: 'sliding-doors', type: 'door' },
  { label: 'French Doors', value: 'french-doors', type: 'door' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const activeType = searchParams.get('type') || '';
  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { limit: '50' };
    if (activeType) params.category = activeType;
    if (activeCategory) params.search = activeCategory;
    if (search) params.search = search;

    productApi.getAll(params).then((res) => {
      setProducts(res.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [activeType, activeCategory, search]);

  const filtered = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter((p) => p.subcategory === activeCategory || !activeCategory);
  }, [products, activeCategory]);

  const setFilter = (type: string, category: string) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (category) params.set('category', category);
    setSearchParams(params);
  };

  return (
    <>
      <SEO title="Product Catalogue" description="Browse our complete range of premium UPVC doors and windows." path="/products" />

      <section className="pt-32 pb-12 bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Product Catalogue</h1>
            <p className="text-white/70 max-w-xl">Explore our complete range of premium UPVC doors and windows.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-28 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-3">Categories</h3>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value || 'all'}
                        onClick={() => setFilter(cat.type || (cat.value === 'window' || cat.value === 'door' ? cat.value : ''), cat.value.includes('-') ? cat.value : '')}
                        className={cn(
                          'w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors',
                          (activeCategory === cat.value || (cat.value === activeType && !activeCategory) || (!activeType && !activeCategory && !cat.value))
                            ? 'bg-brand-50 text-brand-600 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="card-premium animate-pulse">
                      <div className="aspect-[4/3] bg-slate-200" />
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-1/3" />
                        <div className="h-6 bg-slate-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <p className="text-center text-slate-500 py-20">No products found. Try adjusting your filters.</p>
              ) : (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                  {filtered.map((product) => (
                    <motion.div key={product._id} variants={staggerItem} className="h-full">
                      <div className="card-premium overflow-hidden group relative flex flex-col h-full">
                        <Link to={`/products/${product.slug}`} className="flex flex-col flex-1">
                          <ProductCardMedia src={product.image} alt={product.name} />
                          <div className="p-6 flex flex-col flex-1">
                            <span className="text-xs font-medium text-brand-400 uppercase">{product.subcategory.replace(/-/g, ' ')}</span>
                            <h2 className="text-xl font-display font-semibold mt-1 mb-2 line-clamp-2 min-h-[3.5rem]">{product.name}</h2>
                            <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{product.shortDescription}</p>
                            <span className="inline-flex items-center gap-1 text-brand-600 text-sm font-medium mt-auto">
                              View Details <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </Link>
                        <div className="absolute top-4 right-4">
                          <AddToQuoteButton product={product} variant="icon" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </StaggerContainer>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
