'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, type Lang } from '@/data/translations';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/components/ui/accordion';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { SectionBadge } from '@/shared/components/ui/SectionBadge';
import { LeaguesPreview } from './interactive/LeaguesPreview';
import { GridBackground } from '@/shared/components/ui/GridBackground';
import { MatchAnalysisPreview } from './interactive/MatchAnalysisPreview';

interface Props {
  lang: Lang;
}

export const InteractiveFeaturesSection: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const data = t.landing.home.features;
  const accordionData = data.accordion;
  const [activeItem, setActiveItem] = useState<string[]>(['item-1']);

  const accordionItems = [
    {
      id: 'item-1',
      title: accordionData.item1.title,
      subtitle: accordionData.item1.subtitle,
      description: accordionData.item1.description,
    },
    {
      id: 'item-2',
      title: accordionData.item2.title,
      subtitle: accordionData.item2.subtitle,
      description: accordionData.item2.description,
    },
  ];

  const activeItemId = activeItem[0];

  return (
    <section
      id="interactive-features"
      className="page-section relative flex flex-col gap-12 py-20 md:py-24"
    >
      {/* Background Grid & Glow (Glow on the right) */}
      <GridBackground glowPosition="end" showGradientOverlay />

      {/* Header: Title and Description (Top aligned like Zenity) */}
      <ScrollReveal
        direction="up"
        delay={0.1}
        className="relative z-10 w-full max-w-3xl"
      >
        <SectionBadge label="features" className="mb-4 block w-fit" />
        <h2 className="title-hero mt-2 text-balance">{data.title}</h2>
        <p className="text-muted mt-4 max-w-xl text-base leading-relaxed">
          {data.description}
        </p>
      </ScrollReveal>

      {/* Two Column Grid: Accordion Left + Preview Right */}
      <div className="relative z-10 mt-4 flex flex-col gap-8 xl:flex-row xl:items-stretch xl:gap-12">
        {/* Left Column: Clean Accordion Controller */}
        <ScrollReveal
          direction="up"
          delay={0.2}
          className="flex w-full flex-col justify-center xl:w-[36%]"
        >
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(val: string[]) => {
              if (val && val.length > 0) setActiveItem(val);
            }}
          >
            {accordionItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>
                  <span className="flex flex-col text-left">
                    <span className="font-display group-hover:text-primary-light text-lg font-semibold text-white transition-colors">
                      {item.title}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>

                  {/* Inline Visual Preview for mobile/tablet (below xl) */}
                  <div className="mt-5 w-full overflow-hidden rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-md xl:hidden">
                    {/* Top Bar Mockup Header */}
                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                      </div>
                      <span className="font-mono text-[9px] tracking-wider text-white/30">
                        fixed.app
                      </span>
                    </div>

                    <div className="relative w-full overflow-hidden">
                      {item.id === 'item-1' && <LeaguesPreview />}
                      {item.id === 'item-2' && <MatchAnalysisPreview />}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        {/* Right Column: Visual Preview Renderer (Unified) */}
        <ScrollReveal
          direction="up"
          delay={0.3}
          className="hidden h-full w-full min-w-0 shrink-0 flex-col xl:sticky xl:top-28 xl:flex xl:w-[64%]"
        >
          <div className="relative flex h-full min-h-[560px] w-full min-w-0 shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl sm:p-6 xl:min-h-[600px]">
            {/* Dynamic Background Glow */}
            <div className="bg-primary/15 pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px]" />
            <div className="bg-primary/5 pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-[100px]" />

            {/* Top Bar Mockup Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-white/40">
                fixed.app
              </span>
            </div>

            {/* Content Area with Framer Motion AnimatePresence */}
            <div className="relative z-10 my-4 flex w-full min-w-0 flex-1 items-stretch justify-center">
              <AnimatePresence mode="wait">
                {activeItemId === 'item-1' && (
                  <motion.div
                    key="item-1"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex w-full min-w-0 flex-1 flex-col justify-center"
                  >
                    <LeaguesPreview />
                  </motion.div>
                )}

                {activeItemId === 'item-2' && (
                  <motion.div
                    key="item-2"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex w-full min-w-0 flex-1 flex-col justify-center"
                  >
                    <MatchAnalysisPreview />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
