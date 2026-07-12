import { Link } from 'react-router-dom';
import { COMPANY } from '@/utils/constants';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const heights = { sm: 'h-8', md: 'h-10', lg: 'h-12' };

export function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps) {
  const src = variant === 'light' ? '/logo-white.png' : '/logo-color.png';

  return (
    <Link
      to="/"
      className={`inline-flex items-center group ${className}`}
      aria-label={`${COMPANY.name} Home`}
    >
      <img
        src={src}
        alt={COMPANY.name}
        className={`${heights[size]} w-auto transition-transform duration-300 group-hover:scale-[1.02]`}
        width={178}
        height={48}
        fetchPriority="high"
      />
    </Link>
  );
}
