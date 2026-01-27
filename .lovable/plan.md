

# Apply Homepage Styling to Product Pages

## Overview
This plan updates all 6 product pages to match the homepage's visual rhythm by applying the brand blue gradient hero, consistent section backgrounds, and the blue gradient Final CTA section to create cohesive visual "bookends".

---

## Current State vs Target State

```text
HOMEPAGE (current - working well):
┌─────────────────────────────────────────────┐
│  HERO - Blue gradient with GradientBackground │
├─────────────────────────────────────────────┤
│  TRUST BAR - Light slate-50                   │
├─────────────────────────────────────────────┤
│  PRODUCT HIGHLIGHTS - White                   │
├─────────────────────────────────────────────┤
│  KEY BENEFITS - Light blue-gray gradient band │
├─────────────────────────────────────────────┤
│  FINAL CTA - Blue gradient (cta-gradient-bg)  │
├─────────────────────────────────────────────┤
│  FOOTER - Black                               │
└─────────────────────────────────────────────┘

PRODUCT PAGES (current - plain/boring):
┌─────────────────────────────────────────────┐
│  HERO - Plain white bg                        │
├─────────────────────────────────────────────┤
│  TRUST BAR - Light slate-50                   │
├─────────────────────────────────────────────┤
│  HOW IT WORKS - Various backgrounds           │
├─────────────────────────────────────────────┤
│  BENEFITS - Various backgrounds               │
├─────────────────────────────────────────────┤
│  FOOTER - Black (abrupt transition)           │
└─────────────────────────────────────────────┘

PRODUCT PAGES (target - matching homepage):
┌─────────────────────────────────────────────┐
│  HERO - Blue gradient with GradientBackground │
├─────────────────────────────────────────────┤
│  TRUST BAR - Light slate-50                   │
├─────────────────────────────────────────────┤
│  HOW IT WORKS - White                         │
├─────────────────────────────────────────────┤
│  BENEFITS - Light blue-gray gradient band     │
├─────────────────────────────────────────────┤
│  FINAL CTA - Blue gradient (cta-gradient-bg)  │
├─────────────────────────────────────────────┤
│  FOOTER - Black                               │
└─────────────────────────────────────────────┘
```

---

## Pages to Update

1. **Accounting Memos** (`/accounting-memos`)
2. **Contract Analysis** (`/contract-analysis`)
3. **Footnote Disclosures** (`/footnote-disclosures`)
4. **Research GPT** (`/research`)
5. **Guidance Updates** (`/guidance-updates`)
6. **SOX Controls** (`/sox`) - Currently just "Coming Soon", will add full structure

---

## Technical Changes

### 1. Hero Section Updates

Each product page hero component needs to add the `GradientBackground` component for the blue gradient effect. The text colors need adjustment to be readable on the blue background.

**Components to update:**
- `src/components/home/HeroSectionRight.tsx` (Accounting Memos)
- `src/components/contract/ContractHeroSection.tsx`
- `src/components/disclosures/DisclosureHeroSection.tsx`
- `src/components/research/ResearchHeroSection.tsx`
- `src/components/guidance/GuidanceHeroSection.tsx`
- `src/components/sox/SOXHeroSection.tsx`

**Key changes per hero:**
- Import and add `GradientBackground` component
- Remove `bg-white dark:bg-background` class
- Update text colors: headlines to `text-gray-900 dark:text-white` or white depending on contrast
- Update subtitle colors to work on blue background
- Update buttons to match homepage style (`variant="black"` primary, white outline secondary)
- Ensure mockup images/cards have proper contrast (white backgrounds, shadows)

### 2. Benefits Section Background Updates

Update benefits sections to use the same light blue-gray gradient band as the homepage's "Why Gaapio" section.

**Sections to update:**
- `src/components/home/BenefitsSection.tsx` (used by Accounting Memos)
- `src/components/disclosures/DisclosureBenefitsSection.tsx`
- `src/components/research/ResearchBenefitsSection.tsx`

**Add background class:**
```tsx
className="bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 dark:from-slate-800/60 dark:via-slate-800/60 dark:to-slate-800/60"
```

### 3. How It Works Section Background Updates

Standardize "How It Works" sections to use white backgrounds for contrast.

**Sections to update:**
- `src/components/home/HowItWorksSection.tsx`
- `src/components/contract/ContractHowItWorksSection.tsx`
- `src/components/disclosures/DisclosureHowItWorksSection.tsx`
- `src/components/research/ResearchHowItWorksSection.tsx`
- `src/components/guidance/GuidanceHowItWorksSection.tsx`

### 4. Add FinalCtaSection to All Product Pages

Import and add the `FinalCtaSection` component before the footer on each product page.

**Pages to update:**
- `src/pages/AccountingMemos.tsx`
- `src/pages/ContractAnalysis.tsx`
- `src/pages/FootnoteDisclosures.tsx`
- `src/pages/ResearchGPT.tsx`
- `src/pages/GuidanceUpdates.tsx` (replace existing `FinalCtaBanner`)
- `src/pages/SOXControls.tsx`

### 5. SOX Controls Page - Full Structure

Currently this page is just a "Coming Soon" placeholder. Update to use the full product page structure with SOXHeroSection.

---

## Detailed File Changes

### Hero Components - Add Blue Gradient

**Example pattern (to apply to each hero):**
```tsx
// Add import
import { GradientBackground } from "@/components/home/GradientBackground";

// Update section wrapper
<section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden">
  {/* Add gradient background */}
  <GradientBackground />
  
  {/* Update text colors for blue background */}
  <h1 className="... text-gray-900 dark:text-white">
  <p className="... text-gray-800 dark:text-white/90">
  
  {/* Update buttons to match homepage */}
  <Button variant="black" ...>Request a Demo</Button>
  <Button variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100" ...>Ask a Question</Button>
```

### Product Page Structure - Add Final CTA

**Example pattern (to apply to each page):**
```tsx
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

// In the JSX, before Footer:
<FinalCtaSection />
<Footer />
```

---

## Summary of Files to Modify

| File | Changes |
|------|---------|
| `src/components/home/HeroSectionRight.tsx` | Add GradientBackground, update text/button colors |
| `src/components/contract/ContractHeroSection.tsx` | Add GradientBackground, update text/button colors |
| `src/components/disclosures/DisclosureHeroSection.tsx` | Add GradientBackground, update text/button colors |
| `src/components/research/ResearchHeroSection.tsx` | Add GradientBackground, update text/button colors |
| `src/components/guidance/GuidanceHeroSection.tsx` | Add GradientBackground, update text/button colors |
| `src/components/sox/SOXHeroSection.tsx` | Add GradientBackground, update text/button colors |
| `src/components/home/BenefitsSection.tsx` | Add light blue-gray gradient background |
| `src/components/disclosures/DisclosureBenefitsSection.tsx` | Update to use light blue-gray gradient background |
| `src/components/research/ResearchBenefitsSection.tsx` | Add light blue-gray gradient background |
| `src/pages/AccountingMemos.tsx` | Add FinalCtaSection import and component |
| `src/pages/ContractAnalysis.tsx` | Add FinalCtaSection import and component |
| `src/pages/FootnoteDisclosures.tsx` | Add FinalCtaSection, remove wrapper divs |
| `src/pages/ResearchGPT.tsx` | Add FinalCtaSection import and component |
| `src/pages/GuidanceUpdates.tsx` | Replace FinalCtaBanner with FinalCtaSection |
| `src/pages/SOXControls.tsx` | Add full product page structure |

---

## Visual Consistency Achieved

After these changes, every product page will have:
- Blue gradient hero matching the homepage
- Consistent Trust Bar styling
- White "How It Works" section
- Light blue-gray gradient "Benefits" section
- Blue gradient Final CTA section
- Smooth transition to black footer

This creates a cohesive brand experience across the entire site.

