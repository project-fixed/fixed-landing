import React from 'react';

interface HeroDecorativeGridProps {
  className?: string;
}

/**
 * Minimal square-dot grid background pattern.
 * Custom-sized to fit any absolute container.
 */
export const HeroDecorativeGrid: React.FC<HeroDecorativeGridProps> = ({
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="square-dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="10.5"
              y="10.5"
              width="3"
              height="3"
              fill="currentColor"
              className="text-primary-light"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#square-dot-grid)" />
      </svg>
    </div>
  );
};
