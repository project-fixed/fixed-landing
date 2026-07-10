import React from 'react';

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
      className={`flex cursor-pointer flex-col gap-2.5 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 backdrop-blur-sm transition-colors hover:bg-zinc-900/80 ${className}`}
      style={style}
    >
      {/* Row 1: EV, Time, Probability, Odds */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-[11px] sm:text-xs">
          {/* EV Badge */}
          <span className="font-semibold text-emerald-500">{formattedEv}</span>

          {/* Time (Clock Icon + Text) */}
          <div className="flex items-center gap-1 text-zinc-400">
            <svg
              className="h-3.5 w-3.5 text-zinc-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-zinc-300">{time}</span>
          </div>

          {/* Probability (Target Icon + Text) */}
          <div className="flex items-center gap-1 text-zinc-400">
            <svg
              className="h-3.5 w-3.5 text-zinc-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
            <span className="font-medium text-zinc-300">
              {formattedPercent}
            </span>
          </div>
        </div>

        {/* Odds */}
        <span className="text-xs text-white">{odds}</span>
      </div>

      {/* Row 2: Prediction Type / Market */}
      <div className="line-clamp-1 text-sm font-medium text-white">{type}</div>

      {/* Row 3: Match description and status dot */}
      <div className="flex items-center justify-between gap-2">
        <span className="line-clamp-1 flex-1 text-[11px] text-zinc-400">
          {match}
        </span>
        {status && (
          <div
            className={`h-2 w-2 shrink-0 rounded-full ${
              status === 'won'
                ? 'bg-emerald-500'
                : status === 'lost'
                  ? 'bg-rose-500'
                  : 'bg-zinc-500'
            }`}
          />
        )}
      </div>
    </div>
  );
};
