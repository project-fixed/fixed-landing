import React from 'react';
import Link from 'next/link';
import type { Plan } from '../data/plans';
import { useTranslations, type Lang } from '../data/translations';
import { ButtonArrow } from './ui/ButtonArrow';

interface Props {
  plan: Plan;
  lang: Lang;
}

export const PlanCard: React.FC<Props> = ({ plan, lang }) => {
  const t = useTranslations(lang);
  const appAuthUrl = 'https://app.fixed.com/auth';

  return (
    <div className="bg-main-glass hover:border-primary/30 flex min-h-[460px] w-full max-w-[350px] flex-col items-start gap-4 rounded-3xl border border-white/5 p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex w-full items-center justify-between">
        {/* Star/Crown icon */}
        <div className="text-primary rounded-2xl border border-white/5 bg-zinc-800/50 p-3">
          {plan.icon.includes('star') ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
              className="size-6"
            >
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
              <path d="M5 20h14a2 2 0 0 0 2-2H3a2 2 0 0 0 2 2z" />
            </svg>
          )}
        </div>

        <div className="text-right text-xl font-extrabold text-white">
          {plan.price === 0 ? 'FREE' : `$${plan.price}`}
          <span className="text-xs font-semibold text-zinc-400">
            /{plan.price === 0 ? '10 days' : 'month'}
          </span>
        </div>
      </div>

      <h2 className="pt-6 text-start text-2xl font-extrabold text-white">
        {plan.name}
      </h2>
      <p className="min-h-[40px] pr-12 text-start text-sm text-zinc-400 max-[320px]:pr-0">
        {plan.description}
      </p>

      <ul className="m-0 mb-6 w-full flex-grow list-none p-0 text-left">
        {plan.features.map((feature, idx) => (
          <li
            key={idx}
            className="mb-4 flex items-start gap-2.5 text-sm text-zinc-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 size-5 flex-shrink-0 text-green-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{feature}</span>
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
