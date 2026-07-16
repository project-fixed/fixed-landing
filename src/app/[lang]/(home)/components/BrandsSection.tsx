import React from 'react';
import { BrandsCarousel } from '@/components/features/BrandsCarousel';

export const BrandsSection: React.FC = () => {
  return (
    <section
      id="brands"
      className="flex w-full flex-col justify-center border-y border-white/5 bg-black/30 px-4 py-10 sm:px-8 lg:px-12 xl:px-20"
    >
      <BrandsCarousel />
    </section>
  );
};
