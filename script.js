/* Sakshi Deokar – portfolio. Plain JavaScript, no dependencies. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- elements whose inline style is driven by scroll ---- */
  var els = {};
  $$('[data-k]').forEach(function (el) {
    els[el.getAttribute('data-k')] = { el: el, base: el.getAttribute('style') || '' };
  });
  var setStyle = function (k, v) {
    var o = els[k];
    if (o) o.el.style.cssText = o.base + v;
  };

  var track = $('.hs-track');
  var still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var st = { p: 0, ph: 800, w: 1216, ty: 0, armed: false, rev: [false, false, false, false], py: [0, 0, 0, 0] };

  var clamp01 = function (x) { return Math.min(1, Math.max(0, x)); };
  var f = function (x) { return Number(x.toFixed(3)); };

  function render() {
    var p = st.p, H = st.ph, W = st.w, ty = st.ty;
    var c = clamp01;
    var mob = W < 700;
    var z = c(p / 0.6), wf = c((p - 0.32) / 0.26), s1 = c((p - 0.6) / 0.14);
    var fs = Math.min(0.46 * W, 0.8 * H) * (mob ? 0.95 : 1);
    var sh = mob ? 0 : 0.15;
    var h1 = mob ? 0.70 : 0.94, h2 = mob ? 0.64 : 0.80;
    var lab = [0.72, 0.76, 0.80, 0.84, 0.88];
    var dl = [0, 0.12, 0, 0.12];

    setStyle('trackStyle', 'height:' + (still ? H : Math.round(H * 3.6)) + 'px');
    setStyle('pinStyle', 'height:' + H + 'px;transform:translateY(' + (still ? 0 : Math.round(ty)) + 'px)');
    setStyle('wordStyle', 'font-size:' + f(fs) + 'px;opacity:' + f(1 - wf) + ';transform:translate(-50%,-50%) translateY(' + f(-wf * 0.12 * H) + 'px) scale(' + f(1 - 0.55 * z) + ')' + (still ? ';display:none' : ''));
    setStyle('photoStyle', 'height:' + f((h1 - (h1 - h2) * z) * H) + 'px;left:' + f(W * (0.5 + sh * z)) + 'px');
    setStyle('signStyle', 'font-size:' + f(mob ? 0.22 * W : Math.min(0.12 * W, 0.2 * H)) + 'px;' + (mob ? 'left:4%;top:58%;' : '') + 'clip-path:inset(-30% ' + f((1 - s1) * 105) + '% -30% 0)');
    setStyle('mtagStyle', 'opacity:' + f(c((p - 0.8) / 0.06)));
    setStyle('hintStyle', 'opacity:' + f(1 - c(p / 0.08)));

    lab.forEach(function (a, i) {
      var k = c((p - a) / 0.05);
      setStyle('l' + i, 'opacity:' + f(k) + ';transform:translateY(' + f((1 - k) * 10) + 'px)');
      setStyle('a' + i, 'stroke-dashoffset:' + f(1 - c((p - (a + 0.03)) / 0.07)));
      setStyle('h' + i, 'stroke-dashoffset:' + f(1 - c((p - (a + 0.1)) / 0.02)));
    });

    for (var n = 0; n < 4; n++) {
      setStyle('c' + n, st.armed && !still
        ? (st.rev[n] ? 'opacity:1;transform:none;transition-delay:' + dl[n] + 's' : 'opacity:0;transform:translateY(44px) scale(.97)')
        : '');
      setStyle('i' + n, st.armed && !still ? 'transform:translateY(' + st.py[n] + 'px)' : '');
    }
  }

  function measure() {
    var t = track;
    if (!t || !t.offsetHeight) return;
    var r = t.getBoundingClientRect();
    var k = r.height / t.offsetHeight || 1;
    var vh = window.innerHeight / k;
    var ph = Math.round(Math.max(560, Math.min(vh, 1400)));
    var total = Math.max(1, t.offsetHeight - ph);
    var scrolled = (0 - r.top) / k;
    var p = Math.min(1, Math.max(0, scrolled / (total * 0.88)));
    var ty = Math.min(total, Math.max(0, scrolled));
    var w = t.offsetWidth;
    var rev = st.rev.slice(), py = st.py.slice();
    var changed = false;
    $$('.pj').forEach(function (el, n) {
      if (n > 3) return;
      var cr = el.getBoundingClientRect();
      var rt = cr.top / k;
      if (!rev[n] && rt < vh * 0.9) { rev[n] = true; changed = true; }
      var y = Math.round(Math.max(-1, Math.min(1, (rt + cr.height / 2 / k - vh / 2) / vh)) * -12);
      if (y !== py[n]) { py[n] = y; changed = true; }
    });
    if (!st.armed) changed = true;
    if (changed || Math.abs(p - st.p) > 0.002 || Math.abs(ty - st.ty) > 1 || ph !== st.ph || w !== st.w) {
      st.p = p; st.ty = ty; st.ph = ph; st.w = w; st.rev = rev; st.py = py; st.armed = true;
      render();
    }
  }

  var raf = 0;
  function tick() {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = 0; measure(); });
  }

  if (still) { st.p = 1; render(); }
  else {
    render();
    document.addEventListener('scroll', tick, true);
    window.addEventListener('resize', tick);
    window.addEventListener('load', tick);
    tick();
  }

  /* ---- lightbox ---- */
  var lb = $('#lb'), lbImg = $('.lb-img', lb), lbCount = $('.lb-c', lb);
  var lbState = null;
  function lbShow() {
    if (!lbState) { lb.style.display = 'none'; lbImg.removeAttribute('src'); return; }
    var cur = lbState.list[lbState.i];
    lbImg.src = cur.src; lbImg.alt = cur.alt;
    lbCount.textContent = (lbState.i + 1) + ' / ' + lbState.list.length;
    lb.style.display = 'flex';
  }
  function lbGo(d) {
    if (!lbState) return;
    lbState.i = (lbState.i + d + lbState.list.length) % lbState.list.length;
    lbShow();
  }
  function lbClose() { lbState = null; lbShow(); }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var back = t.closest('.pv-back');
    if (back) {
      setTimeout(function () {
        var pj = document.getElementById('projects');
        if (pj && pj.scrollIntoView) pj.scrollIntoView({ block: 'start' });
      }, 60);
      return;
    }

    var btn = t.closest('[data-lb]');
    if (btn) {
      var a = btn.getAttribute('data-lb');
      if (a === 'close') lbClose(); else if (a === 'prev') lbGo(-1); else lbGo(1);
      return;
    }
    if (t === lb) { lbClose(); return; }

    if (!t.classList || !t.classList.contains('pv-img') || !t.parentElement) return;
    var pg = t.closest('.pv-pages') || t.parentElement;
    var imgs = $$('.pv-img', pg);
    lbState = {
      list: imgs.map(function (x) { return { src: x.getAttribute('src'), alt: x.getAttribute('alt') || '' }; }),
      i: imgs.indexOf(t)
    };
    lbShow();
  });

  /* ---- keyboard: Esc closes lightbox / open case study; arrows in lightbox; Enter/Space on label-buttons ---- */
  document.addEventListener('keydown', function (e) {
    var open = lbState !== null;
    if (e.key === 'Escape') {
      if (open) { lbClose(); return; }
      var on = $$('.pv-chk').filter(function (x) { return x.checked; });
      if (on.length) { on.forEach(function (x) { x.checked = false; }); }
      return;
    }
    if (open) {
      if (e.key === 'ArrowLeft') lbGo(-1);
      else if (e.key === 'ArrowRight') lbGo(1);
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.tagName === 'LABEL' && e.target.getAttribute('role') === 'button') {
      e.preventDefault();
      e.target.click();
    }
  });
})();
