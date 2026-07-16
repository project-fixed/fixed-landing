'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, type Lang } from '@/data/translations';
import imgLogo from '@/assets/images/logo.png';
import imgSpain from '@/assets/images/spain.png';
import imgUS from '@/assets/images/united-states.png';

interface Props {
  lang: Lang;
}

interface NavLink {
  label: string;
  href: string;
}

export const Toolbar: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const homePath = lang === 'en' ? '/' : '/es';
  const plansPath = lang === 'en' ? '/plans' : '/es/plans';
  const faqPath = lang === 'en' ? '/faq' : '/es/faq';
  const appAuthUrl = 'https://app.fixed.com/auth';

  const pathname = usePathname();

  const getTargetPath = () => {
    const nextLang = lang === 'en' ? 'es' : 'en';
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.replace(`/${lang}/`, `/${nextLang}/`);
    }
    if (pathname === `/${lang}`) {
      return `/${nextLang}`;
    }
    return `/${nextLang}${pathname === '/' ? '' : pathname}`;
  };

  const targetPath = getTargetPath();

  const handleLangToggle = () => {
    const nextLang = lang === 'en' ? 'es' : 'en';
    const domain = window.location.hostname.endsWith('fixed.com')
      ? ';domain=.fixed.com'
      : '';
    document.cookie = `language=${nextLang};path=/${domain};max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
    closeMenu();
  };

  const navLinks: NavLink[] = [
    { label: t.navbar.home, href: homePath },
    { label: t.navbar.features, href: `${homePath}#features` },
    { label: t.navbar.about, href: `${homePath}#about` },
    { label: t.navbar.plans, href: plansPath },
    { label: t.navbar.faq, href: faqPath },
  ];

  /** Detect scroll for glassmorphism header */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Close on Escape key */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  /** Close on click outside the panel */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  /** Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  /** Mini beta email submit from the toolbar panel */
  const handlePanelEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to hero beta form and prefill — simple UX bridge
    const heroForm = document.querySelector<HTMLInputElement>(
      '#hero input[type="email"]',
    );
    if (heroForm) {
      heroForm.value = email;
      heroForm.focus();
      heroForm.dispatchEvent(new Event('input', { bubbles: true }));
    }
    closeMenu();
  };

  return (
    <header
      id="main-toolbar"
      className={`fixed top-0 right-0 left-0 z-50 w-full px-6 transition-all duration-500 ease-in-out md:px-12 lg:px-20 ${
        isScrolled ? 'pt-2' : 'pt-4'
      }`}
    >
      {/* ─── Main Bar ──────────────────────────────────────────── */}
      <div
        id="toolbar-container"
        className="mx-auto flex w-full items-center justify-between rounded-full border border-transparent bg-transparent py-2"
      >
        {/* Logo */}
        <Link
          href={homePath}
          className="logo flex cursor-pointer items-center gap-2 select-none"
          onClick={closeMenu}
        >
          <Image src={imgLogo} alt="Logo" className="size-9" />
          <span
            id="brand"
            className={`text-2xl font-bold text-white transition-opacity duration-300 max-[425px]:hidden ${
              isScrolled ? 'w-0 overflow-hidden opacity-0' : 'opacity-100'
            }`}
          >
            Fixed
          </span>
        </Link>

        {/* Right side: CTA + MENU toggle */}
        <div className="flex items-center gap-3">
          {/* Primary CTA — JOIN FIXED • */}
          <a
            href={`${appAuthUrl}?lang=${lang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-bold tracking-wider text-black backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/80 active:scale-95"
          >
            <span>{t.button.join}</span>
          </a>

          {/* MENU / CLOSE toggle — icon only */}
          <button
            ref={menuBtnRef}
            id="btn-menu-toggle"
            onClick={toggleMenu}
            className={`relative flex size-10 items-center justify-center rounded-full border transition-all duration-300 ${
              isMenuOpen
                ? 'border-white/20 bg-white/10 text-white backdrop-blur-md'
                : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
            } active:scale-95`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── Dropdown Nav Panel ────────────────────────────────── */}
      <div
        ref={panelRef}
        id="nav-dropdown-panel"
        className={`bg-surface-deep/95 absolute top-full right-0 z-40 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 ease-out sm:right-6 lg:right-20 ${
          isMenuOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-3 scale-95 opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Nav Links */}
        <nav className="py-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-between overflow-hidden px-5 py-3.5 text-sm font-bold tracking-[0.12em] uppercase transition-colors duration-150"
            >
              {/* Hover background */}
              <span
                className={`absolute inset-0 rounded-none bg-white/[0.04] transition-opacity duration-150 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <span
                className={`relative z-10 transition-colors duration-150 ${
                  hoveredIndex === index ? 'text-white' : 'text-text-muted'
                }`}
              >
                {link.label}
              </span>

              {/* Arrow — slides in from left on hover */}
              <span
                className={`relative z-10 translate-x-2 text-white transition-all duration-200 ${
                  hoveredIndex === index
                    ? 'translate-x-0 opacity-100'
                    : 'opacity-0'
                }`}
              >
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-5 border-t border-white/[0.06]" />

        {/* Language Toggle */}
        <Link
          href={targetPath}
          onClick={handleLangToggle}
          className="group relative flex items-center justify-between overflow-hidden px-5 py-3.5 text-sm font-bold tracking-[0.12em] uppercase transition-colors duration-150"
        >
          <span className="absolute inset-0 rounded-none bg-white/[0.04] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          <span className="text-text-muted relative z-10 flex items-center gap-3 transition-colors duration-150 group-hover:text-white">
            {lang === 'en' ? (
              <Image
                src={imgSpain}
                width={22}
                height={22}
                alt="ES"
                className="rounded"
              />
            ) : (
              <Image
                src={imgUS}
                width={22}
                height={22}
                alt="EN"
                className="rounded"
              />
            )}
            {lang === 'en' ? 'Español' : 'English'}
          </span>
          <span className="relative z-10 translate-x-2 text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            →
          </span>
        </Link>

        {/* Divider */}
        <div className="mx-5 border-t border-white/[0.06]" />

        {/* Mini Beta Email Widget */}
        <div className="px-5 py-4">
          <p className="text-text-muted mb-3 text-xs font-medium tracking-wider uppercase">
            {lang === 'es' ? 'Acceso anticipado' : 'Early access'}
          </p>
          <form
            onSubmit={handlePanelEmailSubmit}
            className="flex items-center gap-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors duration-200 focus-within:border-white/20"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
              className="placeholder:text-text-ghost flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none"
            />
            <button
              type="submit"
              className="text-text-muted flex h-full items-center justify-center px-3 py-2.5 transition-colors duration-200 hover:text-white"
              aria-label="Submit email"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* ─── Backdrop blur overlay ──────────────────────────────── */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 -z-10 transition-opacity duration-300 ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />
    </header>
  );
};
