import React from 'react';
import { useTranslations } from '@/data/translations';
import { OddsMarquee } from '@/app/[lang]/(home)/components/widgets/OddsMarquee';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { AiTimelineSection } from './components/sections/AiTimelineSection';
import { DataStreamSection } from '@/app/[lang]/(home)/components/widgets/DataStreamSection';
import { AiLayersSection } from './components/sections/AiLayersSection';
import { BrandsSection } from './components/sections/BrandsSection';
import { AboutSection } from './components/sections/AboutSection';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';
  const t = useTranslations(currentLang);
  const appAuthUrl = 'https://app.fixed.com/auth';

  return (
    <div className="relative w-full">
      {/* Hero Section Fija (Sticky Background Layer alineada a la línea roja inicial) */}
      <div className="sticky top-0 z-0 flex min-h-[460px] w-full flex-col justify-center md:h-[calc(100vh-200px)]">
        <HeroSection currentLang={currentLang} t={t} />
        <div className="bg-pattern-stripes pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Capa Cortina (Subes por encima de Hero al hacer scroll) */}
      <div
        className="relative z-10 w-full border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, var(--color-primary-darkest) -50%, var(--background) 45%)',
        }}
      >
        <OddsMarquee lang={currentLang} />

        <FeaturesSection t={t} />
        <AiTimelineSection lang={currentLang} id="process" />
        <DataStreamSection lang={currentLang} />
        <AiLayersSection lang={currentLang} />
        <BrandsSection />
        <AboutSection currentLang={currentLang} t={t} appAuthUrl={appAuthUrl} />
      </div>
    </div>
  );
}
