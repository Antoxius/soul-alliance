import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize email service based on configuration
let emailService = process.env.EMAIL_SERVICE || 'gmail'; // 'gmail', 'sendgrid', or 'resend'

// Setup email client based on service
let transporter;
if (emailService === 'sendgrid' && process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('Using SendGrid for email service');
} else if (emailService === 'resend' && process.env.RESEND_API_KEY) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log('Using Resend for email service');
  emailService = 'resend';
  transporter = resend;
} else {
  // Fallback to Gmail/Nodemailer
  emailService = 'gmail';
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Test email configuration for Gmail
  transporter.verify((error, success) => {
    if (error) {
      console.log('Gmail configuration error:', error.message);
      console.log('Tip: Use SendGrid or Resend for better reliability');
    } else {
      console.log('Gmail is ready to send messages');
    }
  });
}

// Password reset endpoint
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email, resetToken, resetLink } = req.body;

    if (!email || !resetToken || !resetLink) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, reset token, and reset link are required' 
      });
    }

    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Dark War Survival - Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #1a1a1a;
              color: #ffffff;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #2a2a2a;
              border: 2px solid #8B3A3A;
              padding: 30px;
              border-radius: 10px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #8B3A3A;
              margin: 0;
              font-size: 28px;
              letter-spacing: 2px;
            }
            .content {
              line-height: 1.6;
              font-size: 16px;
              color: #cccccc;
            }
            .button {
              display: inline-block;
              background-color: #8B3A3A;
              color: #ffffff;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
              letter-spacing: 1px;
            }
            .button:hover {
              background-color: #6B2A2A;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #444;
              font-size: 12px;
              color: #888;
              text-align: center;
            }
            .link {
              color: #8B3A3A;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>DARK WAR SURVIVAL</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password for your Dark War Survival account.</p>
              <p>Click the button below to reset your password:</p>
              <div style="text-align: center;">
                <a href="${resetLink}" class="button">RESET PASSWORD</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p class="link">${resetLink}</p>
              <p><strong>This link will expire in 1 hour.</strong></p>
              <p>If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>This is an automated message from Dark War Survival. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email based on service
    if (emailService === 'sendgrid') {
      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER,
        subject: 'Dark War Survival - Password Reset Request',
        html: mailOptions.html,
      };
      await sgMail.send(msg);
    } else if (emailService === 'resend') {
      await transporter.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Dark War <onboarding@resend.dev>',
        to: email,
        subject: 'Dark War Survival - Password Reset Request',
        html: mailOptions.html,
      });
    } else {
      // Gmail/Nodemailer
      await transporter.sendMail(mailOptions);
    }

    res.json({ 
      success: true, 
      message: 'Password reset email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send password reset email',
      error: error.message 
    });
  }
});

// User registration endpoint
app.post('/api/register-user', async (req, res) => {
  try {
    const { username, email, password, createdAt } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, email, and password are required' 
      });
    }

    // Path to registered emails file
    const emailsFilePath = path.join(__dirname, 'registered-emails.txt');
    
    // Create email entry with timestamp
    const emailEntry = `${email} | ${username} | ${createdAt || new Date().toISOString()}\n`;
    
    // Append to file (create if doesn't exist)
    await fs.appendFile(emailsFilePath, emailEntry);
    
    console.log(`New user registered: ${username} (${email})`);
    
    res.json({ 
      success: true, 
      message: 'User registered successfully',
      user: { username, email }
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to register user',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
