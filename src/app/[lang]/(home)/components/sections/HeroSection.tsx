'use client';

import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import type { Translations } from '@/data/translations';
import type { Lang } from '@/data/translations';
import { HeroBadge } from '@/app/[lang]/(home)/components/ui/HeroBadge';
import { HeroDecorativeGrid } from '@/app/[lang]/(home)/components/ui/HeroDecorativeGrid';
import { BetaForm } from '@/shared/components/widgets/BetaForm';
import { AnimatedStat } from '@/shared/components/ui/AnimatedStat';

interface HeroSectionProps {
  currentLang: Lang;
  t: Translations;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, t }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse Tracking Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window === 'undefined') return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const gridX = useTransform(mouseXSpring, [-1, 1], [25, -25]);
  const gridY = useTransform(mouseYSpring, [-1, 1], [25, -25]);
  const formX = useTransform(mouseXSpring, [-1, 1], [-8, 8]);
  const formY = useTransform(mouseYSpring, [-1, 1], [-8, 8]);
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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="page-section relative my-auto flex flex-1 flex-col justify-center overflow-hidden py-4"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-6 z-0 w-px bg-white/0 select-none md:left-12 lg:left-20"
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ x: gridX, y: gridY }}
      >
        <HeroDecorativeGrid />
      </motion.div>

      <div className="relative z-10 flex w-full flex-col justify-between gap-6 2xl:px-20">
        {/* Columna Izquierda (Texto y Título amplio) */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-start gap-6"
          >
            <HeroBadge
              label={
                currentLang === 'es'
                  ? 'Beta abierta · v0.8.5'
                  : 'Open Beta · v0.8.5'
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
              <span className="text-primary block">
                {t.landing.home.hero.title.end}
              </span>
            </h1>

            <span className="bg-primary hidden h-[10px] w-14 lg:block" />

            <p className="text-text-muted max-w-[440px] leading-relaxed">
              {t.landing.home.hero.description}
            </p>
          </motion.div>
        </div>

        {/* Bloque Flotante Derecha (Tarjeta Early Access + Stats en Parallax) */}
        <motion.div
          className="relative flex flex-col gap-6 lg:absolute lg:right-0 lg:bottom-4 lg:z-20"
          style={{ x: formX, y: formY }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Tarjeta de Early Access */}
          <div className="ml-auto hidden w-[320px] rounded-2xl border border-white/15 bg-white/10 p-6 text-right backdrop-blur-md lg:block xl:w-[400px]">
            <p className="text-text mb-1 font-mono text-xs tracking-widest capitalize">
              {currentLang === 'es' ? 'acceso anticipado' : 'early access'}
            </p>
            <p className="text-text-muted mb-5 text-xs font-medium">
              {currentLang === 'es'
                ? 'Únete a la lista de espera y sé el primero en probar Fixed.'
                : 'Join the waitlist and be the first to try Fixed.'}
            </p>
            <BetaForm lang={currentLang} />
          </div>
          <div className="ml-auto lg:hidden">
            <BetaForm lang={currentLang} />
          </div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-end gap-y-4"
          >
            {heroStats.map((stat, i) => (
              <div key={i} className="flex items-baseline">
                <span className="mr-2 font-mono text-base font-bold text-white">
                  <AnimatedStat value={stat.value} />
                </span>
                <span className="text-text-muted text-xs">{stat.label}</span>
                {i < heroStats.length - 1 && (
                  <span className="mx-4 text-white/15">·</span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
