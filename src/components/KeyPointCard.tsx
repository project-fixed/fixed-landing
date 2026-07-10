import React from 'react';

export interface Props {
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const KeyPointCard: React.FC<Props> = ({
  title,
  description,
  className = '',
  style,
  icon,
}) => {
  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-primary-dark/90 via-primary-darker/90 to-primary-darkest/90 p-8 shadow-2xl backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-primary/20 ${className}`}
      style={style}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary-light">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-5xl font-black tracking-tighter text-white">
          {title}
        </span>
        <p className="text-sm leading-relaxed font-medium text-zinc-300">
          {description}
        </p>
      </div>
    </div>
  );
};
