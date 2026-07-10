import React from 'react';
import { KeyPointCard } from './KeyPointCard';
import { useTranslations, type Lang } from '../data/translations';

export interface Props {
  lang: Lang;
}

export const KeyPointsCarousel: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);

  const points = [
    {
      delay: -5,
      title: t.landing.home.hero.key.point1.title,
      description: t.landing.home.hero.key.point1.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    },
    {
      delay: -4,
      title: t.landing.home.hero.key.point2.title,
      description: t.landing.home.hero.key.point2.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6" rx="1"></rect><path d="M9 1v3"></path><path d="M15 1v3"></path><path d="M9 20v3"></path><path d="M15 20v3"></path><path d="M20 9h3"></path><path d="M20 15h3"></path><path d="M1 9h3"></path><path d="M1 15h3"></path></svg>`,
    },
    {
      delay: -3,
      title: t.landing.home.hero.key.point3.title,
      description: t.landing.home.hero.key.point3.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
    },
    {
      delay: -2,
      title: t.landing.home.hero.key.point4.title,
      description: t.landing.home.hero.key.point4.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    },
    {
      delay: -1,
      title: t.landing.home.hero.key.point5.title,
      description: t.landing.home.hero.key.point5.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
    },
    {
      delay: 0,
      title: t.landing.home.hero.key.point6.title,
      description: t.landing.home.hero.key.point6.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="m13 2-2 10h9L9 22l2-10H3L13 2z"></path></svg>`,
    },
  ];

  return (
    <div className="relative flex h-[450px] w-[450px] items-center justify-center max-md:h-[350px] max-md:w-[350px]">
      {/* Rotative Cards */}
      {points.map((point, index) => (
        <div
          key={index}
          className="animate-point-card pointer-events-none absolute z-10 w-[400px] opacity-0 max-[425px]:w-[320px] max-[375px]:w-[290px] lg:w-[350px]"
          style={{ '--delay': point.delay } as React.CSSProperties}
        >
          <KeyPointCard
            title={point.title}
            description={point.description}
            className="w-full"
            icon={<div dangerouslySetInnerHTML={{ __html: point.icon }} />}
          />
        </div>
      ))}

      {/* Glowing Background Circle */}
      <div className="pointer-events-none absolute z-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] max-md:h-[250px] max-md:w-[250px]"></div>
    </div>
  );
};
