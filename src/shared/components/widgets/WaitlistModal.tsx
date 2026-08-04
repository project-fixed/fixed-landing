'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, type Lang } from '@/data/translations';
import { useWaitlistModal } from '@/shared/components/layout/WaitlistModalContext';
import { BetaForm } from '@/shared/components/widgets/BetaForm';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import imgDashboard from '@/assets/images/dashboard.png';

interface WaitlistModalProps {
  lang: Lang;
}

const getBlurAmount = (val: string): number => {
  if (!val) return 20;

  // 1. Check for complete valid email
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (isValid) return 0;

  // 2. Calculate dynamic score for incomplete state
  let score = 0;

  // Character count contribution (up to 10 points)
  score += Math.min(val.length * 1.0, 10);

  // Bonus of +2 points for every completed group of 3 characters
  score += Math.floor(val.length / 3) * 1.5;

  // Domain structure milestones
  const hasAt = val.includes('@');
  if (hasAt) {
    score += 4;
    const hasDotAfterAt = val.slice(val.indexOf('@')).includes('.');
    if (hasDotAfterAt) {
      score += 3;
    }
  }

  // Cap incomplete score at 17 to ensure a small blur remains until fully valid
  const finalScore = Math.min(score, 17);

  // Map score to 0-20 blur range
  return Math.max(0, 20 - finalScore);
};

const WaitlistModalContent: React.FC<{ lang: Lang }> = ({ lang }) => {
  const t = useTranslations(lang);
  const { closeModal } = useWaitlistModal();
  const [email, setEmail] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);

    // Prevent background scrolling when open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Full Screen Backdrop with Dynamic Mockup Preview */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        {/* Blurred landing page backdrop (default) */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-md" />

        {/* Mockup dashboard background (transitions opacity and blur dynamically based on email value) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: email.length > 0 ? 1 : 0,
            filter: `blur(${getBlurAmount(email)}px)`,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0 scale-105"
        >
          <Image
            src={imgDashboard}
            alt="Dashboard preview backdrop"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay dark tint over the mockup image */}
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      </div>

      {/* Close button in top right of the screen */}
      <button
        onClick={closeModal}
        className="absolute top-6 right-6 z-20 cursor-pointer text-white/40 transition-colors hover:scale-115 hover:text-white active:scale-95"
        aria-label={lang === 'es' ? 'Cerrar modal' : 'Close modal'}
      >
        <X className="h-6 w-6" />
      </button>

      {/* Modal Content Container (Borderless full screen centered container) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative z-10 flex w-full max-w-lg flex-col items-center p-8 text-center md:p-12"
      >
        {/* Content Container */}
        <div className="relative z-10 flex w-full flex-col items-center">
          <span className="mb-2 font-mono text-[10px] tracking-widest text-[#3e5d6c] uppercase">
            {t.landing.home.dashboardPreview.modalBadge}
          </span>
          <h3 className="mb-3 font-mono text-xl font-bold tracking-wide text-white uppercase md:text-2xl">
            {t.landing.home.dashboardPreview.modalTitle}
          </h3>
          <p className="text-body mb-6 max-w-xs text-xs leading-relaxed md:text-sm">
            {t.landing.home.dashboardPreview.modalDescription}
          </p>

          <BetaForm
            lang={lang}
            idSuffix="global-modal"
            autoFocus={!isMobile}
            onEmailChange={setEmail}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ lang }) => {
  const { isOpen } = useWaitlistModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && <WaitlistModalContent lang={lang} />}
    </AnimatePresence>,
    document.body,
  );
};
