'use client';

import React from 'react';
import {
  ValueBetCardWidget,
  type ValueBetCardData,
} from '@/app/[lang]/(home)/components/widgets/ValueBetCardWidget';

// FC Bayern Munich SVG Logo
const BayernMunichLogoSVG: React.FC<{ className?: string }> = ({
  className = 'h-12 w-12',
}) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="60" cy="60" r="58" fill="#DC052D" />
    <circle
      cx="60"
      cy="60"
      r="52"
      stroke="#FFFFFF"
      strokeWidth="4"
      fill="#DC052D"
    />
    <circle
      cx="60"
      cy="60"
      r="40"
      stroke="#FFFFFF"
      strokeWidth="2"
      fill="#0066B2"
    />
    {/* Bavarian Diamond Pattern */}
    <g clipPath="url(#bayern-clip)">
      <path
        d="M40 40 L60 20 L80 40 L60 60 Z M60 60 L80 40 L100 60 L80 80 Z M20 60 L40 40 L60 60 L40 80 Z M40 80 L60 60 L80 80 L60 100 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </g>
    <defs>
      <clipPath id="bayern-clip">
        <circle cx="60" cy="60" r="39" />
      </clipPath>
    </defs>
    <path d="M 60 14 A 46 46 0 0 1 106 60" stroke="#FFFFFF" strokeWidth="0" />
    <text
      x="60"
      y="24"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="9"
      fontFamily="sans-serif"
      fontWeight="900"
      letterSpacing="0.5"
    >
      FC BAYERN
    </text>
    <text
      x="60"
      y="104"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="9"
      fontFamily="sans-serif"
      fontWeight="900"
      letterSpacing="0.5"
    >
      MÜNCHEN
    </text>
  </svg>
);

// Borussia Dortmund (BVB 09) SVG Logo
const DortmundLogoSVG: React.FC<{ className?: string }> = ({
  className = 'h-12 w-12',
}) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="60" cy="60" r="58" fill="#FDE100" />
    <circle
      cx="60"
      cy="60"
      r="54"
      stroke="#000000"
      strokeWidth="5"
      fill="#FDE100"
    />
    <circle
      cx="60"
      cy="60"
      r="46"
      stroke="#000000"
      strokeWidth="1.5"
      fill="none"
    />
    <text
      x="60"
      y="68"
      textAnchor="middle"
      fill="#000000"
      fontSize="24"
      fontFamily="sans-serif"
      fontWeight="900"
      letterSpacing="-1"
    >
      BVB
    </text>
    <text
      x="60"
      y="85"
      textAnchor="middle"
      fill="#000000"
      fontSize="12"
      fontFamily="sans-serif"
      fontWeight="800"
    >
      09
    </text>
  </svg>
);

interface PredictionRow {
  category: string;
  localFull: string;
  localShort: string;
  visitorFull: string;
  visitorShort: string;
  isUpcoming?: boolean;
}

const PREDICTIONS_DATA: PredictionRow[] = [
  {
    category: 'Goles',
    localFull: 'Más de 1.5',
    localShort: '+1.5',
    visitorFull: 'Más de 1.5',
    visitorShort: '+1.5',
  },
  {
    category: 'Tiros',
    localFull: 'Más de 5.5',
    localShort: '+5.5',
    visitorFull: 'Más de 4.5',
    visitorShort: '+4.5',
  },
  {
    category: 'Tiros a Puerta',
    localFull: 'Más de 4.5',
    localShort: '+4.5',
    visitorFull: 'Más de 3.5',
    visitorShort: '+3.5',
  },
  {
    category: 'Córners',
    localFull: 'Más de 5.5',
    localShort: '+5.5',
    visitorFull: 'Más de 4.5',
    visitorShort: '+4.5',
  },
  {
    category: 'Tarjetas Amarillas',
    localFull: 'Más de 1.5',
    localShort: '+1.5',
    visitorFull: 'Más de 2.5',
    visitorShort: '+2.5',
  },
  {
    category: 'Faltas',
    localFull: 'Próx.',
    localShort: 'Próx.',
    visitorFull: 'Próx.',
    visitorShort: 'Próx.',
    isUpcoming: true,
  },
  {
    category: 'Fueras de Juego',
    localFull: 'Próx.',
    localShort: 'Próx.',
    visitorFull: 'Próx.',
    visitorShort: 'Próx.',
    isUpcoming: true,
  },
];

const TOP_VALUE_BETS: ValueBetCardData[] = [
  {
    rank: '#1',
    ev: 'EV: +14.2%',
    confText: 'Conf. Alta',
    confLevel: 'high',
    title: 'Más de 2.5 Goles',
    subtitle: 'Real Madrid - Barcelona',
    odd: '1.65',
    isHighlighted: true,
  },
  {
    rank: '#2',
    ev: 'EV: +9.8%',
    confText: 'Conf. Media',
    confLevel: 'medium',
    title: 'Más de 5.5 Córners',
    subtitle: 'Real Madrid',
    odd: '1.85',
  },
  {
    rank: '#3',
    ev: 'EV: +8.3%',
    confText: 'Conf. Media',
    confLevel: 'medium',
    title: 'Más de 4.5 Tiros a Puerta',
    subtitle: 'Barcelona',
    odd: '1.90',
  },
  {
    rank: '#4',
    ev: 'EV: +7.5%',
    confText: 'Conf. Media',
    confLevel: 'medium',
    title: 'Más de 2.5 Tarjetas Amarillas',
    subtitle: 'Real Madrid - Barcelona',
    odd: '1.95',
  },
  {
    rank: '#5',
    ev: 'EV: +5.1%',
    confText: 'Conf. Baja',
    confLevel: 'low',
    title: 'Más de 9.5 Córners Totales',
    subtitle: 'Real Madrid - Barcelona',
    odd: '1.70',
  },
];

export const MatchAnalysisPreview: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4 overflow-hidden rounded-2xl md:p-1 lg:flex-row xl:items-stretch">
      {/* Left Panel: Match Projections View */}
      <div className="relative z-10 flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-5">
        {/* Ambient Red & Yellow Team Glows */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-red-600/20 via-transparent to-yellow-500/20 blur-[100px]" />
        {/* Matchup Banner */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="mb-1 font-mono text-[10px] text-white/40">
            Bundesliga: Jornada 36
          </span>
          <h3 className="mt-1 font-sans text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Bayern Munich vs Borussia Dortmund
          </h3>

          {/* Logos & Match Time Row */}
          <div className="mt-3 flex items-center justify-center gap-6 sm:gap-10">
            <BayernMunichLogoSVG className="h-11 w-11 drop-shadow-[0_0_10px_rgba(220,5,45,0.4)] sm:h-14 sm:w-14" />

            <div className="flex flex-col items-center">
              <span className="font-mono text-[8px] font-bold tracking-widest text-white/40 uppercase">
                Hora
              </span>
              <span className="font-mono text-base font-bold text-white sm:text-lg">
                18:30
              </span>
            </div>

            <DortmundLogoSVG className="h-11 w-11 drop-shadow-[0_0_10px_rgba(253,225,0,0.4)] sm:h-14 sm:w-14" />
          </div>
        </div>

        {/* Predictions Table (Stretched vertically to fill container) */}
        <div className="mt-4 flex w-full flex-1 flex-col justify-between">
          <div className="grid grid-cols-3 items-center border-b border-white/10 pb-2 font-mono text-[10px] font-bold tracking-wider text-white/30 uppercase">
            <div className="text-left">Local</div>
            <div className="text-center">Estadísticas</div>
            <div className="text-right">Visitante</div>
          </div>

          <div className="my-auto flex flex-1 flex-col justify-between divide-y divide-white/5 py-1">
            {PREDICTIONS_DATA.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 items-center py-2 text-xs"
              >
                {/* Local Pill */}
                <div className="text-left">
                  <span
                    className={`inline-block rounded-lg border px-2.5 py-1 font-mono text-[11px] font-semibold ${
                      row.isUpcoming
                        ? 'border-white/5 bg-white/[0.02] text-white/30'
                        : 'border-white/10 bg-white/5 text-white shadow-xs'
                    }`}
                  >
                    <span className="sm:hidden">{row.localShort}</span>
                    <span className="hidden sm:inline">{row.localFull}</span>
                  </span>
                </div>

                {/* Category Name */}
                <div className="flex flex-col items-center text-center">
                  <span className="font-sans text-xs font-semibold text-white/90">
                    {row.category}
                  </span>
                  {row.isUpcoming && (
                    <span className="font-mono text-[8px] tracking-wider text-white/30 uppercase">
                      Próximamente
                    </span>
                  )}
                </div>

                {/* Visitor Pill */}
                <div className="text-right">
                  <span
                    className={`inline-block rounded-lg border px-2.5 py-1 font-mono text-[11px] font-semibold ${
                      row.isUpcoming
                        ? 'border-white/5 bg-white/[0.02] text-white/30'
                        : 'border-white/10 bg-white/5 text-white shadow-xs'
                    }`}
                  >
                    <span className="sm:hidden">{row.visitorShort}</span>
                    <span className="hidden sm:inline">{row.visitorFull}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Top Value Bets Side Column using ValueBetCardWidget */}
      <div className="relative z-10 flex w-full shrink-0 flex-col justify-between rounded-xl border border-white/10 bg-black/80 p-3.5 shadow-lg backdrop-blur-md lg:w-[260px] 2xl:w-[280px]">
        {/* Header */}
        <div className="border-b border-white/10 pb-2">
          <h3 className="font-mono text-xs font-bold tracking-wider text-white uppercase">
            Top Value Bets
          </h3>
        </div>

        {/* 5 Stacked Cards */}
        <div className="my-2 flex flex-1 flex-col justify-between gap-2">
          {TOP_VALUE_BETS.map((card) => (
            <ValueBetCardWidget key={card.rank} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};
