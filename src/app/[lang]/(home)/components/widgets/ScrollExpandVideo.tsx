'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ScrollExpandVideoProps {
  children?: React.ReactNode;
  cursorText?: string;
}

export function ScrollExpandVideo({
  children,
  cursorText = 'Play intro',
}: ScrollExpandVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // 'start end' means animation starts when the top of the container hits the bottom of the viewport
    // 'end end' means it finishes when the bottom of the container hits the bottom of the viewport
    offset: ['start end', 'center center'],
  });

  // Smooth the scroll progress to avoid jitter
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 120,
    mass: 0.5,
  });

  // Transform values based on scroll progress
  // Starts smaller to create a dramatic expansion effect
  const width = useTransform(
    smoothProgress,
    [0, 1],
    ['min(50vw, 600px)', '100vw'],
  );
  const height = useTransform(smoothProgress, [0, 1], ['40vh', '100vh']);
  const borderRadius = useTransform(smoothProgress, [0, 1], ['24px', '0px']);
  const padding = useTransform(smoothProgress, [0, 1], ['8px', '0px']); // Animate padding of outer wrapper
  const innerRadius = useTransform(smoothProgress, [0, 1], ['16px', '0px']); // Animate inner border radius

  // Custom Cursor logic
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    if (isHovered) {
      window.addEventListener('mousemove', updateMousePosition);
    } else {
      window.removeEventListener('mousemove', updateMousePosition);
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isHovered, cursorX, cursorY]);

  return (
    <section ref={containerRef} className="relative h-[230vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ width, height, borderRadius, padding }}
          className="bg-surface-deep relative flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            style={{ borderRadius: innerRadius }}
            className="relative h-full w-full overflow-hidden bg-black"
          >
            {children || <AbstractDashboard />}
          </motion.div>

          {/* Subtle gradient overlay to enhance visual depth */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>

      {/* Custom Cursor Pill */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-xl"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clipRule="evenodd"
          />
        </svg>
        {cursorText}
      </motion.div>
    </section>
  );
}

function AbstractDashboard() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black p-4 select-none sm:p-8">
      {/* Ambient background glows with steel blue and dark tones */}
      <div className="bg-primary-dark/20 absolute -top-[10%] -left-[10%] h-[120%] w-[50%] rounded-full blur-[130px]" />
      <div className="bg-primary-darker/30 absolute -right-[10%] -bottom-[10%] h-[120%] w-[50%] rounded-full blur-[150px]" />
      <div className="bg-primary/10 absolute top-[30%] left-[25%] h-[60%] w-[40%] rounded-full blur-[110px]" />

      {/* Precision grid pattern matching the tech aesthetic */}
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

      {/* Abstract Dashboard Layout */}
      <div className="relative z-10 flex h-full w-full max-w-[1200px] flex-col rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4 shadow-2xl backdrop-blur-[8px] sm:p-6">
        {/* Sidebar & Main grid */}
        <div className="flex h-full w-full gap-6 overflow-hidden">
          {/* Sidebar */}
          <div className="hidden w-[220px] shrink-0 flex-col gap-5 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 md:flex">
            {/* Logo placeholder */}
            <div className="flex items-center gap-2">
              <div className="bg-primary h-5 w-5 rounded" />
              <div className="font-mono text-sm font-bold tracking-wider text-white">
                FIXED
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5" />

            {/* Navigation links */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded bg-white/5 px-2 py-1.5">
                <div className="bg-primary h-3 w-3 rounded-full" />
                <div className="font-mono text-xs text-white">Dashboard</div>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 opacity-55">
                <div className="h-3 w-3 rounded bg-white/10" />
                <div className="text-body font-mono text-xs">History</div>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 opacity-55">
                <div className="h-3 w-3 rounded bg-white/10" />
                <div className="text-body font-mono text-xs">Settings</div>
              </div>
            </div>

            <div className="text-muted mt-2 font-mono text-[10px] tracking-widest uppercase">
              Torneos
            </div>
            <div className="flex flex-col gap-2 opacity-75">
              <div className="flex items-center gap-2 px-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="text-body truncate font-mono text-[11px]">
                  Eliminatoria Sudam.
                </div>
              </div>
              <div className="flex items-center gap-2 px-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="text-body truncate font-mono text-[11px]">
                  UEFA Nations League
                </div>
              </div>
            </div>

            <div className="mt-auto rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
              <div className="text-primary-light font-mono text-[10px]">
                PRO ACTIVE
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex flex-1 flex-col gap-5 overflow-hidden">
            {/* Header bar */}
            <div className="flex h-12 w-full items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] px-4">
              <div className="flex flex-1 items-center gap-3">
                <div className="h-4 w-4 rounded-full bg-white/10" />
                <div className="text-muted font-mono text-[11px]">
                  Search your fixed...
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden h-2 w-16 rounded bg-white/5 sm:block" />
                <div className="bg-primary-darkest flex h-6 w-20 items-center justify-center rounded border border-white/10 font-mono text-[10px] text-white">
                  Beta Access
                </div>
              </div>
            </div>

            {/* Dashboard Title Section */}
            <div className="flex flex-col gap-1">
              <div className="font-mono text-lg font-bold tracking-wide text-white uppercase">
                Dashboard
              </div>
              <div className="text-muted font-mono text-[11px]">
                Apuestas Deportivas | Jueves 10/10/24
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="flex flex-col gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/20 text-primary-light rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold">
                    15:00 | 88%
                  </div>
                  <div className="text-primary-light font-mono text-[10px]">
                    1.32
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-white">
                  Bolivia vs Colombia
                </div>
                <div className="text-muted font-mono text-[10px] leading-tight">
                  Doble oportunidad: Empate o Bolivia
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/20 text-primary-light rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold">
                    18:00 | 92%
                  </div>
                  <div className="text-primary-light font-mono text-[10px]">
                    1.45
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-white">
                  Venezuela vs Argentina
                </div>
                <div className="text-muted font-mono text-[10px] leading-tight">
                  Doble oportunidad: Empate o Argentina
                </div>
              </div>

              {/* Card 3 (hidden on small/medium screens to prevent overflow, shown on large) */}
              <div className="hidden flex-col gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 lg:flex">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/20 text-primary-light rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold">
                    21:00 | 85%
                  </div>
                  <div className="text-primary-light font-mono text-[10px]">
                    1.28
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-white">
                  Chile vs Brasil
                </div>
                <div className="text-muted font-mono text-[10px] leading-tight">
                  Ganador directo: Brasil
                </div>
              </div>
            </div>

            {/* Bottom panel / Chart preview */}
            <div className="hidden flex-1 flex-col gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 sm:flex">
              <div className="text-muted font-mono text-[10px]">
                HISTORICAL SIMULATION (ROI)
              </div>
              {/* Mock chart lines using divs */}
              <div className="flex h-full items-end gap-1.5 pb-1">
                <div className="h-[25%] w-full rounded bg-white/5" />
                <div className="h-[35%] w-full rounded bg-white/5" />
                <div className="bg-primary/10 border-primary/20 h-[50%] w-full rounded border-t" />
                <div className="h-[40%] w-full rounded bg-white/5" />
                <div className="bg-primary/20 border-primary/40 h-[65%] w-full rounded border-t" />
                <div className="bg-primary-light/20 border-primary-light/45 h-[80%] w-full rounded border-t" />
                <div className="h-[55%] w-full rounded bg-white/5" />
                <div className="bg-primary/35 border-primary/60 h-[95%] w-full rounded border-t" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radial overlay to dim corners and highlight center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}
