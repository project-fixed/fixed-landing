import React from 'react';
import { useTranslations, type Lang } from '../data/translations';

export interface Props {
  lang: Lang;
}

export const AILayers: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.ai.layers;

  const layers = [
    {
      level: '1',
      title: data.layer1.title,
      description: data.layer1.description,
      heightClass: 'min-h-[260px] lg:min-h-[280px]',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    },
    {
      level: '2',
      title: data.layer2.title,
      description: data.layer2.description,
      heightClass: 'min-h-[260px] lg:min-h-[340px]',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    },
    {
      level: '3',
      title: data.layer3.title,
      description: data.layer3.description,
      heightClass: 'min-h-[260px] lg:min-h-[400px]',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    },
    {
      level: '4',
      title: data.layer4.title,
      description: data.layer4.description,
      heightClass: 'min-h-[260px] lg:min-h-[460px]',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    },
  ];

  return (
    <section className="page-section flex flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1200px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white md:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto max-w-[600px] text-base leading-relaxed text-zinc-400">
            {data.description}
          </p>
        </div>

        {/* Staircase Grid */}
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {layers.map((layer) => (
            <div
              key={layer.level}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-[20px] border border-white/5 bg-zinc-900/40 p-6 transition-all duration-500 hover:border-white/10 hover:bg-zinc-900/80 md:p-8 ${layer.heightClass}`}
            >
              {/* Abstract hashed background pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)',
                }}
              ></div>

              {/* Top Element (Icon & Level) */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <div
                  className="text-primary opacity-80 transition-opacity group-hover:opacity-100"
                  dangerouslySetInnerHTML={{ __html: layer.icon }}
                />
              </div>

              <div className="absolute top-6 right-6">
                <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  Lvl {layer.level}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="group-hover:text-primary mb-3 font-mono text-xl font-bold tracking-tight text-white transition-colors md:text-2xl">
                  {layer.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {layer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
