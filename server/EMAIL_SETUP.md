# Professional Email Setup Guide

Your backend now supports **3 professional email services**. Choose the one that works best for you:

---

## **Option 1: SendGrid (RECOMMENDED)**

**Why SendGrid:**
- ✅ Free tier: 100 emails/day forever
- ✅ Best deliverability (won't go to spam)
- ✅ Used by Uber, Airbnb, Spotify
- ✅ Easiest to set up

**Setup Steps:**

1. **Sign up:** https://signup.sendgrid.com/
2. **Verify your email** (check inbox)
3. **Create API Key:**
   - Go to Settings > API Keys
   - Click "Create API Key"
   - Name: "Dark War Survival"
   - Permissions: "Full Access" or "Mail Send"
   - Click "Create & View"
   - **COPY THE KEY** (you won't see it again!)

4. **Verify Sender Email:**
   - Go to https://app.sendgrid.com/settings/sender_auth
   - Click "Verify a Single Sender"
   - Enter your email (the one users will see emails from)
   - Check your inbox and click verification link

5. **Update `.env` file:**
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=your-verified-email@domain.com
```

---

## **Option 2: Resend (Modern Alternative)**

**Why Resend:**
- ✅ Free tier: 3,000 emails/month
- ✅ Modern, developer-friendly API
- ✅ Good for newer projects

**Setup Steps:**

1. **Sign up:** https://resend.com/signup
2. **Get API Key:**
   - Go to API Keys section
   - Click "Create API Key"
   - Copy the key

3. **Update `.env` file:**
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=Dark War <onboarding@resend.dev>
```

---

## **Option 3: Gmail (Fallback)**

**Why Gmail:**
- ✅ Quick to set up if you already have Gmail
- ⚠️ Limited to 500 emails/day
- ⚠️ Might go to spam folder

**Setup Steps:**

1. **Enable 2-Step Verification:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Windows Computer"
   - Click Generate
   - Copy the 16-character password

3. **Update `.env` file:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

---

## **After Configuration**

1. **Copy your changes to `.env`:**
```powershell
# Make sure you're editing .env (not .env.example)
```

2. **Restart the server:**
```powershell
cd server
node index.js
```

3. **Test it:**
   - Go to your website
   - Click "Sign In" → "Forgot password?"
   - Enter a registered email
   - Check your inbox!

---

## **Recommended Choice**

**For Dark War Survival:** Use **SendGrid**
- It's free for your needs
- Best deliverability
- Professional appearance
- Most reliable

Just takes 5 minutes to set up!


SENDGRID REVOCERY CODE: DXKVKYX8SXW2J14HCTHS5YE8