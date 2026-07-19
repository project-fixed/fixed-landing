import React from 'react';
import Image from 'next/image';
import type { Translations } from '@/data/translations';
import type { Lang } from '@/data/translations';
import { SectionBadge } from '@/shared/components/ui/SectionBadge';
import imgAbout from '@/assets/images/about.png';

interface Props {
  currentLang: Lang;
  t: Translations;
  appAuthUrl: string;
}

export const AboutSection: React.FC<Props> = ({ t }) => {
  return (
    <section id="about" className="page-section border-t border-white/5 py-28">
      <div className="flex w-full flex-wrap items-center justify-center gap-16">
        <div className="w-full overflow-hidden rounded-[40%_20%] border border-white/10 lg:max-w-[480px]">
          <Image
            src={imgAbout}
            alt="Image - About"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="w-full text-left lg:max-w-[500px]">
          <SectionBadge label="ABOUT" className="mb-4 block" />
          <h2 className="font-mono text-[clamp(2rem,6vw,6rem)] leading-[1.2] font-extrabold tracking-tight text-white">
            {t.landing.home.about.title}
          </h2>
          <span className="text-primary mt-2 block font-mono text-xl font-bold">
            {t.landing.home.about.subtitle}
          </span>
          <p className="text-text-body my-6 text-base leading-relaxed">
            {t.landing.home.about.description}
          </p>
        </div>
      </div>
    </section>
  );
};
