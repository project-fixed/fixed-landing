import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, type Lang } from '../data/translations';
import { FooterGradientShapes } from './FooterGradientShapes';
import { BetaForm } from '@/components/BetaForm';
import imgLogo from '../assets/images/logo.png';

interface Props {
  lang: Lang;
}

export const Footer: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);

  const homePath = lang === 'en' ? '/' : '/es';
  const plansPath = lang === 'en' ? '/plans' : '/es/plans';
  const faqPath = lang === 'en' ? '/faq' : '/es/faq';
  const termsPath = lang === 'en' ? '/terms' : '/es/terms';
  const privacyPath = lang === 'en' ? '/privacy' : '/es/privacy';
  const cookiesPath = lang === 'en' ? '/cookies' : '/es/cookies';

  return (
    <footer className="footer relative z-20 flex min-h-screen flex-col overflow-hidden border-t border-white/10 pt-16 pb-8 text-zinc-100">
      {/* Gradient Background shapes */}
      <FooterGradientShapes />

      {/* Beta CTA Section */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-6 max-w-2xl text-4xl leading-tight font-extrabold text-white md:text-5xl">
          <span className="text-primary">
            {t.landing.home.hero.title.start}
          </span>{' '}
          {t.landing.home.hero.title.center}{' '}
          <span className="text-primary">{t.landing.home.hero.title.end}</span>
        </h2>
        <p className="mb-10 max-w-xl text-lg text-zinc-300">
          {t.landing.home.hero.description}
        </p>

        <BetaForm lang={lang} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mb-28 flex flex-wrap items-start justify-between gap-12">
          {/* Brand */}
          <div className="flex max-w-sm flex-col">
            <Image src={imgLogo} alt="Fixed Logo" className="mb-4 size-11" />
            <span className="mb-2 text-2xl font-bold text-white">
              {t.landing.footer.title}
            </span>
            <p className="text-sm leading-relaxed text-zinc-300">
              {t.landing.footer.description}
            </p>
          </div>

          {/* Menus */}
          <div className="flex flex-wrap gap-20 max-md:gap-8">
            {/* Links Product */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-xs font-bold tracking-wider text-white uppercase">
                {t.landing.footer.link.dimensions.product}
              </span>
              <Link
                href={`${homePath}#features`}
                className="hover:text-primary text-sm text-zinc-300 transition-all duration-300"
              >
                {t.navbar.features}
              </Link>
              <Link
                href={`${homePath}#process`}
                className="hover:text-primary text-sm text-zinc-300 transition-all duration-300"
              >
                {t.navbar.steps}
              </Link>
              <Link
                href={`${homePath}#about`}
                className="hover:text-primary text-sm text-zinc-300 transition-all duration-300"
              >
                {t.navbar.about}
              </Link>
            </div>

            {/* Links More */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-xs font-bold tracking-wider text-white uppercase">
                {t.landing.footer.link.dimensions.more}
              </span>
              <Link
                href={plansPath}
                className="hover:text-primary text-sm text-zinc-300 transition-all duration-300"
              >
                {t.navbar.plans}
              </Link>
              <Link
                href={faqPath}
                className="hover:text-primary text-sm text-zinc-300 transition-all duration-300"
              >
                {t.navbar.faq}
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        {/* Legal */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} Fixed Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-8 max-md:gap-4">
            <Link
              href={termsPath}
              className="hover:text-primary transition-colors duration-300"
            >
              {t.landing.footer.link.company.termsOfService}
            </Link>
            <Link
              href={privacyPath}
              className="hover:text-primary transition-colors duration-300"
            >
              {t.landing.footer.link.company.privacyPolicy}
            </Link>
            <Link
              href={cookiesPath}
              className="hover:text-primary transition-colors duration-300"
            >
              {t.landing.footer.link.company.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
