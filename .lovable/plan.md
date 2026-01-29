

# Alternate Homepage with Company Type Selector

## Overview

This plan creates an alternate homepage where the animated memo is replaced with a company type selector (Private Company, Public Company, Accounting Firm), along with three new landing pages for each type, and a new "Solutions" dropdown in the header navigation.

## Architecture

### New Files to Create

| File | Purpose |
|------|---------|
| `src/pages/IndexAlt.tsx` | Alternate homepage with company selector |
| `src/components/home/CompanyTypeSelector.tsx` | The 3-box selector component |
| `src/components/home/HeroSectionAlt.tsx` | Modified hero with selector instead of memo |
| `src/pages/solutions/PrivateCompany.tsx` | Private Company landing page |
| `src/pages/solutions/PublicCompany.tsx` | Public Company landing page |
| `src/pages/solutions/AccountingFirm.tsx` | Accounting Firm landing page |

### Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add routes for alternate homepage and 3 solution pages |
| `src/components/header.tsx` | Add "Solutions" dropdown to the left of "Products" |

---

## Component Details

### 1. Company Type Selector (`CompanyTypeSelector.tsx`)

A centered component with three clickable cards:

```text
┌─────────────────────────────────────────────────────────┐
│                  "Are you with a:"                       │
├─────────────────┬─────────────────┬─────────────────────┤
│  ┌───────────┐  │  ┌───────────┐  │  ┌───────────┐      │
│  │  Building  │  │  │  Building  │  │  │  Briefcase │      │
│  │   Icon    │  │  │   Icon    │  │  │    Icon    │      │
│  │           │  │  │           │  │  │            │      │
│  │  Private  │  │  │  Public   │  │  │ Accounting │      │
│  │  Company  │  │  │  Company  │  │  │    Firm    │      │
│  └───────────┘  │  └───────────┘  │  └───────────┘      │
└─────────────────┴─────────────────┴─────────────────────┘
```

- **Layout**: 3 cards in a row (responsive: stack on mobile)
- **Styling**: White cards with subtle borders, hover effects with primary color accent
- **Behavior**: Each card links to its respective solutions page
- **Icons**: Building (private), Building2 (public), Briefcase (firm) from lucide-react

### 2. Alternate Hero Section (`HeroSectionAlt.tsx`)

Based on the existing `HeroSection.tsx` but replaces the right column (AnimatedMemo) with the CompanyTypeSelector:

- **Left column**: Same title and subtitle text
- **Right column**: CompanyTypeSelector instead of AnimatedMemo
- **Background**: Same GradientBackground component
- **CTA buttons**: Removed (selector becomes the CTA)

### 3. Alternate Homepage (`IndexAlt.tsx`)

Exact copy of `Index.tsx` but uses `HeroSectionAlt` instead of `HeroSection`:

- Same sections: TrustBarSection, ProductHighlightsSection, KeyBenefitsSection, FinalCtaSection
- Same header and footer
- Only difference: hero section uses the selector

### 4. Solution Landing Pages

Each solution page follows the existing product page pattern (similar to `AccountingMemos.tsx`):

**Structure for each:**
- Header
- Custom hero section with tailored messaging
- TrustBarSection
- Benefits/features section
- FinalCtaSection
- Footer

**Page-specific content:**

| Page | Target Audience | Key Messaging Focus |
|------|-----------------|---------------------|
| Private Company | CFOs, Controllers at private companies | Streamlined technical accounting, audit prep |
| Public Company | SEC filers, public company accountants | SOX compliance, SEC reporting, disclosures |
| Accounting Firm | CPA firms, audit teams | Multi-client efficiency, reviewer workflows |

---

## Header Navigation Changes

### New "Solutions" Dropdown

Position: To the left of "Products"

**Dropdown structure** (matching Company dropdown style):
```text
┌────────────────────────────────────────┐
│              SOLUTIONS                  │
│         ─────────────────────          │
│  🏢  Private Company                    │
│      Solutions for private companies    │
│                                        │
│  🏛️  Public Company                     │
│      Solutions for SEC filers           │
│                                        │
│  💼  Accounting Firm                    │
│      Solutions for CPA firms            │
└────────────────────────────────────────┘
```

**Mobile menu**: Add collapsible "Solutions" section with the same three links

---

## Routing

New routes to add to `App.tsx`:

```
/home-alt              → IndexAlt (alternate homepage)
/solutions/private     → PrivateCompany
/solutions/public      → PublicCompany
/solutions/firm        → AccountingFirm
```

---

## Technical Details

### State Management
- No global state needed
- Each selector card is a simple `<Link>` component

### Styling Approach
- Reuse existing design tokens and Tailwind classes
- Cards use `bg-white border rounded-2xl shadow-sm hover:shadow-lg` pattern
- Consistent with enterprise SaaS aesthetic
- Smooth hover transitions (200ms ease-in-out)

### Accessibility
- Cards are keyboard navigable (using Link component)
- Proper focus states
- Semantic HTML with appropriate headings

### Responsive Behavior
- Desktop: 3 cards in a row
- Tablet: 3 cards, slightly smaller
- Mobile: Cards stack vertically

---

## Implementation Order

1. **Create CompanyTypeSelector component** - The core 3-box selector
2. **Create HeroSectionAlt component** - Hero with selector instead of memo
3. **Create IndexAlt page** - Alternate homepage using new hero
4. **Create solution pages** - PrivateCompany, PublicCompany, AccountingFirm
5. **Update App.tsx** - Add all new routes
6. **Update header.tsx** - Add Solutions dropdown (desktop + mobile)

---

## Notes

- The alternate homepage will be at `/home-alt` — you can later swap it with `/` if desired
- Solution pages will have placeholder content initially that can be customized with specific messaging
- All styling follows existing patterns and visual rhythm documented in project memories

