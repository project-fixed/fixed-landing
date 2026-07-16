'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations, type Lang } from '@/data/translations';

interface Props {
  lang: Lang;
}

export const FaqAccordion: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const faqData = t.landing.faq.questions;

  const [activeValue, setActiveValue] = useState<string[]>(['item-1']);

  // Map translations to iterable array
  const questions = [
    { id: 'item-1', ...faqData.question1 },
    { id: 'item-2', ...faqData.question2 },
    { id: 'item-3', ...faqData.question3 },
    { id: 'item-4', ...faqData.question4 },
    { id: 'item-5', ...faqData.question5 },
  ];

  return (
    <div className="mx-auto w-full max-w-[800px]">
      {/* Tab Selectors matching Angular functionality */}
      <div className="mb-6 flex justify-end gap-2 pr-2">
        {[1, 2, 3, 4, 5].map((num) => {
          const val = `item-${num}`;
          const isActive = activeValue[0] === val;
          return (
            <button
              key={num}
              onClick={() => setActiveValue([val])}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full text-xs font-extrabold transition-all duration-200 ${
                isActive
                  ? 'bg-primary scale-105 text-white shadow-lg'
                  : 'text-text-body border border-white/10 bg-white/5 hover:bg-white/15'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      <Accordion
        value={activeValue}
        onValueChange={(val: string[]) => setActiveValue(val)}
        className="flex flex-col gap-4"
      >
        {questions.map((q) => (
          <AccordionItem
            key={q.id}
            value={q.id}
            className="bg-main-glass hover:border-primary/30 rounded-[15px] border border-white/5 px-6 transition-all duration-300"
          >
            <AccordionTrigger className="hover:text-primary py-4 text-left text-base font-bold text-white transition-colors hover:no-underline">
              {q.title}
            </AccordionTrigger>
            <AccordionContent className="text-text-body pt-1 pb-4 text-sm leading-relaxed">
              {q.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
