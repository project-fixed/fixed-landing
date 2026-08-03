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

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ lang }) => {
  const t = useTranslations(lang);
  const { isOpen, closeModal } = useWaitlistModal();
  const [mounted, setMounted] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // Reset focus state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsInputFocused(true);
    }
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with Blurred Mockup Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 overflow-hidden bg-black/40 backdrop-blur-md transition-colors duration-500"
          >
            <motion.div
              animate={{ opacity: isInputFocused ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 scale-105 blur-[8px] select-none"
            >
              <Image
                src={imgDashboard}
                alt="Dashboard preview backdrop"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            {/* Overlay dark tint */}
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-surface-card/95 relative z-10 flex w-full max-w-lg flex-col items-center overflow-hidden rounded-2xl border border-white/10 p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl md:p-12"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 cursor-pointer text-white/40 transition-colors hover:scale-115 hover:text-white active:scale-95"
              aria-label={lang === 'es' ? 'Cerrar modal' : 'Close modal'}
            >
              <X className="h-5 w-5" />
            </button>

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
                onFocusChange={setIsInputFocused}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
