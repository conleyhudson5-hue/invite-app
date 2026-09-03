import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();

// Middleware
app.use(express.json());

// Environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.REACT_APP_CHAT_ID;

// API endpoint for sending Telegram notifications
app.post('/api/send-telegram', async (req: Request, res: Response) => {
  try {
    // Validate required environment variables
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({
        error: 'Telegram credentials not configured',
        message: 'TELEGRAM_BOT_TOKEN or REACT_APP_CHAT_ID is missing'
      });
    }

    const { message, email, rsvpStatus, guestCount } = req.body;

    // Validate incoming data
    if (!message || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'message and email are required'
      });
    }

    // Format the message for Telegram
    const telegramMessage = `
📧 New RSVP Submission:
━━━━━━━━━━━━━━━━━━━━━━
📧 Email: ${email}
✅ Status: ${rsvpStatus || 'Not specified'}
👥 Guests: ${guestCount || '1'}
💬 Message: ${message}
━━━━━━━━━━━━━━━━━━━━━━
⏰ Timestamp: ${new Date().toLocaleString()}
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
      message: 'Telegram notification sent successfully',
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
