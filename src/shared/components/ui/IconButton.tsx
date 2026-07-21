import React, { forwardRef } from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      active = false,
      size = 'md',
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'size-8 text-xs',
      md: 'size-10 text-sm',
      lg: 'size-12 text-base',
    }[size];

    return (
      <button
        ref={ref}
        type={type}
        className={`relative flex items-center justify-center rounded-full border transition-all duration-300 active:scale-95 ${sizeClasses} ${
          active
            ? 'border-white/20 bg-white/10 text-white backdrop-blur-md'
            : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
