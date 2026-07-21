'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, type Lang } from '@/data/translations';
import { ArrowLeftRight, Menu, X, ArrowUpRight } from 'lucide-react';
import { IconButton } from '@/shared/components/ui/IconButton';
import imgLogo from '@/assets/images/logo.png';
import imgSpain from '@/assets/images/spain.png';
import imgUS from '@/assets/images/united-states.png';

interface Props {
  lang: Lang;
}

interface NavLink {
  label: string;
  href: string;
  type: 'route' | 'section';
  targetId?: string;
}

/** Helper to remove language prefix from path */
const normalizePathname = (pathname: string) =>
  pathname.replace(/^\/(en|es)(\/|$)/, '/');

export const Toolbar: React.FC<Props> = ({ lang }) => {
  const t = useTranslations(lang);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const panelRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const currentNormalizedPath = normalizePathname(pathname);

  const homePath = lang === 'en' ? '/' : '/es';
  const plansPath = lang === 'en' ? '/plans' : '/es/plans';
  const faqPath = lang === 'en' ? '/faq' : '/es/faq';
  const appAuthUrl = 'https://app.fixed.com/auth';

  /** Efficient Motion scroll detection without unthrottled global scroll listeners */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeScrolled = latest > 60;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  /** Scroll spy to detect active section or page */
  useEffect(() => {
    if (currentNormalizedPath !== '/') {
      setActiveSection(currentNormalizedPath);
      return;
    }

    const sections = ['hero', 'features', 'process', 'layers', 'about'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (sections.includes(hash)) {
        setActiveSection(hash);
      } else if (!hash && currentNormalizedPath === '/') {
        setActiveSection('hero');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentNormalizedPath]);

  /** Close menu handlers and event listeners attached ONLY when menu is open */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const isLinkActive = (link: NavLink) => {
    if (currentNormalizedPath === '/') {
      if (link.targetId) {
        return activeSection === link.targetId;
      }
    }
    const normLinkHref = normalizePathname(link.href);
    return activeSection === normLinkHref;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) => {
    closeMenu();

    const isHome = link.targetId === 'hero' || link.href === homePath;

    if (currentNormalizedPath === '/') {
      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', homePath);
        setActiveSection('hero');
        return;
      }

      if (link.targetId) {
        const element = document.getElementById(link.targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `${homePath}#${link.targetId}`);
          setActiveSection(link.targetId);
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (currentNormalizedPath === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', homePath);
      setActiveSection('hero');
    }
  };

  const targetPath = useMemo(() => {
    const nextLang = lang === 'en' ? 'es' : 'en';
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.replace(`/${lang}/`, `/${nextLang}/`);
    }
    if (pathname === `/${lang}`) {
      return `/${nextLang}`;
    }
    return `/${nextLang}${pathname === '/' ? '' : pathname}`;
  }, [lang, pathname]);

  const handleLangToggle = () => {
    const nextLang = lang === 'en' ? 'es' : 'en';
    const domain = window.location.hostname.endsWith('fixed.com')
      ? ';domain=.fixed.com'
      : '';
    document.cookie = `language=${nextLang};path=/${domain};max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
    closeMenu();
  };

  const navLinks: NavLink[] = useMemo(
    () => [
      {
        label: t.navbar.home,
        href: homePath,
        type: 'route',
        targetId: 'hero',
      },
      {
        label: t.navbar.features,
        href: `${homePath}#features`,
        type: 'section',
        targetId: 'features',
      },
      {
        label: t.navbar.process,
        href: `${homePath}#process`,
        type: 'section',
        targetId: 'process',
      },
      {
        label: t.navbar.layers,
        href: `${homePath}#layers`,
        type: 'section',
        targetId: 'layers',
      },
      {
        label: t.navbar.about,
        href: `${homePath}#about`,
        type: 'section',
        targetId: 'about',
      },
      { label: t.navbar.plans, href: plansPath, type: 'route' },
      { label: t.navbar.faq, href: faqPath, type: 'route' },
    ],
    [t.navbar, homePath, plansPath, faqPath],
  );

  return (
    <motion.header
      id="main-toolbar"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 right-0 left-0 z-50 w-full px-0 pt-0 transition-all duration-500 ease-in-out md:pt-2"
    >
      {/* ─── Top-down Gradient & Blur Overlay Layer ──────────────────────────── */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] bg-linear-to-b from-black/0 via-transparent to-transparent [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ─── Main Bar ──────────────────────────────────────────── */}
      <div
        id="toolbar-container"
        className={`page-section relative flex items-center justify-between border-b py-4 transition-colors duration-500 ease-in-out ${
          isScrolled ? 'border-transparent' : 'border-white/5'
        }`}
      >
        {/* Logo */}
        <Link
          href={homePath}
          className="logo flex cursor-pointer items-center select-none"
          onClick={handleLogoClick}
        >
          <Image src={imgLogo} alt="Logo" className="relative z-10 size-9" />
          <span
            id="brand"
            className={`text-md overflow-hidden font-mono font-bold whitespace-nowrap text-white uppercase transition-all duration-500 ease-out max-[425px]:hidden ${
              isScrolled
                ? 'ml-0 max-w-0 -translate-x-5 opacity-0'
                : 'ml-2 max-w-[100px] translate-x-0 opacity-100'
            }`}
          >
            Fixed
          </span>
        </Link>

        {/* Right side: CTA + MENU toggle */}
        <div className="flex items-center gap-3">
          {/* Primary CTA — JOIN FIXED */}
          <a
            href={`${appAuthUrl}?lang=${lang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white px-5 py-2.5 font-mono text-sm font-extrabold tracking-wider text-black backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/80 active:scale-95"
          >
            <span>{t.button.join}</span>
          </a>

          {/* MENU / CLOSE toggle */}
          <IconButton
            ref={menuBtnRef}
            id="btn-menu-toggle"
            onClick={toggleMenu}
            active={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-dropdown-panel"
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </IconButton>
        </div>
      </div>

      {/* ─── Dropdown Nav Panel ────────────────────────────────── */}
      <div
        ref={panelRef}
        id="nav-dropdown-panel"
        className={`bg-surface-deep/95 absolute top-full right-4 z-40 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 ease-out sm:right-8 lg:right-12 xl:right-16 ${
          isMenuOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-3 scale-95 opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Nav Links */}
        <nav className="py-2 font-mono">
          {navLinks.map((link, index) => {
            const active = isLinkActive(link);
            const isRoute = link.type === 'route';

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex items-center justify-between overflow-hidden px-5 py-3.5 text-xs font-bold tracking-[0.12em] uppercase transition-colors duration-150"
              >
                {/* Hover background */}
                <span
                  className={`absolute inset-0 rounded-none bg-white/[0.04] transition-opacity duration-150 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="relative z-10 flex items-center gap-2">
                  {/* Visual indicator prefix for section vs route */}
                  {!isRoute && (
                    <span
                      className={`font-mono text-xs font-semibold transition-colors duration-150 ${
                        active
                          ? 'text-primary-light font-bold'
                          : 'text-primary-light/60 group-hover:text-primary-light'
                      }`}
                    >
                      #
                    </span>
                  )}
                  <span
                    className={`transition-colors duration-150 ${
                      hoveredIndex === index
                        ? 'font-extrabold text-white'
                        : active
                          ? 'text-primary-light font-extrabold'
                          : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </span>
                </div>

                {/* Right side: Route Page icon vs Section active/hover indicator */}
                <div className="relative z-10 flex items-center justify-end">
                  {isRoute ? (
                    <span className="text-white/40 transition-all duration-200 group-hover:scale-110 group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                  ) : (
                    <div className="flex h-4 w-4 items-center justify-end">
                      <span
                        className={`bg-primary-light absolute size-1.5 rounded-full transition-all duration-200 ${
                          active && hoveredIndex !== index
                            ? 'scale-100 opacity-100'
                            : 'scale-50 opacity-0'
                        }`}
                      />
                      <span
                        className={`absolute translate-x-1 text-white/70 transition-all duration-200 ${
                          hoveredIndex === index
                            ? 'translate-x-0 opacity-100'
                            : 'opacity-0'
                        }`}
                      >
                        →
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-5 border-t border-white/[0.06]" />

        {/* Language Toggle */}
        <Link
          href={targetPath}
          onClick={handleLangToggle}
          className="group relative flex items-center justify-between overflow-hidden px-5 py-3.5 font-mono text-sm font-bold tracking-[0.12em] transition-colors duration-150"
        >
          <span className="absolute inset-0 rounded-none bg-white/[0.04] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          <span className="text-muted relative z-10 flex items-center gap-3 transition-colors duration-150 group-hover:text-white">
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
          <span className="relative z-10 text-white/30 transition-all duration-300 group-hover:scale-110 group-hover:text-white">
            <ArrowLeftRight className="size-4" />
          </span>
        </Link>
      </div>

      {/* ─── Backdrop blur overlay ──────────────────────────────── */}
      <div
        role="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={closeMenu}
        onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
        className={`fixed inset-0 -z-10 transition-opacity duration-300 ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />
    </motion.header>
  );
};
