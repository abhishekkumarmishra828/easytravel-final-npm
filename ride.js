(function () {
  const popupRoot = document.getElementById('ridePopover');
  const closeBtn = document.getElementById('ridePopoverClose');
  if (popupRoot) {
    setTimeout(() => popupRoot.classList.add('show'), 700);
    closeBtn && closeBtn.addEventListener('click', () => {
      popupRoot.classList.remove('show');
    });
    popupRoot.addEventListener('click', (event) => {
      if (event.target === popupRoot) popupRoot.classList.remove('show');
    });
  }

  const form = document.getElementById('rideForm');
  if (!form) return;

  const pricing = {
    bike: { base: 24, perKm: 9, min: 29, label: 'Bike' },
    auto: { base: 38, perKm: 14, min: 49, label: 'Auto' },
    cab: { base: 64, perKm: 21, min: 89, label: 'Cab' }
  };

  const pickupInput = document.getElementById('ridePickup');
  const pickupLabel = document.getElementById('ridePickupLabel');
  const locationStatus = document.getElementById('rideLocationStatus');
  const useLocationBtn = document.getElementById('useLocationBtn');
  const rideTypeInput = document.getElementById('rideType');
  const vehicleCards = document.querySelectorAll('.ride-vehicle-card');

  function rupee(value) {
    return `Rs ${Math.max(0, Math.round(value)).toLocaleString('en-IN')}`;
  }

  function setPickup(text, detail) {
    pickupInput.value = text;
    pickupLabel.textContent = text;
    locationStatus.textContent = detail;
    calculateQuote();
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      setPickup('City centre pickup', 'Geolocation supported nahi hai, city centre fallback use ho raha hai.');
      return;
    }
    pickupLabel.textContent = 'Fetching your device location...';
    locationStatus.textContent = 'Browser location permission allow karo.';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);
        setPickup(`Current location (${lat}, ${lng})`, 'Device location fetched. Driver pickup map link me coordinates use honge.');
      },
      () => {
        setPickup('City centre pickup', 'Location permission nahi mila, city centre fallback use ho raha hai.');
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 }
    );
  }

  function calculateQuote() {
    const pickup = pickupInput.value || 'Current location';
    const drop = document.getElementById('rideDrop').value.trim() || 'Drop';
    const city = document.getElementById('rideCity').value.trim() || 'your city';
    const distance = Number(document.getElementById('rideDistance').value || 1);
    const type = rideTypeInput.value || 'bike';
    const people = Number(document.getElementById('ridePeople').value || 1);
    const rate = pricing[type] || pricing.bike;
    const capacityCharge = type === 'bike' ? Math.max(0, people - 1) * 16 : Math.max(0, people - 3) * 18;
    const market = Math.max(rate.min + 10, rate.base + distance * rate.perKm + capacityCharge + 12);
    const discount = distance <= 6 ? 10 : distance <= 14 ? 8 : 5;
    const ours = Math.max(rate.min, market - discount);

    document.getElementById('rideQuoteTitle').textContent = `${rate.label} ride estimate`;
    document.getElementById('rideMarketPrice').textContent = `Market ${rupee(market)}`;
    document.getElementById('rideOurPrice').textContent = rupee(ours);
    document.getElementById('rideQuoteText').textContent = `${pickup} to ${drop}, ${city}. Approx ${distance} km local transfer for ${people} traveller${people > 1 ? 's' : ''}.`;
    document.getElementById('rideSavingPill').textContent = `You save ${rupee(market - ours)}`;

    const message = `EasyTravel Ride Request%0AType: ${rate.label}%0ACity: ${city}%0APickup: ${pickup}%0ADestination: ${drop}%0ADistance: ${distance} km%0ATravellers: ${people}%0AQuote: ${rupee(ours)}`;
    document.getElementById('rideWhatsapp').href = `https://wa.me/917366930984?text=${message}`;
    document.getElementById('rideMaps').href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(drop + ', ' + city)}`;
  }

  vehicleCards.forEach((card) => {
    card.addEventListener('click', () => {
      vehicleCards.forEach(item => item.classList.remove('active'));
      card.classList.add('active');
      rideTypeInput.value = card.dataset.rideType || 'bike';
      calculateQuote();
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateQuote();
  });

  ['rideDrop', 'rideCity', 'rideDistance', 'ridePeople'].forEach(id => {
    const input = document.getElementById(id);
    input && input.addEventListener('input', calculateQuote);
    input && input.addEventListener('change', calculateQuote);
  });

  useLocationBtn && useLocationBtn.addEventListener('click', requestLocation);
  requestLocation();
  calculateQuote();
})();
