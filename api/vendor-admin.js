const { clean, guard, json, sendSecurityAlert } = require('./_security');

const vendors = global.__easytravelVendors || [
  { id: 'delhi-ride-01', city: 'Delhi', type: 'Transport', name: 'Delhi Station Pickup Desk', phone: '917366930984', area: 'New Delhi Railway Station / CP', service: 'Station pickup, cab, auto, sightseeing', status: 'approved' },
  { id: 'delhi-stay-01', city: 'Delhi', type: 'Stay', name: 'Karol Bagh Budget Stay Partner', phone: '917366930984', area: 'Karol Bagh / Paharganj', service: 'Budget hotel coordination', status: 'approved' },
  { id: 'varanasi-ride-01', city: 'Varanasi', type: 'Transport', name: 'Kashi Local Transfer Desk', phone: '917366930984', area: 'Cantt / Godowlia / Assi', service: 'E-rickshaw, ghat drop, boat point', status: 'approved' },
  { id: 'india-support-01', city: 'Default', type: 'Support', name: 'EasyTravel India Partner Desk', phone: '917366930984', area: 'Pan India', service: 'Manual partner assignment', status: 'approved' }
];
global.__easytravelVendors = vendors;

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

function isAdmin(req) {
  const configured = process.env.ADMIN_PANEL_KEY;
  const provided = req.headers['x-admin-key'];
  return !!configured && String(provided || '') === configured;
}

module.exports = async function handler(req, res) {
  if (!(await guard(req, res, 'vendor-admin', 25, 60 * 1000))) return;
  if (!isAdmin(req)) {
    await sendSecurityAlert('Blocked vendor admin access', { route: 'vendor-admin', at: new Date().toISOString() });
    json(res, process.env.ADMIN_PANEL_KEY ? 401 : 503, {
      success: false,
      message: process.env.ADMIN_PANEL_KEY ? 'Admin key required.' : 'ADMIN_PANEL_KEY is not configured in Vercel.'
    });
    return;
  }

  if (req.method === 'GET') {
    json(res, 200, { success: true, vendors });
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }

  try {
    const body = await readBody(req);
    const vendor = {
      id: `VEN-${Date.now().toString(36).toUpperCase()}`,
      city: clean(body.city, 80),
      type: clean(body.type, 50),
      name: clean(body.name, 120),
      phone: clean(body.phone, 40),
      area: clean(body.area, 160),
      service: clean(body.service, 260),
      status: 'approved'
    };
    if (!vendor.city || !vendor.name || !vendor.phone) {
      json(res, 400, { success: false, message: 'City, vendor name and phone required.' });
      return;
    }
    vendors.push(vendor);
    json(res, 200, { success: true, vendor, vendors });
  } catch (error) {
    json(res, 400, { success: false, message: 'Invalid vendor request.' });
  }
};
