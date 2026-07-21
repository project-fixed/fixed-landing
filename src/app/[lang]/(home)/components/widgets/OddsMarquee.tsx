import React from 'react';
import { OddsCard } from '@/app/[lang]/(home)/components/widgets/OddsCard';
import { type Lang } from '@/data/translations';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
const oddsData1 = [
  {
    time: '21:00',
    percent: '68%',
    odds: '1.85',
    type: 'Más de 2.5 Goles',
    match: 'Real Madrid - Barcelona',
    league: 'LaLiga',
    ev: '+12.4%',
    status: 'won',
  },
  {
    time: '19:30',
    percent: '62%',
    odds: '2.10',
    type: 'Más de 5.5 Córners',
    match: 'Arsenal - Chelsea',
    league: 'Premier League',
    ev: '+10.5%',
    status: 'lost',
  },
  {
    time: '20:45',
    percent: '65%',
    odds: '1.90',
    type: 'Más de 4.5 Tiros a Puerta',
    match: 'Juventus - AC Milan',
    league: 'Serie A',
    ev: '+8.9%',
    status: 'won',
  },
  {
    time: '18:00',
    percent: '70%',
    odds: '1.75',
    type: 'Más de 2.5 Tarjetas Amarillas',
    match: 'Bayern Munich - Dortmund',
    league: 'Bundesliga',
    ev: '+14.1%',
    status: 'won',
  },
  {
    time: '22:00',
    percent: '58%',
    odds: '1.95',
    type: 'Más de 5.5 Tiros',
    match: 'PSG - Marseille',
    league: 'Ligue 1',
    ev: '+6.2%',
    status: 'lost',
  },
  {
    time: '17:15',
    percent: '60%',
    odds: '2.05',
    type: 'Menos de 2.5 Goles',
    match: 'Napoli - Atalanta',
    league: 'Serie A',
    ev: '+9.7%',
    status: 'won',
  },
];

const oddsData2 = [
  {
    time: '16:30',
    percent: '80%',
    odds: '1.55',
    type: 'Más de 1.5 Goles',
    match: 'Man City - Fulham',
    league: 'Premier League',
    ev: '+15.3%',
    status: 'won',
  },
  {
    time: '17:00',
    percent: '64%',
    odds: '1.95',
    type: 'Más de 4.5 Tiros a Puerta',
    match: 'Sevilla - Atl. Madrid',
    league: 'LaLiga',
    ev: '+11.8%',
    status: 'won',
  },
  {
    time: '20:00',
    percent: '65%',
    odds: '1.80',
    type: 'Más de 9.5 Córners Totales',
    match: 'Inter - Napoli',
    league: 'Serie A',
    ev: '+13.0%',
    status: 'lost',
  },
  {
    time: '19:00',
    percent: '59%',
    odds: '1.85',
    type: 'Más de 5.5 Tiros',
    match: 'Liverpool - Everton',
    league: 'Premier League',
    ev: '+10.2%',
    status: 'won',
  },
  {
    time: '21:30',
    percent: '62%',
    odds: '2.00',
    type: 'Más de 2.5 Tarjetas Amarillas',
    match: 'Lille - Monaco',
    league: 'Ligue 1',
    ev: '+7.5%',
    status: 'lost',
  },
  {
    time: '18:45',
    percent: '71%',
    odds: '1.70',
    type: 'Más de 5.5 Córners',
    match: 'Bayer Leverkusen - RB Leipzig',
    league: 'Bundesliga',
    ev: '+14.6%',
    status: 'won',
  },
];

const oddsData3 = [
  {
    time: '15:00',
    percent: '72%',
    odds: '1.65',
    type: 'Más de 2.5 Goles',
    match: 'Bayer Leverkusen - Koln',
    league: 'Bundesliga',
    ev: '+13.8%',
    status: 'won',
  },
  {
    time: '18:30',
    percent: '63%',
    odds: '1.90',
    type: 'Más de 4.5 Tiros a Puerta',
    match: 'Tottenham - Aston Villa',
    league: 'Premier League',
    ev: '+9.1%',
    status: 'lost',
  },
  {
    time: '20:15',
    percent: '61%',
    odds: '1.75',
    type: 'Más de 2.5 Tarjetas Amarillas',
    match: 'Roma - Lazio',
    league: 'Serie A',
    ev: '+11.2%',
    status: 'won',
  },
  {
    time: '22:30',
    percent: '56%',
    odds: '2.10',
    type: 'Más de 9.5 Córners Totales',
    match: 'Real Sociedad - Real Betis',
    league: 'LaLiga',
    ev: '+5.5%',
    status: 'lost',
  },
  {
    time: '17:45',
    percent: '68%',
    odds: '1.60',
    type: 'Menos de 2.5 Goles',
    match: 'Marseille - Lyon',
    league: 'Ligue 1',
    ev: '+12.9%',
    status: 'won',
  },
  {
    time: '19:15',
    percent: '64%',
    odds: '1.85',
    type: 'Más de 5.5 Tiros',
    match: 'Fiorentina - Bologna',
    league: 'Serie A',
    ev: '+11.0%',
    status: 'won',
  },
];

const getLocalizedType = (type: string, lang: string) => {
  if (lang === 'es') return type;
  switch (type) {
    case 'Más de 2.5 Goles':
      return 'Over 2.5 Goals';
    case 'Menos de 2.5 Goles':
      return 'Under 2.5 Goals';
    case 'Más de 1.5 Goles':
      return 'Over 1.5 Goals';
    case 'Más de 5.5 Córners':
      return 'Over 5.5 Corners';
    case 'Más de 9.5 Córners Totales':
      return 'Over 9.5 Total Corners';
    case 'Más de 4.5 Tiros a Puerta':
      return 'Over 4.5 Shots on Target';
    case 'Más de 2.5 Tarjetas Amarillas':
      return 'Over 2.5 Yellow Cards';
    case 'Más de 5.5 Tiros':
      return 'Over 5.5 Shots';
    default:
      return type;
  }
};

interface Props {
  lang: Lang;
}

export const OddsMarquee: React.FC<Props> = ({ lang }) => {
  return (
    <div className="mask-marquee flex w-full flex-col gap-4 overflow-hidden border-y border-white/5 bg-black/20 py-6 md:py-10">
      <ScrollReveal
        direction="up"
        delay={0.2}
        className="flex w-full flex-col gap-4"
      >
        {/* Row 1: Scroll Left */}
        <div className="scroller w-full">
          <div className="scroller-inner animate-scroll-left flex w-max flex-nowrap gap-4">
            {[...oddsData1, ...oddsData1].map((item, idx) => (
              <OddsCard
                key={`r1-${idx}`}
                time={item.time}
                percent={item.percent}
                odds={item.odds}
                type={getLocalizedType(item.type, lang)}
                match={item.match}
                ev={item.ev}
                status={item.status as 'won' | 'lost' | 'pending'}
                className="min-w-[280px]"
              />
            ))}
          </div>
        </div>
        {/* Row 2: Scroll Right */}
        <div className="scroller w-full">
          <div className="scroller-inner animate-scroll-right flex w-max flex-nowrap gap-4">
            {[...oddsData2, ...oddsData2].map((item, idx) => (
              <OddsCard
                key={`r2-${idx}`}
                time={item.time}
                percent={item.percent}
                odds={item.odds}
                type={getLocalizedType(item.type, lang)}
                match={item.match}
                ev={item.ev}
                status={item.status as 'won' | 'lost' | 'pending'}
                className="min-w-[280px]"
              />
            ))}
          </div>
        </div>
        {/* Row 3: Scroll Left */}
        <div className="scroller w-full">
          <div className="scroller-inner animate-scroll-left flex w-max flex-nowrap gap-4">
            {[...oddsData3, ...oddsData3].map((item, idx) => (
              <OddsCard
                key={`r3-${idx}`}
                time={item.time}
                percent={item.percent}
                odds={item.odds}
                type={getLocalizedType(item.type, lang)}
                match={item.match}
                ev={item.ev}
                status={item.status as 'won' | 'lost' | 'pending'}
                className="min-w-[280px]"
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
