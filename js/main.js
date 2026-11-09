(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isConstrainedDevice = Boolean(
    connection?.saveData ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
  );

  // Locale is defined by the document URL, not by replacing visible copy after
  // paint. This keeps the first render stable on both / and /en/.
  const currentLang = document.documentElement.lang === "en" ? "en" : "ru";
  const assetUrl = (relativePath) => currentLang === "en" ? `../${relativePath}` : relativePath;

  // Unified translation dictionary matching data-i18n attributes
  const translations = {
    "nav-about": { ru: "Обо мне", en: "About me" },
    "link-website": { ru: "Сайт", en: "Live Site" },
    "nav-services": { ru: "Что я создаю", en: "What I Create" },
    "nav-work-pricing": { ru: "Работы и цены", en: "Work & pricing" },
    "nav-quiz": { ru: "Квиз", en: "Quiz" },
    "nav-process": { ru: "Процесс работы", en: "Work Process" },
    "nav-contact": { ru: "Контакты", en: "Contacts" },
    "nav-faq": { ru: "FAQ", en: "FAQ" },
    "nav-github-btn": { ru: "Больше рабочих примеров", en: "More working examples" },
    "logo-name": { ru: "VLAD", en: "VLAD" },
    "hero-status": { ru: "Автоматизация продаж и рутины", en: "Sales and workflow automation" },
    "hero-eyebrow": { ru: "Влад · веб-инженер", en: "Vlad · web engineer" },
    "hero-title": {
      ru: "Сайты, боты и AI — от идеи до запуска",
      en: "Websites, bots and AI — from idea to launch"
    },
    "hero-subtitle": {
      ru: "Я создаю сайты, Telegram-ботов и AI-интеграции, которые берут на себя рутину и помогают бизнесу быстрее работать с клиентами.",
      en: "I build websites, Telegram bots and AI integrations that take over routine work and help businesses respond to customers faster."
    },
    "hero-cta-cases": { ru: "Получить оценку стоимости", en: "Get a budget estimate" },
    "hero-cta-discuss": { ru: "Обсудить проект", en: "Discuss a project" },
    "hero-step-brief": { ru: "Задача", en: "Brief" },
    "hero-step-architecture": { ru: "Сценарий", en: "Flow" },
    "hero-step-build": { ru: "Сборка", en: "Build" },
    "hero-step-launch": { ru: "Запуск", en: "Launch" },
    "hero-process-note": { ru: "Один инженер. Единая ответственность.", en: "One engineer. Clear ownership." },
    "hero-badge-web": { ru: "Web", en: "Web" },
    "hero-badge-web-desc": { ru: "Разработка сайтов и лендингов", en: "Website & Landing Page Development" },
    "hero-badge-saas": { ru: "SaaS", en: "SaaS" },
    "hero-badge-saas-desc": { ru: "Веб-приложения и сервисы", en: "Web Applications & Services" },
    "hero-badge-ai": { ru: "AI", en: "AI" },
    "hero-badge-ai-desc": { ru: "ИИ-инструменты и интеграции", en: "AI Tools & Integrations" },
    "hero-badge-dash": { ru: "Dashboards", en: "Dashboards" },
    "hero-badge-dash-desc": { ru: "Аналитика и визуализация", en: "Analytics & Visualization" },
    "hero-badge-auto": { ru: "Automation", en: "Automation" },
    "hero-badge-auto-desc": { ru: "Скрипты и автоматизация", en: "Scripts & Automation" },
    "stat-experience": { ru: "7+ Лет опыта", en: "7+ Years Experience" },
    "stat-projects": { ru: "50+ Проектов", en: "50+ Completed Projects" },
    "stat-clients": { ru: "30+ Клиентов", en: "30+ Happy Clients" },
    "stat-focus": { ru: "100% Фокус на результате", en: "100% Focus on Results" },
    "stat-experience-lbl": { ru: "Один ответственный", en: "One accountable engineer" },
    "stat-projects-lbl": { ru: "Направления работы", en: "Work directions" },
    "stat-real-cases-value": { ru: "Реальные", en: "Real" },
    "stat-real-cases-lbl": { ru: "кейсы", en: "cases" },
    "stat-clients-lbl": { ru: "Клиентов", en: "Happy Clients" },
    "stat-focus-lbl": { ru: "Фокус на результате", en: "Focus on Results" },
    "hero-widget-title": { ru: "Системный конвейер связок", en: "Turnkey Connection Pipeline" },
    "widget-console-logs": { ru: "system.log", en: "system.log" },
    "about-status-ready": { ru: "Доступен для новых проектов", en: "Available for new projects" },
    "about-proof-title": { ru: "Подтверждённый опыт", en: "Proven experience" },
    "about-proof-heading": { ru: "Обо мне", en: "About me" },
    "about-proof-years": { ru: "лет в разработке", en: "years in development" },
    "about-proof-projects": { ru: "коммерческих проектов", en: "commercial projects" },
    "about-proof-rating": { ru: "звёзд на фриланс-биржах", en: "stars on freelance platforms" },

    // About Section
    "about-proof-eyebrow": { ru: "Как я работаю", en: "How I work" },
    "about-title-main": { ru: "Один ответственный за результат, а не набор разрозненных подрядчиков", en: "One person accountable for the result — not a chain of disconnected contractors" },
    "about-p1": {
      ru: "Я разбираю бизнес-задачу, собираю рабочий сценарий и довожу проект до запуска.",
      en: "I clarify the business task, assemble the working flow and bring the project to launch."
    },
    "about-p2": {
      ru: "Помогаю не только сделать сайт, бота или AI-инструмент, но и понять, как это будет приводить заявки, экономить время и двигать проект дальше.",
      en: "I do not just build a website, bot or AI tool. I help shape how it will bring leads, save time and move the project forward."
    },

    // Category Tabs & Showcases
    "services-title-main": { ru: "Что я создаю", en: "What I create" },
    "services-subtitle": { ru: "Сайты, Telegram-боты, калькуляторы, AI и автоматизация для заявок, продаж и сокращения ручной работы.", en: "Websites, Telegram bots, calculators, AI and automation for leads, sales and less manual work." },
    "price-from": { ru: "от", en: "from" },
    "quiz-disclosure-title": { ru: "Нужна точная оценка?", en: "Need a precise estimate?" },
    "quiz-disclosure-subtitle": { ru: "Соберите мини-ТЗ за 2 минуты", en: "Build a mini brief in 2 minutes" },
    "quiz-title": { ru: "Соберите мини-ТЗ за 2 минуты", en: "Build a mini brief in 2 minutes" },
    "quiz-subtitle": { ru: "Ответьте на несколько вопросов карточками. В конце получится понятная сводка проекта для оценки сроков и бюджета.", en: "Answer a few card-based questions. At the end you get a clear project summary for estimating timeline and budget." },
    "quiz-step-1": { ru: "Что нужно?", en: "What do you need?" },
    "quiz-step-2": { ru: "Какие функции нужны?", en: "What features are needed?" },
    "quiz-step-3": { ru: "Есть ли материалы?", en: "Do you have materials?" },
    "quiz-step-4": { ru: "Сроки", en: "Timeline" },
    "quiz-step-5": { ru: "Бюджет", en: "Budget" },
    "quiz-step-6": { ru: "Контакт и сводка", en: "Contact and summary" },
    "quiz-need-site": { ru: "Сайт-визитка", en: "Small website" },
    "quiz-need-landing": { ru: "Лендинг", en: "Landing page" },
    "quiz-need-bot": { ru: "Telegram-бот", en: "Telegram bot" },
    "quiz-need-ai": { ru: "AI-консультант", en: "AI consultant" },
    "quiz-need-calc": { ru: "Квиз-калькулятор", en: "Quiz calculator" },
    "quiz-need-other": { ru: "Другое", en: "Other" },
    "quiz-custom-project-label": { ru: "Свой вариант", en: "Custom option" },
    "quiz-custom-project-placeholder": {
      ru: "Например: личный кабинет, внутренняя CRM, сервис для клиентов",
      en: "For example: client account, internal CRM, client portal"
    },
    "quiz-feature-leads": { ru: "Приём заявок", en: "Lead capture" },
    "quiz-feature-pay": { ru: "Оплата", en: "Payments" },
    "quiz-feature-calendar": { ru: "Календарь записи", en: "Booking calendar" },
    "quiz-feature-crm": { ru: "Интеграция с CRM", en: "CRM connection" },
    "quiz-feature-ai": { ru: "AI-ответы", en: "AI replies" },
    "quiz-feature-admin": { ru: "Админ-панель", en: "Admin panel" },
    "quiz-custom-features-label": { ru: "Другие функции или сервисы", en: "Other features or services" },
    "quiz-custom-features-placeholder": {
      ru: "Например: WhatsApp, таблицы, рассылки, личный кабинет, уведомления менеджеру",
      en: "For example: WhatsApp, sheets, broadcasts, client account, manager notifications"
    },
    "quiz-materials-ready": { ru: "Есть тексты и фото", en: "Texts and photos ready" },
    "quiz-materials-part": { ru: "Есть частично", en: "Partly ready" },
    "quiz-materials-turnkey": { ru: "Ничего нет, нужно под ключ", en: "Nothing ready, turnkey needed" },
    "quiz-custom-materials-label": { ru: "Что уже есть или чего не хватает", en: "What already exists or is missing" },
    "quiz-custom-materials-placeholder": {
      ru: "Например: есть логотип и фото, но нет текста и структуры",
      en: "For example: logo and photos are ready, but copy and structure are missing"
    },
    "quiz-time-fast": { ru: "Срочно, до недели", en: "Urgent, under a week" },
    "quiz-time-normal": { ru: "2–3 недели", en: "2–3 weeks" },
    "quiz-time-month": { ru: "Месяц+", en: "A month+" },
    "quiz-time-calm": { ru: "Не горит", en: "No rush" },
    "quiz-budget-1": { ru: "до 15 000 ₽", en: "up to 15,000 ₽" },
    "quiz-budget-2": { ru: "15–40 000 ₽", en: "15–40,000 ₽" },
    "quiz-budget-3": { ru: "40–80 000 ₽", en: "40–80,000 ₽" },
    "quiz-budget-talk": { ru: "Обсудим", en: "Let's discuss" },
    "quiz-summary-title": { ru: "Вот что мы собрали", en: "Here is the brief" },
    "quiz-name-label": { ru: "Имя", en: "Name" },
    "quiz-name-placeholder": { ru: "Как к вам обращаться", en: "How should I address you" },
    "quiz-contact-label": { ru: "Telegram или телефон", en: "Telegram or phone" },
    "quiz-contact-placeholder": { ru: "@username или номер", en: "@username or phone number" },
    "quiz-custom-notes-label": { ru: "Что важно учесть", en: "What should be considered" },
    "quiz-custom-notes-placeholder": {
      ru: "Ниша, ссылка на текущий сайт/канал, пожелания, что сейчас мешает продажам",
      en: "Niche, current website/channel link, preferences, what blocks sales now"
    },
    "quiz-back": { ru: "Назад", en: "Back" },
    "quiz-next": { ru: "Дальше", en: "Next" },
    "quiz-submit": { ru: "Получить ТЗ и оценку", en: "Get brief and estimate" },
    "quiz-copy": { ru: "Скопировать ТЗ", en: "Copy brief" },
    "quiz-copy-open": { ru: "Скопировать и открыть Telegram", en: "Copy and open Telegram" },
    "quiz-copy-done": { ru: "ТЗ скопировано. Вставьте его в сообщение Telegram.", en: "Brief copied. Paste it into your Telegram message." },
    "quiz-copy-error": { ru: "Не удалось скопировать автоматически. Выделите текст выше и скопируйте вручную.", en: "Automatic copy failed. Select the text above and copy it manually." },
    "quiz-open-telegram": { ru: "Открыть Telegram без копирования", en: "Open Telegram without copying" },
    "quiz-success-title": { ru: "Мини-ТЗ готово", en: "Your mini brief is ready" },
    "quiz-success-desc": { ru: "Скопируйте сводку и откройте Telegram. Сообщение отправится только после того, как вы вставите его в чат.", en: "Copy the summary and open Telegram. The message is sent only after you paste it into the chat." },
    "quiz-error-choice": { ru: "Выберите вариант, чтобы продолжить.", en: "Choose an option to continue." },
    "quiz-error-contact": { ru: "Укажите имя и Telegram или телефон.", en: "Enter your name and Telegram or phone." },
    "quiz-summary-project": { ru: "Формат", en: "Format" },
    "quiz-summary-features": { ru: "Функции", en: "Features" },
    "quiz-summary-materials": { ru: "Материалы", en: "Materials" },
    "quiz-summary-timeline": { ru: "Сроки", en: "Timeline" },
    "quiz-summary-budget": { ru: "Бюджет", en: "Budget" },
    "quiz-summary-context": { ru: "Уточнения", en: "Notes" },
    "faq-title": { ru: "Частые вопросы", en: "FAQ" },
    "faq-page-kicker": { ru: "Сроки · оплата · поддержка", en: "Timing · payment · support" },
    "faq-back-home": { ru: "На главную", en: "Back home" },
    "faq-cta-title": { ru: "Не нашли ответ?", en: "Still have a question?" },
    "faq-cta-subtitle": { ru: "Обсудим задачу в Telegram.", en: "Let us discuss it on Telegram." },
    "faq-subtitle": { ru: "Коротко о сроках, оплате, старте и поддержке после запуска.", en: "Short answers about timing, payment, start and post-launch support." },
    "faq-q1": { ru: "Сколько времени занимает проект?", en: "How long does a project take?" },
    "faq-a1": { ru: "Telegram-бот обычно занимает 3–10 дней. Небольшой сайт чаще укладывается в 5–10 рабочих дней. Запуск под ключ занимает 1–4 недели.", en: "A Telegram bot usually takes 3–10 days. A small website often takes 5–10 working days. A turnkey launch takes 1–4 weeks." },
    "faq-q2": { ru: "Что если у меня нет ТЗ?", en: "What if I do not have a brief?" },
    "faq-a2": { ru: "Составим вместе. Квиз на главной помогает быстро собрать задачу, функции, сроки, материалы и бюджет.", en: "We will assemble it together. The quiz on the main page helps collect the task, features, timeline, materials and budget." },
    "faq-q3": { ru: "Как происходит оплата?", en: "How does payment work?" },
    "faq-a3": { ru: "Обычно проект делится на этапы: стартовая предоплата, согласование ключевого результата и финальная оплата перед запуском.", en: "Usually the project is split into stages: initial prepayment, approval of the key result, and final payment before launch." },
    "faq-q4": { ru: "Вносите ли правки после сдачи?", en: "Do you make revisions after delivery?" },
    "faq-a4": { ru: "Да. После запуска есть период поддержки, чтобы поправить мелочи и убедиться, что сценарии работают стабильно.", en: "Yes. After launch there is a support period to adjust details and make sure the flows work reliably." },
    "faq-q5": { ru: "Что нужно от меня для старта?", en: "What do you need from me to start?" },
    "faq-a5": { ru: "Описание услуги, контакты, материалы по бренду, примеры, доступы к нужным сервисам и понимание желаемого результата.", en: "Service description, contacts, brand materials, examples, access to needed services and the desired result." },
    "faq-q6": { ru: "Работаете ли с существующим сайтом или ботом?", en: "Can you work with an existing website or bot?" },
    "faq-a6": { ru: "Да, можно доработать текущий сайт, Telegram-бот, квиз или автоматизацию, если есть доступы и понятна задача.", en: "Yes, an existing website, Telegram bot, quiz or automation can be improved if access and the task are clear." },
    "faq-q7": { ru: "Что входит в поддержку после запуска?", en: "What does post-launch support include?" },
    "faq-a7": { ru: "Разбор критичных сбоев, консультации по работе сценариев и мелкие корректировки в рамках договорённости.", en: "Critical issue review, consultations on flows and small adjustments within the agreement." },
    "faq-q8": { ru: "Даёте ли гарантию на работу?", en: "Do you provide a guarantee?" },
    "faq-a8": { ru: "Да, гарантия распространяется на исправление ошибок в реализованной логике после запуска, если сценарий используется в согласованном виде.", en: "Yes, the guarantee covers fixing errors in the implemented logic after launch if the flow is used as agreed." },
    "services-kpi-directions": { ru: "Направлений", en: "Directions" },
    "services-kpi-system": { ru: "Система под ключ", en: "Turnkey System" },
    "tab-web": { ru: "Аналитика продаж", en: "Sales analytics" },
    "tab-web-sub": { ru: "Контроль выручки и остатков", en: "Revenue and stock control" },
    "tab-webapps": { ru: "Калькуляторы", en: "Cost calculators" },
    "tab-webapps-sub": { ru: "Оценка стоимости до заявки", en: "Budget estimate before a lead" },
    "tab-saas": { ru: "Регламентные задачи", en: "Scheduled tasks" },
    "tab-saas-sub": { ru: "Работа по расписанию", en: "Work by schedule" },
    "tab-ai": { ru: "Сбор данных", en: "Data collection" },
    "tab-ai-sub": { ru: "Готовые отчёты вместо ручного поиска", en: "Ready reports instead of manual search" },
    "tab-dash": { ru: "Отчёты", en: "Reports" },
    "tab-dash-sub": { ru: "Цифры для решений", en: "Numbers for decisions" },
    "tab-scripts": { ru: "Рутина", en: "Routine work" },
    "tab-scripts-sub": { ru: "Меньше ручной работы", en: "Less manual work" },
    "tab-bots": { ru: "Telegram-боты", en: "Telegram Bots" },
    "tab-bots-sub": { ru: "Заявки, запись и ответы", en: "Leads, booking and answers" },
    "tab-api": { ru: "Связка сервисов", en: "Service sync" },
    "tab-api-sub": { ru: "CRM, оплаты, таблицы", en: "CRM, payments, sheets" },
    "tab-landings": { ru: "Лендинги и сайты", en: "Landings & websites" },
    "tab-landings-sub": { ru: "Путь клиента к заявке", en: "Customer path to a lead" },

    "showcase-web-title": { ru: "Контроль продаж, остатков и финансов в одном окне", en: "Sales, stock and finance control in one screen" },
    "showcase-webapps-title": { ru: "Калькулятор стоимости до заявки", en: "Cost estimate before the lead" },
    "showcase-saas-title": { ru: "Регулярные задачи без ручного контроля", en: "Scheduled tasks without manual control" },
    "showcase-ai-title": { ru: "Сбор данных для отчётов и решений", en: "Data collection for reports and decisions" },
    "showcase-dash-title": { ru: "Отчёты для управления продажами", en: "Reports for managing sales" },
    "showcase-scripts-title": { ru: "AI помогает готовить контент для Telegram", en: "AI helps prepare Telegram content" },
    "showcase-bots-title": { ru: "Telegram-боты для записи и оплат", en: "Telegram bots for booking and payments" },
    "showcase-api-title": { ru: "CRM, оплаты и таблицы работают вместе", en: "CRM, payments and sheets work together" },
    "showcase-landings-title": { ru: "Лендинги и сайты: премиальная подача услуги", en: "Landings & websites: premium service presentation" },

    // Showcase value/application details
    "showcase-lbl-use": { ru: "ПРИМЕНЕНИЕ:", en: "USE CASE:" },
    "showcase-lbl-strength": { ru: "СИЛЬНАЯ СТОРОНА:", en: "STRENGTH:" },
    "showcase-lbl-where": { ru: "ГДЕ ИСПОЛЬЗОВАТЬ:", en: "WHERE IT FITS:" },
    "lbl-problem": { ru: "ПРОБЛЕМА:", en: "PROBLEM:" },
    "lbl-solution": { ru: "РЕШЕНИЕ:", en: "SOLUTION:" },
    "lbl-result": { ru: "РЕЗУЛЬТАТ:", en: "RESULT:" },

    "showcase-web-prob": { ru: "Продажи, остатки и финансы сложно сводить вручную.", en: "Sales, stock and finance are hard to combine manually." },
    "showcase-web-sol": { ru: "Понятный экран с динамикой, товарами и операционными срезами.", en: "A clear screen with trends, products and operational slices." },
    "showcase-web-res": { ru: "Ежедневные решения по закупкам и продажам без ручной сводки.", en: "Daily purchasing and sales decisions without manual consolidation." },

    "showcase-webapps-prob": { ru: "Клиент хочет понять бюджет до разговора с менеджером.", en: "A customer wants to understand the budget before talking to a manager." },
    "showcase-webapps-sol": { ru: "Параметры, пакеты, опции и итог собраны в пошаговый сценарий.", en: "Parameters, packages, options and total are combined into a step-by-step flow." },
    "showcase-webapps-res": { ru: "Более тёплая заявка и меньше времени на первичный расчёт.", en: "Warmer leads and less time spent on initial estimates." },

    "showcase-saas-prob": { ru: "Регулярные действия часто держатся на памяти сотрудника.", en: "Recurring actions often depend on an employee remembering them." },
    "showcase-saas-sol": { ru: "Расписание, уведомления и контроль статуса работают автоматически.", en: "Schedule, notifications and status control run automatically." },
    "showcase-saas-res": { ru: "Меньше ручного контроля и ниже риск пропустить важное действие.", en: "Less manual control and lower risk of missing an important task." },

    "showcase-ai-prob": { ru: "Нужные данные приходится искать, копировать и чистить вручную.", en: "Useful data has to be searched, copied and cleaned manually." },
    "showcase-ai-sol": { ru: "Сбор, проверка и подготовка отчёта проходят по одному сценарию.", en: "Collection, checks and report preparation follow one flow." },
    "showcase-ai-res": { ru: "Готовые выгрузки для отчётов, продаж и внутренних справочников.", en: "Ready exports for reports, sales and internal directories." },

    "showcase-dash-prob": { ru: "Цифры есть, но решения тормозят разрозненные отчёты.", en: "Data exists, but fragmented reports slow decisions." },
    "showcase-dash-sol": { ru: "Метрики, фильтры и срезы собраны в быстрый рабочий экран.", en: "Metrics, filters and slices are collected in a fast work screen." },
    "showcase-dash-res": { ru: "Продажи, склад, финансы, заявки или контент-план.", en: "Sales, stock, finance, leads or content planning." },

    "showcase-scripts-prob": { ru: "Регулярные посты в Telegram без ручной подготовки с нуля.", en: "Regular Telegram posts without manual work from scratch." },
    "showcase-scripts-sol": { ru: "AI готовит текст, изображение, превью и публикацию.", en: "AI prepares copy, image, preview and publishing." },
    "showcase-scripts-res": { ru: "Контент-каналы, рубрики, подборки и обучение.", en: "Content channels, columns, digests and education." },

    "showcase-bots-prob": { ru: "Запись прямо в Telegram без звонков и ожидания ответа.", en: "Booking in Telegram without calls or waiting." },
    "showcase-bots-sol": { ru: "Услуга, время, подтверждение и заявка в одном сценарии.", en: "Service, time, confirmation and request in one flow." },
    "showcase-bots-res": { ru: "Запись, консультации, мини-CRM и уведомления.", en: "Booking, consultations, mini-CRM and notifications." },

    "showcase-api-prob": { ru: "CRM, оплаты и таблицы часто живут отдельно друг от друга.", en: "CRM, payments and sheets often live separately." },
    "showcase-api-sol": { ru: "Заявки, оплаты и статусы автоматически расходятся по нужным сервисам.", en: "Leads, payments and statuses automatically move to the right services." },
    "showcase-api-res": { ru: "Заявки, оплаты, отчёты, Sheets и уведомления.", en: "Leads, payments, reports, Sheets and notifications." },

    "showcase-landings-prob": { ru: "Услуге нужен сайт с понятной подачей и быстрым путём к заявке.", en: "A service needs a clear site and a direct lead path." },
    "showcase-landings-sol": { ru: "Визуальная система, адаптив и понятный путь к заявке.", en: "Visual system, responsive layout and a clear lead path." },
    "showcase-landings-res": { ru: "Услуги, консультации, обучение и промо-страницы.", en: "Services, consultations, education and promo pages." },

    "feat-design": { ru: "Адаптивный дизайн", en: "Responsive Design" },
    "feat-speed": { ru: "Высокая скорость", en: "Ultimate Speed" },
    "feat-seo": { ru: "Поиск клиентов", en: "Customer search" },
    "feat-security": { ru: "Безопасность", en: "High Security" },
    "feat-scale": { ru: "Запас для роста", en: "Room to grow" },
    "feat-rbac": { ru: "Ролевой доступ", en: "RBAC Control" },
    "feat-llm": { ru: "AI-помощник", en: "AI assistant" },
    "feat-vector": { ru: "База знаний", en: "Knowledge base" },
    "feat-247": { ru: "Авто-ответы 24/7", en: "24/7 Auto-replies" },
    "feat-d3": { ru: "Наглядные графики", en: "Clear charts" },
    "feat-realtime": { ru: "Реальное время", en: "Real-time updates" },
    "feat-filter": { ru: "Фильтрация данных", en: "Data Filtering" },
    "feat-cron": { ru: "Работа по расписанию", en: "Scheduled work" },
    "feat-parsing": { ru: "Сбор данных", en: "Data collection" },
    "feat-fault": { ru: "Отказоустойчивость", en: "Fault Tolerance" },
    "feat-python": { ru: "Диалог в Telegram", en: "Telegram dialogue" },
    "feat-payments": { ru: "Прием оплат", en: "Payment Gateways" },
    "feat-webapps": { ru: "Кабинеты и формы", en: "Work screens and forms" },
    "feat-crm": { ru: "CRM и оплаты", en: "CRM and payments" },
    "feat-auto-updates": { ru: "Автообновления", en: "Auto updates" },
    "feat-sync": { ru: "Синхронизация данных", en: "Data Synchronization" },
    "feat-ui": { ru: "UI-состояния", en: "Responsive UI States" },
    "feat-live": { ru: "Live-сайт", en: "Live site" },
    "feat-vercel": { ru: "Публикация сайта", en: "Website launch" },
    "feat-ops": { ru: "Операционный контроль", en: "Operational control" },
    "feat-presale": { ru: "Пресейл-инструмент", en: "Presales tool" },
    "feat-client-flow": { ru: "Клиентский сценарий", en: "Client flow" },
    "feat-backup": { ru: "Резервные процессы", en: "Backup routine" },
    "feat-data-ready": { ru: "Данные к анализу", en: "Analysis-ready data" },
    "feat-decisions": { ru: "Решения по цифрам", en: "Data decisions" },
    "feat-content": { ru: "Регулярный контент", en: "Recurring content" },
    "feat-booking": { ru: "Запись без менеджера", en: "Manager-free booking" },
    "feat-leads": { ru: "Путь к заявке", en: "Lead path" },

    "widget-btn-examples": { ru: "Примеры проектов", en: "Project Examples" },
    "showcase-open-repo": { ru: "Посмотреть пример", en: "View example" },
    "showcase-open-site": { ru: "Открыть сайт", en: "Open Site" },
    "mock-web-hero-title": { ru: "Терапия, в которой можно выдохнуть", en: "Therapy where you can breathe out" },
    "mock-web-hero-sub": { ru: "Спокойная посадочная страница для психолога с записью на консультацию.", en: "Calm psychologist landing page with direct consultation booking." },
    "mock-web-cta": { ru: "Записаться", en: "Book a Session" },
    "mock-web-s1": { ru: "Формат", en: "Format" },
    "mock-web-s2": { ru: "Сессии", en: "Sessions" },
    "mock-web-s3": { ru: "Запись", en: "Booking" },
    "mock-web-s4": { ru: "Поддержка", en: "Support" },
    "mock-ai-msg1": { ru: "Как я могу помочь вам сегодня?", en: "How can I assist you today?" },
    "mock-ai-msg2": { ru: "Сделай мне саммари по ТЗ и проекту.", en: "Compile a brief summary for the system spec." },
    "mock-dash-t": { ru: "Аналитика продаж", en: "Sales Analytics" },
    "mock-tg-msg1": { ru: "Привет! Какая стоимость сборки интеграции amoCRM?", en: "Hi! What's the budget for amoCRM database synchronization?" },
    "mock-tg-msg2": { ru: "Привет! От 15 000 руб, срок 2 дня. Какой у вас триггер?", en: "Hello! From 15,000 RUB, takes 2 days. What trigger event do you have?" },

    // Cases Section
    "cases-title-main": { ru: "Работы и цены", en: "Work & pricing" },
    "case-kind-demo": { ru: "Демо-концепт", en: "Demo concept" },
    "case-kind-working": { ru: "Рабочий пример", en: "Working example" },
    "case-similar-launch": { ru: "Подобный запуск", en: "Similar launch" },
    "cases-turnkey-label": { ru: "Комплексный запуск: сайт + Telegram + AI + аналитика", en: "Turnkey launch: website + Telegram + AI + analytics" },
    "cases-subtitle": {
      ru: "Рабочие примеры сайтов, ботов и автоматизаций: фокус на заявках, продажах и сокращении ручной работы.",
      en: "Working examples of websites, bots and automations focused on leads, sales and reducing manual work."
    },
    "about-editorial-p1": {
      ru: "Разбираю задачу, собираю рабочий сценарий и довожу его до запуска — без передачи ответственности между разными исполнителями.",
      en: "I clarify the task, assemble a working flow and take it to launch — without passing responsibility between separate contractors."
    },
    "about-editorial-p2": {
      ru: "Сайт, Telegram, AI, уведомления и отчётность работают как одна система, а не как набор несвязанных инструментов.",
      en: "Website, Telegram, AI, notifications and reporting work as one system instead of disconnected tools."
    },
    "about-proof-experience-label": { ru: "Опыт", en: "Experience" },
    "about-proof-experience-title": { ru: "лет в разработке", en: "years in development" },
    "about-proof-experience-desc": {
      ru: "Продажи, заявки, запись клиентов, отчётность и сокращение ручной работы.",
      en: "Sales, leads, client booking, reporting and reducing manual work."
    },
    "about-proof-projects-label": { ru: "Практика", en: "Practice" },
    "about-proof-projects-title": { ru: "коммерческих проектов", en: "commercial projects" },
    "about-proof-projects-desc": {
      ru: "От сайтов для заявок до Telegram-ботов, AI-консультантов и автоматизации процессов.",
      en: "From lead-focused websites to Telegram bots, AI consultants and workflow automation."
    },
    "about-proof-rating-label": { ru: "Репутация", en: "Reputation" },
    "about-proof-rating-title": { ru: "на фриланс-площадках", en: "on freelance platforms" },
    "about-proof-rating-desc": {
      ru: "За сроки, коммуникацию, аккуратную реализацию и поддержку после запуска.",
      en: "For timing, communication, careful implementation and post-launch support."
    },
    "cases-show-more": { ru: "Показать больше", en: "Show more" },
    "cases-show-less": { ru: "Скрыть проекты", en: "Hide projects" },
    "case-open": { ru: "Открыть", en: "Open" },
    "case-open-details": { ru: "Подробнее", en: "View details" },
    "lbl-task": { ru: "Задача", en: "Task" },
    "lbl-solution": { ru: "Решение", en: "Solution" },
    "lbl-interface": { ru: "Интерфейс", en: "Interface" },
    "lbl-role": { ru: "Задача", en: "Task" },
    "lbl-stack": { ru: "Результат", en: "Outcome" },
    "c1-role-desc": { ru: "Убрать ручное сведение таблиц и дать владельцу понятную картину по магазину.", en: "Remove manual spreadsheet consolidation and give the owner a clear store overview." },
    "c2-role-desc": { ru: "Сократить время первичного расчёта и дать менеджеру понятный инструмент для консультации.", en: "Reduce the time needed for an initial estimate and give the manager a clear consultation tool." },
    "c3-role-desc": { ru: "Снять с команды регулярную ручную проверку и снизить риск потери данных.", en: "Remove recurring manual checks from the team and reduce the risk of data loss." },
    "c4-role-desc": { ru: "Заменить ручной поиск и перенос данных регулярной автоматической выгрузкой.", en: "Replace manual searching and data transfer with a scheduled automated export." },
    "c5-role-desc": { ru: "Снизить нагрузку на администратора и ускорить запись клиентов в свободные окна.", en: "Reduce the administrator's workload and speed up booking into available slots." },
    "c6-role-desc": { ru: "Показать экспертность, снять тревогу перед обращением и привести человека к записи.", en: "Show expertise, reduce anxiety before reaching out and guide the visitor to booking." },
    "c1-outcome": { ru: "Продажи, товары и финансы собраны в одном месте для ежедневных решений.", en: "Sales, products and finance are gathered in one place for daily decisions." },
    "c2-outcome": { ru: "Клиент видит стоимость по выбранным услугам, а бизнес получает более подготовленную заявку.", en: "The customer sees a cost estimate for selected services, while the business receives a better prepared lead." },
    "c3-outcome": { ru: "Процесс идёт по расписанию, а владелец получает понятные уведомления о состоянии.", en: "The process runs on schedule, and the owner receives clear status notifications." },
    "c4-outcome": { ru: "Команда получает подготовленные данные быстрее и тратит меньше времени на однотипные операции.", en: "The team receives prepared data faster and spends less time on repetitive operations." },
    "c5-outcome": { ru: "Больше заявок проходят по понятному сценарию, а администратор получает готовую информацию.", en: "More leads follow a clear flow, and the administrator receives ready information." },
    "c6-outcome": { ru: "Понятная страница услуги, быстрый путь к контакту и аккуратная подача с высоким уровнем доверия.", en: "A clear service page, a fast route to contact and a careful, trust-building presentation." },
    "c7-outcome": { ru: "Заявки, оплаты и отчёты обновляются без лишних действий со стороны команды.", en: "Leads, payments and reports update without extra manual steps from the team." },
    "gauge-title": { ru: "Проверка завершена", en: "Verification complete" },
    "cases-turnkey-badge": { ru: "Оптимальный формат", en: "Recommended format" },
    "cases-turnkey-title": { ru: "Профессиональный запуск", en: "Professional launch" },
    "cases-turnkey-subtitle": { ru: "Готовая система для приёма заявок и быстрого ответа клиентам.", en: "A ready system for receiving leads and responding to customers faster." },
    "cases-turnkey-site": { ru: "Сайт для заявок", en: "Lead-focused website" },
    "cases-turnkey-bot": { ru: "Telegram-бот", en: "Telegram bot" },
    "cases-turnkey-support": { ru: "14 дней поддержки", en: "14 days of support" },
    "cases-turnkey-fixed": { ru: "Стоимость запуска", en: "Launch cost" },
    "olivia-title": { ru: "Olivia Coach — фитнес и нутрициология", en: "Olivia Coach — fitness and nutrition" },
    "olivia-desc": { ru: "Премиальный лендинг женского фитнес-коуча: личная история, программы, отзывы, FAQ и прямой путь к записи.", en: "A premium landing page for a women's fitness coach: personal story, programs, reviews, FAQ and a direct booking path." },
    "olivia-task": { ru: "Показать личный подход тренера, раскрыть программы и привести посетителя к записи без агрессивной подачи.", en: "Show the coach's personal approach, explain the programs and guide visitors to booking without an aggressive sales tone." },
    "olivia-solution": { ru: "Собрать длинный editorial-лендинг: знакомство, метод, программы, отзывы, FAQ и финальный CTA.", en: "Build a long-form editorial landing page: introduction, method, programs, reviews, FAQ and a final CTA." },
    "olivia-interface": { ru: "Тёмная фотоподача, крупная типографика, модульная сетка и адаптивные состояния.", en: "Dark photographic art direction, large typography, a modular grid and responsive states." },
    "fitness-title": { ru: "Fitness — лендинг тренера", en: "Fitness — coach landing page" },
    "fitness-desc": { ru: "Энергичная промо-страница с программами, подходом тренера и быстрым переходом к записи.", en: "An energetic promo page with programs, coaching approach and a direct booking path." },
    "fitness-task": { ru: "Показать персональный тренинг как собранную систему, а не набор разрозненных услуг.", en: "Present personal coaching as a coherent system rather than disconnected services." },
    "fitness-solution": { ru: "Построить контрастный лендинг с последовательной подачей программ и подхода.", en: "Build a high-contrast landing page with a clear sequence of programs and method." },
    "fitness-interface": { ru: "Крупная типографика, спортивный ритм, контрастные CTA и адаптивная навигация.", en: "Large typography, athletic rhythm, high-contrast CTAs and responsive navigation." },
    "massage-title": { ru: "Massage — лендинг практики", en: "Massage — practice landing page" },
    "massage-desc": { ru: "Тёплая посадочная страница для массажной практики: услуги, формат работы и понятный путь к записи.", en: "A warm landing page for a massage practice with services, format and a clear booking path." },
    "massage-task": { ru: "Передать ощущение спокойствия и доверия без медицинских обещаний.", en: "Create a calm, trustworthy impression without medical claims." },
    "massage-solution": { ru: "Сделать визуально тихую страницу с понятной иерархией услуг и записи.", en: "Create a visually quiet page with a clear hierarchy of services and booking." },
    "massage-interface": { ru: "Полноэкранная фотография, редакционная типографика и мягкие акцентные состояния.", en: "Full-screen photography, editorial typography and restrained accent states." },
    "tutor-title": { ru: "English tutor — лендинг преподавателя", en: "English tutor — teacher landing page" },
    "tutor-desc": { ru: "Структурная страница с форматами занятий, быстрым тестом уровня и прямым CTA на пробный урок.", en: "A structured page with lesson formats, a quick level test and a direct trial-lesson CTA." },
    "tutor-task": { ru: "Объяснить формат обучения и снять неопределённость перед первым уроком.", en: "Explain the learning format and reduce uncertainty before the first lesson." },
    "tutor-solution": { ru: "Соединить презентацию преподавателя с интерактивным входным тестом.", en: "Combine the teacher presentation with an interactive entry test." },
    "tutor-interface": { ru: "Контрастная split-композиция, пошаговый тест и адаптивные состояния результата.", en: "A split composition, step-by-step test and responsive result states." },
    "autopost-title": { ru: "AutoPostingTG — AI-автопостинг", en: "AutoPostingTG — AI autoposting" },
    "autopost-desc": { ru: "Помогает регулярно готовить посты для канала: текст, изображение, превью и публикация по расписанию.", en: "Helps prepare regular channel posts: copy, image, preview and scheduled publishing." },
    "autopost-task": { ru: "Снять ручную подготовку регулярных публикаций, сохранив контроль перед отправкой в канал.", en: "Remove manual work from recurring posts while keeping review control before publishing." },
    "autopost-solution": { ru: "Сначала предпросмотр и проверка, затем публикация. Это сохраняет контроль и убирает ручную подготовку с нуля.", en: "First preview and review, then publishing. It keeps control while removing manual preparation from scratch." },
    "c1-title": { ru: "Панель продаж WB/Ozon", en: "WB/Ozon sales panel" },
    "c1-desc": {
      ru: "Единый экран для контроля продаж, остатков, финансов и операционных решений по маркетплейсам.",
      en: "A single screen for sales, stock, finance and marketplace operations decisions."
    },
    "c1-details": {
      ru: "Продажи, товары и финансы собраны в одном месте для ежедневных решений.",
      en: "Sales, products and finance are gathered in one place for daily decisions."
    },
    "c2-title": { ru: "Калькулятор ремонта", en: "Renovation cost calculator" },
    "c2-desc": {
      ru: "Помогает быстро показать клиенту ориентир по стоимости ремонта и собрать заявку без долгих переписок.",
      en: "Helps quickly show a renovation budget estimate and collect a lead without long messaging."
    },
    "c2-details": {
      ru: "Клиент видит стоимость по выбранным услугам, а бизнес получает более подготовленную заявку.",
      en: "The customer sees a cost estimate for selected services, and the business receives a warmer lead."
    },
    "c3-title": { ru: "Автоматическое резервирование данных", en: "Automatic data backup" },
    "c3-desc": {
      ru: "Регулярно сохраняет важные данные и отправляет уведомления о статусе, чтобы команда не контролировала это вручную.",
      en: "Regularly saves important data and sends status notifications so the team does not control it manually."
    },
    "c3-details": {
      ru: "Процесс идёт по расписанию, а владелец получает понятные уведомления о состоянии.",
      en: "The process runs on schedule, and the owner receives clear status notifications."
    },
    "c4-title": { ru: "Сбор данных из реестров", en: "Registry data collection" },
    "c4-desc": {
      ru: "Собирает и приводит данные к удобному виду, чтобы их можно было использовать в отчётах и операционной работе.",
      en: "Collects and prepares data in a usable format for reports and operations."
    },
    "c4-details": {
      ru: "Команда получает подготовленные данные быстрее и тратит меньше времени на однотипные операции.",
      en: "The team receives prepared data faster and spends less time on repetitive operations."
    },
    "c5-title": { ru: "Telegram-бот для записи", en: "Telegram booking bot" },
    "c5-desc": {
      ru: "Клиент выбирает услугу, мастера и время в Telegram, а бизнес получает заявку без ручной переписки.",
      en: "A customer chooses service, specialist and time in Telegram, and the business receives a lead without manual messaging."
    },
    "c5-details": {
      ru: "Больше заявок проходят по понятному сценарию, а администратор получает готовую информацию.",
      en: "More leads go through a clear flow, and the administrator receives ready information."
    },
    "c6-title": { ru: "Сайт психолога", en: "Psychologist website" },
    "c6-desc": {
    ru: "Спокойный лендинг экспертной услуги с ясной структурой, адаптивом и прямым сценарием записи.",
    en: "A calm expert-service landing page with clear structure, responsive layout and a direct booking flow."
  },
    "c6-details": {
    ru: "Первый пример из линейки размещенных сайтов. Дальше этот блок можно расширять новыми live-проектами без перестройки всей секции.",
    en: "The first example in the hosted-sites line. This block can be expanded with new live projects without rebuilding the section."
  },
    "c7-title": { ru: "Связка CRM, оплат и таблиц", en: "CRM, payments and sheets sync" },
    "c7-desc": {
      ru: "Автоматически обновляет статусы сделок, оплаты и учёт, чтобы менеджеры не переносили данные вручную.",
      en: "Automatically updates deal statuses, payments and records so managers do not copy data manually."
    },
    "c7-role-desc": {
      ru: "Убрать ручной перенос оплат и статусов между сервисами.",
      en: "Remove manual transfer of payments and statuses between services."
    },
    "case-btn-details": { ru: "Подробнее", en: "Details" },
    "github-banner-title": { ru: "Больше рабочих примеров и внутренних инструментов", en: "More working examples and internal tools" },
    "github-banner-desc": { ru: "Можно посмотреть, как я подхожу к задачам автоматизации, заявок, отчётности и запуска продуктов.", en: "See how I approach automation, leads, reporting and product launch tasks." },
    "github-banner-btn": { ru: "Посмотреть примеры", en: "View examples" },

    // Process Section
    "process-title-main": { ru: "Как я довожу проект до запуска", en: "How I bring a project to launch" },
    "step1-title": { ru: "Диагностика", en: "Diagnostics" },
    "step1-sub": { ru: "Разбираем задачу, заявки, продажи и ручную работу, которую нужно убрать.", en: "We clarify the task, leads, sales and manual work to remove." },
    "step2-title": { ru: "Сборка и проверка", en: "Build and check" },
    "step2-sub": { ru: "Собираю рабочий сценарий и проверяю его на реальных действиях клиента.", en: "I assemble the working flow and check it against real customer actions." },
    "step3-title": { ru: "Запуск и поддержка", en: "Launch & Support" },
    "step3-sub": { ru: "Запускаю проект и обеспечиваю стабильную работу.", en: "Going live with stability monitoring and active runtime support." },

    "chat-yes-btn": { ru: "Есть ТЗ", en: "Has Spec" },
    "chat-no-btn": { ru: "Нет ТЗ", en: "No Spec" },
    "chat-yes-in1": {
      ru: "Привет! Нужно сделать спокойный сайт для психолога с записью на консультацию. Вот ТЗ и референсы.",
      en: "Hello! I need a calm website for a psychologist with consultation booking. Here is the spec and assets:"
    },
    "chat-yes-out1": {
      ru: "Отлично, спасибо! Предварительно оценка такая:<br><strong>Срок:</strong> 5-7 дней<br><strong>Стоимость:</strong> от 25 000 ₽<br>Точную оценку дам после анализа всех деталей.",
      en: "Perfect, thanks! Preliminary estimates:<br><strong>Timeframe:</strong> 5-7 days<br><strong>Budget:</strong> from 25,000 RUB<br>I will lock the exact metrics after audit."
    },
    "chat-no-in1": {
      ru: "Привет! Нужен бот для автопостинга, но четкого ТЗ нет. Как быть?",
      en: "Hello! I need a bot for content scheduling, but don't have a clear spec. How do we proceed?"
    },
    "chat-no-out1": {
      ru: "Привет! Ничего страшного. Отправляю форму-опросник. Заполним вместе и соберем требования за 20 минут!",
      en: "Hi! Don't worry. Sending over a brief questionnaire. We will complete it together and gather requirements in 20 minutes!"
    },

    "term-run-btn": { ru: "Проверить сценарии", en: "Check flows" },
    "check-ad": { ru: "Адаптивность", en: "Mobile Responsive" },
    "check-perf": { ru: "Скорость загрузки", en: "Page Load Speed" },
    "check-forms": { ru: "Заявки и уведомления", en: "Leads and notifications" },
    "check-ui": { ru: "Путь клиента", en: "Customer path" },
    "check-seo": { ru: "Подача услуги", en: "Service presentation" },
    "check-edge": { ru: "Сложные ситуации", en: "Edge situations" },
    "gauge-perf": { ru: "Проверено по чек-листу", en: "Checked against the launch list" },

    "launch-ok-title": { ru: "Запуск проекта - Успешно", en: "Project Launch - Success" },
    "launch-ok-desc": { ru: "Проект запущен и доступен онлайн", en: "The project is launched and available online" },
    "lbl-dom": { ru: "Домен подключен", en: "Domain connected" },
    "lbl-ssl": { ru: "SSL сертификат", en: "SSL certificate" },
    "lbl-active": { ru: "Активен", en: "Active" },
    "lbl-anal": { ru: "Аналитика", en: "Analytics" },
    "lbl-connected": { ru: "Подключена", en: "Configured" },
    "lbl-forms": { ru: "Формы и заявки", en: "Contact forms" },
    "lbl-work": { ru: "Работают", en: "Online" },
    "lbl-responsive-ui": { ru: "Адаптивный интерфейс", en: "Responsive interface" },
    "lbl-ready": { ru: "Готов", en: "Ready" },
    "lbl-telegram-contact": { ru: "Telegram-контакт", en: "Telegram contact" },
    "lbl-linked": { ru: "Подключён", en: "Linked" },
    "lbl-legal-pages": { ru: "Политика и согласие", en: "Privacy and consent" },
    "lbl-available": { ru: "Доступны", en: "Available" },
    "lbl-tgbot": { ru: "Telegram-бот", en: "Telegram bot" },
    "lbl-supp": { ru: "Поддержка", en: "Support" },
    "lbl-always": { ru: "Всегда на связи", en: "Always online" },
    "btn-go-site": { ru: "Перейти на сайт", en: "Go to site" },

    // Contact Section
    "contact-title-main": { ru: "Контакты", en: "Contacts" },
    "contact-subtitle": {
      ru: "Опишите задачу. Я предложу понятный вариант запуска: что делать, сроки и первый шаг.",
      en: "Describe the task. I will suggest a clear launch path: what to build, timing and the first step."
    },
    "contact-write": { ru: "Написать", en: "Message" },
    "contact-email": { ru: "Отправить письмо", en: "Send an email" },
    "contact-whatsapp": { ru: "Открыть чат", en: "Open chat" },
    "contact-social-label": { ru: "Я в соцсетях", en: "Socials" },

    // Reviews Section
    "reviews-title-main": { ru: "Отзывы клиентов", en: "Client Reviews" },
    "reviews-subtitle": {
      ru: "Клиенты чаще всего отмечают ответственность, сроки, понятные объяснения и спокойный запуск.",
      en: "Clients most often mention responsibility, timing, clear explanations and a calm launch."
    },
    "reviews-count-total": { ru: "10 отзывов", en: "10 reviews" },
    "reviews-proof-kicker": { ru: "Подтверждение отзывов", en: "Review verification" },
    "reviews-proof-text": {
      ru: "Отзывы опубликованы на Профи.ру и прошли проверку площадки.",
      en: "The reviews are published and verified by Profi.ru."
    },
    "reviews-proof-action": { ru: "Смотреть все отзывы", en: "View all reviews" },
    "review-source-link": { ru: "Отзыв подтверждён на Профи.ру", en: "Verified review on Profi.ru" },
    "rev-cat-1": { ru: "Автоматизация задачи", en: "Task automation" },
    "rev-cat-2": { ru: "Сайт и интерактивная карта", en: "Website and interactive map" },
    "rev-cat-3": { ru: "Создание форумов", en: "Forum Customization" },
    "rev-text-1": {
      ru: "Специалист полностью выполнил задачи и учёл все правки.",
      en: "The specialist completed the task fully and accounted for every revision."
    },
    "rev-text-2": {
      ru: "Влад помог настроить интерактивную карту с кликабельными зонами. Дополнительно сделал удобный инструмент для обновлений, подробно объяснил работу и провёл созвон. Идеально.",
      en: "Vlad helped set up an interactive map with clickable zones. He also made a convenient tool for updates, explained everything clearly and walked me through it on a call. Perfect."
    },
    "rev-text-3": {
      ru: "Молодой, но знающий специалист. Соблюдает сроки, договоренности по цене. Приятно удивлен.",
      en: "A young yet highly competent professional. Outstanding adherence to deadlines and agreed budget. Pleasantly surprised."
    },
    "rev-cat-4": { ru: "Отчёты по продажам", en: "Sales reports" },
    "rev-cat-5": { ru: "Автоматизация по расписанию", en: "Scheduled automation" },
    "rev-text-4": {
      ru: "Разработал отличный экран аналитики. Графики открываются быстро, данные по маркетплейсам подтягиваются стабильно. Профессионал.",
      en: "Built an excellent analytics screen. Charts open quickly, and marketplace data comes through reliably. A true professional."
    },
    "rev-text-5": {
      ru: "Отличная автоматизация резервного копирования. Настроил работу по расписанию и уведомления в Telegram. Всё работает идеально.",
      en: "Excellent backup automation. Set up scheduled work and Telegram notifications. Everything runs perfectly."
    },
    "rev-cat-6": { ru: "Внутренний сервис", en: "Internal service" },
    "rev-cat-7": { ru: "Telegram-бот", en: "Telegram Bot" },
    "rev-cat-8": { ru: "Сайт на хостинге", en: "Hosted Website" },
    "rev-text-6": {
      ru: "Быстро понял задачу и собрал удобный рабочий экран без лишних обсуждений. Видно, что человек думает о продукте, а не только о внешнем виде.",
      en: "Quickly understood the task and created a convenient work screen without unnecessary back-and-forth. It is clear he thinks about the product, not just the visuals."
    },
    "rev-text-7": {
      ru: "Бот запустили спокойно: сценарии понятные, сообщения аккуратные, после запуска Влад помог поправить мелочи.",
      en: "The bot launched smoothly: clear flows, polished messages, and Vlad helped tune the details after launch."
    },
    "rev-text-8": {
      ru: "Получился не шаблон, а аккуратный сайт под мой стиль. Отдельно понравилось, что все объяснил простым языком.",
      en: "It did not feel like a template. The site matched my style, and I especially liked that everything was explained in plain language."
    },
    "rev-cat-9": { ru: "CRM и телефония", en: "CRM and telephony" },
    "rev-text-9": {
      ru: "Влад связал CRM и телефонию, заявки начали проходить стабильнее и без задержек. Отличная работа.",
      en: "Vlad connected CRM and telephony, and leads started moving more reliably without delays. Great work."
    },
    "rev-cat-10": { ru: "Сайт для заявок", en: "Lead-focused website" },
    "rev-text-10": {
      ru: "Очень довольна результатом. Дизайн современный, элементы двигаются аккуратно, формы отправляют заявки без сбоев.",
      en: "Very satisfied with the result. Modern design, clean motion, and forms send leads without issues."
    },

    "footer-copy": { ru: "Все права защищены.", en: "All rights reserved." }
  };

  const pageMeta = {
    home: {
      ru: {
        title: "Vlad — сайты, Telegram-боты и AI-интеграции",
        description: "Разрабатываю сайты, AI-ботов и автоматизации для малого бизнеса: заявки, продажи, Telegram, отчётность и экономия времени сотрудников."
      },
      en: {
        title: "Vlad — websites, Telegram bots and AI integrations",
        description: "Websites, Telegram bots, AI consultants and business automation for faster lead handling and less manual work."
      }
    },
    faq: {
      ru: {
        title: "FAQ — Vlad",
        description: "Ответы о сроках, оплате, правках, поддержке и запуске сайтов, Telegram-ботов и автоматизации."
      },
      en: {
        title: "FAQ — Vlad",
        description: "Answers about timelines, payment, revisions, support and launching websites, Telegram bots and automation."
      }
    }
  };

  const updateDocumentMeta = (lang) => {
    const page = document.body.dataset.page === "faq" ? "faq" : "home";
    const meta = pageMeta[page][lang];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (description) description.content = meta.description;
    if (ogTitle) ogTitle.content = meta.title;
    if (ogDescription) ogDescription.content = meta.description;
    if (twitterTitle) twitterTitle.content = meta.title;
    if (twitterDescription) twitterDescription.content = meta.description;
  };

  const trackEvent = (name, data = {}) => {
    try {
      if (typeof window.va === "function") window.va("event", name, data);
    } catch (_) {
      // Analytics must never block navigation or form interactions.
    }
  };

  const rafThrottle = (fn) => {
    let frame = null;
    return (...args) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        fn(...args);
        frame = null;
      });
    };
  };

  const setRevealDelays = () => {
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      const delay = Number(element.dataset.revealDelay || 0);
      if (delay > 0) {
        element.style.setProperty("--reveal-delay", `${delay}s`);
      }
    });
  };

  const initReveal = () => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
  };

  const initHeader = () => {
    const header = document.querySelector("[data-header]");
    if (!header) return;

    const mobileMq = window.matchMedia("(max-width: 900px)");

    const update = rafThrottle(() => {
      header.classList.toggle("scrolled", window.scrollY > 24);
      header.classList.toggle("is-compact", mobileMq.matches && window.scrollY > 48);
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
    mobileMq.addEventListener("change", update);
  };

  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
          block: "start",
        });
        history.pushState(null, "", href);
      });
    });
  };

  const initMobileMenu = () => {
    const header = document.querySelector("[data-header]");
    const button = document.querySelector("#menu-toggle");
    const panel = document.querySelector("#header-nav-panel");
    if (!header || !button || !panel) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let lastFocus = null;
    let focusTimer = 0;

    const closeMenu = (returnFocus = true) => {
      button.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Открыть меню");
      header.classList.remove("is-nav-open");
      panel.setAttribute("aria-hidden", "true");
      window.clearTimeout(focusTimer);
      if (returnFocus && lastFocus) lastFocus.focus();
    };

    const openMenu = () => {
      lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      button.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Закрыть меню");
      header.classList.add("is-nav-open");
      panel.setAttribute("aria-hidden", "false");
      const focusFirst = () => {
        if (header.classList.contains("is-nav-open")) {
          panel.querySelector(focusableSelector)?.focus();
        }
      };
      panel.addEventListener("transitionend", focusFirst, { once: true });
      focusTimer = window.setTimeout(focusFirst, prefersReducedMotion.matches ? 0 : 320);
    };

    button.addEventListener("click", () => {
      if (header.classList.contains("is-nav-open")) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (!header.classList.contains("is-nav-open")) return;

      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(panel.querySelectorAll(focusableSelector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 901 && header.classList.contains("is-nav-open")) {
        closeMenu(false);
      }
    });
  };

  const initTilt = () => {
    if (!canHover.matches || prefersReducedMotion.matches || window.innerWidth < 900) return;

    const tiltItems = Array.from(document.querySelectorAll("[data-tilt]")).map((element) => {
      let rect = null;
      let frame = 0;
      let pointerX = 0;
      let pointerY = 0;

      const measure = () => {
        rect = element.getBoundingClientRect();
      };

      const apply = () => {
        if (!rect) measure();
        if (!rect || rect.width === 0 || rect.height === 0) {
          frame = 0;
          return;
        }

        const px = (pointerX - rect.left) / rect.width - 0.5;
        const py = (pointerY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--ry", `${px * 8}deg`);
        element.style.setProperty("--rx", `${py * -8}deg`);
        frame = 0;
      };

      const onMove = (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!frame) frame = requestAnimationFrame(apply);
      };

      const reset = () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        element.style.setProperty("--ry", "0deg");
        element.style.setProperty("--rx", "0deg");
      };

      element.addEventListener("pointerenter", measure, { passive: true });
      element.addEventListener("pointermove", onMove, { passive: true });
      element.addEventListener("pointerleave", reset, { passive: true });

      return {
        invalidate() {
          rect = null;
        },
      };
    });

    if (!tiltItems.length) return;

    const invalidateRects = () => {
      tiltItems.forEach((item) => item.invalidate());
    };

    window.addEventListener("resize", invalidateRects, { passive: true });
    window.addEventListener("scroll", invalidateRects, { passive: true });
    prefersReducedMotion.addEventListener("change", invalidateRects);
    canHover.addEventListener("change", invalidateRects);
  };

  let showcaseRefs = null;
  const getShowcaseRefs = () => {
    if (showcaseRefs) return showcaseRefs;

    showcaseRefs = {
      visualZone: document.querySelector(".showcase-visual-zone"),
      landingImage: document.querySelector("[data-landing-image]"),
      landingName: document.querySelector("[data-landing-name]"),
      landingCounter: document.querySelector("[data-landing-counter]"),
      landingMeta: document.querySelector("#showcase-landing-meta"),
      scrollBtn: document.querySelector("#showcase-scroll-btn"),
      pillIcon: document.querySelector(".showcase-cat-icon"),
      pillTitle: document.querySelector("#showcase-meta-pill"),
      mainTitle: document.querySelector("#showcase-title"),
      problem: document.querySelector("#showcase-problem"),
      solution: document.querySelector("#showcase-solution"),
      result: document.querySelector("#showcase-result"),
      featuresWrap: document.querySelector("#showcase-features"),
      mockups: Array.from(document.querySelectorAll(".visual-mockup")),
      buttons: Array.from(document.querySelectorAll(".service-tab-btn")),
      thumbButtons: Array.from(document.querySelectorAll(".thumb-btn")),
      nav: document.querySelector(".services-nav-tabs"),
      thumbnails: document.querySelector(".showcase-thumbnails-strip"),
    };

    return showcaseRefs;
  };

  const resetShowcaseRefs = () => {
    showcaseRefs = null;
  };

  const initDetails = () => {
    document.querySelectorAll(".case-grid-unit details").forEach((details) => {
      details.addEventListener("toggle", () => {
        if (!details.open) return;

        document.querySelectorAll(".case-grid-unit details").forEach((item) => {
          if (item !== details) item.open = false;
        });
      });
    });
  };

  const caseMetrics = [
    {
      ru: ["быстрый контакт", "доверие к эксперту", "понятная запись"],
      en: ["fast contact", "expert trust", "clear booking"]
    },
    {
      ru: ["премиальная подача", "программы и FAQ", "запись в Telegram"],
      en: ["premium presentation", "programs and FAQ", "Telegram booking"]
    },
    {
      ru: ["быстрый контакт", "понятная запись", "ясный оффер"],
      en: ["fast contact", "clear booking", "clear offer"]
    },
    {
      ru: ["доверие к эксперту", "понятная запись", "мягкая подача"],
      en: ["expert trust", "clear booking", "calm presentation"]
    },
    {
      ru: ["быстрый контакт", "пробный урок", "понятный формат"],
      en: ["fast contact", "trial lesson", "clear format"]
    },
    {
      ru: ["удобный расчёт", "меньше уточнений", "готовая заявка"],
      en: ["easy estimate", "fewer questions", "ready lead"]
    },
    {
      ru: ["контроль продаж", "отчёты без таблиц", "быстрее решения"],
      en: ["sales control", "reports without sheets", "faster decisions"]
    },
    {
      ru: ["меньше рутины", "контроль перед отправкой", "публикации по расписанию"],
      en: ["less routine", "review before sending", "scheduled posts"]
    },
    {
      ru: ["понятная запись", "меньше переписки", "заявка в Telegram"],
      en: ["clear booking", "less messaging", "lead in Telegram"]
    },
    {
      ru: ["меньше ручной работы", "статусы без переноса", "аккуратный учёт"],
      en: ["less manual work", "statuses without copying", "clean tracking"]
    },
    {
      ru: ["работа по расписанию", "статус в Telegram", "меньше ручных проверок"],
      en: ["scheduled work", "Telegram status", "fewer manual checks"]
    },
    {
      ru: ["меньше ручного поиска", "данные в отчёте", "регулярная выгрузка"],
      en: ["less manual search", "data in report", "regular export"]
    }
  ];

  const caseMetricIds = [
    "psych", "olivia", "fitness", "massage", "tutor", "repair", "marketplace",
    "autopost", "manicure", "crm", "backup", "parser"
  ];
  const caseMetricsById = new Map(caseMetricIds.map((id, index) => [id, caseMetrics[index]]));

  const arrangeCases = () => {
    const primaryContainer = document.querySelector(".cases-bento-grid");
    const secondaryContainer = document.querySelector(".cases-more-inner");
    if (!primaryContainer || !secondaryContainer) return;

    const cards = new Map(Array.from(document.querySelectorAll("[data-case-id]")).map((card) => [card.dataset.caseId, card]));
    ["olivia", "psych", "repair", "manicure", "autopost", "marketplace"].forEach((id) => {
      const card = cards.get(id);
      if (card) primaryContainer.appendChild(card);
    });
    ["fitness", "massage", "tutor", "crm", "backup", "parser"].forEach((id) => {
      const card = cards.get(id);
      if (card) secondaryContainer.appendChild(card);
    });
  };

  const renderCaseCommerce = () => {
    document.querySelectorAll("[data-case-id]").forEach((card) => {
      const top = card.querySelector(".case-card-top");
      let kind = card.querySelector(".case-kind-label");
      if (!kind && top) {
        kind = document.createElement("span");
        kind.className = "case-kind-label";
        const actions = top.querySelector(".case-card-actions");
        const directLink = top.querySelector(":scope > a");
        top.insertBefore(kind, actions || directLink || null);
      }
      if (kind) {
        const key = card.dataset.caseKind === "demo" ? "case-kind-demo" : "case-kind-working";
        kind.textContent = translations[key][currentLang];
      }

      let priceRow = card.querySelector(".case-price-row");
      if (!priceRow) {
        priceRow = document.createElement("div");
        priceRow.className = "case-price-row";
        const details = card.querySelector("details");
        if (details) details.insertAdjacentElement("beforebegin", priceRow);
      }
      if (priceRow) {
        priceRow.innerHTML = `<span>${translations["case-similar-launch"][currentLang]}</span><strong>${translations["price-from"][currentLang]} ${card.dataset.casePrice}</strong>`;
      }
    });
  };

  const renderCaseMetrics = () => {
    document.querySelectorAll(".case-grid-unit[data-case-id]").forEach((card) => {
      const metrics = caseMetricsById.get(card.dataset.caseId)?.[currentLang];
      if (!metrics) return;
      let container = card.querySelector(".case-benefits-row");
      if (!container) {
        container = document.createElement("div");
        container.className = "case-benefits-row";
        container.setAttribute("aria-label", currentLang === "ru" ? "Преимущества" : "Benefits");
        const tags = card.querySelector(".case-card-stack-row");
        if (tags) tags.insertAdjacentElement("afterend", container);
      }
      container.setAttribute("aria-label", currentLang === "ru" ? "Преимущества" : "Benefits");
      container.innerHTML = metrics.map((benefit) => (
        `<span class="case-benefit-chip">${benefit}</span>`
      )).join("");
    });
  };

  const initFaqAccordion = () => {
    const list = document.querySelector("[data-faq-list]");
    if (!list) return;
    list.addEventListener("click", (event) => {
      const summary = event.target.closest("summary");
      if (!summary || !list.contains(summary)) return;
      const current = summary.closest("details");
      if (!current || current.open) return;
      list.querySelectorAll("details").forEach((item) => {
        if (item !== current) item.open = false;
      });
    });
  };

  const initBriefQuiz = () => {
    const form = document.querySelector("[data-quiz-form]");
    if (!form) return;

    const steps = Array.from(form.querySelectorAll("[data-quiz-step]"));
    const success = form.querySelector("[data-quiz-success]");
    const nextButton = form.querySelector("[data-quiz-next]");
    const backButton = form.querySelector("[data-quiz-back]");
    const progressLabel = document.querySelector("[data-quiz-progress-label]");
    const progressBar = document.querySelector("[data-quiz-progress-bar]");
    const summary = form.querySelector("[data-quiz-summary]");
    const error = form.querySelector("[data-quiz-error]");
    const nameInput = form.querySelector("[data-quiz-name]");
    const contactInput = form.querySelector("[data-quiz-contact]");
    const telegramLink = form.querySelector("[data-quiz-telegram-link]");
    const copySource = form.querySelector("[data-quiz-copy-source]");
    const copyStatus = form.querySelector("[data-quiz-copy-status]");
    const copyButton = form.querySelector("[data-quiz-copy]");
    const copyOpenButton = form.querySelector("[data-quiz-copy-open]");
    const customFields = Array.from(form.querySelectorAll("[data-quiz-custom]"));

    const state = {
      step: 0,
      answers: {
        project: "",
        features: [],
        materials: "",
        timeline: "",
        budget: "",
        projectOther: "",
        featuresOther: "",
        materialsComment: "",
        notes: ""
      }
    };

    const labels = {
      project: "quiz-summary-project",
      features: "quiz-summary-features",
      materials: "quiz-summary-materials",
      timeline: "quiz-summary-timeline",
      budget: "quiz-summary-budget",
      context: "quiz-summary-context"
    };

    const getOptionText = (button) => button.querySelector("span")?.textContent.trim() || button.dataset.value || "";

    const setError = (key = "") => {
      if (!error) return;
      error.textContent = key ? translations[key][currentLang] : "";
    };

    const updateSummary = () => {
      if (!summary) return;
      const rows = {
        project: [state.answers.project, state.answers.projectOther].filter(Boolean).join(": "),
        features: [state.answers.features.join(", "), state.answers.featuresOther].filter(Boolean).join("; "),
        materials: [state.answers.materials, state.answers.materialsComment].filter(Boolean).join("; "),
        timeline: state.answers.timeline,
        budget: state.answers.budget,
        context: state.answers.notes
      };
      summary.innerHTML = Object.entries(labels).map(([name, key]) => {
        const value = rows[name];
        return `<div><dt>${translations[key][currentLang]}</dt><dd>${value || "—"}</dd></div>`;
      }).join("");
    };

    const updateProgress = () => {
      const total = steps.length;
      const current = Math.min(state.step + 1, total);
      if (progressLabel) progressLabel.textContent = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      if (progressBar) progressBar.style.setProperty("--quiz-progress", `${(current / total) * 100}%`);
    };

    const showStep = (index) => {
      state.step = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === state.step));
      if (success) success.classList.remove("is-active");
      if (backButton) backButton.disabled = state.step === 0;
      if (nextButton) {
        nextButton.hidden = false;
        nextButton.querySelector("span").textContent = translations[state.step === steps.length - 1 ? "quiz-submit" : "quiz-next"][currentLang];
      }
      if (backButton) backButton.hidden = false;
      setError();
      updateSummary();
      updateProgress();
    };

    const syncSelected = () => {
      form.querySelectorAll("[data-quiz-option]").forEach((button) => {
        const name = button.dataset.name;
        const text = getOptionText(button);
        const selected = Array.isArray(state.answers[name])
          ? state.answers[name].includes(text)
          : state.answers[name] === text;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    };

    form.addEventListener("click", (event) => {
      const option = event.target.closest("[data-quiz-option]");
      if (!option) return;

      const name = option.dataset.name;
      const text = getOptionText(option);
      if (!name || !text) return;

      if (option.dataset.multiple === "true") {
        const values = state.answers[name];
        if (!Array.isArray(values)) return;
        if (values.includes(text)) {
          state.answers[name] = values.filter((value) => value !== text);
        } else {
          state.answers[name] = [...values, text];
        }
      } else {
        state.answers[name] = text;
      }
      syncSelected();
      updateSummary();
      setError();
    });

    customFields.forEach((field) => {
      field.addEventListener("input", () => {
        const key = field.dataset.quizCustom;
        if (!key) return;
        state.answers[key] = field.value.trim();
        updateSummary();
        setError();
      });
    });

    const canContinue = () => {
      const currentStep = steps[state.step];
      const options = Array.from(currentStep.querySelectorAll("[data-quiz-option]"));
      if (!options.length) return true;
      const names = [...new Set(options.map((button) => button.dataset.name))];
      return names.every((name) => {
        const value = state.answers[name];
        if (name === "project" && state.answers.projectOther) return true;
        if (name === "features" && state.answers.featuresOther) return true;
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
      });
    };

    const buildTelegramText = () => {
      const name = nameInput?.value.trim() || "";
      const contact = contactInput?.value.trim() || "";
      const values = {
        project: [state.answers.project, state.answers.projectOther].filter(Boolean).join(": ") || "—",
        features: [state.answers.features.length ? state.answers.features.join(", ") : "", state.answers.featuresOther].filter(Boolean).join("; ") || "—",
        materials: [state.answers.materials, state.answers.materialsComment].filter(Boolean).join("; ") || "—",
        timeline: state.answers.timeline || "—",
        budget: state.answers.budget || "—",
        notes: state.answers.notes || "—"
      };
      const lines = currentLang === "en" ? [
        "I would like a project estimate.",
        `Name: ${name}`,
        `Contact: ${contact}`,
        `Format: ${values.project}`,
        `Features: ${values.features}`,
        `Materials: ${values.materials}`,
        `Timeline: ${values.timeline}`,
        `Budget: ${values.budget}`,
        `Notes: ${values.notes}`
      ] : [
        "Хочу оценить проект.",
        `Имя: ${name}`,
        `Контакт: ${contact}`,
        `Формат: ${values.project}`,
        `Функции: ${values.features}`,
        `Материалы: ${values.materials}`,
        `Сроки: ${values.timeline}`,
        `Бюджет: ${values.budget}`,
        `Уточнения: ${values.notes}`
      ];
      return lines.join("\n");
    };

    const copyBrief = async (openTelegram = false) => {
      const text = copySource?.value || buildTelegramText();
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          copied = true;
        } else if (copySource) {
          copySource.focus();
          copySource.select();
          copied = document.execCommand("copy");
        }
      } catch (_) {
        copied = false;
      }

      if (copyStatus) copyStatus.textContent = translations[copied ? "quiz-copy-done" : "quiz-copy-error"][currentLang];
      if (!copied && copySource) {
        copySource.focus();
        copySource.select();
      }
      if (copied && openTelegram) window.location.href = "https://t.me/ThorBakiN";
    };

    nextButton?.addEventListener("click", () => {
      if (state.step < steps.length - 1) {
        if (!canContinue()) {
          setError("quiz-error-choice");
          return;
        }
        showStep(state.step + 1);
        syncSelected();
        return;
      }

      if (!nameInput?.value.trim() || !contactInput?.value.trim()) {
        setError("quiz-error-contact");
        return;
      }

      const briefText = buildTelegramText();
      if (copySource) copySource.value = briefText;
      if (copyStatus) copyStatus.textContent = "";
      if (telegramLink) telegramLink.href = "https://t.me/ThorBakiN";
      steps.forEach((step) => step.classList.remove("is-active"));
      success?.classList.add("is-active");
      if (nextButton) nextButton.hidden = true;
      if (backButton) backButton.hidden = true;
      trackEvent("quiz_complete", { language: currentLang });
    });

    copyButton?.addEventListener("click", () => copyBrief(false));
    copyOpenButton?.addEventListener("click", () => copyBrief(true));

    backButton?.addEventListener("click", () => {
      showStep(state.step - 1);
      syncSelected();
    });

    const refreshQuizLanguage = () => {
      const previousAnswers = { ...state.answers, features: [...state.answers.features] };
      Object.keys(state.answers).forEach((key) => {
        if (Array.isArray(state.answers[key])) state.answers[key] = [];
        else state.answers[key] = "";
      });
      form.querySelectorAll("[data-quiz-option].is-selected").forEach((button) => {
        const name = button.dataset.name;
        const text = getOptionText(button);
        if (button.dataset.multiple === "true") state.answers[name].push(text);
        else state.answers[name] = text;
      });
      if (!Object.values(state.answers).some((value) => Array.isArray(value) ? value.length : value)) {
        state.answers = previousAnswers;
      }
      customFields.forEach((field) => {
        const key = field.dataset.quizCustom;
        if (key && previousAnswers[key]) {
          state.answers[key] = previousAnswers[key];
          field.value = previousAnswers[key];
        }
      });
      updateSummary();
      showStep(state.step);
      syncSelected();
    };

    window.addEventListener("portfolio:languagechange", refreshQuizLanguage);
    showStep(0);
    syncSelected();
  };

  // Language Switcher Logic: links point to static language routes, so copy is
  // already correct before scripts run and never causes a visible reflow.
  const initLanguageSwitcher = () => {
    const switchers = document.querySelectorAll(".lang-switcher");
    if (!switchers.length) return;
    switchers.forEach((switcher) => {
      switcher.querySelectorAll("[data-lang]").forEach((link) => {
        const isCurrent = link.dataset.lang === currentLang;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  };

  // Bento Categories Showcase switcher logic
  let activeBentoIndex = 8;

  const bentoMockupData = [
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    langKey: "tab-web",
    titleKey: "showcase-web-title",
    probKey: "showcase-web-prob",
    solKey: "showcase-web-sol",
    resKey: "showcase-web-res",
    features: ["feat-ops", "feat-decisions", "feat-filter"],
    url: "https://github.com/vladkorkishkooff-tech/WB-Ozon-Dashboard",
    ctaKey: "showcase-open-repo",
    ratio: "1440 / 980"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    langKey: "tab-webapps",
    titleKey: "showcase-webapps-title",
    probKey: "showcase-webapps-prob",
    solKey: "showcase-webapps-sol",
    resKey: "showcase-webapps-res",
    features: ["feat-presale", "feat-client-flow", "feat-ui"],
    url: "https://github.com/vladkorkishkooff-tech/RepairCalc",
    ctaKey: "showcase-open-repo",
    ratio: "1406 / 1464"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    langKey: "tab-saas",
    titleKey: "showcase-saas-title",
    probKey: "showcase-saas-prob",
    solKey: "showcase-saas-sol",
    resKey: "showcase-saas-res",
    features: ["feat-backup", "feat-cron", "feat-fault"],
    url: "https://github.com/vladkorkishkooff-tech/AgentBackup",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z"/></svg>`,
    langKey: "tab-ai",
    titleKey: "showcase-ai-title",
    probKey: "showcase-ai-prob",
    solKey: "showcase-ai-sol",
    resKey: "showcase-ai-res",
    features: ["feat-parsing", "feat-data-ready", "feat-sync"],
    url: "https://github.com/vladkorkishkooff-tech/Parser-Rosaccreditation",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    langKey: "tab-dash",
    titleKey: "showcase-dash-title",
    probKey: "showcase-dash-prob",
    solKey: "showcase-dash-sol",
    resKey: "showcase-dash-res",
    features: ["feat-decisions", "feat-d3", "feat-filter"],
    url: "https://github.com/vladkorkishkooff-tech/WB-Ozon-Dashboard",
    ctaKey: "showcase-open-repo",
    ratio: "1440 / 980"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    langKey: "tab-scripts",
    titleKey: "showcase-scripts-title",
    probKey: "showcase-scripts-prob",
    solKey: "showcase-scripts-sol",
    resKey: "showcase-scripts-res",
    features: ["feat-content", "feat-llm", "feat-cron"],
    url: "https://github.com/vladkorkishkooff-tech/AutoPostingTG",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    langKey: "tab-bots",
    titleKey: "showcase-bots-title",
    probKey: "showcase-bots-prob",
    solKey: "showcase-bots-sol",
    resKey: "showcase-bots-res",
    features: ["feat-booking", "feat-python", "feat-webapps"],
    url: "https://github.com/vladkorkishkooff-tech/ManicureBot",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    langKey: "tab-api",
    titleKey: "showcase-api-title",
    probKey: "showcase-api-prob",
    solKey: "showcase-api-sol",
    resKey: "showcase-api-res",
    features: ["feat-sync", "feat-auto-updates", "feat-crm"],
    url: "https://github.com/vladkorkishkooff-tech/Parser-Rosaccreditation",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 8h5"/><path d="M7 12h10"/><path d="M7 16h7"/><path d="M16 21l2-3 2 3"/></svg>`,
    langKey: "tab-landings",
    titleKey: "showcase-landings-title",
    probKey: "showcase-landings-prob",
    solKey: "showcase-landings-sol",
    resKey: "showcase-landings-res",
    features: ["feat-leads", "feat-live", "feat-design"],
    url: "https://premium-visit-card.vercel.app/",
    ctaKey: "showcase-open-site",
    ratio: "1440 / 900"
  }
];

  const landingSlides = [
    { name: { ru: "Olivia Coach", en: "Olivia Coach" }, src: "case_landing_olivia_coach.webp", alt: { ru: "Лендинг Olivia Coach", en: "Olivia Coach landing page" }, url: "https://fitnes-coach.vercel.app/", ratio: "1440 / 1000" },
    { name: { ru: "Сайт психолога", en: "Psychologist website" }, src: "case_premium_visit_card.webp", alt: { ru: "Сайт психолога", en: "Psychologist landing page" }, url: "https://premium-visit-card.vercel.app/", ratio: "1440 / 900" },
    { name: { ru: "Fitness", en: "Fitness" }, src: "case_landing_fitness.webp", alt: { ru: "Лендинг фитнес-тренера", en: "Fitness coach landing page" }, url: "https://01-fitness-coach.vercel.app", ratio: "1440 / 1000" },
    { name: { ru: "Massage", en: "Massage" }, src: "case_landing_massage.webp", alt: { ru: "Лендинг массажной практики", en: "Massage practice landing page" }, url: "https://02-massage-therapist.vercel.app", ratio: "1440 / 1000" },
    { name: { ru: "English tutor", en: "English tutor" }, src: "case_landing_english_tutor.webp", alt: { ru: "Лендинг преподавателя английского", en: "English tutor landing page" }, url: "https://03-english-tutor.vercel.app", ratio: "1440 / 1000" },
  ];
  let activeLandingIndex = 0;
  let landingTransitionTimer = 0;

  const setShowcaseRatio = (ratio = "16 / 10") => {
    const { visualZone } = getShowcaseRefs();
    visualZone?.style.setProperty("--showcase-ratio", ratio);
  };

  const updateShowcaseScrollBtn = (data) => {
    const { scrollBtn } = getShowcaseRefs();
    if (!scrollBtn) return;

    if (data.url) {
      scrollBtn.removeAttribute("onclick");
      scrollBtn.onclick = (e) => {
        e.preventDefault();
        window.open(data.url, "_blank", "noopener,noreferrer");
      };
      const textEl = scrollBtn.querySelector("span");
      if (textEl) {
        textEl.textContent = translations[data.ctaKey || "showcase-open-repo"][currentLang];
      }
    } else {
      scrollBtn.onclick = () => {
        document.querySelector("#cases")?.scrollIntoView({ behavior: "smooth" });
      };
      const textEl = scrollBtn.querySelector("span");
      if (textEl) {
        textEl.textContent = translations["widget-btn-examples"][currentLang];
      }
    }
  };

  const syncLandingGallery = (animate = false) => {
    const { landingImage: image, landingName: name, landingCounter: counter, landingMeta: meta } = getShowcaseRefs();
    if (!image || !name || !counter) return;

    const slide = landingSlides[activeLandingIndex];
    const applySlide = () => {
      image.src = assetUrl(slide.src);
      image.alt = slide.alt[currentLang];
      name.textContent = slide.name[currentLang];
      counter.textContent = `${String(activeLandingIndex + 1).padStart(2, "0")} / ${String(landingSlides.length).padStart(2, "0")}`;
      bentoMockupData[8].url = slide.url;
      bentoMockupData[8].ratio = slide.ratio;
      if (activeBentoIndex === 8) setShowcaseRatio(slide.ratio);
      if (activeBentoIndex === 8) updateShowcaseScrollBtn(bentoMockupData[8]);
      image.classList.remove("is-changing");
    };

    window.clearTimeout(landingTransitionTimer);

    if (animate && !prefersReducedMotion.matches) {
      image.classList.add("is-changing");
      landingTransitionTimer = window.setTimeout(applySlide, 180);
    } else {
      applySlide();
    }

    if (meta) meta.hidden = activeBentoIndex !== 8;
  };

  const initLandingGallery = () => {
    const gallery = document.querySelector("[data-landing-gallery]");
    if (!gallery) return;

    landingSlides.forEach((slide) => {
      const preload = new Image();
      preload.src = assetUrl(slide.src);
    });

    const move = (direction) => {
      activeLandingIndex = (activeLandingIndex + direction + landingSlides.length) % landingSlides.length;
      syncLandingGallery(true);
    };
    gallery.querySelector("[data-landing-prev]")?.addEventListener("click", () => move(-1));
    gallery.querySelector("[data-landing-next]")?.addEventListener("click", () => move(1));
    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    });
    syncLandingGallery();
  };

  const syncBentoShowcase = () => {
    const data = bentoMockupData[activeBentoIndex];
    const refs = getShowcaseRefs();
    setShowcaseRatio(data.ratio || "16 / 10");

    // Set showcase pill icon & title
    if (refs.pillIcon) refs.pillIcon.innerHTML = data.icon;
    if (refs.pillTitle) refs.pillTitle.textContent = translations[data.langKey][currentLang];

    // Set title
    if (refs.mainTitle) refs.mainTitle.textContent = translations[data.titleKey][currentLang];

    // Set Problem-Solution-Result flow
    if (refs.problem) refs.problem.textContent = translations[data.probKey][currentLang];
    if (refs.solution) refs.solution.textContent = translations[data.solKey][currentLang];
    if (refs.result) refs.result.textContent = translations[data.resKey][currentLang];

    // Set features
    if (refs.featuresWrap) {
      const fragment = document.createDocumentFragment();
      data.features.forEach((featKey) => {
        const span = document.createElement("span");
        span.className = "feature-bullet";
        span.textContent = translations[featKey][currentLang];
        fragment.appendChild(span);
      });
      refs.featuresWrap.replaceChildren(fragment);
    }

    // Toggle active visual mockup
      // Toggle active visual mockup
  refs.mockups.forEach((mock, index) => {
    mock.classList.toggle("active", index === activeBentoIndex);
  });

  // Dynamic Scroll Button live URL bindings
  updateShowcaseScrollBtn(data);

  if (refs.landingMeta) refs.landingMeta.hidden = activeBentoIndex !== 8;
  if (activeBentoIndex === 8) syncLandingGallery();
};

  const initBentoShowcase = () => {
    resetShowcaseRefs();
    const refs = getShowcaseRefs();
    const buttons = refs.buttons;
    const thumbBtns = refs.thumbButtons;

    const landingButton = buttons.find((button) => button.dataset.tabIndex === "8");
    const landingThumb = thumbBtns.find((button) => button.dataset.thumbIndex === "8");
    if (refs.nav && landingButton) refs.nav.prepend(landingButton);
    if (refs.thumbnails && landingThumb) refs.thumbnails.prepend(landingThumb);
    resetShowcaseRefs();
    const orderedRefs = getShowcaseRefs();

    const keepActiveServiceTabVisible = (smooth = false) => {
      if (!orderedRefs.nav || window.innerWidth > 620) return;
      const activeButton = orderedRefs.nav.querySelector(".service-tab-btn.active");
      if (!activeButton) return;

      const behavior = smooth && !prefersReducedMotion.matches ? "smooth" : "auto";
      window.requestAnimationFrame(() => {
        activeButton.scrollIntoView({ behavior, block: "nearest", inline: "start" });
      });
    };

    const switchTab = (index) => {
      if (activeBentoIndex === index) return;
      activeBentoIndex = index;

      // Update sidebar tab active classes
      orderedRefs.buttons.forEach((b) => {
        const isActive = Number(b.dataset.tabIndex) === index;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-selected", String(isActive));
      });

      // Update thumbnails active classes
      orderedRefs.thumbButtons.forEach((tb) => tb.classList.toggle("active", Number(tb.dataset.thumbIndex) === index));
      keepActiveServiceTabVisible(true);

      // Apply showcase panel micro transitions
      const panel = document.querySelector("#service-showcase-panel");
      if (panel) {
        panel.classList.add("transitioning");
        setTimeout(() => {
          syncBentoShowcase();
          panel.classList.remove("transitioning");
        }, 200);
      }
    };

    orderedRefs.buttons.forEach((btn) => {
      btn.addEventListener("click", () => switchTab(Number(btn.dataset.tabIndex)));
    });

    orderedRefs.thumbButtons.forEach((tb) => {
      tb.addEventListener("click", () => switchTab(Number(tb.dataset.thumbIndex)));
    });

    orderedRefs.buttons.forEach((button) => {
      const active = Number(button.dataset.tabIndex) === activeBentoIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    orderedRefs.thumbButtons.forEach((thumb) => thumb.classList.toggle("active", Number(thumb.dataset.thumbIndex) === activeBentoIndex));
    syncBentoShowcase();
  };

  // Stage 1 Dialogue Content Updater
  let chatSpecState = "yes"; // 'yes' or 'no'

  const updateChatContent = () => {
    const scroller = document.querySelector("#chat-body-scroller");
    if (!scroller) return;

    scroller.innerHTML = "";

    const userAvatar = `<div class="chat-avatar-svg user-avatar" style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); color: var(--text-muted);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 14px; height: 14px; display: block;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
    const vladAvatar = `<div class="chat-avatar-svg vlad-avatar" style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); color: #ffffff; font-family: var(--font-display); font-weight: 800; font-size: 11px; box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);">T</div>`;

    if (chatSpecState === "yes") {
      const inMsg = document.createElement("div");
      inMsg.className = "chat-msg msg-in";
      inMsg.innerHTML = `
        ${userAvatar}
        <div class="chat-bubble">
          <p>${translations["chat-yes-in1"][currentLang]}</p>
          <div class="chat-files-list">
            <div class="chat-file-attachment">
              <div class="figma-mock-logo" style="background: #f24e1e;">F</div>
              <div class="figma-mock-text">
                <strong>ТЗ_проект.pdf</strong>
                <span>1.2 MB · PDF Spec</span>
              </div>
            </div>
            <div class="chat-file-attachment">
              <div class="figma-mock-logo" style="background: #a259ff;">F</div>
              <div class="figma-mock-text">
                <strong>design.fig</strong>
                <span>4.8 MB · Figma Design</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const outMsg = document.createElement("div");
      outMsg.className = "chat-msg msg-out";
      outMsg.innerHTML = `
        ${vladAvatar}
        <div class="chat-bubble">
          <p>${translations["chat-yes-out1"][currentLang]}</p>
        </div>
      `;

      scroller.appendChild(inMsg);
      scroller.appendChild(outMsg);
    } else {
      const inMsg = document.createElement("div");
      inMsg.className = "chat-msg msg-in";
      inMsg.innerHTML = `
        ${userAvatar}
        <div class="chat-bubble">
          <p>${translations["chat-no-in1"][currentLang]}</p>
        </div>
      `;

      const outMsg = document.createElement("div");
      outMsg.className = "chat-msg msg-out";
      outMsg.innerHTML = `
        ${vladAvatar}
        <div class="chat-bubble">
          <p>${translations["chat-no-out1"][currentLang]}</p>
        </div>
      `;

      scroller.appendChild(inMsg);
      scroller.appendChild(outMsg);
    }

    scroller.scrollTop = scroller.scrollHeight;
  };

  const initChatToggler = () => {
    const yesBtn = document.querySelector("#chat-toggle-yes");
    const noBtn = document.querySelector("#chat-toggle-no");

    if (!yesBtn || !noBtn) return;

    yesBtn.addEventListener("click", () => {
      if (chatSpecState === "yes") return;
      chatSpecState = "yes";
      yesBtn.classList.add("active");
      noBtn.classList.remove("active");
      updateChatContent();
    });

    noBtn.addEventListener("click", () => {
      if (chatSpecState === "no") return;
      chatSpecState = "no";
      noBtn.classList.add("active");
      yesBtn.classList.remove("active");
      updateChatContent();
    });

    // Populate initial chat bubbles
    updateChatContent();
  };

  // Stage 2 Auto-Test Runner Simulation
  let isRunningTests = false;

  const initTestRunner = () => {
    const runBtn = document.querySelector("#trigger-autotests");
    const codeArea = document.querySelector("#editor-code-area");

    if (!runBtn || !codeArea) return;

    const testLogs = {
      ru: [
        "Проверка заявки с сайта... Готово",
        "Проверка ответа клиенту... Готово",
        "Проверка уведомления в Telegram... Готово",
        "Проверка отчёта для владельца... Готово",
        "Проверка мобильного сценария... Готово",
        "Диагностика завершена. Сценарий готов к запуску."
      ],
      en: [
        "Checking website lead flow... Done",
        "Checking customer reply... Done",
        "Checking Telegram notification... Done",
        "Checking owner report... Done",
        "Checking mobile flow... Done",
        "Diagnostics complete. Flow is ready to launch."
      ]
    };

    runBtn.addEventListener("click", () => {
      if (isRunningTests) return;

      isRunningTests = true;
      runBtn.disabled = true;
      runBtn.style.opacity = "0.5";

      const originalCode = codeArea.innerHTML;
      const logs = testLogs[currentLang] || testLogs.ru;
      let currentLine = 0;

      codeArea.innerHTML = "";

      const restore = () => {
        codeArea.innerHTML = originalCode;
        isRunningTests = false;
        runBtn.disabled = false;
        runBtn.style.opacity = "1";
      };

      const printNextLog = () => {
        if (currentLine >= logs.length) {
          setTimeout(restore, 700);
          return;
        }

        const lineEl = document.createElement("div");
        lineEl.style.color = "#ffffff";
        lineEl.style.marginBottom = "4px";
        lineEl.textContent = `>_ ${logs[currentLine]}`;
        codeArea.appendChild(lineEl);
        codeArea.scrollTop = codeArea.scrollHeight;
        currentLine += 1;

        setTimeout(printNextLog, 450);
      };

      printNextLog();
    });
  };

  const initReviewsCarousel = () => {
    const container = document.querySelector(".reviews-carousel-container");
    const track = document.querySelector(".reviews-track");
    if (!container || !track || track.dataset.carouselReady === "true") return;

    track.querySelectorAll('.review-item-card[aria-hidden="true"]').forEach((clone) => clone.remove());

    const cards = Array.from(track.querySelectorAll(".review-item-card"));
    if (cards.length === 0) return;

    const prev = document.querySelector("[data-reviews-prev]");
    const next = document.querySelector("[data-reviews-next]");
    const status = document.querySelector("[data-reviews-status]");
    const dotsWrap = document.querySelector("[data-reviews-dots]");

    let index = 0;
    let visibleCount = 3;
    let maxIndex = 0;
    let timer = 0;
    let paused = false;
    const autoplayEnabled = !prefersReducedMotion.matches;
    const autoplayDelay = 6500;

    const getVisibleCount = () => {
      if (window.innerWidth <= 620) return 1;
      if (window.innerWidth <= 980) return 2;
      return 3;
    };

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (let i = 0; i <= maxIndex; i += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "reviews-dot";
        dot.setAttribute("aria-label", `Показать отзывы с ${i + 1}`);
        dot.addEventListener("click", () => {
          goTo(i, true);
        });
        dotsWrap.appendChild(dot);
      }
    };

    const update = () => {
      visibleCount = getVisibleCount();
      maxIndex = Math.max(0, cards.length - visibleCount);
      if (index > maxIndex) index = 0;

      const cardWidth = cards[0].getBoundingClientRect().width;
      if (cardWidth <= 0) return;
      const trackStyles = window.getComputedStyle(track);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
      const shift = index * (cardWidth + gap);
      track.style.transform = `translate3d(${-Math.max(0, shift)}px, 0, 0)`;

      const end = Math.min(cards.length, index + visibleCount);
      if (status) status.textContent = `${String(index + 1).padStart(2, "0")}–${String(end).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;

      if (dotsWrap) {
        dotsWrap.querySelectorAll(".reviews-dot").forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === index);
          dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
        });
      }
    };

    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = 0;
    };

    const start = () => {
      stop();
      if (!autoplayEnabled || paused || document.hidden || maxIndex <= 0) return;
      timer = window.setInterval(() => {
        goTo(index >= maxIndex ? 0 : index + 1, false);
      }, autoplayDelay);
    };

    var goTo = (nextIndex, manual = false) => {
      index = nextIndex < 0 ? maxIndex : nextIndex > maxIndex ? 0 : nextIndex;
      update();
      if (manual) start();
    };

    const recalc = () => {
      const prevMax = maxIndex;
      visibleCount = getVisibleCount();
      maxIndex = Math.max(0, cards.length - visibleCount);
      if (prevMax !== maxIndex) buildDots();
      update();
      start();
    };

    buildDots();
    update();

    prev?.addEventListener("click", () => goTo(index - 1, true));
    next?.addEventListener("click", () => goTo(index + 1, true));
    container.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      goTo(index + (event.key === "ArrowRight" ? 1 : -1), true);
    });
    container.addEventListener("focusin", () => {
      paused = true;
      stop();
    });
    container.addEventListener("focusout", () => {
      paused = false;
      start();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });
    window.addEventListener("resize", recalc);

    start();

    track.dataset.carouselReady = "true";
  };

  const initPageStructure = () => {
    arrangeCases();
    renderCaseCommerce();

    const contact = document.querySelector("#contact");
    const quiz = document.querySelector("#brief-quiz");
    if (contact && quiz) contact.insertAdjacentElement("afterend", quiz);
  };

  const initQuizDisclosure = () => {
    const disclosure = document.querySelector("[data-quiz-disclosure]");
    if (!disclosure) return;
    const summary = disclosure.querySelector("summary");

    const openQuiz = (focus = false) => {
      disclosure.open = true;
      if (focus && summary) {
        window.setTimeout(() => summary.focus({ preventScroll: true }), prefersReducedMotion.matches ? 0 : 520);
      }
    };

    document.querySelectorAll('a[href="#brief-quiz"], [data-open-quiz]').forEach((link) => {
      link.addEventListener("click", () => openQuiz(true));
    });

    disclosure.addEventListener("toggle", () => {
      if (disclosure.open) trackEvent("quiz_open", { source: "portfolio" });
    });

    if (window.location.hash === "#brief-quiz") openQuiz(true);
  };

  const initAnalytics = () => {
    document.querySelectorAll('a[href*="t.me/ThorBakiN"]').forEach((link) => {
      link.addEventListener("click", () => trackEvent("telegram_cta", { page: document.body.dataset.page || "home" }));
    });
    document.querySelectorAll("[data-case-id] .case-card-link-badge").forEach((link) => {
      link.addEventListener("click", () => trackEvent("case_open", { case: link.closest("[data-case-id]")?.dataset.caseId || "unknown" }));
    });
    document.querySelectorAll("[data-case-id] details").forEach((details) => {
      details.addEventListener("toggle", () => {
        if (details.open) trackEvent("case_details", { case: details.closest("[data-case-id]")?.dataset.caseId || "unknown" });
      });
    });
  };

  const init = () => {
    initPageStructure();
    setRevealDelays();
    initReveal();
    initHeader();
    initQuizDisclosure();
    initSmoothAnchors();
    initMobileMenu();
    initCasesToggle();
    initDetails();
    renderCaseMetrics();
    initBriefQuiz();
    initFaqAccordion();
    initLanguageSwitcher();
    initBentoShowcase();
    initLandingGallery();
    initReviewsCarousel();
    initChatToggler();
    initAnalytics();
    updateDocumentMeta(currentLang);
    document.body.classList.add("loaded");

    const runDeferred = () => {
      // Nice-to-have pointer effects are the first thing to skip on devices
      // that report a constrained CPU, memory or data-saving mode. Core UI,
      // including the Hero cubes, stays intact.
      if (!isConstrainedDevice) {
        initTilt();
        initHoverScrollMockups();
      }
      initTestRunner();
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(runDeferred, { timeout: 2200 });
    } else {
      window.setTimeout(runDeferred, 600);
    }
  };

// -------------------------------------------------------------
// Interactive Dual-Device Duet Screenshot Hover-Scrolling System
// -------------------------------------------------------------

  const initCasesToggle = () => {
    const button = document.querySelector("[data-cases-toggle]");
    const region = document.querySelector("#more-projects");
    if (!button || !region) return;

    const label = button.querySelector("[data-i18n]");
    let openFrame = 0;
    const updateLabel = (expanded) => {
      const key = expanded ? "cases-show-less" : "cases-show-more";
      label.dataset.i18n = key;
      label.textContent = translations[key][currentLang];
    };

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const nextExpanded = !expanded;
      button.setAttribute("aria-expanded", String(nextExpanded));
      updateLabel(nextExpanded);

      if (nextExpanded) {
        region.hidden = false;
        openFrame = requestAnimationFrame(() => {
          region.classList.add("is-open");
          openFrame = 0;
        });
        return;
      }

      if (openFrame) {
        cancelAnimationFrame(openFrame);
        openFrame = 0;
      }
      region.classList.remove("is-open");
      if (prefersReducedMotion.matches) {
        region.hidden = true;
        return;
      }

      const finishCollapse = (event) => {
        if (event && event.propertyName !== "grid-template-rows") return;
        region.hidden = true;
        region.removeEventListener("transitionend", finishCollapse);
      };
      region.addEventListener("transitionend", finishCollapse);
      window.setTimeout(() => {
        if (!region.classList.contains("is-open")) finishCollapse();
      }, 700);
    });
  };

const initHoverScrollMockups = () => {
  if (!canHover.matches || prefersReducedMotion.matches || window.innerWidth < 900) return;

  // 1. Showcase Mockup Panels (Desktop + Mobile simultaneous scrolling)
  document.querySelectorAll('.visual-mockup').forEach(mockup => {
    const elements = [];

    // Desktop browser screen and image
    const browserScreen = mockup.querySelector('.browser-screen');
    const browserImg = mockup.querySelector('.glass-browser-frame .screenshot-img');
    if (browserScreen && browserImg) {
      elements.push({ screen: browserScreen, img: browserImg });
    }

    // Mobile phone screen and image
    const phoneScreen = mockup.querySelector('.phone-screen');
    const phoneImg = mockup.querySelector('.glass-phone-frame .screenshot-img');
    if (phoneScreen && phoneImg) {
      elements.push({ screen: phoneScreen, img: phoneImg });
    }

    // If it's a standalone mobile mockup (e.g. mockup-3 or mockup-6)
    if (elements.length === 0 && mockup.querySelector('.glass-phone-frame')) {
      const singleScreen = mockup.querySelector('.phone-screen');
      const singleImg = mockup.querySelector('.glass-phone-frame .screenshot-img');
      if (singleScreen && singleImg) {
        elements.push({ screen: singleScreen, img: singleImg });
      }
    }

    if (elements.length === 0) return;

    // Configure core GPU scroll styles
    elements.forEach(item => {
      const { screen, img } = item;
      screen.style.setProperty('position', 'relative', 'important');
      screen.style.setProperty('overflow', 'hidden', 'important');

      img.style.setProperty('position', 'absolute', 'important');
      img.style.setProperty('top', '0', 'important');
      img.style.setProperty('left', '0', 'important');
      img.style.setProperty('width', '100%', 'important');
      img.style.setProperty('height', 'auto', 'important');
      img.style.setProperty('display', 'block', 'important');
      img.style.setProperty('object-fit', 'contain', 'important');
      img.style.setProperty('max-height', 'none', 'important');
      img.style.setProperty('transition', 'transform 3.5s cubic-bezier(0.15, 0.85, 0.35, 1)', 'important');
      img.style.setProperty('transform', 'translateY(0)', 'important');
      img.style.setProperty('transform-origin', 'top center', 'important');
    });

    const doScroll = () => {
      elements.forEach(item => {
        const { screen, img } = item;
        const containerHeight = screen.clientHeight;
        const imgHeight = img.getBoundingClientRect().height;
        if (imgHeight > containerHeight) {
          img.style.setProperty('transform', `translateY(-${imgHeight - containerHeight}px)`, 'important');
        }
      });
    };

    const resetScroll = () => {
      elements.forEach(item => {
        const { img } = item;
        img.style.setProperty('transform', 'translateY(0)', 'important');
      });
    };

    // Bind only to precise pointing devices. Touch scrolling must stay native.
    mockup.addEventListener('mouseenter', doScroll);
    mockup.addEventListener('mouseleave', resetScroll);
  });

  // Case cards intentionally do not use hover-scroll: portfolio previews must
  // remain fully visible and stable at rest on every viewport.
};

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
