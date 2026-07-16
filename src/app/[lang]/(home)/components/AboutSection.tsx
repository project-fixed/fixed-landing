import React from 'react';
import Image from 'next/image';
import type { Translations } from '@/data/translations';
import type { Lang } from '@/data/translations';
import { ButtonArrow } from '@/components/ui/ButtonArrow';
import imgAbout from '@/assets/images/about.png';

interface Props {
  currentLang: Lang;
  t: Translations;
  appAuthUrl: string;
}

export const AboutSection: React.FC<Props> = ({
  currentLang,
  t,
  appAuthUrl,
}) => {
  return (
    <section
      id="about"
      className="page-section px-4 py-28 sm:px-8 lg:px-12 xl:px-20"
    >
      <div className="flex w-full flex-wrap items-center justify-center gap-16">
        <div className="w-full overflow-hidden rounded-[40%_20%] border border-white/10 shadow-2xl lg:max-w-[480px]">
          <Image
            src={imgAbout}
            alt="Image - About"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="w-full text-left lg:max-w-[500px]">
          <span className="text-text-ghost mb-4 block font-mono text-xs tracking-widest uppercase">
            about
          </span>
          <h2 className="text-5xl leading-tight font-extrabold text-white">
            {t.landing.home.about.title}
          </h2>
          <span className="text-primary mt-2 block text-2xl font-bold">
            {t.landing.home.about.subtitle}
          </span>
          <p className="text-text-body my-6 text-base leading-relaxed">
            {t.landing.home.about.description}
          </p>

          <ButtonArrow href={`${appAuthUrl}?lang=${currentLang}`}>
            {t.button.getStarted}
          </ButtonArrow>
        </div>
      </div>
    </section>
  );
};
