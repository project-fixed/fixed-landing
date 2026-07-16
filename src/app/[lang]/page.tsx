import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/data/translations';
import { OddsMarquee } from '@/components/OddsMarquee';
import { BrandsCarousel } from '@/components/BrandsCarousel';
import { DataStreamMarquee } from '@/components/DataStreamMarquee';
import { AITimeline } from '@/components/AITimeline';
import { AILayers } from '@/components/AILayers';
import { ButtonArrow } from '@/components/ui/ButtonArrow';
import { BetaForm } from '@/components/BetaForm';
import { HeroBadge } from '@/components/HeroBadge';
import { HeroDecorativeGrid } from '@/components/HeroDecorativeGrid';
import { ScrollExpandVideo } from '@/components/ScrollExpandVideo';

// Static Image imports
import imgDashboard from '@/assets/images/dashboard.png';
import imgAbout from '@/assets/images/about.png';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';
  const t = useTranslations(currentLang);
  const appAuthUrl = 'https://app.fixed.com/auth';

  /** Stats shown at the bottom of the hero row */
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
    <>
      {/* ─── Hero Section ─────────────────────────────────────── */}

      {/* Subtle ambient top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_-10%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_65%)]" />
      <section
        id="hero"
        className="page-section relative mt-24 overflow-hidden border-y border-white/5 px-6 py-13 md:px-12 lg:px-20"
      >
        {/* Left spine */}
        <div
          className="pointer-events-none absolute inset-y-0 left-6 z-0 w-px bg-white/0 select-none md:left-12 lg:left-20"
          aria-hidden="true"
        />

        {/* Dot-grid decoration — right half only */}
        <HeroDecorativeGrid />

        <div className="relative z-10 flex w-full flex-col justify-between md:px-12 lg:px-20">
          {/* ── Top Content: 2-column layout ── */}
          <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
            {/* Left column: Badge + Heading + Description */}
            <div className="flex flex-col items-start">
              {/* Status badge */}
              <HeroBadge
                label={
                  currentLang === 'es'
                    ? 'Beta abierta · v0.8.5'
                    : 'Open Beta · v0.8.5'
                }
              />

              {/* Main heading — left-aligned, uppercase monospace, balanced breaks */}
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

              {/* Accent underline */}
              <span className="bg-primary mt-5 block h-[3px] w-12" />

              {/* Description */}
              <p className="text-text-muted mt-6 max-w-[480px] font-mono text-sm leading-relaxed">
                {t.landing.home.hero.description}
              </p>

              {/* Mobile: BetaForm sits here (below description, above stats) */}
              <div className="mt-8 w-full lg:hidden">
                <BetaForm lang={currentLang} />
              </div>

              {/* Mobile: scroll arrow */}
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

            {/* Right column: BetaForm — desktop only */}
            <div className="hidden h-full w-[380px] flex-shrink-0 flex-col lg:flex">
              {/* Panel wrapper */}
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

          {/* ── Bottom: Stats Row ── */}
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

      <OddsMarquee lang={currentLang} />

      {/* Features Section */}
      <section id="features" className="page-section pt-24 pb-16">
        <div className="w-full px-12 md:px-24 lg:px-40">
          {/* Section label */}
          <span className="text-text-ghost mb-4 block font-mono text-xs tracking-widest uppercase">
            features
          </span>
          <h2 className="text-mono mx-auto mb-4 max-w-[1100px] text-center text-7xl leading-tight font-extrabold text-white">
            {t.landing.home.features.title}
          </h2>
          <p className="text-text-body mx-auto max-w-[600px] text-center text-base leading-relaxed">
            {t.landing.home.features.description}
          </p>
        </div>

        <ScrollExpandVideo cursorText="Play intro">
          <Image
            src={imgDashboard}
            alt="Fixed Dashboard Screenshot"
            className="h-full w-full rounded-none object-cover"
            priority
          />
        </ScrollExpandVideo>
      </section>

      {/* AI Sections */}
      <div
        id="process"
        className="via-surface-card/20 mx-auto flex w-full flex-col items-center bg-linear-to-b from-transparent to-transparent py-12"
      >
        <AITimeline lang={currentLang} />
        <DataStreamMarquee lang={currentLang} />
        <AILayers lang={currentLang} />
      </div>

      {/* Brands Carousel Section */}
      <section
        id="brands"
        className="flex w-full flex-col justify-center border-y border-white/5 bg-black/30 px-4 py-10 sm:px-8 lg:px-12 xl:px-20"
      >
        <BrandsCarousel />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="page-section px-4 py-28 sm:px-8 lg:px-12 xl:px-20"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-16">
          {/* Image */}
          <div className="w-full overflow-hidden rounded-[40%_20%] border border-white/10 shadow-2xl lg:max-w-[480px]">
            <Image
              src={imgAbout}
              alt="Image - About"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="w-full text-left lg:max-w-[500px]">
            {/* Section label */}
            <span className="text-text-ghost mb-4 block font-mono text-xs tracking-widest uppercase">
              about
            </span>
            <h2 className="text-5xl leading-tight font-extrabold text-white">
              {t.landing.home.about.title}
            </h2>
            <span className="text-primary mt-2 block text-2xl font-bold">
              {t.landing.home.about.subtitle}
            </span>
            <p className="text-text-body my-6 text-base leading-relaxed">
              {t.landing.home.about.description}
            </p>

            <ButtonArrow href={`${appAuthUrl}?lang=${currentLang}`}>
              {t.button.getStarted}
            </ButtonArrow>
          </div>
        </div>
      </section>
    </>
  );
}
