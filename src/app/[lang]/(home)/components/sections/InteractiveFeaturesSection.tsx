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
import { LeaguesPreview } from './interactive/LeaguesPreview';
import { GridBackground } from '@/shared/components/ui/GridBackground';
import { MatchAnalysisPreview } from './interactive/MatchAnalysisPreview';
import { trackEvent } from '@/lib/analytics';

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
      className="page-section bg-gradient-interactive relative flex flex-col gap-12 py-20 md:py-24"
    >
      <GridBackground />

      <ScrollReveal
        direction="up"
        delay={0.1}
        className="relative z-10 w-full max-w-3xl"
      >
        <h2 className="title-hero mt-2 text-balance">{data.title}</h2>
        <p className="text-muted mt-4 max-w-xl text-base leading-relaxed">
          {data.description}
        </p>
      </ScrollReveal>

      <div className="relative z-10 mt-4 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="flex w-full flex-col gap-6 lg:hidden">
          <div
            role="tablist"
            aria-label="Features tabs"
            className="relative mx-auto flex w-full max-w-sm rounded-full border border-white/5 bg-white/[0.03] p-1"
          >
            {accordionItems.map((item) => {
              const isActive = activeItemId === item.id;
              return (
                <button
                  key={item.id}
                  id={`feature-tab-${item.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`feature-panel-${item.id}`}
                  onClick={() => {
                    setActiveItem([item.id]);
                    trackEvent('click_features_tab', {
                      tab_id: item.id,
                      tab_name: item.title,
                      device: 'mobile',
                    });
                  }}
                  className={`font-display relative z-10 flex-1 rounded-full py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.08] shadow-inner"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.title}
                </button>
              );
            })}
          </div>

          <div className="flex min-h-[50px] items-center justify-center px-4 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeItemId}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="text-body text-sm leading-relaxed text-white/70"
              >
                {accordionItems.find((i) => i.id === activeItemId)?.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative flex min-h-[340px] w-full flex-col justify-start overflow-hidden rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-[9px] tracking-wider text-white/30">
                app.fixed.software
              </span>
            </div>

            <div className="relative flex w-full flex-1 flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {activeItemId === 'item-1' && (
                  <motion.div
                    key="item-1"
                    id="feature-panel-item-1"
                    role="tabpanel"
                    aria-labelledby="feature-tab-item-1"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex w-full flex-1 flex-col justify-center"
                  >
                    <LeaguesPreview />
                  </motion.div>
                )}

                {activeItemId === 'item-2' && (
                  <motion.div
                    key="item-2"
                    id="feature-panel-item-2"
                    role="tabpanel"
                    aria-labelledby="feature-tab-item-2"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex w-full flex-1 flex-col justify-center"
                  >
                    <MatchAnalysisPreview />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Disclaimer at the bottom of the mobile simulated browser */}
            <div className="mt-4 border-t border-white/5 pt-2 text-right">
              <span className="font-mono text-[8px] tracking-wider text-white/25">
                {data.demoDisclaimer}
              </span>
            </div>
          </div>
        </div>

        <ScrollReveal
          direction="up"
          delay={0.2}
          className="hidden w-full flex-col justify-center lg:flex lg:w-[36%]"
        >
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(val: string[]) => {
              if (val && val.length > 0) {
                setActiveItem(val);
                const selectedItem = accordionItems.find(
                  (i) => i.id === val[0],
                );
                if (selectedItem) {
                  trackEvent('click_features_tab', {
                    tab_id: selectedItem.id,
                    tab_name: selectedItem.title,
                    device: 'desktop',
                  });
                }
              }
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal
          direction="up"
          delay={0.3}
          className="hidden h-full w-full min-w-0 shrink-0 flex-col lg:sticky lg:top-28 lg:flex lg:w-[64%]"
        >
          <div className="relative flex h-full min-h-[560px] w-full min-w-0 shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl sm:p-6 lg:min-h-[600px]">
            <div className="bg-primary/15 pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px]" />
            <div className="bg-primary/5 pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-[100px]" />

            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-white/40">
                app.fixed.software
              </span>
            </div>

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

            {/* Disclaimer at the bottom of the desktop simulated browser */}
            <div className="relative z-10 border-t border-white/5 pt-3 text-right">
              <span className="font-mono text-[9px] tracking-wider text-white/30">
                {data.demoDisclaimer}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
