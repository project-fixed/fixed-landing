import React from 'react';
import { useTranslations, type Lang } from '../data/translations';

export interface Props {
  lang: Lang;
}

export const AITimeline: React.FC<Props> = ({ lang }) => {
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
    <section className="page-section relative overflow-hidden pt-24 pb-8">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-text-ghost font-mono text-xs tracking-widest uppercase">
            // process
          </span>
        </div>
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Left Side: Sticky Header */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-32">
              <h2 className="mb-6 text-5xl leading-[1.1] font-extrabold tracking-tight text-white md:text-6xl">
                {data.title}
              </h2>
              <p className="text-text-muted max-w-[400px] text-lg leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Right Side: Timeline Steps */}
          <div className="flex w-full flex-col pt-4 lg:w-7/12 lg:pt-0">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="group relative flex flex-row gap-8 pb-16 lg:pb-24"
              >
                {/* Connector Line (hide on last item) */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-14 bottom-0 left-6 w-[1px] bg-gradient-to-b from-white/10 to-transparent lg:to-white/10"></div>
                )}

                {/* Step Circle */}
                <div className="group-hover:border-primary/50 bg-surface-deep relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 shadow-xl transition-colors duration-500">
                  <span className="group-hover:text-primary text-text-faint font-mono text-xs transition-colors">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 pt-2">
                  <h3 className="font-mono text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-text-muted max-w-[500px] text-base leading-relaxed md:text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
