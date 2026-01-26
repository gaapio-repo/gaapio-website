

# Update CTA Section to Gaapio Blue Gradient

## Overview
This change updates the Final CTA section to use the same Gaapio brand blue gradient as the hero section, creating visual "bookends" that frame the page content. This will provide much better flow from the light "Why Gaapio" section.

---

## Current State

The CTA section currently uses a dark navy/charcoal gradient:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
```

This creates a jarring transition from the light blue-gray "Why Gaapio" section above.

---

## Proposed Changes

**File:** `src/components/home/FinalCtaSection.tsx`

### 1. Background - Use Hero Gradient
Replace the dark gradient with the existing `hero-gradient-bg` CSS class (same as hero section):

```tsx
// Before
<div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />

// After
<div className="absolute inset-0 hero-gradient-bg" />
```

### 2. Dot Grid Texture - Adjust for Blue Background
Update the dot grid to work better on the blue background (slightly increase visibility):

```tsx
// Before
className="absolute inset-0 opacity-[0.05]"

// After  
className="absolute inset-0 opacity-[0.08]"
```

### 3. Accent Glow - Make Subtle White/Light
Replace the blue glow with a subtle white glow for depth on blue:

```tsx
// Before
<div className="... bg-gradient-to-br from-primary/15 via-primary/5 to-transparent ..." />

// After
<div className="... bg-gradient-to-br from-white/10 via-white/5 to-transparent ..." />
```

### 4. Footer Transition - Remove or Soften
Since we're going from blue to black footer, adjust the transition gradient:

```tsx
// Before
<div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-black/50" />

// After
<div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
```

### 5. Typography - Update for Blue Background
Adjust text colors to match hero section styling:

```tsx
// Headline - keep white (already correct)
className="... text-white ..."

// Subtitle - change from slate-400 to white with opacity
// Before
className="... text-slate-400 ..."
// After
className="... text-white/80 ..."
```

### 6. Buttons - Match Hero Section Style
Update buttons to match hero section for consistency:

```tsx
// Primary button - change to black variant (like hero)
// Before
<Button variant="blue" className="... shadow-lg shadow-primary/25 ...">

// After
<Button variant="black" className="... hover:bg-gray-800 hover:scale-105 ...">

// Secondary button - white outline (like hero)
// Before
<Button variant="ghost" className="... text-white border border-white/20 ...">

// After
<Button variant="outline" className="... border-2 border-white text-white bg-transparent hover:bg-white/10 ...">
```

---

## Visual Result

```text
┌─────────────────────────────────────────────┐
│  WHY GAAPIO SECTION                         │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │  ← Light blue-gray band
└─────────────────────────────────────────────┘
                    ↓ (smooth flow - both have blue tones)
┌─────────────────────────────────────────────┐
│  FINAL CTA SECTION                          │
│  ████████████████████████████████████████   │  ← Gaapio Blue (matches hero!)
│  ████████████████████████████████████████   │
└─────────────────────────────────────────────┘
                    ↓ (gradient fade to black)
┌─────────────────────────────────────────────┐
│  FOOTER                                     │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │  ← Black
└─────────────────────────────────────────────┘
```

This creates a cohesive "bookend" effect where the page starts and ends with the Gaapio brand blue, with the light content sections sandwiched between.

---

## Files to Modify

1. `src/components/home/FinalCtaSection.tsx` - Update background, typography, and buttons

