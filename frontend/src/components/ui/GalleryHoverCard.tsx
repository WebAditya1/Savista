import { LazyImage } from '@/components/ui/LazyImage';
import { cn } from '@/utils/cn';

interface GalleryHoverCardProps {
  title: string;
  image: string;
  className?: string;
  aspectClass?: string;
}

/** Image card with bottom gradient + title on hover (project gallery) */
export function GalleryHoverCard({
  title,
  image,
  className,
  aspectClass = 'aspect-[4/3]',
}: GalleryHoverCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-500',
        aspectClass,
        className
      )}
    >
      <LazyImage
        fill
        src={image}
        alt={title}
        className="transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <h3 className="text-white font-display font-semibold text-lg leading-snug drop-shadow-sm">
          {title}
        </h3>
      </div>
    </div>
  );
}
