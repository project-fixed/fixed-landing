'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import imgSpain from '@/assets/images/spain.png';
import imgUS from '@/assets/images/united-states.png';

interface Props {
  lang: 'en' | 'es';
  className?: string;
}

export const TranslateButton: React.FC<Props> = ({ lang, className = '' }) => {
  const pathname = usePathname();

  // Calculate target path for language toggle
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

  const handleClick = () => {
    const nextLang = lang === 'en' ? 'es' : 'en';
    const domain = window.location.hostname.endsWith('fixed.com')
      ? ';domain=.fixed.com'
      : '';
    document.cookie = `language=${nextLang};path=/${domain};max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  };

  return (
    <Link
      href={targetPath}
      onClick={handleClick}
      id="lang-toggle-btn"
      className={`bg-main-glass hover:border-primary/40 flex items-center justify-center rounded border border-white/5 p-2 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      {lang === 'en' ? (
        <Image
          src={imgSpain}
          width={35}
          height={35}
          alt="Flag Spain"
          className="rounded"
        />
      ) : (
        <Image
          src={imgUS}
          width={35}
          height={35}
          alt="Flag United States"
          className="rounded"
        />
      )}
    </Link>
  );
};
