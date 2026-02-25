# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build
npm run build:dev  # Dev-mode build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

There is no test suite configured.

## Architecture Overview

This is a React/TypeScript SaaS marketing + application site for an accounting automation platform. It uses Vite, Tailwind CSS, shadcn/ui (Radix UI primitives), React Router v6, React Query, and Supabase as the backend.

### Path Alias

`@/*` maps to `./src/*` — use this throughout.

### Routing

All routes are defined in `src/App.tsx`. The app has 30+ routes covering the public marketing site, auth flows, and a protected `/admin` section.

Route protection is handled by `src/middleware/SecurityMiddleware.tsx`, which wraps admin routes and redirects unauthenticated users to login. Admin-specific pages use `AdminPageGuard` for role-based access on top of that.

### Component Organization

- `src/components/ui/` — shadcn/ui primitives (Radix-based). Don't modify these directly; re-generate via shadcn CLI if needed.
- `src/components/home/` — Landing page sections
- `src/components/admin/` — Admin dashboard panels and management UIs
- `src/pages/` — Top-level page components that map 1:1 to routes
- `src/hooks/` — Custom hooks for data fetching and UI logic

### Backend (Supabase)

- Client and auto-generated TypeScript types live in `src/integrations/supabase/`
- Never manually edit `src/integrations/supabase/types.ts` — regenerate from the Supabase CLI
- Edge Functions (TypeScript serverless) are in `supabase/functions/` and handle Stripe checkout, webhook processing, user/company creation, and CRM sync
- Database migrations are in `supabase/migrations/`

### Data Fetching

React Query manages all async server state. Supabase calls go through the client at `src/integrations/supabase/client.ts`. Forms use React Hook Form + Zod.

### Styling

Tailwind CSS with CSS variable-based theming (HSL values, defined in `src/index.css`). Dark mode is class-based. Custom animations (`fade-in`, `fade-up`, `pulse-slow`) are defined in `tailwind.config.ts`. Don't use inline styles when Tailwind classes exist.

### Vite Configuration

Security headers are added via `vite.config.ts`. Custom asset output: logos are non-hashed; images and JS chunks are content-hashed. The Lovable component tagger plugin runs only in dev mode.

### SEO

Pages use `src/components/SEO.tsx` (via `react-helmet-async`). SEO config per route is in `src/config/seo.ts`.

### Pricing / Plans

Plan data lives in `src/config/plans.ts`.

## Key Conventions

- TypeScript strict mode is relaxed (`noImplicitAny` and `strictNullChecks` are off) — don't rely on strict null checks.
- Notifications use Sonner (`sonner` package) for toasts.
- Charts use Recharts; rich-text editing uses TipTap.
- The `@tanstack/react-query` version is v5 — use the v5 API (e.g., `useQuery` with object syntax).
