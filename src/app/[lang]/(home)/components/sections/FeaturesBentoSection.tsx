import React from 'react';
import Image from 'next/image';
import type { Translations, Lang } from '@/data/translations';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { LaFijaCard } from '../widgets/LaFijaCard';
import {
  ShieldCheck,
  Globe,
  Trophy,
  BarChart3,
  Target,
  LineChart,
  LayoutTemplate,
} from 'lucide-react';

interface Props {
  t: Translations;
  lang: Lang;
}

export const FeaturesBentoSection: React.FC<Props> = ({ t }) => {
  return (
    <section className="relative h-fit w-full overflow-hidden">
      <div className="mx-auto flex h-fit w-full flex-col justify-center">
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 md:grid-rows-2 xl:grid-cols-4">
          {/* Card 1: La Fija (Span 2x2) */}
          <ScrollReveal
            direction="up"
            delay={0.1}
            className="md:col-span-2 md:row-span-2"
          >
            <div className="group bg-glass-card relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 p-6 transition-colors hover:bg-white/[0.04] md:p-8">
              {/* Graphic */}
              <div className="pointer-events-none absolute -top-16 -right-16 p-6 opacity-[0.02] transition-opacity group-hover:opacity-[0.05]">
                <Target className="h-80 w-80 text-white" />
              </div>
              <div className="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

              <div className="z-10 flex h-full flex-col">
                <div className="mb-auto">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                    <Target className="h-5 w-5 text-white/70" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {t.landing.home.bento.card1.title}
                  </h3>
                  <p className="max-w-md text-sm text-white/60">
                    {t.landing.home.bento.card1.description}
                  </p>
                </div>
                <div className="pointer-events-none relative mt-8 h-[240px] w-full">
                  {/* Wrapper with mask to create dynamic fade effect on the left */}
                  <div className="absolute -right-6 -bottom-6 h-full w-[1008px] [mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_100%)]">
                    {/* Marquee Container */}
                    <div className="animate-marquee absolute top-0 left-0 flex w-max [animation-play-state:paused] group-hover:[animation-play-state:running]">
                      {/* Set 1 */}
                      <div className="flex w-[1008px] shrink-0 gap-4 pr-4">
                        {/* Carta 3 */}
                        <div className="w-[320px] shrink-0 origin-bottom-right translate-y-4 rotate-[-5deg] drop-shadow-xl transition-all duration-700 group-hover:translate-y-0 group-hover:rotate-0">
                          <LaFijaCard {...t.landing.home.bento.card1Cards[2]} />
                        </div>
                        {/* Carta 2 */}
                        <div className="w-[320px] shrink-0 origin-bottom-right translate-y-4 rotate-[-5deg] drop-shadow-xl transition-all duration-700 group-hover:translate-y-0 group-hover:rotate-0">
                          <LaFijaCard {...t.landing.home.bento.card1Cards[1]} />
                        </div>
                        {/* Carta 1 */}
                        <div className="w-[320px] shrink-0 origin-bottom-right translate-y-4 rotate-[-5deg] drop-shadow-xl transition-all duration-700 group-hover:translate-y-0 group-hover:rotate-0">
                          <LaFijaCard {...t.landing.home.bento.card1Cards[0]} />
                        </div>
                      </div>

                      {/* Set 2 (Clon para el carrusel) */}
                      <div className="flex w-[1008px] shrink-0 gap-4 pr-4">
                        {/* Carta 3 */}
                        <div className="w-[320px] shrink-0 origin-bottom-right translate-y-4 rotate-[-5deg] drop-shadow-xl transition-all duration-700 group-hover:translate-y-0 group-hover:rotate-0">
                          <LaFijaCard {...t.landing.home.bento.card1Cards[2]} />
                        </div>
                        {/* Carta 2 */}
                        <div className="w-[320px] shrink-0 origin-bottom-right translate-y-4 rotate-[-5deg] drop-shadow-xl transition-all duration-700 group-hover:translate-y-0 group-hover:rotate-0">
                          <LaFijaCard {...t.landing.home.bento.card1Cards[1]} />
                        </div>
                        {/* Carta 1 */}
                        <div className="w-[320px] shrink-0 origin-bottom-right translate-y-4 rotate-[-5deg] drop-shadow-xl transition-all duration-700 group-hover:translate-y-0 group-hover:rotate-0">
                          <LaFijaCard {...t.landing.home.bento.card1Cards[0]} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Gestión de Riesgo (Span 1x2) */}
          <ScrollReveal
            direction="up"
            delay={0.2}
            className="md:col-span-1 md:row-span-2"
          >
            <div className="group bg-glass-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/5 p-6 transition-colors hover:bg-white/[0.04]">
              <div className="relative z-10 mb-auto">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                  <ShieldCheck className="h-5 w-5 text-white/70" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {t.landing.home.bento.card2.title}
                </h3>
                <p className="text-sm text-white/60">
                  {t.landing.home.bento.card2.description}
                </p>
              </div>

              {/* Graphic: Stake Wireframe */}
              <div className="pointer-events-none relative mt-6 flex h-40 w-full translate-y-4 flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] p-4 transition-transform duration-500 group-hover:translate-y-2">
                <div className="from-primary-light/30 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="z-10 flex flex-col gap-2">
                  <div className="h-2 w-12 rounded-full bg-white/10" />
                  <div className="flex h-6 w-full items-center rounded-md border border-white/10 bg-white/5 px-2">
                    <span className="font-mono text-[10px] text-white/40">
                      Bankroll: $10,000
                    </span>
                  </div>
                </div>
                <div className="z-10 mt-auto flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-16 rounded-full bg-white/10" />
                    <span className="text-status-success font-mono text-[10px] font-bold">
                      Kelly: 3%
                    </span>
                  </div>
                  <div className="bg-primary-light/40 border-primary-light/30 flex h-6 w-full items-center rounded-md border px-2">
                    <span className="font-mono text-[10px] text-white">
                      Stake: $300
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Transparencia (Span 1x2) */}
          <ScrollReveal
            direction="up"
            delay={0.3}
            className="md:col-span-1 md:row-span-2"
          >
            <div className="group bg-glass-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/5 p-6 transition-colors hover:bg-white/[0.04]">
              <div className="relative z-10 mb-auto">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                  <LineChart className="h-5 w-5 text-white/70" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {t.landing.home.bento.card3.title}
                </h3>
                <p className="text-sm text-white/60">
                  {t.landing.home.bento.card3.description}
                </p>
              </div>

              {/* Graphic: Data Table Wireframe */}
              <div className="relative z-10 mt-8 flex flex-1 flex-col items-start justify-end gap-4">
                <div>
                  <span className="text-status-success text-4xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(var(--color-status-success-rgb),0.3)]">
                    +12.4%
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-wider text-white/40 uppercase">
                    {t.landing.home.bento.card3.yieldLabel}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-bold tracking-tighter text-white/90">
                    65.2%
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-wider text-white/40 uppercase">
                    {t.landing.home.bento.card3.hitRateLabel}
                  </span>
                </div>
              </div>

              {/* Vertical Ledger Graphic */}
              <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-64 bg-gradient-to-l from-white/[0.02] to-transparent" />
              <div className="absolute right-6 -bottom-2 flex flex-col gap-6 [mask-image:linear-gradient(to_bottom,transparent_0%,black_70%,transparent_100%)] opacity-30 transition-opacity group-hover:opacity-60">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <div className="h-2 w-12 rounded-full bg-white/20" />
                      <div className="bg-primary/40 h-2 w-28 rounded-full" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-2 w-20 rounded-full bg-white/10" />
                      <div className="bg-status-success/60 h-2 w-10 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Top 5 Ligas (Span 1x1) */}
          <ScrollReveal
            direction="up"
            delay={0.4}
            className="md:col-span-1 md:row-span-1"
          >
            <div className="group bg-glass-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/5 transition-colors hover:bg-white/[0.04]">
              <div className="relative z-10 p-6 pb-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <Trophy className="h-4 w-4 text-white/70" />
                  </div>
                  <h3 className="text-md font-bold text-white">
                    {t.landing.home.bento.card4.title}
                  </h3>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                  {t.landing.home.bento.card4.description}
                </p>
              </div>

              {/* Graphic: Diagonal Slices (Logos) */}
              <div className="pointer-events-none relative flex min-h-[160px] w-full flex-1 items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
                <div className="absolute -inset-x-8 -inset-y-4 flex skew-x-[-15deg] transition-transform duration-700 group-hover:scale-105">
                  {/* Serie A */}
                  <div className="flex flex-1 items-center justify-center border-r border-white/5 bg-white/[0.02]">
                    <div className="skew-x-[15deg]">
                      <Image
                        src="/serie-a.svg"
                        alt="Serie A"
                        width={35}
                        height={35}
                        className="opacity-40 drop-shadow-lg grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                  {/* Bundesliga */}
                  <div className="flex flex-1 items-center justify-center border-r border-white/5 bg-white/[0.03]">
                    <div className="skew-x-[15deg]">
                      <Image
                        src="/bundesliga.svg"
                        alt="Bundesliga"
                        width={40}
                        height={40}
                        className="opacity-40 drop-shadow-lg grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                  {/* Premier League */}
                  <div className="flex flex-1 items-center justify-center border-r border-white/5 bg-white/[0.02]">
                    <div className="skew-x-[15deg]">
                      <Image
                        src="/premier.svg"
                        alt="Premier"
                        width={55}
                        height={55}
                        className="opacity-40 drop-shadow-lg grayscale transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                  {/* LaLiga */}
                  <div className="flex flex-1 items-center justify-center border-r border-white/5 bg-white/[0.03]">
                    <div className="skew-x-[15deg]">
                      <Image
                        src="/laliga-modern.svg"
                        alt="LaLiga"
                        width={35}
                        height={35}
                        className="opacity-40 drop-shadow-lg grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                  {/* Ligue 1 */}
                  <div className="flex flex-1 items-center justify-center bg-white/[0.02]">
                    <div className="skew-x-[15deg]">
                      <Image
                        src="/ligue1.svg"
                        alt="Ligue 1"
                        width={35}
                        height={45}
                        className="object-contain opacity-40 drop-shadow-lg grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 5: Torneos Internacionales (Span 1x1) */}
          <ScrollReveal
            direction="up"
            delay={0.5}
            className="md:col-span-1 md:row-span-1"
          >
            <div className="group bg-glass-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/5 transition-colors hover:bg-white/[0.04]">
              {/* Right side: Wireframe Globe (Supabase Style, moved to top-level to prevent cut-off) */}
              <div className="pointer-events-none absolute -right-12 -bottom-16 z-0 h-72 w-72 transform opacity-30 transition-all duration-1000 group-hover:scale-105 group-hover:rotate-[5deg] group-hover:opacity-70">
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full fill-none stroke-white/20"
                  strokeWidth="0.5"
                >
                  <defs>
                    <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.05" />
                      <stop
                        offset="100%"
                        stopColor="transparent"
                        stopOpacity="0"
                      />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="url(#globe-glow)"
                    className="stroke-white/30"
                    strokeWidth="1"
                  />

                  {/* Latitudes */}
                  <path d="M 10 100 A 90 30 0 0 0 190 100" />
                  <path d="M 17 65 A 83 25 0 0 0 183 65" />
                  <path d="M 33 35 A 67 15 0 0 0 167 35" />
                  <path d="M 17 135 A 83 25 0 0 0 183 135" />
                  <path d="M 33 165 A 67 15 0 0 0 167 165" />

                  {/* Longitudes */}
                  <path d="M 100 10 A 30 90 0 0 0 100 190" />
                  <path d="M 100 10 A 60 90 0 0 0 100 190" />
                  <path d="M 100 10 A 30 90 0 0 1 100 190" />
                  <path d="M 100 10 A 60 90 0 0 1 100 190" />

                  {/* Nodes and Connections */}
                  <circle
                    cx="100"
                    cy="100"
                    r="2.5"
                    className="fill-white stroke-none drop-shadow-[0_0_8px_white]"
                  />
                  <circle
                    cx="70"
                    cy="120"
                    r="2.5"
                    className="fill-white stroke-none drop-shadow-[0_0_8px_white]"
                  />
                  <circle
                    cx="130"
                    cy="70"
                    r="2.5"
                    className="fill-status-success stroke-none drop-shadow-[0_0_8px_var(--color-status-success)]"
                  />
                  <path
                    d="M 70 120 L 100 100 L 130 70"
                    className="stroke-white/40"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <div className="relative z-10 p-6 pb-2">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <Globe className="h-4 w-4 text-white/70" />
                  </div>
                  <h3 className="text-md font-bold text-white">
                    {t.landing.home.bento.card5.title}
                  </h3>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                  {t.landing.home.bento.card5.description}
                </p>
              </div>

              {/* Graphic: Tournaments Logos (no overflow-hidden, so it blends nicely) */}
              <div className="pointer-events-none relative z-10 mt-4 flex min-h-[140px] w-full flex-1 items-center [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
                <div className="bg-primary/5 absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                {/* Left side: Stacked Logos */}
                <div className="pointer-events-none relative z-10 flex w-1/2 translate-y-4 flex-col items-start gap-6 pl-8 opacity-40 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-90">
                  <Image
                    src="/champions.svg"
                    alt="Champions League"
                    width={45}
                    height={45}
                    className="object-contain brightness-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] grayscale transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:grayscale-0"
                  />
                  <Image
                    src="/europa.svg"
                    alt="Europa League"
                    width={55}
                    height={55}
                    className="object-contain brightness-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] grayscale transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100 group-hover:drop-shadow-[0_0_15px_rgba(244,115,33,0.5)] group-hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 6: Escenario (Span 1x1) */}
          <ScrollReveal
            direction="up"
            delay={0.6}
            className="md:col-span-1 md:row-span-1"
          >
            <div className="group bg-glass-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/5 transition-colors hover:bg-white/[0.04]">
              <div className="relative z-10 p-6 pb-0">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <LayoutTemplate className="h-4 w-4 text-white/70" />
                  </div>
                  <h3 className="text-md font-bold text-white">
                    {t.landing.home.bento.card6.title}
                  </h3>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                  {t.landing.home.bento.card6.description}
                </p>
              </div>

              {/* Graphic: Large Pitch */}
              <div className="relative mt-2 flex min-h-[140px] w-full flex-1 items-end justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
                <div className="bg-primary/10 absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 top-6 bottom-0 mx-8 translate-y-4 rounded-t-3xl border-x border-t border-white/10 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.03))] opacity-40 transition-all duration-700 ease-out group-hover:translate-y-2 group-hover:opacity-80">
                  {/* Pitch lines */}
                  <div className="mx-auto h-8 w-1/2 rounded-b-md border-x border-b border-white/20" />
                  <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                  <div className="absolute top-1/2 left-0 h-px w-full bg-white/20" />
                  {/* Tactics nodes */}
                  <div className="bg-primary absolute top-[30%] left-[30%] h-2 w-2 animate-pulse rounded-full shadow-[0_0_10px_var(--color-primary)]" />
                  <div
                    className="bg-status-success absolute top-[60%] right-[30%] h-2 w-2 animate-pulse rounded-full shadow-[0_0_10px_var(--color-status-success)]"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="absolute top-[40%] right-[40%] h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 7: Estadísticas vs Promedios (Span 1x1) */}
          <ScrollReveal
            direction="up"
            delay={0.7}
            className="md:col-span-1 md:row-span-1"
          >
            <div className="group bg-glass-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/5 transition-colors hover:bg-white/[0.04]">
              <div className="relative z-10 p-6 pb-0">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <BarChart3 className="h-4 w-4 text-white/70" />
                  </div>
                  <h3 className="text-md font-bold text-white">
                    {t.landing.home.bento.card7.title}
                  </h3>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                  {t.landing.home.bento.card7.description}
                </p>
              </div>

              {/* Graphic: Full width Bell Curve */}
              <div className="relative mt-2 flex min-h-[140px] w-full flex-1 items-end overflow-hidden [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
                <svg
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none h-full w-full translate-y-4 transform opacity-40 transition-all duration-700 group-hover:translate-y-1 group-hover:scale-[1.02] group-hover:opacity-90"
                >
                  <defs>
                    <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--color-primary)"
                        stopOpacity="0.6"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-primary)"
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 0 100 C 60 100, 70 10, 100 10 C 130 10, 140 100, 200 100"
                    fill="url(#bellGrad)"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="100"
                    y1="10"
                    x2="100"
                    y2="100"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeDasharray="4,4"
                    opacity="0.4"
                  />
                  <circle
                    cx="100"
                    cy="10"
                    r="3"
                    fill="var(--color-white)"
                    filter="url(#glow)"
                  />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
