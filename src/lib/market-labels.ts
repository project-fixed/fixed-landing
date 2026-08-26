import type { Lang } from '@/data/translations';

const MARKET_NOUNS: Record<string, { es: string; en: string }> = {
  OVER_UNDER_GOALS: { es: 'Goles', en: 'Goals' },
  OVER_UNDER_CORNERS: { es: 'Córners', en: 'Corners' },
  OVER_UNDER_CARDS: { es: 'Tarjetas Amarillas', en: 'Yellow Cards' },
  OVER_UNDER_SHOTS: { es: 'Tiros', en: 'Shots' },
  OVER_UNDER_SHOTS_ON_TARGET: { es: 'Tiros a Puerta', en: 'Shots on Target' },
};

export function getMarketLabel(
  market: string,
  fixedOutcome: string,
  line: number | null,
  lang: Lang,
  homeTeam?: string,
  awayTeam?: string,
): string {
  if (market === '1X2') {
    if (fixedOutcome === '1')
      return lang === 'es'
        ? `Gana ${homeTeam || 'Local'}`
        : `${homeTeam || 'Home'} Wins`;
    if (fixedOutcome === 'X') return lang === 'es' ? 'Empate' : 'Draw';
    if (fixedOutcome === '2')
      return lang === 'es'
        ? `Gana ${awayTeam || 'Visitante'}`
        : `${awayTeam || 'Away'} Wins`;
  }

  if (market === 'DOUBLE_CHANCE') {
    if (fixedOutcome === '1X')
      return lang === 'es'
        ? `${homeTeam || 'Local'} o Empate`
        : `${homeTeam || 'Home'} or Draw`;
    if (fixedOutcome === '12')
      return lang === 'es'
        ? `${homeTeam || 'Local'} o ${awayTeam || 'Visitante'}`
        : `${homeTeam || 'Home'} or ${awayTeam || 'Away'}`;
    if (fixedOutcome === 'X2')
      return lang === 'es'
        ? `Empate o ${awayTeam || 'Visitante'}`
        : `Draw or ${awayTeam || 'Away'}`;
  }

  if (market === 'BOTH_TEAMS_TO_SCORE') {
    if (fixedOutcome === 'YES')
      return lang === 'es' ? 'Ambos marcan' : 'Both Teams to Score';
    if (fixedOutcome === 'NO')
      return lang === 'es' ? 'No marcan ambos' : 'Both Teams to Score: No';
  }

  let baseMarket = market;
  let teamPrefix = '';

  if (market.startsWith('HOME_')) {
    baseMarket = market.replace('HOME_', '');
    teamPrefix = homeTeam
      ? `${homeTeam}: `
      : lang === 'es'
        ? 'Local: '
        : 'Home: ';
  } else if (market.startsWith('AWAY_')) {
    baseMarket = market.replace('AWAY_', '');
    teamPrefix = awayTeam
      ? `${awayTeam}: `
      : lang === 'es'
        ? 'Visitante: '
        : 'Away: ';
  }

  const noun = MARKET_NOUNS[baseMarket];
  if (noun && line !== null) {
    const isOver = fixedOutcome.toUpperCase() !== 'UNDER';
    const prefix = isOver
      ? lang === 'es'
        ? 'Más de'
        : 'Over'
      : lang === 'es'
        ? 'Menos de'
        : 'Under';
    return `${teamPrefix}${prefix} ${line} ${noun[lang]}`;
  }

  return `${fixedOutcome} ${market.replace(/_/g, ' ')}`;
}
