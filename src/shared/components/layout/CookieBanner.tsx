'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, type Lang } from '@/data/translations';

interface Props {
  lang: Lang;
}

export const CookieBanner: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const localConsent = localStorage.getItem('google-analytics-consent');
    const sessionConsent = sessionStorage.getItem('google-analytics-consent');
    if (!localConsent && !sessionConsent) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const target = document.querySelector('.cookie-banner-blur-target');
    if (visible) {
      document.body.classList.add('cookie-banner-active');
      target?.setAttribute('inert', '');
    } else {
      document.body.classList.remove('cookie-banner-active');
      target?.removeAttribute('inert');
    }

    return () => {
      document.body.classList.remove('cookie-banner-active');
      target?.removeAttribute('inert');
    };
  }, [visible]);

  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener('open-cookie-banner', handleOpen);

    return () => {
      window.removeEventListener('open-cookie-banner', handleOpen);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem('google-analytics-consent', 'accepted');
    window.dispatchEvent(
      new CustomEvent('ga-consent-change', { detail: 'accepted' }),
    );
    setVisible(false);
  };

  const handleReject = () => {
    sessionStorage.setItem('google-analytics-consent', 'rejected');
    window.dispatchEvent(
      new CustomEvent('ga-consent-change', { detail: 'rejected' }),
    );
    setVisible(false);
  };

  if (!mounted) return null;

  const cookiesPath = lang === 'en' ? '/cookies' : '/es/cookies';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-glass-card fixed bottom-0 left-0 z-[100] flex flex-col gap-4 rounded-t-2xl border border-white/10 p-5 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:left-auto sm:max-w-md sm:rounded-xl"
        >
          <div className="flex flex-col gap-1">
            <p className="text-body font-sans text-xs leading-relaxed">
              {t.cookieBanner.text}{' '}
              <Link
                href={cookiesPath}
                className="text-primary-light underline transition-colors duration-200 hover:text-white"
              >
                {t.cookieBanner.privacyPolicy}
              </Link>
            </p>
          </div>
          <div className="flex gap-3 font-mono text-[10px] font-bold tracking-wider uppercase">
            <button
              onClick={handleReject}
              className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-white transition-all duration-200 hover:border-white/20 hover:bg-white/5"
            >
              {t.cookieBanner.reject}
            </button>
            <button
              onClick={handleAccept}
              className="bg-primary hover:bg-primary/65 flex-1 rounded-lg px-4 py-2.5 text-white transition-all duration-200"
            >
              {t.cookieBanner.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
