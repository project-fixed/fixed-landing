import React from 'react';
import { BrandsCarousel } from '@/app/[lang]/(home)/components/widgets/BrandsCarousel';

export const BrandsSection: React.FC = () => {
  return (
    <section
      id="brands"
      className="page-section flex-col justify-center border-y border-white/5 bg-black/30 py-10"
    >
      <BrandsCarousel />
    </section>
  );
};
