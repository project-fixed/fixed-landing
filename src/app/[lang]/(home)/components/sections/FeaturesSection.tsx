import React from 'react';
import type { Translations, Lang } from '@/data/translations';
import { ScrollExpandVideo } from '@/app/[lang]/(home)/components/widgets/ScrollExpandVideo';
import { InteractiveFeatures } from '@/app/[lang]/(home)/components/widgets/InteractiveFeatures';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

interface Props {
  t: Translations;
  lang: Lang;
}

export const FeaturesSection: React.FC<Props> = ({ t, lang }) => {
  return (
    <section id="features" className="relative">
      <div className="bg-pattern-grid absolute inset-0 opacity-[0.04]" />
      <div className="page-section py-20 md:py-24">
        <div className="flex flex-col items-end justify-between gap-6 lg:flex-row">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="title-section lg:max-w-[760px]">
              {t.landing.home.features.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-body max-w-[400px] text-right text-base leading-relaxed">
              {t.landing.home.features.description}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <ScrollExpandVideo
        cursorText={lang === 'es' ? 'Explorar Dashboard' : 'Explore Dashboard'}
      >
        <InteractiveFeatures lang={lang} />
      </ScrollExpandVideo>
    </section>
  );
};
