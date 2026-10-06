/* Concho App: interacciones del sitio (JavaScript sin dependencias). */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'concho-app-theme';

  function saveTheme(value) {
    try { localStorage.setItem(THEME_KEY, value); } catch (e) { /* modo privado: el tema no se recuerda */ }
  }

  /* ── Tema claro / oscuro ─────────────────────────────── */
  var themeButtons = document.querySelectorAll('[data-theme-toggle]');
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function syncTheme() {
    var dark = root.classList.contains('dark');
    themeButtons.forEach(function (btn) { btn.setAttribute('aria-pressed', String(dark)); });
    if (themeColor) themeColor.setAttribute('content', dark ? '#0B1120' : '#F7F5EF');
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      root.classList.toggle('dark');
      saveTheme(root.classList.contains('dark') ? 'dark' : 'light');
      syncTheme();
    });
  });
  syncTheme();

  /* ── Menú móvil ──────────────────────────────────────── */
  var menuButton = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open, returnFocus) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menuButton.querySelector('[data-icon="open"]').classList.toggle('hidden', open);
    menuButton.querySelector('[data-icon="close"]').classList.toggle('hidden', !open);
    if (!open && returnFocus) menuButton.focus();
  }

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setMenu(false, true);
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ── Video del hero ──────────────────────────────────────
     Alterna los videos de la intro en su orden original. Si el navegador
     bloquea la reproducción, si falla la carga, si el usuario prefiere
     menos movimiento o si ahorra datos, queda el póster estático. */
  var video = document.getElementById('hero-video');
  var videoToggle = document.getElementById('hero-video-toggle');

  if (video && videoToggle) {
    var sources = [];
    try { sources = JSON.parse(video.getAttribute('data-sources') || '[]'); } catch (e) { sources = []; }

    var index = 0;
    var failures = 0;
    var userPaused = false;
    var pausedOffscreen = false;
    var connection = navigator.connection || {};
    var saveData = connection.saveData === true || /2g$/.test(connection.effectiveType || '');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var label = videoToggle.querySelector('[data-label]');

    var showPlaying = function (playing) {
      label.textContent = playing ? 'Pausar video' : 'Reproducir video';
      videoToggle.querySelector('[data-icon="pause"]').classList.toggle('hidden', !playing);
      videoToggle.querySelector('[data-icon="play"]').classList.toggle('hidden', playing);
    };

    var load = function (i) {
      index = i;
      video.src = sources[i];
    };

    var play = function () {
      if (!video.getAttribute('src')) load(index);
      video.muted = true;
      var attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(function () { showPlaying(false); });
    };

    var giveUp = function () {
      video.removeAttribute('src');
      video.classList.add('hidden');
      videoToggle.hidden = true;
    };

    video.addEventListener('playing', function () {
      failures = 0;
      video.classList.add('opacity-100');
      showPlaying(true);
    });
    video.addEventListener('pause', function () {
      if (!video.ended) showPlaying(false);
    });
    video.addEventListener('ended', function () {
      load((index + 1) % sources.length);
      play();
    });
    video.addEventListener('error', function () {
      failures += 1;
      if (failures >= sources.length) { giveUp(); return; }
      load((index + 1) % sources.length);
      if (!userPaused) play();
    });

    videoToggle.addEventListener('click', function () {
      if (video.paused) {
        userPaused = false;
        play();
      } else {
        userPaused = true;
        video.pause();
      }
    });

    if (sources.length) {
      videoToggle.hidden = false;
      if (reducedMotion || saveData) {
        showPlaying(false);
      } else {
        play();
      }

      // Pausa el video cuando el hero no está a la vista para ahorrar batería y datos.
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          var visible = entries[0].isIntersecting;
          if (!visible && !video.paused) {
            pausedOffscreen = true;
            video.pause();
          } else if (visible && pausedOffscreen && !userPaused) {
            pausedOffscreen = false;
            play();
          }
        }, { threshold: 0.1 }).observe(video);
      }
    }
  }

  /* ── Producto de interés en el formulario ────────────── */
  var interest = document.getElementById('contact-interest');
  document.querySelectorAll('[data-interest]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (interest) interest.value = link.getAttribute('data-interest');
    });
  });

  /* ── Formulario: prepara un correo (no envía datos) ──── */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.getAttribute('data-email');
      var brand = form.getAttribute('data-brand');
      var data = new FormData(form);
      var topic = interest.options[interest.selectedIndex].text;
      var lines = ['Hola, equipo de ' + brand + ':', '', String(data.get('mensaje')).trim(), '', 'Nombre: ' + String(data.get('nombre')).trim()];
      var org = String(data.get('organizacion') || '').trim();
      if (org) lines.push('Negocio u organización: ' + org);

      var href = 'mailto:' + email +
        '?subject=' + encodeURIComponent('Consulta sobre ' + topic + ' (sitio ' + brand + ')') +
        '&body=' + encodeURIComponent(lines.join('\r\n'));

      document.getElementById('contact-status').textContent =
        'Abrimos un borrador en tu aplicación de correo. Revísalo y envíalo desde allí. ' +
        'Si no se abrió, escríbenos a ' + email + '.';
      window.location.href = href;
    });
  }

  /* ── Episodio piloto: se carga solo cuando se solicita ── */
  document.querySelectorAll('[data-pilot-open]').forEach(function (button) {
    button.addEventListener('click', function () {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      var player = panel.querySelector('video');
      if (!player.getAttribute('src')) player.src = player.getAttribute('data-src');
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      button.hidden = true;
      player.focus();
      var attempt = player.play();
      if (attempt && attempt.catch) attempt.catch(function () { /* el usuario puede usar los controles */ });
    });
  });
})();
