'use client';

import { useEffect, useState } from 'react';
import { FixedLoader } from '@/shared/components/ui/FixedLoader';
import SplashContext from './SplashContext';

interface SplashLoaderProps {
  children: React.ReactNode;
  duration?: number;
}

const FADE_MS = 500;

export const SplashLoader: React.FC<SplashLoaderProps> = ({
  children,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
        setSplashDone(true);
      }, FADE_MS);
      return () => clearTimeout(removeTimer);
    }, duration);
    return () => clearTimeout(hideTimer);
  }, [duration]);

  return (
    <SplashContext.Provider value={splashDone}>
      {visible && (
        <div
          aria-hidden={fading}
          className={`bg-canvas fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <FixedLoader size={96} />
        </div>
      )}
      {children}
    </SplashContext.Provider>
  );
};
