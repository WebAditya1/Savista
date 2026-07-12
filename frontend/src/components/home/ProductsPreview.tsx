import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, staggerItem } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { ProductCardMedia } from '@/components/ui/ProductCardMedia';
import { productApi } from '@/services/api';
import type { Product } from '../../../../shared/types';

const FALLBACK_PRODUCTS: Partial<Product>[] = [
  { slug: 'premium-sliding-window', name: 'Sliding Windows', shortDescription: 'Smooth-gliding UPVC windows with multi-point locking.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', category: 'window', subcategory: 'sliding-windows' },
  { slug: 'classic-casement-window', name: 'Casement Windows', shortDescription: 'Outward-opening windows with superior ventilation.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', category: 'window', subcategory: 'casement-windows' },
  { slug: 'slimline-sliding-door', name: 'Sliding Doors', shortDescription: 'Ultra-slim profiles for seamless living.', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80', category: 'door', subcategory: 'sliding-doors' },
  { slug: 'designer-french-door', name: 'French Doors', shortDescription: 'Timeless elegance with abundant natural light.', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80', category: 'door', subcategory: 'french-doors' },
];

export function ProductsPreview() {
  const [products, setProducts] = useState<Partial<Product>[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    productApi.getAll({ featured: 'true', limit: '8' }).then((res) => {
      if (res.data?.length) setProducts(res.data);
    }).catch(() => {});
  }, []);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Our Collection</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">Premium Products</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-brand-600 font-medium hover:gap-3 transition-all">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {products.map((product) => (
            <motion.div key={product.slug} variants={staggerItem} className="h-full">
              <Link to={`/products/${product.slug}`} className="card-premium flex flex-col h-full overflow-hidden group">
                <ProductCardMedia src={product.image!} alt={product.name!} />
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-display font-semibold mt-1 mb-2 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{product.shortDescription}</p>
                  <span className="inline-flex items-center gap-1 text-brand-600 text-sm font-medium group-hover:gap-2 transition-all mt-auto">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
