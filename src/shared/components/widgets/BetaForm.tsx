'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from '@/data/translations';
import { useWaitlistModal } from '@/shared/components/layout/WaitlistModalContext';
import { Loader2, AlertCircle, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Turnstile } from './Turnstile';
import { trackEvent } from '@/lib/analytics';

interface BetaFormProps {
  lang: 'en' | 'es';
  idSuffix?: string;
  autoFocus?: boolean;
  onFocusChange?: (focused: boolean) => void;
  onEmailChange?: (email: string) => void;
}

// Custom hook to animate a numeric count from 0 to target value
export function useAnimatedCounter(
  targetValue: number,
  duration: number = 1500,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = targetValue;
    if (start === end) return;

    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime >= duration) {
        setCount(end);
        return;
      }

      const progress = elapsedTime / duration;
      // Quadratic ease-out formula
      const easeOutQuad = progress * (2 - progress);
      const currentValue = Math.floor(easeOutQuad * (end - start) + start);

      setCount(currentValue);
      requestAnimationFrame(updateCounter);
    };

    requestAnimationFrame(updateCounter);
  }, [targetValue, duration]);

  return count;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  angle: number;
}

export function Confetti() {
  const [mounted, setMounted] = useState(false);
  const colors = [
    '#3e5d6c',
    '#60a5fa',
    '#34d399',
    '#fbbf24',
    '#f87171',
    '#c084fc',
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = React.useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 130; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 330;
      arr.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance + 30 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 7,
        delay: Math.random() * 0.15,
        angle: Math.random() * 360,
      });
    }
    return arr;
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 left-1/2 rounded-xs"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            x: 0,
            y: 0,
          }}
          animate={{
            x: p.x,
            y: [0, p.y * 0.7, p.y + 150], // gravity parabolic movement
            opacity: [0, 1, 1, 0],
            rotate: p.angle + 720,
            scale: [0, 1.2, 1, 0.2],
          }}
          transition={{
            duration: 1.5 + Math.random() * 0.8,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>,
    document.body,
  );
}

interface CounterProps {
  value: number;
  lang: 'en' | 'es';
}

export function WaitlistCounter({ value, lang }: CounterProps) {
  const animatedValue = useAnimatedCounter(value, 2000);
  return (
    <div className="relative z-10 my-3 flex w-full flex-col items-center justify-center border-t border-b border-white/5 py-3">
      <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
        {lang === 'es' ? 'Tu lugar en la lista' : 'Your spot on the waitlist'}
      </span>
      <span className="mt-1.5 bg-linear-to-r from-white via-blue-400 to-[#3e5d6c] bg-clip-text font-mono text-4xl font-extrabold tracking-tight text-transparent text-white">
        #{animatedValue.toLocaleString()}
      </span>
    </div>
  );
}

export const BetaForm: React.FC<BetaFormProps> = ({
  lang,
  idSuffix = '',
  autoFocus,
  onFocusChange,
  onEmailChange,
}) => {
  const t = useTranslations(lang);
  const { setSuccessState, closeModal } = useWaitlistModal();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-dismiss local error state after 5 seconds
  useEffect(() => {
    if (status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setUtmParams({
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
      });

      // Handle focus=beta query parameter on mount
      if (searchParams.get('focus') === 'beta') {
        const isMobileWidth = window.innerWidth < 1024;
        const currentSuffix = isMobileWidth ? 'mobile' : 'desktop';
        if (idSuffix === currentSuffix) {
          const formContainer = document.getElementById(
            `beta-form-container-${idSuffix}`,
          );
          if (formContainer) {
            setTimeout(() => {
              formContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
              setTimeout(() => {
                const input = document.getElementById(
                  `beta-email-input-${idSuffix}`,
                );
                if (input) input.focus();
              }, 500);
            }, 150);
          }
        }
      }
    }
  }, [idSuffix]);

  const validateEmail = (emailStr: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(emailStr.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus('error');
      setMessage(t.landing.home.hero.betaErrorInvalid);
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus('error');
      setMessage(t.landing.home.hero.betaErrorInvalid);
      return;
    }

    try {
      const response = await fetch('/api/beta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          lang,
          turnstileToken,
          ...utmParams,
        }),
      });

      const data = await response.json();
      const domain = trimmedEmail.split('@')[1] || '';

      if (response.ok) {
        setStatus('idle');
        trackEvent('generate_lead', {
          email_domain: domain,
          status: 'success',
          source: idSuffix || 'unknown',
        });
        setSuccessState({
          isRegistered: true,
          isDuplicate: false,
          isLocal: !!data.isLocalFallback,
          registeredUserNumber: data.userNumber || 100,
        });
        setEmail('');
        setTurnstileToken('');
        onEmailChange?.('');
        if (idSuffix === 'global-modal') {
          closeModal();
        }
      } else {
        if (response.status === 409 && data.userNumber) {
          setStatus('idle');
          trackEvent('generate_lead_duplicate', {
            status: 'duplicate',
            source: idSuffix || 'unknown',
          });
          setSuccessState({
            isRegistered: true,
            isDuplicate: true,
            isLocal: !!data.isLocalFallback,
            registeredUserNumber: data.userNumber,
          });
          setEmail('');
          setTurnstileToken('');
          onEmailChange?.('');
          if (idSuffix === 'global-modal') {
            closeModal();
          }
        } else {
          setStatus('error');
          trackEvent('generate_lead_error', {
            status: 'error',
            error_message: data.message || 'unknown',
            source: idSuffix || 'unknown',
          });
          if (response.status === 409) {
            setMessage(t.landing.home.hero.betaErrorDuplicate);
          } else if (response.status === 400) {
            setMessage(t.landing.home.hero.betaErrorInvalid);
          } else {
            setMessage(data.message || t.landing.home.hero.betaErrorGeneric);
          }
        }
      }
    } catch {
      setStatus('error');
      trackEvent('generate_lead_error', {
        status: 'error',
        error_message: 'network_error',
        source: idSuffix || 'unknown',
      });
      setMessage(t.landing.home.hero.betaErrorGeneric);
    }
  };

  return (
    <div className="relative z-20 flex w-full max-w-md flex-col items-center">
      {/* The form container is always rendered and interactive */}
      <div
        id={idSuffix ? `beta-form-container-${idSuffix}` : undefined}
        className="flex w-full flex-col"
      >
        <form
          onSubmit={handleSubmit}
          className="focus-within:border-primary/50 focus-within:shadow-primary/20 bg-surface-deep/80 hover:border-primary-dark/60 relative flex w-full items-center gap-2 rounded-full border border-white/10 p-2 pl-4 shadow-2xl backdrop-blur-md transition-all duration-300 focus-within:scale-[1.02] hover:scale-[1.02] active:scale-[0.99]"
        >
          <input
            id={idSuffix ? `beta-email-input-${idSuffix}` : undefined}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              onEmailChange?.(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            onFocus={() => onFocusChange?.(true)}
            onBlur={() => onFocusChange?.(false)}
            autoFocus={autoFocus}
            disabled={status === 'loading'}
            placeholder={t.landing.home.hero.betaPlaceholder}
            className="min-w-0 flex-1 truncate bg-transparent py-2 pr-2 font-mono text-xs text-white outline-none placeholder:text-white/30 disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={
              status === 'loading' ||
              !validateEmail(email) ||
              (!!siteKey && !turnstileToken)
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
            aria-label="Submit"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </form>

        {mounted && siteKey && (
          <div className="mt-1 flex justify-center">
            <Turnstile
              siteKey={siteKey}
              onSuccess={setTurnstileToken}
              onError={() => setTurnstileToken('')}
              onExpire={() => setTurnstileToken('')}
            />
          </div>
        )}

        <AnimatePresence />
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-glass-card fixed right-6 bottom-6 left-6 z-[120] flex items-center justify-between gap-3 rounded-xl border border-red-500/20 p-4 backdrop-blur-xl md:left-auto md:max-w-md"
              >
                <div className="flex items-center gap-2.5 text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p className="text-body font-sans text-xs leading-relaxed">
                    {message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="cursor-pointer text-white/40 transition-colors hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
