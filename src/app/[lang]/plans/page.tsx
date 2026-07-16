import React from 'react';
import { plans } from '@/data/plans';
import { useTranslations } from '@/data/translations';
import { PlanCard } from '@/components/PlanCard';

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
    <section className="container mx-auto flex w-full flex-col items-center justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-16 w-full max-w-[700px] text-center">
        <h2 className="mb-6 text-5xl leading-tight font-extrabold text-white">
          {t.landing.plans.title}
        </h2>
        <p className="text-text-body mx-auto max-w-[600px] text-base leading-relaxed max-sm:px-4">
          {t.landing.plans.description}
        </p>
      </div>

      {/* Cards container */}
      <div className="flex w-full flex-wrap items-stretch justify-center gap-8 px-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} lang={currentLang} />
        ))}
      </div>
    </section>
  );
}
