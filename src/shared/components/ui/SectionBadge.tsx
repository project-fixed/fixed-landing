import React from 'react';

interface SectionBadgeProps {
  label: string;
  prefix?: string;
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  label,
  prefix = '// ',
  className = '',
}) => {
  return (
    <span
      className={`text-text-faint inline-block font-mono text-xs tracking-widest uppercase ${className}`}
    >
      {prefix}
      {label}
    </span>
  );
};
