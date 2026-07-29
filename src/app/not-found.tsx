import Link from 'next/link';
import '@/styles/global.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

export default function GlobalNotFound() {
  return (
    <html lang="es" className="dark">
      <head>
        <title>404 - Página no encontrada | Fixed</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-canvas text-body relative flex min-h-screen flex-col justify-between overflow-x-hidden antialiased">
        {/* Precision grid pattern layout glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_-10%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_65%)]" />

        {/* Minimalist Corporate Header */}
        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/[0.06] px-6 py-6">
          <Link
            href="/"
            className="font-mono text-xl font-bold tracking-wider text-white"
          >
            FIXED
          </Link>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 py-16 text-center">
          <div className="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

          <div className="max-w-md space-y-6">
            <span className="text-primary-light font-mono text-xs tracking-widest uppercase">
              Error Code
            </span>

            <h1 className="bg-gradient-to-b from-white via-neutral-300 to-neutral-600 bg-clip-text font-mono text-7xl font-extrabold tracking-tight text-transparent select-none sm:text-8xl">
              404
            </h1>

            <h2 className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Página no encontrada / Page Not Found
            </h2>

            <p className="text-muted mx-auto max-w-sm font-sans text-sm leading-relaxed sm:text-base">
              La página que buscas no existe o ha sido movida temporalmente.
              <br className="hidden sm:inline" />
              The page you are looking for does not exist.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="/es"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white px-6 py-3 font-mono text-sm font-extrabold tracking-wider text-black backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/80 active:scale-95 sm:w-auto"
              >
                Volver al Inicio (ES)
              </Link>
              <Link
                href="/en"
                className="group bg-white-glass hover:bg-white-glass/20 relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 px-6 py-3 font-mono text-sm font-extrabold tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 active:scale-95 sm:w-auto"
              >
                Go to Home (EN)
              </Link>
            </div>
          </div>
        </main>

        {/* Minimalist Corporate Footer */}
        <footer className="relative z-10 mx-auto w-full max-w-7xl border-t border-white/[0.06] px-6 py-6 text-center">
          <p className="text-faint text-xs">
            &copy; {new Date().getFullYear()} Fixed. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
