'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { List } from 'lucide-react';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

export interface LegalSection {
  id: string;
  title: string;
  label: string;
  content: ReactNode;
}

interface ReadmeLayoutProps {
  filename: string;
  sections: LegalSection[];
  title?: string;
  description?: string;
  children: ReactNode;
}

export function ReadmeLayout({
  filename,
  sections,
  title,
  description,
  children,
}: ReadmeLayoutProps) {
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) setTocOpen(true);
  }, []);

  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  const handleScroll = useCallback(() => {
    const offsets = sections.map((s) => {
      const el = document.getElementById(s.id);
      return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity };
    });
    const current = offsets.reduce(
      (best, item) => (item.top <= 140 && item.top > best.top ? item : best),
      { id: sections[0]?.id ?? '', top: -Infinity },
    );
    if (current.id) setActiveId(current.id);
  }, [sections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveId(id);
  };

  return (
    <section className="container mx-auto flex w-full flex-col items-center justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <ScrollReveal
        direction="up"
        delay={0.1}
        className="bg-bg-primary/90 max-w-[900px] rounded-xl border border-white/10 shadow-2xl backdrop-blur-2xl"
      >
        {/* ── Title Bar ── */}
        <div className="flex items-center gap-3 border-b border-white/5 bg-white/5 px-5 py-3.5 select-none">
          <span className="font-mono text-[10px] font-bold tracking-widest text-white/30 uppercase">
            {filename}
          </span>
          <div className="flex-1" />
          <button
            onClick={() => setTocOpen((v) => !v)}
            className={`rounded p-1.5 transition-colors ${tocOpen ? 'bg-white/10 text-white/70' : 'text-white/30 hover:bg-white/5 hover:text-white/70'}`}
            aria-label="Toggle table of contents"
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="relative flex">
          {/* Content */}
          <div className="min-w-0 flex-1 px-8 py-10 md:px-12">
            {title && (
              <div className="mb-12 max-w-[700px]">
                <h1 className="mb-6 text-5xl leading-tight font-extrabold text-white">
                  {title}
                </h1>
                {description && (
                  <p className="text-muted mx-auto max-w-[600px] text-base leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )}
            <div className="text-body space-y-6">{children}</div>
          </div>

          {/* Sidepanel */}
          <div
            className={`bg-bg-primary/90 sticky top-0 h-screen w-64 shrink-0 self-start border-l border-white/5 transition-all duration-300 ease-in-out ${tocOpen ? 'opacity-100' : 'pointer-events-none w-0 opacity-0'} `}
          >
            <nav className="w-64 p-6">
              <div className="mb-5 font-sans text-[11px] font-semibold tracking-wider text-white/30 uppercase">
                On this page
              </div>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className={`w-full rounded px-3 py-1.5 text-left text-[13px] transition-colors ${activeId === s.id ? 'text-white' : 'text-white/40 hover:text-white'} `}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
