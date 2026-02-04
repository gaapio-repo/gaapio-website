

## Blog Page Refresh Plan

This plan covers two objectives: adding Blog to the Company navigation dropdown and redesigning the Blog page to match the site's modern, professional design system.

---

### Part 1: Add Blog to Company Navigation

**Location:** `src/components/header.tsx`

**Changes:**
- Add "Blog" entry to the `companyPages` array (lines 57-83)
- New entry will use the `FileText` icon (already imported)
- Blog will appear alongside Why We Built This, About Us, Trust & Security, and Careers
- Mobile menu will automatically include Blog since it iterates over `companyPages`

**New Entry:**
```text
Name: "Blog"
Href: "/blog"
Icon: FileText
Description: "Insights on technical accounting and technology"
```

---

### Part 2: Blog Page Redesign

The redesigned Blog page will follow the site's established "bookend" design system: brand blue gradient hero, clean content area, and seamless footer transition.

**Design Structure:**

```text
+--------------------------------------------------+
|  HERO SECTION (Brand Blue Gradient)              |
|  - Headline: "Insights & Resources"              |
|  - Subtitle: "Expert perspectives on..."         |
|  - Decorative dot grid texture                   |
+--------------------------------------------------+
|  FEATURED POST (Large Card)                      |
|  - Full-width featured article                   |
|  - Large image, prominent title, excerpt         |
+--------------------------------------------------+
|  POST GRID (3-Column)                            |
|  - Remaining posts in responsive grid            |
|  - Modern card design with hover effects         |
+--------------------------------------------------+
|  NEWSLETTER CTA SECTION (Light gradient band)    |
|  - "Stay Updated" messaging                      |
|  - Subtle call-to-action                         |
+--------------------------------------------------+
|  FINAL CTA (Brand Blue Gradient -> Footer)       |
|  - Reuse FinalCtaSection component               |
+--------------------------------------------------+
```

---

### Part 3: Updated BlogPostCard Component

**Location:** `src/components/blog/BlogPostCard.tsx`

**Improvements:**
- Remove grayscale filter from images (show full color)
- Add gradient overlay on hover for visual polish
- Improve category badge styling with brand colors
- Add subtle scale animation on hover
- Improve typography hierarchy
- Add reading time estimate

---

### Part 4: Updated Blog.tsx Page

**Location:** `src/pages/Blog.tsx`

**New Sections:**

1. **Hero Section**
   - Brand blue gradient background (matching HeroSection/FinalCtaSection)
   - Dot grid texture overlay for depth
   - Large headline with white text
   - Descriptive subtitle

2. **Featured Post Section**
   - First post displayed prominently at full width
   - Larger image, bolder title treatment
   - Enhanced visual hierarchy

3. **Post Grid**
   - Remaining posts in a 3-column responsive grid
   - Scroll-triggered fade-in animations (existing pattern)
   - Card hover effects with elevation changes

4. **Newsletter/Stay Updated Section**
   - Light blue-gray gradient band (matching KeyBenefitsSection)
   - Simple messaging about staying updated
   - Subtle accent overlays

5. **Final CTA**
   - Reuse the existing `FinalCtaSection` component
   - Provides consistent "bookend" with hero

---

### Technical Details

**Files to Modify:**
1. `src/components/header.tsx` - Add Blog to companyPages array
2. `src/pages/Blog.tsx` - Complete page redesign
3. `src/components/blog/BlogPostCard.tsx` - Enhanced card styling

**Design Tokens Used:**
- Primary blue: `#0099FF` / `hsl(204 100% 50%)`
- Hero gradient: `bg-gradient-to-br from-[hsl(204,100%,55%)] via-[hsl(204,100%,50%)] to-[hsl(204,100%,45%)]`
- Light gradient band: `bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50`
- Card shadows: `shadow-lg shadow-primary/5` on hover
- Animations: `animate-fade-up`, `transition-all duration-300`

**Responsive Breakpoints:**
- Mobile: Single column post grid
- Tablet (sm): 2-column grid
- Desktop (lg): 3-column grid with featured post spanning full width

**Accessibility:**
- Proper heading hierarchy (h1 for page title, h2 for sections, h3 for cards)
- Skip-to-content link (already exists)
- Semantic HTML with role attributes
- Focus-visible states on interactive elements

---

### Sample Blog Posts

The page will use the existing 3 sample posts plus add 3 more for a fuller grid:

1. Why Technical Accounting Memos Matter (Best Practices)
2. 5 Common ASC 606 Pitfalls (Accounting Standards)
3. How AI Is Changing the Accounting Landscape (Technology)
4. Understanding ASC 842 Lease Modifications (Accounting Standards)
5. Building an Audit-Ready Documentation Process (Best Practices)
6. The Future of Technical Accounting Teams (Industry Insights)

