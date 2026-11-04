"""Собирает README.md витрины услуг из данных ниже: python build_readme.py

Обложки — covers/*.png, работы — portfolio/*.png (карточки из render/cards.cjs и демо-проектов).
"""
from pathlib import Path

GH = "https://github.com/grozeser"
PAGES = "https://grozeser.github.io"


def demo(repo: str) -> str:
    return f"[демо]({PAGES}/{repo}/) · [код]({GH}/{repo})"


def code(repo: str) -> str:
    return f"[код]({GH}/{repo})"


SERVICES = [
    ("01-landing", "Лендинг под ключ", "Продающий одностраничный сайт: структура, адаптивная вёрстка, форма заявки, Метрика и публикация на вашем домене.",
     [("Эконом", "Первый экран и форма", "3 дня", "4 000"), ("Стандарт", "Лендинг до 7 блоков", "5 дней", "8 000"), ("Бизнес", "Лендинг + тексты и CRM", "7 дней", "15 000")],
     [("landing-barbershop", "Барбершоп Brass & Blade", demo("barbershop-landing")), ("landing-dental", "Стоматология White Mint", demo("dental-landing")),
      ("landing-chloris", "Цветочная студия «Хлорис»", demo("chloris-flower-landing")), ("landing-remont", "Ремонт квартир «Ровно»", demo("remont-landing")),
      ("landing-english", "Онлайн-школа Talkie", demo("english-landing"))]),
    ("02-markup", "Вёрстка по макету", "Точная адаптивная вёрстка из Figma: HTML, CSS, JavaScript, React или Next.js. Проверка на телефоне и во всех браузерах.",
     [("Эконом", "Один экран", "2 дня", "2 000"), ("Стандарт", "Страница до 7 блоков", "4 дня", "5 000"), ("Бизнес", "До 12 блоков с анимациями", "6 дней", "9 000")],
     [("markup-dental", "Next.js + Tailwind", demo("dental-landing")), ("markup-barbershop", "Astro + Tailwind", demo("barbershop-landing")),
      ("markup-omega", "React + TypeScript, личный кабинет", demo("omega-hakaton")), ("markup-chloris", "Чистый HTML/CSS/JS", demo("chloris-flower-landing")),
      ("markup-english", "Интерактив на JavaScript", demo("english-landing"))]),
    ("03-site-fixes", "Правки и доработка сайта", "Исправлю «поехавшую» вёрстку, неработающие формы, медленную загрузку; добавлю блоки и перенесу сайт.",
     [("Эконом", "1 небольшая правка", "1 день", "500"), ("Стандарт", "До 3 правок", "2 дня", "1 500"), ("Бизнес", "До 2 часов работы", "3 дня", "4 000")],
     [("fix-overflow", "Блок вылезал за край", demo("english-landing")), ("fix-header", "Кнопка ломала шапку на телефоне", demo("english-landing")),
      ("fix-mobile", "Сайт без адаптива", demo("remont-landing")), ("fix-form", "Пустые заявки с формы", demo("remont-landing")),
      ("fix-chat", "Ответ прятался под кнопками", demo("ai-assistants-demo"))]),
    ("04-chat-bot", "Чат-бот для бизнеса", "Бот принимает заявки и записывает клиентов вместо вас: меню, запись, каталог, оплата, уведомления менеджеру.",
     [("Эконом", "Бот-визитка: меню и заявки", "3 дня", "3 000"), ("Стандарт", "Бот с базой, админкой и рассылкой", "7 дней", "10 000"), ("Бизнес", "Бот с оплатой и CRM", "14 дней", "25 000")],
     [("bot-booking", "Запись в барбершоп", code("telegram-bots-demo")), ("bot-leads", "Квиз-заявки на ремонт", code("telegram-bots-demo")),
      ("bot-shop", "Предзаказ с оплатой", code("telegram-bots-demo")), ("bot-support", "Поддержка с оператором", code("telegram-bots-demo")),
      ("bot-school", "Тест уровня и запись", code("telegram-bots-demo"))]),
    ("05-ai-assistant", "Ассистент по базе знаний", "Отвечает клиентам по вашим ценам и условиям, показывает источник, а если ответа нет — зовёт менеджера, ничего не выдумывая.",
     [("Эконом", "FAQ до 30 вопросов", "4 дня", "8 000"), ("Стандарт", "По документам + заявки", "8 дней", "20 000"), ("Бизнес", "+ CRM, мессенджеры и сайт", "14 дней", "40 000")],
     [("ai-dental", "Стоматология", demo("ai-assistants-demo")), ("ai-shop", "Магазин одежды", demo("ai-assistants-demo")),
      ("ai-auto", "Автосервис", demo("ai-assistants-demo")), ("ai-hr", "HR-помощник для команды", demo("ai-assistants-demo")),
      ("ai-shturman", "Штурман: AI-агент (командный проект)", code("shturman"))]),
    ("06-parsing", "Парсинг сайтов", "Соберу данные с сайтов в Excel, CSV или Google Таблицы: без дублей, в едином формате, по расписанию.",
     [("Эконом", "1 сайт, до 1 000 строк", "1 день", "1 000"), ("Стандарт", "1 сайт, до 20 000 строк", "3 дня", "3 000"), ("Бизнес", "По расписанию + уведомления", "5 дней", "7 000")],
     [("parser-books", "Каталог магазина: 1 000 товаров", code("parsers-demo")), ("parser-quotes", "Сайт на JavaScript (Playwright)", code("parsers-demo")),
      ("parser-oscars", "Скрытое AJAX-API", code("parsers-demo")), ("parser-hockey", "Таблица с пагинацией", code("parsers-demo")),
      ("parser-client-search", "Поиск клиентов с карт", code("client-search"))]),
    ("07-automation", "Автоматизация заявок", "Заявки сами попадают в CRM и таблицу, менеджер получает уведомление, руководитель — отчёт. n8n на вашем сервере.",
     [("Эконом", "1 сценарий", "2 дня", "2 000"), ("Стандарт", "До 3 сценариев + CRM", "4 дня", "6 000"), ("Бизнес", "Сложная автоматизация + ИИ-шаги", "7 дней", "15 000")],
     [("auto-lead", "Заявка → CRM → Telegram", code("automation-demo")), ("auto-sheet", "Заявки в Google Таблицу", code("automation-demo")),
      ("auto-payment", "Оплата → статус и чек", code("automation-demo")), ("auto-report", "Отчёт каждое утро", code("automation-demo")),
      ("auto-feedback", "Отзывы: плохой — сразу руководителю", code("automation-demo"))]),
    ("08-sheets", "Формулы и отчёты в Excel", "Таблицы, которые считают сами: формулы, условное форматирование, дашборды и учёт заказов, остатков, финансов.",
     [("Эконом", "1 формула или скрипт", "1 день", "500"), ("Стандарт", "Таблица учёта или отчёт", "3 дня", "2 000"), ("Бизнес", "Система учёта с дашбордом", "5 дней", "5 000")],
     [("sheet-sales", "Дашборд продаж", code("excel-demo")), ("sheet-payroll", "Расчёт зарплаты", code("excel-demo")),
      ("sheet-stock", "Остатки склада", code("excel-demo")), ("sheet-cashflow", "Бюджет ДДС", code("excel-demo")),
      ("sheet-itmarket", "Справочник на 11 листов", "файл по запросу")]),
    ("09-server", "Запуск на сервере", "Опубликую сайт или бота: домен, HTTPS, Docker с автоперезапуском, резервные копии и инструкция.",
     [("Эконом", "Сайт + домен + HTTPS", "1 день", "1 500"), ("Стандарт", "Сайт или бот в Docker + бэкапы", "2 дня", "4 000"), ("Бизнес", "Несколько сервисов + мониторинг", "4 дня", "8 000")],
     [("deploy-stack", "Сайт + API + HTTPS в Docker", code("deploy-demo")), ("deploy-nginx", "nginx: HTTPS и защита", code("deploy-demo")),
      ("deploy-bot", "Бот 24/7 в Docker", code("deploy-demo")), ("deploy-ci", "Автодеплой через GitHub Actions", code("omega-hakaton")),
      ("deploy-pages", "7 сайтов с HTTPS", f"[все проекты]({GH})")]),
]


def section(i: int, s) -> str:
    cover, title, about, prices, works = s
    rows = "\n".join(f"| {p} | {d} | {t} | **{c} ₽** |" for p, d, t, c in prices)
    cells = [f'<td width="33%" valign="top"><a href="portfolio/{f}.png"><img src="portfolio/{f}.png" alt="{n}"></a><br><b>{n}</b><br>{l}</td>'
             for f, n, l in works]
    grid = "<table>\n<tr>" + "".join(cells[:3]) + "</tr>\n<tr>" + "".join(cells[3:]) + "</tr>\n</table>"
    return f"""## {i}. {title}

<img src="covers/{cover}.png" width="420" alt="{title}">

{about}

| Пакет | Что входит | Срок | Цена |
|---|---|---|---|
{rows}

{grid}

<p align="right"><a href="#услуги">↑ к списку услуг</a></p>
"""


def main() -> None:
    menu = "\n".join(f"| {i} | [{s[1]}](#{i}-{s[1].lower().replace(' ', '-')}) | от {s[3][0][3]} ₽ | {s[3][0][2]} |" for i, s in enumerate(SERVICES, 1))
    body = "\n".join(section(i, s) for i, s in enumerate(SERVICES, 1))
    readme = f"""# Сайты, боты и автоматизация для бизнеса

Делаю лендинги, чат-ботов, ассистентов по базе знаний, парсеры, автоматизацию заявок и таблицы, запускаю проекты на сервере. Каждую работу запускаю и проверяю сам: автотесты, проверка на телефоне, честные цифры.

Здесь — 9 услуг, по 5 работ в каждой. Почти у всех работ есть живое демо или открытый код.

## Услуги

| № | Услуга | Цена | Срок |
|---|---|---|---|
{menu}

{body}
## Как я работаю

1. Обсуждаем задачу и согласуем, что получится в итоге.
2. Делаю и показываю промежуточный результат на тестовом адресе.
3. Вношу правки (два круга входят в цену).
4. Передаю доступы, исходники и короткую инструкцию.

Компании в демо-работах вымышленные, данные синтетические. «Омега» и «Штурман» — командные проекты с хакатонов.
"""
    Path(__file__).with_name("README.md").write_text(readme, encoding="utf-8")
    missing = [f for s in SERVICES for f, _, _ in s[4] if not (Path(__file__).parent / "portfolio" / f"{f}.png").exists()]
    missing += [s[0] for s in SERVICES if not (Path(__file__).parent / "covers" / f"{s[0]}.png").exists()]
    assert not missing, f"нет файлов: {missing}"
    print("ok: README.md, услуг", len(SERVICES), "работ", sum(len(s[4]) for s in SERVICES))


if __name__ == "__main__":
    main()
