'use client';

import React from 'react';
import {
  LeagueColumnWidget,
  type LeagueColumnData,
} from '@/app/[lang]/(home)/components/widgets/LeagueColumnWidget';

const LEAGUES_DATA: LeagueColumnData[] = [
  {
    id: 'laliga',
    league: 'LaLiga',
    picks: [
      {
        ev: 'EV +14.2%',
        time: '20:00',
        prob: '52%',
        odd: '1.95',
        bet: 'Gana Atletico Madrid',
        teams: 'Atletico Madrid vs Sevilla',
        statusColor: 'green',
      },
      {
        ev: 'EV +9.1%',
        time: '16:15',
        prob: '68%',
        odd: '1.80',
        bet: 'Más de 2.5 Goles',
        teams: 'Real Madrid vs Real Betis',
        statusColor: 'green',
      },
      {
        ev: 'EV +7.4%',
        time: '21:00',
        prob: '55%',
        odd: '1.90',
        bet: 'Más de 4.5 Tiros a Puerta',
        teams: 'Barcelona vs Athletic Club',
        statusColor: 'green',
      },
      {
        ev: 'EV +11.0%',
        time: '18:30',
        prob: '60%',
        odd: '1.85',
        bet: 'Gana Villarreal',
        teams: 'Villarreal vs Real Sociedad',
        statusColor: 'green',
      },
      {
        ev: 'EV +6.5%',
        time: '14:00',
        prob: '71%',
        odd: '1.70',
        bet: 'Más de 5.5 Córners',
        teams: 'Girona vs Valencia',
        statusColor: 'green',
      },
    ],
  },
  {
    id: 'premier',
    league: 'Premier League',
    picks: [
      {
        ev: 'EV +8.5%',
        time: '17:30',
        prob: '67%',
        odd: '1.65',
        bet: 'Más de 2.5 Goles',
        teams: 'Liverpool vs Aston Villa',
        statusColor: 'red',
      },
      {
        ev: 'EV +11.2%',
        time: '15:00',
        prob: '60%',
        odd: '1.85',
        bet: 'Gana Arsenal',
        teams: 'Arsenal vs Chelsea',
        statusColor: 'green',
      },
      {
        ev: 'EV +6.8%',
        time: '20:00',
        prob: '72%',
        odd: '1.75',
        bet: 'Más de 9.5 Córners',
        teams: 'Man. City vs Tottenham',
        statusColor: 'green',
      },
      {
        ev: 'EV +10.4%',
        time: '14:00',
        prob: '63%',
        odd: '1.90',
        bet: 'Gana Newcastle',
        teams: 'Newcastle vs West Ham',
        statusColor: 'green',
      },
      {
        ev: 'EV +7.9%',
        time: '16:30',
        prob: '58%',
        odd: '1.82',
        bet: 'Ambos Anotan',
        teams: 'Brighton vs Man. United',
        statusColor: 'green',
      },
    ],
  },
  {
    id: 'seriea',
    league: 'Serie A',
    picks: [
      {
        ev: 'EV +11.5%',
        time: '20:45',
        prob: '58%',
        odd: '1.85',
        bet: 'Gana Inter Milan',
        teams: 'Inter Milan vs AC Milan',
        statusColor: 'green',
      },
      {
        ev: 'EV +8.9%',
        time: '18:00',
        prob: '64%',
        odd: '1.70',
        bet: 'Más de 1.5 Goles Local',
        teams: 'Juventus vs Napoli',
        statusColor: 'green',
      },
      {
        ev: 'EV +10.1%',
        time: '15:00',
        prob: '51%',
        odd: '2.00',
        bet: 'Ambos Anotan',
        teams: 'Lazio vs AS Roma',
        statusColor: 'green',
      },
      {
        ev: 'EV +12.3%',
        time: '20:45',
        prob: '69%',
        odd: '1.78',
        bet: 'Gana Atalanta',
        teams: 'Atalanta vs Fiorentina',
        statusColor: 'green',
      },
      {
        ev: 'EV +6.4%',
        time: '15:00',
        prob: '57%',
        odd: '1.88',
        bet: 'Más de 4.5 Tiros',
        teams: 'Bologna vs Torino',
        statusColor: 'green',
      },
    ],
  },
  {
    id: 'bundesliga',
    league: 'Bundesliga',
    picks: [
      {
        ev: 'EV +9.8%',
        time: '18:30',
        prob: '62%',
        odd: '1.70',
        bet: 'Gana Bayern Munich',
        teams: 'Bayern Munich vs Borussia Dortmund',
        statusColor: 'green',
      },
      {
        ev: 'EV +12.0%',
        time: '15:30',
        prob: '70%',
        odd: '1.95',
        bet: 'Más de 3.5 Goles',
        teams: 'Bayer Leverkusen vs RB Leipzig',
        statusColor: 'green',
      },
      {
        ev: 'EV +7.2%',
        time: '15:30',
        prob: '56%',
        odd: '1.85',
        bet: 'Más de 4.5 Córners',
        teams: 'Eintracht Frankfurt vs VfB Stuttgart',
        statusColor: 'green',
      },
      {
        ev: 'EV +10.8%',
        time: '15:30',
        prob: '64%',
        odd: '1.80',
        bet: 'Gana Wolfsburg',
        teams: 'Wolfsburg vs Mainz 05',
        statusColor: 'green',
      },
      {
        ev: 'EV +6.9%',
        time: '18:30',
        prob: '53%',
        odd: '1.92',
        bet: 'Ambos Anotan',
        teams: 'Borussia Mgladbach vs Freiburg',
        statusColor: 'green',
      },
    ],
  },
  {
    id: 'ligue1',
    league: 'Ligue 1',
    picks: [
      {
        ev: 'EV +10.2%',
        time: '21:00',
        prob: '45%',
        odd: '1.85',
        bet: 'Gana Monaco',
        teams: 'Lyon vs Monaco',
        statusColor: 'green',
      },
      {
        ev: 'EV +13.5%',
        time: '17:00',
        prob: '75%',
        odd: '1.60',
        bet: 'Gana PSG (-1.5)',
        teams: 'PSG vs Marseille',
        statusColor: 'green',
      },
      {
        ev: 'EV +6.1%',
        time: '19:00',
        prob: '63%',
        odd: '1.78',
        bet: 'Más de 2.5 Goles',
        teams: 'Lille vs Rennes',
        statusColor: 'green',
      },
      {
        ev: 'EV +9.4%',
        time: '15:00',
        prob: '59%',
        odd: '1.85',
        bet: 'Gana Nice',
        teams: 'Nice vs Lens',
        statusColor: 'green',
      },
      {
        ev: 'EV +7.7%',
        time: '21:00',
        prob: '54%',
        odd: '1.90',
        bet: 'Más de 4.5 Córners',
        teams: 'Toulouse vs Montpellier',
        statusColor: 'green',
      },
    ],
  },
];

export const LeaguesPreview: React.FC = () => {
  return (
    <div className="mask-marquee w-full overflow-hidden py-1">
      <div className="scroller-inner animate-marquee flex w-max flex-nowrap gap-4 py-2 hover:[animation-play-state:paused]">
        {/* Original Items */}
        {LEAGUES_DATA.map((col) => (
          <LeagueColumnWidget key={`orig-${col.id}`} column={col} />
        ))}

        {/* Duplicated Items for 360° Continuous Marquee Loop */}
        {LEAGUES_DATA.map((col) => (
          <LeagueColumnWidget key={`dup-${col.id}`} column={col} />
        ))}
      </div>
    </div>
  );
};
