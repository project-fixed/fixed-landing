import React from 'react';

const images = [
  { delay: -5, src: '/images/bet_won_widget.png', alt: 'Bet Won Widget' },
  {
    delay: -4,
    src: '/images/growth_chart_widget.png',
    alt: 'Growth Chart Widget',
  },
  {
    delay: -3,
    src: '/images/ai_prediction_widget.png',
    alt: 'AI Prediction Widget',
  },
  { delay: -2, src: '/images/bet_won_widget.png', alt: 'Bet Won Widget' },
  {
    delay: -1,
    src: '/images/growth_chart_widget.png',
    alt: 'Growth Chart Widget',
  },
  {
    delay: 0,
    src: '/images/ai_prediction_widget.png',
    alt: 'AI Prediction Widget',
  },
];

export const HeroImagesCascade: React.FC = () => {
  return (
    <div className="relative flex h-[450px] w-[450px] items-center justify-center max-md:h-[350px] max-md:w-[350px]">
      {/* Rotative Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className="animate-point-card pointer-events-none absolute z-10 w-[300px] opacity-0 max-[425px]:w-[240px] max-[375px]:w-[200px] lg:w-[280px]"
          style={{ '--delay': image.delay } as React.CSSProperties}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="bg-surface-deep/40 w-full rounded-2xl border border-white/5 object-contain drop-shadow-2xl backdrop-blur-md"
          />
        </div>
      ))}

      {/* Glowing Background Circle */}
      <div className="bg-primary/5 pointer-events-none absolute z-0 h-[400px] w-[400px] rounded-full blur-[120px] max-md:h-[250px] max-md:w-[250px]"></div>
    </div>
  );
};
