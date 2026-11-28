/* Live pricing for churchmann.org
 * Reads the plans you manage in Admin -> Plans (public function get_public_plans) and draws the pricing cards.
 * If the request fails the static cards already on the page stay visible, so the page never breaks.
 * The anon key below is the PUBLIC key (the same one inside the web app) - it is safe in the browser.
 */
(function () {
  'use strict';
  var SUPABASE_URL = 'https://huiglhqqqtcowsvurqxu.supabase.co';
  var ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aWdsaHFxcXRjb3dzdnVycXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NjI2ODMsImV4cCI6MjA4NTUzODY4M30.yBmoQu06kGS-oAx3H0JisI6vkjEeEJchHfQMA9ZahOY';
  var SIGNUP = 'https://web.churchmann.org/auth/signup';
  var CONTACT = '';   // e.g. 'https://wa.me/233XXXXXXXXX' or 'mailto:hello@churchmann.org' - used by the Enterprise "Talk to us" button
  var CACHE_KEY = 'cm_public_plans_v1', CACHE_MS = 5 * 60 * 1000;


  // Self-contained styles: the homepage does not load seo-pages.css, so the cards carry their own CSS.
  (function injectCss() {
    if (document.getElementById('lp-css')) return;
    var st = document.createElement('style'); st.id = 'lp-css';
    st.textContent = [
      '.lp-wrap{margin-top:8px;font-family:inherit;text-align:center}',
      '.lp-toggle{display:inline-flex;background:#f3f4f8;border:1px solid #e3e5ee;border-radius:999px;padding:4px;margin:0 0 26px}',
      '.lp-toggle button{border:0;background:transparent;padding:9px 22px;border-radius:999px;font:600 14px/1 inherit;font-family:inherit;cursor:pointer;color:#5b6070}',
      '.lp-toggle button.on{background:#0e0b26;color:#fff}',
      '.lp-grid{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));align-items:stretch;text-align:left}',
      '.lp-card{position:relative;border:1px solid #e3e5ee;border-radius:18px;padding:26px 24px;background:#fff;color:#0e0b26;display:flex;flex-direction:column;box-shadow:0 6px 24px rgba(14,11,38,.06)}',
      '.lp-card.lp-pop{background:#0e0b26;color:#fff;border-color:#0e0b26;box-shadow:0 12px 34px rgba(14,11,38,.28)}',
      '.lp-badge{position:absolute;top:-12px;right:18px;background:#FF455B;color:#fff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px}',
      '.lp-name{margin:0;font-size:20px;font-weight:700;color:inherit}',
      '.lp-price{margin:12px 0 4px;color:inherit}.lp-amt{font-size:36px;font-weight:800;letter-spacing:-.02em}.lp-per{color:#6b7080;font-size:15px}',
      '.lp-pop .lp-per,.lp-pop .lp-sub{color:#c9cbe0}',
      '.lp-sub{margin:0 0 18px;color:#6b7080;font-size:14px;line-height:1.45}',
      '.lp-cta{display:block;text-align:center;text-decoration:none;font-weight:600;padding:12px;border-radius:999px;background:#0e0b26;color:#fff;margin-bottom:20px}',
      '.lp-pop .lp-cta{background:#FF455B}',
      '.lp-list{list-style:none;margin:0;padding:0;display:grid;gap:10px;font-size:14px;line-height:1.4;color:inherit}',
      '.lp-list li{padding-left:26px;position:relative}',
      ".lp-list li:before{content:'';position:absolute;left:0;top:2px;width:16px;height:16px;border-radius:50%;background:#5B2BB5 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12l5 5 9-10'/%3E%3C/svg%3E\") center/10px no-repeat}",
      '.lp-note{font-size:13px;color:#6b7080;margin-top:14px}'
    ].join('\n');
    document.head.appendChild(st);
  })();

  var hosts = document.querySelectorAll('[data-live-plans]');
  if (!hosts.length) return;

  function money(plan, yearly) {
    var usd = yearly ? plan.price_yearly_usd : plan.price_monthly_usd;
    var local = yearly ? plan.price_yearly : plan.price_monthly;
    if (usd !== null && usd !== undefined && Number(usd) > 0) return '$' + trim(usd);
    if (Number(local) > 0) return (plan.currency === 'GHS' ? 'GH\u20B5' : (plan.currency + ' ')) + trim(local);
    return null;
  }
  function trim(n) { n = Number(n); return (Math.round(n * 100) / 100).toString(); }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;   // textContent: admin text can never inject HTML
    return e;
  }

  function card(plan, yearly) {
    var c = el('div', 'lp-card' + (plan.is_popular ? ' lp-pop' : ''));
    if (plan.is_popular) c.appendChild(el('div', 'lp-badge', 'Most popular'));
    c.appendChild(el('h3', 'lp-name', plan.name));

    var price = money(plan, yearly && (plan.price_yearly > 0 || plan.price_yearly_usd > 0));
    var pbox = el('div', 'lp-price');
    var custom = plan.id === 'enterprise';
    if (custom) { pbox.appendChild(el('span', 'lp-amt', 'Custom')); pbox.appendChild(el('span', 'lp-per', ' / annual contract')); }
    else if (!price) { pbox.appendChild(el('span', 'lp-amt', '$0')); pbox.appendChild(el('span', 'lp-per', ' / month')); }
    else {
      var showYear = yearly && (Number(plan.price_yearly) > 0 || Number(plan.price_yearly_usd) > 0);
      pbox.appendChild(el('span', 'lp-amt', price));
      pbox.appendChild(el('span', 'lp-per', showYear ? ' / year' : ' / month'));
    }
    c.appendChild(pbox);

    var sub = plan.tagline || (plan.max_members ? 'Up to ' + plan.max_members + ' members' : 'Unlimited members');
    c.appendChild(el('p', 'lp-sub', sub));

    var a = el('a', 'lp-cta', custom ? 'Talk to us' : (price ? 'Get started' : 'Start free'));
    a.href = custom && CONTACT ? CONTACT : SIGNUP;
    c.appendChild(a);

    var ul = el('ul', 'lp-list');
    (plan.features || []).forEach(function (f) { ul.appendChild(el('li', null, f)); });
    c.appendChild(ul);
    return c;
  }

  function render(plans) {
    var anyYearly = plans.some(function (p) { return Number(p.price_yearly) > 0 || Number(p.price_yearly_usd) > 0; });
    hosts.forEach(function (host) {
      var yearly = false;
      host.textContent = '';
      var wrap = el('div', 'lp-wrap');
      var toggle = el('div', 'lp-toggle');
      var bm = el('button', 'on', 'Monthly'), by = el('button', null, 'Yearly');
      bm.type = by.type = 'button';
      toggle.appendChild(bm); toggle.appendChild(by);
      if (anyYearly) wrap.appendChild(toggle);
      var grid = el('div', 'lp-grid');
      wrap.appendChild(grid);
      host.appendChild(wrap);

      function draw() {
        grid.textContent = '';
        plans.forEach(function (p) { grid.appendChild(card(p, yearly)); });
        bm.className = yearly ? '' : 'on'; by.className = yearly ? 'on' : '';
      }
      bm.addEventListener('click', function () { yearly = false; draw(); });
      by.addEventListener('click', function () { yearly = true; draw(); });
      draw();
    });
    document.querySelectorAll('[data-static-plans]').forEach(function (n) { n.style.display = 'none'; });  // live cards replace the static fallback
    updateJsonLd(plans);
  }

  // keep the structured data (Google rich results) in step with the live prices
  function updateJsonLd(plans) {
    try {
      var s = document.querySelector('script[type="application/ld+json"][data-offers]') ||
              document.querySelector('script[type="application/ld+json"]');
      if (!s) return;
      var json = JSON.parse(s.textContent);
      var list = json['@graph'] || [json];
      list.forEach(function (n) {
        if (n['@type'] !== 'SoftwareApplication') return;
        n.offers = plans.map(function (p) {
          var usd = p.price_monthly_usd, useUsd = usd !== null && usd !== undefined && Number(usd) > 0;
          return {
            '@type': 'Offer', name: p.name + ' Plan',
            price: String(useUsd ? trim(usd) : (Number(p.price_monthly) > 0 ? trim(p.price_monthly) : 0)),
            priceCurrency: useUsd ? 'USD' : (Number(p.price_monthly) > 0 ? p.currency : 'USD'),
            description: p.tagline || (p.max_members ? 'Up to ' + p.max_members + ' members' : 'Unlimited members')
          };
        });
      });
      s.textContent = JSON.stringify(json);
    } catch (e) { /* static data stays */ }
  }

  function load() {
    try {
      var c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (c && Date.now() - c.t < CACHE_MS && Array.isArray(c.plans) && c.plans.length) { render(c.plans); return; }
    } catch (e) {}
    fetch(SUPABASE_URL + '/rest/v1/rpc/get_public_plans', {
      method: 'POST',
      headers: { apikey: ANON_KEY, Authorization: 'Bearer ' + ANON_KEY, 'Content-Type': 'application/json' },
      body: '{}'
    }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (plans) {
        if (!Array.isArray(plans) || !plans.length) return;
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), plans: plans })); } catch (e) {}
        render(plans);
      })
      .catch(function () { /* keep the static cards */ });
  }
  load();
})();
