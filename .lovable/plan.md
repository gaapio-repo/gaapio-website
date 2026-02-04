

# Admin Portal Cleanup: Hide Firm Signups & Clean Up Settings

## Summary

I'll hide the Firm Signups tab (no longer in use) and clean up the Settings tab by removing obsolete components.

---

## 1. Hide Firm Signups Tab

The Firm Signups tab is no longer needed. I'll:
- Set the default visibility to `false` for the "firms" tab in both `Admin.tsx` and `TabVisibilitySettings.tsx`
- Remove it from the TabVisibilitySettings list entirely so admins can't accidentally re-enable it

---

## 2. Settings Tab Review

The Settings tab currently contains these sections:

| Section | Status | Action |
|---------|--------|--------|
| **Password Protection** | Disabled stub - just displays "Feature Disabled" message | **Remove** - No functionality |
| **Admin Users** | Working - Shows admins, allows adding new admins | **Keep** |
| **Tab Visibility Settings** | Working - Toggles tabs on/off | **Keep** (update to remove Firms option) |
| **Integrations (Zapier)** | Disabled stub - just says Zapier was removed | **Remove** - No functionality |
| **Feature Toggles** | Working - Toggles homepage features via database | **Keep** |

### Components to Remove:
1. `PasswordProtectionSettings` - Just a placeholder with no functionality
2. `ZapierWebhookSetup` - Just a placeholder with no functionality

### Components to Keep:
1. Admin Users management (working)
2. Tab Visibility Settings (update to remove "firms" option)
3. Feature Toggles (working, now database-backed)

---

## Implementation Steps

### Step 1: Update Tab Visibility Settings
Remove "Firm Signups" from the list of toggleable tabs since we're permanently hiding it.

**File:** `src/components/admin/TabVisibilitySettings.tsx`

### Step 2: Update Admin.tsx
- Set `firms: false` in the default tab visibility state
- Remove the `PasswordProtectionSettings` component from the Settings tab
- Remove the `ZapierWebhookSetup` component from the Settings tab
- Remove the Firm Signups tab trigger and content

**File:** `src/pages/Admin.tsx`

### Step 3: Clean Up Imports (Optional)
Remove unused imports from Admin.tsx:
- `PasswordProtectionSettings`
- `ZapierWebhookSetup`
- `FirmSignupsTable`

---

## Result

The Settings tab will contain only functional components:
1. **Admin Users** - Manage admin access
2. **Admin Portal Settings** - Tab visibility toggles (without Firms option)
3. **Feature Toggles** - Homepage feature controls (database-backed)

