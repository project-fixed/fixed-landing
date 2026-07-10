'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ScrollExpandVideoProps {
  children: React.ReactNode;
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
    offset: ['start end', 'end end'],
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
    <section ref={containerRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ width, height, borderRadius, padding }}
          className="relative flex items-center justify-center overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            style={{ borderRadius: innerRadius }}
            className="relative h-full w-full overflow-hidden bg-black"
          >
            {children}
          </motion.div>

          {/* Subtle gradient overlay to enhance visual depth */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
