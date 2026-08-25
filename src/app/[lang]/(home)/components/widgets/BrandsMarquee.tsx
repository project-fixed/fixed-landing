'use client';

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

const leagues = [
  'Premier League',
  'LaLiga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Champions League',
  'Europa League',
  'Mundial',
];

export const BrandsMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px 0px' });

  return (
    <section
      ref={containerRef}
      id="brands"
      className="page-section flex-col justify-center border-y border-white/10 bg-black/20 py-4"
    >
      <ScrollReveal direction="up" delay={0.1}>
        <div
          className="scroller w-full overflow-hidden mask-[linear-gradient(90deg,transparent,white_20%,white_80%,transparent)]"
          data-direction="right"
          data-speed="slow"
        >
          <div
            className={`scroller-inner animate-marquee flex w-max flex-nowrap items-center gap-24 py-4 ${
              isInView ? '' : '[animation-play-state:paused]'
            }`}
          >
            {/* Render 4 sets of items to ensure seamless loop on ultrawide screens */}
            {[...Array(4)].map((_, setIdx) => (
              <React.Fragment key={`set-${setIdx}`}>
                {leagues.map((league, idx) => (
                  <span
                    key={`league-${setIdx}-${idx}`}
                    className="text-md font-mono font-bold tracking-wider text-white/30 uppercase transition-colors duration-300 hover:text-white/80 lg:text-xl"
                    aria-hidden={setIdx !== 0}
                  >
                    {league}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
