const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const client = require('prom-client');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// --- Prometheus metrics setup ---
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register }); // collects CPU, memory, event loop lag, etc.

const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['endpoint', 'status']
});

const requestLatency = new client.Histogram({
  name: 'http_request_latency_seconds',
  help: 'Request latency in seconds',
  labelNames: ['endpoint']
});

// --- Routes ---
app.post('/send-notification', async (req, res) => {
  const endTimer = requestLatency.labels('/send-notification').startTimer();
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      requestCounter.labels('/send-notification', '400').inc();
      endTimer();
      return res.status(400).send('Missing required fields: to, subject, text');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    requestCounter.labels('/send-notification', '200').inc();
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
    requestCounter.labels('/send-notification', '500').inc();
    res.status(500).send('Error sending notification');
  } finally {
    endTimer();
  }
});

// --- Metrics endpoint ---
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Notification service listening at http://localhost:${port}`);
});