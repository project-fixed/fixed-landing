import React from 'react';
import { useTranslations } from '@/data/translations';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/components/ui/accordion';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function FaqPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';
  const t = useTranslations(currentLang);
  const faqData = t.landing.faq;

  const faqItems = [
    {
      id: 'item-1',
      title: faqData.questions.question1.title,
      content: faqData.questions.question1.answer,
    },
    {
      id: 'item-2',
      title: faqData.questions.question2.title,
      content: faqData.questions.question2.answer,
    },
    {
      id: 'item-3',
      title: faqData.questions.question3.title,
      content: faqData.questions.question3.answer,
    },
    {
      id: 'item-4',
      title: faqData.questions.question4.title,
      content: faqData.questions.question4.answer,
    },
    {
      id: 'item-5',
      title: faqData.questions.question5.title,
      content: faqData.questions.question5.answer,
    },
  ];

  return (
    <section className="page-section container mx-auto flex min-h-screen flex-col items-center gap-24 pt-36 lg:flex-row">
      <div className="bg-pattern-grid absolute inset-0 opacity-[0.05]" />
      <div className="absolute inset-0 h-full w-full bg-linear-to-b from-transparent via-transparent to-black"></div>

      <ScrollReveal
        direction="up"
        delay={0.1}
        className="w-full lg:w-1/3 lg:self-start"
      >
        <h1 className="title-hero">{t.landing.faq.title}</h1>
        <span className="bg-primary/50 mt-4 block h-[10px] w-14" />
        <p className="text-text-muted mt-6 max-w-[400px] leading-relaxed">
          {t.landing.faq.description}
        </p>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.25} className="w-full lg:w-2/3">
        <Accordion type="single" defaultValue="item-1">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </section>
  );
}
