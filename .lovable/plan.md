

# Admin Dashboard Review & Fixes

## Summary of Issues Found

I reviewed the Admin Dashboard tab and identified several components that need updating or removal. The main problems are:

1. **Site Metrics showing stale data** - Currently reads from localStorage instead of the actual database tables
2. **"Show metrics on homepage" toggle does nothing** - The toggle saves to localStorage but no homepage code reads it
3. **Self-Signup CTA toggle not properly connected** - The HeroSection loads the setting but never uses the `enableSelfSignup` variable to change button behavior
4. **Feature toggles use localStorage** - This only works on the same browser/device and resets if users clear browser data. Should be stored in the database for persistence
5. **Duplicate FeatureToggles component** - Appears both in the Dashboard tab AND in a separate Feature Toggles tab

---

## Recommended Changes

### 1. Fix Site Metrics to Show Real Database Counts

**Current behavior:** Shows 0 for everything (reads from localStorage)
**Expected behavior:** Should display actual counts from Supabase tables

| Metric | Database Table | Actual Count |
|--------|---------------|--------------|
| Waitlist Submissions | `waitlist_submissions` | 1 |
| Contact Submissions | `contact_submissions` | 7 |
| User Sign-ups | `users` | 0 |
| Companies | `companies` | 0 |

Will update `AdminDashboard.tsx` to fetch real counts from Supabase.

### 2. Remove Non-Functional "Show Metrics on Homepage" Toggle

This toggle saves a localStorage value but nothing on the homepage actually reads it. Since it does nothing, it should be removed to avoid confusion.

### 3. Fix the Self-Signup CTA Toggle

The HeroSection component loads `enableSelfSignup` but never uses it - both buttons ("Sign Up Now" and "Request a Demo") are always shown regardless of the setting.

**Fix:** Update `HeroSection.tsx` to conditionally render "Contact Sales" instead of "Sign Up Now" when self-signup is disabled.

### 4. Migrate Feature Toggles to Database (Optional - Requires Approval)

Currently, feature toggles only persist in the current browser's localStorage. If you want these settings to work across all users/devices, they should be stored in the `site_config` table.

**Question:** Would you like me to:
- A) Keep feature toggles in localStorage (simpler, but per-browser only)
- B) Migrate to database storage (persistent across all browsers/users)

### 5. Remove Duplicate FeatureToggles

The `FeatureToggles` component currently appears in two places:
- The Dashboard tab (inside a "Homepage Feature Toggles" card)
- A separate "Feature Toggles" tab in the admin navigation

**Recommendation:** Remove it from the Dashboard tab since it has its own dedicated tab.

---

## Technical Implementation

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/admin/AdminDashboard.tsx` | Fetch real counts from Supabase, remove metrics homepage toggle, remove duplicate FeatureToggles |
| `src/components/home/HeroSection.tsx` | Use the `enableSelfSignup` state to conditionally change button text/links |

### Database Queries to Add

```text
Waitlist count: SELECT COUNT(*) FROM waitlist_submissions
Contact count: SELECT COUNT(*) FROM contact_submissions  
User count: SELECT COUNT(*) FROM users
Company count: SELECT COUNT(*) FROM companies
```

---

## What Will Be Preserved

- Under Construction toggle (already works correctly with database)
- Homepage CTA Settings (Self-Signup toggle) - will be fixed to actually work
- Feature Toggles tab (dedicated admin tab remains)

