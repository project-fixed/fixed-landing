import React from 'react';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === 'es';

  return (
    <section className="container mx-auto flex w-full flex-col items-center justify-center px-4 pt-40 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 w-full max-w-[700px] text-center">
        <h1 className="mb-6 text-5xl leading-tight font-extrabold text-white">
          {isEs ? 'Términos de Servicio' : 'Terms of Service'}
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
              1. Aceptación de los Términos
            </h2>
            <p className="text-sm leading-relaxed">
              Al acceder o utilizar los servicios de Fixed, usted acepta estar
              sujeto a estos Términos de Servicio. Si no está de acuerdo con
              alguna parte de estos términos, no podrá acceder a nuestra
              plataforma.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              2. Uso de la Inteligencia Predictiva
            </h2>
            <p className="text-sm leading-relaxed">
              Fixed proporciona modelos predictivos e información basada en
              datos históricos y estadísticos deportivos. Todo nuestro contenido
              se ofrece con fines informativos y analíticos. No garantizamos
              resultados financieros ni retornos de inversión.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              3. Limitación de Responsabilidad
            </h2>
            <p className="text-sm leading-relaxed">
              Fixed no se hace responsable de pérdidas financieras, daños
              directos o indirectos derivados del uso de nuestras predicciones o
              alertas de mercado. Las decisiones finales son responsabilidad
              exclusiva del usuario.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              4. Cuentas de Usuario y Suscripciones
            </h2>
            <p className="text-sm leading-relaxed">
              El usuario es responsable de mantener la confidencialidad de sus
              credenciales de acceso. Nos reservamos el derecho de rescindir o
              suspender el acceso de forma inmediata si se detecta un uso
              indebido de los datos o de la cuenta.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-4 text-xl font-bold text-white">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed">
              By accessing or using Fixed services, you agree to be bound by
              these Terms of Service. If you disagree with any part of these
              terms, you may not access our platform.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              2. Use of Predictive Intelligence
            </h2>
            <p className="text-sm leading-relaxed">
              Fixed provides predictive models and data-driven analysis based on
              sports statistics and historical trends. All our content is
              provided for informational and analytical purposes only. We do not
              guarantee financial outcomes or returns on investment.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              3. Limitation of Liability
            </h2>
            <p className="text-sm leading-relaxed">
              Fixed shall not be liable for any financial losses, direct or
              indirect damages resulting from the use of our predictions or
              market alerts. Final decisions remain the sole responsibility of
              the user.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              4. User Accounts and Subscriptions
            </h2>
            <p className="text-sm leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials. We reserve the right to terminate or suspend
              access immediately if unauthorized sharing or misuse of the
              platform is detected.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
