'use client';

import React, { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

interface Props {
  gaId: string;
}

export const GoogleAnalyticsWrapper: React.FC<Props> = ({ gaId }) => {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('google-analytics-consent');
    if (consent === 'accepted') {
      setHasConsent(true);
    }
  }, []);

  useEffect(() => {
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail === 'accepted') {
        setHasConsent(true);
      } else {
        setHasConsent(false);
      }
    };
    window.addEventListener('ga-consent-change', handleConsentChange);
    return () => {
      window.removeEventListener('ga-consent-change', handleConsentChange);
    };
  }, []);

  if (!mounted || !hasConsent) return null;

  return <GoogleAnalytics gaId={gaId} />;
};
