const { clean, getIp, guard, json, sendSecurityAlert } = require('./_security');

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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }
  if (!(await guard(req, res, 'security-event', 20, 60 * 1000))) return;
  try {
    const body = await readBody(req);
    const eventType = clean(body.eventType, 80);
    const details = clean(body.details, 800);
    const page = clean(body.page, 80);
    await sendSecurityAlert(eventType || 'Client security event', {
      ip: getIp(req),
      page,
      details,
      at: new Date().toISOString()
    });
    json(res, 200, { success: true });
  } catch (error) {
    json(res, 400, { success: false, message: 'Invalid event.' });
  }
};
