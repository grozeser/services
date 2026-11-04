// Проверка интерактива двух демо-лендингов + кадры для портфолио: node check.cjs
const assert = require('assert');
const path = require('path');
const { createRequire } = require('module');
const { chromium } = createRequire('E:/Портфолио/omega-hakaton/e2e/')('@playwright/test');

const BASE = process.argv[2] || 'http://127.0.0.1:5600'; // или https://grozeser.github.io
const shot = (name) => path.join(__dirname, `${name}.png`);

(async () => {
    const browser = await chromium.launch({ channel: 'msedge' });
    const errors = [];
    const open = async (url, viewport, scale = 1) => {
        const page = await browser.newPage({ viewport, deviceScaleFactor: scale });
        page.on('pageerror', (e) => errors.push(e.message));
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        return page;
    };
    const phone = { width: 390, height: 844 };
    const desktop = { width: 1440, height: 900 };

    // Ровно: калькулятор
    let p = await open(`${BASE}/remont-landing/`, desktop);
    assert.equal((await p.textContent('#sum')).replace(/\s/g, ' '), '657 600 ₽'); // 54 × 11 900 + вывоз мусора 15 000
    await p.click('.seg label:has-text("Вторичка")');
    await p.click('.checks label:has-text("Тёплый пол")');
    await p.locator('#area').fill('80');
    assert.equal(await p.textContent('#rWork'), (80 * 11900 * 1.1).toLocaleString('ru-RU') + ' ₽');
    await p.click('.tariff [data-tariff=design]');
    assert.ok(await p.isChecked('[name=tariff][value=design]'));
    await p.locator('#calc').screenshot({ path: shot('remont-calc') });
    // форма: пустая — ошибка, заполненная — успех
    await p.click('#leadForm button');
    assert.ok(await p.isVisible('#formError'));
    await p.fill('[name=name]', 'Иван');
    await p.fill('[name=phone]', '+7 900 123-45-67');
    await p.check('[name=agree]');
    await p.click('#leadForm button');
    assert.ok(await p.isVisible('#formOk'));
    await p.close();

    // Ровно: меню на телефоне
    p = await open(`${BASE}/remont-landing/`, phone, 2);
    await p.click('.burger');
    assert.ok(await p.isVisible('#nav a[href="#calc"]'));
    await p.screenshot({ path: shot('remont-phone-menu') });
    await p.click('#nav a[href="#calc"]');
    assert.ok(!(await p.isVisible('#nav a[href="#calc"]')));
    await p.waitForTimeout(800);
    await p.screenshot({ path: shot('remont-phone-calc') });
    await p.close();

    // Talkie: тест уровня, все ответы верные → B2 и уровень в форме
    p = await open(`${BASE}/english-landing/`, desktop);
    for (const answer of ['am', 'goes', 'saw', 'had', 'will have worked']) {
        await p.click(`.opt:text-is("${answer}")`);
    }
    assert.equal(await p.textContent('.quiz__level'), 'B2');
    assert.ok((await p.inputValue('[name=level]')).startsWith('B2'));
    await p.locator('#test').screenshot({ path: shot('english-quiz') });
    await p.click('#quizAgain');
    assert.equal(await p.textContent('#qStep'), 'Вопрос 1 из 5');
    await p.close();

    // Talkie: телефон — макет урока и цены
    p = await open(`${BASE}/english-landing/`, phone, 2);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.equal(overflow, 0, 'горизонтальный скролл на телефоне');
    await p.locator('.lesson').scrollIntoViewIfNeeded();
    await p.screenshot({ path: shot('english-phone-lesson') });
    await p.close();

    await browser.close();
    assert.deepEqual(errors, []);
    console.log('ok: все проверки прошли');
})().catch((e) => { console.error(e); process.exit(1); });
