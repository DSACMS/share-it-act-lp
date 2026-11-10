/**
 * Preview carousels on the homepage tool cards.
 *
 * Cards with two or more preview images get Previous/Next buttons and a
 * "Preview 1 of 2" status. Nothing auto-advances (WCAG 2.2.2). Without this
 * script the images stay a keyboard-scrollable row. Cards with one image are untouched.
 */

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const chevron = (path) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;

function initPreview(root) {
  const slides = root.querySelector('.preview-slides');
  const total = slides.children.length;
  if (total < 2) return;
  const label = root.dataset.label || 'Tool';

  // The buttons replace the keyboard-scrollable fallback
  slides.removeAttribute('tabindex');
  slides.removeAttribute('aria-label');
  root.classList.add('is-enhanced');

  const controls = document.createElement('div');
  controls.className = 'preview-controls';
  controls.innerHTML = `
    <button type="button" class="preview-btn">${chevron('M15 5l-7 7 7 7')}<span class="usa-sr-only"></span></button>
    <span class="preview-status" aria-live="polite"></span>
    <button type="button" class="preview-btn">${chevron('M9 5l7 7-7 7')}<span class="usa-sr-only"></span></button>`;
  root.append(controls);

  const [prev, next] = controls.querySelectorAll('.preview-btn');
  const status = controls.querySelector('.preview-status');
  prev.querySelector('.usa-sr-only').textContent = `Previous ${label} preview`;
  next.querySelector('.usa-sr-only').textContent = `Next ${label} preview`;

  let index = 0;

  // aria-disabled (not `disabled`) so focus isn't lost when a button reaches its end
  function render() {
    status.textContent = `Preview ${index + 1} of ${total}`;
    prev.setAttribute('aria-disabled', String(index === 0));
    next.setAttribute('aria-disabled', String(index === total - 1));
  }

  function go(i) {
    const target = Math.max(0, Math.min(total - 1, i));
    slides.scrollTo({
      left: target * slides.clientWidth,
      behavior: reduceMotion() ? 'auto' : 'smooth',
    });
  }

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  // Keep the status in step when someone swipes or scrolls instead of using the buttons
  let frame = null;
  slides.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const i = Math.round(slides.scrollLeft / slides.clientWidth);
      if (i !== index) {
        index = i;
        render();
      }
    });
  }, { passive: true });

  window.addEventListener('resize', () => go(index));
  render();
}

function init() {
  document.querySelectorAll('[data-preview]').forEach((el) => {
    try {
      initPreview(el);
    } catch (err) {
      // Leave the scrollable fallback in place
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}