# 🎯 Alcance MVP

## Matriz de Control de Features

| Feature | ¿MVP? | Fase | Componente(s) | Notas |
|---|---|---|---|---|
| Hero Section | Sí | MVP | `PitchGeometryBackground`, `FloatingKeyPoints`, `KeyPointsCarousel`, `HeroImagesCascade`, `AvatarGroup` | Formulario de captura de email beta |
| Predicciones en Vivo (Marquee) | Sí | MVP | `OddsMarquee`, `OddsCard`, `OddsCarousel` | 18 predicciones hardcodeadas de ejemplo |
| Métricas y Prueba Social | Sí | MVP | `KeyPointsGrid`, `KeyPointCard` | 75K+ usuarios, 92.5% precisión, 30+ ligas |
| Dashboard Reveal (Scroll) | Sí | MVP | `ScrollExpandVideo` | Animación scroll-driven con screenshot |
| Proceso de IA (Timeline) | Sí | MVP | `AITimeline`, `AILayers`, `DataStreamMarquee` | 4 pasos, 4 capas de análisis |
| Partners y Marcas | Sí | MVP | `BrandsCarousel` | 10 logos de casas de apuestas |
| Planes y Precios | Sí | MVP | `PlanCard`, `[lang]/plans/page.tsx` | Free + Standard ($9.99) |
| FAQ | Sí | MVP | `FaqAccordion`, `[lang]/faq/page.tsx` | 5 preguntas frecuentes |
| Páginas Legales | Sí | MVP | `[lang]/terms/`, `privacy/`, `cookies/` | Términos, Privacidad, Cookies |
| Toolbar + Footer | Sí | MVP | `Toolbar`, `Footer`, `TranslateButton` | Navegación, CTA, selector de idioma |
| Traducción EN/ES | Sí | MVP | `src/data/translations.ts` | Sistema casero sin dependencias |
| Tema Dark | Sí | MVP | `global.css` | Solo dark mode |

## Exclusiones Explícitas

| Feature Excluida | Justificación |
|---|---|
| Dashboard de usuario funcional | Requiere backend con autenticación y base de datos (Post-MVP en `app.fixed.com`) |
| Autenticación / Login | El formulario de email captura leads, pero el auth real es Post-MVP |
| API de predicciones | No hay backend en este repositorio. Los datos son mock/harcodeados |
| Alertas en tiempo real | Requiere WebSockets o SSE, fuera del alcance de la landing estática |
| Apps Móviles (iOS/Android) | Proyecto separado, fase de escalado |
| Panel de administración | Requiere backend con roles y permisos |
| Integración con pasarela de pagos | Los planes se muestran pero el checkout redirige a `app.fixed.com` (Post-MVP) |
| Notificaciones push | Depende de service workers y backend de notificaciones |
| Modo claro / Light theme | Decisión deliberada de diseño "Luxury Tech" oscuro |

## Definition of Done (DoD)

Para dar una feature por completa:

- [ ] Componente implementado y funcional en EN y ES
- [ ] Animaciones y transiciones funcionando (si aplica)
- [ ] Diseño responsive (mobile + desktop)
- [ ] Linter pasa sin errores (`npm run lint`)
- [ ] Types check sin errores (`tsc --noEmit`)
- [ ] Formato Prettier aplicado (`npm run format:check`)
- [ ] Build exitoso (`npm run build`)
- [ ] Sin regresiones visuales en navegación entre páginas

## 🔗 Referencias

- [🏗️ Arquitectura Técnica](ARCHITECTURE.md)
- [🤝 Contratos de Interfaz](CONTRACTS.md)
- [🗺️ Roadmap de Producto](ROADMAP.md)
- [🎨 Sistema de Diseño](../DESIGN.md)
