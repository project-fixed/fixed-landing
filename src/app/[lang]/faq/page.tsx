import React from 'react';
import { useTranslations } from '@/data/translations';
import { SecondaryPageLayout } from '@/components/shared/SecondaryPageLayout';
import { FaqAccordion } from '@/components/shared/FaqAccordion';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function FaqPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';
  const t = useTranslations(currentLang);

  return (
    <SecondaryPageLayout
      title={t.landing.faq.title}
      description={t.landing.faq.description}
    >
      <div className="w-full max-w-[800px] px-4">
        <FaqAccordion lang={currentLang} />
      </div>
    </SecondaryPageLayout>
  );
}
