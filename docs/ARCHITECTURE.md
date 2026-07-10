# 🏗️ Arquitectura Técnica

## Diagrama de Sistema

```mermaid
graph TD
    A[Usuario] --> B[CDN / Vercel Edge]
    B --> C[Next.js 16 App Router]
    C --> D[Static Generation SSG]
    D --> E[Component Tree]
    E --> F[src/components/]
    E --> G[src/app/[lang]/pages]
    G --> H[Layout [lang]]
    H --> I[Toolbar + Footer]
    H --> J[Page Content]

    subgraph "Data Layer"
        K[src/data/translations.ts]
        L[src/data/plans.ts]
        M[src/assets/images/]
    end

    subgraph "External"
        N[https://app.fixed.com/auth]
        O[PrimeFaces CDN - Avatars]
    end

    E --> K
    E --> L
    E --> M
    E --> N
    E --> O
```

## Flujo de Datos

**Flujo Síncrono (Renderizado):**
1. Next.js genera estáticamente (`generateStaticParams`) las rutas `[lang]/en` y `[lang]/es`
2. El layout base inyecta fuentes Google Fonts, CSS global y configura el tema dark
3. Cada página recibe `lang` como parámetro y lo pasa al hook `useTranslations()`
4. Los componentes consumen `translations[lang]` para renderizar contenido bilingüe
5. Assets estáticos (imágenes, logos) se sirven desde `src/assets/` o `public/`

**Flujo de Traducción:**
- `lang` (params) → `useTranslations(lang)` → objeto `t` → componentes renderizan `t.landing.home.hero.title`
- Sin dependencias externas de i18n (implementación casera en `translations.ts`)

## Componentes Principales

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `Toolbar` | Navegación | Header sticky, nav links, CTA, drawer mobile |
| `PitchGeometryBackground` | Decorativo | Fondo SVG de cancha 3D |
| `FloatingKeyPoints` | Decorativo | Partículas flotantes con parallax |
| `OddsMarquee` | Datos | 3 filas de cards de predicciones scrolleables |
| `KeyPointsGrid` | Datos | Métricas estáticas (75K, 92.5%, 30+) |
| `KeyPointsCarousel` | Datos | Carrusel de métricas en Hero |
| `HeroImagesCascade` | Datos | Screenshots rotativos de widgets |
| `ScrollExpandVideo` | Interactivo | Expansión scroll-driven del dashboard |
| `AITimeline` | Contenido | Timeline 4 pasos del proceso IA |
| `DataStreamMarquee` | Decorativo | Terminal scrolling de logs |
| `AILayers` | Contenido | Grid de 4 capas de análisis |
| `BrandsCarousel` | Datos | Logos partners (marquee infinito) |
| `FaqAccordion` | Contenido | Acordeón FAQ con selector numérico |
| `PlanCard` | Contenido | Card de plan (Free/Standard) |
| `Footer` | Navegación | Formulario beta, links legales, copyright |
| `TranslateButton` | Utilidad | Toggle EN/ES con cookie |

## Ambientes y Despliegue

| Ambiente | URL | Infraestructura | CI/CD |
|---|---|---|---|
| Development | `localhost:3000` | Local | - |
| Production | `https://fixed.com` | Vercel | GitHub Actions + semantic-release |

## Decisiones Arquitectónicas

> **Decisión:** No se usa `next-intl` ni librería de i18n. Las traducciones se manejan con un hook `useTranslations()` casero desde `src/data/translations.ts`. Esto mantiene cero dependencias externas y control total sobre el contenido.

> **Decisión:** Tailwind CSS v4 con configuración inline en `global.css` via `@theme`. Sin `tailwind.config.js`. Esto permite aprovechar el nuevo sistema de tokens nativo de Tailwind v4.

> **Decisión:** Tema dark exclusivo. Sin soporte de tema claro. La clase `dark` se fija directamente en el `<html>` desde el layout.

> **Decisión:** Generación estática (SSG) para todas las páginas. Sin ISR ni SSR. El contenido es 100% estático y no depende de APIs externas en tiempo de render.

## 🔗 Referencias

- [🤝 Contratos de Interfaz](CONTRACTS.md)
- [🗺️ Roadmap de Producto](ROADMAP.md)
- [🎯 Alcance MVP](SCOPE.md)
- [🎨 Sistema de Diseño](../DESIGN.md)
