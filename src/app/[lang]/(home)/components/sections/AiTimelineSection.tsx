import React from 'react';
import { useTranslations, type Lang } from '@/data/translations';
import { SectionBadge } from '@/shared/components/ui/SectionBadge';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
export interface Props {
  lang: Lang;
  id?: string;
}

export const AiTimelineSection: React.FC<Props> = ({ lang, id }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.ai.process;

  const steps = [
    {
      num: '01',
      title: data.step1.title,
      description: data.step1.description,
    },
    {
      num: '02',
      title: data.step2.title,
      description: data.step2.description,
    },
    {
      num: '03',
      title: data.step3.title,
      description: data.step3.description,
    },
    {
      num: '04',
      title: data.step4.title,
      description: data.step4.description,
    },
  ];

  return (
    <section id={id} className="page-section overflow-hidden pt-24 pb-8">
      <div className="flex w-full flex-col justify-center gap-8 lg:flex-row xl:gap-24">
        <div className="w-min">
          <ScrollReveal direction="up" delay={0.1} className="sticky top-32">
            <div className="mb-4">
              <SectionBadge label="process" />
            </div>
            <h2 className="title-hero mb-6">{data.title}</h2>
            <p className="text-text-muted ml-auto w-[400px] text-lg leading-relaxed lg:ml-0">
              {data.description}
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-col pt-4 lg:pt-0">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.num}
              direction="up"
              delay={0.1 + index * 0.15}
              className="group relative flex flex-row gap-8 pb-16 lg:pb-24"
            >
              {index !== steps.length - 1 && (
                <div className="absolute top-14 bottom-0 left-6 w-px bg-linear-to-b from-white/10 to-transparent lg:to-white/10"></div>
              )}

              <div className="group-hover:border-primary/50 bg-surface-deep relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 shadow-xl transition-colors duration-500">
                <span className="group-hover:text-primary text-text-faint font-mono text-xs transition-colors">
                  {step.num}
                </span>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <h3 className="font-mono text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {step.title}
                </h3>
                <p className="text-text-muted max-w-[500px] text-base leading-relaxed md:text-lg">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
