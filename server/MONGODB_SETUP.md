# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - FREE)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Select "FREE" (M0) tier
   - Choose cloud provider & region (closest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `soulalliance`
   - Password: Generate a secure password
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `soul-alliance`

Example:
```
mongodb+srv://soulalliance:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/soul-alliance?retryWrites=true&w=majority
```

6. **Add to Railway**
   - In Railway project, go to your service
   - Click "Variables" tab
   - Add new variable:
     - Key: `MONGODB_URI`
     - Value: Your full connection string
   - Add other environment variables:
     - `JWT_SECRET`: Generate random string (use: https://randomkeygen.com/)
     - `CORS_ORIGIN`: `https://antoxius.github.io`
     - `NODE_ENV`: `production`

## Test Your Backend

After deploying to Railway:

1. Get your Railway domain (Settings → Networking → Generate Domain)
2. Test health endpoint:
   ```
   https://your-app.up.railway.app/api/health
   ```
3. Test registration:
   ```bash
   curl -X POST https://your-app.up.railway.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@test.com","password":"password123"}'
   ```

Your backend will be ready to use!
