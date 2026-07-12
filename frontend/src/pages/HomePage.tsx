import { SEO } from '@/components/seo/SEO';
import { HeroSection } from '@/components/home/HeroSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ProductsPreview } from '@/components/home/ProductsPreview';
import { StatsSection, ProcessTimeline, BrandsSection } from '@/components/home/StatsAndProcess';
import { TestimonialsSection, GalleryPreview, CTASection } from '@/components/home/TestimonialsAndCTA';

export default function HomePage() {
  return (
    <>
      <SEO />
      <HeroSection />
      <WhyChooseUs />
      <ProductsPreview />
      <StatsSection />
      <ProcessTimeline />
      <GalleryPreview />
      <TestimonialsSection />
      <BrandsSection />
      <CTASection />
    </>
  );
}
