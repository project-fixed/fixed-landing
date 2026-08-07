import React from 'react';
import { Clock, Target } from 'lucide-react';

interface LaFijaCardProps {
  league: string;
  ev: string;
  probLabel: string;
  time: string;
  match: string;
  prediction: string;
  oddsLabel: string;
  odds: string;
}

export const LaFijaCard: React.FC<LaFijaCardProps> = ({
  league,
  ev,
  probLabel,
  time,
  match,
  prediction,
  oddsLabel,
  odds,
}) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-white/5 bg-[#0a0a0a] p-5 text-white shadow-2xl transition-transform hover:scale-[1.02]">
      {/* League Header */}
      <div className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
        {league}
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-3">
          <span className="text-status-success font-mono font-bold">{ev}</span>
          <div className="flex items-center gap-1 text-white/50">
            <Target className="h-3 w-3" />
            <span>{probLabel}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 font-mono text-white/50">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </div>

      {/* Match Details */}
      <div className="flex flex-col gap-1">
        <h3 className="truncate font-sans text-base font-bold tracking-tight text-white/90">
          {match}
        </h3>
        <p className="truncate text-sm text-white/60">{prediction}</p>
      </div>

      {/* Divider */}
      <div className="my-1 h-[1px] w-full bg-white/5" />

      {/* Odds Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
          {oddsLabel}
        </span>
        <span className="font-mono text-base font-bold text-white">{odds}</span>
      </div>
    </div>
  );
};
