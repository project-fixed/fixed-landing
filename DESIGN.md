---
name: Fixed
version: 1.0.0
description: Luxury tech aesthetic for a predictive sports betting intelligence platform. Dark theme with steel blue accents and glassmorphism.
colors:
  primary: '#3e5d6c'
  primary-lightest: '#b8d4e3'
  primary-light: '#7d9faf'
  primary-dark: '#1f3440'
  primary-darkest: '#0e1a21'
  accent: '#3e5d6c'
  background: '#171717'
  surface: '#1a1a1a'
  text-main: '#ededed'
  text-dim: '#a1a1aa'
  success: '#22c55e'
  warning: '#facc15'
  error: '#ef4444'
typography:
  sans:
    fontFamily: 'Inter, ui-sans-serif, sans-serif'
  mono:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
rounded:
  sm: 4px
  md: 8px
  lg: 12px
components:
  card:
    backgroundColor: '#1a1a1a'
    rounded: 8px
    border: '1px solid rgba(255, 255, 255, 0.05)'
    glassBg: 'rgba(255, 255, 255, 0.02)'
  button:
    primaryBg: '#3e5d6c'
    primaryText: '#ededed'
    rounded: 8px
---

## Overview

Fixed utiliza una estética **Luxury Tech** oscura con acentos steel blue, evocando el ecosistema fintech corporativo. El diseño prioriza la percepción de producto premium con glassmorphism, animaciones sutiles y tipografía limpia.

## Colors

La paleta se centra en steel blue como color principal de acento sobre fondos oscuros profundos.

| Token              | Hex       | Uso                              |
| ------------------ | --------- | -------------------------------- |
| `primary`          | `#3e5d6c` | Acentos, botones, bordes activos |
| `primary-light`    | `#7d9faf` | Hover states                     |
| `primary-lightest` | `#b8d4e3` | Texto destacado                  |
| `primary-dark`     | `#1f3440` | Fondos secundarios               |
| `primary-darkest`  | `#0e1a21` | Fondos terciarios                |
| `background`       | `#171717` | Fondo base                       |
| `surface`          | `#1a1a1a` | Cards, superficies elevadas      |
| `text-main`        | `#ededed` | Texto principal                  |
| `text-dim`         | `#a1a1aa` | Texto secundario, metadata       |

**WCAG AA:** Contraste `text-main` (#ededed) sobre `background` (#171717) = 14.5:1 (excede 4.5:1).

## Typography

- **Sans (Inter)**: Texto body, headings, navegación, cards, párrafos, botones
- **Mono (JetBrains Mono)**: Datos numéricos, odds, porcentajes, terminal/datastream

## Layout

- Contenedor centrado con `max-w-7xl` y padding lateral `px-4`/`px-6`
- Secciones separadas por `py-20` a `py-32`
- Hero ocupa viewport completo con overlay de gradiente radial
- Grid responsive: mobile single column, tablet 2 col, desktop 3-4 col

## Elevation & Depth

- Cards con `bg-white-glass` (glassmorphism) o `bg-white-card`
- Sombras sutiles: `shadow-sm` para elementos elevados
- Efecto de profundidad con gradientes radiales animados (`radial-gradient-circle-*`)
- Blobs animados en background para sensación de capas

## Shapes

- **sm (4px)**: Componentes inline, badges, tags
- **md (8px)**: Cards, botones, inputs
- **lg (12px)**: Contenedores grandes, modales

## Animations

| Animación          | Propósito                                      | Duración                 |
| ------------------ | ---------------------------------------------- | ------------------------ |
| `marquee`          | Scrolling de odds y marcas                     | 40s linear infinite      |
| `point-card-float` | Cards de métricas en cascada                   | 10s ease-in-out infinite |
| `blob`             | Formas de gradiente animadas                   | 7s ease infinite         |
| `sparkle`          | Partículas en hover de botón                   | 0.4s ease-out            |
| Scroll expand      | Expansión de card a viewport completo (motion) | Basado en scroll         |

## Components

- **OddsCard**: Fondo oscuro con borde sutil, dot de estado (verde/rojo/amarillo), texto mono para odds
- **KeyPointCard**: Borde gradiente sutil, backdrop blur, icono SVG inline
- **PlanCard**: Fondo con color dinámico según `backgroundColor` del plan, checkmarks en texto dim
- **Toolbar**: Navegación sticky con backdrop blur al scrollear, drawer mobile con overlay
- **ButtonArrow**: Botón con flecha animada que se expande en hover (pill background slide)
- **ButtonSparkle**: Botón con 6 estrellas SVG que explotan radialmente en hover

## Do's and Don'ts

### Do:

- Usar glassmorphism para cards y superficies sobre fondos con gradiente
- Mantener la jerarquía tipográfica clara (Display → Sans → Mono)
- Animar elementos con propósito (scroll reveal, marquee para datos en vivo)
- Usar la paleta steel blue como único acento de color

### Don't:

- No usar colores brillantes o saturados fuera de la paleta definida
- No mezclar tipografías fuera de las 2 definidas
- No agregar sombras excesivas o múltiples colores de borde
- No usar jerga de tipster ("fijas 100% seguras")
