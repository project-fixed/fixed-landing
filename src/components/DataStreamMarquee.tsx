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
              className="bg-status-success/10 bg-surface-deep/40 text-text-muted flex items-center gap-3 rounded-lg border px-4 py-2.5 font-mono text-xs shadow-inner backdrop-blur-sm"
            >
              <span className="bg-status-success h-1.5 w-1.5 animate-pulse rounded-full" />
              <span className="text-text-faint font-bold">SYSTEM_LOG //</span>
              <span className="text-status-success/90">{item}</span>
              <span className="text-text-faint">[OK]</span>
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
              className="bg-surface-deep/20 text-text-muted flex items-center gap-3 rounded-lg border border-white/5 px-4 py-2.5 font-mono text-xs backdrop-blur-sm"
            >
              <span className="bg-text-ghost h-1.5 w-1.5 rounded-full" />
              <span className="text-text-ghost font-bold">
                ANALYSIS_CORE //
              </span>
              <span className="text-text-body">{item}</span>
              <span className="text-text-faint">[PENDING...]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
