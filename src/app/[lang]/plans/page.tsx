import React from 'react';
import { plans } from '@/data/plans';
import { useTranslations } from '@/data/translations';
import { PlanCard } from '@/app/[lang]/plans/components/PlanCard';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { GridBackground } from '@/shared/components/ui/GridBackground';

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
    <section className="page-section flex min-h-screen flex-col items-center gap-24 pt-36 lg:flex-row">
      <GridBackground gridOpacity={0.05} showGradientOverlay />

      <ScrollReveal
        direction="up"
        delay={0.1}
        className="w-full lg:w-1/3 lg:self-start"
      >
        <h1 className="title-hero">{t.landing.plans.title}</h1>
        <span className="bg-primary/50 mt-4 block h-[10px] w-14" />
        <p className="text-muted mt-6 max-w-[400px] leading-relaxed">
          {t.landing.plans.description}
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.25} className="w-full lg:w-2/3">
        <div className="flex w-full flex-wrap items-stretch justify-center gap-8">
          {plans.map((plan, index) => (
            <ScrollReveal
              key={plan.id}
              direction="up"
              delay={0.2 + index * 0.15}
            >
              <PlanCard plan={plan} lang={currentLang} />
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
