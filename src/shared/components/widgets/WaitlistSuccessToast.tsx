'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useTranslations } from '@/data/translations';
import { useWaitlistModal } from '@/shared/components/layout/WaitlistModalContext';
import { Confetti, WaitlistCounter } from './BetaForm';
import { createPortal } from 'react-dom';

export const WaitlistSuccessToast: React.FC<{ lang: 'en' | 'es' }> = ({
  lang,
}) => {
  const t = useTranslations(lang);
  const { successState, setSuccessState } = useWaitlistModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !successState) return null;

  const { isRegistered, isDuplicate, isLocal, registeredUserNumber } =
    successState;

  return createPortal(
    <AnimatePresence>
      {isRegistered && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-glass-card fixed right-6 bottom-6 left-6 z-[110] flex flex-col items-center justify-center rounded-2xl border border-white/10 p-5 text-center shadow-2xl backdrop-blur-xl md:left-auto md:w-[360px] md:max-w-md"
        >
          {!isDuplicate && <Confetti />}

          <button
            type="button"
            onClick={() => setSuccessState(null)}
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
    </AnimatePresence>,
    document.body,
  );
};
