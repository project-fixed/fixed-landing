'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

interface ScreenParticle {
  id: number;
  left: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
  sway: number[];
}

export function ScreenConfetti() {
  const [mounted, setMounted] = useState(false);
  const colors = [
    '#3e5d6c',
    '#60a5fa',
    '#34d399',
    '#fbbf24',
    '#f87171',
    '#c084fc',
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = React.useMemo(() => {
    const arr: ScreenParticle[] = [];
    for (let i = 0; i < 70; i++) {
      const left = `${Math.random() * 100}%`;
      const size = 5 + Math.random() * 8;
      const delay = Math.random() * 1.5;
      const duration = 3.0 + Math.random() * 2.0;
      const swayAmount = 20 + Math.random() * 30;
      const sway = [0, -swayAmount, swayAmount, -swayAmount / 2, 0];

      arr.push({
        id: i,
        left,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay,
        duration,
        sway,
      });
    }
    return arr;
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed rounded-xs"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            y: '-5vh',
          }}
          animate={{
            y: '105vh',
            x: p.sway,
            rotate: [0, 360, 720],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
