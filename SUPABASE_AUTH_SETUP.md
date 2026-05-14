# Supabase Auth Configuration Guide for CareerOS

## Critical Dashboard Settings

### 1. URL Configuration (Authentication → URL Configuration)

**Site URL:**
```
http://localhost:3000
```

**Redirect URLs:** (Add these exact URLs)
```
http://localhost:3000/auth/callback
http://localhost:3000/auth/reset-password
```

For production, also add:
```
https://yourdomain.com/auth/callback
https://yourdomain.com/auth/reset-password
```

### 2. Email Templates (Authentication → Email Templates)

**Confirm Signup Email Template:**

Subject: `Confirm your CareerOS account`

Body:
```html
<h2>Confirm your email</h2>
<p>Click the link below to confirm your CareerOS account:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
<p>Or copy and paste this URL: {{ .ConfirmationURL }}</p>
```

**Reset Password Email Template:**

Subject: `Reset your CareerOS password`

Body:
```html
<h2>Reset your password</h2>
<p>Click the link below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>Or copy and paste this URL: {{ .ConfirmationURL }}</p>
<p>This link expires in 1 hour.</p>
```

### 3. Email Provider (Optional but Recommended)

For production, configure a custom email provider:
- Go to Authentication → Providers → Email
- Configure SMTP settings (SendGrid, AWS SES, etc.)
- This prevents emails from going to spam

## How the Auth Flow Works

### Email Confirmation Flow:

1. User signs up at `/signup`
2. Supabase sends confirmation email with link like:
   ```
   https://grzdziufgmoowowfbxqn.supabase.co/auth/v1/verify?token=xxx&type=signup&redirect_to=http://localhost:3000/auth/callback
   ```
3. User clicks link → Supabase validates token
4. Supabase redirects to: `http://localhost:3000/auth/callback?code=xxx`
5. Our callback route exchanges code for session
6. User is redirected to `/assessment` (if new) or `/dashboard`

### Password Reset Flow:

1. User requests reset at `/forgot-password`
2. Supabase sends email with link to `/auth/reset-password`
3. User clicks link → redirected to `/reset-password#access_token=xxx`
4. Reset password page validates token
5. User submits new password
6. Password is updated, user can log in

## Testing the Auth Flow

### 1. Test Signup + Email Confirmation:

```bash
# Start dev server
npm run dev

# Open in browser
open http://localhost:3000/signup
```

1. Fill in signup form with a real email
2. Submit
3. Check email for confirmation link
4. Click confirmation link
5. Should redirect to `/assessment` (for new users)

### 2. Check Callback Logs:

Watch the browser console and server logs. The callback route logs:
- "Auth callback: User authenticated"
- "Auth callback: Redirecting to /assessment"

### 3. Common Issues:

**Error: "No code provided"**
- The redirect URL is missing the `?code=` parameter
- Check Site URL and Redirect URLs in Supabase dashboard

**Error: "exchange_failed"**
- The code has expired or already been used
- Codes are single-use and expire after a few minutes

**Error: "user_not_found"**
- Session couldn't be established after code exchange
- Check Supabase logs for details

**Redirect goes to wrong URL**
- Make sure `NEXT_PUBLIC_APP_URL` is set correctly in `.env.local`
- Default is `http://localhost:3000`

## Debugging

### Enable Supabase Debug Logs:

Add to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

### Check Supabase Dashboard Logs:

1. Go to Supabase Dashboard → Logs
2. Filter by "auth" to see authentication events
3. Look for errors in the confirmation flow

### Test Callback Directly:

You can manually test the callback by visiting:
```
http://localhost:3000/auth/callback?code=test
```

This should show an error page (since "test" is not a valid code), but confirms the route is working.

## Files That Handle Auth:

- `app/auth/callback/route.ts` - Handles email confirmation and OAuth callbacks
- `app/reset-password/page.tsx` - Handles password reset token
- `hooks/use-auth.ts` - Client-side auth operations
- `lib/supabase/server.ts` - Server-side Supabase client
- `middleware.ts` - Route protection

## Environment Variables Required:

```env
NEXT_PUBLIC_SUPABASE_URL=https://grzdziufgmoowowfbxqn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Support

If issues persist:
1. Check browser network tab for the exact redirect URL
2. Verify code is being passed in query params
3. Check Supabase Dashboard → Logs → Auth for errors
4. Ensure database migrations have been run (users table exists)