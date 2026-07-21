import React from 'react';

/**
 * Minimal dot-grid SVG background for the hero section.
 * Replaces PitchGeometryBackground — no perspective, no neon glow, no concept.
 * Positioned on the right half of the hero to not compete with the copy.
 */
export const HeroDecorativeGrid: React.FC = () => {
  const cols = 15;
  const rows = 7;
  const spacing = 27;

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
    </div>
  );
};
