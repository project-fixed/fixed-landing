import React from 'react';
import Image from 'next/image';
import { useTranslations } from '@/data/translations';
import { AvatarGroup } from '@/components/AvatarGroup';
import { FloatingKeyPoints } from '@/components/FloatingKeyPoints';
import { KeyPointsGrid } from '@/components/KeyPointsGrid';
import { OddsMarquee } from '@/components/OddsMarquee';
import { BrandsCarousel } from '@/components/BrandsCarousel';
import { DataStreamMarquee } from '@/components/DataStreamMarquee';
import { AITimeline } from '@/components/AITimeline';
import { AILayers } from '@/components/AILayers';
import { ButtonArrow } from '@/components/ui/ButtonArrow';
import { ButtonSparkle } from '@/components/ui/ButtonSparkle';
import PitchGeometryBackground from '@/components/PitchGeometryBackground';
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

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="page-section relative overflow-hidden px-4 pt-28 pb-8 text-center sm:px-6 lg:px-8"
      >
        <PitchGeometryBackground />

        <div className="relative flex min-h-[70vh] flex-col items-center justify-center">
          {/* Floating Background Cards */}
          <FloatingKeyPoints />

          <div className="animate-fade-in z-10 flex w-full max-w-[850px] flex-col items-center py-8 xl:py-16">
            <h1 className="text-5xl leading-tight font-extrabold text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
              <span className="text-primary">
                {t.landing.home.hero.title.start}
              </span>{' '}
              {t.landing.home.hero.title.center}{' '}
              <span className="text-primary">
                {t.landing.home.hero.title.end}
              </span>
            </h1>

            <p className="relative z-20 mt-8 max-w-[650px] leading-relaxed text-zinc-300 drop-shadow-lg">
              {t.landing.home.hero.description}
            </p>

            {/* Beta Subscription Form */}
            <form className="focus-within:border-primary/50 focus-within:shadow-primary/20 relative z-20 mt-10 flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 p-2 shadow-2xl backdrop-blur-md transition-all duration-300 focus-within:scale-[1.02] hover:scale-[1.02] hover:border-white/20 active:scale-[0.99]">
              <input
                type="email"
                placeholder={t.landing.home.hero.betaPlaceholder}
                className="flex-1 bg-transparent px-4 py-2 text-white outline-none placeholder:text-zinc-500"
                required
              />
              <ButtonSparkle type="submit" className="px-6 py-2.5 text-sm">
                {t.landing.home.hero.betaButton}
              </ButtonSparkle>
            </form>

            <div className="relative z-20 mt-8 flex hidden items-center gap-5 px-6 py-3">
              <AvatarGroup />
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <p className="text-sm font-medium text-zinc-300">
                {t.landing.home.hero.online}
              </p>
            </div>

            {/* Bounce arrow icon on mobile */}
            <div className="flex justify-center pt-16 lg:hidden">
              <a
                href="#features"
                className="hover:text-primary text-white transition-colors"
                aria-label="Scroll to features"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-8 animate-bounce"
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
        </div>
        {/* Live Odds/Value Marquee Section */}
        <div className="mx-auto flex justify-center px-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {t.landing.home.hero.oddsTitle}
          </span>
        </div>
      </section>

      <OddsMarquee lang={currentLang} />

      {/* Static Key Points Grid (Social Proof & Authority) */}
      <KeyPointsGrid lang={currentLang} />

      {/* Features Section */}
      <section id="features" className="page-section pt-20">
        <div className="w-full px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mx-auto my-6 max-w-[700px] text-5xl leading-tight font-extrabold text-white">
            {t.landing.home.features.title}
          </h2>
          <p className="mx-auto max-w-[800px] text-base leading-relaxed text-zinc-300">
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
        className="bg-linear-to-b from-transparent via-zinc-900/20 to-transparent py-12"
      >
        <AITimeline lang={currentLang} />
        <DataStreamMarquee lang={currentLang} />
        <AILayers lang={currentLang} />
      </div>

      {/* Brands Carousel Section */}
      <section
        id="brands"
        className="flex w-full justify-center border-y border-white/5 bg-black/30 py-10"
      >
        <BrandsCarousel />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="page-section flex flex-wrap items-center justify-center gap-12 px-4 py-28 sm:px-6 lg:px-8"
      >
        <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-12">
          {/* Rounded asymmetric image layout */}
          <div className="max-w-[450px] overflow-hidden rounded-[40%_20%] border border-white/10 shadow-2xl">
            <Image
              src={imgAbout}
              alt="Image - About"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="w-[min(100%,500px)] text-left">
            <h2 className="text-5xl leading-tight font-extrabold text-white">
              {t.landing.home.about.title}
            </h2>
            <span className="text-primary mt-2 block text-2xl font-bold">
              {t.landing.home.about.subtitle}
            </span>
            <p className="my-6 text-base leading-relaxed text-zinc-300">
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
