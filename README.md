# Fixed Landing

Landing page bilingüe (EN/ES) para **Fixed**, una plataforma de inteligencia predictiva para apuestas deportivas. Construida con Next.js 16, React 19 y Tailwind CSS v4.

## ✨ Características

- Hero con formulario de captura para beta privada
- OddsMarquee con predicciones en vivo simuladas
- Grid de métricas y prueba social (75K+ usuarios, 92.5% precisión)
- Secciones interactivas de proceso IA (timeline, capas, datastream)
- Dashboard reveal con animación scroll-driven
- Carrusel de partners (10 marcas de apuestas)
- Planes de suscripción (Free + Standard $9.99)
- FAQ, Términos, Privacidad y Cookies
- Traducción completa EN/ES

## 🛠️ Tecnologías

- **Next.js** 16 (App Router, SSG)
- **React** 19
- **TypeScript** 6 (strict mode)
- **Tailwind CSS** v4
- **shadcn/ui** + **@base-ui/react**
- **motion** (framer-motion)
- **lucide-react** (iconos)

## 📋 Prerrequisitos

- Node.js >= 22.12.0
- pnpm (recomendado) o npm

## 📦 Dependencias

| Dependencia | Versión | Propósito |
|---|---|---|
| `next` | ^16.2.7 | Framework React con App Router |
| `react` | ^19.2.6 | UI library |
| `tailwindcss` | ^4.3.0 | Utility-first CSS |
| `@base-ui/react` | ^1.5.0 | Primitivas de UI headless |
| `motion` | ^12.40.0 | Animaciones scroll-driven |
| `class-variance-authority` | ^0.7.1 | Variantes de componentes |
| `clsx` | ^2.1.1 | Condicionales de clases |
| `tailwind-merge` | ^3.6.0 | Merge de clases Tailwind |
| `lucide-react` | ^1.17.0 | Iconos SVG |

## 📁 Estructura del Proyecto

```
fixed-landing/
├── src/
│   ├── app/[lang]/        # Rutas dinámicas EN/ES
│   │   ├── layout.tsx     # Layout raíz (Toolbar + Footer)
│   │   ├── page.tsx       # Landing page principal
│   │   ├── plans/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── cookies/page.tsx
│   ├── assets/images/     # Imágenes, logos, flags
│   ├── components/        # Componentes React
│   │   └── ui/            # Componentes base (shadcn)
│   ├── data/              # Traducciones y datos mock
│   ├── lib/               # Utilidades (cn)
│   └── styles/            # CSS global + tokens Tailwind
├── public/images/         # Assets públicos (widgets)
├── docs/                  # Documentación técnica
└── package.json
```

## 📞 Contacto

- **Producto**: Fixed — Inteligencia Predictiva para Apuestas
- **URL**: https://fixed.com
- **App**: https://app.fixed.com/auth

---

📚 **Para documentación extendida, consulta la carpeta `docs/` o el archivo `AGENTS.md` en la raíz.**
