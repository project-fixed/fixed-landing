import React from 'react';

const PitchGeometryBackground = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Fake Volumetric Ambient Light (transparent edges so it doesn't cover the original background) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,93,108,0.20)_0%,transparent_70%)]" />

      {/* 3D Pitch Container */}
      <div
        className="relative h-[140vh] w-[140vw] origin-center"
        style={{
          transform: 'rotateX(75deg) translateY(20%) scale(1.4)',
          maskImage:
            'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage:
            'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)',
        }}
      >
        <svg
          viewBox="0 0 1200 800"
          className="h-full w-full opacity-70"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* The SVG Glow Filter */}
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feGaussianBlur stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient
              id="fade-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4a7285" stopOpacity="0" />
              <stop offset="50%" stopColor="#4a7285" stopOpacity="1" />
              <stop offset="100%" stopColor="#4a7285" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subdued Tech Grid underneath the pitch */}
          <g stroke="#4a7285" strokeWidth="1" strokeOpacity="0.15">
            {Array.from({ length: 40 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 20} x2="1200" y2={i * 20} />
            ))}
            {Array.from({ length: 60 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="800" />
            ))}
          </g>

          {/* Main Pitch Geometry */}
          <g
            stroke="url(#fade-gradient)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#neon-glow)"
          >
            {/* Pitch Border */}
            <rect x="100" y="100" width="1000" height="600" rx="8" />

            {/* Halfway Line & Center Circle */}
            <line x1="600" y1="100" x2="600" y2="700" />
            <circle cx="600" cy="400" r="100" />
            <circle cx="600" cy="400" r="4" fill="#4a7285" />

            {/* Left Penalty Box */}
            <rect x="100" y="220" width="200" height="360" />
            <rect x="100" y="310" width="60" height="180" />
            {/* Left Penalty Arc */}
            <path d="M 300 320 A 100 100 0 0 1 300 480" />

            {/* Right Penalty Box */}
            <rect x="900" y="220" width="200" height="360" />
            <rect x="1040" y="310" width="60" height="180" />
            {/* Right Penalty Arc */}
            <path d="M 900 320 A 100 100 0 0 0 900 480" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PitchGeometryBackground;
