import React from 'react';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === 'es';

  return (
    <section className="container mx-auto flex w-full flex-col items-center justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 w-full max-w-[700px] text-center">
        <h1 className="mb-6 text-5xl leading-tight font-extrabold text-white">
          {isEs ? 'Política de Privacidad' : 'Privacy Policy'}
        </h1>
        <p className="mx-auto max-w-[600px] text-base leading-relaxed text-zinc-400">
          {isEs
            ? 'Última actualización: 12 de Junio de 2026'
            : 'Last updated: June 12, 2026'}
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-6 rounded-2xl border border-white/5 bg-zinc-900/30 p-8 text-zinc-300 backdrop-blur-xl md:p-10">
        {isEs ? (
          <>
            <h2 className="mt-4 text-xl font-bold text-white">
              1. Recopilación de Información
            </h2>
            <p className="text-sm leading-relaxed">
              Recopilamos información personal básica como su correo electrónico
              al registrarse en nuestra beta privada. Además, recopilamos datos
              técnicos de navegación no identificables para optimizar la
              experiencia de usuario y mejorar nuestros algoritmos de
              procesamiento.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              2. Uso de los Datos
            </h2>
            <p className="text-sm leading-relaxed">
              Su dirección de correo electrónico se utiliza exclusivamente para
              otorgarle acceso a la beta, enviarle alertas críticas del modelo y
              actualizaciones del producto. No vendemos ni compartimos sus datos
              personales con terceros.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              3. Seguridad de la Información
            </h2>
            <p className="text-sm leading-relaxed">
              Implementamos protocolos de seguridad estándar de la industria,
              incluyendo encriptación SSL y almacenamiento seguro, para proteger
              sus datos contra acceso no autorizado, alteración o destrucción.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              4. Sus Derechos
            </h2>
            <p className="text-sm leading-relaxed">
              Usted tiene derecho a solicitar la eliminación de sus datos o la
              cancelación de su cuenta de suscripción enviando una solicitud
              directa a nuestro soporte de correo.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-4 text-xl font-bold text-white">
              1. Information Collection
            </h2>
            <p className="text-sm leading-relaxed">
              We collect basic personal information, such as your email address,
              when you register for our private beta. Additionally, we gather
              non-identifiable technical browsing data to optimize user
              experience and improve our models.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              2. How We Use Data
            </h2>
            <p className="text-sm leading-relaxed">
              Your email is used solely to grant you access to the beta, send
              you critical model alerts, and provide product updates. We do not
              sell or share your personal data with third parties.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              3. Information Security
            </h2>
            <p className="text-sm leading-relaxed">
              We implement industry-standard security protocols, including SSL
              encryption and secure storage, to protect your data from
              unauthorized access, alteration, or disclosure.
            </p>

            <h2 className="mt-4 text-xl font-bold text-white">
              4. Your Rights
            </h2>
            <p className="text-sm leading-relaxed">
              You have the right to request the deletion of your data or account
              cancellation at any time by contacting our support channel.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
