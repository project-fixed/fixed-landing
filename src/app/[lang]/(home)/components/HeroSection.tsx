import React from 'react';
import type { Translations } from '@/data/translations';
import type { Lang } from '@/data/translations';
import { HeroBadge } from '@/components/decorative/HeroBadge';
import { HeroDecorativeGrid } from '@/components/decorative/HeroDecorativeGrid';
import { BetaForm } from '@/components/shared/BetaForm';

interface HeroSectionProps {
  currentLang: Lang;
  t: Translations;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, t }) => {
  const heroStats = [
    {
      value: t.landing.home.hero.key.point1.title,
      label: currentLang === 'es' ? 'usuarios' : 'users',
    },
    {
      value: t.landing.home.hero.key.point2.title,
      label: currentLang === 'es' ? 'precisión' : 'accuracy',
    },
    {
      value: t.landing.home.hero.key.point3.title,
      label: currentLang === 'es' ? 'ligas' : 'leagues',
    },
    {
      value: t.landing.home.hero.key.point4.title,
      label: currentLang === 'es' ? 'monitoreo' : 'monitoring',
    },
  ];

  return (
    <section
      id="hero"
      className="page-section relative mt-24 overflow-hidden border-y border-white/5 px-6 py-10 md:px-12 lg:px-20"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-6 z-0 w-px bg-white/0 select-none md:left-12 lg:left-20"
        aria-hidden="true"
      />

      <HeroDecorativeGrid />

      <div className="relative z-10 flex w-full flex-col justify-between md:px-12 lg:px-20">
        <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start">
            <HeroBadge
              label={
                currentLang === 'es'
                  ? 'Beta abierta · v0.8.5'
                  : 'Open Beta · v0.8.5'
              }
            />

            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-tight text-white">
              <span className="text-primary">
                {t.landing.home.hero.title.start}
              </span>
              <span className="text-white"> football</span>
              <span className="block text-white">complexity</span>
              <span className="block text-white">into</span>
              <span className="text-primary block">
                {t.landing.home.hero.title.end}
              </span>
            </h1>

            <span className="bg-primary mt-5 block h-[3px] w-12" />

            <p className="text-text-muted mt-6 max-w-[480px] font-mono text-sm leading-relaxed">
              {t.landing.home.hero.description}
            </p>

            <div className="mt-8 w-full lg:hidden">
              <BetaForm lang={currentLang} />
            </div>

            <div className="mt-10 flex lg:hidden">
              <a
                href="#features"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="Scroll to features"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="size-6 animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="hidden h-full w-[380px] flex-shrink-0 flex-col lg:flex">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-text mb-1 font-mono text-xs tracking-widest uppercase">
                {currentLang === 'es' ? 'acceso anticipado' : 'early access'}
              </p>
              <p className="text-text-muted mb-5 text-sm font-medium">
                {currentLang === 'es'
                  ? 'Únete a la lista de espera y sé el primero en probar Fixed.'
                  : 'Join the waitlist and be the first to try Fixed.'}
              </p>
              <BetaForm lang={currentLang} />
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-4">
            {heroStats.map((stat, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-mono text-base font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-text-muted text-xs">{stat.label}</span>
                {i < heroStats.length - 1 && (
                  <span className="ml-4 text-white/15">·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
