import React from 'react';
import Image from 'next/image';
import img1Xbet from '@/assets/images/brands/1xbet.webp';
import imgBet365 from '@/assets/images/brands/bet365.webp';
import imgBetano from '@/assets/images/brands/betano.webp';
import imgBetsafe from '@/assets/images/brands/betsafe.webp';
import imgBetsson from '@/assets/images/brands/betsson.webp';
import imgDafabet from '@/assets/images/brands/dafabet.webp';
import imgInkabet from '@/assets/images/brands/inkabet.webp';
import imgJugabet from '@/assets/images/brands/jugabet.webp';
import imgRetabet from '@/assets/images/brands/retabet.webp';
import imgTinbet from '@/assets/images/brands/tinbet.webp';

const brands = [
  { src: img1Xbet, alt: '1Xbet' },
  { src: imgBet365, alt: 'Bet365' },
  { src: imgBetano, alt: 'Betano' },
  { src: imgBetsafe, alt: 'Betsafe' },
  { src: imgBetsson, alt: 'Betsson' },
  { src: imgDafabet, alt: 'Dafabet' },
  { src: imgInkabet, alt: 'Inkabet' },
  { src: imgJugabet, alt: 'Jugabet' },
  { src: imgRetabet, alt: 'Retabet' },
  { src: imgTinbet, alt: 'Tinbet' },
];

export const BrandsCarousel: React.FC = () => {
  return (
    <div
      className="scroller w-full overflow-hidden mask-[linear-gradient(90deg,transparent,white_20%,white_80%,transparent)]"
      data-direction="right"
      data-speed="slow"
    >
      <div className="scroller-inner animate-marquee flex w-max flex-nowrap gap-8 py-4">
        {/* Original Items */}
        {brands.map((brand, idx) => (
          <Image
            key={`orig-${idx}`}
            className="h-12 w-auto flex-shrink-0 object-contain opacity-50 grayscale transition-opacity duration-300 hover:opacity-90"
            src={brand.src}
            alt={brand.alt}
          />
        ))}
        {/* Duplicated Items for seamless loop */}
        {brands.map((brand, idx) => (
          <Image
            key={`dup-${idx}`}
            className="h-12 w-auto flex-shrink-0 object-contain opacity-50 grayscale transition-opacity duration-300 hover:opacity-90"
            src={brand.src}
            alt={brand.alt}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};
