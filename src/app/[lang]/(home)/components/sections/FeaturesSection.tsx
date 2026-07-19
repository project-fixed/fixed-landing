import React from 'react';
import type { Translations } from '@/data/translations';
import { ScrollExpandVideo } from '@/app/[lang]/(home)/components/widgets/ScrollExpandVideo';

interface Props {
  t: Translations;
}

export const FeaturesSection: React.FC<Props> = ({ t }) => {
  return (
    <section id="features" className="relative">
      <div className="bg-pattern-grid absolute inset-0 opacity-[0.03]" />
      <div className="page-section pt-24">
        <div className="flex flex-col gap-0 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
          <h2 className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-tight font-extrabold text-white uppercase lg:max-w-[760px]">
            {t.landing.home.features.title}
          </h2>
          <p className="text-text-body max-w-[400px] text-right text-base leading-relaxed">
            {t.landing.home.features.description}
          </p>
        </div>
      </div>

      <ScrollExpandVideo cursorText="Play intro" />
    </section>
  );
};
