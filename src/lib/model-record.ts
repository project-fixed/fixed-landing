import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface ResolvedPick {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  kickoffAt: string;
  market: string;
  fixedOutcome: string;
  line: number | null;
  odds: number;
  probability: number;
  ev: number;
  status: 'WON' | 'LOST';
}

export interface ModelPerformanceStats {
  yield: number;
  hitRate: number;
  totalBets: number;
}

export interface ModelRecord {
  picks: ResolvedPick[];
  stats: ModelPerformanceStats;
}

interface BetRow {
  id: string;
  match_id: string;
  market: string;
  fixed_outcome: string;
  line: number | null;
  odds: number;
  probability: number;
  ev: number;
  status: string;
}

interface MatchRow {
  id: string;
  kickoff_at: string;
  league_id: string;
  home_team_id: string;
  away_team_id: string;
}

interface NameRow {
  id: string;
  name: string;
}

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getModelRecord(
  pickLimit = 18,
): Promise<ModelRecord | null> {
  try {
    const supabase = getClient();
    if (!supabase) {
      console.warn('[ModelRecord] Credenciales de Supabase ausentes.');
      return null;
    }

    const [latestPicks, settledBets] = await Promise.all([
      supabase
        .from('bets')
        .select(
          'id, match_id, market, fixed_outcome, line, odds, probability, ev, status',
        )
        .in('status', ['WON', 'LOST'])
        .order('created_at', { ascending: false })
        .limit(pickLimit),
      supabase
        .from('bets')
        .select('odds, status')
        .in('status', ['WON', 'LOST']),
    ]);

    const pickRows = (latestPicks.data ?? []) as BetRow[];
    const settledRows = (settledBets.data ?? []) as Array<{
      odds: number;
      status: string;
    }>;

    if (settledRows.length === 0) return null;

    const wins = settledRows.filter((b) => b.status === 'WON').length;
    const profitUnits = settledRows.reduce(
      (acc, b) => acc + (b.status === 'WON' ? Number(b.odds) - 1 : -1),
      0,
    );
    const stats: ModelPerformanceStats = {
      yield: profitUnits / settledRows.length,
      hitRate: wins / settledRows.length,
      totalBets: settledRows.length,
    };

    if (pickRows.length === 0) {
      return { picks: [], stats };
    }

    const matchIds = [...new Set(pickRows.map((p) => p.match_id))];
    const { data: matchData } = await supabase
      .from('matches')
      .select('id, kickoff_at, league_id, home_team_id, away_team_id')
      .in('id', matchIds);
    const matchRows = (matchData ?? []) as MatchRow[];
    const matchById = new Map(matchRows.map((m) => [m.id, m]));

    const leagueIds = [...new Set(matchRows.map((m) => m.league_id))];
    const teamIds = [
      ...new Set(matchRows.flatMap((m) => [m.home_team_id, m.away_team_id])),
    ];

    let leagueRows: NameRow[] = [];
    let teamRows: NameRow[] = [];

    const queries = await Promise.all([
      leagueIds.length
        ? supabase.from('leagues').select('id, name').in('id', leagueIds)
        : Promise.resolve({ data: [] }),
      teamIds.length
        ? supabase.from('teams').select('id, name').in('id', teamIds)
        : Promise.resolve({ data: [] }),
    ]);

    leagueRows = (queries[0].data ?? []) as NameRow[];
    teamRows = (queries[1].data ?? []) as NameRow[];

    const leagueName = new Map(leagueRows.map((l) => [l.id, l.name]));
    const teamName = new Map(teamRows.map((t) => [t.id, t.name]));

    const enriched: ResolvedPick[] = [];
    for (const pick of pickRows) {
      const match = matchById.get(pick.match_id);
      if (!match) continue;
      enriched.push({
        id: pick.id,
        league: leagueName.get(match.league_id) ?? '',
        homeTeam: teamName.get(match.home_team_id) ?? '',
        awayTeam: teamName.get(match.away_team_id) ?? '',
        kickoffAt: match.kickoff_at,
        market: pick.market,
        fixedOutcome: pick.fixed_outcome,
        line: pick.line === null ? null : Number(pick.line),
        odds: Number(pick.odds),
        probability: Number(pick.probability),
        ev: Number(pick.ev),
        status: pick.status === 'WON' ? 'WON' : 'LOST',
      });
    }

    return { picks: enriched, stats };
  } catch (error) {
    console.error('[ModelRecord] Error al consultar Supabase:', error);
    return null;
  }
}
