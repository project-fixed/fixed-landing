import React from 'react';

interface GridBackgroundProps {
  glowPosition?: 'start' | 'center' | 'end';
  gridOpacity?: number;
  glowOpacity?: number;
  showGradientOverlay?: boolean;
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  glowPosition,
  gridOpacity = 0.04,
  glowOpacity = 0.12,
  showGradientOverlay = false,
  className = '',
}) => {
  // Determine horizontal alignment of the glow gradient
  const getGlowPosition = () => {
    switch (glowPosition) {
      case 'start':
        return '25% 50%';
      case 'end':
        return '75% 50%';
      case 'center':
      default:
        return '50% 50%';
    }
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Glow Layer */}
      {glowPosition && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at ${getGlowPosition()}, color-mix(in srgb, var(--color-primary) ${glowOpacity * 100}%, transparent), transparent 70%)`,
          }}
        />
      )}

      {/* Grid Pattern Layer */}
      <div
        className="bg-pattern-grid absolute inset-0 transition-opacity duration-500"
        style={{ opacity: gridOpacity }}
      />

      {/* Bottom Gradient Fade Overlay */}
      {showGradientOverlay && (
        <div className="absolute inset-0 h-full w-full bg-linear-to-b from-transparent via-transparent to-black" />
      )}
    </div>
  );
};
