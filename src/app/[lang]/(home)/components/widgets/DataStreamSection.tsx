import React from 'react';
import { useTranslations, type Lang } from '@/data/translations';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

interface Props {
  lang: Lang;
}

export const DataStreamSection: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.datastream;

  const row1 = data.slice(0, 4);
  const row2 = data.slice(4, 8);

  return (
    <div className="mask-marquee flex w-full flex-col gap-3.5 overflow-hidden border-y border-white/10 bg-black/10 py-8">
      <ScrollReveal
        direction="up"
        delay={0.2}
        className="flex w-full flex-col gap-3.5"
      >
        <div className="scroller w-full">
          <div className="scroller-inner animate-scroll-left flex w-max flex-nowrap gap-4">
            {[...row1, ...row1, ...row1].map((item, idx) => (
              <div
                key={`ds1-${idx}`}
                className="bg-surface-deep/30 text-muted flex items-center gap-3 rounded-lg border border-white/5 px-4 py-2.5 font-mono text-xs shadow-inner backdrop-blur-sm"
              >
                <span className="bg-status-success h-1.5 w-1.5 animate-pulse rounded-full" />
                <span className="text-faint font-bold">SYSTEM_LOG //</span>
                <span className="text-status-success/90">{item}</span>
                <span className="text-faint">[OK]</span>
              </div>
            ))}
          </div>
        </div>

        <div className="scroller w-full">
          <div className="scroller-inner animate-scroll-right flex w-max flex-nowrap gap-4">
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <div
                key={`ds2-${idx}`}
                className="bg-surface-deep/20 text-muted flex items-center gap-3 rounded-lg border border-white/5 px-4 py-2.5 font-mono text-xs backdrop-blur-sm"
              >
                <span className="bg-faint h-1.5 w-1.5 rounded-full" />
                <span className="text-faint font-bold">ANALYSIS_CORE //</span>
                <span className="text-body">{item}</span>
                <span className="text-faint">[PENDING...]</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
