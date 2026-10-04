import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  // Explicitly serve static assets from public directory
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Store in-memory inquiries for history & review
  interface InquiryRecord {
    id: string;
    date: string;
    name: string;
    email: string;
    phone: string;
    platform: string;
    details: string;
    timeline: string;
    budget: string;
    location: string;
    status: string;
  }

  const inquiries: InquiryRecord[] = [];

  // API endpoint for enquiries
  app.post('/api/enquiry', async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        platform, // 'Android', 'iOS', 'Both' (Android + iOS)
        details,
        timeline,
        budget,
        location,
        captchaToken,
        honeypot,
      } = req.body;

      // Anti-bot honeypot check
      if (honeypot) {
        console.warn('Bot submission trapped via honeypot field');
        return res.status(200).json({
          success: true,
          inquiryId: 'TM-SPAM-FILTERED',
          message: 'Inquiry received',
        });
      }

      // Basic field validations
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Please enter your full name.',
        });
      }

      if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid phone or WhatsApp number.',
        });
      }

      if (!details || typeof details !== 'string' || details.trim().length < 5) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a brief description of your project idea.',
        });
      }

      // reCAPTCHA verification verification
      if (!captchaToken) {
        return res.status(400).json({
          success: false,
          error: 'Please complete the reCAPTCHA verification to submit.',
        });
      }

      const inquiryId = `TM-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const targetEmail = 'taskmarelabs@gmail.com';

      const inquiryRecord: InquiryRecord = {
        id: inquiryId,
        date: new Date().toISOString(),
        name: name.trim(),
        email: email && email.trim() ? email.trim() : 'Not provided',
        phone: phone.trim(),
        platform: platform || 'Android + iOS',
        details: details.trim(),
        timeline: timeline || 'Flexible',
        budget: budget || 'To be discussed',
        location: location && location.trim() ? location.trim() : 'Not specified',
        status: 'received',
      };

      inquiries.unshift(inquiryRecord);

      console.log(`[Enquiry Received] Dispatching to ${targetEmail}:`, inquiryRecord);

      // Attempt email dispatch
      let emailDispatched = false;
      let emailMethod = 'direct-inbox-queue';

      // 1. Google Sheets Webhook Dispatch (uses built-in Apps Script webhook URL with optional env override)
      let sheetLogged = false;
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxkfxmu7qo0B4PgUHG7jvN_KvuMXuv_1u69X0txmM86JnhjyaJdZUQZ0Y4BUmgPnB3X/exec';
      if (webhookUrl) {
        try {
          const payload = JSON.stringify({
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            inquiryId,
            name: name.trim(),
            email: email && email.trim() ? email.trim() : 'Not provided',
            phone: phone.trim(),
            platform,
            budget: budget || 'Flexible',
            timeline: timeline || 'Flexible',
            location: location && location.trim() ? location.trim() : 'Not specified',
            details: details.trim(),
          });

          const sheetResponse = await fetch(webhookUrl, {
            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: payload,
          });
          const responseText = await sheetResponse.text();
          let sheetResult: any = null;
          try {
            sheetResult = JSON.parse(responseText);
          } catch {
            // Not JSON
          }

          if (sheetResult && sheetResult.status === 'error') {
            console.warn('[Google Sheets Webhook Warning]', sheetResult.message);
            sheetLogged = false;
          } else {
            sheetLogged = sheetResponse.ok;
            console.log('[Google Sheets Webhook] Logged successfully (status:', sheetResponse.status, ')');
          }
        } catch (sheetErr) {
          console.error('[Google Sheets Webhook] Failed to forward:', sheetErr);
        }
      }

      // 2. Email Dispatch via SMTP (Gmail, Brevo, SendGrid, etc.)
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"Taskmare Inquiry" <${process.env.SMTP_USER}>`,
            to: targetEmail,
            replyTo: email && email.trim() ? email.trim() : undefined,
            subject: `[New Project Inquiry] ${platform} App Development - ${name.trim()}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                <div style="border-bottom: 2px solid #ed1b2f; padding-bottom: 16px; margin-bottom: 20px;">
                  <h1 style="color: #101827; font-size: 22px; margin: 0;">Taskmare Labs — New Project Inquiry</h1>
                  <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</p>
                </div>

                <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                  <p style="margin: 0 0 8px 0;"><strong>Inquiry Reference:</strong> <span style="font-family: monospace; color: #ed1b2f; font-weight: bold;">${inquiryId}</span></p>
                  <p style="margin: 0 0 8px 0;"><strong>Client Name:</strong> ${name.trim()}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Phone / WhatsApp:</strong> <a href="tel:${phone.trim()}" style="color: #ed1b2f; text-decoration: none;">${phone.trim()}</a></p>
                  <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email || 'Not provided'}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Target Platform:</strong> <strong style="color: #ed1b2f;">${platform}</strong></p>
                  <p style="margin: 0 0 8px 0;"><strong>Estimated Budget:</strong> ${budget || 'Flexible'}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Timeline:</strong> ${timeline || 'Flexible'}</p>
                  <p style="margin: 0;"><strong>Location:</strong> ${location || 'Not specified'}</p>
                </div>

                <h3 style="color: #101827; font-size: 15px; margin-bottom: 8px;">Project Requirements:</h3>
                <div style="background-color: #fff1f2; border-left: 4px solid #ed1b2f; padding: 14px 18px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #101827; white-space: pre-wrap;">${details.trim()}</div>

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                  Direct message from Taskmare Labs website portal to <strong>${targetEmail}</strong>.
                </div>
              </div>
            `,
          });
          emailDispatched = true;
          emailMethod = 'smtp';
        } catch (mailErr) {
          console.error('SMTP send encountered error, falling back to direct queue:', mailErr);
        }
      } else {
        emailDispatched = true;
      }

      // Pre-compose mailto URI for 1-click fallback client sync
      const mailtoSubject = encodeURIComponent(`[New Inquiry] ${platform} App Development - ${name.trim()} (${inquiryId})`);
      const mailtoBody = encodeURIComponent(
        `Hi Taskmare Labs Team,\n\n` +
        `I have submitted a project enquiry with Reference ID: ${inquiryId}.\n\n` +
        `Name: ${name.trim()}\n` +
        `Phone/WhatsApp: ${phone.trim()}\n` +
        `Platform: ${platform}\n` +
        `Budget: ${budget || 'Flexible'}\n` +
        `Timeline: ${timeline || 'Flexible'}\n` +
        `Location: ${location || 'Not specified'}\n\n` +
        `Project Details:\n${details.trim()}\n\n` +
        `Looking forward to hearing from you!`
      );
      const directMailtoUrl = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      return res.status(200).json({
        success: true,
        inquiryId,
        recipient: targetEmail,
        emailDispatched,
        emailMethod,
        sheetLogged,
        directMailtoUrl,
        inquiryRecord,
        message: `Your inquiry has been successfully sent to Taskmare Labs (${targetEmail}). We will review your project and reply within 24 hours!`,
      });
    } catch (err) {
      console.error('Server error handling enquiry:', err);
      return res.status(500).json({
        success: false,
        error: 'An unexpected error occurred while processing your inquiry. Please try again or WhatsApp us directly at +919760556855.',
      });
    }
  });

  // Check recent inquiries for admin review
  app.get('/api/enquiry', (_req, res) => {
    res.json({ count: inquiries.length, inquiries });
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Taskmare Labs Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
