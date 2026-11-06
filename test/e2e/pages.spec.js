const { test, expect } = require('@playwright/test');

const PAGES = [
  '/',
  '/about/',
  '/about/faq/',
  '/about/glossary/',
  '/schema/',
  '/schema/agency-index/',
  '/schema/exemptions/',
  '/schema/faq/',
  '/schema/procedures/',
];

test.describe('content pages', () => {
  PAGES.forEach((path) => {
    test(`${path} renders with one h1`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
    });
  });

  test('tables scroll inside their own focusable region', async ({ page }) => {
    await page.goto('/schema/');
    const tables = page.locator('table');
    const regions = page.locator('.table-scroll[role="region"][tabindex="0"]');
    expect(await tables.count()).toBeGreaterThan(0);
    await expect(regions).toHaveCount(await tables.count());
    await expect(regions.first()).toHaveAttribute('aria-label', /table$/);
  });

  test('code blocks are keyboard reachable', async ({ page }) => {
    await page.goto('/schema/procedures/');
    const blocks = page.locator('pre[tabindex="0"][role="region"]');
    await expect(blocks.first()).toHaveAttribute('aria-label', 'Code example 1');
  });

  test('unknown URLs show the 404 page', async ({ page }) => {
    await page.goto('/does-not-exist/');
    await expect(page.locator('h1')).toContainText('Page not found');
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  PAGES.forEach((path) => {
    test(`${path} has no horizontal page scroll`, async ({ page }) => {
      await page.goto(path);
      // Fonts load after `load` (font-display: swap); measure the real ones
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      const { overflow, culprits } = await page.evaluate(() => {
        const root = document.documentElement;
        const width = root.clientWidth;
        // Name the outermost elements past the viewport edge, skipping
        // anything inside its own scroll container (e.g. code blocks)
        const clipped = (el) => {
          for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
            if (getComputedStyle(a).overflowX !== 'visible') return true;
          }
          return false;
        };
        const past = [...document.body.querySelectorAll('*')].filter(
          (el) => el.getBoundingClientRect().right > width && !clipped(el),
        );
        return {
          overflow: root.scrollWidth - width,
          culprits: past
            .filter((el) => !past.includes(el.parentElement))
            .map((el) => {
              const { right } = el.getBoundingClientRect();
              const text = el.textContent.trim().slice(0, 60);
              return `<${el.tagName.toLowerCase()} class="${el.className}"> right=${right} "${text}"`;
            }),
        };
      });
      expect(overflow, `Overflowing elements:\n${culprits.join('\n')}`).toBeLessThanOrEqual(0);
    });
  });

  test('menu button opens the primary nav', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav).toBeHidden();
    await page.locator('.usa-menu-btn').click();
    await expect(nav).toBeVisible();
  });
});
