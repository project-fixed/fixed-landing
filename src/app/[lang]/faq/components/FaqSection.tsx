import React from 'react';
import type { Lang } from '@/data/translations';
import { useTranslations } from '@/data/translations';
import { FaqAccordion } from '@/app/[lang]/faq/components/FaqAccordion';

interface Props {
  lang: Lang;
}

export const FaqSection: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);

  return (
    <>
      <div className="mx-auto mb-12 w-full max-w-[700px] text-center">
        <h2 className="title-section mb-6">{t.landing.faq.title}</h2>
        <p className="text-text-body mx-auto max-w-[600px] text-base leading-relaxed max-sm:px-4">
          {t.landing.faq.description}
        </p>
      </div>

      <div className="w-full max-w-[800px] px-4">
        <FaqAccordion lang={lang} />
      </div>
    </>
  );
};
