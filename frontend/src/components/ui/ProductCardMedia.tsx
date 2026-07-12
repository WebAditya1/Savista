import { LazyImage } from '@/components/ui/LazyImage';
import { cn } from '@/utils/cn';

interface ProductCardMediaProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

/** Fixed 4:3 crop for product grids — images always the same size */
export function ProductCardMedia({ src, alt, className, imageClassName }: ProductCardMediaProps) {
  return (
    <div className={cn('relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100', className)}>
      <LazyImage
        fill
        src={src}
        alt={alt}
        className={cn('group-hover:scale-105 transition-transform duration-700', imageClassName)}
      />
    </div>
  );
}
