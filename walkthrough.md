# Migration Walkthrough: fixed-frontend to fixed-landing

We have successfully extracted the landing page from `fixed-frontend` (Angular) and migrated it to `fixed-landing` (Astro + React + Shadcn/ui + Tailwind CSS v4).

## Changes Made

### 1. base Astro Setup (`fixed-landing`)
*   Initialized Astro project with the minimal template.
*   Added React support via `@astrojs/react`.
*   Installed and configured Tailwind CSS v4 using the `@tailwindcss/vite` plugin.
*   Initialized Shadcn UI and configured imports path aliases (`@/*` pointing to `src/*`) in `tsconfig.json`.
*   Created a comprehensive `DESIGN.md` establishing the custom Noir typography and spacing rules.
*   Configured Prettier formatting and ESLint (v9 Flat config) rules for code quality.
*   Merged global CSS tokens, keyframe animations, scrollbars, and customized glassmorphic utility classes into `src/styles/global.css`.
*   Created a root Astro `Layout.astro` providing base structure, viewport and SEO meta tags.

### 2. Component and Pages Porting
*   **Centralized Translations:** Created `src/data/translations.ts` carrying both Spanish and English translation keys. Added the `useTranslations` helper hook.
*   **centralized Static Data:** Ported plans list to `src/data/plans.ts` (extracted from the plans service).
*   **Layout Components:**
    *   `Navbar.astro`: Navigation bar containing route links, responsive mobile overlay, and language selector.
    *   `Footer.astro`: Page footer carrying logo, legal links, and background gradient glow blobs.
    *   `Toolbar.astro`: Bottom floating bar section mapping scroll active states and auto-hide inactivity timers.
    *   `TranslateButton.astro`: Redirection flag toggler that stores language preferences in a root `.fixed.com` cookie to sync language states between subdomains.
*   **Content Components:**
    *   `BetsCarousel.astro` and `BrandsCarousel.astro`: Multi-item looping slider widgets using pure CSS scroll keyframe animations for high performance.
    *   `KeyPoints.astro`, `FeatureCard.astro`, and `PlanCard.astro`: Static content displays styled with Tailwind v4 glassmorphic styles and custom SVG icons.
    *   `FaqAccordion.tsx`: Interactive React component leveraging Shadcn Accordion primitives. Retained the page tab selectors linking specific active questions.
*   **Pages:**
    *   `index.astro` (English home) with auto browser-language detection redirecting Spanish users to `/es/`.
    *   `es/index.astro` (Spanish home).
    *   `plans.astro` and `es/plans.astro` (Plans page).
    *   `faq.astro` and `es/faq.astro` (FAQ page).

### 3. Angular Application Update & Cleanup (`fixed-frontend`)
*   Configured `rootRedirectGuard` checking if users are logged in. Authenticated users route to `/dashboard`, while unauthenticated users redirect externally to the landing page at `https://fixed.com`.
*   Updated `app.routes.ts` mapping `''` (root) to `rootRedirectGuard` and removed the old landing layout paths.
*   Fixed `NotFoundComponent` (404 page) to inline the gradient shapes elements and their relative animation CSS variables, removing its import dependency from the deleted landing folder.
*   Deleted the unused landing files, components (`landing-layout`), and carousel assets.

---

## Validation & Verification Results

### Automated Validation Checks
Both codebases were validated with their respective build processes:

1.  **Astro Project (`fixed-landing`)**:
    *   `pnpm run format` successfully formatted all files.
    *   `pnpm run lint` completed with **0 errors/warnings**.
    *   `pnpm run build` compiled all 6 static routes successfully:
        *   `/index.html` (English homepage)
        *   `/plans/index.html` (English plans)
        *   `/faq/index.html` (English FAQ)
        *   `/es/index.html` (Spanish homepage)
        *   `/es/plans/index.html` (Spanish plans)
        *   `/es/faq/index.html` (Spanish FAQ)

2.  **Angular Project (`fixed-frontend`)**:
    *   `pnpm run build` completed successfully, producing production-optimized client bundles without unresolved dependencies.
