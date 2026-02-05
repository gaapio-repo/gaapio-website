
# Firm Page Enhancements & Signup Split Implementation Plan

## Overview

This plan addresses two major requests:
1. Add three tier-focused sections to the Accounting Firm page under "Why Firms Run on Gaapio"
2. Create a Company/Firm split on the signup flow, with a new firm-specific pricing page

---

## Part 1: Firm Page - Three Tier Sections

### Current State
The `/solutions/firm` page has a "Why Firms Run on Gaapio" section with 2 generic benefit cards. The user wants to highlight the three distinct tiers of service targeted at different firm types.

### Proposed Sections

I will add three new cards/sections below "Why Firms Run on Gaapio" that explain what each tier is designed for:

| Tier | Target Audience | Key Features | Price |
|------|-----------------|--------------|-------|
| **Audit Support** | Firms with pre-audit stage clients | Contract Analysis, Lease Accounting Export, Internal GPT | $1,500/yr |
| **Technical Accounting** | Firms doing technical accounting work | Technical Accounting Memos, Research Tools, + all Audit Support features | $3,000/yr |
| **Full Firm** | Firms serving public companies | SOX Compliance, Disclosure Generation, + all lower-tier features | $3,600/yr |

### Design Approach
- Create a new section component called `FirmTiersSection`
- Use a 3-column card layout (responsive to single column on mobile)
- Each card shows: Tier name, target description, feature list, "Sign Up" CTA
- Place this section after the current "Why Firms Run on Gaapio" section

---

## Part 2: Signup Split - Company vs Firm

### Current Flow
- `/signup` page shows 4 pricing tiers (Research, Core, Pro, Enterprise)
- All CTAs go directly to this page

### New Flow

```text
User clicks "Sign Up Now" anywhere on site
          ↓
    /signup-select (NEW)
    "Choose Your Account Type"
          ↓
    ┌─────────────────┬─────────────────┐
    │    Company      │    CPA Firm     │
    │  (for internal  │  (for serving   │
    │   accounting)   │   clients)      │
    └─────────────────┴─────────────────┘
          ↓                   ↓
      /signup             /firm-signup (UPDATED)
   (existing page)      (new pricing flow)
```

### Implementation Details

#### 1. New Signup Selection Page (`/signup-select`)
- Reuse the existing `ClientTypeSelector` component 
- Two cards: "Company" and "CPA Firm"
- Company → redirects to `/signup`
- CPA Firm → redirects to `/firm-signup`

#### 2. Updated Firm Signup Page (`/firm-signup`)
The current FirmSignup page is a contact form. I will transform it into a full pricing flow mirroring the company signup:

**Firm Products (from Stripe):**

| Plan | Price | Price ID | Features |
|------|-------|----------|----------|
| **Audit Support** | $1,500/year | `price_1SxXUKErMdi9YyI1hz4kNVNp` | Internal GPT, Contract Analysis, Lease Accounting Export |
| **Technical Accounting** | $3,000/year | `price_1SxXW8ErMdi9YyI17r8TSIA8` | Technical Accounting Memos, Accounting Research tools, All Tier 1 features |
| **Full Firm** | $3,600/year | `price_1SxXYzErMdi9YyI1aE9R9wyQ` | SOX compliance, Footnote Discloser, Audit suite, All lower-tier features |
| **Custom** | Contact Sales | N/A | Custom pricing, volume discounts, dedicated support |

#### 3. Update CTAs Across Site
- Change "Sign Up Now" links to point to `/signup-select` instead of `/signup`
- Affected pages: Homepage, Firm solutions page, other product pages

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/SignupSelect.tsx` | New account type selection page |
| `src/components/solutions/FirmTiersSection.tsx` | New section for firm page showing 3 tiers |
| `src/components/signup/FirmProductSelector.tsx` | Firm-specific pricing cards (mirroring ProductSelector) |
| `src/components/signup/FirmSignupInfoForm.tsx` | Firm-specific info form with company label |

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add route for `/signup-select` |
| `src/pages/solutions/AccountingFirm.tsx` | Add FirmTiersSection component, update Sign Up CTA |
| `src/pages/FirmSignup.tsx` | Replace contact form with full pricing flow |
| `src/components/home/HeroSection.tsx` | Update Sign Up CTA link |
| `src/components/home/FinalCtaSection.tsx` | Update Sign Up CTA link |

---

## Technical Details

### Stripe Product Configuration

```typescript
// For FirmProductSelector.tsx
export const FIRM_STRIPE_PRODUCTS = {
  auditSupport: {
    id: "auditSupport",
    name: "Audit Support",
    price: 1500,
    priceId: "price_1SxXUKErMdi9YyI1hz4kNVNp",
    productId: "prod_TvOGNzrXBhYqUD",
    description: "For firms with pre-audit stage clients",
    features: [
      "Internal GPT for your firm",
      "Contract Analysis",
      "Lease Accounting Export",
      "Low-volume focus (1-2 leases per client)"
    ],
    popular: false
  },
  technicalAccounting: {
    id: "technicalAccounting",
    name: "Technical Accounting",
    price: 3000,
    priceId: "price_1SxXW8ErMdi9YyI17r8TSIA8",
    productId: "prod_TvOIdC5x1VGG8R",
    description: "For firms doing technical accounting work",
    features: [
      "Technical Accounting Memos",
      "Accounting Research tools (research, analysis, memo writer)",
      "All Audit Support features included"
    ],
    popular: true
  },
  fullFirm: {
    id: "fullFirm",
    name: "Full Firm",
    price: 3600,
    priceId: "price_1SxXYzErMdi9YyI1aE9R9wyQ",
    productId: "prod_TvOLPib96fbCV7",
    description: "For firms serving public companies",
    features: [
      "SOX Compliance module",
      "Footnote Disclosure generation & benchmarking",
      "Audit suite (memo auditor, lease auditor)",
      "All lower-tier features included"
    ],
    popular: false
  },
  contact: {
    id: "contact",
    name: "Custom",
    price: null,
    priceId: null,
    productId: null,
    description: "Custom pricing for larger firms",
    features: [
      "Custom user limits",
      "Volume discounts", 
      "Dedicated support",
      "Custom integrations"
    ],
    popular: false
  }
};
```

### Routing Updates

```typescript
// In App.tsx
import SignupSelect from "./pages/SignupSelect";

// Add route
<Route path="/signup-select" element={<SignupSelect />} />
```

### CTA Link Updates

All "Sign Up Now" CTAs that currently point to `/signup` will be updated to `/signup-select`:
- HeroSection.tsx
- FinalCtaSection.tsx
- AccountingFirm.tsx
- PrivateCompany.tsx
- PublicCompany.tsx

---

## User Flow Diagram

```text
                    ┌─────────────────────────┐
                    │   Any "Sign Up" CTA     │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │    /signup-select       │
                    │  "Choose Account Type"  │
                    └───────────┬─────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
              ▼                                   ▼
    ┌─────────────────┐               ┌─────────────────┐
    │     Company     │               │    CPA Firm     │
    └────────┬────────┘               └────────┬────────┘
             │                                  │
             ▼                                  ▼
    ┌─────────────────┐               ┌─────────────────┐
    │    /signup      │               │  /firm-signup   │
    │   4 tiers:      │               │   4 tiers:      │
    │   Research      │               │   Audit Support │
    │   Core          │               │   Technical     │
    │   Pro           │               │   Full Firm     │
    │   Enterprise    │               │   Custom        │
    └────────┬────────┘               └────────┬────────┘
             │                                  │
             ▼                                  ▼
    ┌─────────────────┐               ┌─────────────────┐
    │  Info Form +    │               │  Info Form +    │
    │  User Count     │               │  User Count     │
    └────────┬────────┘               └────────┬────────┘
             │                                  │
             └──────────────┬───────────────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Stripe Checkout   │
                 │   (opens new tab)   │
                 └─────────────────────┘
```

---

## Summary

This implementation:
1. Adds a clear three-tier section to the Firm page explaining who each tier is for
2. Creates a "split" signup flow where users first choose Company vs Firm
3. Gives firms a dedicated pricing page with firm-specific products
4. Maintains consistency with the existing company signup flow
5. Uses the actual Stripe products/prices the user created
