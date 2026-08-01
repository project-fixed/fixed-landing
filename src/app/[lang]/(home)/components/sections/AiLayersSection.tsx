import React from 'react';
import { useTranslations, type Lang } from '@/data/translations';
import { SectionBadge } from '@/shared/components/ui/SectionBadge';
import { TrendingUp, Globe, Box, DollarSign } from 'lucide-react';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

export interface Props {
  lang: Lang;
}

export const AiLayersSection: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.ai.layers;

  const layers = [
    {
      level: '1',
      title: data.layer1.title,
      description: data.layer1.description,
      heightClass: 'min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]',
      Icon: TrendingUp,
    },
    {
      level: '2',
      title: data.layer2.title,
      description: data.layer2.description,
      heightClass: 'min-h-[200px] sm:min-h-[280px] lg:min-h-[340px]',
      Icon: Globe,
    },
    {
      level: '3',
      title: data.layer3.title,
      description: data.layer3.description,
      heightClass: 'min-h-[200px] sm:min-h-[320px] lg:min-h-[400px]',
      Icon: Box,
    },
    {
      level: '4',
      title: data.layer4.title,
      description: data.layer4.description,
      heightClass: 'min-h-[200px] sm:min-h-[360px] lg:min-h-[460px]',
      Icon: DollarSign,
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
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {layers.map(
            ({ level, title, description, heightClass, Icon }, index) => (
              <ScrollReveal
                key={level}
                direction="up"
                delay={0.1 + index * 0.12}
                className="w-full"
              >
                <div
                  className={`group bg-glass-card hover:bg-surface-card/80 relative flex flex-col justify-end overflow-hidden rounded-[20px] p-6 transition-all duration-500 hover:border-white/15 md:p-8 ${heightClass}`}
                >
                  <div className="bg-pattern-stripes pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" />

                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <Icon className="text-primary-light size-5 opacity-80 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="absolute top-6 right-6">
                    <span className="text-faint font-mono text-[10px] tracking-widest uppercase">
                      Lvl {level}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="mb-3 font-mono text-lg font-bold tracking-tight text-white transition-colors md:text-xl lg:text-2xl">
                      {title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed sm:text-sm">
                      {description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
