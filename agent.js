/* ============================================================
   EasyTravel Pro — AI Trip Planner Agent
   agent.js  |  Groq (Llama 3.3 70B) — API key built-in
   ============================================================ */

(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────── */
  const GROQ_API   = 'https://api.groq.com/openai/v1/chat/completions';
  const GROQ_KEY   = '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';
  const MODEL      = 'llama-3.3-70b-versatile';
  const MAX_TOKENS = 600;

  /* ── System prompt ───────────────────────────────────────── */
  const SYSTEM_PROMPT = `You are EasyBot, the friendly AI Trip Planner for EasyTravel Pro India — a smart travel website that helps Indians plan state-to-state trips.

Your job is to help users plan trips inside India. You know about:
- Indian trains, IRCTC booking (redirect final booking to IRCTC website)
- Popular destinations: Delhi, Mumbai, Goa, Varanasi, Haridwar, Rishikesh, Kanyakumari, Dwarka, Jaisalmer, Ranchi, Kolkata, Kochi, Ladakh, Assam, Meghalaya, Rameshwaram
- Age-aware suggestions: children enjoy adventure, young people enjoy nightlife/trekking, families want comfort, seniors prefer spiritual calm
- Local transport, hotel clusters, arrival planning after train/bus

RESPONSE RULES:
- Be warm, concise, helpful — like a knowledgeable travel friend
- Always give 2-3 specific suggestions when asked about destinations
- Mention age-relevant tips when age is shared
- For train bookings always say: "Search trains here on EasyTravel, final booking opens on IRCTC official site"
- Keep replies under 120 words unless user asks for a detailed plan
- Use simple English — your users may speak Hindi too
- Never make up train schedules or prices — say "please check current schedules on IRCTC"
- If unsure, suggest the user explore more on the EasyTravel results page`;

  /* ── State ───────────────────────────────────────────────── */
  const history = [];
  let isOpen    = false;
  let isTyping  = false;

  /* ── DOM refs ────────────────────────────────────────────── */
  let win, btn, closeBtn, form, input, messages, badge;

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    injectHTML();
    cacheDOM();
    bindEvents();
    setTimeout(function () {
      addMessage('agent',
        '👋 Namaste! I\'m EasyBot, your AI trip planner.\n\nTell me where you want to go, your age, or what kind of trip you have in mind — I\'ll suggest the best places for you!'
      );
    }, 400);
  }

  /* ── HTML injection ──────────────────────────────────────── */
  function injectHTML() {
    var div = document.createElement('div');
    div.innerHTML = [
      '<button id="et-agent-btn" aria-label="Open AI Trip Planner">',
      '  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
      '  <span id="et-agent-badge">AI</span>',
      '</button>',
      '<div id="et-agent-window" role="dialog" aria-label="AI Trip Planner">',
      '  <div id="et-agent-header">',
      '    <div class="et-agent-avatar">&#x2708;&#xFE0F;</div>',
      '    <div class="et-agent-info">',
      '      <h4>EasyBot &mdash; Trip Planner</h4>',
      '      <p>Powered by Llama 3 &middot; Groq</p>',
      '    </div>',
      '    <div class="et-agent-status"></div>',
      '    <button id="et-agent-close" aria-label="Close">&#x2715;</button>',
      '  </div>',
      '  <div id="et-quick-chips">',
      '    <button class="et-chip" data-q="Best places to visit in Goa">&#x1F3D6;&#xFE0F; Goa</button>',
      '    <button class="et-chip" data-q="I am 25 years old, suggest a hill station trip">&#x1F3D4;&#xFE0F; Hill station</button>',
      '    <button class="et-chip" data-q="Family trip to Varanasi tips">&#x1F64F; Varanasi</button>',
      '    <button class="et-chip" data-q="Budget Ladakh trip guide">&#x26FA; Ladakh</button>',
      '    <button class="et-chip" data-q="How to book train on EasyTravel?">&#x1F686; Train tips</button>',
      '  </div>',
      '  <div id="et-agent-messages" aria-live="polite"></div>',
      '  <form id="et-agent-form" autocomplete="off">',
      '    <input id="et-agent-input" type="text" placeholder="Ask about any destination..." maxlength="300" />',
      '    <button id="et-agent-send" type="submit" aria-label="Send">',
      '      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
      '    </button>',
      '  </form>',
      '  <div id="et-agent-footer">Powered by Groq &middot; Llama 3 &middot; EasyTravel Pro</div>',
      '</div>'
    ].join('\n');
    document.body.appendChild(div);
  }

  function cacheDOM() {
    win      = document.getElementById('et-agent-window');
    btn      = document.getElementById('et-agent-btn');
    closeBtn = document.getElementById('et-agent-close');
    form     = document.getElementById('et-agent-form');
    input    = document.getElementById('et-agent-input');
    messages = document.getElementById('et-agent-messages');
    badge    = document.getElementById('et-agent-badge');
  }

  /* ── Events ──────────────────────────────────────────────── */
  function bindEvents() {
    btn.addEventListener('click', toggle);
    closeBtn.addEventListener('click', closeFn);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text || isTyping) return;
      input.value = '';
      sendMessage(text);
    });

    document.querySelectorAll('.et-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (isTyping) return;
        sendMessage(chip.getAttribute('data-q'));
      });
    });

    document.addEventListener('click', function (e) {
      if (isOpen && !win.contains(e.target) && e.target !== btn) {
        closeFn();
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });
  }

  /* ── Open / Close ────────────────────────────────────────── */
  function toggle() { isOpen ? closeFn() : openFn(); }

  function openFn() {
    isOpen = true;
    win.classList.add('open');
    badge.style.display = 'none';
    setTimeout(function () { input.focus(); }, 250);
  }

  function closeFn() {
    isOpen = false;
    win.classList.remove('open');
  }

  /* ── Messages ────────────────────────────────────────────── */
  function addMessage(role, text) {
    var wrap = document.createElement('div');
    wrap.className = 'et-msg ' + role;

    var av = document.createElement('div');
    av.className = 'et-msg-avatar';
    av.textContent = role === 'agent' ? '\u2708\uFE0F' : '\uD83D\uDC64';

    var bubble = document.createElement('div');
    bubble.className = 'et-bubble';
    bubble.innerHTML = fmt(text);

    wrap.appendChild(av);
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function fmt(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  /* ── Typing dots ─────────────────────────────────────────── */
  function showTyping() {
    var wrap = document.createElement('div');
    wrap.className = 'et-msg agent';
    wrap.id = 'et-typing';
    wrap.innerHTML = '<div class="et-msg-avatar">\u2708\uFE0F</div><div class="et-bubble"><div class="et-typing-dots"><span></span><span></span><span></span></div></div>';
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('et-typing');
    if (el) el.remove();
  }

  /* ── Groq API call ───────────────────────────────────────── */
  function sendMessage(userText) {
    addMessage('user', userText);
    history.push({ role: 'user', content: userText });
    isTyping = true;
    showTyping();

    var msgs = [{ role: 'system', content: SYSTEM_PROMPT }]
      .concat(history.slice(-10));

    fetch(GROQ_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_KEY
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
        messages: msgs
      })
    })
    .then(function (res) {
      if (!res.ok) {
        return res.json().then(function (err) {
          throw new Error((err.error && err.error.message) || 'Groq error ' + res.status);
        });
      }
      return res.json();
    })
    .then(function (data) {
      hideTyping();
      isTyping = false;
      var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content)
        || 'Sorry, I could not get a response. Please try again.';
      history.push({ role: 'assistant', content: reply });
      addMessage('agent', reply);
    })
    .catch(function (err) {
      hideTyping();
      isTyping = false;
      console.error('[EasyBot]', err);
      addMessage('agent', '\uD83D\uDE14 Something went wrong: ' + err.message + '\n\nPlease try again in a moment.');
    });
  }

  /* ── Start ───────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
