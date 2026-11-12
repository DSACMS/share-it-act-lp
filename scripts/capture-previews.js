/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */
/* eslint-disable no-await-in-loop, no-restricted-syntax */
const fs = require('fs');
const { chromium, expect } = require('@playwright/test');
 
const OUT_DIR = 'assets/_common/_img/previews';
const SCALE = 2; // deviceScaleFactor; images are SCALE times bigger than their CSS size
const manifest = {};
 
// A PNG stores its width and height at fixed positions in its header
function pngSize(file) {
  const buf = fs.readFileSync(file);
  return {
    width: Math.round(buf.readUInt32BE(16) / SCALE),
    height: Math.round(buf.readUInt32BE(20) / SCALE),
  };
}
 
// Screenshot a region that starts at the top-left of `locator` (minus `pad` px of margin)
// and always has the same shape (`aspect` = width / height). Because every image has the
// same shape, they fill the preview window exactly: no blank space, no cropping.
async function shootRegion(page, locator, path, { pad = 32, aspect = 4 / 3 } = {}) {
  // At scroll position 0, positions measured in the window equal positions on the page
  await page.evaluate(() => window.scrollTo(0, 0));
  const box = await locator.boundingBox();
 
  const left = Math.max(0, box.x - pad);
  const top = Math.max(0, box.y - pad);
  const width = box.x + box.width + pad - left;
 
  await page.screenshot({
    path,
    fullPage: true,
    animations: 'disabled',
    clip: { x: left, y: top, width, height: width / aspect },
  });
}
 
// One entry per tool. Each tool has one or more shots.
//   ready   (optional) selector to wait for before taking shots (for JS-built pages)
//   target  element where the screenshot region starts
//   pad     (optional) margin around the target; 0 = flush with its edge (default 32)
//   setup   (optional) puts the page in the state we want
//   verify  (optional) checks the setup worked, so a bad capture fails loudly
const previews = [
  {
    tool: 'web-form-generator',
    url: 'https://gsa-share-it.github.io/codejson-form/',
    shots: [
      {
        name: 'step-1',
        target: '.exemptions',
        pad: 0,
        alt: 'Web Form Generator step 1: choose your project\'s classification: Open Source, Government Wide Reuse, or None of the above. Open Source is selected.',
        setup: async (page) => {
          await page.locator('label[for="check-open-source"]').click();
        },
      },
      {
        name: 'step-2',
        target: '.auto-generation',
        pad: 0,
        alt: 'Web Form Generator step 2: a GitHub repository URL field, filled in with a sample repository, used to pre-fill the form.',
        setup: async (page) => {
          await page.locator('#repo-url').fill('https://github.com/GSA-SHARE-IT/site');
        },
      },
    ],
  },
    {
    tool: 'repo-discovery-form',
    url: 'https://gsa-share-it.github.io/repo-form/',
    ready: '#formio input',
    shots: [
      {
        name: 'top',
        // The title and intro live in #form-header, above the Form.io form
        target: '#form-header',
        alt: 'Repository Discovery Form: the title and introduction, followed by the first fields, Repository Name and Repository URL, filled in with sample values.',
        setup: async (page) => {
          await page.locator('input[name="data[Repository Name]"]').fill('site');
          await page
            .locator('input[name="data[Repository URL]"]')
            .fill('https://github.com/GSA-SHARE-IT/site');
        },
        verify: async (page) => {
          await expect(page.locator('input[name="data[Repository Name]"]')).toHaveValue('site');
          await expect(page.locator('input[name="data[Repository URL]"]'))
            .toHaveValue('https://github.com/GSA-SHARE-IT/site');
        },
      },
      {
        name: 'fields',
        // Start at the first field so the preview shows the questions people answer
        target: '#formio .formio-component-textfield',
        alt: 'Repository Discovery Form fields: Repository Name, Repository URL, FISMA System Identifier, and Repository Owner, each with a short description. Name and URL are filled in with sample values.',
      },
    ],
  },
  {
    tool: 'index-generator',
    url: 'https://gsa-share-it.github.io/codejson-index/',
    shots: [
      {
        name: 'form',
        target: '#index-generator-form',
        alt: 'Index Generator form with an agency name, two GitHub organizations, and a version selected, above the Generate Index button.',
        setup: async (page) => {
          await page.locator('#agency-name').fill('GSA');
          const orgs = page.locator('#github-orgs-input');
          await orgs.fill('GSA');
          await orgs.press('Enter');
          await orgs.fill('GSA-SHARE-IT');
          await orgs.press('Enter');
          await page.locator('#version').selectOption('2.0.0');
        },
        verify: async (page) => {
          await expect(page.locator('#agency-name')).toHaveValue('GSA');
          await expect(page.locator('#version')).toHaveValue('2.0.0');
          await expect(page.locator('#index-generator-form')).toContainText('GSA-SHARE-IT');
        },
      },
    ],
  },
];
 
(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL });
 
  for (const { tool, url, ready, shots } of previews) {
    const page = await browser.newPage({
      viewport: { width: 900, height: 900 },
      deviceScaleFactor: SCALE,
      reducedMotion: 'reduce',
    });
    await page.goto(url);
    if (ready) await page.locator(ready).first().waitFor();
    await page.waitForLoadState('networkidle').catch(() => {}); // analytics can keep this from settling
    await page.evaluate(() => document.fonts.ready); // wait for web fonts
 
    for (const { name, target, pad, alt, setup, verify } of shots) {
      if (setup) await setup(page);
      if (verify) await verify(page);
 
      // Drop the focus ring left behind by the last click or keystroke
      await page.evaluate(() => {
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      });
 
      const path = `${OUT_DIR}/${tool}-${name}.png`;
      await shootRegion(page, page.locator(target).first(), path, { pad });
 
      manifest[tool] = manifest[tool] || [];
      manifest[tool].push({ file: `${tool}-${name}.png`, alt, ...pngSize(path) });
      // eslint-disable-next-line no-console
      console.log(`captured ${tool}-${name}`);
    }
 
    await page.close();
  }
 
  fs.writeFileSync('_data/previews.json', `${JSON.stringify(manifest, null, 2)}\n`);
  await browser.close();
})();
 