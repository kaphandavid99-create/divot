# Google OAuth Setup Instructions

## What Has Been Done

1. **Modernized Signup and Login Forms:**
   - Beautiful glassmorphism design with gradient backgrounds
   - Password visibility toggle (show/hide password) for both password fields
   - Inline SVG icons for all input fields (User, Email, Phone, Lock, Eye icons)
   - Modern rounded corners, backdrop blur effects, and smooth transitions
   - Responsive design with proper spacing

2. **Google OAuth Infrastructure:**
   - Installed `next-auth` package
   - Created NextAuth configuration at `app/api/auth/[...nextauth]/route.ts`
   - Updated `.env` file with Google OAuth placeholders
   - Updated `.env.example` with all required environment variables
   - Google sign-in button added to both login and signup pages

## What You Need to Do

### 1. Get Google OAuth Credentials

1. Go to https://console.cloud.google.com
2. Create a project or select an existing one
3. Go to **APIs & Services** > **OAuth consent screen**
4. Configure the consent screen (External user type)
5. Go to **APIs & Services** > **Credentials**
6. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
7. Select **Web application**
8. Add authorized redirect URI: `http://localhost:3010/api/auth/callback/google`
9. Click **CREATE**
10. Copy the **Client ID** and **Client Secret**

### 2. Update Environment Variables

Open the `.env` file in your project root and update the following lines:

```env
# Replace with your actual Google OAuth credentials
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret

# Generate a random secret for NextAuth (you can use: openssl rand -base64 32)
NEXTAUTH_SECRET=your-generated-random-secret
NEXTAUTH_URL=http://localhost:3010
```

### 3. Restart the Development Server

After updating the `.env` file, restart your development server for the changes to take effect:

```bash
npm run dev
```

## How Google OAuth Works

1. When a user clicks "Sign up with Google" or "Sign in with Google", they are redirected to Google's consent page
2. After authorizing, Google redirects back to your app with user information
3. The NextAuth callback automatically:
   - Checks if the user exists in your PostgreSQL database
   - Creates a new user if they don't exist (with email, name from Google)
   - Logs the user in using JWT tokens
4. The user is redirected to the home page

## Testing

1. Start the development server
2. Navigate to `/login` or `/signup`
3. Click the "Sign in with Google" or "Sign up with Google" button
4. Complete the Google OAuth flow
5. Verify that the user is created in your database

## Notes

- Google OAuth users will have an empty password field in the database (they authenticate via Google)
- The forms work with both email/password authentication and Google OAuth
- Email/password authentication uses your existing JWT-based system
- Google OAuth uses NextAuth session management
