const { clean, guard, json, sendSecurityAlert } = require('./_security');

const leads = global.__easytravelVendorLeads || [];
global.__easytravelVendorLeads = leads;

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

async function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  await sendSecurityAlert('Blocked vendor lead admin access', { route: 'vendor-leads', at: new Date().toISOString() });
  json(res, process.env.ADMIN_PANEL_KEY ? 401 : 503, {
    success: false,
    message: process.env.ADMIN_PANEL_KEY ? 'Admin key required.' : 'ADMIN_PANEL_KEY is not configured in Vercel.'
  });
  return false;
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    if (!(await guard(req, res, 'vendor-leads-list', 20, 60 * 1000))) return;
    if (!(await requireAdmin(req, res))) return;
    json(res, 200, { success: true, leads: leads.slice().reverse() });
    return;
  }

  if (req.method === 'PATCH') {
    if (!(await guard(req, res, 'vendor-leads-update', 20, 60 * 1000))) return;
    if (!(await requireAdmin(req, res))) return;
    try {
      const body = await readBody(req);
      const id = clean(body.id, 80);
      const lead = leads.find(item => item.id === id);
      if (!lead) {
        json(res, 404, { success: false, message: 'Lead not found.' });
        return;
      }
      const allowedStatus = ['new', 'approved', 'assigned', 'closed'];
      const nextStatus = clean(body.status, 40);
      if (allowedStatus.includes(nextStatus)) lead.status = nextStatus;
      if (body.assignedVendor) lead.assignedVendor = clean(body.assignedVendor, 120);
      lead.updatedAt = new Date().toISOString();
      json(res, 200, { success: true, lead });
    } catch (error) {
      json(res, 400, { success: false, message: 'Invalid update request.' });
    }
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }
  if (!(await guard(req, res, 'vendor-leads-create', 12, 60 * 1000))) return;

  try {
    const body = await readBody(req);
    const lead = {
      id: `ETL-${Date.now().toString(36).toUpperCase()}`,
      at: new Date().toISOString(),
      status: 'new',
      destination: clean(body.destination, 80),
      city: clean(body.city || body.destination, 80),
      traveller: clean(body.fullName || body.traveller, 100),
      phone: clean(body.phone, 40),
      email: clean(body.email, 120),
      people: clean(body.people || body.numberOfPeople, 20),
      days: clean(body.days, 20),
      budget: clean(body.budget, 40),
      arrivalMode: clean(body.arrivalMode, 40),
      travelMonth: clean(body.travelMonth, 40),
      finalPrice: clean(body.finalPrice, 40),
      request: clean(body.specialRequest || body.request, 600),
      assignedVendor: clean(body.assignedVendor, 120)
    };

    if (!lead.destination || !lead.traveller || !lead.phone) {
      json(res, 400, { success: false, message: 'Destination, traveller name and phone required.' });
      return;
    }

    leads.push(lead);
    if (leads.length > 200) leads.shift();
    await sendSecurityAlert('New EasyTravel vendor lead', lead);
    json(res, 200, { success: true, lead });
  } catch (error) {
    json(res, 400, { success: false, message: 'Invalid lead request.' });
  }
};
