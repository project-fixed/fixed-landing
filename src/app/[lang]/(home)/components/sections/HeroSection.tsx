'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Translations } from '@/data/translations';
import type { Lang } from '@/data/translations';
import { HeroBadge } from '@/app/[lang]/(home)/components/ui/HeroBadge';
import { BetaForm } from '@/shared/components/widgets/BetaForm';
import { AnimatedStat } from '@/shared/components/ui/AnimatedStat';
import { useSplashDone } from '@/shared/components/layout/SplashContext';

interface HeroSectionProps {
  currentLang: Lang;
  t: Translations;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const splashDone = useSplashDone();
  const heroStats = [
    {
      value: t.landing.home.hero.key.point1.title,
      label: t.landing.home.hero.key.point1.description,
    },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="page-section relative my-auto flex flex-1 flex-col justify-center overflow-hidden py-4"
    >
      {/* Logos de ligas flotantes en posición absoluta (Lado derecho) */}

      <div className="relative z-10 flex w-full flex-col justify-between gap-6">
        {/* Columna Izquierda (Texto y Título amplio) */}
        <div className="flex flex-col items-start gap-6 lg:w-[70%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-start gap-6"
          >
            <HeroBadge
              label={
                currentLang === 'es'
                  ? 'Beta abierta · v0.6.0'
                  : 'Open Beta · v0.6.0'
              }
            />

            <h1 className="title-hero">
              <span className="text-primary">
                {t.landing.home.hero.title.start}
              </span>
              <span className="text-white">
                {' '}
                {t.landing.home.hero.title.center}
              </span>
              <span className="text-primary">
                {' '}
                {t.landing.home.hero.title.end}
              </span>
            </h1>

            <p className="max-w-[440px] text-[13px] leading-relaxed text-white/70 sm:text-sm lg:text-base">
              {t.landing.home.hero.description}
            </p>
          </motion.div>
        </div>

        {/* Bloque Flotante Derecha (Tarjeta Early Access + Stats) */}
        <motion.div
          className="relative flex flex-col gap-6 lg:absolute lg:right-0 lg:bottom-0 lg:z-20"
          initial={{ opacity: 0, x: 30 }}
          animate={splashDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Tarjeta de Early Access */}
          <div className="ml-auto hidden w-[320px] rounded-2xl border border-white/15 bg-white/10 p-6 text-right backdrop-blur-md lg:block lg:w-[400px]">
            <p className="mb-1 font-mono text-xs tracking-widest text-white capitalize">
              {currentLang === 'es' ? 'acceso anticipado' : 'early access'}
            </p>
            <p className="mb-5 text-xs font-medium text-white/70">
              {currentLang === 'es'
                ? 'Únete a la lista de espera y sé el primero en probar Fixed.'
                : 'Join the waitlist and be the first to try Fixed.'}
            </p>
            <BetaForm lang={currentLang} idSuffix="desktop" />
          </div>
          <div className="ml-auto w-75 lg:hidden">
            <BetaForm lang={currentLang} idSuffix="mobile" />
          </div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-end gap-y-4"
          >
            {heroStats.map((stat, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold tracking-tight text-white md:text-5xl">
                  <AnimatedStat value={stat.value} />
                </span>
                <span className="text-muted text-xs font-medium lowercase md:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
