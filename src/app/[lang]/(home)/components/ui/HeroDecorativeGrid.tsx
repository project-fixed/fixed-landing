import React from 'react';

/**
 * Minimal dot-grid SVG background for the hero section.
 * Replaces PitchGeometryBackground — no perspective, no neon glow, no concept.
 * Positioned on the right half of the hero to not compete with the copy.
 */
export const HeroDecorativeGrid: React.FC = () => {
  const cols = 14;
  const rows = 10;
  const spacing = 28;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-4 hidden w-1/2 overflow-hidden lg:block"
      style={{
        maskImage:
          'linear-gradient(to left, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 80%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to left, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 80%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
      }}
    >
      <svg
        width={cols * spacing}
        height={rows * spacing}
        viewBox={`0 0 ${cols * spacing} ${rows * spacing}`}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
        fill="none"
      >
        {Array.from({ length: rows }).map((_, rowIdx) =>
          Array.from({ length: cols }).map((_, colIdx) => (
            <circle
              key={`${rowIdx}-${colIdx}`}
              cx={colIdx * spacing + spacing / 2}
              cy={rowIdx * spacing + spacing / 2}
              r={1.5}
              fill="currentColor"
              className="text-primary-light"
            />
          )),
        )}
      </svg>

      {/* Subtle corner bracket lines — top-right decoration */}
      <svg
        className="absolute top-16 right-12 opacity-20"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M10 2 L2 2 L2 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary-light"
        />
        <path
          d="M30 2 L38 2 L38 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary-light"
        />
        <path
          d="M10 38 L2 38 L2 30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary-light"
        />
        <path
          d="M30 38 L38 38 L38 30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary-light"
        />
      </svg>

      {/* Vertical line accent */}
      <div className="via-primary/20 absolute top-0 right-16 bottom-0 w-px bg-gradient-to-b from-transparent to-transparent" />
    </div>
  );
};
