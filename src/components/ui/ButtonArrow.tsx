'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonArrowProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const ButtonArrow: React.FC<ButtonArrowProps> = ({
  children,
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
}) => {
  const isExternal = href?.startsWith('http') || href?.startsWith('//');

  const commonClass = cn(
    'group relative inline-flex h-[42px] items-center justify-start overflow-hidden rounded-full border border-white/8 bg-white/2 py-1 pr-6 pl-1.5 text-sm font-bold tracking-wider text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(62,93,108,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
    className,
  );

  const innerContent = (
    <>
      {/* Expanding background pill */}
      <span className="bg-primary absolute top-[5px] bottom-[5px] left-[5px] z-0 w-8 rounded-full transition-all duration-300 ease-out group-hover:w-[calc(100%-10px)]" />

      {/* Wrapper */}
      <span className="relative z-10 flex w-full items-center justify-start">
        {/* Arrow Circle */}
        <span className="flex h-8 w-8 items-center justify-center rounded-full">
          <span className="relative flex h-[2px] w-2.5 items-center justify-end bg-white transition-transform duration-300 group-hover:translate-x-1">
            <span className="absolute right-0 h-[6px] w-[6px] rotate-45 border-t-2 border-r-2 border-white" />
          </span>
        </span>
        {/* Text */}
        <span className="font-display text-text-body pl-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
          {children}
        </span>
      </span>
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
