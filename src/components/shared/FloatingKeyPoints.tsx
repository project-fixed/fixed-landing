'use client';

import React, { useEffect, useRef } from 'react';

export const FloatingKeyPoints: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const backgroundElements = [
    {
      variant: 'filled',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      classes:
        'top-[25%] left-[6%] w-16 h-16 opacity-60 animate-[float_8s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6" rx="1"></rect><path d="M9 1v3"></path><path d="M15 1v3"></path><path d="M9 20v3"></path><path d="M15 20v3"></path><path d="M20 9h3"></path><path d="M20 15h3"></path><path d="M1 9h3"></path><path d="M1 15h3"></path></svg>`,
      classes:
        'top-[28%] right-[8%] w-16 h-16 opacity-70 animate-[float_12s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'filled',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
      classes:
        'bottom-[32%] left-[16%] w-16 h-16 opacity-80 animate-[float_10s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      classes:
        'bottom-[22%] right-[18%] w-16 h-16 opacity-50 blur-[1px] animate-[float_9s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'filled',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
      classes:
        'top-[48%] left-[4%] w-16 h-16 opacity-40 animate-[float_14s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="m13 2-2 10h9L9 22l2-10H3L13 2z"></path></svg>`,
      classes:
        'top-[58%] right-[4%] w-16 h-16 opacity-60 animate-[float_11s_ease-in-out_infinite_reverse]',
    },

    // Filled empty squares
    {
      variant: 'filled',
      classes:
        'top-[8%] left-[28%] w-10 h-10 opacity-15 blur-[2px] animate-[float_15s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      classes:
        'top-[15%] right-[32%] w-12 h-12 opacity-8 blur-[3px] animate-[float_18s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'filled',
      classes:
        'bottom-[18%] left-[38%] w-16 h-16 opacity-12 blur-[1px] animate-[float_20s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      classes:
        'top-[42%] right-[12%] w-14 h-14 opacity-20 blur-[2px] animate-[float_16s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      classes:
        'bottom-[42%] left-[10%] w-10 h-10 opacity-15 blur-[2px] animate-[float_13s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'filled',
      classes:
        'bottom-[12%] right-[28%] w-12 h-12 opacity-8 blur-[3px] animate-[float_19s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      classes:
        'top-[72%] left-[22%] w-14 h-14 opacity-12 blur-[1px] animate-[float_17s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'filled',
      classes:
        'top-[22%] left-[45%] w-8 h-8 opacity-15 blur-[2px] animate-[float_12s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      classes:
        'top-[82%] right-[22%] w-10 h-10 opacity-12 blur-[2px] animate-[float_14s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      classes:
        'bottom-[8%] left-[12%] w-8 h-8 opacity-20 blur-[1px] animate-[float_11s_ease-in-out_infinite]',
    },
    {
      variant: 'filled',
      classes:
        'top-[58%] left-[32%] w-16 h-16 opacity-8 blur-[4px] animate-[float_22s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'filled',
      classes:
        'bottom-[28%] right-[40%] w-14 h-14 opacity-12 blur-[2px] animate-[float_15s_ease-in-out_infinite]',
    },

    // Hollow empty squares
    {
      variant: 'hollow',
      classes:
        'top-[6%] right-[8%] w-12 h-12 opacity-25 animate-[float_16s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'hollow',
      classes:
        'top-[38%] right-[26%] w-8 h-8 opacity-35 animate-[float_9s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'hollow',
      classes:
        'top-[14%] left-[12%] w-14 h-14 opacity-20 animate-[float_14s_ease-in-out_infinite]',
    },
    {
      variant: 'hollow',
      classes:
        'top-[52%] left-[16%] w-10 h-10 opacity-30 animate-[float_11s_ease-in-out_infinite]',
    },
    {
      variant: 'hollow',
      classes:
        'bottom-[38%] right-[10%] w-16 h-16 opacity-15 animate-[float_17s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'hollow',
      classes:
        'bottom-[10%] right-[8%] w-12 h-12 opacity-25 animate-[float_13s_ease-in-out_infinite]',
    },
    {
      variant: 'hollow',
      classes:
        'top-[32%] left-[24%] w-8 h-8 opacity-35 animate-[float_10s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'hollow',
      classes:
        'bottom-[52%] right-[32%] w-10 h-10 opacity-20 animate-[float_15s_ease-in-out_infinite]',
    },
    {
      variant: 'hollow',
      classes:
        'top-[68%] left-[42%] w-12 h-12 opacity-30 animate-[float_12s_ease-in-out_infinite_reverse]',
    },
    {
      variant: 'hollow',
      classes:
        'bottom-[22%] left-[26%] w-14 h-14 opacity-15 animate-[float_19s_ease-in-out_infinite]',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(
      '.floating-el',
    ) as NodeListOf<HTMLElement>;

    // Assign speed dataset values
    elements.forEach((el, index) => {
      const speed = (0.01 + (index % 5) * 0.012).toString();
      el.dataset.speed = speed;
    });

    let rafId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateAnimation);
      }
    };

    const updateAnimation = () => {
      // Lerp
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      const rect = container.getBoundingClientRect();
      const relativeX = currentX - rect.left;
      const relativeY = currentY - rect.top;

      container.style.setProperty('--mouse-x', `${relativeX}px`);
      container.style.setProperty('--mouse-y', `${relativeY}px`);

      const moveX = currentX - window.innerWidth / 2;
      const moveY = currentY - window.innerHeight / 2;

      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0');
        el.style.translate = `${-moveX * speed}px ${-moveY * speed}px`;
      });

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        rafId = requestAnimationFrame(updateAnimation);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="floating-container"
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block"
    >
      {/* Interactive Cursor Glow */}
      <div
        className="absolute inset-0 z-0 opacity-50 mix-blend-screen"
        style={{
          background:
            'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 40%)',
        }}
      ></div>

      {backgroundElements.map((el, idx) => (
        <div
          key={idx}
          className={`floating-el text-primary-light absolute flex items-center justify-center rounded-2xl transition-all duration-300 ease-out ${
            el.classes
          } ${
            el.variant === 'hollow'
              ? 'border border-white/20 bg-transparent'
              : 'bg-primary-darker/30 border border-white/10 shadow-2xl backdrop-blur-md'
          }`}
        >
          {el.icon && <div dangerouslySetInnerHTML={{ __html: el.icon }} />}
        </div>
      ))}
    </div>
  );
};
