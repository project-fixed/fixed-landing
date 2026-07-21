import '@/styles/global.css';
import React from 'react';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { Toolbar } from '@/shared/components/layout/Toolbar';
import { Footer } from '@/shared/components/layout/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

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
  const isEn = lang === 'en';
  return {
    title: isEn
      ? 'Fixed - Stop guessing and start winning more with AI'
      : 'Fixed - Deja de adivinar y empieza a ganar más con IA',
    description: isEn
      ? 'Leave doubts behind. Our AI analyzes every detail to offer you the fixed outcome of the match.'
      : 'Deja las dudas atrás. Nuestra IA analiza cada detalle para ofrecerte la fija del partido.',
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';

  return (
    <html lang={currentLang} className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {/* Precision grid pattern matching the tech aesthetic */}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_-10%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_65%)]" />

        <div className="relative z-10 flex min-h-screen w-full flex-col">
          <Toolbar lang={currentLang} />

          <main className="w-full flex-grow">{children}</main>

          <Footer lang={currentLang} />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
