import React from 'react';
import { Clock, Target } from 'lucide-react';

export interface Props {
  time: string;
  percent: string | number;
  odds: string | number;
  type: string;
  match: string;
  className?: string;
  style?: React.CSSProperties;
  ev?: string;
  status?: 'won' | 'lost' | 'pending';
}

export const OddsCard: React.FC<Props> = ({
  time,
  percent,
  odds,
  type,
  match,
  className = '',
  style,
  ev = '+10.0%',
  status,
}) => {
  const formattedPercent = String(percent).includes('%')
    ? percent
    : `${percent}%`;

  const formattedEv = ev.startsWith('EV')
    ? ev
    : `EV ${ev.startsWith('+') || ev.startsWith('-') ? ev : `+${ev}`}`;

  return (
    <div
      className={`bg-glass-card hover:bg-surface-card/80 flex cursor-pointer flex-col gap-2.5 rounded-2xl p-4 transition-colors ${className}`}
      style={style}
    >
      {/* Row 1: EV, Time, Probability, Odds */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-[11px] sm:text-xs">
          {/* EV Badge */}
          <span className="text-status-success font-semibold">
            {formattedEv}
          </span>

          {/* Time (Clock Icon + Text) */}
          <div className="text-muted flex items-center gap-1">
            <Clock className="text-faint h-3.5 w-3.5" />
            <span className="text-body font-medium">{time}</span>
          </div>

          {/* Probability (Target Icon + Text) */}
          <div className="text-muted flex items-center gap-1">
            <Target className="text-faint h-3.5 w-3.5" />
            <span className="text-body font-medium">{formattedPercent}</span>
          </div>
        </div>

        {/* Odds */}
        <span className="text-xs text-white">{odds}</span>
      </div>

      {/* Row 2: Prediction Type / Market */}
      <div className="line-clamp-1 text-sm font-medium text-white">{type}</div>

      {/* Row 3: Match description and status dot */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted line-clamp-1 flex-1 text-[11px]">
          {match}
        </span>
        {status && (
          <div
            className={`h-2 w-2 shrink-0 rounded-full ${
              status === 'won'
                ? 'bg-status-success'
                : status === 'lost'
                  ? 'bg-destructive'
                  : 'bg-faint'
            }`}
          />
        )}
      </div>
    </div>
  );
};
