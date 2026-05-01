
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
  const data = window.EASYTRAVEL_DATA || {};
  const stationList = document.getElementById('stationList');
  const destinationList = document.getElementById('destinationList');
  const searchStatus = document.getElementById('searchStatus');
  const form = document.getElementById('searchForm');
  const fromInput = document.getElementById('fromInput');
  const toInput = document.getElementById('toInput');
  const dateInput = document.getElementById('dateInput');
  const ageInput = document.getElementById('ageInput');
  const modeInput = document.getElementById('modeInput');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroSlides = document.getElementById('heroSlides');
  const landmarkRow = document.getElementById('landmarkRow');
  const heroDots = document.getElementById('heroDots');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');

  (data.stations || []).forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    stationList && stationList.appendChild(option);
  });
  Object.keys(data.destinations || {}).forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    destinationList && destinationList.appendChild(option);
  });

  let currentSlides = [];
  let slideIndex = 0;
  let timer = null;

  const NATIONAL_HERO = {
    title: 'Discover India before you arrive',
    subtitle: 'Search ke baad traveller age ke hisaab se places, videos, map, station pickup and stay ideas milenge.',
    landmarks: [
      { name: 'Delhi', wiki: 'https://en.wikipedia.org/wiki/Delhi' },
      { name: 'Mumbai', wiki: 'https://en.wikipedia.org/wiki/Mumbai' },
      { name: 'Goa', wiki: 'https://en.wikipedia.org/wiki/Goa' },
      { name: 'Kanyakumari', wiki: 'https://en.wikipedia.org/wiki/Kanyakumari' },
      { name: 'Dwarka', wiki: 'https://en.wikipedia.org/wiki/Dwarka' },
      { name: 'Haridwar', wiki: 'https://en.wikipedia.org/wiki/Haridwar' },
      { name: 'Assam', wiki: 'https://en.wikipedia.org/wiki/Assam' },
      { name: 'Meghalaya', wiki: 'https://en.wikipedia.org/wiki/Meghalaya' }
    ],
    slides: [
      '/assets/hero-show-1.png',
      '/assets/hero-show-2.png',
      '/assets/hero-show-3.png',
      '/assets/hero-show-4.png',
      '/assets/hero-show-5.png',
      '/assets/hero-show-6.png',
      '/assets/hero-show-7.png',
      '/assets/hero-show-8.png',
      '/assets/hero-show-9.png'
    ]
  };

  function cityKeyFromValue(v) {
    return data.cityKeyFromValue ? data.cityKeyFromValue(v) : (v || 'Delhi').toLowerCase().trim();
  }

  function updateActiveSlide() {
    const slides = heroSlides ? heroSlides.querySelectorAll('.hero-slide') : [];
    const dots = heroDots ? heroDots.querySelectorAll('.hero-dot') : [];
    slides.forEach((s, i) => s.classList.toggle('active', i === slideIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === slideIndex));
  }

  function renderHero() {
    const cityKey = cityKeyFromValue(toInput ? toInput.value : 'Delhi');
    const cityHero = (data.heroCities && data.heroCities[cityKey]) ? data.heroCities[cityKey] : null;
    const heroData = (!toInput || !toInput.value.trim() || toInput.value.trim().toLowerCase() === 'delhi')
      ? NATIONAL_HERO
      : (cityHero || NATIONAL_HERO);

    heroTitle && (heroTitle.textContent = heroData.title || NATIONAL_HERO.title);
    heroSubtitle && (heroSubtitle.textContent = heroData.subtitle || NATIONAL_HERO.subtitle);

    if (landmarkRow) {
      landmarkRow.innerHTML = '';
      (heroData.landmarks || NATIONAL_HERO.landmarks).forEach(item => {
        const a = document.createElement('a');
        a.className = 'landmark-chip';
        a.href = item.wiki;
        a.target = '_blank';
        a.textContent = item.name;
        landmarkRow.appendChild(a);
      });
    }

    if (!heroSlides) return;
    heroSlides.innerHTML = '';
    if (heroDots) heroDots.innerHTML = '';
    currentSlides = (heroData.slides && heroData.slides.length) ? heroData.slides : NATIONAL_HERO.slides;
    slideIndex = 0;

    currentSlides.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
      slide.style.backgroundImage = `url(${src})`;
      heroSlides.appendChild(slide);
      if (heroDots) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
          slideIndex = i;
          updateActiveSlide();
        });
        heroDots.appendChild(dot);
      }
    });

    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (!currentSlides.length) return;
      slideIndex = (slideIndex + 1) % currentSlides.length;
      updateActiveSlide();
    }, 2500);
    updateActiveSlide();
  }

  function renderSearchStatus() {
    if (!searchStatus) return;
    const fromValue = (fromInput && fromInput.value.trim()) || 'Source';
    const toValue = (toInput && toInput.value.trim()) || 'Destination';
    const ageValue = (ageInput && ageInput.value) || '28';
    const modeValue = (modeInput && modeInput.value) || 'train';
    searchStatus.innerHTML = `<strong>Live search preview:</strong> ${fromValue} → ${toValue} | ${modeValue.toUpperCase()} | age ${ageValue}. Search karte hi next page par route cards aur destination suggestions open honge.`;
  }

  renderHero();
  renderSearchStatus();

  toInput && toInput.addEventListener('input', () => {
    renderHero();
    renderSearchStatus();
  });
  fromInput && fromInput.addEventListener('input', renderSearchStatus);
  ageInput && ageInput.addEventListener('input', renderSearchStatus);
  modeInput && modeInput.addEventListener('change', renderSearchStatus);
  dateInput && dateInput.addEventListener('change', renderSearchStatus);

  heroPrev && heroPrev.addEventListener('click', () => {
    if (!currentSlides.length) return;
    slideIndex = (slideIndex - 1 + currentSlides.length) % currentSlides.length;
    updateActiveSlide();
  });
  heroNext && heroNext.addEventListener('click', () => {
    if (!currentSlides.length) return;
    slideIndex = (slideIndex + 1) % currentSlides.length;
    updateActiveSlide();
  });

  form && form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fromValue = (fromInput && fromInput.value.trim()) || '';
    const toValue = (toInput && toInput.value.trim()) || '';
    const dateValue = (dateInput && dateInput.value) || '';
    const ageValue = (ageInput && ageInput.value) || '';
    const modeValue = (modeInput && modeInput.value) || 'train';
    const submitBtn = this.querySelector('.primary-btn');

    if (!fromValue || !toValue || !dateValue || !ageValue) {
      renderSearchStatus();
      searchStatus && (searchStatus.innerHTML = '<strong>Required:</strong> source, destination, date aur age fill karo.');
      return;
    }
    submitBtn && (submitBtn.textContent = 'Opening results...');
    submitBtn && (submitBtn.disabled = true);

    const params = new URLSearchParams({
      from: fromValue,
      to: toValue,
      date: dateValue,
      age: ageValue,
      mode: modeValue
    });

    setTimeout(() => {
      window.location.href = '/results.html?' + params.toString();
    }, 200);
  });

  function renderLiveFooter() {
    const ticker = document.getElementById('footerTicker');
    const popularList = document.getElementById('popularDestinationsList');
    const footerPosts = document.getElementById('footerPosts');
    if (!ticker || !popularList || !footerPosts) return;
    const fallback = ['Varanasi','Goa','Dwarka','Haridwar','Kanyakumari','Guwahati','Shillong','Delhi','Mumbai','Udaipur','Jaisalmer','Leh Ladakh'];
    popularList.innerHTML = '';
    fallback.forEach(name => {
      const a = document.createElement('a');
      a.href = `/results.html?mode=train&from=Patna%20Junction%20(PNBE)&to=${encodeURIComponent(name)}&date=2026-04-04&age=28`;
      a.textContent = name;
      popularList.appendChild(a);
    });
    const newsText = fallback.map(t => `<span>${t} packages</span>`).join('');
    ticker && (ticker.innerHTML = `<div class="ticker-track">${newsText}${newsText}</div>`);
    footerPosts.innerHTML = '';
    fallback.slice(0,5).forEach((name, idx) => {
      const article = document.createElement('a');
      article.className = 'footer-post';
      article.href = `/results.html?mode=train&from=Patna%20Junction%20(PNBE)&to=${encodeURIComponent(name)}&date=2026-04-04&age=28`;
      article.innerHTML = `<div class="footer-post-thumb">${name.charAt(0)}</div><div><h5>${name} trip ideas</h5><p>Update ${idx+1}</p></div>`;
      footerPosts.appendChild(article);
    });
  }
  renderLiveFooter();
})();
