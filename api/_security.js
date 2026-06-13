const buckets = new Map();
const alerted = new Map();

function getIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return String(Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function clean(value, max = 240) {
  return String(value || '').replace(/[<>]/g, '').slice(0, max);
}

function checkRate(req, name, limit, windowMs) {
  const ip = getIp(req);
  const key = `${name}:${ip}`;
  const now = Date.now();
  const current = buckets.get(key) || { count: 0, reset: now + windowMs };
  if (now > current.reset) {
    current.count = 0;
    current.reset = now + windowMs;
  }
  current.count += 1;
  buckets.set(key, current);
  return {
    allowed: current.count <= limit,
    count: current.count,
    ip,
    retryAfter: Math.ceil((current.reset - now) / 1000)
  };
}

async function sendSecurityAlert(subject, details) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_ALERT_EMAIL || 'abhishekkumarmishra828@gmail.com';
  const from = process.env.OTP_FROM_EMAIL || 'EasyTravel Pro <onboarding@resend.dev>';
  if (!apiKey) return;

  const alertKey = `${subject}:${details.ip || ''}`;
  const last = alerted.get(alertKey) || 0;
  if (Date.now() - last < 10 * 60 * 1000) return;
  alerted.set(alertKey, Date.now());

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject: `EasyTravel security alert: ${clean(subject, 80)}`,
      html: `<pre style="font-family:Arial,sans-serif;white-space:pre-wrap">${clean(JSON.stringify(details, null, 2), 2000)}</pre>`
    })
  }).catch(() => {});
}

async function guard(req, res, name, limit = 30, windowMs = 60 * 1000) {
  const result = checkRate(req, name, limit, windowMs);
  if (!result.allowed) {
    res.setHeader('Retry-After', String(result.retryAfter));
    await sendSecurityAlert('Repeated API hits blocked', { route: name, ip: result.ip, count: result.count });
    json(res, 429, { success: false, message: 'Too many requests. Please try again later.' });
    return false;
  }
  return true;
}

module.exports = { clean, getIp, guard, json, sendSecurityAlert };
