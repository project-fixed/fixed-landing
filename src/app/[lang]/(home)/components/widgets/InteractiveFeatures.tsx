'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, type Lang } from '@/data/translations';
import {
  LayoutDashboard,
  BarChart3,
  ShieldAlert,
  Calculator,
  ChevronRight,
} from 'lucide-react';

interface Props {
  lang: Lang;
}

export const InteractiveFeatures: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.features.accordion;
  const [activeTab, setActiveTab] = useState<number>(0);

  const accordionItems = [
    {
      id: 0,
      icon: LayoutDashboard,
      title: data.item1.title,
      subtitle: data.item1.subtitle,
      description: data.item1.description,
    },
    {
      id: 1,
      icon: BarChart3,
      title: data.item2.title,
      subtitle: data.item2.subtitle,
      description: data.item2.description,
    },
    {
      id: 2,
      icon: ShieldAlert,
      title: data.item3.title,
      subtitle: data.item3.subtitle,
      description: data.item3.description,
    },
    {
      id: 3,
      icon: Calculator,
      title: data.item4.title,
      subtitle: data.item4.subtitle,
      description: data.item4.description,
    },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black p-4 select-none sm:p-8 md:p-12">
      {/* Background Glows */}
      <div className="bg-primary/10 absolute top-[-10%] left-[-10%] h-[120%] w-[50%] rounded-full blur-[140px]" />
      <div className="bg-primary-dark/20 absolute right-[-10%] bottom-[-10%] h-[120%] w-[50%] rounded-full blur-[160px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex h-full w-full max-w-[1300px] flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
        {/* Left Column: Accordion Navigation */}
        <div className="flex w-full flex-col justify-center gap-3 lg:w-[45%]">
          <div className="mb-2">
            <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase">
              {lang === 'es' ? 'FUNCIONALIDADES CLAVE' : 'KEY FEATURES'}
            </span>
          </div>

          {accordionItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex cursor-pointer flex-col rounded-xl border p-5 transition-all duration-300 ${
                  isActive
                    ? 'border-primary/50 bg-white/[0.05] shadow-[0_0_30px_rgba(62,93,108,0.15)]'
                    : 'border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isActive
                          ? 'border-primary/50 bg-primary/20 text-primary-light'
                          : 'border-white/10 bg-white/5 text-white/50 group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3
                        className={`font-mono text-base font-bold transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted font-mono text-xs">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isActive
                        ? 'text-primary rotate-90'
                        : 'text-white/30 group-hover:text-white/60'
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted mt-4 border-t border-white/5 pt-3 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Preview Container */}
        <div className="relative flex min-h-[360px] w-full flex-1 items-center justify-center rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-md lg:min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-full w-full flex-col justify-between"
            >
              {activeTab === 0 && <PreviewDashboard lang={lang} />}
              {activeTab === 1 && <PreviewMatchAnalysis lang={lang} />}
              {activeTab === 2 && <PreviewTopValueBets lang={lang} />}
              {activeTab === 3 && <PreviewKellyCalculator lang={lang} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Preview Mockup Components for the Right Panel

function PreviewDashboard({ lang }: { lang: string }) {
  const leagues = [
    'LaLiga',
    'Premier League',
    'Serie A',
    'Bundesliga',
    'Ligue 1',
  ];

  return (
    <div className="bg-surface-deep/90 flex h-full w-full flex-col gap-4 rounded-xl border border-white/5 p-5 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="font-bold text-white uppercase">
            {lang === 'es' ? 'DASHBOARD MULTILIGA' : 'MULTI-LEAGUE DASHBOARD'}
          </span>
        </div>
        <div className="flex gap-4 text-[10px] text-white/70">
          <span>
            HIT RATE: <strong className="text-emerald-400">65%</strong>
          </span>
          <span>
            YIELD: <strong className="text-emerald-400">12%</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {leagues.map((league, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] p-3"
          >
            <div className="text-primary-light border-b border-white/5 pb-1 text-[11px] font-bold">
              {league}
            </div>
            <div className="flex flex-col gap-1.5 rounded border border-emerald-500/20 bg-emerald-500/10 p-2 text-[10px]">
              <div className="flex justify-between font-bold text-emerald-400">
                <span>EV +{(12.4 - idx * 1.2).toFixed(1)}%</span>
                <span className="text-white/60">1.85</span>
              </div>
              <div className="truncate font-sans font-medium text-white">
                {idx % 2 === 0 ? 'Goles > 2.5' : 'Corners > 5.5'}
              </div>
              <div className="truncate text-[9px] text-white/50">
                {idx === 0
                  ? 'Real Madrid vs Barç'
                  : idx === 1
                    ? 'Man City vs Chelsea'
                    : 'Inter vs Milan'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewMatchAnalysis({ lang }: { lang: string }) {
  const stats = [
    {
      label: lang === 'es' ? 'Goles' : 'Goals',
      home: 'Más de 1.5',
      away: 'Más de 1.5',
    },
    {
      label: lang === 'es' ? 'Tiros' : 'Shots',
      home: 'Más de 5.5',
      away: 'Más de 4.5',
    },
    {
      label: lang === 'es' ? 'Tiros a Puerta' : 'Shots on Target',
      home: 'Más de 4.5',
      away: 'Más de 3.5',
    },
    {
      label: lang === 'es' ? 'Córners' : 'Corners',
      home: 'Más de 5.5',
      away: 'Más de 4.5',
    },
    {
      label: lang === 'es' ? 'Tarjetas Amarillas' : 'Yellow Cards',
      home: 'Más de 1.5',
      away: 'Más de 2.5',
    },
  ];

  return (
    <div className="bg-surface-deep/90 flex h-full w-full flex-col gap-4 rounded-xl border border-white/5 p-5 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-bold text-white uppercase">
          {lang === 'es'
            ? 'ANÁLISIS EN DETALLE: REAL MADRID VS BARCELONA'
            : 'MATCH DEEP DIVE: REAL MADRID VS BARCELONA'}
        </span>
        <span className="bg-primary/20 text-primary-light rounded px-2 py-0.5 text-[10px]">
          Jornada 38
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 pb-1 text-center text-[10px] text-white/50">
          <span>LOCAL</span>
          <span>MERCADO</span>
          <span>VISITANTE</span>
        </div>
        {stats.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 items-center rounded border border-white/5 bg-white/[0.02] p-2 text-center text-[11px]"
          >
            <span className="font-semibold text-emerald-400">{row.home}</span>
            <span className="font-bold text-white/70">{row.label}</span>
            <span className="font-semibold text-emerald-400">{row.away}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewTopValueBets({ lang }: { lang: string }) {
  const bets = [
    {
      rank: '#1',
      badge: 'LA FIJA',
      ev: '+14.2%',
      pick: 'Más de 2.5 Goles',
      match: 'Real Madrid vs Barcelona',
      odds: '1.55',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    },
    {
      rank: '#2',
      badge: lang === 'es' ? 'Conf. Media' : 'Med Conf.',
      ev: '+9.8%',
      pick: 'Más de 5.5 Córners',
      match: 'Real Madrid',
      odds: '1.85',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
    {
      rank: '#3',
      badge: lang === 'es' ? 'Conf. Media' : 'Med Conf.',
      ev: '+8.3%',
      pick: 'Más de 4.5 Tiros a Puerta',
      match: 'Barcelona',
      odds: '1.90',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
  ];

  return (
    <div className="bg-surface-deep/90 flex h-full w-full flex-col gap-4 rounded-xl border border-white/5 p-5 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-bold text-white uppercase">
          {lang === 'es'
            ? 'TOP VALUE BETS (RANKING)'
            : 'TOP VALUE BETS (RANKING)'}
        </span>
        <span className="text-[10px] text-white/50">EV &gt; 5%</span>
      </div>

      <div className="flex flex-col gap-3">
        {bets.map((bet, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white/40">
                {bet.rank}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[9px] font-bold ${bet.color}`}
                  >
                    {bet.badge}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">
                    EV {bet.ev}
                  </span>
                </div>
                <span className="mt-1 font-sans font-semibold text-white">
                  {bet.pick}
                </span>
                <span className="text-[10px] text-white/50">{bet.match}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/40">
                {lang === 'es' ? 'Cuota' : 'Odds'}
              </span>
              <div className="text-sm font-bold text-white">{bet.odds}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewKellyCalculator({ lang }: { lang: string }) {
  return (
    <div className="bg-surface-deep/90 flex h-full w-full flex-col gap-4 rounded-xl border border-white/5 p-5 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-bold text-white uppercase">
          {lang === 'es'
            ? 'GESTIÓN DE BANKROLL (KELLY CRITERION)'
            : 'BANKROLL MANAGEMENT (KELLY CRITERION)'}
        </span>
        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
          MAX 5% CAP
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <span className="text-[10px] text-white/50">
            {lang === 'es' ? 'Fórmula EV' : 'EV Formula'}
          </span>
          <span className="text-xs font-bold text-emerald-400">
            (Prob Real × Cuota) - 1
          </span>
          <span className="mt-2 text-[10px] text-white/50">
            {lang === 'es' ? 'Resultado EV' : 'EV Result'}
          </span>
          <span className="text-sm font-bold text-white">
            +12.4% {lang === 'es' ? 'Ventaja' : 'Edge'}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <span className="text-[10px] text-white/50">
            {lang === 'es' ? 'Stake Recomendado' : 'Recommended Stake'}
          </span>
          <span className="text-xs font-bold text-emerald-400">
            3.5% {lang === 'es' ? 'del Bankroll' : 'of Bankroll'}
          </span>
          <span className="mt-2 text-[10px] text-white/50">
            {lang === 'es' ? 'Límite de Riesgo' : 'Risk Ceiling'}
          </span>
          <span className="text-sm font-bold text-white">
            5.0% {lang === 'es' ? 'Conservador' : 'Conservative'}
          </span>
        </div>
      </div>

      <div className="mt-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-[11px] leading-relaxed text-emerald-300">
        {lang === 'es'
          ? '✓ El Criterio de Kelly optimiza el crecimiento logarítmico del capital y previene la bancarrota ante rachas adversas.'
          : '✓ Kelly Criterion optimizes logarithmic capital growth and protects against drawdown risks.'}
      </div>
    </div>
  );
}
