'use client';

import React, { useRef } from 'react';
import { OddsCard } from '@/app/[lang]/(home)/components/widgets/OddsCard';
import { translations, type Lang } from '@/data/translations';
import {
  type ModelPerformanceStats,
  type ResolvedPick,
} from '@/lib/model-record';
import { getMarketLabel } from '@/lib/market-labels';
import { useInView } from 'framer-motion';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

const MIN_PICKS_PER_ROW = 2;

function splitIntoRows<T>(items: T[], rowCount: number): T[][] {
  if (items.length < MIN_PICKS_PER_ROW * rowCount) {
    return items.length >= MIN_PICKS_PER_ROW ? [items] : [];
  }
  const base = Math.floor(items.length / rowCount);
  const extra = items.length % rowCount;
  const rows: T[][] = [];
  let offset = 0;
  for (let i = 0; i < rowCount; i++) {
    const size = base + (i < extra ? 1 : 0);
    rows.push(items.slice(offset, offset + size));
    offset += size;
  }
  return rows.filter((row) => row.length >= MIN_PICKS_PER_ROW);
}

interface Props {
  lang: Lang;
  picks: ResolvedPick[];
  stats: ModelPerformanceStats;
}

export const OddsMarquee: React.FC<Props> = ({ lang, picks, stats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px 0px' });
  const { oddsCaption, oddsResultsNote, betsCountLabel } =
    translations[lang].landing.home.hero;

  const rowCount = picks.length >= 12 ? 3 : picks.length >= 6 ? 2 : 1;
  const rows = splitIntoRows(picks, rowCount);

  if (rows.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="mask-marquee flex w-full flex-col gap-4 overflow-hidden border-y border-white/5 bg-black py-6 md:py-10"
    >
      <ScrollReveal
        direction="up"
        delay={0.2}
        className="flex w-full flex-col gap-4"
      >
        {rows.map((row, rowIdx) => (
          <div key={`row-${rowIdx}`} className="scroller w-full">
            <div
              className={`scroller-inner ${
                rowIdx % 2 === 0
                  ? 'animate-scroll-left'
                  : 'animate-scroll-right'
              } flex w-max flex-nowrap gap-4 ${
                isInView ? '' : '[animation-play-state:paused]'
              } hover:[animation-play-state:paused]`}
            >
              {[...row, ...row].map((pick, idx) => (
                <OddsCard
                  key={`r${rowIdx}-${idx}`}
                  percent={`${Math.round(pick.probability)}%`}
                  odds={pick.odds.toFixed(2)}
                  type={getMarketLabel(
                    pick.market,
                    pick.fixedOutcome,
                    pick.line,
                    lang,
                    pick.homeTeam,
                    pick.awayTeam,
                  )}
                  match={`${pick.homeTeam} vs ${pick.awayTeam}`}
                  ev={`${pick.ev >= 0 ? '+' : ''}${(pick.ev * 100).toFixed(1)}%`}
                  status={pick.status === 'WON' ? 'won' : 'lost'}
                  className="min-w-[280px]"
                />
              ))}
            </div>
          </div>
        ))}
        <p className="mt-2 text-center font-mono text-[10px] tracking-[0.2em] text-white/35 uppercase md:mt-4">
          {oddsCaption}
          <span className="mx-2 text-white/20">·</span>
          {stats.totalBets} {betsCountLabel}
          <span className="mx-2 text-white/20">·</span>
          {oddsResultsNote}
        </p>
      </ScrollReveal>
    </div>
  );
};
