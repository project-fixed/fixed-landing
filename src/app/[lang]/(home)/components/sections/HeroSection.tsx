import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { Translations } from '@/data/translations';
import type { Lang } from '@/data/translations';
import { HeroBadge } from '@/app/[lang]/(home)/components/ui/HeroBadge';
import { HeroDecorativeGrid } from '@/app/[lang]/(home)/components/ui/HeroDecorativeGrid';
import { BetaForm } from '@/shared/components/widgets/BetaForm';

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
      className="page-section overflow-hidden pt-24 md:pt-38 lg:pb-16"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-6 z-0 w-px bg-white/0 select-none md:left-12 lg:left-20"
        aria-hidden="true"
      />

      <div className="bg-pattern-stripes pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />

      <HeroDecorativeGrid />

      <div className="relative z-10 flex w-full flex-col justify-between md:px-12 lg:px-20">
        <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-4">
            <HeroBadge
              label={
                currentLang === 'es'
                  ? 'Beta abierta · v0.8.5'
                  : 'Open Beta · v0.8.5'
              }
            />

            <h1 className="font-mono text-[clamp(2.8rem,7vw,5rem)] leading-[1.2] font-extrabold tracking-tight text-white">
              <span className="text-primary">
                {t.landing.home.hero.title.start}
              </span>
              <span className="text-white">
                {' '}
                {t.landing.home.hero.title.center}
              </span>
              <span className="text-primary block">
                {t.landing.home.hero.title.end}
              </span>
            </h1>

            <span className="bg-primary block hidden h-[10px] w-14 md:block" />

            <p className="text-text-muted mt-2 max-w-[400px] leading-relaxed">
              {t.landing.home.hero.description}
            </p>

            <div className="w-full lg:hidden">
              <BetaForm lang={currentLang} />
            </div>

            <div className="mt-10 flex lg:hidden">
              <a
                href="#features"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="Scroll to features"
              >
                <ChevronDown className="size-6 animate-bounce" />
              </a>
            </div>
          </div>

          <div className="hidden h-full w-[380px] shrink-0 flex-col pb-18 lg:flex">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-text mb-1 font-mono text-xs tracking-widest capitalize">
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

        <div className="-translate-y-12">
          <div className="flex flex-wrap items-center justify-start gap-y-4 lg:justify-end">
            {heroStats.map((stat, i) => (
              <div key={i} className="flex items-baseline">
                <span className="mr-2 font-mono text-base font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-text-muted text-xs">{stat.label}</span>
                {i < heroStats.length - 1 && (
                  <span className="mx-4 text-white/15">·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
