import React from 'react';
import { useTranslations, type Lang } from '../data/translations';

interface Props {
  lang: Lang;
}

export const DataStreamMarquee: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.datastream;

  // Dividimos los datos en dos filas para alternar
  const row1 = data.slice(0, 4);
  const row2 = data.slice(4, 8);

  return (
    <div className="mask-marquee flex w-full flex-col gap-3.5 overflow-hidden border-y border-white/5 bg-black/10 py-8">
      {/* Fila 1: Desplazamiento a la izquierda */}
      <div className="scroller w-full">
        <div className="scroller-inner animate-scroll-left flex w-max flex-nowrap gap-4">
          {[...row1, ...row1, ...row1].map((item, idx) => (
            <div
              key={`ds1-${idx}`}
              className="flex items-center gap-3 rounded-lg border border-emerald-500/10 bg-zinc-950/40 px-4 py-2.5 font-mono text-xs text-zinc-400 shadow-inner backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-bold text-zinc-600">SYSTEM_LOG //</span>
              <span className="text-emerald-500/90">{item}</span>
              <span className="text-zinc-600">[OK]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fila 2: Desplazamiento a la derecha */}
      <div className="scroller w-full">
        <div className="scroller-inner animate-scroll-right flex w-max flex-nowrap gap-4">
          {[...row2, ...row2, ...row2].map((item, idx) => (
            <div
              key={`ds2-${idx}`}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-zinc-950/20 px-4 py-2.5 font-mono text-xs text-zinc-400 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span className="font-bold text-zinc-700">ANALYSIS_CORE //</span>
              <span className="text-zinc-300">{item}</span>
              <span className="text-zinc-500">[PENDING...]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
