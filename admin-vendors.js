(function () {
  const keyInput = document.getElementById('adminKeyInput');
  const unlockBtn = document.getElementById('unlockAdminBtn');
  const statusEl = document.getElementById('adminStatus');
  const vendorForm = document.getElementById('vendorForm');
  const vendorList = document.getElementById('vendorList');
  const leadList = document.getElementById('leadList');

  let adminKey = sessionStorage.getItem('easytravel_admin_key') || '';
  if (keyInput) keyInput.value = adminKey;

  function setStatus(text, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.style.background = isError ? '#fff4f4' : '#f5f8ff';
    statusEl.style.color = isError ? '#8b2b2b' : '#243b67';
    statusEl.style.borderColor = isError ? '#f0b8b8' : '#d8e2f5';
  }

  async function adminFetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
        ...(options.headers || {})
      }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || 'Admin request failed.');
    return data;
  }

  function waLink(phone, text) {
    const cleanPhone = String(phone || '').replace(/[^\d]/g, '') || '917366930984';
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }

  function renderVendors(vendors) {
    if (!vendorList) return;
    if (!vendors.length) {
      vendorList.innerHTML = '<div class="admin-empty">No vendors yet.</div>';
      return;
    }
    vendorList.innerHTML = vendors.map(v => `
      <article class="admin-row">
        <div>
          <span>${v.city} · ${v.type}</span>
          <strong>${v.name}</strong>
          <p>${v.area || 'Area not added'} · ${v.service || 'Service not added'}</p>
        </div>
        <a href="${waLink(v.phone, `Hello ${v.name}, EasyTravel partner verification ke liye connect karna hai.`)}" target="_blank" rel="noopener">WhatsApp</a>
      </article>
    `).join('');
  }

  function renderLeads(leads, vendors) {
    if (!leadList) return;
    if (!leads.length) {
      leadList.innerHTML = '<div class="admin-empty">Abhi koi package lead nahi hai.</div>';
      return;
    }
    leadList.innerHTML = leads.map(lead => {
      const cityVendors = vendors.filter(v => String(v.city).toLowerCase() === String(lead.city || lead.destination).toLowerCase());
      const vendor = cityVendors[0] || vendors.find(v => v.city === 'Default') || vendors[0] || {};
      const message = `New EasyTravel lead ${lead.id}\nDestination: ${lead.destination}\nTraveller: ${lead.traveller}\nPhone: ${lead.phone}\nPeople: ${lead.people}\nDays: ${lead.days}\nBudget: ${lead.budget}\nArrival: ${lead.arrivalMode}\nRequest: ${lead.request || 'NA'}\nPlease share pickup, stay and local package quote.`;
      return `
        <article class="admin-row lead-row">
          <div>
            <span>${lead.id} · ${lead.status} · ${new Date(lead.at).toLocaleString('en-IN')}</span>
            <strong>${lead.destination} package - ${lead.traveller}</strong>
            <p>${lead.phone} · ${lead.people || 1} people · ${lead.days || 3} days · ${lead.budget || 'Comfort'} · ${lead.arrivalMode || 'train'}</p>
            <p>Suggested partner: <b>${vendor.name || 'Manual assignment'}</b></p>
          </div>
          <a href="${waLink(vendor.phone, message)}" target="_blank" rel="noopener">Forward lead</a>
        </article>
      `;
    }).join('');
  }

  async function loadAdmin() {
    if (!adminKey) {
      setStatus('Admin key required. Vercel me ADMIN_PANEL_KEY set karo.', true);
      return;
    }
    try {
      setStatus('Loading admin data...');
      const [vendorData, leadData] = await Promise.all([
        adminFetch('/api/vendor-admin'),
        adminFetch('/api/vendor-leads')
      ]);
      renderVendors(vendorData.vendors || []);
      renderLeads(leadData.leads || [], vendorData.vendors || []);
      setStatus('Admin panel unlocked. Vendor network and package leads loaded.');
    } catch (error) {
      setStatus(error.message || 'Admin panel unlock failed.', true);
    }
  }

  unlockBtn && unlockBtn.addEventListener('click', () => {
    adminKey = (keyInput.value || '').trim();
    sessionStorage.setItem('easytravel_admin_key', adminKey);
    loadAdmin();
  });

  vendorForm && vendorForm.addEventListener('submit', async event => {
    event.preventDefault();
    try {
      const payload = {
        city: document.getElementById('vendorCity').value.trim(),
        type: document.getElementById('vendorType').value,
        name: document.getElementById('vendorName').value.trim(),
        phone: document.getElementById('vendorPhone').value.trim(),
        area: document.getElementById('vendorArea').value.trim(),
        service: document.getElementById('vendorService').value.trim()
      };
      await adminFetch('/api/vendor-admin', { method: 'POST', body: JSON.stringify(payload) });
      vendorForm.reset();
      await loadAdmin();
      setStatus('Partner saved successfully.');
    } catch (error) {
      setStatus(error.message || 'Partner save failed.', true);
    }
  });

  if (adminKey) loadAdmin();
})();
