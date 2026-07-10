import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'es'];
const DEFAULT_LOCALE = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and internal requests
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a supported locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale
  let locale = DEFAULT_LOCALE;

  // 1. Check cookie
  const cookieLanguage = request.cookies.get('language')?.value;
  if (cookieLanguage && SUPPORTED_LOCALES.includes(cookieLanguage)) {
    locale = cookieLanguage;
  } else {
    // 2. Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const isSpanish =
        acceptLanguage.toLowerCase().startsWith('es') ||
        acceptLanguage.toLowerCase().includes('es-');
      if (isSpanish) {
        locale = 'es';
      }
    }
  }

  // Redirect to /[locale][pathname]
  const redirectUrl = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`,
    request.url,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets (.png, .svg, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|images|assets).*)',
  ],
};
