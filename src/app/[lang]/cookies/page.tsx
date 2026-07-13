import React from 'react';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function CookiesPage({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === 'es';

  return (
    <section className="container mx-auto flex w-full flex-col items-center justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 w-full max-w-[700px] text-center">
        <h1 className="mb-6 text-5xl leading-tight font-extrabold text-white">
          {isEs ? 'Política de Cookies' : 'Cookies Policy'}
        </h1>
        <p className="text-text-muted mx-auto max-w-[600px] text-base leading-relaxed">
          {isEs
            ? 'Última actualización: 12 de Junio de 2026'
            : 'Last updated: June 12, 2026'}
        </p>
      </div>

      <div className="bg-surface-card/30 text-text-body w-full max-w-3xl space-y-6 rounded-2xl border border-white/5 p-8 backdrop-blur-xl md:p-10">
        {isEs ? (
          <>
            <h2 className="mt-4 text-xl font-bold text-white">
              1. ¿Qué son las Cookies?
            </h2>
            <p className="text-sm leading-relaxed">
              Las cookies son pequeños archivos de texto que los sitios web
              almacenan en su navegador o dispositivo cuando los visita. Ayudan
              a que el sitio web funcione de manera más eficiente y recuerde
              información útil sobre sus preferencias.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              2. ¿Cómo Usamos las Cookies?
            </h2>
            <p className="text-sm leading-relaxed">
              En Fixed utilizamos cookies esenciales para mantener su sesión
              activa, recordar su idioma de preferencia (inglés o español) y
              recopilar métricas analíticas anónimas sobre el tráfico de nuestra
              landing page para optimizar el rendimiento.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              3. Tipos de Cookies que Utilizamos
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                <strong>Cookies Técnicas:</strong> Esenciales para que el sitio
                cargue y funcione correctamente.
              </li>
              <li>
                <strong>Cookies de Preferencia:</strong> Guardan su elección de
                idioma de forma local.
              </li>
              <li>
                <strong>Cookies Analíticas:</strong> Nos permiten medir de forma
                anónima cuántos usuarios nos visitan y qué secciones prefieren.
              </li>
            </ul>

            <h2 className="mt-4 text-xl font-bold text-white">
              4. Controlar las Cookies
            </h2>
            <p className="text-sm leading-relaxed">
              Usted puede bloquear, desactivar o eliminar las cookies en
              cualquier momento a través de la configuración de su navegador de
              Internet. Tenga en cuenta que desactivar ciertas cookies
              esenciales podría afectar negativamente la visualización o
              funcionalidad de nuestra plataforma.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-4 text-xl font-bold text-white">
              1. What are Cookies?
            </h2>
            <p className="text-sm leading-relaxed">
              Cookies are small text files stored on your browser or device when
              you visit websites. They help the website work more efficiently
              and remember useful information about your preferences.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              2. How We Use Cookies
            </h2>
            <p className="text-sm leading-relaxed">
              At Fixed, we use essential cookies to maintain your active
              session, remember your language preference (English or Spanish),
              and collect anonymous analytical metrics to optimize performance.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              3. Types of Cookies We Use
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                <strong>Technical Cookies:</strong> Essential for loading and
                running the site correctly.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Safely store your locale
                choice.
              </li>
              <li>
                <strong>Analytical Cookies:</strong> Help us measure visitor
                volume and page performance anonymously.
              </li>
            </ul>

            <h2 className="mt-4 text-xl font-bold text-white">
              4. Managing Cookies
            </h2>
            <p className="text-sm leading-relaxed">
              You can block, disable, or delete cookies at any time through your
              internet browser settings. Note that disabling essential cookies
              might affect the website layout or performance.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
