import React from 'react';

export interface ValueBetCardData {
  rank: string;
  ev: string;
  confText: string;
  confLevel: 'high' | 'medium' | 'low';
  title: string;
  subtitle: string;
  odd: string;
  isHighlighted?: boolean;
}

export interface ValueBetCardWidgetProps {
  card: ValueBetCardData;
  className?: string;
}

/**
 * Reusable card component for displaying individual Value Bets.
 * Extracted for reuse between match analysis previews and top value bet lists.
 */
export const ValueBetCardWidget: React.FC<ValueBetCardWidgetProps> = ({
  card,
  className = '',
}) => {
  const getDotColor = () => {
    if (card.confLevel === 'high') {
      return 'bg-status-success shadow-[0_0_6px_rgba(52,211,153,0.6)]';
    }
    if (card.confLevel === 'medium') {
      return 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]';
    }
    return 'bg-slate-400';
  };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-lg p-2.5 transition-all duration-200 ${
        card.isHighlighted
          ? 'border-primary-light/10 ring-primary-light/20 from-primary/20 to-secondary border bg-linear-to-b shadow-[0_0_15px_rgba(62,93,108,0.3)] ring-1'
          : 'border border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/5'
      } ${className}`}
    >
      {/* Top Row: Rank, EV, Conf */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="py-0.2 rounded bg-white/10 px-1 font-mono text-[9px] font-bold text-white">
            {card.rank}
          </span>
          <span className="font-mono text-[9px] font-bold text-white/70">
            {card.ev}
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[8px] text-white/50">
          <span className={`h-1.5 w-1.5 rounded-full ${getDotColor()}`} />
          <span>{card.confText}</span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <h4 className="mt-1.5 truncate font-sans! text-xs font-medium tracking-tight text-white">
        {card.title}
      </h4>
      <p className="truncate font-sans text-[9px] text-white/40">
        {card.subtitle}
      </p>

      {/* Bottom Row: Unboxed Cuota */}
      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-1">
        <span className="font-mono text-[8px] font-medium text-white/30 uppercase">
          Cuota
        </span>
        <span className="font-mono text-[10px] font-bold text-white">
          {card.odd}
        </span>
      </div>
    </div>
  );
};
