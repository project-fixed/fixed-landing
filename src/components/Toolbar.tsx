'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, type Lang } from '../data/translations';
import imgLogo from '../assets/images/logo.png';
import { ButtonArrow } from './ui/ButtonArrow';

interface Props {
  lang: Lang;
}

export const Toolbar: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homePath = lang === 'en' ? '/' : '/es';
  const plansPath = lang === 'en' ? '/plans' : '/es/plans';
  const faqPath = lang === 'en' ? '/faq' : '/es/faq';
  const appAuthUrl = 'https://app.fixed.com/auth';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return nextState;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header
      id="main-toolbar"
      className={`fixed top-0 right-0 left-0 z-50 w-full px-4 transition-all duration-500 ease-in-out ${
        isScrolled ? 'pt-4' : 'pt-6'
      }`}
    >
      <div
        id="toolbar-container"
        className={`mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-full border px-6 py-4 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-background/85 border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          href={homePath}
          className="logo flex cursor-pointer items-center select-none"
        >
          <Image src={imgLogo} alt="Logo" className="mr-2 size-9" />
          <span
            id="brand"
            className="text-2xl font-bold text-white max-[425px]:hidden"
          >
            Fixed
          </span>
        </Link>

        {/* Menu Center (Desktop) */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href={homePath}
            className="text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            {t.navbar.home}
          </Link>
          <Link
            href={`${homePath}#features`}
            className="text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            {t.navbar.features}
          </Link>
          <Link
            href={`${homePath}#about`}
            className="text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            {t.navbar.about}
          </Link>
          <Link
            href={plansPath}
            className="text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            {t.navbar.plans}
          </Link>
          <Link
            href={faqPath}
            className="text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            {t.navbar.faq}
          </Link>
        </nav>

        {/* Right Side: Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <ButtonArrow
            href={`${appAuthUrl}?lang=${lang}`}
            className="hidden lg:inline-flex"
          >
            {t.button.join}
          </ButtonArrow>

          {/* Mobile Bars Button */}
          <button
            onClick={toggleMenu}
            id="btn-mobile-menu-open"
            className="rounded border border-white/10 bg-white/5 p-2 text-white transition-colors duration-200 hover:bg-white/10 active:scale-95 lg:hidden"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        onClick={closeMenu}
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'block opacity-100' : 'hidden opacity-0'
        }`}
      ></div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu-drawer"
        className={`fixed inset-y-0 right-0 z-[100] flex w-72 max-w-[80vw] transform flex-col gap-8 border-l border-white/5 bg-zinc-950 p-8 shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">Menu</span>
          <button
            onClick={closeMenu}
            id="btn-mobile-menu-close"
            className="rounded bg-white/5 p-2 text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-left text-lg font-bold">
          <Link
            href={homePath}
            onClick={closeMenu}
            className="hover:text-primary mobile-link text-zinc-100 transition-colors"
          >
            {t.navbar.home}
          </Link>
          <Link
            href={`${homePath}#features`}
            onClick={closeMenu}
            className="hover:text-primary mobile-link text-zinc-100 transition-colors"
          >
            {t.navbar.features}
          </Link>
          <Link
            href={`${homePath}#about`}
            onClick={closeMenu}
            className="hover:text-primary mobile-link text-zinc-100 transition-colors"
          >
            {t.navbar.about}
          </Link>
          <Link
            href={plansPath}
            onClick={closeMenu}
            className="hover:text-primary mobile-link text-zinc-100 transition-colors"
          >
            {t.navbar.plans}
          </Link>
          <Link
            href={faqPath}
            onClick={closeMenu}
            className="hover:text-primary mobile-link text-zinc-100 transition-colors"
          >
            {t.navbar.faq}
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <ButtonArrow
            href={`${appAuthUrl}?lang=${lang}`}
            className="w-full"
            onClick={closeMenu}
          >
            {t.button.join}
          </ButtonArrow>
        </div>
      </div>
    </header>
  );
};
