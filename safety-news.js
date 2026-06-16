(function () {
  const PIB_RSS = 'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1';
  const OFFICIAL_LINKS = [
    {
      title: 'NDMA Sachet live disaster alerts',
      source: 'National Disaster Management Authority',
      url: 'https://sachet.ndma.gov.in/',
      tag: 'Live alerts',
      summary: 'Official India disaster alert portal for flood, cyclone, landslide, rain and other emergency warnings.'
    },
    {
      title: 'MHA Disaster Management updates',
      source: 'Ministry of Home Affairs',
      url: 'https://ndmindia.mha.gov.in/',
      tag: 'Government portal',
      summary: 'Central disaster management information for travellers planning weather-sensitive routes.'
    },
    {
      title: 'PIB Press Releases RSS',
      source: 'Press Information Bureau',
      url: PIB_RSS,
      tag: 'Daily RSS',
      summary: 'Government press releases for national advisories, public alerts and important travel-related updates.'
    }
  ];
  const KEYWORDS = /flood|rain|cyclone|landslide|disaster|weather|alert|warning|pilgrimage|tourism|rail|road|airport|rescue|earthquake|heatwave|cold wave|avalanche|pilgrim/i;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function readText(node, selector) {
    const item = node.querySelector(selector);
    return item ? item.textContent.trim() : '';
  }

  function officialCard(item) {
    return `
      <article class="advisory-item">
        <span class="advisory-badge">${escapeHtml(item.tag || item.source || 'Official')}</span>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.summary)}</p>
        <a href="${item.url}" target="_blank" rel="noopener">Open official update</a>
      </article>
    `;
  }

  function render(items, note) {
    const grid = document.getElementById('advisoryGrid');
    const status = document.getElementById('advisoryStatus');
    const footerPosts = document.getElementById('footerPosts');
    const footerTicker = document.getElementById('footerTicker');
    if (status) status.textContent = note;
    if (grid) grid.innerHTML = items.map(officialCard).join('');

    if (footerPosts) {
      footerPosts.innerHTML = '';
      items.slice(0, 5).forEach((item, index) => {
        const article = document.createElement('a');
        article.className = 'footer-post';
        article.href = item.url;
        article.target = '_blank';
        article.rel = 'noopener';
        article.innerHTML = `<div class="footer-post-thumb">${index + 1}</div><div><h5>${escapeHtml(item.title)}</h5><p>${escapeHtml(item.source || item.tag || 'Official update')}</p></div>`;
        footerPosts.appendChild(article);
      });
    }

    if (footerTicker) {
      const labels = items.map(item => `<span>${escapeHtml(item.title)}</span>`).join('');
      footerTicker.innerHTML = `<div class="ticker-track">${labels}${labels}</div>`;
    }
  }

  async function fetchPibItems() {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(PIB_RSS)}`;
    const response = await fetch(proxyUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('PIB RSS not reachable');
    const xml = await response.text();
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    return Array.from(doc.querySelectorAll('item')).map(item => {
      const title = readText(item, 'title');
      const summary = readText(item, 'description').replace(/\s+/g, ' ').slice(0, 180);
      return {
        title,
        source: 'Press Information Bureau',
        url: readText(item, 'link') || PIB_RSS,
        tag: 'PIB daily',
        summary: summary || 'Latest Government of India press release for traveller awareness.'
      };
    }).filter(item => item.title);
  }

  async function initSafetyNews() {
    const grid = document.getElementById('advisoryGrid');
    const status = document.getElementById('advisoryStatus');
    if (!grid && !status && !document.getElementById('footerPosts')) return;

    try {
      const pibItems = await fetchPibItems();
      const filtered = pibItems.filter(item => KEYWORDS.test(`${item.title} ${item.summary}`));
      const liveItems = [...filtered.slice(0, 4), ...OFFICIAL_LINKS].slice(0, 6);
      render(liveItems, 'Official government updates refresh from PIB RSS, with NDMA and MHA links for live disaster alerts.');
    } catch (error) {
      render(OFFICIAL_LINKS, 'Live RSS fetch is temporarily unavailable, so official government alert links are shown.');
    }
  }

  document.addEventListener('DOMContentLoaded', initSafetyNews);
})();
