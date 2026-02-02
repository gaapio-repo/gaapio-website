

# Company Type Selector Redesign: Vertical Non-Card Layout

## Context

The sections below the hero are horizontally oriented:
- **TrustBarSection**: Horizontal row of logos
- **ProductHighlightsSection**: Horizontal tabs with side-by-side content

The hero selector needs to feel distinct and visually exciting by going vertical and breaking away from the traditional "card" pattern.

---

## Design Options

### Option A: Stacked Text Links with Animated Underlines
A minimal, typography-forward approach where each entry is just bold text with an animated underline on hover.

```text
Built for:

→ Private Companies
  Audit-ready memos & technical accounting support
  
→ Public Companies
  SEC reporting, SOX compliance & disclosure management
  
→ Accounting Firms
  Multi-client efficiency & advisory workflows
```

- Large, bold titles (text-2xl to text-3xl)
- Subtle arrow that slides on hover
- Animated gradient underline that expands from left
- No borders, no backgrounds - pure typography
- Feels editorial and premium

---

### Option B: Vertical Timeline/Steps
A connected visual flow like a vertical timeline or process steps.

```text
Built for:

    ●───────────────────────────
    │  Private Companies
    │  Audit-ready memos...
    │
    ●───────────────────────────
    │  Public Companies
    │  SEC & SOX workflows...
    │
    ●───────────────────────────
       Accounting Firms
       Advisory prep & audit flows
```

- Connected by a vertical line
- Dots/nodes at each entry point
- Hover makes the node glow and content shift
- Creates visual flow and hierarchy

---

### Option C: Large Interactive Text Blocks (Recommended)
Bold, oversized text that feels like a hero element itself rather than navigation.

```text
Built for:

┌─────────────────────────────────────────┐
│  PRIVATE COMPANIES              →       │
│  Audit-ready memos                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  PUBLIC COMPANIES               →       │
│  SEC & SOX compliance                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ACCOUNTING FIRMS               →       │
│  Multi-client workflows                 │
└─────────────────────────────────────────┘
```

But without visible borders - instead:
- Hover reveals a subtle left accent bar (primary blue)
- Background shifts slightly on hover
- Arrow slides right
- Title text is much larger (text-xl to text-2xl)
- Feels like bold statements rather than menu items

---

## Recommended: Option A - Typography-Forward Links

This creates the most visual contrast with the card-heavy sections below while feeling premium and modern.

### Visual Specifications

| Element | Style |
|---------|-------|
| Container | `max-w-xl`, no background |
| "Built for:" label | `text-sm uppercase tracking-[0.2em] text-gray-800` |
| Entry title | `text-xl md:text-2xl font-bold text-gray-900` |
| Entry subtitle | `text-sm text-gray-600` |
| Arrow indicator | Appears on hover, slides right |
| Hover effect | Gradient underline animates in from left |
| Spacing | `space-y-6` between entries |

### Hover Animation
- A thin gradient line (`from-primary to-cyan-400`) appears under the title
- Line animates from `width: 0` to `width: 100%`
- Arrow shifts right by 4px
- Subtle color shift on title text

---

## Technical Implementation

### File to Modify
`src/components/home/CompanyTypeSelector.tsx`

### Key Changes
1. Remove all card-like styling (backgrounds, borders, shadows, rounded corners)
2. Replace with pure typography and spacing
3. Add animated underline using a pseudo-element or span
4. Keep icons optional or remove entirely for cleaner look
5. Increase text sizes significantly
6. Add smooth hover transitions

### Structure
```text
<div> Container
├── <p> "Built for:" label
└── <div> Entries container (space-y-6)
    └── <Link> Entry (for each)
        ├── <div> Text content
        │   ├── <h3> Title (large, bold)
        │   ├── <span> Animated underline
        │   └── <p> Subtitle (smaller, muted)
        └── <ArrowRight> (appears/slides on hover)
```

---

## Why This Works

1. **Visual Contrast**: No cards = distinctly different from ProductHighlights tabs below
2. **Premium Feel**: Typography-focused design feels editorial and high-end
3. **Clear Hierarchy**: Large titles immediately communicate the three paths
4. **Engaging Hover**: Animated underline creates delightful interaction
5. **Lightweight**: Less visual noise, more focus on the message

---

## Notes

- Keeps all existing content (titles, outcomes, links)
- Icons can be removed entirely or kept minimal
- No changes to HeroSectionAlt.tsx layout
- Dark mode: Invert text colors to white/gray-300

