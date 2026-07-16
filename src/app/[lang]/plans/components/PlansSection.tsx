import React from 'react';
import { plans } from '@/data/plans';
import type { Lang } from '@/data/translations';
import { useTranslations } from '@/data/translations';
import { PlanCard } from '@/components/cards/PlanCard';

interface Props {
  lang: Lang;
}

export const PlansSection: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);

  return (
    <>
      <div className="mx-auto mb-16 w-full max-w-[700px] text-center">
        <h2 className="mb-6 text-5xl leading-tight font-extrabold text-white">
          {t.landing.plans.title}
        </h2>
        <p className="text-text-body mx-auto max-w-[600px] text-base leading-relaxed max-sm:px-4">
          {t.landing.plans.description}
        </p>
      </div>

      <div className="flex w-full flex-wrap items-stretch justify-center gap-8 px-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} lang={lang} />
        ))}
      </div>
    </>
  );
};
