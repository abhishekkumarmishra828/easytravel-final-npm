
(function () {
  const token = localStorage.getItem('easytravel_token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  const API_BASE = window.EASYTRAVEL_API_BASE || '';
  const CASHFREE_MODE = 'sandbox';
  const API_TIMEOUT_MESSAGE = 'Backend/Cashfree se response nahi mila. backend server aur .env keys check karo.';
  const data = window.EASYTRAVEL_DATA || {};
  const scraped = window.SCRAPED_TRAVEL_DATA || {};
  const params = new URLSearchParams(window.location.search);

  const to = params.get('to') || 'Delhi';
  const ageFromUrl = Number(params.get('age') || 28);
  const modeFromUrl = (params.get('mode') || 'train').toLowerCase();

  const titleEl = document.getElementById('pkgTitle');
  const oldPriceEl = document.getElementById('oldPrice');
  const newPriceEl = document.getElementById('newPrice');
  const categoriesEl = document.getElementById('packageCategories');
  const galleryEl = document.getElementById('packageGallery');
  const outputEl = document.getElementById('packageOutput');
  const msgEl = document.getElementById('packageMsg');
  const toastEl = document.getElementById('toastMsg');

  const destinationInput = document.getElementById('destinationInput');
  const ageInput = document.getElementById('ageInput');
  const modeInput = document.getElementById('modeInput');
  const peopleInput = document.getElementById('peopleInput');
  const daysInput = document.getElementById('daysInput');
  const budgetInput = document.getElementById('budgetInput');
  const monthInput = document.getElementById('monthInput');
  const prefInput = document.getElementById('prefInput');
  const nameInput = document.getElementById('travellerName');
  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
  const formEl = document.getElementById('packageForm');
  const enquireBtn = document.getElementById('enquireBtn');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const reviewBtn = document.getElementById('reviewPackageBtn');
  const reviewPanel = document.getElementById('reviewPanel');
  const reviewContent = document.getElementById('reviewContent');
  const reviewConfirmCheck = document.getElementById('reviewConfirmCheck');

  const PACKAGE_RULES = {
    Premium: {
      perDayPerPerson: 8500,
      coupon: 200,
      stayText: 'Premium hotel stay with pickup and drop',
      features: [
        'Breakfast included',
        'Lunch included',
        'Evening snacks and tea included',
        '2 litre water bottle included',
        'Dinner included',
        'Cab pickup from railway station / airport / bus stand',
        'Cab drop facility included',
        'Priority traveller assistance included'
      ]
    },
    Comfort: {
      perDayPerPerson: 5500,
      coupon: 100,
      stayText: 'Comfort stay with breakfast and dinner',
      features: [
        'Breakfast included',
        'Dinner included',
        'Comfort room stay included',
        'Basic support included'
      ]
    },
    Budget: {
      perDayPerPerson: 3500,
      coupon: 0,
      stayText: 'Budget stay package with 2 days and 3 nights rule',
      features: [
        'Only stay facility provided',
        'Budget package fixed for 2 days / 3 nights',
        'Affordable travel planning support'
      ]
    }
  };

  let reviewReady = false;

  destinationInput.value = to;
  ageInput.value = ageFromUrl;
  modeInput.value = modeFromUrl;
  monthInput.value = monthInput.value || 'April';

  function showToast(text, isError = false) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.style.display = 'block';
    toastEl.style.opacity = '1';
    toastEl.style.background = isError ? '#c64545' : '#1f8f53';
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toastEl.style.opacity = '0';
      setTimeout(() => {
        toastEl.style.display = 'none';
      }, 250);
    }, 2600);
  }

  function showPackageMsg(text, isError = false) {
    if (!msgEl) return;
    msgEl.style.display = 'block';
    msgEl.style.background = isError ? '#fff4f4' : '#f5f8ff';
    msgEl.style.borderColor = isError ? '#f0b8b8' : '#d8e2f5';
    msgEl.style.color = isError ? '#8b2b2b' : '#243b67';
    msgEl.textContent = text;
  }

  const imagePools = {
    Delhi: [
      '/package-assets/delhi-india-gate.jpg',
      '/package-assets/delhi-soldier-memorial.jpg',
      '/package-assets/delhi-pavilion.jpg',
      '/package-assets/delhi-detail-marble.jpg',
      '/package-assets/delhi-india-text.jpg'
    ],
    Varanasi: [
      '/package-assets/varanasi-ghat1.jpg',
      '/package-assets/varanasi-boat.jpg',
      '/package-assets/varanasi-ghat2.jpg',
      '/package-assets/varanasi-aarti.jpg',
      '/package-assets/varanasi-temple.jpg'
    ],
    Jaipur: ['/package-assets/fort_real.jpg','/package-assets/hill_real.jpg','/package-assets/garden_real.jpg','/package-assets/building_real.jpg'],
    Goa: ['/package-assets/sunset_real.jpg','/package-assets/river_real.jpg','/package-assets/garden_real.jpg','/package-assets/building_real.jpg'],
    Rameshwaram: [
      '/package-assets/rameshwaram-corridor.jpg',
      '/package-assets/rameshwaram-temple-front.jpg',
      '/package-assets/rameshwaram-sea-waves.jpg'
    ],
    Dwarka: [
      '/package-assets/dwarka-shiv-statue-wide.jpg',
      '/package-assets/dwarka-red-temple.jpg',
      '/package-assets/dwarka-temple-main.jpg',
      '/package-assets/dwarka-temple-flag-close.jpg',
      '/package-assets/dwarka-sunset-birds.jpg'
    ],
    Guwahati: [
      '/package-assets/guwahati-kamakhya-main.jpg',
      '/package-assets/guwahati-rain-view.jpg',
      '/package-assets/guwahati-river-view.jpg',
      '/package-assets/guwahati-sign.jpg'
    ],
    default: [
      '/package-assets/building_real.jpg',
      '/package-assets/fort_real.jpg',
      '/package-assets/garden_real.jpg',
      '/package-assets/river_real.jpg'
    ]
};


const pkgDB = {
    Delhi: {
      title: 'Delhi Heritage + Food Explorer',
      oldPrice: '₹15,900',
      newPrice: '₹11,100',
      categories: 'Family Tours, Delhi',
      highlights: ['India Gate evening drive', 'Red Fort + Chandni Chowk food trail', 'Qutub Minar + Humayun Tomb combo', 'Pickup + hotel check-in assistance'],
      itinerary: ['Day 1: India Gate + Connaught Place', 'Day 2: Red Fort + Chandni Chowk', 'Day 3: Qutub Minar + Humayun Tomb']
    },
    Varanasi: {
      title: 'Varanasi Spiritual + Ghat Experience',
      oldPrice: '₹14,500',
      newPrice: '₹10,200',
      categories: 'Pilgrimage Tours, Uttar Pradesh',
      highlights: ['Kashi Vishwanath corridor visit', 'Dashashwamedh Ghat Ganga Aarti', 'Assi Ghat sunrise experience', 'Temple + food + calm stay planning'],
      itinerary: ['Day 1: Kashi Vishwanath + local temple walk', 'Day 2: Assi Ghat sunrise + Sarnath', 'Day 3: Ganga Aarti + Banarasi food trail']
    },
    Guwahati: {
      title: 'Guwahati Temple + Cruise Escape',
      oldPrice: '₹12,900',
      newPrice: '₹8,999',
      categories: 'Family Tours, Assam',
      highlights: ['Kamakhya Temple darshan support', 'Brahmaputra cruise evening plan', 'Umananda Island local transfer', 'Senior-friendly and family-friendly city plan'],
      itinerary: ['Day 1: Kamakhya Temple + city arrival', 'Day 2: Umananda Island + local food', 'Day 3: Brahmaputra cruise + market walk']
    }
  };

  const regionAliases = {
    srinagar: 'Kashmir',
    jammu: 'Kashmir',
    gulmarg: 'Kashmir',
    pahalgam: 'Kashmir',
    sonmarg: 'Kashmir',
    kashmir: 'Kashmir',
    leh: 'Leh Ladakh',
    ladakh: 'Leh Ladakh',
    'leh ladakh': 'Leh Ladakh',
    nubra: 'Leh Ladakh',
    pangong: 'Leh Ladakh',
    spiti: 'Spiti Valley',
    'spiti valley': 'Spiti Valley',
    kaza: 'Spiti Valley',
    meghalaya: 'Meghalaya',
    shillong: 'Meghalaya',
    cherrapunji: 'Meghalaya',
    dawki: 'Meghalaya',
    uttarakhand: 'Uttarakhand',
    dehradun: 'Uttarakhand',
    haridwar: 'Uttarakhand',
    rishikesh: 'Uttarakhand',
    mussoorie: 'Uttarakhand',
    jaipur: 'Jaipur',
    ajmer: 'Ajmer',
    udaipur: 'Udaipur',
    jodhpur: 'Jodhpur',
    kanyakumari: 'Kanyakumari',
    goa: 'Goa',
    varanasi: 'Varanasi'
  };

  function capitalize(value) {
    return (value || '').charAt(0).toUpperCase() + (value || '').slice(1);
  }

  function cityNameFromInput(value) {
    const raw = (value || to || '').trim();
    const alias = regionAliases[raw.toLowerCase()];
    if (alias) return alias;

    if (data.cityKeyFromValue) {
      const key = data.cityKeyFromValue(raw);
      if (key) {
        const proper = capitalize(key);
        if (data.destinations && data.destinations[proper] && data.destinations[proper].display) {
          return data.destinations[proper].display;
        }
        return proper;
      }
    }
    return raw || 'Delhi';
  }


  function parseInr(value) {
    return Number(String(value || '').replace(/[^\d]/g, '')) || 0;
  }

  function formatInr(value) {
    return '₹' + Number(value || 0).toLocaleString('en-IN');
  }

  function computeHeaderPrices(pack, budget, days) {
    const baseNew = parseInr(pack.newPrice || '11100') || 11100;
    const budgetMultiplier = { Budget: 0.78, Comfort: 1.0, Premium: 1.34 };
    const dayMultiplier = Math.max(1, Number(days || 3)) / 3;
    const newValue = Math.round(baseNew * (budgetMultiplier[budget] || 1) * dayMultiplier / 100) * 100;
    const oldValue = Math.round(newValue * 1.42 / 100) * 100;
    return { oldPrice: formatInr(oldValue), newPrice: formatInr(newValue) };
  }

  function packageTemplate(cityName) {
    return {
      title: `${cityName} curated travel package`,
      oldPrice: '₹15,900',
      newPrice: '₹11,100',
      categories: `Family Tours, ${cityName}`,
      highlights: [`${cityName} sightseeing coverage`, `${cityName} local food & culture`, `${cityName} station to hotel transfer`, `${cityName} age-smart city planning`],
      itinerary: [`Day 1: Arrival in ${cityName}`, `Day 2: Famous places of ${cityName}`, `Day 3: Local exploration + departure`]
    };
  }

  function getImageSet(cityName) {
    return imagePools[cityName] || imagePools.default;
  }

  function getScrapedTourNames(region) {
    const a = (scraped.tourBuckets && scraped.tourBuckets[region]) || [];
    const b = (scraped.tourLinks || []).filter(x => x.Region === region).map(x => x.Package);
    return [...new Set([...a, ...b])].filter(Boolean).slice(0, 8);
  }

  function getScrapedFaqs(region) {
    const a = (scraped.allIndiaFaqs && scraped.allIndiaFaqs[region]) || [];
    const b = (scraped.locationPackages || []).filter(x => x.Location === region).map(x => x.Package_Name);
    return [...new Set([...a, ...b])].filter(Boolean).slice(0, 6);
  }

  function regionSource(region) {
    const match = (scraped.tourLinks || []).find(x => x.Region === region);
    return match ? match.Link : '';
  }

  function renderGallery(cityName, images) {
    if (!galleryEl) return;
    galleryEl.innerHTML = images.map((src, i) => `
      <div class="gallery-item ${i === 0 ? 'big' : ''}">
        <img src="${src}" alt="${cityName} view" loading="eager" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='/package-assets/fort_real.jpg'">
      </div>
    `).join('');
  }

  function renderPackage(cityName) {
    const pack = pkgDB[cityName] || packageTemplate(cityName);
    const budget = budgetInput.value || 'Comfort';
    const days = Number(daysInput.value || 3);
    const computedPrices = computeHeaderPrices(pack, budget, days);
    titleEl.textContent = pack.title;
    oldPriceEl.textContent = computedPrices.oldPrice;
    newPriceEl.textContent = computedPrices.newPrice;
    categoriesEl.textContent = pack.categories + ' • ' + budget + ' plan';
    renderGallery(cityName, getImageSet(cityName));

    const key = data.cityKeyFromValue ? data.cityKeyFromValue(cityName) : cityName.toLowerCase();
    const proper = capitalize(key);
    const cityData = (data.destinations && (data.destinations[cityName] || data.destinations[proper])) || (data.destinations ? data.destinations.Delhi : null);
    const ageValue = Number(ageInput.value || ageFromUrl || 28);
    const band = data.ageBand ? data.ageBand(ageValue) : '20-29';
    const picks = cityData ? ((cityData.ageBands && (cityData.ageBands[band] || cityData.ageBands['20-29'])) || cityData.landmarks || []) : [];
    const selected = picks.slice(0, 6);
    const pref = (prefInput.value || 'city highlights').trim();
    const budgetMap = { Budget: '₹3,999 - ₹6,999', Comfort: '₹7,000 - ₹12,999', Premium: '₹13,000 - ₹24,999' };
    const region = regionAliases[cityName.toLowerCase()] || cityName;
    const tours = getScrapedTourNames(region);
    const faqs = getScrapedFaqs(region);
    const src = regionSource(region);
    const chips = selected.map(p => `<span class="recommend-chip">${p}</span>`).join('');
    const highlights = (pack.highlights || selected).map(h => `<li>${h}</li>`).join('');
    const itinerary = (pack.itinerary || []).map(p => `<li>${p}</li>`).join('');
    const toursHtml = tours.length ? `<h3 style="font-size:34px;line-height:1.1;margin:28px 0 12px;color:var(--navy);">Popular tours from scraped data –</h3><ul style="font-size:20px;line-height:1.8;margin-top:0;">${tours.map(t => `<li>${src ? `<a href="${src}" target="_blank" rel="noopener">${t}</a>` : t}</li>`).join('')}</ul>` : '';
    const faqHtml = faqs.length ? `<h3 style="font-size:34px;line-height:1.1;margin:28px 0 12px;color:var(--navy);">Useful destination FAQs –</h3><ul style="font-size:19px;line-height:1.8;margin-top:0;">${faqs.map(f => `<li>${f}</li>`).join('')}</ul>` : '';

    outputEl.innerHTML = `
      <div class="planner-box">
        <div class="recommend-header" style="margin-bottom:10px;"><div class="hero-kicker" style="color:var(--navy);background:#edf3ff;border-color:#dbe4f6;">Package snapshot</div></div>
        <div class="chip-row">${chips}</div>
        <p class="recommend-note" style="margin-top:14px;">Selected plan: <strong>${budget}</strong> · Visible package price: <strong>${computedPrices.newPrice}</strong> · Preference: <strong>${pref}</strong></p>
        <h3 style="font-size:54px;line-height:1.05;margin:24px 0 12px;color:var(--navy);">Highlights –</h3>
        <ul style="font-size:20px;line-height:1.8;margin-top:0;">${highlights}</ul>
        <p style="font-size:28px;font-weight:800;color:var(--navy);margin:24px 0 8px;">Route – ${Math.max(days,3)-1} Nights and ${Math.max(days,3)} Days</p>
        <p style="font-size:22px;margin:0 0 16px;"><strong>Duration –</strong> Arrival → ${cityName} sightseeing → Departure</p>
        <h3 style="font-size:54px;line-height:1.05;margin:32px 0 12px;color:var(--navy);">Short Itinerary –</h3>
        <ul style="font-size:20px;line-height:1.8;margin-top:0;">${itinerary}</ul>
        ${toursHtml}
        ${faqHtml}
      </div>
    `;

    const waText = encodeURIComponent(`Hello EasyTravel Pro, mujhe ${cityName} package ke bare me enquiry karni hai. Age: ${ageValue}, Days: ${days}, Budget: ${budget}, Preference: ${pref}`);
    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/917366930984?text=${waText}`;
    }
  }


  const payNowBtn = document.getElementById('payNowBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const paymentModal = document.getElementById('paymentModal');
  const paymentSummary = document.getElementById('paymentSummary');
  const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
  const closePaymentModal = document.getElementById('closePaymentModal');
  const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');

  function getFormData() {
    return {
      destination: (destinationInput.value || '').trim(),
      packageTitle: (titleEl.textContent || 'Destination package enquiry').trim(),
      fullName: (nameInput.value || '').trim(),
      email: (emailInput.value || '').trim().toLowerCase(),
      phone: (phoneInput.value || '').trim(),
      age: (ageInput.value || '').trim(),
      numberOfPeople: (peopleInput.value || '1').trim(),
      budget: (budgetInput.value || 'Comfort').trim(),
      days: (daysInput.value || '3').trim(),
      travelMonth: (monthInput.value || '').trim(),
      arrivalMode: (modeInput.value || '').trim(),
      specialRequest: (prefInput.value || '').trim()
    };
  }

  function estimateAmount(formData) {
    const people = Math.max(1, Number(formData.numberOfPeople || 1));
    const budgetName = (formData.budget || 'Comfort').trim();
    const rules = PACKAGE_RULES[budgetName] || PACKAGE_RULES.Comfort;
    const finalDays = budgetName === 'Budget' ? 2 : Math.max(1, Number(formData.days || 3));
    const amount = (people * finalDays * rules.perDayPerPerson) - (rules.coupon || 0);
    return Math.max(amount, 1500);
  }

  function buildReviewSummary() {
    const formData = getFormData();
    const budgetName = (formData.budget || 'Comfort').trim();
    const rules = PACKAGE_RULES[budgetName] || PACKAGE_RULES.Comfort;
    const finalDays = budgetName === 'Budget' ? 2 : Math.max(1, Number(formData.days || 3));
    const finalNights = budgetName === 'Budget' ? 3 : Math.max(1, finalDays - 1);
    const finalPrice = estimateAmount(formData);
    return {
      traveller: formData.fullName || 'Not entered',
      email: formData.email || 'Not entered',
      phone: formData.phone || 'Not entered',
      destination: formData.destination || cityNameFromInput(destinationInput.value),
      age: formData.age || 'Not entered',
      people: formData.numberOfPeople || '1',
      budget: budgetName,
      days: finalDays,
      nights: finalNights,
      arrivalMode: formData.arrivalMode || 'Not entered',
      travelMonth: formData.travelMonth || 'Not entered',
      specialRequest: formData.specialRequest || 'No special request',
      coupon: rules.coupon || 0,
      finalPrice,
      rules
    };
  }

  function renderReviewPanel() {
    if (!reviewPanel || !reviewContent) return null;
    const r = buildReviewSummary();
    reviewReady = true;
    reviewPanel.style.display = 'block';
    reviewContent.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;font-size:16px;">
        <div><strong>Traveller</strong><br>${r.traveller}</div>
        <div><strong>Email</strong><br>${r.email}</div>
        <div><strong>Phone</strong><br>${r.phone}</div>
        <div><strong>Destination</strong><br>${r.destination}</div>
        <div><strong>Age</strong><br>${r.age}</div>
        <div><strong>People</strong><br>${r.people}</div>
        <div><strong>Selected package</strong><br>${r.budget}</div>
        <div><strong>Arrival mode</strong><br>${r.arrivalMode}</div>
        <div><strong>Travel month</strong><br>${r.travelMonth}</div>
        <div><strong>Tour duration</strong><br>${r.days} days / ${r.nights} nights</div>
        <div style="grid-column:1 / -1"><strong>Special request</strong><br>${r.specialRequest}</div>
      </div>
      <div style="margin-top:14px;padding:14px;border-radius:16px;background:#eef5ff;">
        <div style="font-size:18px;font-weight:800;color:#1b3769;">Package features</div>
        <ul style="margin:10px 0 0 18px;">${r.rules.features.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div style="margin-top:14px;padding:14px;border-radius:16px;background:#fff7e8;border:1px solid #ffe0a0;">
        <div><strong>Stay rule:</strong> ${r.rules.stayText}</div>
        <div><strong>Coupon:</strong> ${r.coupon ? '₹' + r.coupon + ' off' : 'No coupon'}</div>
        <div style="font-size:24px;font-weight:900;margin-top:8px;color:#1f3c73;">Final payable price: ₹${Number(r.finalPrice).toLocaleString('en-IN')}</div>
      </div>
    `;
    if (newPriceEl) newPriceEl.textContent = `₹${Number(r.finalPrice).toLocaleString('en-IN')}`;
    if (oldPriceEl) oldPriceEl.textContent = `₹${Number(r.finalPrice + 1800).toLocaleString('en-IN')}`;
    return r;
  }

  function openPaymentModal() {
  const formData = getFormData();
  if (!validateTravellerBeforePayment(formData)) return;
  const summary = buildReviewSummary();
  paymentSummary.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:18px;color:#243b67">
      <div><strong>Traveller</strong><br>${summary.traveller}</div>
      <div><strong>Destination</strong><br>${summary.destination}</div>
      <div><strong>Days / Nights</strong><br>${summary.days} days / ${summary.nights} nights</div>
      <div><strong>People</strong><br>${summary.people}</div>
      <div><strong>Package</strong><br>${summary.budget}</div>
      <div><strong>Arrival mode</strong><br>${summary.arrivalMode}</div>
      <div style="grid-column:1 / -1"><strong>Included features</strong><br>${summary.rules.features.join(', ')}</div>
      <div><strong>Coupon</strong><br>${summary.coupon ? '₹' + summary.coupon + ' off' : 'No coupon'}</div>
      <div><strong>Amount</strong><br><span style="font-size:28px;font-weight:900;color:#1a2d55">₹${Number(summary.finalPrice).toLocaleString('en-IN')}</span></div>
      <div style="grid-column:1 / -1;color:#53698e"><strong>Stay rule</strong><br>${summary.rules.stayText}</div>
    </div>
  `;
  paymentModal.style.display = 'block';
}

function closePayment() {
  if (paymentModal) paymentModal.style.display = 'none';
}

function setPayButtonState() {
  if (!payNowBtn) return;
  const canPay = !!(reviewReady && reviewConfirmCheck && reviewConfirmCheck.checked);
  payNowBtn.disabled = !canPay;
  payNowBtn.style.opacity = canPay ? '1' : '.65';
  payNowBtn.style.cursor = canPay ? 'pointer' : 'not-allowed';
  payNowBtn.textContent = canPay ? 'Pay Now' : 'Pay Now';
  payNowBtn.title = canPay ? 'Cashfree test payment start karo' : 'Review package aur checkbox confirm karke payment enable hoga';
}

function validateTravellerBeforePayment(formData) {
  if (!formData.fullName || !formData.email || !formData.phone || !formData.destination || !formData.age) {
    showPackageMsg('Pay Now se pehle Name, email, phone, destination aur age fill karo.', true);
    showToast('Traveller details pehle complete karo.', true);
    return false;
  }
  if (!reviewReady || !reviewConfirmCheck || !reviewConfirmCheck.checked) {
    showPackageMsg('Payment se pehle package review aur checkbox confirmation zaruri hai.', true);
    showToast('Pehle review confirm karo, phir Pay Now dabao.', true);
    reviewPanel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
  return true;
}

async function createCashfreeOrder(reviewData) {
  const payload = {
    destination: reviewData.destination,
    packageTitle: `${reviewData.destination} curated travel package`,
    fullName: reviewData.traveller,
    email: reviewData.email,
    phone: reviewData.phone,
    age: Number(reviewData.age) || 0,
    numberOfPeople: Number(reviewData.people) || 1,
    budget: reviewData.budget,
    days: Number(reviewData.days) || 1,
    travelMonth: reviewData.travelMonth,
    arrivalMode: reviewData.arrivalMode,
    specialRequest: reviewData.specialRequest,
    amount: Number(reviewData.finalPrice) || 0,
    couponAmount: Number(reviewData.coupon) || 0,
    reviewAccepted: true,
    submittedAfterReview: true
  };

  const res = await fetch(API_BASE + '/api/payments/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let data = {};
  try { data = await res.json(); } catch (e) {}
  if (!res.ok || !data.ok) {
    throw new Error(data.message || 'Cashfree order create failed');
  }
  const paymentSessionId = data?.order?.payment_session_id || data?.payment_session_id || '';
  if (!paymentSessionId) {
    throw new Error('payment_session_id response me nahi mila. Backend payment route check karo.');
  }
  data.paymentSessionId = paymentSessionId;
  return data;
}

async function startCashfreeCheckout(paymentSessionId) {
  if (!window.Cashfree) {
    throw new Error('Cashfree SDK load nahi hua. package.html me SDK script check karo.');
  }
  const cashfree = Cashfree({ mode: CASHFREE_MODE });
  return cashfree.checkout({ paymentSessionId, redirectTarget: '_self' });
}

  async function savePaymentRecord(formData) {
    const amount = estimateAmount(formData);
    const payload = {
      destination: formData.destination,
      packageTitle: formData.packageTitle + ' [PAYMENT]',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age),
      numberOfPeople: Number(formData.numberOfPeople),
      budget: formData.budget,
      days: Number(formData.days),
      travelMonth: formData.travelMonth,
      specialRequest: `PAYMENT CONFIRMED | Amount: ₹${amount} | Arrival: ${formData.arrivalMode} | Query: ${formData.specialRequest || 'NA'}`
    };

    const res = await fetch(API_BASE + '/api/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    let data = {};
    try { data = await res.json(); } catch(e) {}
    if (!res.ok) {
      throw new Error(data.message || 'Payment record save failed');
    }
  }


  async function savePackageReview(reviewData) {
    const payload = {
      travellerName: reviewData.traveller,
      email: reviewData.email,
      phone: reviewData.phone,
      destination: reviewData.destination,
      age: Number(reviewData.age) || 0,
      days: Number(reviewData.days) || 0,
      nights: Number(reviewData.nights) || 0,
      budget: reviewData.budget,
      arrivalMode: reviewData.arrivalMode,
      monthOfTravel: reviewData.travelMonth,
      query: reviewData.specialRequest,
      people: Number(reviewData.people) || 1,
      finalPrice: Number(reviewData.finalPrice) || 0,
      features: reviewData.rules.features,
      couponApplied: reviewData.coupon ? `₹${reviewData.coupon}` : '',
      stayRule: reviewData.rules.stayText,
      reviewAccepted: true,
      submittedAfterReview: true,
      reviewStatus: 'pending',
      invoiceNumber: 'INV-' + Date.now()
    };

    const res = await fetch(API_BASE + '/api/package-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    let data = {};
    try { data = await res.json(); } catch (e) {}
    if (!res.ok || !data.ok) {
      throw new Error(data.message || 'Package review save failed');
    }
    return data;
  }

  async function savePackageEnquiry(formData) {
    const payload = {
      destination: formData.destination,
      packageTitle: formData.packageTitle,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age),
      numberOfPeople: Number(formData.numberOfPeople),
      budget: formData.budget,
      days: Number(formData.days),
      travelMonth: formData.travelMonth,
      specialRequest: formData.specialRequest
    };

    const enquiryPayload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: `${formData.packageTitle} | Destination: ${formData.destination} | Days: ${formData.days} | Budget: ${formData.budget} | Arrival: ${formData.arrivalMode} | Query: ${formData.specialRequest}`,
      pageSource: 'package-page'
    };

    const pkgRes = await fetch(API_BASE + '/api/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const enqRes = await fetch(API_BASE + '/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryPayload)
    });

    let pkgData = {};
    let enqData = {};
    try { pkgData = await pkgRes.json(); } catch (e) {}
    try { enqData = await enqRes.json(); } catch (e) {}

    if (!pkgRes.ok || !enqRes.ok) {
      throw new Error(pkgData.message || enqData.message || 'Package enquiry save failed');
    }
  }

  if (reviewBtn) {
    reviewBtn.addEventListener('click', function () {
      const formData = getFormData();
      if (!formData.fullName || !formData.email || !formData.phone || !formData.destination || !formData.age) {
        showPackageMsg('Review se pehle traveller details, destination, phone aur age fill karo.', true);
        showToast('Review ke liye required fields fill karo.', true);
        return;
      }
      renderReviewPanel();
      if (reviewConfirmCheck) reviewConfirmCheck.checked = false;
      showPackageMsg('Package review ready hai. Checkbox tick karke hi enquiry submit hoga.');
      setPayButtonState();
      reviewPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (reviewConfirmCheck) {
    reviewConfirmCheck.addEventListener('change', setPayButtonState);
  }

  formEl.addEventListener('submit', async function (e) {
    e.preventDefault();
    const cityName = cityNameFromInput(destinationInput.value);
    const formData = getFormData();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.destination || !formData.age) {
      showPackageMsg('Name, email, phone, destination aur age required hai.', true);
      showToast('Please fill all required traveller details.', true);
      return;
    }

    if (!reviewReady) {
      showPackageMsg('Pehle Review package button dabao. Bina review submit allowed nahi hai.', true);
      showToast('Review ke bina submit allowed nahi hai.', true);
      reviewBtn?.focus();
      return;
    }

    if (!reviewConfirmCheck || !reviewConfirmCheck.checked) {
      showPackageMsg('Checkbox tick karna zaruri hai. Bina review confirm kiye form submit nahi hoga.', true);
      showToast('Checkbox tick karo phir submit karo.', true);
      reviewPanel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const reviewData = buildReviewSummary();

    if (enquireBtn) {
      enquireBtn.disabled = true;
      enquireBtn.textContent = 'Saving...';
    }

    try {
      await savePackageReview(reviewData);
      await savePackageEnquiry(formData);
      showPackageMsg('Review + enquiry submit ho gaya. MongoDB Compass me package reviews, packagebookings aur enquiries me data save ho gaya.');
      showToast('Review and enquiry submitted successfully.');
      renderPackage(cityName);
      formEl.reset();
      destinationInput.value = cityName;
      ageInput.value = ageFromUrl;
      modeInput.value = modeFromUrl;
      monthInput.value = 'April';
      reviewReady = false;
      if (reviewConfirmCheck) reviewConfirmCheck.checked = false;
      if (reviewPanel) reviewPanel.style.display = 'none';
      setPayButtonState();
    } catch (error) {
      console.error('Review save error:', error);
      showPackageMsg('Review / enquiry save nahi ho pa raha. Backend 5055 aur MongoDB connection check karo. ' + (error.message || ''), true);
      showToast('Review submit failed. Please try again.', true);
    } finally {
      if (enquireBtn) {
        enquireBtn.disabled = false;
        enquireBtn.textContent = 'Enquire Now';
      }
    }
  });

if (payNowBtn) {
  payNowBtn.addEventListener('click', function () {
    openPaymentModal();
  });
  setPayButtonState();
}

if (closePaymentModal) {
  closePaymentModal.addEventListener('click', closePayment);
}

if (cancelPaymentBtn) {
  cancelPaymentBtn.addEventListener('click', closePayment);
}

if (confirmPaymentBtn) {
  confirmPaymentBtn.addEventListener('click', async function () {
    const formData = getFormData();
    if (!validateTravellerBeforePayment(formData)) {
      return;
    }
    const reviewData = buildReviewSummary();
    try {
      confirmPaymentBtn.disabled = true;
      confirmPaymentBtn.textContent = 'Creating order...';
      const paymentData = await createCashfreeOrder(reviewData);
      closePayment();
      showPackageMsg('Cashfree test order create ho gaya. Checkout open ho raha hai...');
      showToast('Cashfree checkout open ho raha hai.');
      await startCashfreeCheckout(paymentData.paymentSessionId);
    } catch (error) {
      console.error('Cashfree payment error:', error);
      showPackageMsg('Cashfree payment start nahi ho pa raha. backend/.env me App ID aur Secret Key set karke server restart karo. ' + (error.message || API_TIMEOUT_MESSAGE), true);
      showToast('Payment start failed.', true);
    } finally {
      confirmPaymentBtn.disabled = false;
      confirmPaymentBtn.textContent = 'Confirm Payment';
    }
  });
}
  [destinationInput, ageInput, modeInput, daysInput, budgetInput, monthInput, prefInput].forEach(el => {
    if (el) {
      el.addEventListener('change', () => renderPackage(cityNameFromInput(destinationInput.value)));
    }
  });

  setPayButtonState();
  renderPackage(cityNameFromInput(destinationInput.value));
})();
