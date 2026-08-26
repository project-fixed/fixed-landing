---
name: Fixed
version: 1.2.0
description: Minimalist luxury tech aesthetic for a predictive sports betting intelligence platform. Dark theme with steel blue accents, thin border structures, and high typographic contrast.
colors:
  primary: '#3e5d6c'
  primary-light: '#9ec1d4'
  primary-dark: '#2c4350'
  canvas: '#0b1013'
  surface-card: '#152027'
  surface-deep: '#10171c'
  heading: '#f8fafc'
  body: '#cbd5e1'
  muted: '#94a3b8'
  faint: '#64748b'
  border-subtle: 'rgba(248, 250, 252, 0.08)'
  border-medium: 'rgba(248, 250, 252, 0.15)'
  status-success: '#34d399'
  status-success-ping: '#6ee7b7'
typography:
  sans:
    fontFamily: 'Inter, var(--font-sans), sans-serif'
  mono:
    fontFamily: 'JetBrains Mono, var(--font-mono), monospace'
rounded:
  sm: 'calc(var(--radius) - 4px)' # ~8px
  md: 'calc(var(--radius) - 2px)' # ~10px
  lg: 'var(--radius)' # ~12px (0.75rem)
  xl: '16px'
  '2xl': '24px'
---

## Overview

Fixed utiliza una estética **Minimalist Luxury Tech** extremadamente limpia, basada en fondos oscuros entintados, acentos en steel blue, líneas finas de retícula y una jerarquía tipográfica rigurosa. Se descarta cualquier tipo de degradado vibrante para evitar saturación, priorizando la sobriedad y la precisión del dato.

---

## Colors

La paleta adopta una nomenclatura profesional escalable, usando Hexadecimal para asegurar una transición perfecta del código al _Brand Book_ y herramientas de diseño (Figma, Canva).

### 1. Brand Accents

- `primary` (`#3e5d6c`): El ADN de la marca (Steel Blue). Acentos estructurales, estado activo y bordes clave.
- `secondary` (`#6366f1`): Color de contraste de apoyo atmosférico (Indigo). Utilizado para generar profundidad en fondos, sombras sutiles y degradados ambientales.
- `primary-light` (`#9ec1d4`): Color de destaque principal (Steel Blue Light). Textos destacados, enlaces y bordes interactivos.
- `primary-dark` (`#2c4350`): Acento complementario de marca. Utilizado en bordes en hover o enfocado, y en fondos de tarjetas en baja opacidad.

### 2. Surface & Backgrounds (Tinted Neutrals)

Los fondos no usan negros puros, sino que están "entintados" para mantener armonía visual con la paleta fría.

- `background` (`#020202`): Fondo base de la aplicación (antes `oklch(0.09 0 0)`).
- `canvas` (`#0b1013`): Fondo base entintado casi negro.
- `surface-deep` (`#10171c`): Elevación sutil para paneles secundarios.
- `surface-card` (`#152027`): Elementos de mayor elevación interactiva (reemplaza al antiguo primary-darkest).

### 3. Typography Hierarchy

- `heading` (`oklch(0.985 0 0)`): Títulos principales, números destacados.
- `body` (`oklch(0.82 0 0)`): Párrafos y descripciones de contenido.
- `muted` (`oklch(0.72 0 0)`): Textos secundarios, labels y datos de telemetría.
- `faint` (`oklch(0.58 0 0)`): Separadores, badges y labels de categorías en mono.

### 4. Borders & Status

- `border-subtle` (`oklch(1 0 0 / 8%)`): Líneas finas y retículas.
- `border-medium` (`oklch(1 0 0 / 15%)`): Contenedores activos y áreas de hover.
- `status-success` (`#34d399`): Indicador de estado activo (Open Beta).
- `status-success-ping` (`#6ee7b7`): Onda pulsante en badges.

### 5. Sparkle Colors (Telemetry & UI Highlights)

- `sparkle-1` (`#e2f6ff`), `sparkle-2` (`#bfe8ff`), `sparkle-3` (`#9bd9ff`), `sparkle-4` (`#78caff`).

---

## Typography

Las fuentes se cargan mediante `next/font/google` y se configuran como variables globales en el HTML.

- **Mono (JetBrains Mono)**: Representada por la variable `--font-mono`. Reservada para encabezados principales (`h1`, `h2`), números de telemetría/estadísticas, badges de estado, etiquetas de navegación/categoría, y botones interactivos. Generalmente en mayúsculas (`uppercase`) y con tracking abierto para reforzar el carácter técnico.
- **Sans (Inter)**: Representada por la variable `--font-sans`. Utilizada exclusivamente para el cuerpo de texto, párrafos largos, explicaciones detalladas y subtítulos de apoyo. Garantiza legibilidad y contraste.

---

## Glassmorphism & Layout Utilities

### Glassmorphism

- `bg-main-glass`: `bg-white/2 border border-white/5 backdrop-blur-md` (Usado en cards generales y secciones).
- `bg-glass-card`: `bg-black/60 border border-white/8 backdrop-blur-lg` (Usado en diálogos y widgets interactivos).
- `bg-glass-panel`: `bg-[#0e0e0e]/85 border border-white/12 backdrop-blur-xl` (Usado en el modal y la barra de navegación superior).

### Layout Utilities

- `page-section`: Contenedor responsivo con ancho máximo de 1920px, centrado con padding lateral progresivo:
  - Mobile: `px-4` (1rem)
  - Tablet/Desktop: `px-8` a `px-20`
- `title-hero`: Tipografía mono extrabold, tamaño responsivo (`text-[2.1rem]` a `text-[5rem]`), tracking estrecho y texto blanco.
- `title-section`: Tipografía mono extrabold, tamaño responsivo fluido (`text-[clamp(2rem,5vw,3.5rem)]`), tracking estrecho y texto blanco en mayúsculas.
- `section-badge`: Tipografía mono en mayúsculas, tracking amplio (`tracking-widest`), con color atenuado (`text-faint`).
- `section-heading`: Títulos de secciones en mono, peso 800, color blanco.
- `mask-marquee`: Gradiente lineal de opacidad a los extremos del contenedor (`transparent` -> `black` -> `transparent`) para desvanecer el contenido en scroll continuo.

### Section Gradients (Efectos de Iluminación Cenital)

- `bg-gradient-bento`: Iluminación radial focalizada en la parte superior derecha.
- `bg-gradient-interactive`: Iluminación radial dual (superior derecha e inferior izquierda).
- `bg-gradient-ai-layers`: Doble iluminación radial en el lado derecho.
- `bg-gradient-about`: Iluminación radial central superior y media.

---

## Animations

- `--animate-marquee`: `marqueeScroll 40s linear infinite` (Desplazamiento horizontal continuo).
- `--animate-scroll-left`: `scrollLeft 40s linear infinite` (Desplazamiento a la izquierda con desfase de gap).
- `--animate-scroll-right`: `scrollRight 40s linear infinite` (Desplazamiento a la derecha con desfase de gap).
- `ScrollExpandVideo`: Animación basada en scroll impulsada por `motion` (framer-motion) que escala de forma inmersiva el dashboard a pantalla completa.

---

## Key Components

- **HeroBadge** ([`HeroBadge.tsx`](<file:///c:/Projects/Fixed/fixed-landing/src/app/[lang]/(home)/components/ui/HeroBadge.tsx>)): Indicador de versión y estado activo ("Open Beta") con borde fino, fondo translúcido y un punto verde pulsante en tiempo real.
- **BetaForm** ([`BetaForm.tsx`](file:///c:/Projects/Fixed/fixed-landing/src/shared/components/widgets/BetaForm.tsx)): Formulario de registro de lista de espera con inputs y botones estilizados de precisión, e integración con Supabase.
- **ScrollExpandVideo** ([`ScrollExpandVideo.tsx`](<file:///c:/Projects/Fixed/fixed-landing/src/app/[lang]/(home)/components/widgets/ScrollExpandVideo.tsx>)): Contenedor de video o maqueta de producto que se expande dinámicamente según la posición del scroll.
- **Accordion** ([`accordion.tsx`](file:///c:/Projects/Fixed/fixed-landing/src/shared/components/ui/accordion.tsx)): Acordeón construido sobre `@base-ui/react`. Cada ítem tiene tipografía mono, color atenuado que se ilumina en hover, dividido por líneas finas horizontales.
- **LaFijaCard** ([`LaFijaCard.tsx`](<file:///c:/Projects/Fixed/fixed-landing/src/app/[lang]/(home)/components/widgets/LaFijaCard.tsx>)): Carta de predicción diaria ("La Fija") con diseño limpio y tipografía mono.
- **ValueBetCardWidget** ([`ValueBetCardWidget.tsx`](<file:///c:/Projects/Fixed/fixed-landing/src/app/[lang]/(home)/components/widgets/ValueBetCardWidget.tsx>)): Tarjeta de apuestas de valor con iluminación interactiva y estados dinámicos (Alta / Media / Baja).
- **OddsCard** ([`OddsCard.tsx`](<file:///c:/Projects/Fixed/fixed-landing/src/app/[lang]/(home)/components/widgets/OddsCard.tsx>)): Tarjeta de cuotas con EV, probabilidad formateada, cuota y la predicción en lenguaje natural dinámico (ej: "Gana Fulham").
- **OddsMarquee** ([`OddsMarquee.tsx`](<file:///c:/Projects/Fixed/fixed-landing/src/app/[lang]/(home)/components/widgets/OddsMarquee.tsx>)): Marquee de desplazamiento infinito que renderiza filas de `OddsCard` para mostrar el historial reciente del modelo.

---

## Do's and Don't's

### Do:

- Usar `font-mono` para títulos y labels técnicos, y `font-sans` para los textos explicativos.
- Mantener las líneas divisorias extremadamente finas y con baja opacidad (`border-white/5` o `border-white/10`).
- Limitar la paleta cromática a tonos carbón/negro (`canvas`), acero (`primary`) y blanco (`heading`).
- Usar `text-heading`, `text-body`, `text-muted` y `text-faint` para asegurar el cumplimiento del contraste de legibilidad.

### Don't:

- No agregar sombras difusas tradicionales a los contenedores; la profundidad se genera mediante opacidad y bordes.
- No utilizar degradados de colores brillantes o saturados para botones o textos (excepto los blobs en el pie de página).
- Evitar esquinas redondeadas excesivas (máximo `rounded-2xl` para bloques principales de CTA, de resto usar `rounded-lg` o bordes rectos).
- No introducir iconos de colores o efectos visuales llamativos innecesarios.
