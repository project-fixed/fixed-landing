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
    lastUpdated: 'Last Updated August 23, 2026',
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
            bold: 'Site Language (First-party / Preference):',
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
        title: '4. Other Technologies: Cloudflare Turnstile',
        paragraphs: [
          'In addition to the cookies described above, we use Cloudflare Turnstile as a security technology to distinguish human visitors from automated traffic (bots) and protect the site against abuse. Unlike traditional cookies, Turnstile does not store a persistent cookie or build a visitor profile: it processes transient technical browser signals (such as IP address, TLS fingerprint, and User-Agent) exclusively for security purposes, and these signals are discarded once verification is complete. Provider: Cloudflare Inc.',
        ],
      },
      {
        title: '5. Managing Cookies via Browser Settings',
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
    lastUpdated: 'Última actualización: 23 de Agosto de 2026',
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
            bold: 'Idioma del Sitio (Propia / Preferencia):',
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
        title: '4. Otras Tecnologías: Cloudflare Turnstile',
        paragraphs: [
          'Además de las cookies descritas arriba, utilizamos Cloudflare Turnstile como tecnología de seguridad para distinguir visitantes humanos de tráfico automatizado (bots) y proteger el sitio contra abuso. A diferencia de las cookies tradicionales, Turnstile no almacena una cookie persistente ni construye un perfil del visitante: procesa señales técnicas transitorias del navegador (como dirección IP, huella TLS y User-Agent) exclusivamente con fines de seguridad, y dichas señales son descartadas una vez completada la verificación. Proveedor: Cloudflare Inc.',
        ],
      },
      {
        title: '5. Controlar las Cookies desde su Navegador',
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
    lastUpdated: 'Last Updated August 23, 2026',
    sections: [
      {
        title: '1. Information Collection & Purpose',
        paragraphs: [
          'We collect basic personal information (such as your name and email address) and your IP address when you register for our private beta waitlist. Additionally, we gather non-identifiable technical browsing data (such as browser language preference) and website interaction metrics to optimize user experience.',
          'Purpose: Your personal data is used solely to manage your place in the private beta waitlist, prevent duplicate or fraudulent registrations, and send you product updates or invitations to join the platform.',
          'Legal basis: The processing of your data is based on your explicit consent, granted when registering for the waitlist.',
          'Retention period: We will retain your data for the duration of the Beta phase and until you decide to unsubscribe.',
        ],
      },
      {
        title: '2. Security Measures',
        paragraphs: [
          'Fixed implements reasonable technical, organizational, and legal measures to protect your personal data against unauthorized access, loss, alteration, or improper disclosure, including access controls to our databases and encryption of information in transit. In the event of any security incident affecting your personal data, Fixed will notify the National Authority for Personal Data Protection within the timeframes established by current regulations.',
        ],
      },
      {
        title: '3. International Data Transfers',
        paragraphs: [
          'To operate this beta phase, we share limited data with trusted third-party service providers. By using our site, you explicitly consent to the international transfer of your data to these providers, which operate in the United States:',
          '- Supabase (USA): Used as our primary secure cloud database to host registration records.',
          '- Resend (USA): Used to deliver transactional email confirmations and product updates. Each email sent contains an automatic opt-out (unsubscribe) option.',
          '- Google Analytics (USA): Processes anonymized navigation metrics and device information to help us measure site performance. No directly identifying personal details are sent to Google LLC.',
          '- Vercel Inc. (USA): Used for website hosting and aggregate, anonymous traffic measurement (Vercel Web Analytics).',
          '- Cloudflare Inc. (USA): Used via its Turnstile service to distinguish human traffic from automated traffic (bots) and protect the site against abuse. Turnstile processes technical browser signals (such as IP address and browser characteristics) solely for security purposes; Cloudflare declares that it does not use this information to identify or profile individuals.',
        ],
      },
      {
        title: '4. Your ARCO Rights, Portability & Timeframes',
        paragraphs: [
          'You have the right to Exercise your rights of Access, Rectification, Cancellation, Opposition, and Portability regarding your personal data. The timeframes for addressing your requests are:',
          '- Access: 20 business days.',
          '- Rectification, Cancellation, Opposition, Portability, and Revocation of consent: 10 business days.',
          'To exercise these rights, please contact our support channel at support@fixed.software.',
        ],
      },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: 23 de Agosto de 2026',
    sections: [
      {
        title: '1. Recopilación de Información y Finalidad (Banco de Datos)',
        paragraphs: [
          'Recopilamos información personal básica (como su nombre y correo electrónico) y su dirección IP al registrarse en la lista de espera de nuestra beta privada. Además, recopilamos datos técnicos de navegación no identificables (como el idioma de su navegador) y métricas de interacción con el sitio para optimizar la experiencia.',
          'Finalidad: Sus datos se utilizan exclusivamente para gestionar su lugar en la lista de espera de la Beta privada, evitar registros fraudulentos o duplicados, y enviarle actualizaciones o invitaciones a la plataforma.',
          'Base legal: El tratamiento de sus datos se realiza con base en su consentimiento explícito, otorgado al registrarse en la lista de espera.',
          'Plazo de conservación: Mantendremos sus datos durante el tiempo que dure la fase Beta o hasta que usted decida revocar su consentimiento (darse de baja).',
        ],
      },
      {
        title: '2. Medidas de Seguridad',
        paragraphs: [
          'Fixed implementa medidas técnicas, organizativas y legales razonables para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o divulgación indebida, incluyendo controles de acceso a nuestras bases de datos y cifrado de información en tránsito. Ante cualquier incidente de seguridad que afecte sus datos personales, Fixed notificará a la Autoridad Nacional de Protección de Datos Personales dentro de los plazos establecidos por la normativa vigente.',
        ],
      },
      {
        title: '3. Transferencia Internacional de Datos',
        paragraphs: [
          'Para el funcionamiento de esta fase Beta, compartimos información con proveedores externos. Al registrarse, usted otorga su consentimiento explícito para la transferencia internacional de sus datos a los siguientes proveedores, ubicados en Estados Unidos:',
          '- Supabase (EE.UU.): Utilizado como base de datos segura en la nube para registrar usuarios.',
          '- Resend (EE.UU.): Plataforma de distribución para enviarle confirmaciones y novedades.',
          '- Google Analytics (EE.UU.): Proveedor analítico para evaluar patrones de tráfico y rendimiento de forma agregada.',
          '- Vercel Inc. (EE.UU.): Utilizado para el alojamiento del sitio web y la medición agregada y anónima de tráfico (Vercel Web Analytics).',
          '- Cloudflare Inc. (EE.UU.): Utilizado a través de su servicio Turnstile para distinguir tráfico humano de tráfico automatizado (bots) y proteger el sitio contra abuso. Turnstile procesa señales técnicas del navegador (como dirección IP y características del navegador) con el único fin de seguridad; Cloudflare declara que no utiliza esta información para identificar ni perfilar personas.',
        ],
      },
      {
        title: '4. Derechos ARCO, Portabilidad y Plazos',
        paragraphs: [
          'Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación, Oposición y Portabilidad sobre sus datos personales. Los plazos de respuesta vigentes son los siguientes:',
          '- Acceso: 20 días hábiles.',
          '- Rectificación, Cancelación, Oposición, Portabilidad y Revocación de consentimiento: 10 días hábiles.',
          'Para ejercer cualquiera de estos derechos, envíe una solicitud directa a nuestro canal oficial: support@fixed.software.',
        ],
      },
    ],
  },
};

const termsContent: Record<Lang, LegalDoc> = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated August 23, 2026',
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
        title: '5. Modifications to the Terms',
        paragraphs: [
          'Fixed may update these Terms of Service at any time to reflect changes in the product, applicable regulations, or our practices. Any modifications will be posted on this page along with the last updated date. Material changes will also be communicated via email to users registered on the waitlist at least 15 days prior to their effective date. Continued use of the site after the publication of changes constitutes acceptance of the new terms.',
        ],
      },
      {
        title: '6. Governing Law',
        paragraphs: [
          'These terms are governed by the laws of the Republic of Peru. Any legal inquiries or disputes shall be submitted to the competent courts of Lima, Peru.',
        ],
      },
    ],
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: 23 de Agosto de 2026',
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
        title: '5. Modificaciones a los Términos',
        paragraphs: [
          'Fixed podrá actualizar estos Términos de Servicio en cualquier momento para reflejar cambios en el producto, la normativa aplicable o nuestras prácticas. Toda modificación será publicada en esta misma página junto con la fecha de última actualización. Los cambios materiales serán además comunicados por correo electrónico a los usuarios registrados en la lista de espera con al menos 15 días de anticipación a su entrada en vigencia. El uso continuado del sitio después de la publicación de cambios constituye la aceptación de los nuevos términos.',
        ],
      },
      {
        title: '6. Legislación Aplicable',
        paragraphs: [
          'Estos términos se rigen por las leyes de la República del Perú. Cualquier consulta legal o disputa se someterá a los tribunales competentes de Lima, Perú.',
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
