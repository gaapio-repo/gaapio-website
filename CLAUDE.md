# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About Gaapio

Gaapio is an AI-powered accounting automation platform built by Big 4 CPAs. The mission is to amplify accountant judgment with AI — not replace it. The platform helps accountants research faster, write clearer memos, and spend more time on critical thinking instead of formatting documents.

**Product modules:**
- **Accounting Memos** — AI-assisted drafting of accounting policy memos
- **Footnote Disclosures** — Automated footnote and disclosure generation
- **Contract Analysis** — AI-driven contract review for accounting implications
- **Guidance Updates** — Track and summarize new ASC/FASB guidance
- **ResearchGPT** — Accounting research assistant
- **SOX Controls** — SOX compliance and controls documentation

**Target audience:** Accounting teams at private companies, public companies, and accounting firms.

## Commands

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build
npm run build:dev  # Dev-mode build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

Playwright is installed but no test scripts are configured in `package.json`. There is no test suite.

## Architecture Overview

This is a React/TypeScript SaaS marketing + application site. It uses Vite, Tailwind CSS, shadcn/ui (Radix UI primitives), React Router v6, React Query, and Supabase as the backend.

### Path Alias

`@/*` maps to `./src/*` — use this throughout.

### Routing

All routes are defined in `src/App.tsx`. The app has 30+ routes covering the public marketing site, auth flows, and a protected `/admin` section.

Route protection is handled by `src/middleware/SecurityMiddleware.tsx`, which wraps admin routes and redirects unauthenticated users to login. Admin-specific pages use `AdminPageGuard` for role-based access on top of that.

### Component Organization

- `src/components/ui/` — shadcn/ui primitives (Radix-based). Don't modify these directly; re-generate via shadcn CLI if needed.
- `src/components/home/` — Landing page sections
- `src/components/admin/` — Admin dashboard panels and management UIs (40+ components)
- `src/pages/` — Top-level page components that map 1:1 to routes
- `src/hooks/` — Custom hooks for data fetching and UI logic
- `src/config/` — Configuration files (SEO, plans, etc.)

### Backend (Supabase)

- Client and auto-generated TypeScript types live in `src/integrations/supabase/`
- Never manually edit `src/integrations/supabase/types.ts` — regenerate from the Supabase CLI
- Edge Functions (TypeScript serverless) are in `supabase/functions/`
- Database migrations are in `supabase/migrations/`

### Data Fetching

React Query manages all async server state. Supabase calls go through the client at `src/integrations/supabase/client.ts`. Forms use React Hook Form + Zod.

### Styling

Tailwind CSS with CSS variable-based theming (HSL values, defined in `src/index.css`). Dark mode is class-based. Custom animations (`fade-in`, `fade-up`, `pulse-slow`) are defined in `tailwind.config.ts`. Don't use inline styles when Tailwind classes exist.

### Vite Configuration

Security headers are added via `vite.config.ts`. Custom asset output: logos are non-hashed; images and JS chunks are content-hashed. The Lovable component tagger plugin runs only in dev mode.

## Supabase Edge Functions

All edge functions live in `supabase/functions/`. Shared utilities (CORS, Stripe helpers, price config) are in `supabase/functions/_shared/`.

| Function | Purpose |
|---|---|
| `create-checkout` | Creates Stripe checkout sessions for subscriptions. Records checkout intents, syncs "Checkout Started" to CRM. |
| `stripe-webhook` | Handles Stripe events (checkout.session.completed, subscription lifecycle, invoice.paid). Creates/updates companies and users. Uses `stripe_events` table for idempotency. |
| `sync-lead-to-crm` | Transforms lead data and sends to CRM webhook. Includes checkout status, Stripe IDs, UTM tracking. |
| `create-user-company` | Creates user and company records from signup data, links them with admin role. |
| `queue-webhook` / `process-webhooks` / `setup-webhook-cron` | Webhook queuing and processing infrastructure. |

## Database

Key tables (managed via Supabase migrations in `supabase/migrations/`):

- `users` — User accounts (email, name, phone, user_type, status, company_id)
- `companies` — Customer organizations (name, status, plan, stripe_customer_id, stripe_subscription_id, user_limit)
- `company_users` — User-company relationships with roles (admin, member)
- `admins` — Admin users (separate from regular users)
- `contact_messages` — Contact form submissions
- `demo_requests` — Demo request submissions
- `checkout_intents` — Stripe checkout tracking (session_id, status, UTM params, terms acceptance)
- `stripe_events` — Idempotency tracking for webhook processing
- `site_config` — Feature toggles and site settings
- `testimonials` — Customer testimonials
- `customer_logos` — Customer logo display management
- `blog_posts` — Blog content
- `page_content` — Dynamic page content

**RLS policies:** Admin-only access for sensitive data; public insert allowed for contact/demo submission forms.

## Stripe Integration

**Checkout flow:** Frontend → `create-checkout` edge function → Stripe Checkout → redirect to success/cancel → `stripe-webhook` processes events.

**Plans:** research, core, pro — each mapped to a Stripe price ID in `supabase/functions/_shared/prices.ts`.

**Subscription lifecycle:** created → active → past_due → cancelled. Reactivation handled via `invoice.paid` events.

**Idempotency:** All webhook events are deduplicated via the `stripe_events` table.

## Admin Dashboard

The admin panel (`src/pages/Admin.tsx`) uses a tab system with 11 tabs:

1. **Dashboard** — Overview metrics
2. **Companies** — Company management and editing
3. **Users** — User signups and management
4. **Contacts** — Contact form submissions
5. **Demo Requests** — Demo request tracking
6. **Firm Signups** — Firm signup management (hidden by default)
7. **Customer Logos** — Logo upload and display management
8. **Customer Quotes** — Testimonials editor
9. **Blog Posts** — Blog management with WYSIWYG editor (TipTap) and markdown import
10. **Webpages** — Page editor with SEO control
11. **Settings** — Admin users, tab visibility, feature toggles

**Feature toggles** (via `site_config` table): `customer_logos`, `testimonials`, `footer_logos`, `self_signup`, `pricing`. Managed through the `useSiteConfig` hook.

**Tab visibility** is configurable in Settings and persisted to localStorage.

## SEO

Pages use `src/components/SEO.tsx` (via `react-helmet-async`). SEO config per route is centralized in `src/config/seoConfig.ts`.

- Structured data schemas: SoftwareApplication, Product, Organization
- Page status tracking: complete, incomplete, or missing SEO metadata

## Key Conventions

- TypeScript strict mode is relaxed (`noImplicitAny` and `strictNullChecks` are off) — don't rely on strict null checks.
- Notifications use Sonner (`sonner` package) for toasts.
- Charts use Recharts; rich-text editing uses TipTap.
- The `@tanstack/react-query` version is v5 — use the v5 API (e.g., `useQuery` with object syntax).
- Icons: Lucide React (`lucide-react`)
- Date utilities: `date-fns`
- Carousel: Embla (`embla-carousel-react`)
- PDF generation: `jspdf`
- QR codes: `qrcode.react`
- Markdown rendering: `marked`
- Typewriter effects: `typed.js`
- Command palette: `cmdk`
- Drawer component: `vaul`
- Class utilities: `class-variance-authority` + `clsx` + `tailwind-merge`

## Key Files

| File | Purpose |
|---|---|
| `src/App.tsx` | All route definitions (30+ routes) |
| `src/pages/Admin.tsx` | Admin dashboard with tab management |
| `src/pages/Index.tsx` | Landing page |
| `src/middleware/securityMiddleware.tsx` | Auth protection for /admin routes |
| `src/config/seoConfig.ts` | Centralized SEO metadata |
| `src/hooks/useSiteConfig.ts` | Feature toggles and site configuration |
| `src/integrations/supabase/client.ts` | Supabase client instance |
| `src/integrations/supabase/types.ts` | Auto-generated DB types (don't edit manually) |
| `supabase/functions/stripe-webhook/index.ts` | Payment event processing |
| `supabase/functions/create-checkout/index.ts` | Checkout session creation |
| `supabase/functions/sync-lead-to-crm/index.ts` | CRM integration |
| `tailwind.config.ts` | Theme, animations, and breakpoints |
| `vite.config.ts` | Build config with security headers |
