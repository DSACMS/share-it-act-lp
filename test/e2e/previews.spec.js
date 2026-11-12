/* eslint-disable no-await-in-loop -- each click must finish before the next */
const { test, expect } = require('@playwright/test');

// A card has a carousel only if it holds two or more previews, so find
// those by looking for a second slide. Written as a function (not a constant)
// because a locator belongs to one page, and every test gets its own page.
const multiCards = (page) => page
  .locator('[data-preview]')
  .filter({ has: page.locator('.preview-slides > :nth-child(2)') });

test.describe('preview carousels', () => {
  test('Previous/Next move between previews and report where you are', async ({ page }) => {
    await page.goto('/');
    const cards = multiCards(page);
    // Without this, a typo in a selector would make every check below pass on nothing
    expect(await cards.count()).toBeGreaterThan(0);

    const card = cards.first();
    const slides = card.locator('.preview-slides');
    const total = await slides.locator(':scope > *').count();
    const prev = card.getByRole('button', { name: /^Previous .* preview$/ });
    const next = card.getByRole('button', { name: /^Next .* preview$/ });
    const status = card.locator('.preview-status');

    // Start on the first preview: nothing before it
    await expect(status).toHaveText(`Preview 1 of ${total}`);
    await expect(prev).toHaveAttribute('aria-disabled', 'true');
    await expect(next).toHaveAttribute('aria-disabled', 'false');

    // Walk to the last preview
    for (let i = 2; i <= total; i += 1) {
      await next.click();
      await expect(status).toHaveText(`Preview ${i} of ${total}`);
    }
    await expect(next).toHaveAttribute('aria-disabled', 'true');
    await expect(prev).toHaveAttribute('aria-disabled', 'false');
    // The row really scrolled, not just the text
    await expect
      .poll(() => slides.evaluate(
        (el, n) => Math.abs(el.scrollLeft - (n - 1) * el.clientWidth) < 2,
        total,
      ))
      .toBe(true);

    await prev.click();
    await expect(status).toHaveText(`Preview ${total - 1} of ${total}`);
  });

  test('buttons work from the keyboard and keep focus at the end', async ({ page }) => {
    await page.goto('/');
    const card = multiCards(page).first();
    const total = await card.locator('.preview-slides > *').count();
    const next = card.getByRole('button', { name: /^Next .* preview$/ });
    const status = card.locator('.preview-status');

    await next.focus();
    for (let i = 2; i <= total; i += 1) {
      await page.keyboard.press('Enter');
      await expect(status).toHaveText(`Preview ${i} of ${total}`);
    }

    // At the end, the button is aria-disabled, not `disabled`, so focus stays put
    await page.keyboard.press('Enter');
    await expect(status).toHaveText(`Preview ${total} of ${total}`);
    await expect(next).toBeFocused();
  });

  test('stays on the same preview after the window is resized', async ({ page }) => {
    await page.goto('/');
    const card = multiCards(page).first();
    const slides = card.locator('.preview-slides');
    await card.getByRole('button', { name: /^Next .* preview$/ }).click();
    await expect(card.locator('.preview-status')).toContainText('Preview 2');

    await page.setViewportSize({ width: 375, height: 800 });
    // Slide 2 starts exactly one card-width from the left
    await expect
      .poll(() => slides.evaluate((el) => Math.abs(el.scrollLeft - el.clientWidth) < 2))
      .toBe(true);
  });

  test('never advances on its own', async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
    const status = multiCards(page).first().locator('.preview-status');
    const before = await status.textContent();
    await page.clock.runFor(60000);
    await expect(status).toHaveText(before);
  });

  test('cards with a single preview get no controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.preview-controls')).toHaveCount(await multiCards(page).count());
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('previews stay a keyboard-scrollable row', async ({ page }) => {
      await page.goto('/');
      const slides = multiCards(page).first().locator('.preview-slides');
      await expect(page.locator('.preview-controls')).toHaveCount(0);
      await expect(slides).toHaveAttribute('tabindex', '0');
      await expect(slides).toHaveAttribute('aria-label', /.+/);
      // More content than fits: the row scrolls instead of hiding images
      expect(await slides.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    });
  });
});