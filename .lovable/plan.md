

## Add Password Reset and Magic Link Login to Admin Portal

### Overview
Add two new authentication options to the admin login page: a "Forgot Password" flow and a "Magic Link" login option. Both use Supabase's built-in auth methods, so no edge functions or database changes are needed.

### What will change

**1. Updated Login Page (`src/pages/Login.tsx`)**
- Add a "Forgot password?" link below the password field
- Add a "Send Magic Link" button as an alternative login method
- Add UI states for: forgot-password mode, magic-link mode, and success confirmations
- The form will toggle between three views: normal login, forgot password (email-only), and magic link (email-only)

**2. New Reset Password Page (`src/pages/ResetPassword.tsx`)**
- A dedicated page where users land after clicking the reset link in their email
- Detects the recovery token from the URL automatically
- Shows a simple "enter new password / confirm password" form
- Calls `supabase.auth.updateUser({ password })` to save the new password
- Redirects to `/login` on success

**3. Updated Routes (`src/App.tsx`)**
- Add `/reset-password` route pointing to the new `ResetPassword` page

### How it works

- **Password Reset**: User clicks "Forgot password?", enters email, receives a Supabase reset email with a link to `/reset-password`, then sets a new password.
- **Magic Link**: User enters email and clicks "Send Magic Link". Supabase sends a login link. When clicked, the user is authenticated and the `AdminPageGuard` checks their admin role as usual.

### Technical details

- Password reset uses `supabase.auth.resetPasswordForEmail(email, { redirectTo: origin + '/reset-password' })`
- Magic link uses `supabase.auth.signInWithOtp({ email })`
- The reset password page listens for `onAuthStateChange` with `PASSWORD_RECOVERY` event to confirm the session is ready before allowing the password update
- Admin role verification still happens through the existing `AdminPageGuard` and `has_role` RPC -- magic link users without admin access will be blocked as usual

### Files to create
- `src/pages/ResetPassword.tsx`

### Files to modify
- `src/pages/Login.tsx` -- add forgot password link and magic link button
- `src/App.tsx` -- add `/reset-password` route

