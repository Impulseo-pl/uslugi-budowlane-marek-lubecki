/* Usługi Budowlane Marek Lubecki - menu, suwak usług, filtr realizacji, kroki, pojawianie się sekcji */
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');

  /* menu w pigułce */
  var pill = d.querySelector('.menu-pill'), ov = d.getElementById('menu');
  function menu(open) {
    d.body.classList.toggle('menu-open', open);
    if (pill) { pill.setAttribute('aria-expanded', open ? 'true' : 'false'); pill.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu'); }
    if (ov) ov.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  if (pill) pill.addEventListener('click', function () { menu(!d.body.classList.contains('menu-open')); });
  if (ov) ov.addEventListener('click', function (e) { if (e.target.closest('a')) menu(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu(false); });

  /* suwak usług: strzałki + pasek postępu */
  d.querySelectorAll('[data-slider]').forEach(function (s) {
    var tr = s.querySelector('.slider-track'), bar = s.querySelector('.slider-bar span');
    function step() { var c = tr.querySelector('.srv'); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(tr).columnGap || 40) : 300; }
    function upd() {
      var max = tr.scrollWidth - tr.clientWidth, vis = tr.clientWidth / tr.scrollWidth;
      if (!bar) return;
      bar.style.width = Math.max(vis * 100, 12) + '%';
      var p = max > 0 ? tr.scrollLeft / max : 0;
      bar.style.transform = 'translateX(' + (p * (100 / Math.max(vis, .12) - 100)) + '%)';
    }
    s.querySelector('[data-next]').addEventListener('click', function () { tr.scrollBy({ left: step(), behavior: 'smooth' }); });
    s.querySelector('[data-prev]').addEventListener('click', function () { tr.scrollBy({ left: -step(), behavior: 'smooth' }); });
    tr.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  });

  /* filtr realizacji */
  var fb = d.querySelectorAll('.re-filtr button');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      fb.forEach(function (x) { x.classList.toggle('on', x === b); });
      var f = b.getAttribute('data-f');
      d.querySelectorAll('.re-item').forEach(function (it) { it.classList.toggle('hide', f !== 'all' && it.getAttribute('data-cat') !== f); });
    });
  });

  /* kroki pracy (O firmie): rozwijanie kolumn */
  var kroki = d.querySelectorAll('.krok');
  function pokaz(k) { kroki.forEach(function (x) { x.classList.toggle('on', x === k); }); }
  kroki.forEach(function (k) {
    k.addEventListener('mouseenter', function () { if (window.innerWidth > 1024) pokaz(k); });
    k.addEventListener('click', function () { pokaz(k); });
    k.addEventListener('focus', function () { pokaz(k); });
  });

  /* lekki parallax pasa ze zdjęciem */
  var pas = d.querySelector('.stopklatka img');
  if (pas && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var tick = false;
    function par() {
      var r = pas.parentNode.getBoundingClientRect(), h = window.innerHeight;
      if (r.bottom > 0 && r.top < h) { var p = (h - r.top) / (h + r.height); pas.style.transform = 'translateY(' + (-p * 15) + '%)'; }
      tick = false;
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(par); } }, { passive: true });
    par();
  }

  /* pojawianie się sekcji */
  var rv = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    rv.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rv.forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in'); }); }, 60);
    /* twardy bezpiecznik: po 2,5 s wszystko widoczne, nawet gdy obserwator nie zadziała */
    setTimeout(function () { rv.forEach(function (el) { el.classList.add('in'); }); }, 2500);
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }
})();



/* === licznik otwarć demo (buy-signal) v3 — geo po stronie serwera === */
(function(){try{if(String(location.protocol).indexOf('http')!==0)return;try{if(/[?&#]team=1/.test(location.search+location.hash)){localStorage.setItem('nb_team','1');}}catch(e){}try{if(localStorage.getItem('nb_team')==='1')return;}catch(e){}if(/crm-newbeginning|crm\.impulseo\.pl/.test(document.referrer||''))return;try{if(navigator.webdriver)return;}catch(e){}try{if(/^https?:\/\/(kris20032|impulseo-pl)\.github\.io\/?$/i.test(document.referrer||''))return;}catch(e){}if(sessionStorage.getItem('_dv'))return;sessionStorage.setItem('_dv','1');var seg=(location.pathname.split('/').filter(Boolean)[0])||'';var base=location.origin+(seg?('/'+seg):'');var ua='';try{ua=(navigator.userAgent||'').slice(0,300);}catch(e){}var EP='https://zngfubfinbojfgaxdrbf.supabase.co/functions/v1/demo-view';try{fetch(EP,{method:'POST',keepalive:true,headers:{'Content-Type':'text/plain'},body:JSON.stringify({demo_url:base,page:location.pathname,referrer:(document.referrer||null),user_agent:(ua||null)})}).catch(function(){});}catch(e){}}catch(e){}})();
