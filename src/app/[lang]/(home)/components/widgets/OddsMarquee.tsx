import React from 'react';
import { OddsCard } from '@/app/[lang]/(home)/components/widgets/OddsCard';
import { type Lang } from '@/data/translations';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
const oddsData1 = [
  {
    time: '21:00',
    percent: '58%',
    odds: '1.85',
    type: 'Gana Real Madrid',
    match: 'Real Madrid - Barcelona',
    league: 'LaLiga',
    ev: '+12.4%',
    status: 'won',
  },
  {
    time: '19:30',
    percent: '62%',
    odds: '2.10',
    type: 'Más de 2.5 Goles',
    match: 'Arsenal - Chelsea',
    league: 'Premier League',
    ev: '+10.5%',
    status: 'lost',
  },
  {
    time: '20:45',
    percent: '55%',
    odds: '1.75',
    type: 'Ambos Anotan: Sí',
    match: 'Juventus - AC Milan',
    league: 'Serie A',
    ev: '+8.9%',
    status: 'won',
  },
  {
    time: '18:00',
    percent: '70%',
    odds: '1.45',
    type: 'Gana Bayern Munich',
    match: 'Bayern Munich - Dortmund',
    league: 'Bundesliga',
    ev: '+14.1%',
    status: 'won',
  },
  {
    time: '22:00',
    percent: '45%',
    odds: '2.50',
    type: 'Empate (X)',
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
    odds: '1.25',
    type: 'Más de 1.5 Goles',
    match: 'Man City - Fulham',
    league: 'Premier League',
    ev: '+15.3%',
    status: 'won',
  },
  {
    time: '17:00',
    percent: '50%',
    odds: '1.95',
    type: 'Gana Atl. Madrid',
    match: 'Sevilla - Atl. Madrid',
    league: 'LaLiga',
    ev: '+11.8%',
    status: 'won',
  },
  {
    time: '20:00',
    percent: '65%',
    odds: '1.65',
    type: 'Menos de 3.5 Goles',
    match: 'Ajax - PSV',
    league: 'Eredivisie',
    ev: '+13.0%',
    status: 'lost',
  },
  {
    time: '19:00',
    percent: '59%',
    odds: '1.80',
    type: 'Gana Liverpool',
    match: 'Liverpool - Everton',
    league: 'Premier League',
    ev: '+10.2%',
    status: 'won',
  },
  {
    time: '21:30',
    percent: '48%',
    odds: '2.20',
    type: 'Ambos Anotan: No',
    match: 'Inter - Napoli',
    league: 'Serie A',
    ev: '+7.5%',
    status: 'lost',
  },
  {
    time: '18:45',
    percent: '71%',
    odds: '1.50',
    type: 'Gana Benfica',
    match: 'Benfica - Porto',
    league: 'Primeira Liga',
    ev: '+14.6%',
    status: 'won',
  },
];

const oddsData3 = [
  {
    time: '15:00',
    percent: '72%',
    odds: '1.55',
    type: 'Gana Leverkusen',
    match: 'Bayer Leverkusen - Koln',
    league: 'Bundesliga',
    ev: '+13.8%',
    status: 'won',
  },
  {
    time: '18:30',
    percent: '53%',
    odds: '1.90',
    type: 'Más de 2.5 Goles',
    match: 'Tottenham - Aston Villa',
    league: 'Premier League',
    ev: '+9.1%',
    status: 'lost',
  },
  {
    time: '20:15',
    percent: '61%',
    odds: '1.70',
    type: 'Gana Roma',
    match: 'Roma - Lazio',
    league: 'Serie A',
    ev: '+11.2%',
    status: 'won',
  },
  {
    time: '22:30',
    percent: '42%',
    odds: '2.80',
    type: 'Empate (X)',
    match: 'Porto - Benfica',
    league: 'Primeira Liga',
    ev: '+5.5%',
    status: 'lost',
  },
  {
    time: '17:45',
    percent: '68%',
    odds: '1.60',
    type: 'Menos de 2.5 Goles',
    match: 'Sporting - Braga',
    league: 'Primeira Liga',
    ev: '+12.9%',
    status: 'won',
  },
  {
    time: '19:15',
    percent: '64%',
    odds: '1.85',
    type: 'Gana Galatasaray',
    match: 'Galatasaray - Fenerbahce',
    league: 'Süper Lig',
    ev: '+11.0%',
    status: 'won',
  },
];

const getLocalizedType = (type: string, lang: string) => {
  if (lang === 'es') return type;
  switch (type) {
    case 'Gana Real Madrid':
      return 'Real Madrid to Win';
    case 'Más de 2.5 Goles':
      return 'Over 2.5 Goals';
    case 'Ambos Anotan: Sí':
      return 'Both Teams to Score: Yes';
    case 'Gana Bayern Munich':
      return 'Bayern Munich to Win';
    case 'Empate (X)':
      return 'Draw (X)';
    case 'Menos de 2.5 Goles':
      return 'Under 2.5 Goals';
    case 'Más de 1.5 Goles':
      return 'Over 1.5 Goals';
    case 'Gana Atl. Madrid':
      return 'Atl. Madrid to Win';
    case 'Menos de 3.5 Goles':
      return 'Under 3.5 Goals';
    case 'Gana Liverpool':
      return 'Liverpool to Win';
    case 'Ambos Anotan: No':
      return 'Both Teams to Score: No';
    case 'Gana Benfica':
      return 'Benfica to Win';
    case 'Gana Leverkusen':
      return 'Leverkusen to Win';
    case 'Gana Roma':
      return 'Roma to Win';
    case 'Gana Galatasaray':
      return 'Galatasaray to Win';
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
