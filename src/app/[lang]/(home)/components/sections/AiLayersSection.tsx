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
      heightClass: 'min-h-[260px] lg:min-h-[280px]',
      Icon: TrendingUp,
    },
    {
      level: '2',
      title: data.layer2.title,
      description: data.layer2.description,
      heightClass: 'min-h-[260px] lg:min-h-[340px]',
      Icon: Globe,
    },
    {
      level: '3',
      title: data.layer3.title,
      description: data.layer3.description,
      heightClass: 'min-h-[260px] lg:min-h-[400px]',
      Icon: Box,
    },
    {
      level: '4',
      title: data.layer4.title,
      description: data.layer4.description,
      heightClass: 'min-h-[260px] lg:min-h-[460px]',
      Icon: DollarSign,
    },
  ];

  return (
    <section className="page-section flex flex-col overflow-hidden py-20 md:py-24">
      <div className="w-full">
        <div className="mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <SectionBadge label="layers" className="mb-4 block" />
            <h2 className="title-hero">{data.title}</h2>
            <p className="text-muted max-w-[600px] text-base leading-relaxed">
              {data.description}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {layers.map(
            ({ level, title, description, heightClass, Icon }, index) => (
              <ScrollReveal
                key={level}
                direction="up"
                delay={0.1 + index * 0.15}
              >
                <div
                  className={`group bg-glass-card hover:bg-surface-card/80 relative flex flex-col justify-end overflow-hidden rounded-[20px] p-6 transition-all duration-500 hover:border-white/15 md:p-8 ${heightClass}`}
                >
                  <div className="bg-pattern-stripes pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" />

                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <Icon className="text-primary size-5 opacity-80 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="absolute top-6 right-6">
                    <span className="text-faint font-mono text-[10px] tracking-widest uppercase">
                      Lvl {level}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="group-hover:text-primary mb-3 font-mono text-xl font-bold tracking-tight text-white transition-colors md:text-2xl">
                      {title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
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
