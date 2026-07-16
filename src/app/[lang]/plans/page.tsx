import React from 'react';
import { plans } from '@/data/plans';
import { useTranslations } from '@/data/translations';
import { SecondaryPageLayout } from '@/components/shared/SecondaryPageLayout';
import { PlanCard } from '@/components/cards/PlanCard';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PlansPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';
  const t = useTranslations(currentLang);

  return (
    <SecondaryPageLayout
      title={t.landing.plans.title}
      description={t.landing.plans.description}
    >
      <div className="flex w-full flex-wrap items-stretch justify-center gap-8 px-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} lang={currentLang} />
        ))}
      </div>
    </SecondaryPageLayout>
  );
}
