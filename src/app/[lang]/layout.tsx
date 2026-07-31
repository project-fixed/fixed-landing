import '@/styles/global.css';
import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';

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
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

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
    process.env.NEXT_PUBLIC_SITE_URL || 'https://fixed-landing-beta.vercel.app';
  const canonicalUrl = `${baseUrl}/${currentLang}`;

  const title = isEn
    ? 'Fixed - Stop guessing and start winning more with AI'
    : 'Fixed - Deja de adivinar y empieza a ganar más con IA';

  const description = isEn
    ? 'Leave doubts behind. Our AI analyzes every detail to offer you the fixed outcome of the match.'
    : 'Deja las dudas atrás. Nuestra IA analiza cada detalle para ofrecerte la fija del partido.';

  return {
    title,
    description,
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
          url: `${baseUrl}/images/fixed_isotype_dark_mode.png`, // Usamos uno de los widgets del dashboard que ya existen como OG Image preliminar
          width: 1200,
          height: 630,
          alt: 'Fixed Predictive Intelligence Dashboard',
        },
      ],
      locale: isEn ? 'en_US' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/fixed_isotype_dark_mode.png`],
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

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_-10%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_65%)]" />

        <SplashLoader>
          <div className="relative z-10 flex min-h-screen w-full flex-col">
            <Toolbar lang={currentLang} />

            <main className="w-full flex-grow">{children}</main>

            <Footer lang={currentLang} />
          </div>
        </SplashLoader>
        <SpeedInsights />
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
