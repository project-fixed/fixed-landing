import '@/styles/global.css';
import React from 'react';
import { Prosto_One, Space_Grotesk, Space_Mono } from 'next/font/google';
import { TranslateButton } from '@/components/TranslateButton';
import { Toolbar } from '@/components/Toolbar';
import { Footer } from '@/components/Footer';

const prostoOne = Prosto_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-prosto-one',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

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
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} ${prostoOne.variable} antialiased`}>
        {/* Gradient Shapes background element */}
        <div
          id="gradient-shapes-container"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Slots for background visuals */}
        </div>

        <div className="relative z-10 flex min-h-screen w-full flex-col">
          <Toolbar lang={currentLang} />

          <main className="flex-grow w-full">{children}</main>

          <Footer lang={currentLang} />
        </div>

        {/* Translate Button (Fixed bottom-right corner) */}
        <TranslateButton
          lang={currentLang}
          className="fixed right-0 bottom-0 z-[100] rounded-none rounded-tl-xl border-r-0 border-b-0"
        />
      </body>
    </html>
  );
}
