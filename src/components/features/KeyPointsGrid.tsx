import React from 'react';
import { useTranslations, type Lang } from '@/data/translations';

export interface Props {
  lang: Lang;
}

export const KeyPointsGrid: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);

  const topStats = [
    {
      title: t.landing.home.hero.key.point1.title, // "75K"
      description: t.landing.home.hero.key.point1.description,
    },
    {
      title: t.landing.home.hero.key.point2.title, // "92.5%"
      description: t.landing.home.hero.key.point2.description,
    },
    {
      title: t.landing.home.hero.key.point3.title, // "30+"
      description: t.landing.home.hero.key.point3.description,
    },
  ];

  const bottomFeatures = [
    {
      title: t.landing.home.hero.key.point4.title, // "24/7"
      description: t.landing.home.hero.key.point4.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    },
    {
      title: t.landing.home.hero.key.point6.title, // "Instant"
      description: t.landing.home.hero.key.point6.description,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="m13 2-2 10h9L9 22l2-10H3L13 2z"></path></svg>`,
    },
  ];

  return (
    <section className="page-section flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-[1200px] flex-col gap-6">
        {/* Top Stats Banner */}
        <div className="bg-primary/90 from-primary to-primary/80 rounded-[24px] border border-white/10 bg-gradient-to-br p-8 shadow-2xl md:p-12">
          <div className="grid grid-cols-1 gap-8 divide-y divide-white/20 text-center md:grid-cols-3 md:gap-0 md:divide-x md:divide-y-0">
            {topStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-6 md:py-0"
              >
                <h3 className="mb-4 font-mono text-6xl font-bold tracking-tight text-white drop-shadow-sm md:text-7xl">
                  {stat.title}
                </h3>
                <p className="mx-auto max-w-[250px] text-sm font-medium text-white/90 md:text-base">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Features Cards */}
        <div className="grid min-h-[400px] grid-cols-1 gap-6 md:grid-cols-2">
          {bottomFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-surface-card/60 relative flex flex-col items-start overflow-hidden rounded-[24px] border border-white/5 p-8 shadow-2xl transition-colors duration-300 hover:border-white/10 md:p-12"
            >
              {/* Small Icon Box */}
              <div
                className="bg-surface-card/80 text-text-body z-10 mb-8 rounded-xl border border-white/5 p-3 shadow-inner"
                dangerouslySetInnerHTML={{ __html: feature.icon }}
              />

              {/* Content */}
              <h4 className="z-10 mb-6 font-mono text-3xl font-bold tracking-tight text-white md:text-4xl">
                {feature.title}
              </h4>
              <p className="text-text-muted z-10 max-w-[90%] text-lg leading-relaxed">
                {feature.description}
              </p>

              {/* Abstract Background Graphic (Using scaled up icon for texture) */}
              <div
                className="pointer-events-none absolute -right-20 -bottom-20 opacity-[0.03] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6 [&>svg]:h-[350px] [&>svg]:w-[350px]"
                dangerouslySetInnerHTML={{ __html: feature.icon }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
