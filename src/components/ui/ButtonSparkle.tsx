'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonSparkleProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const ButtonSparkle: React.FC<ButtonSparkleProps> = ({
  children,
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
}) => {
  const isExternal = href?.startsWith('http') || href?.startsWith('//');

  const commonClass = cn(
    'group relative inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary px-8 py-3 font-display text-base font-bold tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_25px_rgba(62,93,108,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
    className
  );

  const starSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      version="1.1"
      viewBox="0 0 784.11 815.53"
      className="h-full w-full fill-current"
    >
      <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
    </svg>
  );

  const innerContent = (
    <>
      <span className="relative z-10">{children}</span>

      {/* Sparkles / Stars */}
      <div className="absolute top-[20%] left-[20%] z-[-1] h-6 w-auto text-sparkle-1 opacity-0 filter drop-shadow-[0_0_0_#fffdef] transition-all duration-1000 cubic-bezier-[0.05,0.83,0.43,0.96] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:z-10 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_var(--color-sparkle-1)]">
        {starSvg}
      </div>
      
      <div className="absolute top-[45%] left-[45%] z-[-1] h-3.5 w-auto text-sparkle-2 opacity-0 filter drop-shadow-[0_0_0_#fffdef] transition-all duration-1000 cubic-bezier-[0,0.4,0,1.01] group-hover:top-[-25%] group-hover:left-[10%] group-hover:z-10 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_var(--color-sparkle-2)]">
        {starSvg}
      </div>

      <div className="absolute top-[40%] left-[40%] z-[-1] h-1.5 w-auto text-sparkle-3 opacity-0 filter drop-shadow-[0_0_0_#fffdef] transition-all duration-1000 cubic-bezier-[0,0.4,0,1.01] group-hover:top-[55%] group-hover:left-[25%] group-hover:z-10 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_var(--color-sparkle-3)]">
        {starSvg}
      </div>

      <div className="absolute top-[20%] left-[40%] z-[-1] h-2 w-auto text-sparkle-4 opacity-0 filter drop-shadow-[0_0_0_#fffdef] transition-all duration-[800ms] cubic-bezier-[0,0.4,0,1.01] group-hover:top-[30%] group-hover:left-[80%] group-hover:z-10 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_var(--color-sparkle-4)]">
        {starSvg}
      </div>

      <div className="absolute top-[25%] left-[45%] z-[-1] h-3.5 w-auto text-sparkle-5 opacity-0 filter drop-shadow-[0_0_0_#fffdef] transition-all duration-[600ms] cubic-bezier-[0,0.4,0,1.01] group-hover:top-[25%] group-hover:left-[115%] group-hover:z-10 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_var(--color-sparkle-5)]">
        {starSvg}
      </div>

      <div className="absolute top-[5%] left-[50%] z-[-1] h-1.5 w-auto text-sparkle-5 opacity-0 filter drop-shadow-[0_0_0_#fffdef] transition-all duration-[800ms] ease-out group-hover:top-[5%] group-hover:left-[60%] group-hover:z-10 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_var(--color-sparkle-5)]">
        {starSvg}
      </div>
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={commonClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={commonClass}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={commonClass}
    >
      {innerContent}
    </button>
  );
};
