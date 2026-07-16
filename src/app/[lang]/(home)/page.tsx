import React from 'react';
import { useTranslations } from '@/data/translations';
import { OddsMarquee } from '@/components/features/OddsMarquee';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { AiTimelineSection } from './components/AiTimelineSection';
import { DataStreamSection } from '@/components/features/DataStreamSection';
import { AiLayersSection } from './components/AiLayersSection';
import { BrandsSection } from './components/BrandsSection';
import { AboutSection } from './components/AboutSection';

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
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_-10%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_65%)]" />

      <HeroSection currentLang={currentLang} t={t} />

      <OddsMarquee lang={currentLang} />

      <FeaturesSection t={t} />

      <AiTimelineSection lang={currentLang} id="process" />
      <DataStreamSection lang={currentLang} />
      <AiLayersSection lang={currentLang} />

      <BrandsSection />

      <AboutSection currentLang={currentLang} t={t} appAuthUrl={appAuthUrl} />
    </>
  );
}
