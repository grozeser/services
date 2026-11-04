// Скриншоты лендингов для портфолио Kwork: node shot.cjs <url> <имя> → <имя>-desktop.png, <имя>-phone.png, <имя>-full.png
const path = require('path');
const { createRequire } = require('module');
const { chromium } = createRequire('E:/Портфолио/omega-hakaton/e2e/')('@playwright/test');

const [url, name] = process.argv.slice(2);
const out = (s) => path.join(__dirname, `${name}-${s}.png`);

(async () => {
    const browser = await chromium.launch({ channel: 'msedge' });
    const errors = [];
    for (const [suffix, viewport, scale, full] of [
        ['desktop', { width: 1440, height: 900 }, 1, false],
        ['full', { width: 1440, height: 900 }, 1, true],
        ['phone', { width: 390, height: 844 }, 2, false], // fullPage на телефоне склеивался с повтором шапки
    ]) {
        const page = await browser.newPage({ viewport, deviceScaleFactor: scale });
        page.on('pageerror', (e) => errors.push(e.message));
        page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (overflow > 0) errors.push(`${suffix}: горизонтальный скролл ${overflow}px`);
        await page.screenshot({ path: out(suffix), fullPage: full });
        await page.close();
    }
    await browser.close();
    console.log(errors.length ? errors.join('\n') : 'ok, ошибок нет');
})().catch((e) => { console.error(e); process.exit(1); });
