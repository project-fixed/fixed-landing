# 🤝 Contratos de Interfaz

Este proyecto es principalmente una landing page frontend que expone un **endpoint de API interno** para la recolección de usuarios de la beta. Los contratos definidos aquí corresponden a la API interna, las estructuras de datos y las integraciones externas.

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

## API Interna

### `POST /api/beta`

Registra un correo en la lista de espera de la beta privada.

- **URL**: `/api/beta`
- **Método**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:

```typescript
interface BetaRequest {
  email: string;
  lang: 'es' | 'en';
}
```

- **Respuestas**:
  - `200 OK`: Suscripción completada exitosamente.
    ```json
    { "message": "Successfully subscribed to the beta!" }
    ```
  - `400 Bad Request`: Email no válido o ausente.
    ```json
    { "message": "Invalid email address." }
    ```
  - `409 Conflict`: El correo electrónico ya se encuentra registrado.
    ```json
    { "message": "This email is already registered." }
    ```
  - `429 Too Many Requests`: Se superó el límite de peticiones (rate limiting).
    ```json
    { "message": "Too many requests. Please try again in a minute." }
    ```
  - `500 Internal Server Error`: Fallo interno del servidor al procesar la solicitud.
    ```json
    { "message": "An unexpected server error occurred." }
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

- **MVP**: Sin autenticación de sesión en el frontend. Las páginas son públicas.
- **Validación del Servidor**: El endpoint `/api/beta` valida y sanitiza de forma estricta el correo electrónico antes de interactuar con el backend/base de datos.
- **Protección contra Abuso**: Se implementa un limitador de tasa (rate limiting) basado en la IP del cliente (máx. 5 req/min) en `/api/beta`.
- **Post-MVP**: Integración con `app.fixed.com` para auth completa, dashboards interactivos y pasarelas de pago.

## 🔗 Referencias

- [🏗️ Arquitectura Técnica](ARCHITECTURE.md)
- [🗄️ Modelo de Base de Datos](DATABASE.md)
- [🗺️ Roadmap de Producto](ROADMAP.md)
- [🎯 Alcance MVP](SCOPE.md)
- [🎨 Sistema de Diseño](../DESIGN.md)
