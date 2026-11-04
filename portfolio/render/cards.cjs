// Карточки портфолио Kwork для лендингов, вёрстки, правок и запуска: node render/cards.cjs [префикс]
// Скриншоты — из shot.cjs (сайты на GitHub Pages) и cases.cjs (было → стало).
const path = require('path');
const { pathToFileURL } = require('url');
const { createRequire } = require('module');
const { chromium } = createRequire('E:/Портфолио/omega-hakaton/e2e/')('@playwright/test');

const dir = path.join(__dirname, '..');
const img = (name) => pathToFileURL(path.join(dir, name)).href;
const site = (repo) => `grozeser.github.io/${repo}`;
const TERMS = require('./terms.json'); // тексты терминала: вывод check.sh и конфиги deploy-demo

const CARDS = {
    // Кворк 1 — лендинг под ключ: первый экран на ПК
    'landing-barbershop': { accent: '#d97706', tag: 'Лендинг · Astro', title: 'Барбершоп <em>Brass & Blade</em>', sub: 'Тёмный премиальный лендинг с онлайн-записью',
        features: ['Услуги и цены', 'Мастера и отзывы', 'Запись в один клик', 'Адаптив под телефон'], image: img('barbershop-landing-desktop.png'), url: site('barbershop-landing'), badge: '<b>Живое демо</b> по ссылке' },
    'landing-dental': { accent: '#0d9488', tag: 'Лендинг · Next.js', title: 'Стоматология <em>White Mint</em>', sub: 'Лендинг клиники: доверие, цены и запись',
        features: ['Подбор лечения за 30 секунд', 'Цены и врачи', 'Отзывы и гарантии', 'Форма записи'], image: img('dental-landing-desktop.png'), url: site('dental-landing'), badge: '<b>Живое демо</b> по ссылке' },
    'landing-chloris': { accent: '#db2777', tag: 'Лендинг · HTML/CSS/JS', title: 'Цветочная студия <em>Хлорис</em>', sub: 'Нежный лендинг с каталогом букетов',
        features: ['Каталог букетов', 'Доставка и оплата', 'Форма заказа', 'Быстрая загрузка'], image: img('chloris-flower-landing-desktop.png'), url: site('chloris-flower-landing'), badge: '<b>Живое демо</b> по ссылке' },
    'landing-remont': { accent: '#ea580c', tag: 'Лендинг · HTML/CSS/JS', title: 'Ремонт квартир <em>«Ровно»</em>', sub: 'Продающий лендинг с калькулятором сметы',
        features: ['Калькулятор цены и срока', 'Тарифы за м²', 'Этапы, гарантии, FAQ', 'Заявка с расчётом'], image: img('remont-desktop.png'), url: site('remont-landing'), badge: '<b>Живое демо</b> по ссылке' },
    'landing-english': { accent: '#4f46e5', tag: 'Лендинг · HTML/CSS/JS', title: 'Онлайн-школа <em>Talkie</em>', sub: 'Лендинг школы английского с тестом уровня',
        features: ['Тест уровня на 5 вопросов', 'Форматы и цены', 'Преподаватели и отзывы', 'Запись на пробный урок'], image: img('english-desktop.png'), url: site('english-landing'), badge: '<b>Живое демо</b> по ссылке' },

    // Кворк 2 — вёрстка: ПК + телефон, акцент на адаптиве
    'markup-dental': { accent: '#0d9488', tag: 'Вёрстка · Next.js + Tailwind', title: 'Вёрстка <em>клиники</em>', sub: 'Адаптивная вёрстка с анимациями, статический экспорт',
        features: ['ПК, планшет, телефон', 'Next.js 16, Tailwind v4', 'Оптимизация картинок', 'Доступность и SEO'], image: img('dental-landing-desktop.png'), phone: img('dental-landing-phone.png'), url: site('dental-landing') },
    'markup-barbershop': { accent: '#d97706', tag: 'Вёрстка · Astro + Tailwind', title: 'Вёрстка <em>барбершопа</em>', sub: 'Тёмная тема, крупная типографика, лёгкая страница',
        features: ['Astro: почти без JS', 'Адаптив под все экраны', 'Анимации при скролле', 'Высокий PageSpeed'], image: img('barbershop-landing-desktop.png'), phone: img('barbershop-landing-phone.png'), url: site('barbershop-landing') },
    'markup-omega': { accent: '#2563eb', tag: 'Вёрстка · React + TypeScript', title: 'Интерфейс <em>личного кабинета</em>', sub: 'Кредитный кабинет для бизнеса: формы, таблицы, статусы',
        features: ['Сложные формы и шаги', 'Таблицы и фильтры', 'Тесты Playwright и CI', 'Командный проект'], image: img('omega-desktop.png'), phone: img('omega-phone.png'), url: site('omega-hakaton') },
    'markup-chloris': { accent: '#db2777', tag: 'Вёрстка · HTML/CSS/JS', title: 'Вёрстка <em>без фреймворков</em>', sub: 'Чистый HTML, CSS и JavaScript — легко править',
        features: ['Семантичная разметка', 'Адаптив на CSS Grid', 'Без библиотек', 'Готово к любому хостингу'], image: img('chloris-flower-landing-desktop.png'), phone: img('chloris-flower-landing-phone.png'), url: site('chloris-flower-landing') },
    'markup-english': { accent: '#4f46e5', tag: 'Вёрстка · HTML/CSS/JS', title: 'Интерактивная <em>вёрстка</em>', sub: 'Тест уровня, макет урока и форма — на чистом JS',
        features: ['Интерактивный квиз', 'Мобильное меню', 'Проверка формы', 'Автотесты на 390 px'], image: img('english-desktop.png'), phone: img('english-phone.png'), url: site('english-landing') },

    // Кворк 3 — правки: было → стало (cases.cjs)
    'fix-overflow': { accent: '#e11d48', tag: 'Правки · вёрстка', title: 'Блок <em>вылезал</em> за&nbsp;край', sub: 'Карточка ломала сетку, плашка закрывала фото',
        features: ['Нашёл причину в CSS Grid', 'Исправил без переделки блока', 'Проверил на всех экранах'], before: img('case-overflow-before.png'), after: img('case-overflow-after.png'), row: true },
    'fix-header': { accent: '#e11d48', tag: 'Правки · мобильная версия', title: 'Кнопка <em>ломала</em> шапку', sub: 'На телефоне кнопка переносилась на две строки',
        features: ['Шапка в одну строку', 'Кнопка остаётся крупной', 'Проверено на 390 px'], before: img('case-header-before.png'), after: img('case-header-after.png') },
    'fix-mobile': { accent: '#e11d48', tag: 'Правки · адаптив', title: 'Сайт <em>не&nbsp;адаптирован</em>', sub: 'На телефоне открывалась мелкая ПК-версия',
        features: ['Мобильная вёрстка', 'Меню-бургер', 'Крупные кнопки и текст', 'Без горизонтальной прокрутки'], before: img('case-mobile-before.png'), after: img('case-mobile-after.png'), row: true },
    'fix-form': { accent: '#e11d48', tag: 'Правки · формы', title: 'Заявки <em>приходили пустыми</em>', sub: 'Форма отправлялась без имени и телефона',
        features: ['Проверка имени и телефона', 'Согласие на обработку данных', 'Понятные подсказки об ошибках'], before: img('case-form-before.png'), after: img('case-form-after.png'), row: true },
    'fix-chat': { accent: '#e11d48', tag: 'Правки · JavaScript', title: 'Ответ <em>прятался</em> под&nbsp;кнопками', sub: 'Последнее сообщение чата уходило за край',
        features: ['Нашёл ошибку в прокрутке', 'Исправил одной строкой', 'Добавил автотест'], before: img('case-chat-before.png'), after: img('case-chat-after.png'), row: true },
    // Кворк 8 — таблицы: снимки листов из настоящего Excel (excel-demo/check.ps1)
    'sheet-sales': { accent: '#16a34a', tag: 'Excel · дашборд', title: 'Дашборд <em>продаж</em>', sub: 'Выбираете менеджера — пересчитывается всё',
        features: ['SUMIFS и COUNTIFS', 'Выпадающий список', 'План/факт с подсветкой', 'График по месяцам'], image: img('sheet-sales-raw.png'), url: 'sales.xlsx' },
    'sheet-payroll': { accent: '#16a34a', tag: 'Excel · зарплата', title: 'Расчёт <em>зарплаты</em>', sub: 'Табель → переработка ×1,5 → премия → НДФЛ',
        features: ['Норма и налог в настройках', 'Переработка подсвечивается', 'Итоги по отделу', 'Без ручных расчётов'], image: img('sheet-payroll-raw.png'), url: 'payroll.xlsx' },
    'sheet-stock': { accent: '#16a34a', tag: 'Excel · склад', title: 'Остатки <em>склада</em>', sub: 'Журнал прихода и расхода → остатки и сигнал заказа',
        features: ['Остаток по журналу', 'Подсветка «пора заказать»', 'Сколько докупить', 'Поиск по артикулу'], image: img('sheet-stock-raw.png'), url: 'stock.xlsx' },
    'sheet-cashflow': { accent: '#16a34a', tag: 'Excel · финансы', title: 'Бюджет <em>ДДС</em>', sub: 'Движение денег по месяцам: план и факт',
        features: ['Статьи доходов и расходов', 'Остаток на конец месяца', 'Отклонения от плана', 'График факт/план'], image: img('sheet-cashflow-raw.png'), url: 'cashflow.xlsx' },
    'sheet-itmarket': { accent: '#16a34a', tag: 'Excel · справочник', title: 'Справочник <em>на&nbsp;11 листов</em>', sub: 'IT-рынок России 2026: профессии, фриланс, налоги',
        features: ['Собран скриптом из данных', 'Оформление и фильтры', 'Ссылки на источники', 'Обновляется одной командой'], image: img('sheet-itmarket-raw.png'), url: 'IT_рынок_и_заработок_2026.xlsx' },
    // Кворк 9 — запуск: стенд deploy-demo проверен check.sh в Docker, плюс реальные публикации на GitHub Pages
    'deploy-stack': { accent: '#0ea5e9', tag: 'Сервер · Docker', title: 'Сайт + API <em>+ HTTPS</em>', sub: 'nginx, API заявок, бэкапы и бот в docker compose',
        features: ['Запуск одной командой', 'HTTPS и редирект с HTTP', 'Бэкапы базы с ротацией', '13 автопроверок после деплоя'], term: TERMS.check, url: 'deploy-demo — проверка стенда' },
    'deploy-nginx': { accent: '#0ea5e9', tag: 'Сервер · nginx', title: 'HTTPS и <em>защита</em>', sub: 'Конфиг под Let’s Encrypt, заголовки безопасности, gzip',
        features: ['TLS 1.2–1.3', 'HSTS, nosniff, X-Frame-Options', 'Кэш статики на 30 дней', 'Проксирование API'], term: TERMS.nginx, url: 'nginx/site.conf' },
    'deploy-bot': { accent: '#0ea5e9', tag: 'Сервер · бот', title: 'Бот <em>24/7</em> в&nbsp;Docker', sub: 'Telegram-бот на сервере с автоперезапуском',
        features: ['Токен в .env, не в коде', 'Автоперезапуск (restart policy)', 'Сценарии проверены в контейнере', 'Обновление одной командой'], term: TERMS.bot, url: 'telegram-bots-demo' },
    'deploy-ci': { accent: '#0ea5e9', tag: 'CI/CD · GitHub Actions', title: 'Автодеплой <em>при&nbsp;пуше</em>', sub: 'Тесты, сборка и публикация без ручных шагов',
        features: ['Тесты и Prettier на каждый коммит', 'Сборка и выкладка на Pages', 'Сразу видно, какой коммит сломал сборку', 'Командный проект Омега'], image: img('deploy-omega-actions-raw.png'), url: 'github.com/grozeser/omega-hakaton/actions' },
    'deploy-pages': { accent: '#0ea5e9', tag: 'Хостинг · HTTPS', title: 'Сайты <em>в&nbsp;работе</em>', sub: '7 проектов опубликованы с HTTPS и автообновлением',
        features: ['Лендинги, кабинет, ассистенты', 'HTTPS из коробки', 'Обновление при каждом пуше', 'Ссылки — в портфолио'], image: img('english-desktop.png'), phone: img('remont-phone.png'), url: 'grozeser.github.io' },
    // Кворк 7 — автоматизация: сценарии в настоящем n8n, проверены check.py (CRM/Telegram/таблица — заглушка)
    'auto-lead': { accent: '#ea4b71', tag: 'n8n · заявки', title: 'Заявка → <em>CRM</em> → Telegram', sub: 'Заявка с сайта попадает в CRM за секунду, менеджер получает сообщение',
        features: ['Телефон приводится к +7', 'Дубли не создаются — заметка к сделке', 'Заявка без телефона отклоняется', 'amoCRM, Битрикс24 или своя CRM'], image: img('auto-1-raw.png'), url: 'n8n — сценарий 1' },
    'auto-sheet': { accent: '#ea4b71', tag: 'n8n · таблицы', title: 'Заявки <em>в&nbsp;таблицу</em>', sub: 'Каждая заявка — новая строка в Google Таблице',
        features: ['Дата, имя, телефон', 'Источник рекламы (utm)', 'Страница, с которой пришли', 'Без ручного копирования'], image: img('auto-2-raw.png'), url: 'n8n — сценарий 2' },
    'auto-payment': { accent: '#ea4b71', tag: 'n8n · оплаты', title: 'Оплата → <em>статус</em> и&nbsp;чек', sub: 'Уведомление от платёжной системы обновляет сделку',
        features: ['Сделка → «Оплачено»', 'Письмо клиенту с суммой', 'Сообщение менеджеру', 'Отмены платежей пропускаются'], image: img('auto-3-raw.png'), url: 'n8n — сценарий 3' },
    'auto-report': { accent: '#ea4b71', tag: 'n8n · отчёты', title: 'Отчёт <em>каждое утро</em>', sub: 'Сводка по сделкам в Telegram в 9:00',
        features: ['Новые и оплаченные сделки', 'Сумма оплат', 'По расписанию или по запросу', 'Руководитель видит цифры сразу'], image: img('auto-4-raw.png'), url: 'n8n — сценарий 4' },
    'auto-feedback': { accent: '#ea4b71', tag: 'n8n · отзывы', title: 'Плохой отзыв — <em>сразу&nbsp;шефу</em>', sub: 'Оценка клиента запускает нужную реакцию',
        features: ['Оценка 1–3 → тревога руководителю', 'Оценка 4–5 → просьба об отзыве на картах', 'Негатив не уходит в публичные отзывы', 'Больше пятёрок на картах'], image: img('auto-5-raw.png'), url: 'n8n — сценарий 5' },
};

(async () => {
    const only = process.argv[2];
    const browser = await chromium.launch({ channel: 'msedge' });
    const page = await browser.newPage({ viewport: { width: 1320, height: 880 }, deviceScaleFactor: 1.5 });
    await page.goto(pathToFileURL(path.join(__dirname, 'card.html')).href);
    let n = 0;
    for (const [name, m] of Object.entries(CARDS)) {
        if (only && !name.startsWith(only)) continue;
        await page.evaluate((x) => window.renderCard(x), m);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForLoadState('networkidle');
        await page.locator('#card').screenshot({ path: path.join(dir, `${name}.png`) });
        n++;
    }
    await browser.close();
    console.log('ok', n);
})().catch((e) => { console.error(e); process.exit(1); });
