import '@/styles/global.css';
import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { translations } from '@/data/translations';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
import { Toolbar } from '@/shared/components/layout/Toolbar';
import { Footer } from '@/shared/components/layout/Footer';
import { SplashLoader } from '@/shared/components/layout/SplashLoader';
import { WaitlistModalProvider } from '@/shared/components/layout/WaitlistModalContext';
import { WaitlistModal } from '@/shared/components/widgets/WaitlistModal';
import { WaitlistSuccessToast } from '@/shared/components/widgets/WaitlistSuccessToast';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalyticsWrapper } from '@/shared/components/layout/GoogleAnalyticsWrapper';
import { CookieBanner } from '@/shared/components/layout/CookieBanner';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';
  const isEn = currentLang === 'en';

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://fixed-landing.vercel.app';
  const canonicalUrl = `${baseUrl}/${currentLang}`;
  const heroTranslations = translations[currentLang].landing.home.hero;
  const title = `Fixed - ${heroTranslations.title.start} ${heroTranslations.title.center} ${heroTranslations.title.end}`;
  const description = heroTranslations.description;

  const keywordsEn = [
    'sports betting',
    'soccer',
    'football',
    'artificial intelligence',
    'machine learning',
    'predictive algorithms',
    'project fixed',
    'fixed software',
    'fixed community',
    'betting software',
    'sports predictions',
    'match statistics',
    'picks',
    'tipsters',
    'value bets',
    'bankroll management',
    'sports analytics',
  ];

  const keywordsEs = [
    'apuestas deportivas',
    'fútbol',
    'inteligencia artificial',
    'machine learning',
    'predicciones algorítmicas',
    'project fixed',
    'fixed software',
    'comunidad fixed',
    'software predictivo',
    'pronósticos',
    'estadísticas deportivas',
    'picks',
    'tipsters',
    'value bets',
    'gestión de bankroll',
    'herramientas de análisis',
  ];

  return {
    title,
    description,
    keywords: isEn ? keywordsEn : keywordsEs,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Fixed',
      images: [
        {
          url: '/images/fixed_imagotype_dark_mode.png',
          width: 800,
          height: 800,
          alt: 'Fixed Imagotype',
        },
      ],
      locale: isEn ? 'en_US' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/fixed_imagotipo_dark_mode.png'],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang={currentLang}
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {/* Precision grid pattern matching the tech aesthetic */}

        <SplashLoader>
          <WaitlistModalProvider>
            <div className="cookie-banner-blur-target relative z-10 flex min-h-screen w-full flex-col">
              <Toolbar lang={currentLang} />

              <main className="w-full grow">{children}</main>

              <Footer lang={currentLang} />
            </div>
            <WaitlistModal lang={currentLang} />
            <WaitlistSuccessToast lang={currentLang} />
          </WaitlistModalProvider>
        </SplashLoader>
        <SpeedInsights />
        <Analytics />
        {gaId && <GoogleAnalyticsWrapper gaId={gaId} />}
        <CookieBanner lang={currentLang} />
      </body>
    </html>
  );
}
