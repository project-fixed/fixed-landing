import React from 'react';
import { useTranslations, type Lang } from '@/data/translations';
import { SectionBadge } from '@/shared/components/ui/SectionBadge';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { AiLayerGraphic } from './AiLayerGraphic';

export interface Props {
  lang: Lang;
}

export const AiLayersSection: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.ai.layers;

  const layers = [
    {
      level: '1',
      title: data.layer2.title,
      description: data.layer2.description,
      heightClass: 'min-h-[240px] sm:min-h-[260px] md:min-h-[280px]',
    },
    {
      level: '2',
      title: data.layer1.title,
      description: data.layer1.description,
      heightClass: 'min-h-[240px] sm:min-h-[280px] md:min-h-[340px]',
    },
    {
      level: '3',
      title: data.layer3.title,
      description: data.layer3.description,
      heightClass: 'min-h-[240px] sm:min-h-[320px] md:min-h-[400px]',
    },
    {
      level: '4',
      title: data.layer4.title,
      description: data.layer4.description,
      heightClass: 'min-h-[240px] sm:min-h-[360px] md:min-h-[460px]',
    },
  ];

  return (
    <section
      id="layers"
      className="page-section overflow-hidden py-20 md:py-24"
    >
      <div className="flex w-full flex-col gap-12">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1} className="max-w-3xl">
          <SectionBadge label="layers" className="mb-4 block w-fit" />
          <h2 className="title-hero mb-4">{data.title}</h2>
          <p className="text-muted max-w-md text-base leading-relaxed">
            {data.description}
          </p>
        </ScrollReveal>

        {/* Staircase Cards Grid: Proportional Heights */}
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {layers.map(({ level, title, description, heightClass }, index) => (
            <ScrollReveal
              key={level}
              direction="up"
              delay={0.1 + index * 0.12}
              className="w-full"
            >
              <div
                className={`group bg-glass-card hover:bg-surface-card/40 relative flex flex-col justify-end overflow-hidden rounded-[20px] p-6 transition-all duration-500 hover:border-white/15 md:p-8 ${heightClass}`}
              >
                {/* Subtle technical background grid */}
                <div className="bg-pattern-stripes pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" />

                {/* 1. Technical index numbering (replacing Lvl) */}
                <div className="absolute top-6 right-6 z-10 select-none">
                  <span className="font-mono text-3xl font-extrabold text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.1]">
                    0{level}
                  </span>
                </div>

                {/* 2. Custom animated SVG graphics */}
                <div className="pointer-events-none absolute inset-x-0 top-0 bottom-28 flex items-center justify-center opacity-35 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85">
                  <AiLayerGraphic level={level} />
                </div>

                {/* Gradient to overlay the text nicely and protect readability */}
                <div className="from-background via-background/60 pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t to-transparent opacity-80" />

                {/* 3. Text Content */}
                <div className="relative z-10 mt-auto">
                  <h3 className="group-hover:text-primary-light mb-2 font-mono text-base font-bold tracking-tight text-white transition-colors duration-300 sm:text-lg md:text-xl">
                    {title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed sm:text-sm">
                    {description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
