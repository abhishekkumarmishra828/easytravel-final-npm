(function () {
  const keyInput = document.getElementById('adminKeyInput');
  const unlockBtn = document.getElementById('unlockAdminBtn');
  const clearBtn = document.getElementById('clearAdminKeyBtn');
  const sessionLabel = document.getElementById('adminSessionLabel');
  const statusEl = document.getElementById('adminStatus');
  const vendorForm = document.getElementById('vendorForm');
  const vendorList = document.getElementById('vendorList');
  const leadList = document.getElementById('leadList');
  const cityFilter = document.getElementById('leadCityFilter');
  const notificationEl = document.getElementById('adminNotification');
  const metricTotal = document.getElementById('metricTotalLeads');
  const metricNew = document.getElementById('metricNewLeads');
  const metricApproved = document.getElementById('metricApprovedLeads');
  const metricVendors = document.getElementById('metricVendors');

  let adminKey = sessionStorage.getItem('easytravel_admin_key') || '';
  let latestVendors = [];
  let latestLeads = [];
  if (keyInput) keyInput.value = adminKey;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function setStatus(text, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.toggle('admin-error', isError);
  }

  function setSessionState(unlocked) {
    document.body.classList.toggle('admin-unlocked', unlocked);
    if (sessionLabel) sessionLabel.textContent = unlocked ? 'Session unlocked after refresh' : 'Session locked';
    if (unlockBtn) unlockBtn.textContent = unlocked ? 'Refresh panel' : 'Unlock panel';
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

  function updateMetrics(leads, vendors) {
    const newCount = leads.filter(lead => (lead.status || 'new') === 'new').length;
    const approvedCount = leads.filter(lead => ['approved', 'assigned'].includes(lead.status)).length;
    if (metricTotal) metricTotal.textContent = leads.length;
    if (metricNew) metricNew.textContent = newCount;
    if (metricApproved) metricApproved.textContent = approvedCount;
    if (metricVendors) metricVendors.textContent = vendors.length;

    if (!notificationEl) return;
    if (newCount) {
      const firstNew = leads.find(lead => (lead.status || 'new') === 'new');
      notificationEl.classList.add('active');
      notificationEl.innerHTML = `<strong>${newCount} new approval pending</strong><span>Latest: ${escapeHtml(firstNew.destination)} package by ${escapeHtml(firstNew.traveller)}. Approve karke partner ko forward karo.</span>`;
    } else {
      notificationEl.classList.remove('active');
      notificationEl.innerHTML = '<strong>No pending approvals</strong><span>Sab visible package leads approved/assigned state me hain.</span>';
    }
  }

  function populateCityFilter(leads) {
    if (!cityFilter) return;
    const selected = cityFilter.value;
    const cities = [...new Set(leads.map(lead => lead.city || lead.destination).filter(Boolean))].sort();
    cityFilter.innerHTML = '<option value="">All cities</option>' + cities.map(city => `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`).join('');
    if (cities.includes(selected)) cityFilter.value = selected;
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
          <span>${escapeHtml(v.city)} · ${escapeHtml(v.type)} · ${escapeHtml(v.status || 'approved')}</span>
          <strong>${escapeHtml(v.name)}</strong>
          <p>${escapeHtml(v.area || 'Area not added')} · ${escapeHtml(v.service || 'Service not added')}</p>
        </div>
        <a href="${waLink(v.phone, `Hello ${v.name}, EasyTravel partner verification ke liye connect karna hai.`)}" target="_blank" rel="noopener">WhatsApp</a>
      </article>
    `).join('');
  }

  function findVendorForLead(lead, vendors) {
    const leadCity = String(lead.city || lead.destination || '').toLowerCase();
    const cityVendors = vendors.filter(v => String(v.city || '').toLowerCase() === leadCity);
    return cityVendors[0] || vendors.find(v => v.city === 'Default') || vendors[0] || {};
  }

  function renderLeads(leads, vendors) {
    if (!leadList) return;
    const selectedCity = cityFilter ? cityFilter.value : '';
    const visibleLeads = selectedCity ? leads.filter(lead => String(lead.city || lead.destination) === selectedCity) : leads;
    if (!visibleLeads.length) {
      leadList.innerHTML = '<div class="admin-empty">Is filter me koi package lead nahi hai.</div>';
      return;
    }
    leadList.innerHTML = visibleLeads.map(lead => {
      const vendor = findVendorForLead(lead, vendors);
      const status = lead.status || 'new';
      const message = `New EasyTravel lead ${lead.id}\nDestination: ${lead.destination}\nTraveller: ${lead.traveller}\nPhone: ${lead.phone}\nPeople: ${lead.people}\nDays: ${lead.days}\nBudget: ${lead.budget}\nArrival: ${lead.arrivalMode}\nRequest: ${lead.request || 'NA'}\nPlease share pickup, stay and local package quote.`;
      return `
        <article class="admin-row lead-row ${status === 'new' ? 'needs-approval' : ''}">
          <div>
            <span>${escapeHtml(lead.id)} · <b class="lead-status ${escapeHtml(status)}">${escapeHtml(status)}</b> · ${new Date(lead.at).toLocaleString('en-IN')}</span>
            <strong>${escapeHtml(lead.destination)} package - ${escapeHtml(lead.traveller)}</strong>
            <p>${escapeHtml(lead.phone)} · ${escapeHtml(lead.people || 1)} people · ${escapeHtml(lead.days || 3)} days · ${escapeHtml(lead.budget || 'Comfort')} · ${escapeHtml(lead.arrivalMode || 'train')}</p>
            <p>Suggested partner: <b>${escapeHtml(vendor.name || lead.assignedVendor || 'Manual assignment')}</b></p>
          </div>
          <div class="admin-actions">
            <button type="button" data-lead-action="approved" data-lead-id="${escapeHtml(lead.id)}">Approve</button>
            <button type="button" data-lead-action="assigned" data-lead-id="${escapeHtml(lead.id)}" data-vendor="${escapeHtml(vendor.name || '')}">Mark assigned</button>
            <a href="${waLink(vendor.phone, message)}" target="_blank" rel="noopener">Forward</a>
          </div>
        </article>
      `;
    }).join('');
  }

  async function loadAdmin() {
    if (!adminKey) {
      setSessionState(false);
      setStatus('Admin key required. Vercel me ADMIN_PANEL_KEY set karo.', true);
      return;
    }
    try {
      setStatus('Loading secure admin data...');
      const [vendorData, leadData] = await Promise.all([
        adminFetch('/api/vendor-admin'),
        adminFetch('/api/vendor-leads')
      ]);
      latestVendors = vendorData.vendors || [];
      latestLeads = leadData.leads || [];
      populateCityFilter(latestLeads);
      renderVendors(latestVendors);
      renderLeads(latestLeads, latestVendors);
      updateMetrics(latestLeads, latestVendors);
      setSessionState(true);
      setStatus('Admin panel unlocked. Refresh ke baad bhi current session me panel auto-unlock rahega.');
    } catch (error) {
      setSessionState(false);
      setStatus(error.message || 'Admin panel unlock failed.', true);
    }
  }

  async function updateLeadStatus(id, status, assignedVendor) {
    await adminFetch('/api/vendor-leads', {
      method: 'PATCH',
      body: JSON.stringify({ id, status, assignedVendor })
    });
    await loadAdmin();
    setStatus(`Lead ${id} status updated to ${status}.`);
  }

  unlockBtn && unlockBtn.addEventListener('click', () => {
    adminKey = (keyInput.value || '').trim();
    sessionStorage.setItem('easytravel_admin_key', adminKey);
    loadAdmin();
  });

  clearBtn && clearBtn.addEventListener('click', () => {
    adminKey = '';
    sessionStorage.removeItem('easytravel_admin_key');
    if (keyInput) keyInput.value = '';
    latestVendors = [];
    latestLeads = [];
    renderVendors([]);
    renderLeads([], []);
    updateMetrics([], []);
    setSessionState(false);
    setStatus('Panel locked. Admin key removed from this browser session.');
  });

  cityFilter && cityFilter.addEventListener('change', () => renderLeads(latestLeads, latestVendors));

  leadList && leadList.addEventListener('click', event => {
    const button = event.target.closest('button[data-lead-action]');
    if (!button) return;
    updateLeadStatus(button.dataset.leadId, button.dataset.leadAction, button.dataset.vendor || '').catch(error => {
      setStatus(error.message || 'Lead update failed.', true);
    });
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

  setSessionState(!!adminKey);
  if (adminKey) loadAdmin();
})();
