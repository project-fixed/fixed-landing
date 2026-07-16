import React from 'react';
import { OddsCard } from '@/components/cards/OddsCard';

const oddsData = [
  {
    delay: -5,
    time: '20:00',
    percent: '52%',
    odds: '1.95',
    type: 'Gana Atletico Madrid',
    match: 'Atletico Madrid - Sevilla',
    league: 'LaLiga',
    ev: '+14.2%',
    status: 'won',
  },
  {
    delay: -4,
    time: '17:30',
    percent: '67%',
    odds: '1.65',
    type: 'Más de 2.5 Goles',
    match: 'Liverpool - Aston Villa',
    league: 'Premier League',
    ev: '+8.5%',
    status: 'lost',
  },
  {
    delay: -3,
    time: '20:45',
    percent: '58%',
    odds: '1.75',
    type: 'Ambos Anotan: Sí',
    match: 'Juventus - AC Milan',
    league: 'Serie A',
    ev: '+11.4%',
    status: 'won',
  },
  {
    delay: -2,
    time: '16:30',
    percent: '80%',
    odds: '1.25',
    type: 'Gana Manchester City',
    match: 'Man City - Fulham',
    league: 'Premier League',
    ev: '+15.1%',
    status: 'won',
  },
  {
    delay: -1,
    time: '21:00',
    percent: '60%',
    odds: '1.80',
    type: 'Menos de 3.5 Goles',
    match: 'Real Madrid - Barcelona',
    league: 'LaLiga',
    ev: '+9.3%',
    status: 'lost',
  },
  {
    delay: 0,
    time: '20:00',
    percent: '65%',
    odds: '1.65',
    type: 'Gana Ajax',
    match: 'Ajax - PSV',
    league: 'Eredivisie',
    ev: '+12.7%',
    status: 'won',
  },
];

export const OddsCarousel: React.FC = () => {
  return (
    <div className="relative flex h-[450px] w-[450px] items-center justify-center max-md:h-[350px] max-md:w-[350px]">
      {/* Rotative Cards */}
      {oddsData.map((item, index) => (
        <div
          key={index}
          className="animate-point-card pointer-events-none absolute z-10 w-[400px] opacity-0 max-[425px]:w-[320px] max-[375px]:w-[290px] lg:w-[350px]"
          style={{ '--delay': item.delay } as React.CSSProperties}
        >
          <OddsCard
            time={item.time}
            percent={item.percent}
            odds={item.odds}
            type={item.type}
            match={item.match}
            ev={item.ev}
            status={item.status as 'won' | 'lost' | 'pending'}
            className="w-full shadow-2xl"
          />
        </div>
      ))}

      {/* Glowing Background Circle */}
      <div className="bg-primary/5 pointer-events-none absolute z-0 h-[400px] w-[400px] rounded-full blur-[120px] max-md:h-[250px] max-md:w-[250px]"></div>
    </div>
  );
};
