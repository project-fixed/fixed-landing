import React from 'react';
import type { Translations } from '@/data/translations';
import { ScrollExpandVideo } from '@/app/[lang]/(home)/components/widgets/ScrollExpandVideo';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
interface Props {
  t: Translations;
}

export const FeaturesSection: React.FC<Props> = ({ t }) => {
  return (
    <section id="features" className="relative">
      <div
        className="pointer-events-none absolute inset-y-0 left-6 z-0 w-px bg-white/0 select-none md:left-12 lg:left-20"
        aria-hidden="true"
      />
      <div className="bg-pattern-grid absolute inset-0 opacity-[0.03]" />
      <div className="page-section pt-24">
        <div className="flex flex-col items-end justify-between gap-6 lg:flex-row">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="title-section lg:max-w-[760px]">
              {t.landing.home.features.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-text-body max-w-[400px] text-right text-base leading-relaxed">
              {t.landing.home.features.description}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <ScrollExpandVideo cursorText="Play intro" />
    </section>
  );
};
