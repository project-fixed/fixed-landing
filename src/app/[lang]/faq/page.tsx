import React from 'react';
import { useTranslations } from '@/data/translations';
import { FaqAccordion } from '@/components/FaqAccordion';

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
    <section className="container mx-auto flex w-full flex-col items-center justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 w-full max-w-[700px] text-center">
        <h2 className="mb-6 text-5xl leading-tight font-extrabold text-white">
          {t.landing.faq.title}
        </h2>
        <p className="mx-auto max-w-[600px] text-base leading-relaxed text-zinc-300 max-sm:px-4">
          {t.landing.faq.description}
        </p>
      </div>

      {/* Faq Accordion Island */}
      <div className="w-full max-w-[800px] px-4">
        <FaqAccordion lang={currentLang} />
      </div>
    </section>
  );
}
