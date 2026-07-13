'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/data/translations';
import { ButtonSparkle } from '@/components/ui/ButtonSparkle';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BetaFormProps {
  lang: 'en' | 'es';
}

export const BetaForm: React.FC<BetaFormProps> = ({ lang }) => {
  const t = useTranslations(lang);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

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
        body: JSON.stringify({ email: trimmedEmail, lang }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
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
    } catch {
      setStatus('error');
      setMessage(t.landing.home.hero.betaErrorGeneric);
    }
  };

  return (
    <div className="relative z-20 mt-8 flex w-full max-w-md flex-col items-center">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="border-primary/30 flex w-full flex-col items-center justify-center rounded-2xl border bg-zinc-950/80 p-6 text-center shadow-[0_0_50px_rgba(62,93,108,0.15)] backdrop-blur-md"
          >
            <div className="bg-primary/10 text-primary relative mb-4 flex h-14 w-14 items-center justify-center rounded-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle2 className="text-primary h-8 w-8 drop-shadow-[0_0_10px_rgba(62,93,108,0.6)]" />
              </motion.div>
              <div className="bg-primary/5 absolute inset-0 animate-ping rounded-full opacity-50"></div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              {lang === 'es'
                ? '¡Registro Completado!'
                : 'Registration Complete!'}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {t.landing.home.hero.betaSuccess}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col gap-3"
          >
            <form
              onSubmit={handleSubmit}
              className="focus-within:border-primary/50 focus-within:shadow-primary/20 relative flex w-full items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 p-2 shadow-2xl backdrop-blur-md transition-all duration-300 focus-within:scale-[1.02] hover:scale-[1.02] hover:border-white/20 active:scale-[0.99]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                placeholder={t.landing.home.hero.betaPlaceholder}
                className="flex-1 bg-transparent px-4 py-2 text-white outline-none placeholder:text-zinc-500 disabled:opacity-50"
                required
              />
              <ButtonSparkle
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2.5 text-sm"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    {t.landing.home.hero.betaLoadingButton}
                  </span>
                ) : (
                  t.landing.home.hero.betaButton
                )}
              </ButtonSparkle>
            </form>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-start gap-2 px-4 text-left text-xs text-rose-400"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
