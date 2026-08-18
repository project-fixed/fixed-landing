import React from 'react';
import { useTranslations, type Lang } from '@/data/translations';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { AiLayerGraphic } from './AiLayerGraphic';
import { GridBackground } from '@/shared/components/ui/GridBackground';

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
    },
    {
      level: '2',
      title: data.layer1.title,
      description: data.layer1.description,
    },
    {
      level: '3',
      title: data.layer3.title,
      description: data.layer3.description,
    },
    {
      level: '4',
      title: data.layer4.title,
      description: data.layer4.description,
    },
  ];

  return (
    <section
      id="layers"
      className="page-section relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          'radial-gradient(circle at 20% 50%, rgba(62, 93, 108, 0.3), transparent 35%), radial-gradient(circle at 80% 30%, var(--color-primary-darkest) -30%, var(--background) 45%)',
      }}
    >
      <GridBackground glowPosition="end" />
      <div className="relative z-10 flex w-full flex-col gap-12 md:gap-16">
        <div className="relative z-10 w-full">
          <div className="flex flex-col items-end justify-between gap-6 lg:flex-row">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="title-section text-balance lg:max-w-[760px]">
                {data.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-body max-w-[400px] text-right text-base leading-relaxed">
                {data.description}
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {layers.map(({ level, title, description }, index) => (
            <ScrollReveal
              key={level}
              direction="up"
              delay={0.1 + index * 0.12}
              className="flex w-full"
            >
              <div className="group relative flex max-h-[500px] w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.04] bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]">
                <div className="absolute top-5 right-6 z-20 select-none">
                  <span className="font-mono text-sm font-medium text-white/10 transition-colors duration-300 group-hover:text-white/30">
                    0{level}
                  </span>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.25] transition-opacity duration-500 group-hover:opacity-[0.4]"
                  style={{
                    backgroundImage:
                      'radial-gradient(var(--color-primary) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                    maskImage:
                      'linear-gradient(to bottom, white 40%, transparent 80%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, white 40%, transparent 80%)',
                  }}
                />

                <div className="relative flex min-h-[220px] w-full flex-1 flex-grow items-center justify-center overflow-hidden p-0">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-[0.04]" />

                  <div className="relative z-10 flex h-full w-full items-center justify-center opacity-60 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100">
                    <AiLayerGraphic level={level} />
                  </div>
                </div>

                <div className="relative z-10 mt-auto flex flex-col p-4 pt-0 xl:p-6">
                  <h3 className="group-hover:text-primary-light mb-3 font-sans! text-base font-medium tracking-tight text-white transition-colors duration-300 xl:text-lg">
                    {title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed xl:text-sm">
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
