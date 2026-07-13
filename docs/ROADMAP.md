# 🗺️ Roadmap de Producto

## Línea de Tiempo

```mermaid
gantt
    title Roadmap Fixed Landing Page
    dateFormat  YYYY-MM-DD
    section MVP
    Landing Page Core        :a1, 2025-01-01, 90d
    Sección Hero + Odds      :a2, after a1, 30d
    Sección Producto + IA    :a3, after a2, 30d
    Planes + FAQ + Legales   :a4, after a3, 30d
    section Beta (Privada)
    Beta Privada             :b1, after a4, 60d
    Dashboard App v1         :b2, after b1, 90d
    section Retención
    Dashboard App v2         :c1, after b2, 60d
    Notificaciones Push      :c2, after c1, 45d
    Comunidad + Foros        :c3, after c2, 45d
    section Escalado
    APIs Públicas            :d1, after c3, 90d
    Planes B2B               :d2, after d1, 60d
    Apps Móviles             :d3, after d2, 120d
```

## Fases

### Fase 1: MVP — Landing Page (Actual)

| Feature                                             | Estado     | Prioridad |
| --------------------------------------------------- | ---------- | --------- |
| Hero Section con captura de email (Supabase)        | Completado | Alta      |
| OddsMarquee (predicciones en vivo)                  | MVP        | Alta      |
| KeyPointsGrid (métricas)                            | MVP        | Alta      |
| ScrollExpandVideo (dashboard reveal)                | MVP        | Alta      |
| AITimeline + AILayers (proceso IA)                  | MVP        | Alta      |
| DataStreamMarquee (terminal)                        | MVP        | Media     |
| BrandsCarousel (partners)                           | MVP        | Media     |
| Sistema de traducción EN/ES                         | MVP        | Alta      |
| Páginas: Planes, FAQ, Términos, Privacidad, Cookies | MVP        | Alta      |
| Toolbar + Footer (con BetaForm interactivo)         | Completado | Alta      |

### Fase 2: Beta Privada (Distribución y UX)

| Hito             | Descripción                                                                   | Fecha Estimada |
| ---------------- | ----------------------------------------------------------------------------- | -------------- |
| Beta Privada     | Acceso controlado con invitación. Dashboard de predicciones reales.           | Q1 2026        |
| Dashboard App v1 | Plataforma web en `app.fixed.com` con login, predicciones en vivo, historial. | Q2 2026        |

### Fase 3: Retención

| Feature             | Descripción                                                        |
| ------------------- | ------------------------------------------------------------------ |
| Dashboard v2        | Alertas personalizadas, filtros avanzados, estadísticas de usuario |
| Notificaciones Push | Alertas en tiempo real de oportunidades detectadas                 |
| Comunidad           | Foros de discusión, rankings, tipsters verificados                 |

### Fase 4: Escalado y Monetización

| Iniciativa    | Descripción                                              |
| ------------- | -------------------------------------------------------- |
| APIs Públicas | APIs de predicciones para integración de terceros        |
| Planes B2B    | Suscripciones enterprise para casas de apuestas y medios |
| Apps Móviles  | iOS y Android con notificaciones push nativas            |

## 🔗 Referencias

- [🏗️ Arquitectura Técnica](ARCHITECTURE.md)
- [🤝 Contratos de Interfaz](CONTRACTS.md)
- [🗄️ Modelo de Base de Datos](DATABASE.md)
- [🎯 Alcance MVP](SCOPE.md)
- [🎨 Sistema de Diseño](../DESIGN.md)
