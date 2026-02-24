

## Add Microsoft Entra ID (Azure AD) Login to Admin Portal

### Overview
Add a "Sign in with Microsoft" button to the login page that uses Supabase's built-in Azure/Entra ID OAuth provider. Since you've already configured Entra ID in the Supabase dashboard, this only requires a frontend change.

### What will change

**Login Page (`src/pages/Login.tsx`)**
- Add a "Sign in with Microsoft" button below the existing login form
- The button calls `supabase.auth.signInWithOAuth({ provider: 'azure', options: { redirectTo, scopes: 'email' } })`
- It will be placed after the Magic Link button, separated by an "or" divider
- After OAuth redirect, the existing `useEffect` session check will detect the session and redirect to `/admin`
- The `AdminPageGuard` will handle admin role verification as usual -- Entra ID users without the admin role will be blocked

### Technical details

- Uses `supabase.auth.signInWithOAuth({ provider: 'azure' })` with `redirectTo` set to the current origin + `/admin`
- Supabase handles the entire OAuth flow (redirect to Microsoft, token exchange, session creation)
- No new pages, routes, or backend changes needed
- The `scopes` option requests `email` to ensure the user's email is available for role lookups

### Files to modify
- `src/pages/Login.tsx` -- add Microsoft sign-in button with OAuth handler

