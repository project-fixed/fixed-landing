# 🏗️ Arquitectura Técnica

## Diagrama de Sistema

```mermaid
graph TD
    A[Usuario] --> B[CDN / Vercel Edge]
    B --> C[Next.js 16 App Router]
    C --> D[Static Generation SSG]
    C --> DR[Dynamic Route /api/beta]
    D --> E[Component Tree]
    E --> F[src/components/]
    E --> G[src/app/[lang]/pages]
    G --> H[Layout [lang]]
    H --> I[Toolbar + Footer]
    H --> J[Page Content]

    %% Flujo del formulario beta
    I -->|Submit email| BF[BetaForm Client Component]
    J -->|Submit email| BF
    BF -->|POST request| DR

    subgraph "Data Layer"
        K[src/data/translations.ts]
        L[src/data/plans.ts]
        M[src/assets/images/]
        DB[(Supabase Database)]
        JSON[(Local Fallback JSON)]
    end

    DR -->|Insert lead| DB
    DR -->|Write local dev fallback| JSON

    subgraph "External Integrations"
        N[https://app.fixed.com/auth]
        O[PrimeFaces CDN - Avatars]
        T[Microsoft Teams Webhook]
        R[Resend API - Welcome Emails]
    end

    DR -->|Post notification| T
    DR -->|Send email| R
    E --> K
    E --> L
    E --> M
    E --> N
    E --> O
```

## Flujo de Datos

**Flujo Síncrono (Renderizado):**

1. Next.js genera estáticamente (`generateStaticParams`) las rutas `[lang]/en` y `[lang]/es`.
2. El layout base inyecta fuentes Google Fonts, CSS global y configura el tema dark.
3. Cada página recibe `lang` como parámetro y lo pasa al hook `useTranslations()`.
4. Los componentes consumen `translations[lang]` para renderizar contenido bilingüe.
5. Assets estáticos (imágenes, logos) se sirven desde `src/assets/` o `public/`.

**Flujo Asíncrono (Registro en Beta):**

1. El usuario introduce su email en el componente cliente `BetaForm` (ubicado en el Hero o Footer) y envía el formulario.
2. `BetaForm` valida el email localmente (Regex) y bloquea dobles envíos cambiando a estado `loading`.
3. Se realiza una llamada `POST` a `/api/beta`.
4. La ruta API `/api/beta` valida el email en el servidor y aplica rate limiting basado en la IP del cliente (máx. 5 req/min).
5. **Guardado de Datos**:
   - _Producción_: Se conecta mediante `@supabase/supabase-js` e inserta el correo en la tabla `beta_leads`. Retorna `409` si el email ya existe.
   - _Desarrollo (Fallback)_: Si faltan credenciales, escribe el lead en `scratch/beta_subscribers.json` local.
6. **Notificaciones Post-Registro** (Asíncronas en segundo plano):
   - Envía alertas formateadas a Microsoft Teams vía webhook si se configuró `TEAMS_WEBHOOK_URL`.
   - Envía un correo de bienvenida automático al usuario mediante la API de Resend si se configuró `RESEND_API_KEY`.
7. `BetaForm` recibe la respuesta y muestra un estado de éxito (`success`) con micro-animaciones o un mensaje de error detallado (`error`).

## Componentes Principales

| Componente                | Tipo        | Responsabilidad                               |
| ------------------------- | ----------- | --------------------------------------------- |
| `Toolbar`                 | Navegación  | Header sticky, nav links, CTA, drawer mobile  |
| `PitchGeometryBackground` | Decorativo  | Fondo SVG de cancha 3D                        |
| `FloatingKeyPoints`       | Decorativo  | Partículas flotantes con parallax             |
| `OddsMarquee`             | Datos       | 3 filas de cards de predicciones scrolleables |
| `KeyPointsGrid`           | Datos       | Métricas estáticas (75K, 92.5%, 30+)          |
| `KeyPointsCarousel`       | Datos       | Carrusel de métricas en Hero                  |
| `HeroImagesCascade`       | Datos       | Screenshots rotativos de widgets              |
| `ScrollExpandVideo`       | Interactivo | Expansión scroll-driven del dashboard         |
| `AITimeline`              | Contenido   | Timeline 4 pasos del proceso IA               |
| `DataStreamMarquee`       | Decorativo  | Terminal scrolling de logs                    |
| `AILayers`                | Contenido   | Grid de 4 capas de análisis                   |
| `BrandsCarousel`          | Datos       | Logos partners (marquee infinito)             |
| `FaqAccordion`            | Contenido   | Acordeón FAQ con selector numérico            |
| `PlanCard`                | Contenido   | Card de plan (Free/Standard)                  |
| `Footer`                  | Navegación  | Contiene el formulario Beta, links legales    |
| `BetaForm`                | Interactivo | UI de registro (loader, éxito, error, i18n)   |
| `TranslateButton`         | Utilidad    | Toggle EN/ES con cookie                       |

## Ambientes y Despliegue

| Ambiente    | URL                 | Infraestructura           | CI/CD                             |
| ----------- | ------------------- | ------------------------- | --------------------------------- |
| Development | `localhost:3000`    | Local (JSON Fallback)     | -                                 |
| Production  | `https://fixed.com` | Vercel + Supabase (Leads) | GitHub Actions + semantic-release |

## Decisiones Arquitectónicas

> **Decisión:** No se usa `next-intl` ni librería de i18n. Las traducciones se manejan con un hook `useTranslations()` casero desde `src/data/translations.ts`. Esto mantiene cero dependencias externas y control total sobre el contenido.

> **Decisión:** Tailwind CSS v4 con configuración inline en `global.css` via `@theme`. Sin `tailwind.config.js`. Esto permite aprovechar el nuevo sistema de tokens nativo de Tailwind v4.

> **Decisión:** Tema dark exclusivo. Sin soporte de tema claro. La clase `dark` se fija directamente en el `<html>` desde el layout.

> **Decisión:** Generación estática (SSG) para todas las páginas con la excepción del endpoint de la API `/api/beta` que es dinámico. Esto maximiza la velocidad de carga de la web principal manteniendo una funcionalidad interactiva de backend.

> **Decisión:** Uso de un sistema híbrido/fallback de almacenamiento de leads. Si no hay variables de entorno locales de Supabase, los correos se registran en `scratch/beta_subscribers.json` localmente. Esto agiliza el desarrollo "out-of-the-box" sin requerir configuración compleja previa para nuevos colaboradores.

## 🔗 Referencias

- [🤝 Contratos de Interfaz](CONTRACTS.md)
- [🗄️ Modelo de Base de Datos](DATABASE.md)
- [🗺️ Roadmap de Producto](ROADMAP.md)
- [🎯 Alcance MVP](SCOPE.md)
- [🎨 Sistema de Diseño](../DESIGN.md)
