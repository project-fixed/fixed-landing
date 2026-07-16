import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, type Lang } from '@/data/translations';
import { BetaForm } from '@/components/shared/BetaForm';
import imgLogo from '@/assets/images/logo.png';

interface Props {
  lang: Lang;
}

/**
 * Minimalist footer with a differentiated CTA section (distinct from hero),
 * full-width layout, and clean link columns. FooterGradientShapes removed.
 */
export const Footer: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);

  const homePath = lang === 'en' ? '/' : '/es';
  const plansPath = lang === 'en' ? '/plans' : '/es/plans';
  const faqPath = lang === 'en' ? '/faq' : '/es/faq';
  const termsPath = lang === 'en' ? '/terms' : '/es/terms';
  const privacyPath = lang === 'en' ? '/privacy' : '/es/privacy';
  const cookiesPath = lang === 'en' ? '/cookies' : '/es/cookies';

  /** CTA copy — different from hero to avoid repetition */
  const ctaHeadline =
    lang === 'es'
      ? 'Decisiones respaldadas por datos, no por instinto.'
      : 'Decisions backed by data, not instinct.';
  const ctaSubtext =
    lang === 'es'
      ? 'Únete a la lista de espera y empieza a decidir con inteligencia.'
      : 'Join the waitlist and start deciding with intelligence.';

  return (
    <footer className="footer text-text-primary relative z-20 flex flex-col overflow-hidden border-t border-white/[0.06]">
      {/* ─── CTA Section ─────────────────────────────────────── */}
      <div className="relative flex flex-col px-4 py-24 sm:px-8 lg:px-12 xl:px-20">
        {/* Top horizontal separator accent */}
        <div className="mb-16 flex items-center gap-4">
          <span className="text-text-ghost font-mono text-xs tracking-widest uppercase">
            // get started
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* CTA content: 2-column on desktop */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="lg:max-w-[560px]">
            <h2 className="font-mono text-[clamp(2rem,5vw,3.5rem)] leading-[1.0] font-bold tracking-tight text-white uppercase">
              {ctaHeadline}
            </h2>
          </div>

          <div className="flex w-full flex-col gap-4 lg:max-w-[380px]">
            <p className="text-text-muted text-sm">{ctaSubtext}</p>
            <BetaForm lang={lang} />
          </div>
        </div>
      </div>

      {/* ─── Footer Links + Legal ────────────────────────────── */}
      <div className="border-t border-white/[0.06] px-4 pt-12 pb-8 sm:px-8 lg:px-12 xl:px-20">
        {/* Links row */}
        <div className="mb-12 flex flex-wrap items-start justify-between gap-12">
          {/* Brand */}
          <div className="flex max-w-xs flex-col">
            <Link
              href={homePath}
              className="mb-4 inline-flex items-center gap-2"
            >
              <Image src={imgLogo} alt="Fixed Logo" className="size-9" />
              <span className="text-xl font-bold text-white">Fixed</span>
            </Link>
            <p className="text-text-body text-sm leading-relaxed">
              {t.landing.footer.description}
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-16 max-md:gap-8">
            {/* Product */}
            <div className="flex flex-col gap-3 text-left">
              <span className="text-text-ghost font-mono text-[10px] tracking-widest uppercase">
                {t.landing.footer.link.dimensions.product}
              </span>
              <Link
                href={`${homePath}#features`}
                className="hover:text-primary text-text-muted text-sm transition-colors duration-200"
              >
                {t.navbar.features}
              </Link>
              <Link
                href={`${homePath}#process`}
                className="hover:text-primary text-text-muted text-sm transition-colors duration-200"
              >
                {t.navbar.steps}
              </Link>
              <Link
                href={`${homePath}#about`}
                className="hover:text-primary text-text-muted text-sm transition-colors duration-200"
              >
                {t.navbar.about}
              </Link>
            </div>

            {/* More */}
            <div className="flex flex-col gap-3 text-left">
              <span className="text-text-ghost font-mono text-[10px] tracking-widest uppercase">
                {t.landing.footer.link.dimensions.more}
              </span>
              <Link
                href={plansPath}
                className="hover:text-primary text-text-muted text-sm transition-colors duration-200"
              >
                {t.navbar.plans}
              </Link>
              <Link
                href={faqPath}
                className="hover:text-primary text-text-muted text-sm transition-colors duration-200"
              >
                {t.navbar.faq}
              </Link>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-white/[0.06] pt-6">
          <div className="text-text-ghost flex flex-wrap items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} Fixed Inc. All rights reserved.</p>
            <div className="flex flex-wrap gap-6">
              <Link
                href={termsPath}
                className="hover:text-primary transition-colors duration-200"
              >
                {t.landing.footer.link.company.termsOfService}
              </Link>
              <Link
                href={privacyPath}
                className="hover:text-primary transition-colors duration-200"
              >
                {t.landing.footer.link.company.privacyPolicy}
              </Link>
              <Link
                href={cookiesPath}
                className="hover:text-primary transition-colors duration-200"
              >
                {t.landing.footer.link.company.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
