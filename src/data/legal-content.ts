import type { Lang } from './translations';

interface LegalSection {
  title: string;
  paragraphs: string[];
  isList?: false;
}

interface LegalListSection {
  title: string;
  items: { bold: string; text: string }[];
  isList: true;
}

type LegalBlock = LegalSection | LegalListSection;

type LegalDoc = {
  title: string;
  lastUpdated: string;
  sections: LegalBlock[];
};

const cookiesContent: Record<Lang, LegalDoc> = {
  en: {
    title: 'Cookies Policy',
    lastUpdated: 'Last updated: June 12, 2026',
    sections: [
      {
        title: '1. What are Cookies?',
        paragraphs: [
          'Cookies are small text files stored on your browser or device when you visit websites. They help the website work more efficiently and remember useful information about your preferences.',
        ],
      },
      {
        title: '2. How We Use Cookies',
        paragraphs: [
          'At Fixed, we use essential cookies to maintain your active session, remember your language preference (English or Spanish), and collect anonymous analytical metrics to optimize performance.',
        ],
      },
      {
        title: '3. Types of Cookies We Use',
        isList: true,
        items: [
          {
            bold: 'Technical Cookies:',
            text: 'Essential for loading and running the site correctly.',
          },
          {
            bold: 'Preference Cookies:',
            text: 'Safely store your locale choice.',
          },
          {
            bold: 'Analytical Cookies:',
            text: 'Help us measure visitor volume and page performance anonymously.',
          },
        ],
      },
      {
        title: '4. Managing Cookies',
        paragraphs: [
          'You can block, disable, or delete cookies at any time through your internet browser settings. Note that disabling essential cookies might affect the website layout or performance.',
        ],
      },
    ],
  },
  es: {
    title: 'Política de Cookies',
    lastUpdated: 'Última actualización: 12 de Junio de 2026',
    sections: [
      {
        title: '1. ¿Qué son las Cookies?',
        paragraphs: [
          'Las cookies son pequeños archivos de texto que los sitios web almacenan en su navegador o dispositivo cuando los visita. Ayudan a que el sitio web funcione de manera más eficiente y recuerde información útil sobre sus preferencias.',
        ],
      },
      {
        title: '2. ¿Cómo Usamos las Cookies?',
        paragraphs: [
          'En Fixed utilizamos cookies esenciales para mantener su sesión activa, recordar su idioma de preferencia (inglés o español) y recopilar métricas analíticas anónimas sobre el tráfico de nuestra landing page para optimizar el rendimiento.',
        ],
      },
      {
        title: '3. Tipos de Cookies que Utilizamos',
        isList: true,
        items: [
          {
            bold: 'Cookies Técnicas:',
            text: 'Esenciales para que el sitio cargue y funcione correctamente.',
          },
          {
            bold: 'Cookies de Preferencia:',
            text: 'Guardan su elección de idioma de forma local.',
          },
          {
            bold: 'Cookies Analíticas:',
            text: 'Nos permiten medir de forma anónima cuántos usuarios nos visitan y qué secciones prefieren.',
          },
        ],
      },
      {
        title: '4. Controlar las Cookies',
        paragraphs: [
          'Usted puede bloquear, desactivar o eliminar las cookies en cualquier momento a través de la configuración de su navegador de Internet. Tenga en cuenta que desactivar ciertas cookies esenciales podría afectar negativamente la visualización o funcionalidad de nuestra plataforma.',
        ],
      },
    ],
  },
};

const privacyContent: Record<Lang, LegalDoc> = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: June 12, 2026',
    sections: [
      {
        title: '1. Information Collection',
        paragraphs: [
          'We collect basic personal information, such as your email address, when you register for our private beta. Additionally, we gather non-identifiable technical browsing data to optimize user experience and improve our models.',
        ],
      },
      {
        title: '2. How We Use Data',
        paragraphs: [
          'Your email is used solely to grant you access to the beta, send you critical model alerts, and provide product updates. We do not sell or share your personal data with third parties.',
        ],
      },
      {
        title: '3. Information Security',
        paragraphs: [
          'We implement industry-standard security protocols, including SSL encryption and secure storage, to protect your data from unauthorized access, alteration, or disclosure.',
        ],
      },
      {
        title: '4. Your Rights',
        paragraphs: [
          'You have the right to request the deletion of your data or account cancellation at any time by contacting our support channel.',
        ],
      },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: 12 de Junio de 2026',
    sections: [
      {
        title: '1. Recopilación de Información',
        paragraphs: [
          'Recopilamos información personal básica como su correo electrónico al registrarse en nuestra beta privada. Además, recopilamos datos técnicos de navegación no identificables para optimizar la experiencia de usuario y mejorar nuestros algoritmos de procesamiento.',
        ],
      },
      {
        title: '2. Uso de los Datos',
        paragraphs: [
          'Su dirección de correo electrónico se utiliza exclusivamente para otorgarle acceso a la beta, enviarle alertas críticas del modelo y actualizaciones del producto. No vendemos ni compartimos sus datos personales con terceros.',
        ],
      },
      {
        title: '3. Seguridad de la Información',
        paragraphs: [
          'Implementamos protocolos de seguridad estándar de la industria, incluyendo encriptación SSL y almacenamiento seguro, para proteger sus datos contra acceso no autorizado, alteración o destrucción.',
        ],
      },
      {
        title: '4. Sus Derechos',
        paragraphs: [
          'Usted tiene derecho a solicitar la eliminación de sus datos o la cancelación de su cuenta de suscripción enviando una solicitud directa a nuestro soporte de correo.',
        ],
      },
    ],
  },
};

const termsContent: Record<Lang, LegalDoc> = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: June 12, 2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        paragraphs: [
          'By accessing or using Fixed services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our platform.',
        ],
      },
      {
        title: '2. Use of Predictive Intelligence',
        paragraphs: [
          'Fixed provides predictive models and data-driven analysis based on sports statistics and historical trends. All our content is provided for informational and analytical purposes only. We do not guarantee financial outcomes or returns on investment.',
        ],
      },
      {
        title: '3. Limitation of Liability',
        paragraphs: [
          'Fixed shall not be liable for any financial losses, direct or indirect damages resulting from the use of our predictions or market alerts. Final decisions remain the sole responsibility of the user.',
        ],
      },
      {
        title: '4. User Accounts and Subscriptions',
        paragraphs: [
          'You are responsible for maintaining the confidentiality of your account credentials. We reserve the right to terminate or suspend access immediately if unauthorized sharing or misuse of the platform is detected.',
        ],
      },
    ],
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: 12 de Junio de 2026',
    sections: [
      {
        title: '1. Aceptación de los Términos',
        paragraphs: [
          'Al acceder o utilizar los servicios de Fixed, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a nuestra plataforma.',
        ],
      },
      {
        title: '2. Uso de la Inteligencia Predictiva',
        paragraphs: [
          'Fixed proporciona modelos predictivos e información basada en datos históricos y estadísticos deportivos. Todo nuestro contenido se ofrece con fines informativos y analíticos. No garantizamos resultados financieros ni retornos de inversión.',
        ],
      },
      {
        title: '3. Limitación de Responsabilidad',
        paragraphs: [
          'Fixed no se hace responsable de pérdidas financieras, daños directos o indirectos derivados del uso de nuestras predicciones o alertas de mercado. Las decisiones finales son responsabilidad exclusiva del usuario.',
        ],
      },
      {
        title: '4. Cuentas de Usuario y Suscripciones',
        paragraphs: [
          'El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso. Nos reservamos el derecho de rescindir o suspender el acceso de forma inmediata si se detecta un uso indebido de los datos o de la cuenta.',
        ],
      },
    ],
  },
};

export const legalDocs: Record<string, Record<Lang, LegalDoc>> = {
  cookies: cookiesContent,
  privacy: privacyContent,
  terms: termsContent,
};

export const VALID_LEGAL_SLUGS = ['cookies', 'privacy', 'terms'];
