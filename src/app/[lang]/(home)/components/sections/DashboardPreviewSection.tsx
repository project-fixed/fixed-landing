import React from 'react';
import type { Translations, Lang } from '@/data/translations';
import { ScrollExpand } from '@/app/[lang]/(home)/components/widgets/ScrollExpand';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { GridBackground } from '@/shared/components/ui/GridBackground';
import { FeaturesBentoSection } from './FeaturesBentoSection';

interface Props {
  t: Translations;
  lang: Lang;
}

export const DashboardPreviewSection: React.FC<Props> = ({ t, lang }) => {
  return (
    <section id="features" className="page-section relative">
      <GridBackground glowPosition="center" />
      <div className="pt-20 pb-6 md:pt-24 md:pb-12 lg:pb-16">
        <div className="flex flex-col items-end justify-between gap-6 lg:flex-row">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="title-section lg:max-w-[760px]">
              {t.landing.home.dashboardPreview.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-body max-w-[400px] text-right text-base leading-relaxed">
              {t.landing.home.dashboardPreview.description}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <ScrollExpand>
        <FeaturesBentoSection t={t} lang={lang} />
      </ScrollExpand>
    </section>
  );
};
