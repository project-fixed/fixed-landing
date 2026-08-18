import React from 'react';
import Image from 'next/image';
import type { Translations } from '@/data/translations';
import type { Lang } from '@/data/translations';
import imgAbout from '@/assets/images/about.png';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { GridBackground } from '@/shared/components/ui/GridBackground';

interface Props {
  currentLang: Lang;
  t: Translations;
  appAuthUrl: string;
}

export const AboutSection: React.FC<Props> = ({ t }) => {
  return (
    <section
      id="about"
      className="page-section border-t border-white/5 py-20 md:py-24"
      style={{
        background:
          'radial-gradient(circle at -10% 70%, rgba(62, 93, 108, 0.3), transparent 35%), radial-gradient(circle at 100% 30%, var(--color-primary-darkest) -30%, transparent 35%)',
      }}
    >
      <GridBackground />

      <div className="flex w-full flex-col-reverse flex-wrap items-center justify-center gap-8 lg:flex-row lg:gap-16">
        <ScrollReveal
          direction="left"
          delay={0.1}
          className="w-full overflow-hidden rounded-[40%_20%] border border-white/10 md:max-w-[340px] xl:max-w-[500px]"
        >
          <Image
            src={imgAbout}
            alt="Fixed predictive analysis dashboard data structure"
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 340px, 500px"
          />
        </ScrollReveal>

        <div className="w-full text-left lg:max-w-[500px]">
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="title-hero">{t.landing.home.about.title}</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <span className="text-primary mt-2 block font-mono text-xl font-bold">
              {t.landing.home.about.subtitle}
            </span>
            <p className="text-body my-6 text-base leading-relaxed">
              {t.landing.home.about.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
