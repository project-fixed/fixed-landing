# 🤝 Contratos de Interfaz

Este proyecto es una **landing page 100% frontend** sin API propia. No expone endpoints HTTP. Los contratos definidos aquí corresponden a las estructuras de datos internas y las integraciones externas.

## Estructuras de Datos (MVP)

### Plan

Definido en `src/data/plans.ts`.

```typescript
interface Plan {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  icon: string;
  backgroundColor: string;
}
```

**Valores actuales:**

| Campo             | Plan Free | Plan Standard |
| ----------------- | --------- | ------------- |
| `id`              | `"1"`     | `"2"`         |
| `price`           | `0`       | `9.99`        |
| `currency`        | `USD`     | `USD`         |
| `features.length` | 4         | 6             |

### Traducciones

Definido en `src/data/translations.ts`.

```typescript
type Lang = 'en' | 'es'

interface Translations {
  navbar: { ... }
  button: { ... }
  landing: {
    home: {
      hero: { title, subtitle, key: { point1-point6 }, ... }
      layers: { title, level1-level4 }
      process: { title, step1-step4 }
      datastream: string[]
      odds: { title, status }
    }
    plans: { title, description, button, ... }
    faq: { title, questions: { question1-question5 } }
    footer: { title, description, copyright, ... }
  }
}

function useTranslations(lang: Lang): Translations
```

## Integraciones Externas

### Autenticación (Alcance Futuro / Post-MVP)

| Integración    | URL                              | Propósito           | MVP           |
| -------------- | -------------------------------- | ------------------- | ------------- |
| App Platform   | `https://app.fixed.com/auth`     | Login/Registro      | No (Post-MVP) |
| PrimeFaces CDN | `https://primefaces.org/cdn/...` | Avatars de usuarios | Sí            |

### Parámetros de Redirección

```typescript
// Hacia app.fixed.com/auth
`https://app.fixed.com/auth?lang=${lang}` // Desde Hero CTA
`https://app.fixed.com/auth?lang=${lang}&plan=${planId}`; // Desde PlanCard
```

## Cookies

| Cookie     | Dominio      | Propósito              | Duración |
| ---------- | ------------ | ---------------------- | -------- |
| `language` | `.fixed.com` | Persistencia de idioma | Sesión   |

## Políticas de Seguridad

- **MVP:** Sin autenticación. Solo contenido público estático.
- **Formulario de email en Footer:** Captura de correo para lista de espera beta (sin backend implementado en este repo).
- **Post-MVP:** Integración con `app.fixed.com` para auth, dashboard y pagos.

## 🔗 Referencias

- [🏗️ Arquitectura Técnica](ARCHITECTURE.md)
- [🗺️ Roadmap de Producto](ROADMAP.md)
- [🎯 Alcance MVP](SCOPE.md)
- [🎨 Sistema de Diseño](../DESIGN.md)
