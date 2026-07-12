# Fixed Landing — AI Engineering Context

## 1. Arquitectura y Stack

- **Monorepo/Estructura**: Next.js App Router (single project, no monorepo)
- **Frontend**: Next.js 16 + React 19
- **Lenguaje**: TypeScript 6.0+, strict mode, ES2022 target
- **Package Manager**: pnpm (lock: `pnpm-lock.yaml`)
- **Estilos**: Tailwind CSS v4 (config inline en `global.css` via `@theme`), shadcn/ui con `@base-ui/react`
- **Animaciones**: `motion` (framer-motion) para scroll-driven, CSS keyframes para marquees y blobs
- **Traducciones**: Sistema casero sin `next-intl` — `src/data/translations.ts`
- **Despliegue**: Vercel, generación estática (SSG)

## 2. Estándares de Código

- TypeScript strict mode, no `any` — usar `unknown` cuando sea necesario
- Convención de nombres: `PascalCase` para componentes, `camelCase` para funciones/vars
- Archivos de componentes en `src/components/` (sin subcarpetas por feature)
- Componentes UI primitivos en `src/components/ui/`
- Datos mock y constantes en `src/data/`
- Traducciones centralizadas en `src/data/translations.ts`
- Path alias: `@/` mapea a `src/`
- Sin barriles (`index.ts`) — imports directos

## 3. UI/UX y Sistema de Diseño

- **Framework de estilos**: Tailwind CSS v4 con `@theme` en `global.css`
- **Tema**: Solo dark mode (clase `dark` en `<html>`)
- **Paleta**: Acentos steel blue (`#3e5d6c`), fondos oscuros profundos (`oklch(0.09 0 0)`)
- **Tipografía**: Prosto One (display), Space Grotesk (sans), Space Mono (mono)
- **Glassmorphism**: Clases utilitarias `bg-main-glass`, `bg-white-glass`, `bg-white-card`
- **Animaciones clave**: `marquee`, `point-card-float`, `blob`, `sparkle`
- **Referencia visual**: `DESIGN.md` en la raíz del proyecto

## 4. Git y Workflow

- **Flujo de Git**: GitHub Flow — branches desde `master` con PR + review, squash merge
- **Ramas desde**: `master`
- **Convención de nombres**: `<type>/<short-desc>` (kebab-case, types: `feat`, `fix`, `docs`, `chore`, `refactor`)
- **Merge a**: `master` via PR con squash merge
- **Para crear una rama nueva**, ejecuta la skill `dev-flow`
- **Para push seguro + PR**, ejecuta la skill `dev-flow`
- **Test Runner**: No configurado (sin tests en este proyecto)
- **Commits**: Conventional Commits (validado por commitlint + husky). Los cambios en documentación (en `docs/`, `AGENTS.md`, `DESIGN.md`, `README.md`) siempre deben confirmarse de forma independiente con el tipo `docs` (ej: `docs(scope): mensaje`) y nunca mezclarse con cambios de código en el mismo commit.
- **Linter**: ESLint 10 con `@eslint/js` y `typescript-eslint`
- **Formatter**: Prettier 3 con `prettier-plugin-tailwindcss`
- **CI/CD**: GitHub Actions (lint + build en PRs), semantic-release para releases
- **Release**: semantic-release en branch `master` con plugins commit-analyzer, release-notes-generator, GitHub, git

## 5. Documentación Técnica

La documentación del proyecto vive en `docs/`:

- `docs/ARCHITECTURE.md` — Arquitectura técnica
- `docs/CONTRACTS.md` — Contratos de interfaz
- `docs/ROADMAP.md` — Roadmap de producto
- `docs/SCOPE.md` — Alcance MVP

Si necesitas detalles sobre arquitectura, componentes o estructuras de datos, consulta estos archivos antes de generar código.

## 6. Mantenimiento de Documentación

Si durante tu interacción detectas cambios significativos en el proyecto (nuevas dependencias, cambios arquitectónicos, nuevos componentes o páginas): **informa al usuario y sugiere ejecutar el skill `technical-writer`** para sincronizar la documentación con el estado actual del proyecto.
