// Кейсы «было → стало» для кворка «Правки сайта»: node cases.cjs → case-<имя>-before.png / -after.png
// «Стало» — живые страницы на GitHub Pages. «Было» — та же страница с возвращённой типичной ошибкой
// (часть из них — реальные баги, исправленные в этих проектах).
const path = require('path');
const { createRequire } = require('module');
const { chromium } = createRequire('E:/Портфолио/omega-hakaton/e2e/')('@playwright/test');

const PAGES = 'https://grozeser.github.io';
const CASES = [
    {   // реальный баг лендинга Talkie: правая плитка вылезала за карточку, стикер закрывал аватар
        name: 'overflow', url: `${PAGES}/english-landing/`, viewport: { width: 1440, height: 900 }, clip: '.lesson', pad: 40, // запас: ошибка вылезает за блок
        bug: { css: '.lesson__video{grid-template-columns:1.5fr 1fr}.tile--s{aspect-ratio:4/3.4}.sticker--a{top:38%;bottom:auto}' },
    },
    {   // реальный баг: кнопка в шапке переносилась на две строки на телефоне
        name: 'header', url: `${PAGES}/english-landing/`, viewport: { width: 390, height: 300 }, clip: '.header', scale: 2,
        bug: { css: '.btn--small{white-space:normal!important}.header__cta{padding:0 20px!important}.logo{font-size:26px!important}' },
    },
    {   // сайт без адаптива: на телефоне показывается уменьшенная версия для ПК
        name: 'mobile', url: `${PAGES}/remont-landing/`, viewport: { width: 390, height: 760 }, scale: 2, mobile: true,
        bug: { noViewport: true },
    },
    {   // форма уходила пустой и «благодарила» за заявку
        name: 'form', url: `${PAGES}/remont-landing/#form`, viewport: { width: 1440, height: 900 }, clip: '#leadForm',
        bug: { js: "document.getElementById('formOk').hidden=false;document.querySelector('#leadForm button').hidden=true" },
        fix: { js: "document.querySelector('#leadForm button').click()" },
    },
    {   // реальный баг ассистента: последний ответ прятался под кнопками-подсказками
        name: 'chat', url: `${PAGES}/ai-assistants-demo/#auto`, viewport: { width: 1180, height: 900 }, clip: '.chat',
        before: async (p) => {
            // длинная переписка, чтобы лента прокручивалась
            for (const q of ['Почём поменять масло?', 'Хочу переобуться на зимнюю резину', 'Загорелся check engine', 'Делаете кузовной ремонт?']) {
                const n = await p.locator('.msg--bot:not(.typing)').count();
                await p.fill('#input', q); await p.press('#input', 'Enter');
                await p.waitForFunction((k) => document.querySelectorAll('.msg--bot:not(.typing)').length > k, n);
            }
            await p.waitForTimeout(400);
        },
        bug: { js: "const l=document.getElementById('log');l.scrollTop=l.scrollHeight-l.clientHeight-70" },
    },
];

(async () => {
    const browser = await chromium.launch({ channel: 'msedge' });
    for (const c of CASES) {
        for (const state of ['before', 'after']) {
            const ctx = await browser.newContext({ viewport: c.viewport, deviceScaleFactor: c.scale || 1.5, isMobile: !!c.mobile, hasTouch: !!c.mobile });
            const page = await ctx.newPage();
            if (state === 'before' && c.bug.noViewport) {
                // без <meta viewport> мобильный браузер рисует страницу шириной 980 px и уменьшает её
                await page.route('**/remont-landing/', async (route) => {
                    const res = await route.fetch();
                    route.fulfill({ response: res, body: (await res.text()).replace(/<meta name="viewport"[^>]*>/, '') });
                });
            }
            await page.goto(c.url, { waitUntil: 'networkidle' });
            await page.evaluate(() => document.fonts.ready);
            if (c.before) await c.before(page);
            const step = state === 'before' ? c.bug : c.fix;
            if (step?.css) await page.addStyleTag({ content: step.css });
            if (step?.js) await page.evaluate(step.js);
            await page.waitForTimeout(500);
            const out = path.join(__dirname, `case-${c.name}-${state}.png`);
            if (c.pad) {
                const b = await page.locator(c.clip).first().boundingBox();
                await page.screenshot({ path: out, clip: { x: b.x - c.pad, y: b.y - c.pad, width: b.width + 2 * c.pad, height: b.height + 2 * c.pad } });
            } else if (c.clip) await page.locator(c.clip).first().screenshot({ path: out });
            else await page.screenshot({ path: out });
            await ctx.close();
        }
    }
    await browser.close();
    console.log('ok', CASES.length);
})().catch((e) => { console.error(e); process.exit(1); });
