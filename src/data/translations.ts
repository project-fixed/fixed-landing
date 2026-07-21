export const translations = {
  en: {
    navbar: {
      home: 'Home',
      features: 'Features',
      process: 'Process',
      layers: 'Layers',
      steps: 'Process',
      about: 'About',
      plans: 'Plans',
      faq: 'FAQ',
    },
    button: {
      join: 'Join Beta',
      getStarted: 'Get Started',
      selectPlan: 'Select Plan',
      currentPlan: 'Current Plan',
    },
    landing: {
      home: {
        hero: {
          title: {
            start: 'We transform',
            center: 'football complexity into',
            end: 'clear decisions',
          },
          description:
            'Predictive intelligence for sports betting. Decisions backed by data, not instinct.',
          betaPlaceholder: 'Enter your email for early access...',
          betaButton: 'Join Beta',
          betaLoadingButton: 'Joining...',
          betaSuccess: 'Thank you! You have successfully joined the waitlist.',
          betaErrorInvalid: 'Please enter a valid email address.',
          betaErrorDuplicate:
            'This email is already registered on the waitlist.',
          betaErrorGeneric: 'An error occurred. Please try again later.',
          online: '10k people online',
          oddsTitle: 'Latest Opportunities Detected by the Model',
          key: {
            point1: {
              title: '12%',
              description: 'Historical Yield delivered by our predictive model',
            },
            point2: {
              title: '65%',
              description: 'Hit rate accuracy across isolated value bets',
            },
            point3: {
              title: '>5%',
              description: 'Minimum Expected Value (EV) threshold',
            },
            point4: {
              title: '5%',
              description: 'Max Kelly Criterion bankroll allocation per pick',
            },
          },
        },
        datastream: [
          'Ingesting Sports API data (Top 5 European Leagues)...',
          'Updating Dynamic ELO Ratings and team form vectors...',
          'Executing daily XGBoost Champion vs Challenger training...',
          'Filtering opportunities with Expected Value (EV > 5%)...',
          'Calculating optimal stakes via Kelly Criterion (Cap: 5%)...',
          'Categorizing confidence levels (La Fija, Medium, Low)...',
          'Syncing predictions to Supabase database & Webhooks...',
          'Resolving settled bets and updating Yield metrics...',
        ],
        features: {
          title: 'The End of Intuition. Applied Quantitative Intelligence.',
          description:
            'We strip away market noise and replace speculation with mathematical conviction. Explore our interactive dashboard designed to expose structural value across the top 5 European leagues.',
          accordion: {
            item1: {
              title: 'Interactive Multi-League Dashboard',
              subtitle: 'Real-time organization by league',
              description:
                'Filter value bets instantly across LaLiga, Premier League, Serie A, Bundesliga, and Ligue 1 in dedicated columns.',
            },
            item2: {
              title: 'Deep Match Analysis & Markets Breakdown',
              subtitle: 'Granular statistics per team',
              description:
                'Examine detailed statistical projections for 5 core markets: Goals, Shots, Shots on Target, Corners, and Yellow Cards.',
            },
            item3: {
              title: 'Confidence Tiering & Top Value Bets',
              subtitle: 'Ranks led by "La Fija"',
              description:
                'Prioritize recommendations grouped by confidence level—from high-conviction "La Fija" to balanced medium and low risk options.',
            },
            item4: {
              title: 'Kelly Stake & Expected Value (EV%)',
              subtitle: 'Strict bankroll management',
              description:
                'Never guess how much to wager. Every pick includes exact EV percentage and recommended Kelly Criterion allocation.',
            },
          },
        },
        ai: {
          layers: {
            title: 'Analytical Pipeline Layers',
            description:
              'Our engine processes matches through four quantitative layers before triggering a value recommendation.',
            layer1: {
              title: 'Dynamic ELO Rating',
              description:
                'Continuous adjustment of team power metrics, head-to-head dominance, and form vectors.',
            },
            layer2: {
              title: 'Feature Engineering',
              description:
                'Ingestion of historical match statistics across 5 target markets from official Sports API sources.',
            },
            layer3: {
              title: 'XGBoost ML Engine',
              description:
                'Daily Champion vs Challenger tree-based model re-training to adapt to rapid performance shifts.',
            },
            layer4: {
              title: 'Value & Risk Optimization',
              description:
                'Filtering EV > 5% opportunities and calculating conservative Kelly Criterion stakes (Max 5%).',
            },
          },
          process: {
            title: 'How Fixed Works',
            description:
              'A transparent look into how we turn complex football data into profitable decisions.',
            step1: {
              title: 'Account & Auth',
              description:
                'Sign up securely with Supabase Auth to access the full quantitative dashboard.',
            },
            step2: {
              title: 'Explore the Dashboard',
              description:
                'View daily Value Bets categorized across the top 5 European leagues with live Hit Rate and Yield stats.',
            },
            step3: {
              title: 'Inspect Match Deep Dives',
              description:
                'Analyze team-by-team breakdowns for Goals, Shots, Shots on Target, Corners, and Yellow Cards.',
            },
            step4: {
              title: 'Execute Recommended Kelly Stake',
              description:
                'Follow the EV% calculations and Kelly Criterion stake limits to execute bets on your favorite sportsbook.',
            },
          },
        },
        steps: {
          title: 'Quick Guide: How to Use Our Platform',
          description:
            'Follow these simple steps to make the most of our sports betting platform.',
          step1: {
            title: '1. Sign Up',
            description:
              'Create an account securely using Supabase Auth to unlock access to the dashboard.',
          },
          step2: {
            title: '2. Access Dashboard',
            description:
              'Log in to view live Value Bets sorted across top 5 European leagues.',
          },
          step3: {
            title: '3. Explore Match Deep Dives',
            description:
              'Inspect team statistics for Goals, Shots, Corners, and Cards for any fixture.',
          },
          step4: {
            title: '4. Check Top Value Bets',
            description:
              'Filter recommendations by confidence tier: La Fija, Medium, or Low risk.',
          },
          step5: {
            title: '5. Place Your Bet with Kelly Stake',
            description:
              'Apply the exact recommended Kelly Criterion bankroll percentage at your preferred sportsbook.',
          },
        },
        about: {
          title: 'About Us',
          subtitle: 'The Mathematical Edge',
          description:
            'We are a quantitative data intelligence firm focused on the sports market. Built by software engineers and data analysts, Fixed leverages machine learning (XGBoost) and Dynamic ELO ratings to strip away market noise and expose structural value. Our model only highlights picks with positive Expected Value (EV > 5%), giving you a clear mathematical edge.',
        },
      },
      plans: {
        title: 'Institutional Grade Predictive Intelligence',
        description:
          'Join the waitlist to access our quantitative dashboard and value bet notifications.',
        plan: {
          free: {
            title: 'Beta Access',
            price: 'Free / Waitlist',
            description: 'Early access to the interactive dashboard.',
            features: {
              feature1: 'Full dashboard access across Top 5 European leagues',
              feature2: 'Live Hit Rate (65%) and Yield (12%) tracking',
              feature3: 'Match deep dives across 5 core markets',
            },
          },
          premium: {
            title: 'Pro Suite',
            price: 'Coming Soon',
            description:
              'Advanced features for high-frequency quantitative bettors.',
            features: {
              feature1: 'All Beta Access features included',
              feature2: 'Automated webhook alerts & custom thresholds',
              feature3: 'Historical database export & API access',
              feature4: 'Priority support and custom bankroll models',
            },
          },
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        description:
          'Find out everything you need to know about our quantitative sports intelligence platform.',
        questions: {
          question1: {
            title: 'How does Fixed generate betting recommendations?',
            answer:
              'We combine Dynamic ELO Ratings with daily re-trained XGBoost machine learning models (Champion vs Challenger). The system calculates the true mathematical probability of outcomes and only recommends picks when Expected Value (EV) exceeds 5%.',
          },
          question2: {
            title: 'What markets and leagues are supported?',
            answer:
              'We focus on the top 5 European leagues (LaLiga, Premier League, Serie A, Bundesliga, Ligue 1) across 5 high-volume statistical markets: Goals, Shots, Shots on Target, Corners, and Yellow Cards.',
          },
          question3: {
            title: 'What performance metrics can I expect?',
            answer:
              'Our model maintains a verified historical Hit Rate of ~65% and a Yield of ~12%. Rather than promising impossible win rates, we focus on consistent long-term mathematical edge through Expected Value.',
          },
          question4: {
            title: 'How does bankroll management work with Kelly Criterion?',
            answer:
              'Every recommendation includes a recommended stake percentage calculated using the Kelly Criterion, capped at a conservative maximum of 5% of your total bankroll to protect capital.',
          },
          question5: {
            title: 'How do I access the platform?',
            answer:
              'Simply join our Beta waitlist with your email. Once granted access, you can authenticate via Supabase Auth to explore the full dashboard and match analysis views.',
          },
        },
      },
      footer: {
        title: 'Fixed',
        description:
          'Institutional-grade predictive analytics for football markets.',
        link: {
          dimensions: {
            product: 'Product',
            more: 'More',
          },
          company: {
            termsOfService: 'Terms of Service',
            privacyPolicy: 'Privacy Policy',
            cookies: 'Cookies',
          },
        },
      },
    },
  },
  es: {
    navbar: {
      home: 'Inicio',
      features: 'Detalles',
      process: 'Proceso',
      layers: 'Capas',
      steps: 'Proceso',
      about: 'Acerca',
      plans: 'Planes',
      faq: 'Manual',
    },
    button: {
      join: 'Únete a la Beta',
      getStarted: 'Comenzar',
      selectPlan: 'Seleccionar Plan',
      currentPlan: 'Plan Actual',
    },
    landing: {
      home: {
        hero: {
          title: {
            start: 'Transformamos',
            center: 'la complejidad del fútbol en',
            end: 'decisiones claras',
          },
          description:
            'Inteligencia predictiva para apuestas deportivas. Decisiones respaldadas por datos, no por instinto.',
          betaPlaceholder: 'Ingresa tu email para acceso anticipado...',
          betaButton: 'Unirse a la Beta',
          betaLoadingButton: 'Uniéndose...',
          betaSuccess: '¡Gracias! Te has unido a la lista de espera con éxito.',
          betaErrorInvalid:
            'Por favor, introduce un correo electrónico válido.',
          betaErrorDuplicate:
            'Este correo ya está registrado en la lista de espera.',
          betaErrorGeneric:
            'Hubo un error. Por favor, inténtalo de nuevo más tarde.',
          online: '10k personas en línea',
          oddsTitle: 'Últimas Oportunidades Detectadas por el Modelo',
          key: {
            point1: {
              title: '12%',
              description: 'Yield histórico sostenido por el modelo predictivo',
            },
            point2: {
              title: '65%',
              description: 'Tasa de acierto (Hit Rate) en apuestas de valor',
            },
            point3: {
              title: '>5%',
              description: 'Umbral mínimo de Valor Esperado (EV)',
            },
            point4: {
              title: '5%',
              description: 'Límite máximo de gestión de bankroll (Kelly)',
            },
          },
        },
        datastream: [
          'Ingiriendo datos de Sports API (5 ligas principales europeas)...',
          'Actualizando Ratings ELO Dinámicos y vectores de forma...',
          'Ejecutando entrenamiento diario XGBoost (Champion vs Challenger)...',
          'Filtrando oportunidades con Valor Esperado (EV > 5%)...',
          'Calculando stake óptimo vía Criterio de Kelly (Límite: 5%)...',
          'Categorizando nivel de confianza (La Fija, Media, Baja)...',
          'Sincronizando predicciones en Supabase y Webhooks...',
          'Resolviendo apuestas finalizadas y actualizando métricas de Yield...',
        ],
        features: {
          title: 'El Fin de la Intuición. Inteligencia Cuantitativa Aplicada.',
          description:
            'Eliminamos el ruido del mercado y reemplazamos la especulación con convicción matemática. Explora nuestro dashboard interactivo diseñado para exponer valor estructural en las 5 principales ligas europeas.',
          accordion: {
            item1: {
              title: 'Dashboard Multiliga Interactivo',
              subtitle: 'Organización por liga en tiempo real',
              description:
                'Filtra las apuestas de valor al instante en LaLiga, Premier League, Serie A, Bundesliga y Ligue 1 organizadas en columnas dedicadas.',
            },
            item2: {
              title: 'Análisis Detallado por Partido y Mercados',
              subtitle: 'Proyecciones granulares por equipo',
              description:
                'Examina proyecciones estadísticas en 5 mercados clave: Goles, Tiros, Tiros a Puerta, Córners y Tarjetas Amarillas.',
            },
            item3: {
              title: 'Niveles de Confianza y Top Value Bets',
              subtitle: 'Rankings encabezados por "La Fija"',
              description:
                'Prioriza recomendaciones agrupadas por nivel de confianza: desde la convicción alta ("La Fija") hasta opciones de riesgo medio y bajo.',
            },
            item4: {
              title: 'Stake de Kelly y Valor Esperado (EV%)',
              subtitle: 'Gestión estricta de bankroll',
              description:
                'Sin adivinanzas sobre cuánto apostar. Cada oportunidad incluye el porcentaje de EV y la asignación sugerida por el Criterio de Kelly.',
            },
          },
        },
        ai: {
          layers: {
            title: 'Capas del Pipeline Analítico',
            description:
              'Nuestro motor procesa los partidos a través de cuatro capas cuantitativas antes de emitir una recomendación de valor.',
            layer1: {
              title: 'Rating ELO Dinámico',
              description:
                'Ajuste continuo del poder de equipo, dominancia H2H y vectores de forma reciente.',
            },
            layer2: {
              title: 'Ingeniería de Features',
              description:
                'Ingesta de estadísticas históricas en 5 mercados clave desde fuentes oficiales de Sports API.',
            },
            layer3: {
              title: 'Motor ML XGBoost',
              description:
                'Re-entrenamiento diario Champion vs Challenger basado en árboles para adaptarse al rendimiento.',
            },
            layer4: {
              title: 'Optimización de Valor y Riesgo',
              description:
                'Filtrado de oportunidades con EV > 5% y cálculo de stake conservador por Criterio de Kelly (Máx 5%).',
            },
          },
          process: {
            title: 'Cómo Funciona Fixed',
            description:
              'Una mirada transparente a cómo convertimos datos complejos de fútbol en decisiones rentables.',
            step1: {
              title: 'Cuenta y Autenticación',
              description:
                'Regístrate de forma segura con Supabase Auth para acceder al dashboard cuantitativo completo.',
            },
            step2: {
              title: 'Explora el Dashboard',
              description:
                'Consulta las Value Bets diarias por liga europea con métricas de Hit Rate e Yield en tiempo real.',
            },
            step3: {
              title: 'Analiza los Partidos en Detalle',
              description:
                'Examina el desglose equipo por equipo en Goles, Tiros, Tiros a Puerta, Córners y Tarjetas.',
            },
            step4: {
              title: 'Ejecuta con el Stake de Kelly',
              description:
                'Sigue el porcentaje de EV y los límites de bankroll del Criterio de Kelly en tu casa de apuestas favorita.',
            },
          },
        },
        steps: {
          title: 'Guía Rápida: Cómo Usar Nuestra Plataforma',
          description:
            'Sigue estos simples pasos para aprovechar al máximo nuestra plataforma de apuestas deportivas.',
          step1: {
            title: '1. Regístrate',
            description:
              'Crea una cuenta de forma segura mediante Supabase Auth para desbloquear el acceso al dashboard.',
          },
          step2: {
            title: '2. Accede al Dashboard',
            description:
              'Inicia sesión para consultar las Value Bets en vivo organizadas por las 5 principales ligas europeas.',
          },
          step3: {
            title: '3. Explora el Análisis del Partido',
            description:
              'Inspecciona las estadísticas del equipo para Goles, Tiros, Córners y Tarjetas en cualquier encuentro.',
          },
          step4: {
            title: '4. Revisa las Top Value Bets',
            description:
              'Filtra recomendaciones según el nivel de confianza: La Fija, Riesgo Medio o Bajo.',
          },
          step5: {
            title: '5. Realiza tu Apuesta con Stake Kelly',
            description:
              'Aplica el porcentaje de bankroll exacto sugerido por el Criterio de Kelly en tu casa de apuestas preferida.',
          },
        },
        about: {
          title: 'Sobre Nosotros',
          subtitle: 'La Ventaja Matemática',
          description:
            'Somos una firma de inteligencia de datos cuantitativos enfocada en el mercado deportivo. Construida por ingenieros de software y analistas de datos, Fixed aprovecha el aprendizaje automático (XGBoost) y ratings de ELO Dinámico para eliminar el ruido del mercado y exponer valor estructural. Nuestro modelo solo resalta selecciones con Valor Esperado positivo (EV > 5%), brindándote una clara ventaja matemática.',
        },
      },
      plans: {
        title: 'Inteligencia Predictiva de Grado Institucional',
        description:
          'Únete a la lista de espera para acceder a nuestro dashboard cuantitativo y alertas de apuestas de valor.',
        plan: {
          free: {
            title: 'Acceso Beta',
            price: 'Gratis / Espera',
            description: 'Acceso anticipado al dashboard interactivo.',
            features: {
              feature1: 'Acceso completo al dashboard de las 5 ligas top',
              feature2: 'Monitoreo de Hit Rate (65%) e Yield (12%) en vivo',
              feature3: 'Análisis detallado por partido en 5 mercados clave',
            },
          },
          premium: {
            title: 'Suite Pro',
            price: 'Próximamente',
            description:
              'Funciones avanzadas para apostadores cuantitativos de alta frecuencia.',
            features: {
              feature1: 'Todas las características del Acceso Beta',
              feature2: 'Alertas automatizadas vía webhook y umbrales a medida',
              feature3: 'Exportación de base de datos histórica y acceso a API',
              feature4:
                'Soporte prioritario y modelos de bankroll personalizados',
            },
          },
        },
      },
      faq: {
        title: 'Preguntas Frecuentes',
        description:
          'Descubre todo lo que necesitas saber sobre nuestra plataforma de inteligencia deportiva cuantitativa.',
        questions: {
          question1: {
            title: '¿Cómo genera Fixed sus recomendaciones de apuestas?',
            answer:
              'Combinamos Ratings ELO Dinámicos con modelos de aprendizaje automático XGBoost re-entrenados diariamente (Champion vs Challenger). El sistema calcula la probabilidad matemática real de los resultados y solo recomienda jugadas cuando el Valor Esperado (EV) supera el 5%.',
          },
          question2: {
            title: '¿Qué mercados y ligas están soportados?',
            answer:
              'Nos enfocamos en las 5 principales ligas europeas (LaLiga, Premier League, Serie A, Bundesliga, Ligue 1) a través de 5 mercados estadísticos de alto volumen: Goles, Tiros, Tiros a Puerta, Córners y Tarjetas Amarillas.',
          },
          question3: {
            title: '¿Qué métricas de rendimiento puedo esperar?',
            answer:
              'Nuestro modelo mantiene un Hit Rate histórico verificado de ~65% y un Yield de ~12%. En lugar de prometer tasas de acierto imposibles, nos enfocamos en una ventaja matemática constante a largo plazo a través del Valor Esperado.',
          },
          question4: {
            title:
              '¿Cómo funciona la gestión de bankroll con el Criterio de Kelly?',
            answer:
              'Cada recomendación incluye un porcentaje de stake sugerido calculado mediante el Criterio de Kelly, limitado a un máximo conservador del 5% de tu bankroll total para proteger el capital.',
          },
          question5: {
            title: '¿Cómo accedo a la plataforma?',
            answer:
              'Simplemente únete a nuestra lista de espera Beta introduciendo tu correo. Una vez otorgado el acceso, podrás autenticarte vía Supabase Auth para explorar el dashboard completo y las vistas de análisis por partido.',
          },
        },
      },
      footer: {
        title: 'Fixed',
        description:
          'Análisis predictivo de grado institucional para mercados de fútbol.',
        link: {
          dimensions: {
            product: 'Producto',
            more: 'Más',
          },
          company: {
            termsOfService: 'Términos de Servicio',
            privacyPolicy: 'Políticas de Privacidad',
            cookies: 'Cookies',
          },
        },
      },
    },
  },
};

export type Lang = 'en' | 'es';
export type Translations = (typeof translations)['en'];

export function useTranslations(lang: Lang) {
  return translations[lang] || translations.en;
}
