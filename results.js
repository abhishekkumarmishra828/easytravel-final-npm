
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

  const cityKey = data.cityKeyFromValue(to);
  const cityName = cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
  const cityData = data.destinations[cityName] || data.destinations.Delhi;
  const selectedAgeBand = data.ageBand(age);
  const recommendedNames = cityData.ageBands[selectedAgeBand] || cityData.ageBands['20-29'] || [];
  const allPlaceNames = Object.keys(cityData.places || {});
  const visiblePlaceNames = [...new Set([...recommendedNames, ...allPlaceNames])];
  let selectedPlace = cityData.places[recommendedNames[0]] || cityData.places[cityData.defaultPlace] || cityData.places[visiblePlaceNames[0]];

  resultTitle.textContent = `${age} years traveller ke liye ${cityName} me recommended famous places`;
  if (resultSubtitle) resultSubtitle.textContent = `${cityName} ke liye age-based famous places, route planning, map access, video links aur stay ideas ek saath dikh rahe hain.`;
  routeBadges.innerHTML = '';
  [from, to, `Date: ${date}`, `Mode: ${mode}`].forEach(text => {
    const span = document.createElement('span');
    span.textContent = text;
    routeBadges.appendChild(span);
  });

  ticketHeading.textContent = mode === 'train' ? 'Suggested train routes' : mode === 'bus' ? 'Suggested bus routes' : 'Suggested hotel + stay options';
  routeInsight.textContent = `Route insight: ${from} → ${to}. Traveller age ${age}. Mode: ${mode} booking flow. Arrival ke baad yahi platform business stay, station pickup cab concept, aur city ke nightlife / food / calm options bhi suggest karega.`;
  recHeading.textContent = `${cityName} recommendations by age`;
  if (miniStatPlaces) miniStatPlaces.textContent = `${recommendedNames.length || visiblePlaceNames.length} places`;
  if (miniStatMood) miniStatMood.textContent = age < 22 ? 'Budget' : age < 35 ? 'Comfort' : 'Premium';
  if (miniStatFlow) miniStatFlow.textContent = `${mode.charAt(0).toUpperCase()+mode.slice(1)} + city`;
  recNote.textContent = `Age-based smart picks pehle dikh rahe hain, aur ${cityName} ke aur famous places bhi neeche chips me diye gaye hain. Kisi bhi place par click karke map, video aur details dekhe ja sakte hain.`;

  renderTickets();
  renderRecommendationChips();
  renderPlace(selectedPlace);
  renderPackage();

  bookNowTop.addEventListener('click', async () => {
    if (mode === 'train') {
      const source = encodeURIComponent(from);
      const dest = encodeURIComponent(to);
      window.open(`https://www.irctc.co.in/nget/train-search`, '_blank');
      alert(`Train final booking ke liye official IRCTC page khola gaya. EasyTravel ka role planning, route discovery, age-based place explorer, station pickup and city intelligence provide karna hai.`);
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
  img.onerror = () => { img.src = '/assets/hero-show-1.png'; };
  img.src = resolvedImage;
  if (resultHeroImage) {
    resultHeroImage.onerror = () => { resultHeroImage.src = '/assets/hero-show-1.png'; };
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
          <p>${video.desc || (place.name + ' ka travel preview aur arrival feel.')}</p>
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
    packagePreview.innerHTML = `
      <div class="package-badge">${days}-day smart package</div>
      <h4>${city} ${budget.toLowerCase()} package</h4>
      <p>Recommended around ${selectedPlace.name}. Age band ${band}. Includes stay suggestions, local transfer idea, and sightseeing flow.</p>
      <ul>
        <li>Arrival pickup concept from station / bus stop</li>
        <li>${days} day city exploration around ${selectedPlace.name}</li>
        <li>${budget === 'Budget' ? 'Launch saver offer 5% off' : budget === 'Comfort' ? 'Combo offer 8% off' : 'Premium package benefit 12% off'} </li>
      </ul>`;
    packageBtn.href = `/package.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(cityName)}&date=${encodeURIComponent(date)}&age=${encodeURIComponent(age)}&mode=${encodeURIComponent(mode)}&place=${encodeURIComponent(selectedPlace.name)}`;
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
