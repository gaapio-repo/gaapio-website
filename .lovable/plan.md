

## Redesign Request a Demo Page with "AI with Receipts" Tagline

### Overview
Transform the plain Request a Demo page into a professional landing page using the homepage's gradient background, a two-column layout, the "AI with Receipts" tagline, and social proof -- all focused on driving form submissions.

### Layout

```text
┌──────────────────────────────────────────────┐
│  Header                                      │
├──────────────────────────────────────────────┤
│  HERO (GradientBackground)                   │
│  ┌─────────────────┬───────────────────────┐ │
│  │ Left Column     │ Right Column          │ │
│  │                 │                       │ │
│  │ "AI with        │ ┌───────────────────┐ │ │
│  │  Receipts."     │ │ Demo Request Form │ │ │
│  │                 │ │ (white card,      │ │ │
│  │ "See Gaapio     │ │  shadow-2xl)      │ │ │
│  │  in Action"     │ │                   │ │ │
│  │                 │ │ Name, Email, etc  │ │ │
│  │ ✓ 30-min demo   │ │                   │ │ │
│  │ ✓ Live AI memos │ │ [Submit]          │ │ │
│  │ ✓ Your use case │ └───────────────────┘ │ │
│  │ ✓ No commitment │                       │ │
│  │                 │                       │ │
│  │ 🔒 Secure info  │                       │ │
│  └─────────────────┴───────────────────────┘ │
├──────────────────────────────────────────────┤
│  TrustBarSection (customer logos)             │
├──────────────────────────────────────────────┤
│  Footer                                      │
└──────────────────────────────────────────────┘
```

### Changes to `src/pages/RequestDemo.tsx`

1. **Gradient hero background** -- Import and use `GradientBackground` component, same as homepage
2. **Tagline** -- Add "AI with Receipts." as a small badge/label above the main heading, styled in white/light text to pop against the blue gradient
3. **Two-column grid** -- Left: headline ("See Gaapio in Action"), subtitle, 4 value bullets with check icons, security note. Right: `DemoRequestForm` in an elevated white card (`bg-white/95 dark:bg-gray-900/95 shadow-2xl rounded-xl`)
4. **Social proof** -- Add `TrustBarSection` below the hero section
5. **Typography** -- Follow the hero typography pattern: tagline text in white, heading split with black intro + white key words against the gradient
6. **Success state** -- `DemoRequestSuccess` renders centered over the gradient when submitted
7. **Responsive** -- Stacks to single column on mobile (value props on top, form below)

### No changes to
- `DemoRequestForm`, `DemoRequestSuccess`, or any form logic
- SEO metadata (kept as-is)
- Any other pages or components

