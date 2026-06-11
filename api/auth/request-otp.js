const crypto = require('crypto');

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body) {
      resolve(typeof req.body === 'string' ? JSON.parse(req.body) : req.body);
      return;
    }
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(value) {
  const secret = process.env.OTP_SECRET || process.env.JWT_SECRET || 'easytravel-change-this-otp-secret';
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function createChallenge(email, purpose, otp) {
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const otpHash = sign(`${email}:${purpose}:${otp}:${expiresAt}`);
  const payload = base64url(JSON.stringify({ email, purpose, expiresAt, otpHash }));
  return `${payload}.${sign(payload)}`;
}

async function sendOtpEmail(email, otp, purpose, name) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { setupRequired: true };
  }
  const from = process.env.OTP_FROM_EMAIL || 'EasyTravel Pro <onboarding@resend.dev>';
  const subject = `EasyTravel Pro ${purpose === 'register' ? 'registration' : 'login'} OTP`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#17284f">
      <h2>EasyTravel Pro OTP</h2>
      <p>Hi ${name || 'Traveller'},</p>
      <p>Your ${purpose === 'register' ? 'registration' : 'login'} OTP is:</p>
      <div style="font-size:32px;font-weight:800;letter-spacing:6px;background:#f1f5ff;padding:16px 20px;border-radius:14px;display:inline-block">${otp}</div>
      <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    </div>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from, to: email, subject, html })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { error: data.message || 'Email provider rejected OTP email.' };
  }
  return { ok: true };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }

  try {
    const body = await readBody(req);
    const email = String(body.email || '').trim().toLowerCase();
    const purpose = body.purpose === 'register' ? 'register' : 'login';
    const name = String(body.name || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      json(res, 400, { success: false, message: 'Valid email required.' });
      return;
    }

    const otp = String(crypto.randomInt(100000, 1000000));
    const challenge = createChallenge(email, purpose, otp);
    const sent = await sendOtpEmail(email, otp, purpose, name);

    if (sent.setupRequired) {
      json(res, 500, {
        success: false,
        setupRequired: true,
        message: 'RESEND_API_KEY env variable required for email OTP.'
      });
      return;
    }
    if (sent.error) {
      json(res, 502, { success: false, message: sent.error });
      return;
    }

    json(res, 200, {
      success: true,
      challenge,
      message: 'OTP sent to your email.'
    });
  } catch (error) {
    json(res, 500, { success: false, message: 'OTP request failed.' });
  }
};
