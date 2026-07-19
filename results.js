
function citySpecificPlaceImage(city) {
  const map = {
    Jaipur: '/place-assets/jaipur-hawa-mahal.jpg',
    Haridwar: '/place-assets/haridwar-main.jpg',
    Rishikesh: '/place-assets/rishikesh-main.jpg',
    Guwahati: '/place-assets/guwahati-kamakhya-main.jpg',
    Gauhati: '/place-assets/guwahati-kamakhya-main.jpg',
    Varanasi: '/place-assets/varanasi-kashi-main.jpg',
    Kashi: '/place-assets/varanasi-kashi-main.jpg',
    Rameshwaram: '/place-assets/rameshwaram-main.jpg',
    Dwarka: '/place-assets/dwarka-main.jpg',
    Dwarika: '/place-assets/dwarka-main.jpg',
    Mumbai: '/place-assets/mumbai-main.jpg'
  };
  return map[city] || '/assets/hero-show-1.png';
}

function stableTravelImageFallback(city) {
  const name = String(city || '').toLowerCase();
  if (/jaisalmer|rajasthan|jaipur|jodhpur|udaipur|ajmer|pushkar|mount abu/.test(name)) return '/package-assets/fort_real.jpg';
  if (/kanyakumari/.test(name)) return '/package-assets/sunset_real.jpg';
  if (/chandigarh|garden/.test(name)) return '/package-assets/garden_real.jpg';
  if (/ranchi|jamshedpur|jharkhand|tatanagar|tata nagar/.test(name)) return '/package-assets/river_real.jpg';
  if (/goa|kochi|alleppey|andaman|lakshadweep|dwarka|rameshwaram/.test(name)) return '/package-assets/river_real.jpg';
  if (/kedarnath|badrinath|amarnath|vaishno|uttarakhand|himalaya|shimla|manali|ladakh|kashmir|darjeeling|gangtok/.test(name)) return '/package-assets/hill_real.jpg';
  return '/package-assets/building_real.jpg';
}


(function requireAuthForExplore(){
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const publicPages = ['login.html'];
  const token = localStorage.getItem('easytravel_token');
  if (!publicPages.includes(current) && !token) {
    window.location.href = '/login.html';
    return;
  }
})();

(function () {
  const API_BASE = window.EASYTRAVEL_API_BASE || "";
  const data = window.EASYTRAVEL_DATA;
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from') || 'Patna Junction (PNBE)';
  const to = params.get('to') || 'Delhi';
  const date = params.get('date') || '2026-04-04';
  const age = Number(params.get('age') || 28);
  const mode = (params.get('mode') || 'train').toLowerCase();
  const religion = (params.get('religion') || 'any').toLowerCase();

  const resultTitle = document.getElementById('resultTitle');
  const routeBadges = document.getElementById('routeBadges');
  const resultSubtitle = document.getElementById('resultSubtitle');
  const resultHeroImage = document.getElementById('resultHeroImage');
  const visualPlaceName = document.getElementById('visualPlaceName');
  const visualPlaceLine = document.getElementById('visualPlaceLine');
  const miniStatPlaces = document.getElementById('miniStatPlaces');
  const miniStatMood = document.getElementById('miniStatMood');
  const miniStatFlow = document.getElementById('miniStatFlow');
  const ticketHeading = document.getElementById('ticketHeading');
  const routeInsight = document.getElementById('routeInsight');
  const ticketListWrap = document.getElementById('ticketListWrap');
  const recHeading = document.getElementById('recHeading');
  const recNote = document.getElementById('recNote');
  const recQuickLinks = document.getElementById('recQuickLinks');
  const placeChips = document.getElementById('placeChips');
  const bookNowTop = document.getElementById('bookNowTop');
  const irctcNotice = document.getElementById('irctcNotice');
  const packageBtn = document.getElementById('packageBtn');
  const packagePreview = document.getElementById('packagePreview');
  const cultureCard = document.getElementById('cultureCard');
  const localTransportSummary = document.getElementById('localTransportSummary');
  const localTransportModes = document.getElementById('localTransportModes');
  const localTransportBtn = document.getElementById('localTransportBtn');

  const knownCityKey = data.knownCityKeyFromValue ? data.knownCityKeyFromValue(to) : data.cityKeyFromValue(to);
  if (!knownCityKey) {
    document.body.classList.add('no-results-page');
    resultTitle.textContent = 'No Such Result Found';
    if (resultSubtitle) resultSubtitle.textContent = `"${to}" is not available in the EasyTravel destination database yet. Please return to search and choose a supported destination from the suggestion list.`;
    routeBadges.innerHTML = '';
    [from || 'Source not selected', to || 'Destination not selected', `Date: ${date}`, `Mode: ${mode}`].forEach(text => {
      const span = document.createElement('span');
      span.textContent = text;
      routeBadges.appendChild(span);
    });
    if (ticketHeading) ticketHeading.textContent = 'No routes available';
    if (routeInsight) routeInsight.textContent = 'We could not match this destination with a verified city profile, so package recommendations are paused for accuracy.';
    if (ticketListWrap) ticketListWrap.innerHTML = '<div class="empty-result-card"><h3>No Such Result Found</h3><p>Please search again with a supported Indian city or destination from the homepage suggestions.</p><a class="primary-btn" href="/#plan">Search Again</a></div>';
    if (recHeading) recHeading.textContent = 'Destination Not Available';
    if (recNote) recNote.textContent = 'No places are shown because this destination is not currently in the database.';
    if (placeChips) placeChips.innerHTML = '';
    if (recQuickLinks) recQuickLinks.innerHTML = '';
    if (visualPlaceName) visualPlaceName.textContent = 'No verified destination';
    if (visualPlaceLine) visualPlaceLine.textContent = 'Choose a supported place to see images, maps and route ideas.';
    if (resultHeroImage) resultHeroImage.src = '/assets/hero-show-1.png';
    if (miniStatPlaces) miniStatPlaces.textContent = '0 places';
    if (miniStatMood) miniStatMood.textContent = 'Unavailable';
    if (miniStatFlow) miniStatFlow.textContent = 'Search again';
    if (bookNowTop) bookNowTop.style.display = 'none';
    if (packageBtn) packageBtn.style.display = 'none';
    if (packagePreview) packagePreview.style.display = 'none';
    if (cultureCard) cultureCard.style.display = 'none';
    if (localTransportSummary) localTransportSummary.style.display = 'none';
    if (localTransportModes) localTransportModes.style.display = 'none';
    if (localTransportBtn) localTransportBtn.style.display = 'none';
    return;
  }
  const cityKey = knownCityKey;
  const cityName = data.destinationNameFromKey ? data.destinationNameFromKey(cityKey) : cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
  const cityData = data.destinations[cityName];
  const selectedAgeBand = data.ageBand(age);
  const rawRecommendedNames = cityData.ageBands[selectedAgeBand] || cityData.ageBands['20-29'] || [];
  const allPlaceNames = Object.keys(cityData.places || {});
  const PREFERENCE_PLACE_OVERRIDES = {
    muslim: {
      Mumbai: ['Haji Ali Dargah', 'Gateway of India', 'Marine Drive sunset', 'Colaba Causeway', 'Kala Ghoda', 'Bandra sea face', 'Sanjay Gandhi National Park'],
      Delhi: ['Jama Masjid', 'Humayun Tomb', 'Red Fort', 'India Gate', 'Chandni Chowk food trail', 'Lodhi Garden'],
      Hyderabad: ['Charminar', 'Mecca Masjid', 'Salar Jung Museum', 'Golconda Fort', 'Hussain Sagar'],
      Lucknow: ['Bara Imambara', 'Chota Imambara', 'Rumi Darwaza', 'Hazratganj', 'Residency'],
      Agra: ['Taj Mahal', 'Agra Fort', 'Itmad-ud-Daulah', 'Mehtab Bagh', 'Sadar Bazaar'],
      'Jammu & Kashmir': ['Hazratbal Shrine', 'Dal Lake easy shikara', 'Mughal Gardens', 'Nishat Bagh', 'Shalimar Bagh']
    },
    hindu: {
      Mumbai: ['Siddhivinayak Temple', 'Gateway of India', 'Marine Drive sunset', 'Elephanta Caves'],
      Delhi: ['Akshardham', 'India Gate', 'Qutub Minar', 'Dilli Haat'],
      Varanasi: ['Kashi Vishwanath', 'Dashashwamedh Ghat', 'Ganga Aarti experience', 'Sarnath']
    },
    buddhist: {
      Mumbai: ['Gateway of India', 'Marine Drive sunset', 'Kala Ghoda', 'Sanjay Gandhi National Park'],
      Delhi: ['Humayun Tomb', 'Lodhi Garden', 'India Gate', 'National Museum'],
      Rajgir: ['Vishwa Shanti Stupa', 'Venu Van', 'Rajgir Ropeway', 'Cyclopean Wall']
    },
    christian: {
      Mumbai: ['Bandra sea face', 'Gateway of India', 'Marine Drive sunset', 'Colaba Causeway', 'Kala Ghoda'],
      Delhi: ['India Gate', 'Humayun Tomb', 'Lodhi Garden', 'Dilli Haat'],
      Goa: ['Basilica of Bom Jesus', 'Old Goa churches', 'Fort Aguada', 'Miramar promenade']
    }
  };
  const PREFERENCE_BLOCK_WORDS = {
    muslim: ['temple', 'mandir', 'math', 'ashram', 'jyotirlinga', 'balaji', 'mahadev', 'vishwanath', 'siddhivinayak', 'akshardham', 'iskcon', 'gurudwara', 'gurdwara', 'church', 'basilica', 'cathedral'],
    hindu: ['mosque', 'masjid', 'dargah', 'church', 'basilica', 'cathedral'],
    buddhist: ['mosque', 'masjid', 'dargah', 'church', 'basilica', 'cathedral', 'temple', 'mandir', 'jyotirlinga', 'balaji', 'mahadev', 'vishwanath', 'siddhivinayak'],
    christian: ['mosque', 'masjid', 'dargah', 'temple', 'mandir', 'jyotirlinga', 'balaji', 'mahadev', 'vishwanath', 'siddhivinayak', 'gurudwara', 'gurdwara']
  };
  function filterPlacesByPreference(names) {
    const blocked = PREFERENCE_BLOCK_WORDS[religion] || [];
    return [...new Set(names || [])].filter(name => {
      const lower = String(name).toLowerCase();
      return !blocked.some(word => lower.includes(word));
    });
  }
  const preferredNames = filterPlacesByPreference([
    ...((PREFERENCE_PLACE_OVERRIDES[religion] && PREFERENCE_PLACE_OVERRIDES[religion][cityName]) || []),
    ...rawRecommendedNames
  ]).filter(name => cityData.places[name]);
  const recommendedNames = preferredNames.length ? preferredNames : filterPlacesByPreference(rawRecommendedNames).filter(name => cityData.places[name]);
  const visiblePlaceNames = [...new Set([...recommendedNames, ...filterPlacesByPreference(allPlaceNames)])];
  let selectedPlace = cityData.places[recommendedNames[0]] || cityData.places[cityData.defaultPlace] || cityData.places[visiblePlaceNames[0]];
  let selectedPackagePlaces = visiblePlaceNames.slice(0, Math.min(3, visiblePlaceNames.length));
  if (!selectedPackagePlaces.length && selectedPlace?.name) selectedPackagePlaces = [selectedPlace.name];

  resultTitle.textContent = `Recommended Famous Places In ${cityName} For A ${age}-Year-Old Traveller`;
  if (resultSubtitle) resultSubtitle.textContent = `${cityName} recommendations are tailored by age, trip duration and ${religion === 'any' ? 'open travel' : religion} preference, with route planning, maps, video links and stay ideas.`;
  routeBadges.innerHTML = '';
  [from, to, `Date: ${date}`, `Mode: ${mode}`, `Preference: ${religion}`].forEach(text => {
    const span = document.createElement('span');
    span.textContent = text;
    routeBadges.appendChild(span);
  });

  ticketHeading.textContent = mode === 'train' ? 'Suggested train routes' : mode === 'bus' ? 'Suggested bus routes' : 'Suggested hotel + stay options';
  routeInsight.textContent = `Route insight: ${from} -> ${to}. Traveller age ${age}. Mode: ${mode} booking flow. After arrival, this platform also suggests business stays, station pickup concepts, food areas, nightlife and calm city options.`;
  recHeading.textContent = `${cityName} Recommendations By Age`;
  if (miniStatPlaces) miniStatPlaces.textContent = `${recommendedNames.length || visiblePlaceNames.length} places`;
  if (miniStatMood) miniStatMood.textContent = age < 22 ? 'Budget' : age < 35 ? 'Comfort' : 'Premium';
  if (miniStatFlow) miniStatFlow.textContent = `${mode.charAt(0).toUpperCase()+mode.slice(1)} + city`;
  recNote.textContent = `Age and preference-based smart picks are shown first. ${religion === 'muslim' ? 'Halal-friendly food and mosque-nearby flow are prioritised.' : religion === 'buddhist' ? 'Peaceful monasteries, museums and calm routes are prioritised.' : religion === 'christian' ? 'Churches, colonial heritage and calm family routes are prioritised.' : 'Family-friendly open routes are prioritised.'} Click any place to view maps, videos and details.`;

  renderTickets();
  renderRecommendationChips();
  renderPlace(selectedPlace);
  renderPackage();
  renderCultureGuide();
  renderLocalTransport();

  bookNowTop.addEventListener('click', async () => {
    if (mode === 'train') {
      const source = encodeURIComponent(from);
      const dest = encodeURIComponent(to);
      window.open(`https://www.irctc.co.in/nget/train-search`, '_blank');
      alert('The official IRCTC page has been opened for final train booking. EasyTravel Pro supports planning, route discovery, age-based place exploration, station pickup ideas and city intelligence.');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, date, age, mode, suggestedPlace: selectedPlace.name })
      });
      const json = await response.json();
      if (json.ok) {
        alert(`Demo booking saved. Booking ID: ${json.booking.id}`);
      } else {
        alert('Booking request failed.');
      }
    } catch (e) {
      alert('Booking request failed.');
    }
  });

  function renderTickets() {
    ticketListWrap.innerHTML = '';
    if (mode === 'train') {
      const key = `${from}|${cityName}`;
      const items = data.trains[key] || data.dynamicTrainRoute(from, cityName);
      items.forEach(item => {
        ticketListWrap.appendChild(trainCard(item));
      });
      irctcNotice.classList.remove('hidden');
    } else if (mode === 'bus') {
      const key = `${from}|${cityName}`;
      const items = data.buses[key] || data.dynamicBusRoute(from, cityName);
      items.forEach(item => ticketListWrap.appendChild(busCard(item)));
      irctcNotice.classList.add('hidden');
    } else {
      const items = data.hotels[cityName] || data.dynamicHotelRoute(cityName);
      items.forEach(item => ticketListWrap.appendChild(hotelCard(item)));
      irctcNotice.classList.add('hidden');
    }
  }

  function renderRecommendationChips() {
    placeChips.innerHTML = '';
    visiblePlaceNames.forEach(name => {
      const place = cityData.places[name];
      if (!place) return;
      const chip = document.createElement('button');
      chip.className = 'pill' + (selectedPlace.name === place.name ? ' active' : '');
      chip.textContent = place.name;
      chip.title = recommendedNames.includes(name) ? 'Age-smart recommendation' : 'More famous place';
      chip.addEventListener('click', () => {
        selectedPlace = place;
        renderRecommendationChips();
        renderPlace(place);
        renderPackage();
        renderCultureGuide();
        renderLocalTransport();
      });
      placeChips.appendChild(chip);
    });
  }

  function renderPlace(place) {
    document.getElementById('placeTitle').textContent = place.name;
    if (visualPlaceName) visualPlaceName.textContent = place.name;
    if (visualPlaceLine) visualPlaceLine.textContent = `${place.city} · ${place.bestFor}`;
    document.getElementById('placeSummary').textContent = place.summary;
    const img = document.getElementById('placeImage');
if (img) {
  const resolvedImage = place.image || (typeof placeImage === 'function' ? placeImage(place.city || place.destination || '', place.name || '') : '/assets/hero-show-1.png');
  const fallbackImage = stableTravelImageFallback(place.city || cityName);
  img.onerror = () => { img.onerror = null; img.src = fallbackImage; };
  img.src = resolvedImage;
  if (resultHeroImage) {
    resultHeroImage.onerror = () => { resultHeroImage.onerror = null; resultHeroImage.src = fallbackImage; };
    resultHeroImage.src = resolvedImage;
  }
}
    document.getElementById('bestFor').textContent = place.bestFor;
    document.getElementById('distance').textContent = place.distance;
    document.getElementById('placeCity').textContent = place.city;
    document.getElementById('mapFrame').src = osmEmbed(place.coords[0], place.coords[1]);
    document.getElementById('googleBtn').href = place.google || `https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.city)}`;
    document.getElementById('wikiBtn').href = place.wiki;
    if (recQuickLinks) {
      const v1 = (place.videos && place.videos[0] && place.videos[0].url)
        ? place.videos[0].url
        : `https://www.youtube.com/results?search_query=${encodeURIComponent(place.name + ' ' + place.city + ' travel guide')}`;
      const maps = place.maps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ', ' + place.city + ', India')}`;
      const google = place.google || `https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.city)}`;
      recQuickLinks.innerHTML = '';
      [
        ['Google info', google],
        ['Wikipedia', place.wiki],
        ['Open map', maps],
        ['Watch video', v1]
      ].forEach(([label, href]) => {
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.textContent = label;
        recQuickLinks.appendChild(a);
      });
    }

    const videoCards = document.getElementById('videoCards');
    videoCards.innerHTML = '';
    (place.videos || []).forEach((video, idx) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.innerHTML = `
        <div class="video-thumb" style="background-image:url(${place.image})"></div>
        <div class="video-copy">
          <h5>${video.title || ('Travel video ' + (idx + 1))}</h5>
          <p>${video.desc || (place.name + ' travel preview and arrival experience.')}</p>
          <a class="video-open" href="${video.url}" target="_blank">Watch video ${idx + 1}</a>
        </div>`;
      videoCards.appendChild(card);
    });
  }



  function renderPackage() {
    const city = cityName;
    const band = selectedAgeBand;
    const budget = age < 22 ? 'Budget' : age < 35 ? 'Comfort' : 'Premium';
    const days = age < 22 ? 2 : age < 40 ? 3 : 2;
    const packagePlaceOptions = visiblePlaceNames.slice(0, Math.min(9, visiblePlaceNames.length));
    selectedPackagePlaces = selectedPackagePlaces.filter(name => packagePlaceOptions.includes(name));
    if (!selectedPackagePlaces.length) selectedPackagePlaces = [selectedPlace?.name || packagePlaceOptions[0]].filter(Boolean);
    const selectedCount = selectedPackagePlaces.length || 1;
    const scopeText = selectedPackagePlaces.join(', ');
    const savingsText = selectedCount <= 2 ? 'Lean route pricing for selected spots only' : selectedCount <= 4 ? 'Balanced route pricing with smart discount' : 'Full sightseeing route with bundle discount';
    packagePreview.innerHTML = `
      <div class="package-badge">${days}-day smart package</div>
      <h4>${city} ${budget.toLowerCase()} package</h4>
      <p>Recommended around ${selectedPlace.name}. Age band ${band}. Choose only the places you want, and the package page will adjust the price from those selections.</p>
      <div class="package-place-picker">
        <div class="picker-head">
          <strong>Choose Places For This Package</strong>
          <span>${selectedCount} selected</span>
        </div>
        <div class="package-place-options">
          ${packagePlaceOptions.map(name => `
            <label class="package-place-option ${selectedPackagePlaces.includes(name) ? 'checked' : ''}">
              <input type="checkbox" data-package-place="${name}" ${selectedPackagePlaces.includes(name) ? 'checked' : ''}>
              <span>${name}</span>
            </label>
          `).join('')}
        </div>
        <div class="package-place-note">${savingsText}. Current scope: ${scopeText}.</div>
      </div>
      <ul>
        <li>Arrival pickup concept from station / bus stop</li>
        <li>${days} day city exploration around ${selectedCount} selected place${selectedCount > 1 ? 's' : ''}</li>
        <li>${budget === 'Budget' ? 'Launch saver offer 5% off' : budget === 'Comfort' ? 'Combo offer 8% off' : 'Premium package benefit 12% off'} </li>
      </ul>`;
    packagePreview.querySelectorAll('[data-package-place]').forEach(input => {
      input.addEventListener('change', () => {
        const checked = [...packagePreview.querySelectorAll('[data-package-place]:checked')].map(el => el.dataset.packagePlace);
        if (!checked.length) {
          input.checked = true;
          return;
        }
        selectedPackagePlaces = checked;
        renderPackage();
      });
    });
    packageBtn.href = `/package.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(cityName)}&date=${encodeURIComponent(date)}&age=${encodeURIComponent(age)}&mode=${encodeURIComponent(mode)}&religion=${encodeURIComponent(religion)}&place=${encodeURIComponent(selectedPackagePlaces[0] || selectedPlace.name)}&places=${encodeURIComponent(selectedPackagePlaces.join('|'))}`;
  }

  function renderCultureGuide() {
    if (!cultureCard) return;
    const culture = window.EASYTRAVEL_CULTURE;
    const plan = culture ? culture.getPlan(cityName) : null;
    if (!plan) {
      cultureCard.innerHTML = '';
      return;
    }
    const hot = plan.foods[0];
    const legacy = plan.legacy;
    const products = plan.products;
    const foods = plan.foods.map(item => `
      <div class="culture-food-row">
        <div>
          <strong>${item.dish}</strong>
          <span>${item.caption}</span>
          <small>${item.restaurant} · ${item.area} · ${item.since}</small>
        </div>
        <a href="${item.mapUrl}" target="_blank" rel="noopener">Locate</a>
      </div>
    `).join('');
    const articles = plan.articles.map(item => `
      <a href="${item.mapUrl}" target="_blank" rel="noopener">
        <strong>${item.item}</strong>
        <span>${item.place} · ${item.note}</span>
      </a>
    `).join('');
    cultureCard.innerHTML = `
      <div class="culture-hot-caption">Hot local pick: ${hot.dish}</div>
      <h4>${plan.city} famous food and shopping</h4>
      <p>Review classic food, legacy restaurants and local product ideas before booking the package.</p>
      <div class="culture-legacy-box">
        <span>40-50+ years legacy style pick</span>
        <strong>${legacy.name}</strong>
        <small>${legacy.dish} · ${legacy.area} · ${legacy.age}</small>
        <p>${legacy.note}</p>
        <a href="${legacy.mapUrl}" target="_blank" rel="noopener">Locate legacy restaurant</a>
      </div>
      <div class="culture-food-list">${foods}</div>
      <div class="culture-product-grid">
        <a href="${products.edibleMapUrl}" target="_blank" rel="noopener">
          <span>Edible product</span>
          <strong>${products.edible}</strong>
          <small>${products.ediblePlace}</small>
        </a>
        <a href="${products.wearableMapUrl}" target="_blank" rel="noopener">
          <span>Cloth / article</span>
          <strong>${products.wearable}</strong>
          <small>${products.wearablePlace}</small>
        </a>
      </div>
      <div class="culture-article-grid">${articles}</div>
    `;
  }

  function renderLocalTransport() {
    if (!localTransportSummary || !localTransportModes || !localTransportBtn) return;
    const transport = window.EASYTRAVEL_TRANSPORT;
    const plan = transport ? transport.getPlan(cityName) : null;
    if (!plan) return;
    localTransportSummary.textContent = plan.summary;
    localTransportModes.innerHTML = '';
    plan.modes.slice(0, 4).forEach(modeItem => {
      const item = document.createElement('div');
      item.className = 'transport-mode-pill';
      item.innerHTML = `<strong>${modeItem.title}</strong><span>${modeItem.text}</span>`;
      localTransportModes.appendChild(item);
    });
    localTransportBtn.href = `/local-transport.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(cityName)}&date=${encodeURIComponent(date)}&age=${encodeURIComponent(age)}&mode=${encodeURIComponent(mode)}&place=${encodeURIComponent(selectedPlace.name)}`;
  }

  function osmEmbed(lat, lon) {
    const d = 0.03;
    const left = lon - d, right = lon + d, top = lat + d, bottom = lat - d;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lon}`;
  }

  function trainCard(item) {
    const div = document.createElement('div');
    div.className = 'ticket-card';
    div.innerHTML = `
      <div>
        <div class="train-label">Train suggestion</div>
        <h4>${item.name}</h4>
        <small>No. ${item.no}</small>
      </div>
      <div><h4>${item.dep} → ${item.arr}</h4><small>${item.duration}</small></div>
      <div><h4>${item.fare}</h4><small>Demo route availability</small></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="secondary-btn" style="height:56px;padding:0 18px;" onclick="window.open('https://www.irctc.co.in/nget/train-search','_blank')">Book on IRCTC</button>
        <button class="primary-btn" style="height:56px;padding:0 18px;" onclick="window.scrollTo({top: document.getElementById('placeExplorer').offsetTop - 80, behavior: 'smooth'})">Explore destination</button>
      </div>`;
    return div;
  }

  function busCard(item) {
    const div = document.createElement('div');
    div.className = 'ticket-card';
    div.innerHTML = `
      <div><div class="train-label">Bus suggestion</div><h4>${item.name}</h4><small>RedBus-style route card concept</small></div>
      <div><h4>${item.dep} → ${item.arr}</h4><small>${item.duration}</small></div>
      <div><h4>${item.price}</h4><small>Rating ${item.rating} · ${item.seats}</small></div>
      <div><button class="primary-btn" style="height:56px;padding:0 18px;" onclick="document.getElementById('bookNowTop').click()">Book via EasyTravel</button></div>`;
    return div;
  }

  function hotelCard(item) {
    const div = document.createElement('div');
    div.className = 'ticket-card';
    div.innerHTML = `
      <div><div class="train-label">Stay suggestion</div><h4>${item.name}</h4><small>${item.area}</small></div>
      <div><h4>${item.price}</h4><small>${item.vibe}</small></div>
      <div><h4>Rating ${item.rating}</h4><small>${item.distance}</small></div>
      <div><button class="primary-btn" style="height:56px;padding:0 18px;" onclick="document.getElementById('bookNowTop').click()">Book stay</button></div>`;
    return div;
  }
})();
