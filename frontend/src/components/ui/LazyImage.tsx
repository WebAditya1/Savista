import { useState } from 'react';
import { cn } from '@/utils/cn';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  /** Fill a positioned parent (use with aspect-ratio container + relative) */
  fill?: boolean;
}

export function LazyImage({ src, alt, className, wrapperClassName, fill = false, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        fill && 'absolute inset-0 h-full w-full',
        wrapperClassName
      )}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" aria-hidden="true" />
      )}
      <img
        src={error ? '/placeholder.svg' : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          'transition-opacity duration-500',
          fill ? 'h-full w-full object-cover' : '',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
}
