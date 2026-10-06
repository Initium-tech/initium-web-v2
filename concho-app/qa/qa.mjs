// Pruebas de navegador del sitio Concho App ya compilado (servido desde /concho-app/).
// Uso recomendado: npm run qa  (scripts/run_qa.py levanta el servidor temporal).
// Uso directo:     node qa/qa.mjs <baseUrl> <carpetaCapturas> [urlOriginalConchoAds] [resultados.json]
// Requiere Google Chrome instalado (o CHROME_PATH) y `npm install` dentro de qa/.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.argv[2] || 'http://127.0.0.1:8765/concho-app/';
const SHOTS = process.argv[3];
const ORIGINAL = process.argv[4];
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const RESULTS = process.argv[5];

const results = [];
const record = (name, pass, detail = '') => { results.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VIEWPORTS = {
  mobile: { width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 1 },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, protocolTimeout: 60000, args: ['--no-first-run', '--mute-audio'] });

async function openPage({ vp, theme = 'dark', media = [], init, block } = {}) {
  const page = await browser.newPage();
  const issues = { console: [], pageErrors: [], failed: [] };
  page.on('console', (m) => { if (['error', 'warn'].includes(m.type())) issues.console.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => issues.pageErrors.push(String(e)));
  page.on('requestfailed', (r) => { const u = r.url(); if (!u.endsWith('.mp4') || block) issues.failed.push(`${r.failure()?.errorText} ${u}`); });
  page.on('response', (r) => { if (r.status() >= 400) issues.failed.push(`${r.status()} ${r.url()}`); });
  if (block) {
    await page.setRequestInterception(true);
    page.on('request', (req) => (block.test(req.url()) ? req.abort() : req.continue()));
  }
  await page.setViewport(VIEWPORTS[vp]);
  if (media.length) await page.emulateMediaFeatures(media);
  await page.evaluateOnNewDocument((t) => { try { localStorage.setItem('concho-app-theme', t); } catch (e) {} }, theme);
  if (init) await page.evaluateOnNewDocument(init);
  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await sleep(600);
  return { page, issues };
}

async function loadLazy(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 120)); }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 1 : Promise.race([
    new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }),
    new Promise((r) => setTimeout(r, 4000)),
  ])))));
  await sleep(300);
}

async function layoutChecks(page, label) {
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[aria-hidden="true"]')) continue;
      const b = el.getBoundingClientRect();
      if (b.width === 0) continue;
      if ((b.right > vw + 1 || b.left < -1) && !el.closest('.overflow-hidden')) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} [${Math.round(b.left)}–${Math.round(b.right)}]`);
    }
    // Text clipped inside its own box (single-line overflow with hidden/ellipsis)
    const clipped = [];
    for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,li,summary,label')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || el.closest('[hidden]') || el.closest('.sr-only')) continue;
      if (el.scrollWidth > el.clientWidth + 1 && ['hidden', 'clip'].includes(cs.overflowX) && el.clientWidth > 0) clipped.push(el.textContent.trim().slice(0, 40));
    }
    const brokenImgs = [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src.split('/').pop());
    return { scrollW: document.documentElement.scrollWidth, vw, offenders: offenders.slice(0, 8), clipped: clipped.slice(0, 8), brokenImgs };
  });
  record(`${label}: no horizontal overflow`, r.scrollW <= r.vw && r.offenders.length === 0, r.offenders.length ? r.offenders.join('; ') : `scrollWidth ${r.scrollW} ≤ ${r.vw}`);
  record(`${label}: no clipped text`, r.clipped.length === 0, r.clipped.join('; '));
  record(`${label}: every image loaded`, r.brokenImgs.length === 0, r.brokenImgs.join(', '));
}

async function axeAudit(page, label) {
  await page.evaluate(AXE);
  const res = await page.evaluate(async () => {
    // Freeze animations so contrast is measured on settled colors.
    const s = document.createElement('style'); s.textContent = '*{animation:none!important;transition:none!important}'; document.head.appendChild(s);
    const out = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } });
    s.remove();
    return out.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(' ') + (n.any[0]?.data?.contrastRatio ? ` (${n.any[0].data.contrastRatio}:1 ${n.any[0].data.fgColor} on ${n.any[0].data.bgColor})` : '')) }));
  });
  const serious = res.filter((v) => ['serious', 'critical'].includes(v.impact));
  record(`${label}: axe — no serious/critical violations`, serious.length === 0, res.map((v) => `${v.id}[${v.impact}]×${v.n}: ${v.sample.join(' | ')}`).join(' || '));
  return res;
}

function issuesCheck(issues, label, allowFailed = false) {
  record(`${label}: no console errors / page errors`, issues.console.length === 0 && issues.pageErrors.length === 0, [...issues.console, ...issues.pageErrors].join(' | '));
  if (!allowFailed) record(`${label}: no failed requests`, issues.failed.length === 0, issues.failed.join(' | '));
}

async function shot(page, name, full = false) {
  if (!SHOTS) return;
  const file = path.join(SHOTS, name);
  await page.screenshot({ path: file, fullPage: full, ...(file.endsWith('.jpg') ? { type: 'jpeg', quality: 80 } : {}) });
  console.log(`      screenshot ${file}`);
}

// ── 1. Layout, theme, axe and screenshots per viewport/theme ──
for (const vp of ['mobile', 'tablet', 'desktop']) {
  for (const theme of ['dark', 'light']) {
    const label = `${vp} ${VIEWPORTS[vp].width}px ${theme}`;
    const { page, issues } = await openPage({ vp, theme });
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    record(`${label}: theme applied`, isDark === (theme === 'dark'));
    await shot(page, `${vp}-${VIEWPORTS[vp].width}-${theme}-hero.png`);
    await loadLazy(page);
    await layoutChecks(page, label);
    await axeAudit(page, label);
    // Product names stay visible and distinct
    const names = await page.evaluate(() => ['Concho Studio', 'Concho Rutas', 'Concho Ads'].map((n) => {
      const h = [...document.querySelectorAll('#ecosistema h3')].find((e) => e.textContent.trim() === n);
      if (!h) return `${n}: missing`;
      const b = h.getBoundingClientRect();
      return b.width > 0 && h.scrollWidth <= h.clientWidth + 1 ? 'ok' : `${n}: hidden/clipped`;
    }));
    record(`${label}: three product names visible in overview`, names.every((n) => n === 'ok'), names.join(', '));
    if (VIEWPORTS[vp].deviceScaleFactor > 1) { await page.setViewport({ ...VIEWPORTS[vp], deviceScaleFactor: 1 }); await loadLazy(page); }
    await shot(page, `${vp}-${VIEWPORTS[vp].width}-${theme}-full.jpg`, true);
    issuesCheck(issues, label);
    await page.close();
  }
}

// ── 2. Mobile menu, theme persistence, CTAs and anchors ──
{
  const { page, issues } = await openPage({ vp: 'mobile', theme: 'dark' });
  const menuState = () => page.evaluate(() => ({ hidden: document.getElementById('mobile-menu').hidden, expanded: document.getElementById('menu-toggle').getAttribute('aria-expanded'), label: document.getElementById('menu-toggle').getAttribute('aria-label'), focus: document.activeElement?.id }));
  record('mobile menu: closed initially', (await menuState()).hidden === true);
  await page.click('#menu-toggle');
  let s = await menuState();
  record('mobile menu: opens with aria-expanded=true', !s.hidden && s.expanded === 'true' && s.label === 'Cerrar menú', JSON.stringify(s));
  await shot(page, 'mobile-375-dark-menu-open.png');
  await page.keyboard.press('Escape');
  s = await menuState();
  record('mobile menu: Escape closes and returns focus', s.hidden && s.expanded === 'false' && s.focus === 'menu-toggle', JSON.stringify(s));
  await page.click('#menu-toggle');
  await page.click('#mobile-menu a[href="#rutas"]');
  await sleep(1200);
  s = await menuState();
  const rutasTop = await page.evaluate(() => Math.round(document.getElementById('rutas').getBoundingClientRect().top));
  record('mobile menu: link closes menu and scrolls to section', s.hidden && page.url().endsWith('#rutas') && rutasTop >= 0 && rutasTop < 120, `#rutas top=${rutasTop}px`);

  // Theme toggle on mobile + persistence
  await page.click('.md\\:hidden [data-theme-toggle]');
  const afterToggle = await page.evaluate(() => ({ dark: document.documentElement.classList.contains('dark'), stored: localStorage.getItem('concho-app-theme'), pressed: document.querySelector('[data-theme-toggle]').getAttribute('aria-pressed'), color: document.querySelector('meta[name=theme-color]').content }));
  record('theme toggle (mobile): switches to light and stores choice', !afterToggle.dark && afterToggle.stored === 'light' && afterToggle.pressed === 'false', JSON.stringify(afterToggle));
  await page.evaluate(() => { window.__noInit = true; });
  await page.goto(BASE, { waitUntil: 'load' });
  // evaluateOnNewDocument re-seeds "dark"; check persistence on a clean page instead
  await page.close();
  issuesCheck(issues, 'mobile interactions', true);

  const p2 = await browser.newPage();
  await p2.setViewport(VIEWPORTS.desktop);
  await p2.goto(BASE, { waitUntil: 'load' });
  const defaultDark = await p2.evaluate(() => document.documentElement.classList.contains('dark'));
  record('theme: dark by default with no saved choice', defaultDark);
  await p2.click('nav[aria-label="Principal"] [data-theme-toggle]');
  await p2.reload({ waitUntil: 'load' });
  const persisted = await p2.evaluate(() => !document.documentElement.classList.contains('dark') && localStorage.getItem('concho-app-theme') === 'light');
  record('theme toggle (desktop): light choice persists after reload', persisted);
  await p2.evaluate(() => localStorage.removeItem('concho-app-theme'));
  await p2.close();
}

{
  const { page } = await openPage({ vp: 'desktop', theme: 'dark' });
  // Every internal anchor resolves and scrolls its target under the header
  const anchors = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')))]);
  const missing = await page.evaluate((list) => list.filter((h) => !document.getElementById(h.slice(1))), anchors);
  record('anchors: every #link has a target', missing.length === 0, `${anchors.length} unique: ${anchors.join(' ')}${missing.length ? ' — missing ' + missing.join(',') : ''}`);
  const scrollIssues = [];
  for (const h of anchors) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await sleep(150);
    await page.evaluate((href) => document.querySelector(`a[href="${href}"]`).click(), h);
    await sleep(1600);
    const top = await page.evaluate((id) => Math.round(document.getElementById(id).getBoundingClientRect().top), h.slice(1));
    if (top < -2 || top > 140) scrollIssues.push(`${h}:${top}`);
  }
  record('anchors: click scrolls target into view below sticky header', scrollIssues.length === 0, scrollIssues.join(' ') || 'all within 0–140px');

  // Interest prefill from CTAs
  const ctas = [['#ecosistema a[data-interest="ads"]', 'ads'], ['#rutas a[data-interest="rutas"]', 'rutas'], ['#ads a[data-interest="flota"]', 'flota'], ['#studio a[data-interest="studio"]', 'studio'], ['#ads a.btn-primary[data-interest="ads"]', 'ads']];
  const pre = [];
  for (const [sel, val] of ctas) {
    await page.evaluate((s) => { document.getElementById('contact-interest').value = 'otro'; document.querySelector(s).click(); }, sel);
    await sleep(300);
    pre.push(`${val}:${await page.evaluate(() => document.getElementById('contact-interest').value)}`);
  }
  record('CTAs: data-interest preselects the contact topic', pre.every((p) => p.split(':')[0] === p.split(':')[1]), pre.join(' '));

  // Hero CTAs
  const heroCtas = await page.evaluate(() => [...document.querySelectorAll('#inicio a.btn-primary, #inicio a.btn-secondary')].map((a) => `${a.textContent.trim()}→${a.getAttribute('href')}`));
  record('hero CTAs point to ecosystem and Ads sections', heroCtas.join('|') === 'Explora el ecosistema→#ecosistema|Soy un negocio→#ads', heroCtas.join(' | '));

  // FAQ: details open/close
  const faq = await page.evaluate(() => { const d = document.querySelectorAll('#preguntas details'); d[3].querySelector('summary').click(); const opened = d[3].open; d[3].querySelector('summary').click(); return { count: d.length, opened, closed: !d[3].open }; });
  record('FAQ: questions open and close', faq.count >= 8 && faq.opened && faq.closed, JSON.stringify(faq));

  // Contact form: validation and mailto draft (no message is sent)
  const client = await page.target().createCDPSession();
  await client.send('Page.enable');
  let navUrl = null;
  client.on('Page.frameRequestedNavigation', (e) => { navUrl = e.url; });
  await page.evaluate(() => { document.getElementById('contact-name').value = ''; document.getElementById('contact-message').value = ''; });
  await page.click('#contact-form button[type="submit"]');
  await sleep(300);
  const blocked = await page.evaluate(() => ({ status: document.getElementById('contact-status').textContent, valid: document.getElementById('contact-form').checkValidity() }));
  record('contact form: empty required fields block the draft', !blocked.valid && blocked.status === '' && navUrl === null, JSON.stringify(blocked));
  await page.select('#contact-interest', 'rutas');
  await page.type('#contact-name', 'Prueba QA');
  await page.type('#contact-message', 'Mensaje de prueba (QA local, no enviado).');
  await page.click('#contact-form button[type="submit"]');
  await sleep(800);
  const status = await page.evaluate(() => document.getElementById('contact-status').textContent);
  const okMailto = navUrl && navUrl.startsWith('mailto:rgarcia@initiumtec.com?subject=') && decodeURIComponent(navUrl).includes('Concho Rutas') && decodeURIComponent(navUrl).includes('Prueba QA');
  record('contact form: builds a mailto draft for the chosen topic', !!okMailto, navUrl ? decodeURIComponent(navUrl).slice(0, 140) : 'no navigation captured');
  record('contact form: feedback says it opens the email app (never claims sending)', /aplicación de correo/.test(status) && !/enviad[oa] con éxito|recibimos/i.test(status), status);

  // External links: rel and target
  const ext = await page.evaluate(() => [...document.querySelectorAll('a[href^="http"]')].map((a) => ({ href: a.href, target: a.target, rel: a.rel })));
  record('external links open in new tab with rel=noopener', ext.every((l) => l.target === '_blank' && /noopener/.test(l.rel)), [...new Set(ext.map((l) => l.href))].join(' '));
  await page.close();
}

// ── 3. Hero video: real playback, sequence, pause/resume ──
{
  const { page, issues } = await openPage({ vp: 'desktop', theme: 'dark' });
  const v = () => page.evaluate(() => { const el = document.getElementById('hero-video'); return { src: el.currentSrc.split('/').pop(), t: +el.currentTime.toFixed(2), paused: el.paused, muted: el.muted, opacity: getComputedStyle(el).opacity, label: document.querySelector('#hero-video-toggle [data-label]').textContent, autoplayAttr: el.autoplay, playsinline: el.playsInline }; });
  await sleep(3000);
  let s = await v();
  record('video: first intro clip autoplays muted & inline', s.src === 'ConchoAdsbannerwebpage.mp4' && !s.paused && s.t > 0.5 && s.muted && s.playsinline && s.label === 'Pausar video', JSON.stringify(s));
  await page.evaluate(() => { const el = document.getElementById('hero-video'); el.currentTime = Math.max(0, el.duration - 0.4); });
  await sleep(2500);
  s = await v();
  record('video: switches to second clip when the first ends', s.src === 'ConchoAppswebIntro.mp4' && !s.paused, JSON.stringify(s));
  await page.evaluate(() => { const el = document.getElementById('hero-video'); el.currentTime = Math.max(0, el.duration - 0.4); });
  await sleep(2500);
  s = await v();
  record('video: loops back to the first clip', s.src === 'ConchoAdsbannerwebpage.mp4' && !s.paused, JSON.stringify(s));
  await page.click('#hero-video-toggle');
  await sleep(500);
  s = await v();
  record('video: pause button pauses and relabels', s.paused && s.label === 'Reproducir video', JSON.stringify(s));
  const t1 = s.t; await sleep(1200); s = await v();
  record('video: stays paused (not resumed by scroll observer)', s.paused && s.t === t1);
  await page.click('#hero-video-toggle');
  await sleep(800);
  s = await v();
  record('video: play button resumes', !s.paused && s.label === 'Pausar video', JSON.stringify(s));
  // Scrolling away pauses; returning resumes
  await page.evaluate(() => document.getElementById('preguntas').scrollIntoView()); await sleep(800);
  const off = await v();
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(1200);
  const back = await v();
  record('video: pauses off-screen and resumes when hero returns', off.paused && !back.paused, `off=${off.paused} back=${!back.paused}`);
  const audio = await page.evaluate(() => [...document.querySelectorAll('video,audio')].filter((m) => !m.muted && !m.paused).length);
  record('video: no audible autoplay', audio === 0);
  issuesCheck(issues, 'video page');
  await page.close();
}

// ── 4. Fallbacks: reduced motion, data saver, failed media ──
{
  const { page, issues } = await openPage({ vp: 'mobile', theme: 'dark', media: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await sleep(1500);
  const s = await page.evaluate(() => { const el = document.getElementById('hero-video'); const f = document.querySelector('.animate-float'); return { src: el.getAttribute('src'), paused: el.paused, label: document.querySelector('#hero-video-toggle [data-label]').textContent, toggleVisible: !document.getElementById('hero-video-toggle').hidden, posterLoaded: document.querySelector('#inicio > img').naturalWidth > 0, floatDur: getComputedStyle(f).animationDuration }; });
  record('reduced motion: no autoplay, poster shown, play control offered', s.src === null && s.paused && s.posterLoaded && s.toggleVisible && s.label === 'Reproducir video', JSON.stringify(s));
  record('reduced motion: floating animation disabled', parseFloat(s.floatDur) < 0.01, s.floatDur);
  await shot(page, 'mobile-375-reduced-motion-poster.png');
  issuesCheck(issues, 'reduced motion');
  await page.close();
}
{
  const { page, issues } = await openPage({ vp: 'desktop', theme: 'dark', init: () => { Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '4g' }, configurable: true }); } });
  await sleep(1500);
  const s = await page.evaluate(() => ({ src: document.getElementById('hero-video').getAttribute('src'), label: document.querySelector('#hero-video-toggle [data-label]').textContent }));
  record('data saver: video not downloaded until requested', s.src === null && s.label === 'Reproducir video', JSON.stringify(s));
  issuesCheck(issues, 'data saver');
  await page.close();
}
{
  const { page, issues } = await openPage({ vp: 'desktop', theme: 'dark', block: /\.mp4(\?|$)/ });
  await sleep(3000);
  const s = await page.evaluate(() => ({ videoHidden: document.getElementById('hero-video').classList.contains('hidden'), toggleHidden: document.getElementById('hero-video-toggle').hidden, posterLoaded: document.querySelector('#inicio > img').naturalWidth > 0, h1: document.querySelector('h1').textContent.replace(/\s+/g, ' ').trim(), navLinks: document.querySelectorAll('header nav a').length }));
  record('failed media: poster + text + navigation remain, control hidden', s.videoHidden && s.toggleHidden && s.posterLoaded && s.navLinks >= 5, JSON.stringify(s));
  record('failed media: no script errors', issues.pageErrors.length === 0, issues.pageErrors.join(' | '));
  await page.close();
}
{
  // No JavaScript: content and mobile navigation still usable
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setViewport(VIEWPORTS.mobile);
  await page.goto(BASE, { waitUntil: 'load' });
  const s = await page.evaluate(() => ({ menuVisible: getComputedStyle(document.getElementById('mobile-menu')).display !== 'none', toggleHidden: getComputedStyle(document.getElementById('menu-toggle')).display === 'none', h1: !!document.querySelector('h1'), dark: document.documentElement.classList.contains('dark') }));
  record('no JavaScript: mobile links visible, dark theme, content present', s.menuVisible && s.toggleHidden && s.h1 && s.dark, JSON.stringify(s));
  await page.close();
}

// ── 5. Original Concho Ads hero for visual comparison ──
if (ORIGINAL && SHOTS) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORTS.desktop);
  await page.goto(ORIGINAL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  await sleep(2500);
  await shot(page, 'reference-original-conchoads-desktop-1440-hero.png');
  await page.setViewport(VIEWPORTS.mobile);
  await sleep(1500);
  await shot(page, 'reference-original-conchoads-mobile-375-hero.png');
  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (RESULTS) fs.writeFileSync(RESULTS, JSON.stringify({ date: new Date().toISOString(), base: BASE, passed: results.length - failed.length, total: results.length, results }, null, 2));
process.exit(failed.length ? 1 : 0);
