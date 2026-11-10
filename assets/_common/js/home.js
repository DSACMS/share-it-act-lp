/* eslint no-plusplus: 0, no-param-reassign: 0 */
/**
 * Homepage behavior: header frost, agency rotation, journey tabs,
 * checklist progress, and decorative motion.
 *
 * Every feature checks for its elements first, so this is a no-op on
 * other pages. Decorative motion only runs when <html> has the `motion`
 * class, which meta.html sets for visitors who don't prefer reduced motion.
 */
 
const EASE = 'cubic-bezier(.16, 1, .3, 1)';
const root = document.documentElement;
const motion = () => root.classList.contains('motion');
 
function animate(el, keyframes, options) {
  if (el && el.animate) el.animate(keyframes, options);
}
 
function onFontsReady(fn) {
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fn);
}
 
// Lets the inline script in meta.html know this file loaded (see its fallback).
root.dataset.homeJs = 'loaded';
 
/* ---------- Header frosts once the page scrolls ---------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
 
/* ---------- Hero: rotating agency chip with a pause control (WCAG 2.2.2) ---------- */
const AGENCIES = ['GSA', 'HHS', 'VA', 'DOD', 'DOE', 'NASA', 'USDA', 'DOT', 'DHS', 'ED', 'DOJ', 'DOL', 'DOI', 'HUD', 'EPA', 'SBA', 'SSA', 'NSF', 'OPM'];
const ROTATE_MS = 5000;
 
function initAgencyRotation() {
  const chip = document.getElementById('glyph-agency');
  const toggle = document.getElementById('rotate-toggle');
  if (!chip || !toggle) return;
 
  const label = toggle.querySelector('[data-label]');
  let index = 0;
  // Visitors who prefer reduced motion start paused and can press play.
  let userPaused = !motion();
  let holdPause = false;
  let timer = null;
 
  function swap(next) {
    if (!motion()) {
      chip.textContent = next;
      return;
    }
    // No width animation: lockWidth pins the chip to the widest name.
    chip.innerHTML = '<span class="roll"></span>';
    chip.firstChild.textContent = next;
    animate(chip.firstChild, [
      { transform: 'translateY(90%)', opacity: 0, filter: 'blur(4px)' },
      { transform: 'none', opacity: 1, filter: 'blur(0)' },
    ], { duration: 450, easing: EASE });
  }
 
  function advance() {
    index = (index + 1) % AGENCIES.length;
    swap(AGENCIES[index]);
  }
 
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!userPaused && !holdPause && !document.hidden) advance();
    }, ROTATE_MS);
  }
 
  function syncToggle() {
    const text = userPaused ? 'Play rotating agency names' : 'Pause rotating agency names';
    toggle.dataset.paused = String(userPaused);
    toggle.title = text;
    label.textContent = text;
  }
 
  // Size the chip for the longest name so the headline never reflows.
  function lockWidth() {
    const current = chip.textContent;
    chip.style.minWidth = '';
    let widest = 0;
    AGENCIES.forEach((name) => {
      chip.textContent = name;
      widest = Math.max(widest, chip.getBoundingClientRect().width);
    });
    chip.textContent = current;
    chip.style.minWidth = `${Math.ceil(widest)}px`;
  }
 
  chip.addEventListener('pointerenter', () => { holdPause = true; });
  chip.addEventListener('pointerleave', () => { holdPause = false; });
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    syncToggle();
    if (!userPaused) {
      advance();
      restart();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) restart();
  });
 
  lockWidth();
  onFontsReady(lockWidth);
  // Measuring is 19 forced layouts, so wait until resizing settles.
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockWidth, 150);
  });
 
  toggle.hidden = false;
  syncToggle();
  restart();
}
 
/* ---------- Glossary tooltips ---------- */
const TIP_GAP = 8;
const TIP_EDGE = 12;
const TIP_SIDES = ['top', 'bottom', 'left', 'right'].map((side) => `usa-tooltip__body--${side}`);
 
// USWDS centers a tooltip on its term and, when that clips, flips it to a side
// or stretches it to half the screen. Instead keep it above the term (below if
// the sticky header is in the way) and slide it sideways to stay on screen.
function placeTooltip(trigger, body) {
  if (!body.classList.contains('is-set')) return;
  const wrapper = trigger.parentNode;
  const header = document.querySelector('.site-header');
  const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
 
  body.classList.remove('usa-tooltip__body--wrap', ...TIP_SIDES);
  body.style.margin = '0';
  const t = trigger.getBoundingClientRect();
  const w = wrapper.getBoundingClientRect();
  const above = t.top - body.offsetHeight - TIP_GAP > headerBottom;
 
  body.classList.add(above ? 'usa-tooltip__body--top' : 'usa-tooltip__body--bottom');
  body.style.top = above ? 'auto' : `calc(100% + ${TIP_GAP}px)`;
  body.style.bottom = above ? `calc(100% + ${TIP_GAP}px)` : 'auto';
 
  const center = t.left + t.width / 2;
  const maxLeft = window.innerWidth - TIP_EDGE - body.offsetWidth;
  const left = Math.max(TIP_EDGE, Math.min(center - body.offsetWidth / 2, maxLeft));
  body.style.left = `${left - w.left}px`;
  body.style.setProperty('--arrow-x', `${center - left}px`);
}
 
function initTooltips() {
  const bodies = new Map();
  document.querySelectorAll('.term.usa-tooltip__trigger').forEach((trigger) => {
    const body = document.getElementById(trigger.getAttribute('aria-describedby'));
    if (!body || body.querySelector('.tooltip-hint')) return;
 
    // Point to the full definition. The hint is part of the trigger's
    // aria-describedby text, so it's announced after the definition.
    const hint = document.createElement('span');
    hint.className = 'tooltip-hint';
    hint.innerHTML = 'Select for the full definition <span aria-hidden="true">↗</span>'
      + '<span class="usa-sr-only"> (opens in a new tab)</span>';
    body.append(' ', hint);
    bodies.set(trigger, body);
  });
  if (!bodies.size) return;
 
  // USWDS positions on mouseover/focusin at document.body; these listeners on
  // the document run after it.
  const reposition = (e) => {
    const body = bodies.get(e.target);
    if (body) placeTooltip(e.target, body);
  };
  document.addEventListener('mouseover', reposition);
  document.addEventListener('focusin', reposition);
}
 
/* ---------- Journey: ARIA tabs with a sliding indicator ---------- */
function initTabs() {
  const tablist = document.querySelector('[data-tabs]');
  if (!tablist) return;
 
  const tabs = Array.from(tablist.querySelectorAll('[data-tab-for]'));
  const panels = tabs.map((tab) => document.getElementById(tab.dataset.tabFor));
  if (panels.some((p) => !p)) return;
 
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Choose your path');
  tabs.forEach((tab, i) => {
    const panel = panels[i];
    tab.id = `tab-${panel.id}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
  });
 
  const indicator = document.createElement('span');
  indicator.className = 'tab-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  tablist.appendChild(indicator);
  tablist.classList.add('has-indicator');
 
  function placeIndicator() {
    const current = tablist.querySelector('[aria-selected="true"]');
    if (!current) return;
    indicator.style.width = `${current.offsetWidth}px`;
    indicator.style.transform = `translateX(${current.offsetLeft}px)`;
  }
 
  let ready = false;
 
  function select(tab, focus) {
    const changed = ready && tab.getAttribute('aria-selected') !== 'true';
    tabs.forEach((t, i) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    placeIndicator();
    if (focus) tab.focus();
 
    const panel = panels[tabs.indexOf(tab)];
    if (changed && motion()) {
      animate(panel, [{ opacity: 0, transform: 'translateY(18px) scale(.99)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: EASE });
      panel.querySelectorAll('.step, .panel-intro > *').forEach((el, i) => {
        animate(el, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], {
          duration: 600, delay: 80 + i * 60, easing: EASE, fill: 'backwards',
        });
      });
    }
  }
 
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') [next] = tabs;
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next, true);
      }
    });
  });
 
  // Deep links to anything inside a panel (e.g. #for-agencies) open that panel.
  function selectFromHash() {
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch (err) {
      return false; // malformed escape in the link, e.g. #%E0%A4
    }
    const target = id && document.getElementById(id);
    const index = target ? panels.findIndex((p) => p.contains(target)) : -1;
    if (index >= 0) {
      select(tabs[index], false);
      target.scrollIntoView();
      return true;
    }
    return false;
  }
 
  tablist.hidden = false;
  if (!selectFromHash()) select(tabs[0], false);
  ready = true;
  window.addEventListener('hashchange', selectFromHash);
  window.addEventListener('resize', placeIndicator);
  onFontsReady(placeIndicator);
  requestAnimationFrame(() => tablist.classList.add('animate'));
}
 
/* ---------- Journey: checklist progress (starts fresh on every visit) ---------- */
function initChecklists() {
  document.querySelectorAll('[data-checklist]').forEach((panel) => {
    const boxes = panel.querySelectorAll('input[type="checkbox"]');
    const progress = panel.querySelector('.progress');
    const count = panel.querySelector('[data-count]');
    const bar = panel.querySelector('[role="progressbar"]');
    const doneMsg = panel.querySelector('[data-done]');
    if (!boxes.length || !progress || !count || !bar) return;
 
    // Each box is one task, except an either/or group (.checks--choice), which
    // counts as a single task done by checking any one of its boxes.
    const tasks = [];
    const groups = new Map();
    boxes.forEach((box) => {
      const group = box.closest('.checks--choice');
      if (!group) {
        tasks.push([box]);
      } else if (groups.has(group)) {
        groups.get(group).push(box);
      } else {
        const members = [box];
        groups.set(group, members);
        tasks.push(members);
      }
    });
 
    function update() {
      const done = tasks.filter((members) => members.some((b) => b.checked)).length;
      const pct = Math.round((done / tasks.length) * 100);
      count.textContent = `${done} of ${tasks.length}`;
      bar.setAttribute('aria-valuenow', String(pct));
      bar.setAttribute('aria-valuetext', `${done} of ${tasks.length} complete`);
      bar.firstElementChild.style.width = `${pct}%`;
      if (doneMsg) doneMsg.hidden = done < tasks.length;
    }
 
    boxes.forEach((box) => {
      // Some browsers restore checkbox state on reload; always start unchecked.
      box.checked = false;
      box.addEventListener('change', () => {
        // Only one option in an either/or group can be checked at a time
        const group = box.closest('.checks--choice');
        if (group && box.checked) {
          groups.get(group).forEach((other) => { if (other !== box) other.checked = false; });
        }
        update();
        if (motion() && box.checked) {
          animate(box.closest('.check'), [{ transform: 'scale(1)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 380, easing: EASE });
          animate(count, [{ transform: 'translateY(-40%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 350, easing: EASE });
        }
      });
    });
 
    progress.hidden = false;
    update();
  });
}
 
/* ---------- Decorative motion (only with .motion) ---------- */
 
// Split a heading's words into spans for a staggered reveal. The visual copy is
// hidden from assistive tech and the original wording is kept in a sr-only span,
// so screen readers read the heading as one phrase.
function splitWords(el) {
  const spoken = el.cloneNode(true);
  spoken.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  const text = spoken.textContent.replace(/\s+/g, ' ').trim();
 
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  let i = 0;
  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Split on ordinary whitespace only, so &nbsp; keeps words together.
      node.textContent.split(/([ \t\n\r]+)/).forEach((part) => {
        if (!part) return;
        if (/^[ \t\n\r]+$/.test(part)) {
          visual.appendChild(document.createTextNode(' '));
          return;
        }
        const word = document.createElement('span');
        word.className = 'w';
        word.style.setProperty('--i', i++);
        word.textContent = part;
        visual.appendChild(word);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('usa-sr-only')) {
      node.classList.add('w');
      node.style.setProperty('--i', i++);
      visual.appendChild(node);
    }
  });
 
  const sr = document.createElement('span');
  sr.className = 'usa-sr-only';
  sr.textContent = text;
  el.textContent = '';
  el.append(sr, visual);
  el.classList.add('split');
}
 
function initMotion() {
  if (!motion() || !document.querySelector('.hero')) return;
 
  const heroTitle = document.getElementById('hero-title');
  splitWords(heroTitle);
  heroTitle.style.setProperty('--d0', '120ms');
  const headings = Array.from(document.querySelectorAll('.h2, .cta-card h2'));
  headings.forEach(splitWords);
 
  // Code card: each line fades in
  const code = document.querySelector('.code-card code');
  code.innerHTML = code.innerHTML.split('\n').map((line, i) => `<span class="line" style="--i:${i}">${line}</span>`).join('');
 
  // Hero load sequence
  const heroBits = [
    [document.querySelector('.hero .eyebrow'), 0],
    [document.querySelector('.hero .lede'), 520],
    [document.querySelector('.hero-actions'), 680],
  ];
  heroBits.forEach(([el, delay]) => {
    el.classList.add('hero-reveal');
    el.style.setProperty('--d', `${delay}ms`);
  });
  const card = document.querySelector('.code-card');
  let started = false;
  const startHero = () => {
    if (started) return;
    started = true;
    requestAnimationFrame(() => {
      heroBits.forEach(([el]) => el.classList.add('in'));
      heroTitle.classList.add('in');
      card.classList.add('in');
      setTimeout(() => card.classList.add('settled'), 1800);
    });
  };
  onFontsReady(startHero);
  setTimeout(startHero, 700);
 
  // Gentle 3D tilt that follows the pointer
  if (window.matchMedia('(hover: hover)').matches) {
    card.addEventListener('pointermove', (e) => {
      if (!card.classList.contains('settled')) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  }
 
  // Scroll reveals, staggered among siblings, in two steps:
  //  1. arm: just before an element scrolls in, hide it (`.pre-reveal`). Arming only
  //     starts after the visitor's first scroll, so the page at load (and what
  //     accessibility checkers measure) is always fully visible.
  //  2. play: once it's 15% on screen, animate it in with the Web Animations API.
  const groups = [
    '.act .section-head .eyebrow', '.act .section-head .lede',
    '.pillar', '.fine-print > div', '.source-links',
    '.journey .section-head .eyebrow', '.journey .section-head .lede', '.tabs', '.panels',
    '.tools .section-head .eyebrow', '.tools .section-head .lede', '.tool',
    '.docs-intro .eyebrow', '.docs-intro .lede', '.doc-list li',
    '.cta-card', '.cta-actions',
  ];
  const belowFold = (el) => el.getBoundingClientRect().top > window.innerHeight;
  const delays = new Map();
  const targets = [];
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!belowFold(el)) return;
      const siblings = Array.from(el.parentNode.children).filter((c) => c.matches(sel));
      delays.set(el, Math.min(siblings.indexOf(el), 6) * 90);
      targets.push(el);
    });
  });
 
  function reveal(el) {
    const delay = delays.get(el) || 0;
    animate(el, [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], {
      duration: 1000, delay, easing: EASE, fill: 'backwards',
    });
    const numeral = el.classList.contains('pillar') && el.querySelector('.pillar-num > span');
    if (numeral) {
      animate(numeral, [{ transform: 'translateY(100%)' }, { transform: 'none' }], {
        duration: 1100, delay: delay + 150, easing: EASE, fill: 'backwards',
      });
    }
  }
 
  function revealWords(el) {
    el.querySelectorAll('.w').forEach((word) => {
      animate(word, [
        { opacity: 0, transform: 'translateY(.38em)', filter: 'blur(10px)' },
        { opacity: 1, transform: 'none', filter: 'blur(0)' },
      ], {
        duration: 1000, delay: Number(word.style.getPropertyValue('--i')) * 45, easing: EASE, fill: 'backwards',
      });
    });
  }
 
  const armed = new Set();
 
  const shower = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || !armed.has(entry.target)) return;
      const el = entry.target;
      shower.unobserve(el);
      armed.delete(el);
      el.classList.remove('pre-reveal');
      if (el.classList.contains('split')) revealWords(el);
      else reveal(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
 
  const armer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      armer.unobserve(el);
      // Already on screen (e.g. after a jump link): leave it as is rather than flash it.
      if (entry.boundingClientRect.top < window.innerHeight * 0.92) return;
      if (el.classList.contains('pipeline')) {
        el.classList.add('armed');
        return;
      }
      el.classList.add('pre-reveal');
      armed.add(el);
      shower.observe(el);
    });
  }, { rootMargin: '0px 0px 30% 0px' });
 
  const startArming = () => {
    targets.forEach((el) => armer.observe(el));
    headings.filter(belowFold).forEach((el) => armer.observe(el));
    const pipelineEl = document.querySelector('.pipeline');
    if (pipelineEl && belowFold(pipelineEl)) armer.observe(pipelineEl);
  };
  window.addEventListener('scroll', startArming, { once: true, passive: true });
 
  // Tools: the pipeline runs once it's on screen.
  const pipeline = document.querySelector('.pipeline');
  if (!pipeline) return;
  pipeline.querySelectorAll('li').forEach((li, i) => li.style.setProperty('--i', i));
 
  const player = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      player.unobserve(entry.target);
      setTimeout(() => entry.target.classList.add('run'), 250);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  player.observe(pipeline);
}
 
function init() {
  [initHeaderScroll, initTooltips, initAgencyRotation, initTabs, initChecklists].forEach((setup) => {
    try {
      setup();
    } catch (err) {
      // One broken feature shouldn't stop the others from loading.
    }
  });
  try {
    initMotion();
  } catch (err) {
    // If anything goes wrong, show everything without motion.
    root.classList.remove('motion');
  }
}
 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}