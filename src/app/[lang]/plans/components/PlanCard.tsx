import React from 'react';

import type { Plan } from '@/data/plans';
import { useTranslations, type Lang } from '@/data/translations';
import { ButtonArrow } from '@/shared/components/ui/ButtonArrow';

interface Props {
  plan: Plan;
  lang: Lang;
}

export const PlanCard: React.FC<Props> = ({ plan, lang }) => {
  const t = useTranslations(lang);
  const appAuthUrl = 'https://app.fixed.com/auth';

  const isPremium = plan.id === '2';
  const planT = isPremium
    ? t.landing.plans.plan.premium
    : t.landing.plans.plan.free;

  // Split translated price (e.g. "Free/10Days" or "$19.99/Month") into amount and period
  const [priceAmount, pricePeriod] = planT.price.split('/');
  const features = Object.values(planT.features);

  return (
    <div
      className={`bg-main-glass flex min-h-[460px] w-full max-w-[350px] flex-col items-start rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.01] ${
        isPremium
          ? 'border-primary/40 bg-primary/[0.01] hover:border-primary'
          : 'border-white/5 hover:border-white/15'
      }`}
    >
      <div className="flex w-full items-center justify-between">
        {/* Star/Crown icon */}
        <div className="text-primary rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
          {isPremium ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
              <path d="M5 20h14a2 2 0 0 0 2-2H3a2 2 0 0 0 2 2z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
        </div>

        {/* Technical Label */}
        <span className="text-text-muted font-mono text-[10px] tracking-widest uppercase">
          {isPremium ? '[ 02 // PREMIUM ]' : '[ 01 // BASIC ]'}
        </span>
      </div>

      <h3 className="text-text-primary mt-6 font-mono text-xl font-bold tracking-wider uppercase">
        {planT.title}
      </h3>
      <p className="text-text-muted mt-2 min-h-[40px] text-start font-sans text-sm leading-relaxed">
        {planT.description}
      </p>

      {/* Grid Precision Line Divider */}
      <div className="my-5 w-full border-t border-white/5" />

      {/* Price Render */}
      <div className="text-text-primary mb-5 font-mono text-3xl font-bold tracking-tight uppercase">
        {priceAmount}
        {pricePeriod && (
          <span className="text-text-muted ml-1.5 font-mono text-[10px] font-normal tracking-widest uppercase">
            / {pricePeriod}
          </span>
        )}
      </div>

      <ul className="m-0 mb-6 w-full flex-grow list-none space-y-3.5 p-0 text-left">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-status-success mt-0.5 size-4 flex-shrink-0"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-text-muted font-sans text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <ButtonArrow
        href={`${appAuthUrl}?lang=${lang}&plan=${plan.id}`}
        className="w-full"
      >
        {t.button.getStarted}
      </ButtonArrow>
    </div>
  );
};
