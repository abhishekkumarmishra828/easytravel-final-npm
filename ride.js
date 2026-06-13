(function () {
  const popupRoot = document.getElementById('ridePopover');
  const closeBtn = document.getElementById('ridePopoverClose');
  if (popupRoot) {
    setTimeout(() => popupRoot.classList.add('show'), 700);
    closeBtn && closeBtn.addEventListener('click', () => popupRoot.classList.remove('show'));
    popupRoot.addEventListener('click', event => {
      if (event.target === popupRoot) popupRoot.classList.remove('show');
    });
  }

  const form = document.getElementById('rideForm');
  if (!form) return;

  const pricing = {
    bike: { base: 24, perKm: 9, min: 29, label: 'Bike', wait: '4 min' },
    auto: { base: 38, perKm: 14, min: 49, label: 'Auto', wait: '3 min' },
    mini: { base: 58, perKm: 18, min: 89, label: 'Mini', wait: '6 min' },
    sedan: { base: 76, perKm: 22, min: 119, label: 'Prime Sedan', wait: '7 min' },
    suv: { base: 96, perKm: 28, min: 159, label: 'Prime SUV', wait: '8 min' }
  };

  const tabContent = {
    daily: {
      title: 'Everyday city commute',
      text: 'Affordable bike, auto and cab rides at your doorstep.',
      hero: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80',
      distance: 6
    },
    outstation: {
      title: 'Ride out of town',
      text: 'Book and depart in an hour for nearby cities and yatra base points.',
      hero: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80',
      distance: 85
    },
    rental: {
      title: 'Hourly rentals',
      text: 'Keep a ride with you for shopping, sightseeing and business visits.',
      hero: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1800&q=80',
      distance: 28
    }
  };

  const pickupHidden = document.getElementById('ridePickup');
  const pickupText = document.getElementById('ridePickupText');
  const latInput = document.getElementById('rideLat');
  const lngInput = document.getElementById('rideLng');
  const locationStatus = document.getElementById('rideLocationStatus');
  const useLocationBtn = document.getElementById('useLocationBtn');
  const rideTypeInput = document.getElementById('rideType');
  const rideRows = document.querySelectorAll('.ride-option-row');
  const tabs = document.querySelectorAll('.ride-tabs button');
  let activeTab = 'daily';

  function rupee(value) {
    return `Rs ${Math.max(0, Math.round(value)).toLocaleString('en-IN')}`;
  }

  function notifySecurity(eventType, details) {
    fetch('/api/security-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, details, page: 'ride' })
    }).catch(() => {});
  }

  function setPickup(label, detail, coords) {
    pickupHidden.value = label;
    pickupText.value = label;
    if (coords) {
      latInput.value = coords.lat;
      lngInput.value = coords.lng;
    }
    locationStatus.textContent = detail;
    calculateQuote();
  }

  async function reverseGeocode(lat, lng) {
    const res = await fetch(`/api/reverse-geocode?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Address lookup failed');
    return data.address;
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      setPickup('City centre pickup', 'Geolocation supported nahi hai. Pickup field manually edit kar sakte ho.');
      pickupText.removeAttribute('readonly');
      return;
    }
    pickupText.value = 'Fetching current location...';
    locationStatus.textContent = 'Location permission allow karo. Exact address lookup ho raha hai.';
    navigator.geolocation.getCurrentPosition(
      async position => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        try {
          const address = await reverseGeocode(lat, lng);
          setPickup(address, 'Location fetched. Agar address thoda wrong lage to pickup field edit kar sakte ho.', { lat, lng });
          pickupText.removeAttribute('readonly');
        } catch (error) {
          setPickup(`Current location ${lat}, ${lng}`, 'Coordinates fetched, address lookup fail hua. Pickup field edit kar sakte ho.', { lat, lng });
          pickupText.removeAttribute('readonly');
        }
      },
      () => {
        setPickup('City centre pickup', 'Location permission deny hua. Pickup field manually edit kar sakte ho.');
        pickupText.removeAttribute('readonly');
        notifySecurity('location_permission_denied', 'Ride page geolocation permission denied');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  }

  function fareFor(type) {
    const distance = Number(document.getElementById('rideDistance').value || 1);
    const rate = pricing[type] || pricing.auto;
    const market = Math.max(rate.min + 10, rate.base + distance * rate.perKm + 12);
    const discount = distance <= 6 ? 10 : distance <= 30 ? 8 : 5;
    return { market, ours: Math.max(rate.min, market - discount), discount };
  }

  function calculateQuote() {
    const pickup = pickupHidden.value || pickupText.value || 'Current location';
    const drop = document.getElementById('rideDrop').value.trim() || 'Drop';
    const city = document.getElementById('rideCity').value.trim() || 'your city';
    const type = rideTypeInput.value || 'auto';
    const rate = pricing[type] || pricing.auto;
    const selected = fareFor(type);

    Object.keys(pricing).forEach(key => {
      const fareEl = document.getElementById(`${key}Fare`);
      if (fareEl) fareEl.textContent = rupee(fareFor(key).ours);
    });

    document.getElementById('rideQuoteTitle').textContent = `${rate.label} ride estimate`;
    document.getElementById('rideMarketPrice').textContent = `Market ${rupee(selected.market)}`;
    document.getElementById('rideOurPrice').textContent = rupee(selected.ours);
    document.getElementById('rideQuoteText').textContent = `${pickup} to ${drop}, ${city}. ${rate.wait} expected pickup.`;
    document.getElementById('rideSavingPill').textContent = `You save ${rupee(selected.market - selected.ours)}`;

    const origin = latInput.value && lngInput.value ? `${latInput.value},${lngInput.value}` : pickup;
    const message = `EasyTravel Ride Request%0AType: ${rate.label}%0ACity: ${city}%0APickup: ${pickup}%0ADestination: ${drop}%0AQuote: ${rupee(selected.ours)}%0ATab: ${activeTab}`;
    document.getElementById('rideWhatsapp').href = `https://wa.me/917366930984?text=${message}`;
    document.getElementById('rideMaps').href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(drop + ', ' + city)}`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.rideTab || 'daily';
      const content = tabContent[activeTab] || tabContent.daily;
      document.getElementById('rideShowcaseTitle').textContent = content.title;
      document.getElementById('rideShowcaseText').textContent = content.text;
      document.getElementById('rideShowcasePanel').style.backgroundImage = `linear-gradient(90deg,rgba(9,20,44,.32),rgba(9,20,44,.52)),url('${content.hero}')`;
      document.getElementById('rideDistance').value = content.distance;
      document.getElementById('availableRideHeading').textContent = activeTab === 'daily' ? 'Available rides' : activeTab === 'outstation' ? 'Outstation rides' : 'Rental packages';
      calculateQuote();
    });
  });

  rideRows.forEach(row => {
    row.addEventListener('click', () => {
      rideRows.forEach(item => item.classList.remove('active'));
      row.classList.add('active');
      rideTypeInput.value = row.dataset.rideType || 'auto';
      calculateQuote();
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    calculateQuote();
    document.getElementById('rideQuoteCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  ['ridePickupText', 'rideDrop', 'rideCity', 'rideDistance', 'rideWhen'].forEach(id => {
    const input = document.getElementById(id);
    input && input.addEventListener('input', () => {
      if (id === 'ridePickupText') pickupHidden.value = input.value;
      calculateQuote();
    });
    input && input.addEventListener('change', calculateQuote);
  });

  useLocationBtn && useLocationBtn.addEventListener('click', requestLocation);
  document.getElementById('rideShowcasePanel').style.backgroundImage = `linear-gradient(90deg,rgba(9,20,44,.32),rgba(9,20,44,.52)),url('${tabContent.daily.hero}')`;
  requestLocation();
  calculateQuote();
})();
