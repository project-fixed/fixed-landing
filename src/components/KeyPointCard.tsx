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
      className={`from-primary-dark/90 via-primary-darker/90 to-primary-darkest/90 hover:border-primary/50 hover:shadow-primary/20 flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br p-8 shadow-2xl backdrop-blur-md transition-all ${className}`}
      style={style}
    >
      <div className="text-primary-light flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-5xl font-black tracking-tighter text-white">
          {title}
        </span>
        <p className="text-text-body text-sm leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};
