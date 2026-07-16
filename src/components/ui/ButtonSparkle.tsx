'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonSparkleProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
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
    'group relative inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary px-8 py-3 font-sans text-base font-bold tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_25px_rgba(62,93,108,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
    className,
  );

  const innerContent = <span className="relative z-10">{children}</span>;

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
