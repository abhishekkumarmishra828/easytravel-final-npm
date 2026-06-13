const { guard, json } = require('./_security');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    json(res, 405, { success: false, message: 'Method not allowed' });
    return;
  }
  if (!(await guard(req, res, 'reverse-geocode', 40, 60 * 1000))) return;
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    json(res, 400, { success: false, message: 'Invalid coordinates.' });
    return;
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&zoom=18&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'EasyTravelProCollegeProject/1.0 (abhishekkumarmishra828@gmail.com)',
        Accept: 'application/json'
      }
    });
    const data = await response.json();
    const address = data.display_name || `Current location ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    const parts = data.address || {};
    json(res, 200, {
      success: true,
      address,
      city: parts.city || parts.town || parts.village || parts.suburb || '',
      state_district: parts.state_district || parts.county || '',
      state: parts.state || '',
      postcode: parts.postcode || ''
    });
  } catch (error) {
    json(res, 502, { success: false, message: 'Address lookup failed.' });
  }
};
