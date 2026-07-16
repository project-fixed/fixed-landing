import React from 'react';
import Image from 'next/image';
import type { Translations } from '@/data/translations';
import { ScrollExpandVideo } from '@/components/features/ScrollExpandVideo';
import imgDashboard from '@/assets/images/dashboard.png';

interface Props {
  t: Translations;
}

export const FeaturesSection: React.FC<Props> = ({ t }) => {
  return (
    <section id="features" className="page-section pt-24 pb-16">
      <div className="mx-auto flex w-full flex-col items-center px-12 md:px-24 lg:px-40">
        <span className="text-text-ghost mb-4 block font-mono text-xs tracking-widest uppercase">
          features
        </span>
        <h2 className="text-mono mb-4 max-w-[1200px] text-center text-7xl leading-tight font-extrabold text-white">
          {t.landing.home.features.title}
        </h2>
        <p className="text-text-body max-w-[600px] text-center text-base leading-relaxed">
          {t.landing.home.features.description}
        </p>
      </div>

      <ScrollExpandVideo cursorText="Play intro">
        <Image
          src={imgDashboard}
          alt="Fixed Dashboard Screenshot"
          className="h-full w-full rounded-none object-cover"
          priority
        />
      </ScrollExpandVideo>
    </section>
  );
};
