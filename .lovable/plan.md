

# Hero Section Redesign: Company Type Selector

## The Problem

The current selector is nearly invisible because:
- Uses low-opacity white text/backgrounds (`white/10`, `white/20`, `white/80`)
- These blend into the bright blue gradient background
- Overly complex styling with too many subtle effects that don't render well

## The Solution

A complete redesign using **high-contrast, bold visuals** that stand out against the blue gradient.

---

## Design Direction: Dark Glass Panels

Instead of translucent white-on-blue, use **dark glass panels** with bright accents:

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        BUILT FOR:                               │
│                                                                 │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│   │  ████████████   │ │  ████████████   │ │  ████████████   │  │
│   │                 │ │                 │ │                 │  │
│   │    PRIVATE      │ │     PUBLIC      │ │   ACCOUNTING    │  │
│   │   COMPANIES     │ │   COMPANIES     │ │      FIRMS      │  │
│   │                 │ │                 │ │                 │  │
│   │  Audit-ready    │ │  SEC & SOX      │ │  Advisory prep  │  │
│   │    memos        │ │  workflows      │ │  & audit flows  │  │
│   │                 │ │                 │ │                 │  │
│   │       →         │ │       →         │ │       →         │  │
│   └─────────────────┘ └─────────────────┘ └─────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Visual Specifications

### Panel Styling
| Property | Value |
|----------|-------|
| Background | `bg-gray-900/90` (dark, nearly opaque) |
| Border | `border border-white/20` |
| Backdrop | `backdrop-blur-xl` |
| Corner radius | `rounded-2xl` |
| Shadow | `shadow-2xl` |

### Text Styling
| Element | Style |
|---------|-------|
| "Built for:" label | White, uppercase, letter-spaced, outside panels |
| Company type title | Bold white, large text (`text-xl md:text-2xl`) |
| Outcome subtitle | Lighter gray (`text-gray-300`) |

### Hover Effects
- Panel lifts (`-translate-y-2`)
- Border turns primary blue (`border-primary`)
- Subtle glow appears (`shadow-[0_0_30px_rgba(0,153,255,0.4)]`)
- Arrow slides right

### Visual Accents
- Top edge gradient line (primary blue to cyan)
- Corner accent dots on hover
- Smooth 300ms transitions

---

## Layout Structure

```text
Container (max-w-3xl, centered)
├── Label: "BUILT FOR:" (white, centered, mb-6)
└── Grid (3 columns on sm+, stacked on mobile)
    ├── Panel 1: Private Companies
    ├── Panel 2: Public Companies
    └── Panel 3: Accounting Firms
```

### Responsive Behavior
- **Mobile**: Stacked vertically with full width
- **Tablet+**: 3 equal columns with gap

---

## Technical Implementation

### File Changes

**Modify**: `src/components/home/CompanyTypeSelector.tsx`

Key changes:
1. Replace translucent white backgrounds with dark opaque panels
2. Use solid white text for maximum readability
3. Add prominent hover states with blue glow
4. Simplify structure - remove circuit patterns and complex overlays
5. Add top gradient accent bar on each panel

### Panel Component Structure

```
<Link> (the clickable panel)
├── Top accent line (gradient bar)
├── Title (bold, white)
├── Outcome (gray-300)
└── Arrow indicator (slides on hover)
```

---

## Why This Works

1. **High Contrast**: Dark panels on bright blue creates clear separation
2. **Bold & Readable**: Solid colors instead of transparency effects
3. **Enterprise Feel**: Dark glass aesthetic feels premium and tech-forward
4. **Clear Hierarchy**: Title > subtitle > action indicator
5. **Obvious Clickability**: Hover states make interaction clear

---

## Notes

- Keeps all existing content (titles, outcomes, links)
- No changes to HeroSectionAlt.tsx layout or positioning
- No changes to routing or data structure
- Pure visual redesign of the selector component

