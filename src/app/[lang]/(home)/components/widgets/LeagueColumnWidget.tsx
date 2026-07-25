import React from 'react';
import { OddsCard } from './OddsCard';

export interface MatchPickData {
  ev: string;
  time: string;
  prob: string;
  odd: string;
  bet: string;
  teams: string;
  statusColor: 'green' | 'red';
}

export interface LeagueColumnData {
  id: string;
  league: string;
  picks: MatchPickData[];
}

export interface LeagueColumnWidgetProps {
  column: LeagueColumnData;
  className?: string;
}

/**
 * Reusable column card component for displaying a league and its stacked pick cards.
 * Used in LeaguesPreview to showcase high value bets per league.
 */
export const LeagueColumnWidget: React.FC<LeagueColumnWidgetProps> = ({
  column,
  className = '',
}) => {
  return (
    <div
      className={`flex w-[230px] shrink-0 flex-col gap-2.5 rounded-xl border border-white/10 bg-black/80 p-3.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/25 sm:w-[250px] ${className}`}
    >
      {/* League Header */}
      <div className="border-b border-white/10 pb-2">
        <span className="font-mono text-[11px] font-extrabold tracking-wider text-white uppercase">
          {column.league}
        </span>
      </div>

      {/* 5 Stacked Match Cards using OddsCard in compact variant */}
      <div className="flex flex-col gap-2">
        {column.picks.map((pick, idx) => (
          <OddsCard
            key={idx}
            variant="compact"
            ev={pick.ev}
            time={pick.time}
            percent={pick.prob}
            odds={pick.odd}
            type={pick.bet}
            match={pick.teams}
            statusColor={pick.statusColor}
          />
        ))}
      </div>
    </div>
  );
};
