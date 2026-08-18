interface WindowWithGtag extends Window {
  gtag?: (
    type: 'event',
    eventName: string,
    eventParams?: Record<string, unknown>,
  ) => void;
}

/**
 * Safe wrapper for Google Analytics gtag events.
 * Only runs on the client-side when window.gtag is available.
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
) => {
  if (typeof window !== 'undefined') {
    const win = window as unknown as WindowWithGtag;
    if (win.gtag) {
      try {
        win.gtag('event', eventName, params);
      } catch (error) {
        console.error('[Analytics] Error tracking event:', error);
      }
    }
  }
};
