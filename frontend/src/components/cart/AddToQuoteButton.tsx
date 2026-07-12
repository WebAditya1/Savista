import type { MouseEvent } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '../../../../shared/types';
import { cn } from '@/utils/cn';

interface AddToQuoteButtonProps {
  product: Pick<Product, '_id' | 'slug' | 'name' | 'image'>;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
  openCartOnAdd?: boolean;
}

export function AddToQuoteButton({
  product,
  variant = 'secondary',
  className,
  openCartOnAdd = false,
}: AddToQuoteButtonProps) {
  const { addProduct, openCart, items } = useCart();
  const inCart = items.some((item) => item.productId === product._id);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addProduct(product);
    if (openCartOnAdd) openCart();
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-colors',
          inCart
            ? 'border-brand-400 bg-brand-50 text-brand-600'
            : 'border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-600',
          className
        )}
        aria-label={inCart ? 'Added to quote cart' : 'Add to quote cart'}
        title="Add to quote cart"
      >
        <ShoppingCart className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        variant === 'primary' ? 'btn-primary' : 'btn-outline',
        'inline-flex items-center gap-2 px-6 py-3',
        className
      )}
    >
      <ShoppingCart className="w-4 h-4" />
      {inCart ? 'Added to Quote' : 'Add to Quote'}
    </button>
  );
}
