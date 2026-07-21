import React from 'react';
import { BrandsCarousel } from '@/app/[lang]/(home)/components/widgets/BrandsCarousel';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

export const BrandsSection: React.FC = () => {
  return (
    <section
      id="brands"
      className="page-section flex-col justify-center border-y border-white/5 bg-black/30 py-10"
    >
      <ScrollReveal direction="up" delay={0.1}>
        <BrandsCarousel />
      </ScrollReveal>
    </section>
  );
};
