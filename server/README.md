# Dark War Survival - Email Backend Setup

This backend server handles sending password reset emails for the Dark War Survival application.

## Setup Instructions

### 1. Install Dependencies

```powershell
cd server
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the `server` folder (copy from `.env.example`):

```powershell
cp .env.example .env
```

### 3. Setup Gmail App Password (Recommended)

**For Gmail:**
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** if not already enabled
3. Search for "App passwords" or go to https://myaccount.google.com/apppasswords
4. Click "Select app" → Choose "Mail"
5. Click "Select device" → Choose "Windows Computer" (or Other)
6. Click **Generate**
7. Copy the 16-character password (remove spaces)
8. Edit your `.env` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # Paste your 16-char app password
```

**For Outlook/Hotmail:**
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```
Then change `service: 'gmail'` to `service: 'outlook'` in `index.js` line 16

**For Yahoo:**
```env
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password  # Generate at https://login.yahoo.com/account/security
```
Then change `service: 'gmail'` to `service: 'yahoo'` in `index.js` line 16

### 4. Start the Backend Server

```powershell
npm start
```

Or for development with auto-restart:
```powershell
npm run dev
```

The server will run on **http://localhost:3001**

### 5. Start Your Frontend (in a new terminal)

```powershell
# Navigate back to the main project folder
cd ..
npm run dev
```

## Testing

1. Make sure both servers are running:
   - Backend: `http://localhost:3001`
   - Frontend: `http://localhost:5173`

2. Go to your website and click "Sign In"
3. Click "Forgot password?"
4. Enter a registered email address
5. Check your email inbox for the password reset link

## Troubleshooting

**Email not sending?**
- Check that your `.env` file has the correct email and password
- For Gmail, make sure you're using an App Password, not your regular password
- Check the server console for error messages
- Verify your email service allows "less secure apps" or app passwords

**Server not starting?**
- Make sure you ran `npm install` in the server folder
- Check that port 3001 isn't already in use
- Look for error messages in the console

**Frontend can't connect to backend?**
- Verify the backend server is running on port 3001
- Check browser console for CORS or network errors
- Make sure the API URL in ForgotPassword.jsx matches your backend URL

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of regular passwords
- In production, use environment variables and secure hosting
- Consider rate limiting for the password reset endpoint
