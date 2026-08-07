'use client';

import React from 'react';
import { motion } from 'framer-motion';
// removed fallbacks

interface HeroLeagueLogosProps {
  className?: string;
}

// ==========================================
// LOGOS GEOMÉTRICOS PERFECTOS (Para los que no se descargaron)
// ==========================================

const ChampionsLeagueLogo = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
    <circle
      cx="50"
      cy="50"
      r="42"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.3"
    />
    <g transform="translate(50,50) scale(0.9)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g
          key={i}
          transform={`rotate(${angle}) translate(0, -32) rotate(-${angle})`}
        >
          <polygon points="0,-8 2.5,-2.5 8,-2.5 3.5,1.5 5,7.5 0,4 -5,7.5 -3.5,1.5 -8,-2.5 -2.5,-2.5" />
        </g>
      ))}
      <circle
        cx="0"
        cy="0"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
    </g>
  </svg>
);

const LaLigaClassicLogo = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
    <circle
      cx="50"
      cy="50"
      r="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <circle cx="50" cy="50" r="4" />
    {[0, 51.42, 102.85, 154.28, 205.71, 257.14, 308.57].map((angle, i) => (
      <path
        key={i}
        d="M 50 32 C 55 20 62 15 70 18 C 72 20 70 28 62 35 C 58 37 54 36 50 32 Z"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
  </svg>
);

const EuropaLeagueLogo = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
    <polygon
      points="50,15 80,32 80,68 50,85 20,68 20,32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
    />
    <path d="M 45 35 L 45 70 L 55 70 L 55 35 Z" opacity="0.8" />
    <path
      d="M 38 35 C 38 45 45 52 45 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
    />
    <path
      d="M 62 35 C 62 45 55 52 55 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
    />
  </svg>
);

const Ligue1Logo = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
    <path d="M50 15 A 35 35 0 0 1 80.3 32.5 L 72 37.3 A 25.5 25.5 0 0 0 50 24.5 Z" />
    <path d="M85 50 A 35 35 0 0 1 67.5 80.3 L 62.7 72 A 25.5 25.5 0 0 0 75.5 50 Z" />
    <path d="M50 85 A 35 35 0 0 1 19.7 67.5 L 28 62.7 A 25.5 25.5 0 0 0 50 75.5 Z" />
    <path d="M15 50 A 35 35 0 0 1 32.5 19.7 L 37.3 28 A 25.5 25.5 0 0 0 24.5 50 Z" />
    <circle cx="50" cy="50" r="10" />
  </svg>
);

// ==========================================
// COMPONENTE CONTENEDOR
// ==========================================

interface LogoConfig {
  id: string;
  type: 'mask' | 'svg';
  srcOrComponent: string | React.FC;
  size: string;
  position: string;
  duration: number;
  delay: number;
  yDelta: number;
  opacity: string;
}

const LOGOS: LogoConfig[] = [
  {
    id: 'bundesliga',
    type: 'mask',
    srcOrComponent: '/bundesliga.svg',
    size: 'w-16 h-16 md:w-20 md:h-20',
    position: 'top-[5%] right-[30%]',
    duration: 7,
    delay: 0,
    yDelta: -14,
    opacity: 'opacity-30 hover:opacity-60',
  },
  {
    id: 'laliga-classic',
    type: 'svg',
    srcOrComponent: LaLigaClassicLogo,
    size: 'w-18 h-18 md:w-24 md:h-24',
    position: 'top-[10%] right-[8%]',
    duration: 8.5,
    delay: 0.5,
    yDelta: -18,
    opacity: 'opacity-20 hover:opacity-45',
  },
  {
    id: 'laliga-modern',
    type: 'mask',
    srcOrComponent: '/laliga-modern.svg',
    size: 'w-20 h-20 md:w-28 md:h-28',
    position: 'top-[22%] right-[48%]',
    duration: 9,
    delay: 1,
    yDelta: -15,
    opacity: 'opacity-30 hover:opacity-60',
  },
  {
    id: 'premier',
    type: 'mask',
    srcOrComponent: '/premier.svg',
    size: 'w-24 h-24 md:w-36 md:h-36',
    position: 'top-[40%] right-[58%]',
    duration: 7.5,
    delay: 0.2,
    yDelta: -20,
    opacity: 'opacity-40 hover:opacity-80',
  },
  {
    id: 'europa-league',
    type: 'svg',
    srcOrComponent: EuropaLeagueLogo,
    size: 'w-16 h-16 md:w-22 md:h-22',
    position: 'top-[36%] right-[6%]',
    duration: 8,
    delay: 1.2,
    yDelta: -12,
    opacity: 'opacity-20 hover:opacity-40',
  },
  {
    id: 'champions',
    type: 'svg',
    srcOrComponent: ChampionsLeagueLogo,
    size: 'w-24 h-24 md:w-36 md:h-36',
    position: 'bottom-[10%] right-[42%]',
    duration: 10,
    delay: 0.7,
    yDelta: -22,
    opacity: 'opacity-25 hover:opacity-45',
  },
  {
    id: 'serie-a',
    type: 'mask',
    srcOrComponent: '/serie-a.svg',
    size: 'w-18 h-18 md:w-24 md:h-24',
    position: 'bottom-[6%] right-[24%]',
    duration: 8.2,
    delay: 1.5,
    yDelta: -16,
    opacity: 'opacity-30 hover:opacity-60',
  },
  {
    id: 'ligue-1',
    type: 'svg',
    srcOrComponent: Ligue1Logo,
    size: 'w-20 h-20 md:w-26 md:h-26',
    position: 'bottom-[20%] right-[4%]',
    duration: 9.5,
    delay: 0.4,
    yDelta: -15,
    opacity: 'opacity-20 hover:opacity-40',
  },
];

export const HeroLeagueLogos: React.FC<HeroLeagueLogosProps> = ({
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-full overflow-hidden select-none sm:block lg:w-[55%] xl:w-[50%] ${className}`}
    >
      {/* Background Radial Glow */}
      <div className="bg-primary/5 pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      {/* Floating Logos Constellation */}
      {LOGOS.map((logo) => {
        return (
          <motion.div
            key={logo.id}
            className={`absolute ${logo.position} ${logo.size} ${logo.opacity} text-white transition-opacity duration-500`}
            animate={{
              y: [0, logo.yDelta, 0],
              rotate: [0, logo.yDelta > 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: logo.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: logo.delay,
            }}
            style={{
              willChange: 'transform',
              filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.4))',
            }}
          >
            {logo.type === 'mask' ? (
              <div
                className="h-full w-full bg-current"
                style={{
                  WebkitMaskImage: `url('${logo.srcOrComponent}')`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: `url('${logo.srcOrComponent}')`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
              />
            ) : (
              // Componente SVG puro
              React.createElement(logo.srcOrComponent as React.FC)
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
