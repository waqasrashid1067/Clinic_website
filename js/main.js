/* =========================================================
   MAX FAX — shared behaviour for every page
   Nothing here is required for the content to be readable.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection || {};
  var saveData = conn.saveData === true;
  var slowNet = /2g/.test(conn.effectiveType || '');
  var lightMode = saveData || slowNet;

  /* ---------- footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- sticky header border ---------- */
  var head = document.querySelector('.site-head');
  function onScroll() { if (head) head.classList.toggle('is-stuck', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* =========================================================
     IMAGE LOADING
     Every image sits in a .media box that shows a shimmer until
     the file has actually decoded, then fades it in. No layout
     shift, no half-painted photos, works with any image you swap in.
     ========================================================= */
  function settle(box) { box.classList.add('is-loaded'); }

  document.querySelectorAll('.media').forEach(function (box) {
    var img = box.querySelector('img');
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) { settle(box); return; }
    img.addEventListener('load', function () { settle(box); });
    img.addEventListener('error', function () { settle(box); });
  });

  /* Give the browser a hint about which images matter most.
     Anything in the first screenful loads eagerly and at high priority. */
  document.querySelectorAll('img').forEach(function (img) {
    var top = img.getBoundingClientRect().top;
    if (top < window.innerHeight * 1.2) {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    } else if (!img.getAttribute('loading')) {
      img.loading = 'lazy';
    }
    img.decoding = 'async';
  });

  /* =========================================================
     VIDEO LOADING
     Videos carry data-src instead of src, so nothing downloads
     until the video is close to the screen. It then plays only
     while visible, and pauses when you scroll away or switch tabs.
     On a slow connection or Data Saver, the poster is all you get.
     ========================================================= */
  var videos = Array.prototype.slice.call(document.querySelectorAll('video[data-src]'));

  function loadVideo(v) {
    if (v.dataset.loaded) return;
    v.dataset.loaded = '1';
    var srcs = JSON.parse(v.dataset.src);
    srcs.forEach(function (s) {
      var el = document.createElement('source');
      el.src = s.src;
      el.type = s.type;
      v.appendChild(el);
    });
    v.load();
    var box = v.closest('.media');
    v.addEventListener('loadeddata', function () { if (box) box.classList.add('is-loaded'); });
    v.addEventListener('error', function () { if (box) box.classList.add('is-loaded'); }, true);
  }

  if (videos.length) {
    if (lightMode || reduced) {
      /* leave the poster in place — no download at all */
      videos.forEach(function (v) {
        var box = v.closest('.media');
        if (box) box.classList.add('is-loaded');
      });
    } else if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) {
            loadVideo(v);
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { rootMargin: '250px 0px', threshold: 0.15 });
      videos.forEach(function (v) { vio.observe(v); });

      document.addEventListener('visibilitychange', function () {
        videos.forEach(function (v) {
          if (document.hidden) { v.pause(); }
        });
      });
    } else {
      videos.forEach(loadVideo);
    }
  }

  /* =========================================================
     Before / after slider
     ========================================================= */
  var range = document.getElementById('compareRange');
  var clip = document.getElementById('compareClip');
  var handle = document.getElementById('compareHandle');

  if (range && clip && handle) {
    var paint = function (v) {
      clip.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
      handle.style.left = v + '%';
    };
    paint(parseFloat(range.value));
    range.addEventListener('input', function () { paint(parseFloat(range.value)); });

    if (!reduced && 'IntersectionObserver' in window) {
      var teased = false;
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting || teased) return;
          teased = true;
          var start = null;
          var step = function (ts) {
            if (!start) start = ts;
            var t = Math.min((ts - start) / 1400, 1);
            var v = 50 + Math.sin((1 - Math.pow(1 - t, 3)) * Math.PI) * 22;
            range.value = v; paint(v);
            if (t < 1) requestAnimationFrame(step);
          };
          setTimeout(function () { requestAnimationFrame(step); }, 700);
        });
      }, { threshold: 0.4 });
      tio.observe(document.getElementById('compare'));
    }
  }

  /* =========================================================
     Scroll reveals
     ========================================================= */
  var items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('is-in'); }, i * 65);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* =========================================================
     Map: only load the Google iframe once it is near the screen.
     An embedded map is heavy, and most people never scroll to it.
     ========================================================= */
  var mapBox = document.querySelector('[data-map]');
  if (mapBox) {
    var mount = function () {
      if (mapBox.dataset.mounted) return;
      mapBox.dataset.mounted = '1';
      var f = document.createElement('iframe');
      f.src = mapBox.dataset.map;
      f.title = 'Map showing the clinic location';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      mapBox.appendChild(f);
    };
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { mount(); mio.disconnect(); }
      }, { rootMargin: '400px' });
      mio.observe(mapBox);
    } else { mount(); }
  }
})();
