/* churchmann.org visitor tracking (first-party, no cookies, no IP stored).
 * Records: page views, clicks on Sign up / Sign in links, and the campaign tag (?ref=...) so you can tell which church visited.
 * Add to every page:  <script src="/assets/js/cm-track.js" defer></script>
 * The key below is the PUBLIC anon key (same as pricing-live.js).
 */
(function () {
  'use strict';
  var URL_ = 'https://huiglhqqqtcowsvurqxu.supabase.co';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aWdsaHFxcXRjb3dzdnVycXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NjI2ODMsImV4cCI6MjA4NTUzODY4M30.yBmoQu06kGS-oAx3H0JisI6vkjEeEJchHfQMA9ZahOY';
  var APP_HOST = 'web.churchmann.org';
  try { if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return; } catch (e) {}
  var ua = navigator.userAgent || '';
  if (/bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp|telegram/i.test(ua)) return;

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function rnd() {
    var a = new Uint8Array(12);
    try { (window.crypto || window.msCrypto).getRandomValues(a); } catch (e) { for (var i = 0; i < 12; i++) a[i] = Math.floor(Math.random() * 256); }
    return Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }

  var q = new URLSearchParams(location.search);
  var vid = get('cm_vid');
  if (!vid) { vid = 'v' + rnd(); set('cm_vid', vid); }
  var sid = null; try { sid = sessionStorage.getItem('cm_sid'); if (!sid) { sid = 's' + rnd(); sessionStorage.setItem('cm_sid', sid); } } catch (e) { sid = 's' + rnd(); }

  // campaign tag: ?ref=grace-1a2b (kept for 30 days in this browser)
  var ref = (q.get('ref') || q.get('c') || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  if (ref) { set('cm_ref', ref + '|' + Date.now()); }
  else {
    var saved = get('cm_ref');
    if (saved) { var p = saved.split('|'); if (p[1] && Date.now() - Number(p[1]) < 30 * 864e5) ref = p[0]; }
  }

  var w = window.innerWidth || screen.width || 0;
  var device = w < 700 ? 'mobile' : (w < 1100 ? 'tablet' : 'desktop');
  var browser = /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /SamsungBrowser/.test(ua) ? 'Samsung' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Other';
  var os = /Android/.test(ua) ? 'Android' : /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Windows/.test(ua) ? 'Windows' : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Other';

  function send(ev, extra) {
    var d = {
      vid: vid, sid: sid, ev: ev, site: 'marketing', ref: ref || '',
      path: location.pathname.replace(/index\.html$/, '') || '/', title: document.title,
      referrer: document.referrer && document.referrer.indexOf(location.host) === -1 ? document.referrer : '',
      utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '', utm_campaign: q.get('utm_campaign') || '',
      device: device, browser: browser, os: os, screen_w: w, lang: (navigator.language || '').slice(0, 12), ua: ua.slice(0, 200)
    };
    if (extra) for (var k in extra) d[k] = extra[k];
    try {
      fetch(URL_ + '/rest/v1/rpc/track_event', {
        method: 'POST', keepalive: true,
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_data: d })
      }).catch(function () {});
    } catch (e) {}
  }

  send('view');

  // carry the visitor id and campaign tag to the app, and note clicks on Sign up / Sign in
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var u; try { u = new URL(a.href, location.href); } catch (x) { return; }
    if (u.hostname !== APP_HOST) return;
    var isUp = /signup/i.test(u.pathname), isIn = /signin|login/i.test(u.pathname);
    send(isUp ? 'click_signup' : (isIn ? 'click_signin' : 'view'), { path: u.pathname });
    if (!u.searchParams.has('vid')) u.searchParams.set('vid', vid);
    if (ref && !u.searchParams.has('ref')) u.searchParams.set('ref', ref);
    a.href = u.toString();
  }, true);
})();
