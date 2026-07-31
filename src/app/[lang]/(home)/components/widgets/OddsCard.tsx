import React from 'react';
import { Clock, Target, Check, X } from 'lucide-react';

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
  statusColor?: 'green' | 'red';
  variant?: 'default' | 'compact';
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
  variant = 'default',
}) => {
  const formattedPercent = String(percent).includes('%')
    ? percent
    : `${percent}%`;

  const formattedEv = ev.startsWith('EV')
    ? ev
    : `EV ${ev.startsWith('+') || ev.startsWith('-') ? ev : `+${ev}`}`;

  if (variant === 'compact') {
    return (
      <div
        className={`flex flex-col justify-between gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-2.5 transition-colors hover:bg-white/[0.06] ${className}`}
        style={style}
      >
        {/* Top Row: EV + Time + Prob (inline) & Unboxed Cuota */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* EV Text (unboxed) */}
            <span className="text-status-success font-mono text-[10px] font-bold">
              {formattedEv}
            </span>

            {/* Time & Prob inline */}
            <div className="flex items-center gap-1.5 font-mono text-[8px] text-white/40">
              <div className="flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5 text-white/50" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Target className="h-2.5 w-2.5 text-white/50" />
                <span>{formattedPercent}</span>
              </div>
            </div>
          </div>

          {/* Cuota Text (unboxed) */}
          <span className="font-mono text-[9px] font-medium text-white">
            {odds}
          </span>
        </div>

        {/* Bet Title */}
        <h4 className="font-sans! text-[11px] font-medium tracking-tight text-white">
          {match}
        </h4>

        {/* Teams & Status Dot */}
        <div className="flex items-center justify-between">
          <p className="truncate font-sans text-[10.5px] text-white/60">
            {type}
          </p>
        </div>
      </div>
    );
  }

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
      <div className="line-clamp-1 text-sm font-medium text-white">{match}</div>

      {/* Row 3: Match description and status dot */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted line-clamp-1 flex-1 text-xs">{type}</span>
        {status &&
          (status === 'won' ? (
            <Check className="text-status-success h-4 w-4 shrink-0" />
          ) : status === 'lost' ? (
            <X className="text-destructive h-4 w-4 shrink-0" />
          ) : (
            <div className="bg-faint h-1.5 w-1.5 shrink-0 rounded-full" />
          ))}
      </div>
    </div>
  );
};
