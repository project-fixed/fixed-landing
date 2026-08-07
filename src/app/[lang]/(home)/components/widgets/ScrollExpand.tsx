'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ScrollExpandProps {
  children?: React.ReactNode;
}

export function ScrollExpand({ children }: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this container as it enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Animation starts when the top of the container hits the bottom of the viewport,
    // and finishes when the top of the container reaches the center of the viewport.
    offset: ['start end', 'center center'],
  });

  // Smooth the scroll progress to avoid jitter
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 120,
    mass: 0.5,
  });

  // Transform width based on scroll progress (reaches 100% quickly)
  const width = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    ['min(50vw, 600px)', '100%', '100%'],
  );

  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    ['24px', '0px', '0px'],
  );
  const padding = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    ['8px', '0px', '0px'],
  );
  const innerRadius = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    ['16px', '0px', '0px'],
  );

  return (
    <div
      ref={containerRef}
      className="relative flex h-fit w-full justify-center"
    >
      <motion.div
        style={{ width, borderRadius, padding }}
        className="bg-surface-deep relative flex h-fit items-center justify-center overflow-hidden border border-white/15 shadow-2xl"
      >
        <motion.div
          style={{ borderRadius: innerRadius }}
          className="relative h-fit w-full overflow-hidden bg-black"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
