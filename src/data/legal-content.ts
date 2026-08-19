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
    lastUpdated: 'Last Updated July 24, 2026',
    sections: [
      {
        title: '1. What are Cookies?',
        paragraphs: [
          'Cookies are small text files stored on your browser or device when you visit websites. They help the website work more efficiently and remember useful information about your choices to enhance your experience.',
        ],
      },
      {
        title: '2. How We Use Cookies',
        paragraphs: [
          'At Fixed, we use first-party and third-party cookies to remember language choices, measure website interaction patterns anonymously, and optimize platform speed. Essential cookies are strictly necessary to let you browse the site.',
        ],
      },
      {
        title: '3. Types of Cookies We Use',
        isList: true,
        items: [
          {
            bold: 'Site Language (First-party / Essential):',
            text: 'Cookie Name: "language". Used to save your locale selection (en/es). Provider: Fixed. Duration: 1 year. Purpose: Keeps the landing page displayed in your selected language.',
          },
          {
            bold: 'Vercel Analytics (First-party / Analytics):',
            text: 'Tracker Name: Vercel Analytics. Provider: Vercel Inc. Duration: Session. Purpose: Measures page traffic patterns on the server side anonymously without tracking individual personal IDs.',
          },
          {
            bold: 'Google Analytics (Third-party / Analytics):',
            text: 'Cookie Names: "_ga", "_gid". Provider: Google LLC. Duration: up to 2 years. Purpose: Analyzes user navigation, page views, and traffic sources. Addresses platform performance optimization.',
          },
        ],
      },
      {
        title: '4. Managing Cookies via Browser Settings',
        isList: true,
        items: [
          {
            bold: 'Google Chrome:',
            text: 'Go to Settings > Privacy and security > Third-party cookies. Select your preferred blocking option.',
          },
          {
            bold: 'Apple Safari:',
            text: 'Go to Preferences > Privacy > Cookies and website data. Select "Block all cookies" or customize preferences.',
          },
          {
            bold: 'Mozilla Firefox:',
            text: 'Go to Settings > Privacy & Security > Enhanced Tracking Protection. Choose "Standard", "Strict" or customize your blocking.',
          },
          {
            bold: 'Microsoft Edge:',
            text: 'Go to Settings > Cookies and site permissions > Manage and delete cookies and site data.',
          },
        ],
      },
    ],
  },
  es: {
    title: 'Política de Cookies',
    lastUpdated: 'Última actualización: 24 de Julio de 2026',
    sections: [
      {
        title: '1. ¿Qué son las Cookies?',
        paragraphs: [
          'Las cookies son pequeños archivos de texto que los sitios web almacenan en su navegador o dispositivo cuando los visita. Ayudan a que el sitio web funcione de manera más eficiente y recuerde información útil sobre sus elecciones para mejorar su navegación.',
        ],
      },
      {
        title: '2. ¿Cómo Usamos las Cookies?',
        paragraphs: [
          'En Fixed utilizamos cookies propias y de terceros para recordar su idioma de preferencia, evaluar de forma agregada el tráfico de la web y optimizar la velocidad del sistema. Las cookies esenciales son estrictamente necesarias para el correcto funcionamiento de la plataforma.',
        ],
      },
      {
        title: '3. Tipos de Cookies que Utilizamos',
        isList: true,
        items: [
          {
            bold: 'Idioma del Sitio (Propia / Esencial):',
            text: 'Nombre de la cookie: "language". Proveedor: Fixed. Duración: 1 año. Finalidad: Recuerda la traducción seleccionada (es/en) para cargar automáticamente la web en su idioma predeterminado.',
          },
          {
            bold: 'Vercel Analytics (Propia / Analítica):',
            text: 'Rastreador: Vercel Analytics. Proveedor: Vercel Inc. Duración: Sesión. Finalidad: Mide el volumen de tráfico de forma anónima desde el servidor sin procesar datos personales identificables.',
          },
          {
            bold: 'Google Analytics (Terceros / Analítica):',
            text: 'Nombres de cookies: "_ga", "_gid". Proveedor: Google LLC. Duración: hasta 2 años. Finalidad: Analiza el comportamiento del usuario y la interacción en la web con fines estadísticos para optimizar el servicio.',
          },
        ],
      },
      {
        title: '4. Controlar las Cookies desde su Navegador',
        isList: true,
        items: [
          {
            bold: 'Google Chrome:',
            text: 'Vaya a Configuración > Privacidad y seguridad > Cookies de terceros. Elija la opción de bloqueo deseada.',
          },
          {
            bold: 'Apple Safari:',
            text: 'Vaya a Preferencias > Privacidad > Cookies y datos del sitio web. Seleccione "Bloquear todas las cookies" o personalice.',
          },
          {
            bold: 'Mozilla Firefox:',
            text: 'Vaya a Ajustes > Privacidad & Seguridad > Protección contra el rastreo mejorada. Seleccione "Estándar", "Estricta" o personalice.',
          },
          {
            bold: 'Microsoft Edge:',
            text: 'Vaya a Configuración > Cookies y permisos del sitio > Administrar y eliminar cookies y datos del sitio.',
          },
        ],
      },
    ],
  },
};

const privacyContent: Record<Lang, LegalDoc> = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated July 24, 2026',
    sections: [
      {
        title: '1. Information Collection',
        paragraphs: [
          'We collect basic personal information, such as your email address, when you register for our private beta waitlist. Additionally, we gather non-identifiable technical browsing data (such as browser language preference) and website interaction metrics to optimize user experience. No phone numbers, passwords, or financial details are requested or stored in this phase.',
        ],
      },
      {
        title: '2. How We Use Data',
        paragraphs: [
          'Your email is used solely to manage your place in the private beta waitlist, prevent duplicate registrations, and send you product updates, notifications, or invitations to join the platform once it is active. We do not sell, rent, or share your personal data with third-party advertisers.',
        ],
      },
      {
        title: '3. Data Processors (Third Parties)',
        paragraphs: [
          'To run this beta phase, we share limited data with the following trusted third-party providers:',
          '- Supabase: Used as our primary secure cloud database to host registration records.',
          '- Resend: Used to deliver transactional email confirmations and product updates. Each email sent contains an automatic opt-out (unsubscribe) option.',
          '- Google Analytics: Processes anonymized navigation metrics and device information to help us measure site performance. No directly identifying personal details are sent to Google LLC.',
        ],
      },
      {
        title: '4. Your Rights',
        paragraphs: [
          'You have the right to request the deletion of your email address from our waitlist at any time by contacting our support channel at support@fixed.com.',
        ],
      },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: 24 de Julio de 2026',
    sections: [
      {
        title: '1. Recopilación de Información',
        paragraphs: [
          'Recopilamos información personal básica como su correo electrónico al registrarse en la lista de espera de nuestra beta privada. Además, recopilamos datos técnicos de navegación no identificables (como el idioma de preferencia de su navegador) y métricas de interacción con el sitio para optimizar la experiencia de usuario. No solicitamos ni almacenamos contraseñas, números telefónicos ni información financiera en esta fase.',
        ],
      },
      {
        title: '2. Uso de los Datos',
        paragraphs: [
          'Su dirección de correo electrónico se utiliza exclusivamente para gestionar su lugar en la lista de espera de la Beta privada, evitar registros duplicados y enviarle actualizaciones, notificaciones o invitaciones para ingresar a la plataforma. No vendemos, alquilamos ni compartimos sus datos personales con anunciantes externos.',
        ],
      },
      {
        title: '3. Proveedores de Servicios (Terceros)',
        paragraphs: [
          'Para el correcto funcionamiento de esta fase Beta, compartimos información limitada con los siguientes proveedores de servicios externos de confianza:',
          '- Supabase: Utilizado como nuestra base de datos segura en la nube para registrar los correos electrónicos.',
          '- Resend: Utilizado como nuestra plataforma de distribución para enviarle confirmaciones de registro y novedades. Cada correo incluye un enlace de baja automática.',
          '- Google Analytics: Proveedor analítico de Google LLC utilizado para evaluar patrones de tráfico y rendimiento de forma agregada. Las direcciones IP se anonimizan antes de su procesamiento.',
        ],
      },
      {
        title: '4. Sus Derechos',
        paragraphs: [
          'Usted tiene derecho a solicitar la eliminación de su correo electrónico de nuestra lista de espera en cualquier momento enviando una solicitud directa a nuestro soporte en support@fixed.com.',
        ],
      },
    ],
  },
};

const termsContent: Record<Lang, LegalDoc> = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated July 24, 2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        paragraphs: [
          'By accessing or browsing the Fixed website and registering your email in our waitlist, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use the site.',
        ],
      },
      {
        title: '2. Beta Phase and Waitlist',
        paragraphs: [
          'Fixed is currently under development (Private Beta). This website is an informational landing page. All predictions, odds, and metrics displayed here are simulated and for illustrative or historical purposes only. They do not represent live bets or guarantee access to any paid service.',
          'By registering your email on the waitlist, you represent and warrant that you are at least 18 years of age. Fixed reserves the right to immediately remove any registered email if we suspect the user does not meet this age requirement.',
        ],
      },
      {
        title: '3. Limitation of Liability',
        paragraphs: [
          'Fixed is not responsible for any financial losses, bets, or decisions made based on the illustrative information displayed on this site. Since there are no active paid subscriptions or payment methods on this site, no financial liability or refund obligations are assumed.',
        ],
      },
      {
        title: '4. Intellectual Property',
        paragraphs: [
          'All visual content, interface designs, texts, logos, and AI processing concepts shown on the site are the exclusive property of Fixed and protected by intellectual property laws.',
        ],
      },
      {
        title: '5. Governing Law',
        paragraphs: [
          'These terms of use are governed by the laws of the Republic of Peru. Any legal inquiries or disputes shall be submitted to the competent courts of Lima, Peru.',
        ],
      },
    ],
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: 24 de Julio de 2026',
    sections: [
      {
        title: '1. Aceptación de los Términos',
        paragraphs: [
          'Al acceder o navegar por el sitio web de Fixed y registrar su correo en la lista de espera, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, por favor no utilice el sitio.',
        ],
      },
      {
        title: '2. Fase Beta y Lista de Espera',
        paragraphs: [
          'Fixed se encuentra actualmente en fase de desarrollo (Beta privada). Este sitio es una landing page de carácter informativo. Todas las predicciones, cuotas y métricas que se muestran aquí son simulaciones de carácter ilustrativo e histórico. No constituyen recomendaciones en vivo ni garantizan el acceso a un servicio de pago activo.',
          'Al registrar su correo electrónico en la lista de espera, usted declara y garantiza que tiene al menos 18 años de edad. Fixed se reserva el derecho de eliminar cualquier registro de forma inmediata si sospechamos que el usuario no cumple con este requisito de edad.',
        ],
      },
      {
        title: '3. Limitación de Responsabilidad',
        paragraphs: [
          'Fixed no se hace responsable de pérdidas financieras, apuestas o decisiones tomadas con base en la información ilustrativa de este sitio. Al no existir servicios de pago ni pasarelas de cobro activas en esta landing page, no se asume responsabilidad contractual ni obligación de reembolso.',
        ],
      },
      {
        title: '4. Propiedad Intelectual',
        paragraphs: [
          'Todo el contenido visual, diseño de interfaz, textos, logotipos y conceptos de procesamiento de IA mostrados en el sitio son propiedad exclusiva de Fixed y están protegidos por las leyes de propiedad intelectual.',
        ],
      },
      {
        title: '5. Legislación Aplicable',
        paragraphs: [
          'Estos términos se rigen preliminarmente por las leyes de la República del Perú. Cualquier consulta legal o disputa se someterá a los tribunales competentes de Lima, Perú.',
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
