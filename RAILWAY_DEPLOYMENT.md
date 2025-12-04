# Railway Deployment Guide

## Step 1: Deploy Backend to Railway

1. **Sign up for Railway**
   - Go to https://railway.app/
   - Click "Login" → "Login with GitHub"
   - Authorize Railway to access your GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `soul-alliance`
   - Railway will start deploying automatically

3. **Configure Root Directory**
   - Click on your deployed service
   - Go to "Settings" tab
   - Find "Root Directory"
   - Set it to: `server`
   - Click "Update"

4. **Add Environment Variables**
   - Click "Variables" tab
   - Click "Add Variable" and add these one by one:
   
   ```
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=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
   SENDGRID_FROM_EMAIL=Antoxiusalfa@gmail.com
   PORT=3001
   ```

5. **Get Your Backend URL**
   - Go to "Settings" tab
   - Under "Domains" section
   - Click "Generate Domain"
   - Copy the URL (e.g., `https://soul-alliance-production.up.railway.app`)

## Step 2: Update Frontend to Use Railway Backend

1. **Create a `.env` file in the main project folder** (not in server folder)
   
   ```env
   VITE_API_URL=https://your-app-name.up.railway.app
   ```
   
   Replace `your-app-name` with your actual Railway URL

2. **For GitHub Pages deployment**, create `.env.production`:
   
   ```env
   VITE_API_URL=https://your-app-name.up.railway.app
   ```

3. **Deploy the updated frontend:**
   
   ```powershell
   git add .
   git commit -m "Configure Railway backend URL"
   git push
   npm run deploy
   ```

## Step 3: Test Everything

1. Visit your live site: https://antoxius.github.io/soul-alliance/
2. Click "Sign In" → "Forgot password?"
3. Enter a registered email
4. Check your inbox for the password reset email!

## Troubleshooting

**If emails aren't sending:**
- Make sure you verified Antoxiusalfa@gmail.com in SendGrid
- Check Railway logs: Dashboard → Deployments → View Logs
- Verify all environment variables are set correctly

**If frontend can't connect to backend:**
- Check that VITE_API_URL matches your Railway URL exactly
- Make sure Railway service is running (should show green status)
- Check browser console for CORS errors

## Free Tier Limits

Railway free tier includes:
- $5 credit per month
- Should be enough for a small project
- Backend sleeps after 5 minutes of inactivity (wakes up instantly on request)

## Need Help?

Check the Railway documentation: https://docs.railway.app/
