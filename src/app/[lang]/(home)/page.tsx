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
    <>
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
