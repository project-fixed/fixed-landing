'use client';

import React, { useEffect, useRef } from 'react';

interface TurnstileProps {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'flexible' | 'compact';
  appearance?: 'always' | 'execute' | 'interaction-only';
}

interface WindowWithTurnstile extends Window {
  turnstile?: {
    render: (
      container: string | HTMLElement,
      options: TurnstileOptions,
    ) => string;
    remove: (widgetId: string) => void;
  };
}

export const Turnstile: React.FC<TurnstileProps> = ({
  siteKey,
  onSuccess,
  onError,
  onExpire,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const callbackName = `onloadTurnstileCallback_${siteKey.replace(/[^a-zA-Z0-9]/g, '')}`;
    const win = window as unknown as WindowWithTurnstile;
    const winRecord = window as unknown as Record<string, unknown>;

    // 1. Ensure global callback is registered
    if (typeof window !== 'undefined') {
      winRecord[callbackName] = () => {
        if (containerRef.current && win.turnstile) {
          try {
            // Avoid double rendering
            if (widgetIdRef.current !== null) return;
            const widgetId = win.turnstile.render(containerRef.current, {
              sitekey: siteKey,
              callback: onSuccess,
              'error-callback': onError,
              'expired-callback': onExpire,
              theme: 'dark',
              size: 'normal',
              appearance: 'interaction-only',
            });
            widgetIdRef.current = widgetId;
          } catch (err) {
            console.error('[Turnstile] Render error:', err);
          }
        }
      };
    }

    // 2. Load script if not already present
    const existingScript = document.getElementById('cf-turnstile-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=${callbackName}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if (
      win.turnstile &&
      containerRef.current &&
      widgetIdRef.current === null
    ) {
      // Script already loaded, render immediately
      try {
        const widgetId = win.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onSuccess,
          'error-callback': onError,
          'expired-callback': onExpire,
          theme: 'dark',
          size: 'normal',
          appearance: 'interaction-only',
        });
        widgetIdRef.current = widgetId;
      } catch (err) {
        console.error('[Turnstile] Direct render error:', err);
      }
    }

    return () => {
      // Clean up the widget on unmount
      if (widgetIdRef.current !== null && win.turnstile) {
        try {
          win.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (err) {
          console.error('[Turnstile] Cleanup error:', err);
        }
      }
      if (typeof window !== 'undefined') {
        delete winRecord[callbackName];
      }
    };
  }, [siteKey, onSuccess, onError, onExpire]);

  return (
    <div
      ref={containerRef}
      className="cf-turnstile flex items-center justify-center"
    />
  );
};
