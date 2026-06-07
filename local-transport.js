(function () {
  const token = localStorage.getItem('easytravel_token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const from = params.get('from') || '';
  const to = params.get('to') || 'Delhi';
  const date = params.get('date') || '';
  const age = params.get('age') || '';
  const mode = params.get('mode') || '';
  const place = params.get('place') || '';
  const transport = window.EASYTRAVEL_TRANSPORT;

  const titleEl = document.getElementById('transportTitle');
  const summaryEl = document.getElementById('transportSummary');
  const citySelect = document.getElementById('transportCity');
  const stepsEl = document.getElementById('transportSteps');
  const linksEl = document.getElementById('transportLinks');
  const backToResults = document.getElementById('backToResults');

  const cityNames = transport.cityNames || [];
  cityNames.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  const initialPlan = transport.getPlan(to);
  const initialCity = initialPlan.headline.replace(' local transport support', '');
  if (!cityNames.includes(initialCity)) {
    const option = document.createElement('option');
    option.value = initialCity;
    option.textContent = initialCity;
    citySelect.appendChild(option);
  }
  citySelect.value = initialCity;
  backToResults.href = `/results.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&age=${encodeURIComponent(age)}&mode=${encodeURIComponent(mode)}`;

  citySelect.addEventListener('change', () => {
    const nextCity = citySelect.value;
    render(nextCity);
    const nextParams = new URLSearchParams(window.location.search);
    nextParams.set('to', nextCity);
    history.replaceState(null, '', `/local-transport.html?${nextParams.toString()}`);
  });

  render(initialCity);

  function render(city) {
    const plan = transport.getPlan(city);
    titleEl.textContent = plan.headline;
    summaryEl.textContent = plan.summary;

    stepsEl.innerHTML = '';
    plan.modes.forEach((modeItem, index) => {
      const card = document.createElement('div');
      card.className = 'transport-step';
      card.innerHTML = `
        <span>${index + 1}</span>
        <div>
          <h4>${modeItem.title}</h4>
          <p>${modeItem.text}</p>
        </div>`;
      stepsEl.appendChild(card);
    });

    linksEl.innerHTML = '';
    [
      ['Cab booking', plan.links.cab],
      ['Metro / local transit', plan.links.metro],
      ['Local / state bus', plan.links.bus],
      ['Route help', plan.links.help]
    ].forEach(([title, links]) => {
      const group = document.createElement('div');
      group.className = 'transport-link-group';
      group.innerHTML = `<h4>${title}</h4>`;
      (links || []).forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = link.label;
        group.appendChild(a);
      });
      linksEl.appendChild(group);
    });
  }
})();
