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

function sign(value) {
  const secret = process.env.OTP_SECRET || process.env.JWT_SECRET || 'easytravel-change-this-otp-secret';
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function parseChallenge(challenge) {
  const [payload, signature] = String(challenge || '').split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch (error) {
    return null;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }

  try {
    const body = await readBody(req);
    const email = String(body.email || '').trim().toLowerCase();
    const purpose = body.purpose === 'login' ? 'login' : 'register';
    const otp = String(body.otp || '').trim();
    const data = parseChallenge(body.challenge);

    if (!data || data.email !== email || data.purpose !== purpose) {
      json(res, 400, { success: false, message: 'OTP session invalid. Please request a new OTP.' });
      return;
    }
    if (Date.now() > data.expiresAt) {
      json(res, 400, { success: false, message: 'OTP expired. Please request a new OTP.' });
      return;
    }

    const expectedHash = sign(`${email}:${purpose}:${otp}:${data.expiresAt}`);
    if (!/^\d{6}$/.test(otp) || !safeEqual(expectedHash, data.otpHash)) {
      json(res, 400, { success: false, message: 'Invalid OTP.' });
      return;
    }

    json(res, 200, { success: true, message: 'OTP verified.' });
  } catch (error) {
    json(res, 500, { success: false, message: 'OTP verification failed.' });
  }
};
