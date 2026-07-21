---
name: Fixed
version: 1.1.0
description: Minimalist luxury tech aesthetic for a predictive sports betting intelligence platform. Dark theme with steel blue accents, thin border structures, and high typographic contrast.
colors:
  primary: '#3e5d6c'
  primary-light: '#9ec1d4'
  primary-dark: '#2c4350'
  primary-darker: '#1e2f38'
  primary-darkest: '#152027'
  background: 'oklch(0.09 0 0)'
  surface-card: 'oklch(0.18 0 0)'
  surface-deep: 'oklch(0.14 0 0)'
  text-primary: 'oklch(0.985 0 0)'
  text-body: 'oklch(0.7 0 0)'
  text-muted: 'oklch(0.55 0 0)'
  text-faint: 'oklch(0.4 0 0)'
  success: '#22c55e'
typography:
  sans:
    fontFamily: 'Inter, ui-sans-serif, sans-serif'
  mono:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  '2xl': 24px
components:
  container:
    borderColor: 'rgba(255, 255, 255, 0.05)'
    backgroundColor: 'rgba(255, 255, 255, 0.02)'
  waitlist-card:
    borderColor: 'rgba(255, 255, 255, 0.15)'
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
    backdropBlur: 'sm'
---

## Overview

Fixed utiliza una estética **Minimalist Luxury Tech** extremadamente limpia, basada en fondos oscuros profundos, acentos en steel blue, líneas finas de retícula y una jerarquía tipográfica rigurosa. Se descarta cualquier tipo de degradado vibrante, sombras pesadas o formas orgánicas llamativas (blobs), priorizando la sobriedad y la precisión del dato.

## Colors

La paleta se centra en tonos oscuros planos y el color steel blue como único acento de interacción y marca.

| Token             | Color/Hex         | Uso                                        |
| ----------------- | ----------------- | ------------------------------------------ |
| `primary`         | `#3e5d6c`         | Color de marca, acentos de estado, bordes  |
| `primary-light`   | `#9ec1d4`         | Hover states y detalles                    |
| `primary-darkest` | `#152027`         | Color base para degradado de iluminación   |
| `background`      | `oklch(0.09 0 0)` | Fondo principal de la aplicación           |
| `surface-card`    | `oklch(0.18 0 0)` | Fondo de elementos interactivos y popovers |
| `text-primary`    | `oklch(0.985 0)`  | Títulos principales, números destacados    |
| `text-body`       | `oklch(0.7 0 0)`  | Párrafos y descripciones                   |
| `text-muted`      | `oklch(0.55 0)`   | Textos secundarios y labels en mono        |
| `text-faint`      | `oklch(0.4 0 0)`  | Separadores sutiles y labels de categoría  |
| `status-success`  | `#22c55e`         | Indicador de estado activo (Open Beta)     |

## Typography

- **Mono (JetBrains Mono)**: Reservado para encabezados principales (`h1`, `h2`), números de telemetría/estadísticas, badges de estado, etiquetas de navegación/categoría, y botones interactivos. Generalmente en mayúsculas (uppercase) y con tracking abierto para reforzar el carácter técnico.
- **Sans (Inter)**: Utilizado exclusivamente para el cuerpo de texto, párrafos largos, explicaciones detalladas y subtítulos de apoyo. Garantiza legibilidad y contraste.

## Layout

- Contenedores alineados con `page-section` que aplican padding lateral responsivo de forma uniforme.
- Secciones divididas horizontalmente mediante bordes sutiles de color blanco translúcido (`border-y border-white/5` o `border-t border-white/[0.06]`).
- Ausencia de grids complejos o desordenados; el layout fluye de manera lineal en mobile y se reordena en dos columnas en desktop cuando hay formularios o CTA secundarios.

## Elevation, Depth & Borders

- **Sin elevaciones complejas**: Se eliminan las sombras. La profundidad se genera exclusivamente superponiendo elementos mediante el uso de opacidad y bordes finos.
- **Bordes de precisión**: Se usan bordes con baja opacidad (`border-white/5`, `border-white/10`, `border-white/[0.06]`) para delimitar contenedores sin sobrecargar la interfaz.
- **Efecto de iluminación**: Un gradiente radial muy sutil (`radial-gradient`) en el fondo simula una luz cenital lejana, desvaneciéndose hacia el negro absoluto en la parte inferior.

## Animations

- `marqueeScroll` / `scrollLeft` / `scrollRight`: Usadas para la transmisión continua de odds y datos de forma fluida a 40 segundos por ciclo.
- `ScrollExpandVideo`: Una animación suave controlada por scroll (`motion`) que escala los elementos multimedia (imágenes del dashboard) a pantalla completa de forma inmersiva.

## Key Components

- **HeroBadge**: Indicador de versión con borde fino (`border-white/10`), fondo translúcido y un punto verde pulsante que indica estado activo en tiempo real.
- **BetaForm**: Campo de entrada limpio y minimalista, con bordes de precisión e input inline.
- **ScrollExpandVideo**: Contenedor interactivo que responde al scroll y muestra el dashboard del producto sin bordes ni adornos pesados.
- **Accordion (Shadcn)**: Componente de acordeón reconstruido sobre `@base-ui/react`. Cada pregunta se presenta con tipografía mono, color atenuado (`text-white/50`) que se ilumina al hacer hover (`hover:text-white`), y dividida por una línea horizontal delgada. La respuesta se despliega de manera fluida usando animaciones de alto rendimiento.

## Do's and Don't's

### Do:

- Usar `font-mono` para títulos y labels técnicos, y `font-sans` para los textos explicativos.
- Mantener las líneas divisorias extremadamente finas y con baja opacidad.
- Mantener una paleta cromática restringida a negro, acero (steel blue) y blanco.
- Asegurar que la legibilidad del texto en contraste con el fondo sea óptima.

### Don't:

- No agregar sombras a los contenedores o botones.
- No utilizar degradados de colores brillantes en botones o textos.
- No emplear esquinas redondeadas excesivas en elementos estructurales (máximo `rounded-2xl` para bloques de CTA grandes, de resto `rounded-lg` u ortogonal).
- No utilizar iconos coloridos ni efectos visuales llamativos.
