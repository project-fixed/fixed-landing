import React from 'react';
import { plans } from '@/data/plans';
import { useTranslations } from '@/data/translations';
import { PlanCard } from '@/app/[lang]/plans/components/PlanCard';

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
    <section className="page-section flex min-h-screen flex-col items-center justify-center pt-32 pb-24">
      <div className="mx-auto mb-16 w-full max-w-[700px] text-center">
        <h1 className="mb-6 font-mono text-[clamp(2rem,6vw,3.5rem)] leading-tight font-extrabold tracking-tight text-white uppercase">
          {t.landing.plans.title}
        </h1>
        <p className="text-text-muted mx-auto max-w-[600px] text-base leading-relaxed">
          {t.landing.plans.description}
        </p>
      </div>
      <div className="flex w-full flex-wrap items-stretch justify-center gap-8 px-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} lang={currentLang} />
        ))}
      </div>
    </section>
  );
}
