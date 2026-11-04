// Рендер обложек: node render.cjs → covers/*.png (1320×880) и covers/preview-phone.png (как в ленте на телефоне)
const path = require('path');
const { pathToFileURL } = require('url');
const { createRequire } = require('module');
const { chromium } = createRequire('E:/Портфолио/omega-hakaton/e2e/')('@playwright/test');

const dir = __dirname;
const url = pathToFileURL(path.join(dir, 'template.html')).href;

(async () => {
    const browser = await chromium.launch({ channel: 'msedge' });
    const page = await browser.newPage({ viewport: { width: 660, height: 440 }, deviceScaleFactor: 2 });
    await page.goto(`${url}#0`);
    const names = await page.evaluate(() => window.COVER_NAMES);
    for (const [i, name] of names.entries()) {
        await page.goto(`${url}#${i}`);
        await page.reload(); // хэш не перезапускает скрипт без перезагрузки
        await page.evaluate(() => document.fonts.ready);
        await page.locator('#cover').screenshot({ path: path.join(dir, `${name}.png`) });
    }
    // Превью: как обложки выглядят в ленте телефона (карточка ~170 px шириной)
    const html = `<body style="margin:0;background:#f5f5f7;display:grid;grid-template-columns:repeat(3,170px);gap:10px;padding:10px">${
        names.map((n) => `<img src="${n}.png" style="width:170px;border-radius:8px">`).join('')}</body>`;
    const file = path.join(dir, 'preview-phone.html');
    require('fs').writeFileSync(file, html);
    const preview = await browser.newPage({ viewport: { width: 560, height: 380 }, deviceScaleFactor: 2 });
    await preview.goto(pathToFileURL(file).href);
    await preview.waitForLoadState('load');
    require('fs').unlinkSync(file);
    await preview.screenshot({ path: path.join(dir, 'preview-phone.png'), fullPage: true });
    await browser.close();
    console.log('ok', names.length);
})().catch((e) => { console.error(e); process.exit(1); });
