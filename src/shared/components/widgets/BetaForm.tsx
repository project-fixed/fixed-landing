'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from '@/data/translations';
import { useWaitlistModal } from '@/shared/components/layout/WaitlistModalContext';
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BetaFormProps {
  lang: 'en' | 'es';
  idSuffix?: string;
  autoFocus?: boolean;
  onFocusChange?: (focused: boolean) => void;
  onEmailChange?: (email: string) => void;
}

// Custom hook to animate a numeric count from 0 to target value
function useAnimatedCounter(targetValue: number, duration: number = 1500) {
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

function Confetti() {
  const colors = [
    '#3e5d6c',
    '#60a5fa',
    '#34d399',
    '#fbbf24',
    '#f87171',
    '#c084fc',
  ];
  const particles = React.useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 160;
      arr.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance + 30 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        delay: Math.random() * 0.1,
        angle: Math.random() * 360,
      });
    }
    return arr;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-visible">
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
            y: p.y,
            opacity: [0, 1, 1, 0],
            rotate: p.angle + 720,
            scale: [0, 1.2, 1, 0.2],
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

interface CounterProps {
  value: number;
  lang: 'en' | 'es';
}

function WaitlistCounter({ value, lang }: CounterProps) {
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
  const { successState, setSuccessState, closeModal } = useWaitlistModal();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const isRegistered = successState?.isRegistered ?? false;
  const isDuplicate = successState?.isDuplicate ?? false;
  const isLocal = successState?.isLocal ?? false;
  const registeredUserNumber = successState?.registeredUserNumber ?? null;
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
          ...utmParams,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('idle');
        setSuccessState({
          isRegistered: true,
          isDuplicate: false,
          isLocal: !!data.isLocalFallback,
          registeredUserNumber: data.userNumber || 100,
        });
        setEmail('');
        onEmailChange?.('');
        if (idSuffix === 'global-modal') {
          closeModal();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        if (response.status === 409 && data.userNumber) {
          setStatus('idle');
          setSuccessState({
            isRegistered: true,
            isDuplicate: true,
            isLocal: !!data.isLocalFallback,
            registeredUserNumber: data.userNumber,
          });
          setEmail('');
          onEmailChange?.('');
          if (idSuffix === 'global-modal') {
            closeModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          setStatus('error');
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
      setMessage(t.landing.home.hero.betaErrorGeneric);
    }
  };

  return (
    <div className="relative z-20 flex w-full max-w-md flex-col items-center">
      {/* The form container is always rendered and interactive */}
      <div
        id={idSuffix ? `beta-form-container-${idSuffix}` : undefined}
        className="flex w-full flex-col gap-3"
      >
        <form
          onSubmit={handleSubmit}
          className="focus-within:border-primary/50 focus-within:shadow-primary/20 bg-surface-deep/80 relative flex w-full items-center gap-2 rounded-full border border-white/10 p-2 pl-4 shadow-2xl backdrop-blur-md transition-all duration-300 focus-within:scale-[1.02] hover:scale-[1.02] hover:border-white/20 active:scale-[0.99]"
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
            className="placeholder:text-faint min-w-0 flex-1 truncate bg-transparent py-2 pr-2 font-mono text-xs text-white outline-none disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 active:scale-95 disabled:opacity-40"
            aria-label="Submit"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </form>

        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="text-destructive flex items-start gap-2 px-4 text-left text-xs"
            >
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Success/Duplicate Overlay Card */}
      <AnimatePresence>
        {isRegistered && (
          <motion.div
            key="success-overlay"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="border-primary/30 bg-surface-deep/98 absolute inset-x-0 bottom-full z-30 mb-4 flex w-full flex-col items-center justify-center overflow-visible rounded-2xl border p-5 text-center shadow-[0_15px_50px_rgba(0,0,0,0.8)] backdrop-blur-lg"
          >
            {!isDuplicate && <Confetti />}

            {/* Close Button in top right */}
            <button
              type="button"
              onClick={() => {
                setSuccessState(null);
              }}
              className="absolute top-3.5 right-3.5 z-10 cursor-pointer text-white/40 transition-colors hover:scale-110 hover:text-white active:scale-95"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="bg-primary/10 text-primary relative mb-3 flex h-10 w-10 items-center justify-center rounded-full">
              <CheckCircle2 className="text-primary h-5 w-5 drop-shadow-[0_0_8px_rgba(62,93,108,0.5)]" />
            </div>

            <h3 className="relative z-10 mb-1 font-mono text-base font-bold tracking-wide text-white uppercase">
              {isDuplicate
                ? lang === 'es'
                  ? '¡Ya estás registrado!'
                  : 'Already Registered!'
                : lang === 'es'
                  ? '¡Registro Completado!'
                  : 'Registration Complete!'}
            </h3>

            <p className="text-body relative z-10 mb-2 max-w-[280px] text-xs leading-relaxed">
              {isDuplicate
                ? lang === 'es'
                  ? 'Este correo ya se encuentra registrado en nuestra lista de espera.'
                  : 'This email is already registered on our waitlist.'
                : t.landing.home.hero.betaSuccess}
            </p>

            {registeredUserNumber !== null && (
              <WaitlistCounter value={registeredUserNumber} lang={lang} />
            )}

            {isLocal && (
              <span className="relative z-10 mt-1 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 font-mono text-[9px] text-yellow-400">
                {lang === 'es'
                  ? '🛠️ Modo Local: Guardado en scratch/beta_subscribers.json'
                  : '🛠️ Local Mode: Saved to scratch/beta_subscribers.json'}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
