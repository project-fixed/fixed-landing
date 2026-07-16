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
    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
      {/* Pulsing green dot */}
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
      </span>
      <span className="text-text-muted font-mono text-xs font-medium tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
};
