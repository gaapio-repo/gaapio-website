
# Firm Page: Replace Pricing with Challenges & Solutions Section

## Overview
Replace the "Firm Packages" pricing section on `/solutions/firm` with a new section called **"Challenges We Solve"** (or similar) that highlights the unique challenges each firm type faces and how Gaapio addresses them.

---

## Content Structure

### Three Firm Segments

| Segment | The Challenge | How Gaapio Helps |
|---------|---------------|------------------|
| **Small Firms** | Pre-audit clients need basic technical support, but hiring specialized staff isn't cost-effective. Associates lack confidence in technical areas. | Internal GPT answers questions instantly. Contract Analysis and Lease Accounting tools let junior staff handle complex tasks without senior oversight. |
| **Technical Accounting Practices** | Research and memo-writing consumes hours of senior time. Quality varies across staff. Clients expect Big 4–level deliverables at regional firm prices. | AI-powered research and memo generation cuts hours to minutes. Standardized workflows ensure consistent, defensible output every time. |
| **Firms Serving Public Companies** | SEC deadlines are unforgiving. SOX documentation is tedious. Disclosure benchmarking requires expensive tools or manual work. | SOX Compliance module streamlines control documentation. Footnote Disclosure generation with peer benchmarking delivers audit-ready output fast. |

---

## Design Approach

### Option: 3-Column Card Layout
Each card features:
- **Firm Type Header** (with icon or badge)
- **"The Challenge"** section - 2-3 sentences describing pain points
- **"How Gaapio Helps"** section - bullet points showing solutions
- **CTA button** linking to `/firm-signup`

### Visual Style
- Consistent with existing page design (gradient background, decorative blurs)
- Cards use white background with subtle borders
- Each card has a distinct accent color or icon to differentiate segments
- No pricing shown (that lives on the signup page)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/solutions/FirmTiersSection.tsx` | Replace pricing content with challenges/solutions content |
| `src/pages/solutions/AccountingFirm.tsx` | No changes needed (component is already imported) |

---

## New Component Content

```typescript
const firmChallenges = [
  {
    id: "smallFirm",
    name: "Small Firms",
    subtitle: "Pre-audit stage clients",
    challenge: "Hiring specialized technical staff isn't cost-effective, but clients still need reliable guidance on contracts, leases, and accounting questions.",
    solutions: [
      "Internal GPT answers technical questions instantly",
      "Contract Analysis handles complex reviews",
      "Lease Accounting tools let junior staff perform senior-level work"
    ]
  },
  {
    id: "technicalAccounting",
    name: "Technical Accounting Practices",
    subtitle: "Complex research & deliverables",
    challenge: "Research and memo-writing consumes hours of senior time. Quality varies across staff, and clients expect Big 4–level deliverables.",
    solutions: [
      "AI-powered research cuts hours to minutes",
      "Memo generation ensures consistent, defensible output",
      "Standardized workflows reduce prep time"
    ]
  },
  {
    id: "fullFirm",
    name: "Firms Serving Public Companies",
    subtitle: "SEC filings & SOX compliance",
    challenge: "SEC deadlines are unforgiving. SOX documentation is tedious. Disclosure benchmarking requires expensive tools or manual work.",
    solutions: [
      "SOX Compliance module streamlines control documentation",
      "Footnote Disclosure generation with peer benchmarking",
      "Audit suite delivers audit-ready output fast"
    ]
  }
];
```

---

## Section Title Options
- "Challenges We Solve"
- "Built for Every Firm Type"
- "How Gaapio Helps Your Firm"

---

## Summary
This change shifts the messaging from "here's what you pay" to "here's the problem you have and how we solve it" - a more compelling value proposition for the solutions page. Pricing details will still be available on the `/firm-signup` page when users are ready to purchase.
