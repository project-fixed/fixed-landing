import React from 'react';
import type { Plan } from '@/data/plans';
import { useTranslations, type Lang } from '@/data/translations';
import { ButtonArrow } from '@/shared/components/ui/ButtonArrow';

interface Props {
  plan: Plan;
  lang: Lang;
}

const icons: Record<string, React.ReactNode> = {
  starter: (
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
  ),
  pro: (
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
  ),
  elite: (
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
      <path d="M12 2l3 7h7l-5.5 5.5L18 22l-6-3.5L6 22l1.5-7.5L2 9h7z" />
    </svg>
  ),
};

const planOrder: Record<string, string> = {
  starter: '01',
  pro: '02',
  elite: '03',
};

export const PlanCard: React.FC<Props> = ({ plan, lang }) => {
  const t = useTranslations(lang);
  const appAuthUrl = 'https://app.fixed.com/auth';
  const planT = t.landing.plans.plan[plan.id];

  const features = Object.values(planT.features);
  const isFree = plan.monthlyPrice === 0;
  const label = plan.isPopular
    ? `[ ${planOrder[plan.id]} // POPULAR ]`
    : `[ ${planOrder[plan.id]} // ${plan.id.toUpperCase()} ]`;

  return (
    <div
      className={`bg-main-glass relative flex min-h-[460px] w-full max-w-[380px] flex-col items-start rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.01] ${
        plan.isPopular
          ? 'border-primary/40 bg-primary/[0.01] hover:border-primary'
          : 'border-white/5 hover:border-white/15'
      }`}
    >
      {plan.isPopular && (
        <span className="border-primary/30 bg-primary/10 text-primary absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full border px-3 py-0.5 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase backdrop-blur-sm">
          Most Popular
        </span>
      )}

      <div className="flex w-full items-center justify-between">
        <div className="text-primary rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
          {icons[plan.id]}
        </div>
        <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
          {label}
        </span>
      </div>

      <h3 className="mt-6 font-mono text-xl font-bold tracking-wider text-white uppercase">
        {planT.title}
      </h3>
      <p className="text-muted mt-2 min-h-[40px] text-start font-sans text-sm leading-relaxed">
        {planT.description}
      </p>

      <div className="my-5 w-full border-t border-white/5" />

      <div className="mb-1 font-mono text-3xl font-bold tracking-tight text-white uppercase">
        {isFree ? 'Free' : `$${plan.monthlyPrice.toFixed(2)}`}
        {!isFree && (
          <span className="text-muted ml-1.5 font-mono text-[10px] font-normal tracking-widest uppercase">
            / month
          </span>
        )}
      </div>

      {plan.annualPrice && (
        <p className="text-muted mb-5 font-mono text-[11px] tracking-wide">
          or ${plan.annualPrice.toFixed(2)}/month billed annually
        </p>
      )}

      {isFree && <div className="mb-5" />}

      <ul className="m-0 mb-6 w-full grow list-none space-y-3.5 p-0 text-left">
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
              className="text-status-success mt-0.5 size-4 shrink-0"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-muted font-sans text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <ButtonArrow
        href={`${appAuthUrl}?lang=${lang}&plan=${plan.id}`}
        className="w-full"
      >
        {planT.cta}
      </ButtonArrow>
    </div>
  );
};
