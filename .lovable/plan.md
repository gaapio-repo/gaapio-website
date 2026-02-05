

# Firm Page: Three Standalone Sections with Alternating Layouts

## Overview
Replace the current 3-column card layout with **three separate, full-width sections** - one for each firm type. Each section will use an **alternating split layout** (text left/visual right, then text right/visual left) for visual variety and a premium, enterprise-grade appearance.

---

## Design Approach

### Section Structure
Each section follows a consistent pattern:
- **Full-width section** with subtle gradient background
- **Two-column split layout** (content and visual/illustration side)
- **Alternating direction**: Section 1 (text left), Section 2 (text right), Section 3 (text left)
- **Generous spacing** (py-20 md:py-28)
- **Background variation** for visual rhythm (white, light blue-gray, white)

### Section Content Layout
```text
┌────────────────────────────────────────────────────────────┐
│  Section 1: Small Firms (Text Left, Visual Right)          │
│  ┌──────────────────────┬───────────────────────────────┐  │
│  │  Badge + Title       │                               │  │
│  │  Challenge text      │      UI Mockup / Icon Card    │  │
│  │  Solution bullets    │                               │  │
│  │  CTA Button          │                               │  │
│  └──────────────────────┴───────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Section 2: Technical Accounting (Visual Left, Text Right)  │
│  ┌───────────────────────────────┬──────────────────────┐  │
│  │                               │  Badge + Title       │  │
│  │      UI Mockup / Icon Card    │  Challenge text      │  │
│  │                               │  Solution bullets    │  │
│  │                               │  CTA Button          │  │
│  └───────────────────────────────┴──────────────────────┘  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  Section 3: Public Company Firms (Text Left, Visual Right)  │
│  ┌──────────────────────┬───────────────────────────────┐  │
│  │  Badge + Title       │                               │  │
│  │  Challenge text      │      UI Mockup / Icon Card    │  │
│  │  Solution bullets    │                               │  │
│  │  CTA Button          │                               │  │
│  └──────────────────────┴───────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## Visual Design Details

### Text Side Content
1. **Badge**: Pill-shaped badge with icon and firm type name (e.g., "Small Firms")
2. **Headline**: Bold, outcome-focused title (e.g., "Scale Your Practice Without Scaling Headcount")
3. **Challenge Block**: "The Challenge" subheading with 2-3 sentence pain point description
4. **Solutions Block**: "How Gaapio Helps" with checkmark bullets
5. **CTA**: "Get Started" button linking to `/firm-signup`

### Visual Side Content
- Large decorative icon card with gradient background and blur effects
- Or a CSS-based UI mockup showing relevant Gaapio functionality
- Decorative blur circles behind for depth

### Background Rhythm
| Section | Background |
|---------|------------|
| Small Firms | White (`bg-white`) |
| Technical Accounting | Light blue-gray gradient band |
| Public Company Firms | White (`bg-white`) |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/solutions/FirmTiersSection.tsx` | Complete rewrite - replace 3-column card grid with 3 separate alternating sections |
| `src/pages/solutions/AccountingFirm.tsx` | No changes needed (component already imported) |

---

## Technical Implementation

### Component Structure

```typescript
// New data structure
const firmChallenges = [
  {
    id: "smallFirm",
    name: "Small Firms",
    icon: Building2,
    headline: "Scale Your Practice Without Scaling Headcount",
    challenge: "Hiring specialized technical staff isn't cost-effective, but clients still need reliable guidance on contracts, leases, and accounting questions.",
    solutions: [
      "Internal GPT answers technical questions instantly",
      "Contract Analysis handles complex reviews",
      "Lease Accounting tools let junior staff perform senior-level work"
    ],
    reversed: false,
    bgVariant: "white"
  },
  {
    id: "technicalAccounting",
    name: "Technical Accounting Practices",
    icon: FileText,
    headline: "Deliver Big 4–Quality Work at Regional Firm Prices",
    challenge: "Research and memo-writing consumes hours of senior time. Quality varies across staff, and clients expect premium deliverables.",
    solutions: [
      "AI-powered research cuts hours to minutes",
      "Memo generation ensures consistent, defensible output",
      "Standardized workflows reduce prep time"
    ],
    reversed: true,
    bgVariant: "gradient"
  },
  {
    id: "fullFirm",
    name: "Firms Serving Public Companies",
    icon: Shield,
    headline: "Meet SEC Deadlines Without the Audit Season Scramble",
    challenge: "SEC deadlines are unforgiving. SOX documentation is tedious. Disclosure benchmarking requires expensive tools or manual work.",
    solutions: [
      "SOX Compliance module streamlines control documentation",
      "Footnote Disclosure generation with peer benchmarking",
      "Audit suite delivers audit-ready output fast"
    ],
    reversed: false,
    bgVariant: "white"
  }
];
```

### Section Component

Each section will include:
- Responsive grid (`grid-cols-1 lg:grid-cols-2`)
- `order-first lg:order-last` classes for alternating layouts
- Decorative blur elements for visual depth
- Consistent typography using the design system

### Visual Card Component

Create a visually appealing card for each section's "visual side":
- Large icon with gradient background
- Decorative accent circles
- Subtle glassmorphism effect
- Or a mini UI mockup showing relevant features

---

## Section Headers Update

Remove the top-level "Challenges We Solve" header since each section is now self-contained with its own context.

---

## Summary

This redesign transforms cramped 3-column cards into three spacious, premium-feeling full-width sections. The alternating layout creates visual rhythm, the generous spacing feels enterprise-grade, and each firm type gets dedicated real estate to tell its story. The design follows the existing site patterns from KeyBenefitsSection and solution page hero layouts.

