# Discord OAuth Setup for Netlify

## Step 1: Configure Discord Developer Portal

1. Go to https://discord.com/developers/applications
2. Select your application (ID: 1465779916518723796)
3. Go to "OAuth2" section
4. Add these Redirect URIs:
   - `https://kvshokwav.netlify.app/auth/callback`
   - `https://kvshokwav.gg/auth/callback` (when DNS is ready)

## Step 2: Get Your Discord Client Secret

1. In Discord Developer Portal, go to "OAuth2" section
2. Copy your **Client Secret** (keep this private!)
3. Your Client ID is: `1465779916518723796`

## Step 3: Add Environment Variables to Netlify

1. Go to your Netlify dashboard: https://app.netlify.com/sites/kvshokwav/settings
2. Click on "Environment variables" in the left sidebar
3. Add these 3 variables:

   **Variable 1:**
   - Key: `DISCORD_CLIENT_ID`
   - Value: `1465779916518723796`

   **Variable 2:**
   - Key: `DISCORD_CLIENT_SECRET`
   - Value: `[YOUR_CLIENT_SECRET_FROM_DISCORD]`

   **Variable 3:**
   - Key: `REDIRECT_URI`
   - Value: `https://kvshokwav.netlify.app/auth/callback`

4. Click "Save" for each variable

## Step 4: Redeploy Your Site

After adding the environment variables:
1. Go to "Deploys" tab in Netlify
2. Click "Trigger deploy" → "Deploy site"
3. Wait for the build to complete

## Step 5: Test the OAuth Flow

1. Visit https://kvshokwav.netlify.app
2. Click "Login with Discord"
3. You should be redirected to Discord's authorization page
4. After authorizing, you'll be redirected back to your dashboard
5. You should see your real Discord servers where you have admin permissions

## Troubleshooting

If login doesn't work:
- Check browser console for errors (F12)
- Verify all environment variables are set correctly in Netlify
- Make sure the redirect URI in Discord matches exactly: `https://kvshokwav.netlify.app/auth/callback`
- Check Netlify function logs: https://app.netlify.com/sites/kvshokwav/logs/functions

## How It Works

1. User clicks "Login with Discord"
2. User is redirected to Discord OAuth page
3. After authorization, Discord redirects back with a `code` parameter
4. Your Netlify serverless function exchanges the code for an access token
5. The function fetches user info and server list from Discord API
6. User data is returned to the frontend and stored in cookies
