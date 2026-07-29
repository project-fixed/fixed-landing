'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { translations } from '@/data/translations';

export function NotFoundClient() {
  const pathname = usePathname();
  // Detectar idioma basado en el prefijo de la URL
  const lang = pathname?.startsWith('/en') ? 'en' : 'es';
  const t =
    translations[lang]?.landing?.notFound || translations.es.landing.notFound;

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background radial glow matching the landing aesthetic */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-md space-y-6">
        <span className="text-primary-light font-mono text-xs tracking-widest uppercase">
          {lang === 'en' ? 'Error Code' : 'Código de Error'}
        </span>

        <h1 className="bg-gradient-to-b from-white via-neutral-300 to-neutral-600 bg-clip-text font-mono text-7xl font-extrabold tracking-tight text-transparent select-none sm:text-8xl">
          404
        </h1>

        <h2 className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t.title}
        </h2>

        <p className="text-muted mx-auto max-w-sm font-sans text-sm leading-relaxed sm:text-base">
          {t.description}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Link
            href={`/${lang}`}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white px-6 py-3 font-mono text-sm font-extrabold tracking-wider text-black backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/80 active:scale-95 sm:w-auto"
          >
            {t.buttonHome}
          </Link>
          <Link
            href={`/${lang}/plans`}
            className="group bg-white-glass hover:bg-white-glass/20 relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 px-6 py-3 font-mono text-sm font-extrabold tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 active:scale-95 sm:w-auto"
          >
            {t.buttonPlans}
          </Link>
        </div>
      </div>
    </div>
  );
}
