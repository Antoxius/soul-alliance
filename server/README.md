# Soul Alliance Backend

Advanced Node.js/Express backend for player authentication and data management.

## Features

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Player Profile Management
- ✅ Stats Tracking (games, wins, kills, etc.)
- ✅ Achievements System
- ✅ Inventory Management
- ✅ Leaderboard
- ✅ Rate Limiting & Security
- ✅ MongoDB Database

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3001
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CORS_ORIGIN=https://antoxius.github.io
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Replace `<password>` and `<dbname>` in URI

### 3. Run Locally

```bash
npm run dev
```

### 4. Deploy to Railway

1. Push code to GitHub
2. In Railway dashboard:
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Add environment variables in Settings
   - Railway will auto-deploy

3. Get your Railway domain from Settings → Networking

## API Endpoints

### Authentication

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "player1",
  "email": "player@example.com",
  "password": "password123",
  "displayName": "Player One"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "player@example.com",
  "password": "password123"
}
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Player Data

**Get Profile**
```http
GET /api/player/profile
Authorization: Bearer <token>
```

**Update Profile**
```http
PUT /api/player/profile
Authorization: Bearer <token>

{
  "displayName": "New Name",
  "preferences": {
    "theme": "dark"
  }
}
```

**Update Stats**
```http
PUT /api/player/stats
Authorization: Bearer <token>

{
  "gamesPlayed": 1,
  "wins": 1,
  "kills": 5
}
```

**Add Achievement**
```http
POST /api/player/achievement
Authorization: Bearer <token>

{
  "name": "First Blood",
  "description": "Got first kill"
}
```

**Get Leaderboard**
```http
GET /api/player/leaderboard
Authorization: Bearer <token>
```

## Player Data Structure

```javascript
{
  username: "player1",
  email: "player@example.com",
  playerData: {
    displayName: "Player One",
    rank: "R2", // R2, R3, R4, R5
    level: 1,
    experience: 0,
    avatar: "https://...",
    stats: {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0
    },
    achievements: [...],
    inventory: [...],
    preferences: {
      theme: "dark",
      notifications: true,
      privacy: "public"
    }
  }
}
```

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 min)
- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- MongoDB injection protection
