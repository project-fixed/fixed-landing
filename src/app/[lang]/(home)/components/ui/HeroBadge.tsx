import React from 'react';

interface HeroBadgeProps {
  label: string;
}

/**
 * Minimal status badge displayed above the hero heading.
 * Communicates product stage (Beta, version, etc.) with a pulsing green indicator.
 */
export const HeroBadge: React.FC<HeroBadgeProps> = ({ label }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
      {/* Pulsing green dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-muted font-mono text-[10px] leading-[1.2] font-medium tracking-widest uppercase lg:text-xs">
        {label}
      </span>
    </div>
  );
};
