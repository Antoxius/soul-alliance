# 🚀 Complete Deployment Guide

This guide will walk you through deploying your full-stack Soul Alliance application with backend authentication.

## 📋 Prerequisites

- GitHub account
- Railway account (sign up at https://railway.app)
- MongoDB Atlas account (free tier at https://www.mongodb.com/cloud/atlas)

---

## Part 1: Setup MongoDB Database

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account

### 2. Create a Free Cluster
1. Click "Build a Database"
2. Choose **FREE (M0)** tier
3. Select cloud provider and region (choose closest to you)
4. Cluster name: `SoulAlliance`
5. Click "Create Cluster" (takes 1-3 minutes)

### 3. Create Database User
1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Username: `soulalliance`
5. Click "Autogenerate Secure Password" - **COPY THIS PASSWORD**
6. User privileges: "Read and write to any database"
7. Click "Add User"

### 4. Whitelist IP Addresses
1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String
1. Go back to "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Select "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://soulalliance:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you copied earlier
6. Add database name at the end:
   ```
   mongodb+srv://soulalliance:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/soul-alliance?retryWrites=true&w=majority
   ```

---

## Part 2: Deploy Backend to Railway

### 1. Push Code to GitHub
```bash
# In your project root
git add .
git commit -m "Add authentication backend"
git push origin main
```

### 2. Create Railway Project
1. Go to https://railway.app
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your `soul-alliance` repository

### 3. Configure Service
1. Railway will detect your code
2. Click on the deployed service
3. Go to "Settings" tab
4. **Root Directory**: Change to `server`
   - This tells Railway to deploy only the server folder

### 4. Add Environment Variables
1. In your service, click "Variables" tab
2. Click "New Variable" and add each of these:

```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://soulalliance:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/soul-alliance?retryWrites=true&w=majority
JWT_SECRET=GENERATE_RANDOM_STRING_HERE
JWT_EXPIRE=7d
CORS_ORIGIN=https://antoxius.github.io
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Generate JWT_SECRET:**
- Go to https://randomkeygen.com/
- Copy a "256-bit WEP Key" or similar
- Paste as JWT_SECRET value

### 5. Generate Domain
1. Go to "Settings" tab
2. Scroll to "Networking" section
3. Click "Generate Domain"
4. Copy your domain (e.g., `soul-alliance-backend-production.up.railway.app`)
5. **SAVE THIS URL** - you'll need it for frontend

### 6. Deploy
1. Railway will automatically deploy
2. Check "Deployments" tab for build status
3. When you see "Success" - your backend is live!

### 7. Test Backend
Open browser or use curl:
```
https://your-railway-domain.up.railway.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Soul Alliance Backend is running",
  "timestamp": "2025-12-07T..."
}
```

---

## Part 3: Configure Frontend for Production

### 1. Create Production Environment File
Create `.env` in project root (NOT in server folder):

```env
VITE_API_URL=https://your-railway-domain.up.railway.app/api
```

Replace `your-railway-domain.up.railway.app` with YOUR Railway domain from Part 2, Step 5.

### 2. Update Railway CORS (if needed)
If you get CORS errors:
1. In Railway, go to your service Variables
2. Update `CORS_ORIGIN` to match your GitHub Pages URL exactly:
   ```
   CORS_ORIGIN=https://antoxius.github.io
   ```
3. Redeploy backend

---

## Part 4: Deploy Frontend to GitHub Pages

### 1. Install Dependencies (if needed)
```powershell
npm install
```

### 2. Build and Deploy
```powershell
npm run deploy
```

### 3. Verify Deployment
1. Go to https://antoxius.github.io/soul-alliance/
2. Click "Login" in navigation
3. Create a test account
4. You should be redirected to Dashboard

---

## 🧪 Testing Your App

### Test Registration
1. Go to https://antoxius.github.io/soul-alliance/login
2. Click "Sign Up" (toggle at bottom)
3. Fill in:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
4. Click "CREATE ACCOUNT"
5. Should redirect to Dashboard

### Test Login
1. Logout from Dashboard
2. Go back to /login
3. Enter your credentials
4. Should login successfully

### Test Player Data
1. In Dashboard, check all tabs:
   - Overview: Shows account info
   - Statistics: Shows game stats
   - Achievements: Shows unlocked achievements
   - Inventory: Shows items

---

## 🛠️ Troubleshooting

### "Failed to fetch" or Network Error
**Problem**: Frontend can't reach backend

**Solutions**:
1. Check `.env` file has correct Railway URL
2. Rebuild frontend: `npm run build`
3. Redeploy: `npm run deploy`
4. Check Railway service is running (not sleeping)
5. Verify CORS_ORIGIN in Railway matches GitHub Pages URL

### "Invalid credentials" on Login
**Problem**: User not found in database

**Solutions**:
1. Check MongoDB cluster is running
2. Verify MONGODB_URI in Railway is correct
3. Check Railway logs for database connection errors
4. Try registering a new user first

### Railway Build Fails
**Problem**: Deployment error

**Solutions**:
1. Check "Root Directory" is set to `server` in Railway Settings
2. Verify all environment variables are set
3. Check Railway logs for specific error
4. Ensure `package.json` in server folder has all dependencies

### CORS Errors
**Problem**: Browser blocks requests

**Solutions**:
1. In Railway Variables, check CORS_ORIGIN exactly matches:
   ```
   CORS_ORIGIN=https://antoxius.github.io
   ```
2. NO trailing slash!
3. Redeploy backend after changing

---

## 📊 Managing Your App

### View Backend Logs
1. In Railway, click your service
2. Click "Deployments" tab
3. Click on active deployment
4. View logs in real-time

### View Database
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. See all users and their data

### Update Backend Code
```bash
git add server/
git commit -m "Update backend"
git push origin main
```
Railway will auto-deploy!

### Update Frontend Code
```bash
# Make changes
npm run deploy
```

---

## 🎉 You're Done!

Your full-stack authentication system is live!

- **Frontend**: https://antoxius.github.io/soul-alliance/
- **Backend**: https://your-domain.up.railway.app
- **Database**: MongoDB Atlas (cloud)

### API Endpoints Available:
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `GET /api/player/profile` - Get player data
- `PUT /api/player/profile` - Update profile
- `PUT /api/player/stats` - Update stats
- `POST /api/player/achievement` - Add achievement
- `GET /api/player/leaderboard` - Get leaderboard

All documented in `server/README.md`!
