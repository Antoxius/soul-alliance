# 🎮 Soul Alliance - Advanced Login System

## ✅ What's Been Created

### Backend (Node.js/Express)
Located in `/server` folder:

- **Full Authentication System**
  - User registration with validation
  - Secure login (username or email)
  - JWT token-based authentication
  - Password hashing with bcrypt
  - Protected routes requiring authentication

- **Player Data Management**
  - Comprehensive player profiles
  - Game statistics tracking (kills, deaths, wins, losses, K/D ratio)
  - Achievements system
  - Inventory management
  - Player preferences
  - Rank system (R2, R3, R4, R5)
  - Leaderboard functionality

- **Security Features**
  - Helmet.js security headers
  - Rate limiting (100 requests per 15 min)
  - CORS protection
  - Input validation
  - Password encryption

### Frontend (React)
- **Advanced Login Page** (`/login`)
  - Beautiful dark theme with red accents
  - Login/Register toggle
  - Real-time validation
  - Error handling
  - Loading states
  
- **Player Dashboard** (`/dashboard`)
  - Profile overview with avatar
  - Quick stats cards
  - Tabbed interface:
    - Overview: Account info & preferences
    - Statistics: Combat stats & K/D ratio
    - Achievements: Unlocked achievements
    - Inventory: Player items
  - Logout functionality

- **Authentication Context**
  - Global auth state management
  - Automatic token refresh
  - Protected routes
  - User persistence

- **Navigation Updates**
  - Login/Dashboard links (dynamic based on auth state)
  - Shows "Login" when logged out
  - Shows "Dashboard" when logged in

## 🚀 Quick Start

### 1. Set Up MongoDB
Follow `server/MONGODB_SETUP.md` to create free MongoDB Atlas database.

### 2. Deploy Backend to Railway
Follow `DEPLOYMENT_GUIDE.md` Part 2 for step-by-step instructions.

### 3. Configure Frontend
Create `.env` file in project root:
```env
VITE_API_URL=https://your-railway-domain.up.railway.app/api
```

### 4. Test Locally (Optional)
```powershell
# Terminal 1 - Run backend
cd server
npm install
npm run dev

# Terminal 2 - Run frontend  
npm install
npm run dev
```

### 5. Deploy Frontend
```powershell
npm run deploy
```

## 📁 Project Structure

```
Dark-War/
├── server/                      # Backend
│   ├── models/
│   │   └── User.js             # User schema with player data
│   ├── routes/
│   │   ├── auth.js             # Login, register, password reset
│   │   └── player.js           # Profile, stats, achievements
│   ├── middleware/
│   │   └── auth.js             # JWT authentication
│   ├── server.js               # Express server
│   ├── package.json
│   ├── .env.example
│   ├── railway.json            # Railway config
│   └── README.md               # API documentation
│
├── src/
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── pages/
│   │   ├── Login.jsx           # Login/Register page
│   │   ├── Login.scss
│   │   ├── Dashboard.jsx       # Player dashboard
│   │   └── Dashboard.scss
│   ├── Components/
│   │   └── Navigation.jsx      # Updated with Login/Dashboard
│   ├── router.jsx              # Routes updated
│   └── main.jsx                # Wrapped with AuthProvider
│
├── .env.example                # Frontend env template
├── DEPLOYMENT_GUIDE.md         # Full deployment guide
└── README.md                   # This file
```

## 🎯 Features

### Player Data Storage
Every registered user gets:
- **Profile**: Username, email, display name, avatar, rank
- **Stats**: Games played, wins, losses, kills, deaths
- **Achievements**: Unlockable achievements with timestamps
- **Inventory**: Items with quantities
- **Preferences**: Theme, notifications, privacy settings
- **Level & Experience**: Progression system
- **Timestamps**: Registration date, last login

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password

**Player Data:**
- `GET /api/player/profile` - Get player profile
- `PUT /api/player/profile` - Update profile
- `PUT /api/player/stats` - Update game statistics
- `POST /api/player/achievement` - Add achievement
- `POST /api/player/inventory` - Add item
- `GET /api/player/leaderboard` - Get top players

Full API docs in `server/README.md`.

## 🔐 Security

- **Passwords**: Hashed with bcrypt (10 salt rounds)
- **Tokens**: JWT with 7-day expiration
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Restricted to your domain
- **Validation**: Input validation on all endpoints
- **Headers**: Helmet.js security headers

## 🎨 Design

**Color Scheme:**
- Dark background: `#0a0a0a` to `#1a0a0a`
- Primary red: `#dc2626`
- Accents: `#991b1b`

**Rank Colors:**
- R5 (Leader): Gold gradient
- R4 (Officers): Purple gradient
- R3 (Elite): Blue gradient
- R2 (Members): Green gradient

## 📝 Next Steps

1. **Deploy Backend**: Follow `DEPLOYMENT_GUIDE.md`
2. **Set up MongoDB**: Free cluster on MongoDB Atlas
3. **Configure Environment**: Add Railway URL to `.env`
4. **Deploy Frontend**: `npm run deploy`
5. **Test**: Create account and verify all features work

## 🆘 Need Help?

- **Backend not connecting?** Check `DEPLOYMENT_GUIDE.md` troubleshooting
- **API documentation?** See `server/README.md`
- **MongoDB setup?** See `server/MONGODB_SETUP.md`
- **CORS issues?** Verify CORS_ORIGIN matches your domain exactly

## 🎉 What You Can Do Now

1. Users can register and login
2. Each user has persistent data stored in MongoDB
3. Track player statistics (kills, deaths, wins, K/D ratio)
4. Award achievements
5. Manage player inventory
6. View leaderboards
7. Secure authentication with JWT
8. Beautiful, responsive UI

Your advanced login system with full player data management is ready to deploy! 🚀
