(function () {
  const popover = document.getElementById('ridePopover');
  const closeBtn = document.getElementById('ridePopoverClose');
  if (popover) {
    const dismissed = sessionStorage.getItem('easytravel_ride_popover_closed');
    if (!dismissed) {
      setTimeout(() => popover.classList.add('show'), 900);
    }
    closeBtn && closeBtn.addEventListener('click', () => {
      popover.classList.remove('show');
      sessionStorage.setItem('easytravel_ride_popover_closed', '1');
    });
  }

  const form = document.getElementById('rideForm');
  if (!form) return;

  const pricing = {
    bike: { base: 24, perKm: 9, min: 29, label: 'Bike' },
    auto: { base: 38, perKm: 14, min: 49, label: 'Auto' },
    cab: { base: 64, perKm: 21, min: 89, label: 'Cab' }
  };

  function rupee(value) {
    return `₹${Math.max(0, Math.round(value)).toLocaleString('en-IN')}`;
  }

  function calculateQuote() {
    const pickup = document.getElementById('ridePickup').value.trim() || 'Pickup';
    const drop = document.getElementById('rideDrop').value.trim() || 'Drop';
    const city = document.getElementById('rideCity').value.trim() || 'your city';
    const distance = Number(document.getElementById('rideDistance').value || 1);
    const type = document.getElementById('rideType').value;
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

    const message = `EasyTravel Ride Request%0AType: ${rate.label}%0ACity: ${city}%0APickup: ${pickup}%0ADrop: ${drop}%0ADistance: ${distance} km%0ATravellers: ${people}%0AQuote: ${rupee(ours)}`;
    document.getElementById('rideWhatsapp').href = `https://wa.me/917366930984?text=${message}`;
    document.getElementById('rideMaps').href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup + ', ' + city)}&destination=${encodeURIComponent(drop + ', ' + city)}`;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateQuote();
  });

  ['ridePickup', 'rideDrop', 'rideCity', 'rideDistance', 'rideType', 'ridePeople'].forEach(id => {
    const input = document.getElementById(id);
    input && input.addEventListener('input', calculateQuote);
    input && input.addEventListener('change', calculateQuote);
  });

  calculateQuote();
})();
