(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  let currentLang = "ru";

  // Unified translation dictionary matching data-i18n attributes
  const translations = {
    "nav-about": { ru: "Обо мне", en: "About me" },
    "link-website": { ru: "Сайт", en: "Live Site" },
    "nav-services": { ru: "Что я создаю", en: "What I Create" },
    "nav-cases": { ru: "Кейсы", en: "Cases" },
    "nav-process": { ru: "Процесс работы", en: "Work Process" },
    "nav-contact": { ru: "Контакты", en: "Contacts" },
    "nav-github-btn": { ru: "GitHub-архив", en: "GitHub archive" },
    "logo-name": { ru: "THOR BAKIN", en: "THOR BAKIN" },
    "logo-sub": { ru: "Разработка • AI • Бизнес", en: "Developer • AI • Business" },
    "hero-status": { ru: "Программист • ИИ-инженер • Предприниматель", en: "Developer • AI Engineer • Entrepreneur" },
    "hero-eyebrow": { ru: "Влад · инженер под ключ", en: "Vlad · end-to-end engineer" },
    "hero-title": {
      ru: "Сайты, боты и AI-связки — от идеи до рабочего запуска",
      en: "Websites, bots and AI systems — from idea to working launch"
    },
    "hero-subtitle": {
      ru: "Разбираю задачу, проектирую систему, пишу код и лично отвечаю за запуск.",
      en: "I clarify the task, design the system, write the code and personally own the launch."
    },
    "hero-cta-cases": { ru: "Смотреть работы", en: "View Work" },
    "hero-cta-discuss": { ru: "Обсудить задачу", en: "Discuss a project" },
    "hero-step-brief": { ru: "Задача", en: "Brief" },
    "hero-step-architecture": { ru: "Архитектура", en: "Architecture" },
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
    "about-status-ready": { ru: "🟢 Доступен для новых проектов", en: "🟢 Available for new projects" },
    "about-proof-title": { ru: "Подтверждённый опыт", en: "Proven experience" },
    "about-proof-heading": { ru: "Обо мне", en: "About me" },
    "about-proof-years": { ru: "лет в разработке", en: "years in development" },
    "about-proof-projects": { ru: "коммерческих проектов", en: "commercial projects" },
    "about-proof-rating": { ru: "звёзд на фриланс-биржах", en: "stars on freelance platforms" },
    
    // About Section
    "about-title-main": { ru: "Беру ответственность за путь от идеи до запуска", en: "I take responsibility from idea to launch" },
    "about-p1": { 
      ru: "Я разбираю задачу, проектирую связку, пишу код и довожу проект до рабочего состояния.", 
      en: "I clarify the task, design the system, write the code and bring the project to a working state." 
    },
    "about-p2": { 
      ru: "Помогаю не только сделать сайт, бота или AI-инструмент, но и понять, как это будет приводить заявки, экономить время и двигать проект дальше.", 
      en: "I do not just build a website, bot or AI tool. I help shape how it will bring leads, save time and move the project forward." 
    },
    
    // Category Tabs & Showcases
    "services-title-main": { ru: "Что я разрабатываю", en: "What I Develop" },
    "services-subtitle": { ru: "Сайты, Telegram-боты, AI-инструменты, дашборды и автоматизация ручных процессов.", en: "Websites, Telegram bots, AI tools, dashboards and automation for manual workflows." },
    "services-kpi-directions": { ru: "Направлений", en: "Directions" },
    "services-kpi-system": { ru: "Система под ключ", en: "Turnkey System" },
    "tab-web": { ru: "Маркетплейс-аналитика", en: "Marketplace analytics" },
    "tab-web-sub": { ru: "Аналитика маркетплейсов", en: "Marketplace analytics" },
    "tab-webapps": { ru: "Web App / SaaS", en: "Web App / SaaS" },
    "tab-webapps-sub": { ru: "Калькуляторы и кабинеты", en: "Calculators and dashboards" },
    "tab-saas": { ru: "Бэкап и DevOps", en: "Backup & DevOps" },
    "tab-saas-sub": { ru: "Резервные процессы", en: "Resilient operations" },
    "tab-ai": { ru: "Парсинг и API", en: "Parsing & API" },
    "tab-ai-sub": { ru: "Сбор и нормализация данных", en: "Data collection and cleanup" },
    "tab-dash": { ru: "Дашборды", en: "Dashboards" },
    "tab-dash-sub": { ru: "Аналитика и визуализация данных", en: "Analytics & data visualization" },
    "tab-scripts": { ru: "Автоматизации", en: "Automations" },
    "tab-scripts-sub": { ru: "Ускорение бизнес-процессов", en: "Business workflow acceleration" },
    "tab-bots": { ru: "Telegram-боты", en: "Telegram Bots" },
    "tab-bots-sub": { ru: "Интерактивные чат-интерфейсы", en: "Interactive chat interfaces" },
    "tab-api": { ru: "Интеграции API", en: "API Integrations" },
    "tab-api-sub": { ru: "Синхронизация сторонних сервисов", en: "Third-party service sync" },
    "tab-landings": { ru: "Лендинги и сайты", en: "Landings & websites" },
    "tab-landings-sub": { ru: "Live-примеры на Vercel", en: "Live examples on Vercel" },
    
    "showcase-web-title": { ru: "WB/Ozon Dashboard: продажи, остатки и финансы", en: "WB/Ozon Dashboard: sales, stock and finance" },
    "showcase-webapps-title": { ru: "RepairCalc: быстрый расчет сметы ремонта", en: "RepairCalc: fast renovation estimate flow" },
    "showcase-saas-title": { ru: "AgentBackup: резервные копии по расписанию", en: "AgentBackup: scheduled cloud backups" },
    "showcase-ai-title": { ru: "Parser: сбор данных из реестров и API", en: "Parser: registry and API data collection" },
    "showcase-dash-title": { ru: "Дашборды и аналитика", en: "Dashboards & Analytics" },
    "showcase-scripts-title": { ru: "AutoPostingTG: AI-автопостинг в Telegram", en: "AutoPostingTG: AI-assisted Telegram autoposting" },
    "showcase-bots-title": { ru: "Telegram-боты для записи и оплат", en: "Telegram bots for booking and payments" },
    "showcase-api-title": { ru: "Интеграции внешних сервисов API", en: "External API Integrations" },
    "showcase-landings-title": { ru: "Лендинги и сайты: премиальная подача услуги", en: "Landings & websites: premium service presentation" },

    // Problem-Solution-Result flow details
    "lbl-problem": { ru: "ПРОБЛЕМА:", en: "PROBLEM:" },
    "lbl-solution": { ru: "РЕШЕНИЕ:", en: "SOLUTION:" },
    "lbl-result": { ru: "РЕЗУЛЬТАТ:", en: "RESULT:" },

    "showcase-web-prob": { ru: "Данные WB/Ozon разбросаны", en: "WB/Ozon data is fragmented" },
    "showcase-web-sol": { ru: "Кабинет с продажами, остатками и финансами", en: "Dashboard for sales, stock and finance" },
    "showcase-web-res": { ru: "Один экран для решений", en: "One screen for decisions" },

    "showcase-webapps-prob": { ru: "Сметы считают вручную", en: "Estimates are calculated manually" },
    "showcase-webapps-sol": { ru: "SaaS-калькулятор с пакетами и итогом", en: "SaaS calculator with packages and total" },
    "showcase-webapps-res": { ru: "Быстрый расчет для клиента", en: "Fast client-facing estimate" },

    "showcase-saas-prob": { ru: "Бэкапы забывают запускать", en: "Backups are easy to forget" },
    "showcase-saas-sol": { ru: "Расписание, логи, облако", en: "Schedule, logs, cloud storage" },
    "showcase-saas-res": { ru: "Контроль без ручной рутины", en: "Control without manual routine" },

    "showcase-ai-prob": { ru: "Реестры неудобны для работы", en: "Registries are hard to use" },
    "showcase-ai-sol": { ru: "Парсинг, нормализация, проверки", en: "Parsing, normalization, checks" },
    "showcase-ai-res": { ru: "Данные готовы к анализу", en: "Data ready for analysis" },

    "showcase-dash-prob": { ru: "Метрики не видны сразу", en: "Metrics are not visible at a glance" },
    "showcase-dash-sol": { ru: "Дашборд с ключевыми срезами", en: "Dashboard with key slices" },
    "showcase-dash-res": { ru: "Быстрее видно динамику", en: "Trends are visible faster" },

    "showcase-scripts-prob": { ru: "Посты готовят и публикуют вручную", en: "Posts are prepared and published manually" },
    "showcase-scripts-sol": { ru: "AI-генерация, превью, изображения и расписание", en: "AI generation, previews, images and scheduling" },
    "showcase-scripts-res": { ru: "Стиль канала сохраняется в автоматическом потоке", en: "The channel style stays consistent in an automated flow" },

    "showcase-bots-prob": { ru: "Клиенты ждут ответа", en: "Clients wait for replies" },
    "showcase-bots-sol": { ru: "Запись и оплата в Telegram", en: "Booking and payment in Telegram" },
    "showcase-bots-res": { ru: "Заявка за 2 шага", en: "Booking in 2 steps" },

    "showcase-api-prob": { ru: "CRM-система изолирована от платежей и таблиц", en: "CRM system isolated from billing and analytical spreadsheets" },
    "showcase-api-sol": { ru: "Связующий слой на Node.js для обмена вебхуками", en: "Custom Node.js bridge orchestrating webhook queues" },
    "showcase-api-res": { ru: "Отказоустойчивая интеграция amoCRM, Stripe и Google Sheets", en: "Fault-tolerant synchronization of amoCRM, Stripe and Sheets" },

    "showcase-landings-prob": { ru: "Экспертной услуге нужен сайт, который выглядит дороже обычной визитки", en: "An expert service needs a site that feels stronger than a generic business card" },
    "showcase-landings-sol": { ru: "Живой лендинг с аккуратной визуальной системой, адаптивом и понятным CTA", en: "A live landing page with a polished visual system, responsive layout and clear CTA" },
    "showcase-landings-res": { ru: "Работу можно открыть, проверить и использовать как портфолио-кейс", en: "The work can be opened, checked and used as a portfolio case" },
    
    "feat-design": { ru: "Адаптивный дизайн", en: "Responsive Design" },
    "feat-speed": { ru: "Высокая скорость", en: "Ultimate Speed" },
    "feat-seo": { ru: "SEO-оптимизация", en: "SEO Optimization" },
    "feat-security": { ru: "Безопасность", en: "High Security" },
    "feat-scale": { ru: "Масштабируемость", en: "Scalability" },
    "feat-rbac": { ru: "Ролевой доступ", en: "RBAC Control" },
    "feat-llm": { ru: "GPT-4o / Claude", en: "GPT-4o / Claude" },
    "feat-vector": { ru: "Vector Databases", en: "Vector DBs" },
    "feat-247": { ru: "Авто-ответы 24/7", en: "24/7 Auto-replies" },
    "feat-d3": { ru: "Chart.js / D3", en: "Chart.js / D3" },
    "feat-realtime": { ru: "Реальное время", en: "Real-time updates" },
    "feat-filter": { ru: "Фильтрация данных", en: "Data Filtering" },
    "feat-cron": { ru: "Cron-задачи", en: "Cron Jobs" },
    "feat-parsing": { ru: "Парсинг данных", en: "Data Scraping" },
    "feat-fault": { ru: "Отказоустойчивость", en: "Fault Tolerance" },
    "feat-python": { ru: "aiogram / Node.js", en: "aiogram / Node.js" },
    "feat-payments": { ru: "Прием оплат", en: "Payment Gateways" },
    "feat-webapps": { ru: "Web App интерфейсы", en: "Web App Interfaces" },
    "feat-crm": { ru: "amoCRM & Stripe", en: "amoCRM & Stripe" },
    "feat-webhooks": { ru: "Webhooks", en: "Webhooks" },
    "feat-sync": { ru: "Синхронизация данных", en: "Data Synchronization" },
    "feat-ui": { ru: "UI-состояния", en: "Responsive UI States" },
    "feat-live": { ru: "Live-сайт", en: "Live site" },
    "feat-vercel": { ru: "Vercel deploy", en: "Vercel deploy" },
 
    "widget-btn-examples": { ru: "Примеры проектов", en: "Project Examples" },
    "showcase-open-repo": { ru: "Открыть репозиторий", en: "Open Repository" },
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
    "cases-title-main": { ru: "Мои кейсы", en: "My Cases" },
    "cases-subtitle": {
      ru: "Опубликованные демо и рабочие продукты: можно открыть, проверить интерфейс и посмотреть код.",
      en: "Published demos and working products: open the interface, test it and inspect the code."
    },
    "about-editorial-p1": {
      ru: "Я не передаю проект по цепочке исполнителей. Сам разбираю задачу, проектирую связки, пишу код и довожу решение до запуска.",
      en: "I do not pass a project down a chain of contractors. I clarify the task, design the connections, write the code and bring the solution to launch."
    },
    "about-editorial-p2": {
      ru: "Работаю на стыке сайтов, Telegram, автоматизации и AI/API — так, чтобы части системы усиливали друг друга.",
      en: "I work across websites, Telegram, automation and AI/API so every part of the system reinforces the others."
    },
    "cases-show-more": { ru: "Показать больше", en: "Show more" },
    "cases-show-less": { ru: "Скрыть проекты", en: "Hide projects" },
    "lbl-task": { ru: "Задача", en: "Task" },
    "lbl-solution": { ru: "Решение", en: "Solution" },
    "lbl-interface": { ru: "Интерфейс", en: "Interface" },
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
    "autopost-desc": { ru: "Telegram-бот готовит посты для канала: генерирует текст, подбирает изображение, показывает превью и публикует по команде или расписанию.", en: "A Telegram bot that prepares channel posts: generates copy, selects an image, shows a preview and publishes on command or schedule." },
    "autopost-task": { ru: "Снять ручную подготовку регулярных публикаций, сохранив контроль перед отправкой в канал.", en: "Remove manual work from recurring posts while keeping review control before publishing." },
    "autopost-solution": { ru: "Сценарий preview → проверка → post, режимы подачи, защита от повторов и обучение стилю на эталонных постах.", en: "A preview → review → post flow, tone modes, duplicate protection and style training from reference posts." },
    "c1-title": { ru: "Wildberries & Ozon Аналитика (WB-Ozon-Dashboard)", en: "Wildberries & Ozon Analytics (WB-Ozon-Dashboard)" },
    "c1-desc": { 
      ru: "Внутренний личный кабинет и дашборд для отслеживания продаж, остатков товаров, финансов и операций на маркетплейсах.", 
      en: "Custom internal analytics dashboard and console for tracking sales, stocks, finance, and operations across Wildberries and Ozon." 
    },
    "c1-details": {
      ru: "Отображение графиков Chart.js, интеграция данных маркетплейсов, товарные срезы, фильтры и интерфейс для операционного контроля.",
      en: "Chart.js views, marketplace data integration, product slices, filters, and an operational control interface."
    },
    "c2-title": { ru: "SaaS Калькулятор Ремонта (RepairCalc)", en: "SaaS Repair Cost Estimator (RepairCalc)" },
    "c2-desc": { 
      ru: "Интерактивная панель и калькулятор для точного расчета сметы строительных и ремонтных работ под ключ.", 
      en: "Interactive SaaS panel and multi-featured calculator for precise construction and renovation cost estimates." 
    },
    "c2-details": {
      ru: "Адаптивный интерфейс, динамический пересчет стоимости, сценарии работ и подготовка сметы для передачи клиенту.",
      en: "Responsive UI, dynamic cost recalculation, work scenarios, and estimate preparation for client handoff."
    },
    "c3-title": { ru: "Облачный бэкап-планировщик (AgentBackup)", en: "Cloud DB Backup Scheduler (AgentBackup)" },
    "c3-desc": { 
      ru: "Автономная система резервного копирования баз данных в облачные хранилища по гибкому расписанию.", 
      en: "Autonomous system for scheduled database backups to cloud storage targets." 
    },
    "c3-details": {
      ru: "Фоновые задания, настройка расписаний, журналирование ошибок и уведомления о статусе резервных копий.",
      en: "Background jobs, schedule configuration, error logging, and backup status notifications."
    },
    "c4-title": { ru: "Парсер Росаккредитации (Parser-Rosaccreditation)", en: "Rosaccreditation Parser (Parser-Rosaccreditation)" },
    "c4-desc": { 
      ru: "Инструмент для сбора, нормализации и подготовки данных из реестров Росаккредитации к дальнейшей работе.", 
      en: "Tool for collecting, normalizing, and preparing Rosaccreditation registry data for further processing." 
    },
    "c4-details": {
      ru: "Парсинг источников, структурирование записей, подготовка выгрузок и проверка данных перед использованием в операционных задачах.",
      en: "Source parsing, record structuring, export preparation, and data checks before operational use."
    },
    "c5-title": { ru: "Маникюр-Бот & CRM (ManicureBot)", en: "Manicure Booking Bot & CRM (ManicureBot)" },
    "c5-desc": { 
      ru: "Telegram-бот для автоматической записи клиентов: выбор услуги, мастера, времени и передача заявки в рабочий процесс.", 
      en: "Telegram bot for automated client booking: service, specialist, time selection, and request handoff into the workflow." 
    },
    "c5-details": {
      ru: "Сценарии записи, уведомления, хранение заявок и база для дальнейшей CRM-логики салона.",
      en: "Booking scenarios, notifications, request storage, and a base for further salon CRM logic."
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
    "c7-title": { ru: "Связка amoCRM + Stripe + Google Таблицы", en: "amoCRM + Stripe + Google Sheets Sync" },
    "c7-desc": {
      ru: "Отказоустойчивый связующий мост для синхронизации оплат, статусов сделок в CRM и ведения учета в таблицах.",
      en: "A fault-tolerant bridge for syncing payments, CRM lead statuses, and Google Sheets bookkeeping."
    },
    "c7-role-desc": {
      ru: "Разработка API-коннектора, обработка вебхуков Stripe, автоматическое обновление таблиц.",
      en: "API connector development, Stripe webhook handling, and automated Google Sheets updates."
    },
    "case-btn-details": { ru: "Подробнее", en: "Details" },
    "github-banner-desc": { ru: "Открытые репозитории, пет-проекты и полезные библиотеки в одном месте.", en: "Open repositories, automation wrappers, and structured packages ready for launch." },
    "github-banner-btn": { ru: "Перейти на GitHub", en: "Explore GitHub" },
 
    // Process Section
    "process-title-main": { ru: "Как я довожу проект до запуска", en: "How I bring a project to launch" },
    "step1-title": { ru: "Диагностика", en: "Diagnostics" },
    "step1-sub": { ru: "Разбираем задачу и формируем понимание проекта.", en: "Deconstructing goals to compile an analytical layout spec." },
    "step2-title": { ru: "Реализация + тестирование", en: "Implementation & Testing" },
    "step2-sub": { ru: "Разрабатываем проект итерациями и тщательно тестируем.", en: "Iterative codebase assembly backed by comprehensive test coverages." },
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
    
    "term-run-btn": { ru: "Run Auto-Tests", en: "Run Auto-Tests" },
    "check-ad": { ru: "Адаптивность", en: "Mobile Responsive" },
    "check-perf": { ru: "Скорость загрузки", en: "Page Load Speed" },
    "check-forms": { ru: "Формы и интеграции", en: "API Submissions" },
    "check-ui": { ru: "UI-состояния", en: "Smooth UI States" },
    "check-seo": { ru: "SEO-структура", en: "SEO Semantics" },
    "check-edge": { ru: "Ошибки и edge cases", en: "Fault Tolerances" },
    "gauge-perf": { ru: "Performance", en: "Performance" },
 
    "launch-ok-title": { ru: "Запуск проекта - Успешно", en: "Project Launch - Success" },
    "launch-ok-desc": { ru: "Проект запущен и доступен онлайн", en: "Codebase is live on production and fully accessible" },
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
    
    // Reviews Section
    "reviews-title-main": { ru: "Отзывы клиентов", en: "Client Reviews" },
    "reviews-subtitle": { 
      ru: "Клиенты чаще всего отмечают ответственность, сроки, понятные объяснения и спокойный запуск.", 
      en: "Clients most often mention responsibility, timing, clear explanations and a calm launch." 
    },
    "reviews-verified": { ru: "ПРОВЕРЕНО", en: "VERIFIED" },
    "reviews-count-total": { ru: "10 отзывов", en: "10 reviews" },
    "rev-cat-1": { ru: "Разработка на Python", en: "Python Engineering" },
    "rev-cat-2": { ru: "Landing page • Создание сайта на Tilda", en: "Landing Page • Tilda Development" },
    "rev-cat-3": { ru: "Создание форумов", en: "Forum Customization" },
    "rev-text-1": { 
      ru: "Специалист полностью выполнил задачи и учел все правки", 
      en: "The specialist fully completed all requirements and integrated all revisions flawlessly." 
    },
    "rev-text-2": { 
      ru: "Влад помог настроить интерактивную карту с кликабельными зонами на Тильде. Вместо использования стандартных инструментов конструктора - написал код и к нему ещё небольшой инструмент, упрощающий использование + подробные комментарии + созвон с пояснениями. Идеально.", 
      en: "Vlad helped configure an interactive map with clickable hotspots on Tilda. Instead of using generic builder widgets, he coded custom scripts and built a neat helper tool to simplify usage, complete with rich comments and a walkthrough video call. Absolutely perfect." 
    },
    "rev-text-3": { 
      ru: "Молодой, но знающий специалист. Соблюдает сроки, договоренности по цене. Приятно удивлен.", 
      en: "A young yet highly competent professional. Outstanding adherence to deadlines and agreed budget. Pleasantly surprised." 
    },
    "rev-cat-4": { ru: "Интеграция API • Дашборды", en: "API Integration • Dashboards" },
    "rev-cat-5": { ru: "Автоматизация • Облачные бэкапы", en: "Automation • Cloud Backups" },
    "rev-text-4": { 
      ru: "Разработал отличный аналитический дашборд. Графики строятся мгновенно, данные по API маркетплейсов выгружаются без сбоев. Профессионал.", 
      en: "Developed a brilliant analytical dashboard. Live charts load instantly, and stock/sales data fetches via marketplace APIs flawlessly. A true professional." 
    },
    "rev-text-5": { 
      ru: "Отличный скрипт автоматизации бэкапов. Настроил резервное копирование в S3 по расписанию, подключил логирование в Telegram. Всё работает идеально.", 
      en: "Excellent backup automation script. Configured scheduled uploads to S3 cloud storage with Telegram alert notifications. Everything runs perfectly." 
    },
    "rev-cat-6": { ru: "SaaS-интерфейс", en: "SaaS Interface" },
    "rev-cat-7": { ru: "Telegram-бот", en: "Telegram Bot" },
    "rev-cat-8": { ru: "Сайт на хостинге", en: "Hosted Website" },
    "rev-text-6": { 
      ru: "Быстро понял задачу и собрал интерфейс без лишних обсуждений. Видно, что человек думает о продукте, а не только о верстке.", 
      en: "Quickly understood the task and built the interface without unnecessary back-and-forth. It is clear he thinks about the product, not just layout." 
    },
    "rev-text-7": { 
      ru: "Бот запустили спокойно: сценарии понятные, сообщения аккуратные, после запуска Влад помог поправить мелочи.", 
      en: "The bot launched smoothly: clear flows, polished messages, and Vlad helped tune the details after launch." 
    },
    "rev-text-8": { 
      ru: "Получился не шаблон, а аккуратный сайт под мой стиль. Отдельно понравилось, что все объяснил простым языком.", 
      en: "It did not feel like a template. The site matched my style, and I especially liked that everything was explained in plain language." 
    },
    "rev-cat-9": { ru: "Интеграция API • CRM", en: "API Integration • CRM" },
    "rev-text-9": {
      ru: "Интеграция CRM и телефонии. Влад связал все по API, настроил вебхуки. Все работает стабильно, без задержек. Отличная работа.",
      en: "CRM and telephony integration. Vlad hooked everything via API and setup webhooks. Everything runs stable and without delays. Great work."
    },
    "rev-cat-10": { ru: "Landing page", en: "Landing page" },
    "rev-text-10": {
      ru: "Разработка Landing Page. Очень довольна результатом. Дизайн современный, все элементы анимированы аккуратно, формы отправляют заявки без сбоев.",
      en: "Landing Page development. Very satisfied with the result. Modern design, clean animations, and forms submit leads without issues."
    },
    
    "footer-copy": { ru: "Все права защищены.", en: "All rights reserved." }
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



  const initTextSplit = () => {
    const title = document.querySelector("[data-hero-title]");
    if (!title) return;

    // Fetch translated raw html string to parse text node vs spans correctly
    const textHtml = translations["hero-title"][currentLang];
    
    // Set textHtml temporaly to parse
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = textHtml;

    const childNodes = Array.from(tempDiv.childNodes);
    title.innerHTML = "";

    let wordIndex = 0;

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.trim().split(/\s+/);
        words.forEach((word) => {
          if (!word) return;
          const wrap = document.createElement("span");
          wrap.className = "word-wrap";
          const span = document.createElement("span");
          span.className = "word";
          span.textContent = word;
          wrap.appendChild(span);
          title.appendChild(wrap);
          title.appendChild(document.createTextNode(" "));
          wordIndex++;
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const isOutline = node.classList.contains("hero-outline-word");
        const text = node.textContent.trim();
        const words = text.split(/\s+/);
        words.forEach((word) => {
          if (!word) return;
          const wrap = document.createElement("span");
          wrap.className = "word-wrap";
          const span = document.createElement("span");
          span.className = "word" + (isOutline ? " word--outline" : "");
          span.textContent = word;
          wrap.appendChild(span);
          title.appendChild(wrap);
          title.appendChild(document.createTextNode(" "));
          wordIndex++;
        });
      }
    });
  };

  const animateHero = () => {
    if (prefersReducedMotion.matches) {
      document.querySelectorAll(".hero-title .word").forEach((w) => w.classList.add("is-visible"));
      return;
    }

    // Trigger title words animation
    const words = document.querySelectorAll(".hero-title .word");
    words.forEach((word, index) => {
      word.style.transitionDelay = `${index * 0.06}s`;
      requestAnimationFrame(() => {
        word.classList.add("is-visible");
      });
    });
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    elements.forEach((element) => observer.observe(element));
  };

  const initHeader = () => {
    const header = document.querySelector("[data-header]");
    if (!header) return;

    const update = rafThrottle(() => {
      header.classList.toggle("scrolled", window.scrollY > 24);
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
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
    const button = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#mobile-menu");
    if (!button || !menu) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let lastFocus = null;
    let focusTimer = 0;

    const openMenu = () => {
      lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      button.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Закрыть меню");
      menu.classList.add("active");
      menu.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
      const focusFirst = () => {
        if (menu.classList.contains("active")) menu.querySelector(focusableSelector)?.focus();
      };
      menu.addEventListener("transitionend", focusFirst, { once: true });
      focusTimer = window.setTimeout(focusFirst, prefersReducedMotion.matches ? 0 : 600);
    };

    const closeMenu = (returnFocus = true) => {
      button.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Открыть меню");
      menu.classList.remove("active");
      menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
      window.clearTimeout(focusTimer);
      if (returnFocus && lastFocus) lastFocus.focus();
    };

    button.addEventListener("click", () => {
      if (menu.classList.contains("active")) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (!menu.classList.contains("active")) return;

      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(menu.querySelectorAll(focusableSelector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!menu.contains(document.activeElement)) {
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
      if (window.innerWidth >= 901 && menu.classList.contains("active")) {
        closeMenu(false);
      }
    });
  };

  const initCounters = () => {
    const counters = Array.from(document.querySelectorAll("[data-counter]"));
    if (!counters.length) return;

    const animate = (element) => {
      const target = Number(element.dataset.count || 0);
      const suffix = element.dataset.suffix || "";
      const duration = prefersReducedMotion.matches ? 1 : 1500;
      const start = performance.now();

      const step = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(target * eased);
        element.textContent = `${current.toLocaleString("ru-RU")}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((counter) => observer.observe(counter));
  };

  const initTilt = () => {
    if (!canHover.matches || prefersReducedMotion.matches || window.innerWidth < 900) return;

    document.querySelectorAll("[data-tilt]").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--ry", `${px * 8}deg`);
        element.style.setProperty("--rx", `${py * -8}deg`);
      });

      element.addEventListener("pointerleave", () => {
        element.style.setProperty("--ry", "0deg");
        element.style.setProperty("--rx", "0deg");
      });
    });
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

  // Language Switcher Logic
  const initLanguageSwitcher = () => {
    const switcher = document.querySelector(".lang-switcher");
    if (!switcher) return;

    const translatePage = (lang) => {
      currentLang = lang;
      document.documentElement.lang = lang;
      
      // Update switcher active states
      switcher.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
      });

      // Apply body fade transition effect
      document.body.style.transition = "opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1)";
      document.body.style.opacity = "0.93";

      setTimeout(() => {
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          const key = el.dataset.i18n;
          if (!translations[key]) return;

          // Hero title text splits automatically, set raw value first
          if (key === "hero-title") {
            el.innerHTML = translations[key][lang];
          } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = translations[key][lang];
          } else {
            el.textContent = translations[key][lang];
          }
        });

        // Re-run typography splits and animations
        initTextSplit();
        animateHero();

        // Sync bento categories text content dynamically
        syncBentoShowcase();
        syncLandingGallery();

        // Keep chat dialogues current if stage 1 is active
        updateChatContent();

        document.body.style.opacity = "1";
      }, 180);
    };

    switcher.addEventListener("click", (e) => {
      const btn = e.target.closest(".lang-btn");
      if (!btn || btn.classList.contains("active")) return;
      translatePage(btn.dataset.lang);
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
    features: ["feat-d3", "feat-realtime", "feat-filter"],
    url: "https://github.com/vladkorkishkooff-tech/WB-Ozon-Dashboard",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    langKey: "tab-webapps",
    titleKey: "showcase-webapps-title",
    probKey: "showcase-webapps-prob",
    solKey: "showcase-webapps-sol",
    resKey: "showcase-webapps-res",
    features: ["feat-ui", "feat-scale", "feat-security"],
    url: "https://github.com/vladkorkishkooff-tech/RepairCalc",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    langKey: "tab-saas",
    titleKey: "showcase-saas-title",
    probKey: "showcase-saas-prob",
    solKey: "showcase-saas-sol",
    resKey: "showcase-saas-res",
    features: ["feat-cron", "feat-fault", "feat-security"],
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
    features: ["feat-parsing", "feat-sync", "feat-fault"],
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
    features: ["feat-d3", "feat-realtime", "feat-filter"],
    url: "https://github.com/vladkorkishkooff-tech/WB-Ozon-Dashboard",
    ctaKey: "showcase-open-repo"
  },
  {
    icon: `<svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    langKey: "tab-scripts",
    titleKey: "showcase-scripts-title",
    probKey: "showcase-scripts-prob",
    solKey: "showcase-scripts-sol",
    resKey: "showcase-scripts-res",
    features: ["feat-llm", "feat-cron", "feat-fault"],
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
    features: ["feat-python", "feat-payments", "feat-webapps"],
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
    features: ["feat-crm", "feat-webhooks", "feat-sync"],
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
    features: ["feat-live", "feat-vercel", "feat-design"],
    url: "https://premium-visit-card.vercel.app/",
    ctaKey: "showcase-open-site"
  }
];

  const landingSlides = [
    { name: { ru: "Сайт психолога", en: "Psychologist website" }, src: "case_premium_visit_card.webp", alt: { ru: "Сайт психолога", en: "Psychologist landing page" }, url: "https://premium-visit-card.vercel.app/" },
    { name: { ru: "Fitness", en: "Fitness" }, src: "case_landing_fitness.webp", alt: { ru: "Лендинг фитнес-тренера", en: "Fitness coach landing page" }, url: "https://01-fitness-coach.vercel.app" },
    { name: { ru: "Massage", en: "Massage" }, src: "case_landing_massage.webp", alt: { ru: "Лендинг массажной практики", en: "Massage practice landing page" }, url: "https://02-massage-therapist.vercel.app" },
    { name: { ru: "English tutor", en: "English tutor" }, src: "case_landing_english_tutor.webp", alt: { ru: "Лендинг преподавателя английского", en: "English tutor landing page" }, url: "https://03-english-tutor.vercel.app" },
  ];
  let activeLandingIndex = 0;

  const syncLandingGallery = (animate = false) => {
    const image = document.querySelector("[data-landing-image]");
    const name = document.querySelector("[data-landing-name]");
    const counter = document.querySelector("[data-landing-counter]");
    const dots = document.querySelector("[data-landing-dots]");
    if (!image || !name || !counter || !dots) return;

    const slide = landingSlides[activeLandingIndex];
    const applySlide = () => {
      image.src = slide.src;
      image.alt = slide.alt[currentLang];
      name.textContent = slide.name[currentLang];
      counter.textContent = `${String(activeLandingIndex + 1).padStart(2, "0")} / ${String(landingSlides.length).padStart(2, "0")}`;
      dots.querySelectorAll("span").forEach((dot, index) => dot.classList.toggle("active", index === activeLandingIndex));
      bentoMockupData[8].url = slide.url;
      if (activeBentoIndex === 8) syncBentoShowcase();
      image.classList.remove("is-changing");
    };

    if (animate && !prefersReducedMotion.matches) {
      image.classList.add("is-changing");
      window.setTimeout(applySlide, 180);
    } else {
      applySlide();
    }
  };

  const initLandingGallery = () => {
    const gallery = document.querySelector("[data-landing-gallery]");
    if (!gallery) return;
    const dots = gallery.querySelector("[data-landing-dots]");
    dots.innerHTML = landingSlides.map(() => "<span></span>").join("");

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
    
    // Set showcase pill icon & title
    const pillIcon = document.querySelector(".showcase-cat-icon");
    const pillTitle = document.querySelector("#showcase-meta-pill");
    if (pillIcon) pillIcon.innerHTML = data.icon;
    if (pillTitle) pillTitle.textContent = translations[data.langKey][currentLang];

    // Set title
    const mainTitle = document.querySelector("#showcase-title");
    if (mainTitle) mainTitle.textContent = translations[data.titleKey][currentLang];

    // Set Problem-Solution-Result flow
    const probEl = document.querySelector("#showcase-problem");
    const solEl = document.querySelector("#showcase-solution");
    const resEl = document.querySelector("#showcase-result");
    if (probEl) probEl.textContent = translations[data.probKey][currentLang];
    if (solEl) solEl.textContent = translations[data.solKey][currentLang];
    if (resEl) resEl.textContent = translations[data.resKey][currentLang];

    // Set features
    const featuresWrap = document.querySelector("#showcase-features");
    if (featuresWrap) {
      featuresWrap.innerHTML = "";
      data.features.forEach((featKey) => {
        const span = document.createElement("span");
        span.className = "feature-bullet";
        span.textContent = translations[featKey][currentLang];
        featuresWrap.appendChild(span);
      });
    }

    // Toggle active visual mockup
      // Toggle active visual mockup
  document.querySelectorAll(".visual-mockup").forEach((mock, index) => {
    mock.classList.toggle("active", index === activeBentoIndex);
  });

  // Dynamic Scroll Button live URL bindings
  const scrollBtn = document.querySelector("#showcase-scroll-btn");
  if (scrollBtn) {
    if (data.url) {
      scrollBtn.removeAttribute("onclick");
      scrollBtn.onclick = (e) => {
        e.preventDefault();
        window.open(data.url, '_blank');
      };
      const textEl = scrollBtn.querySelector("span");
      if (textEl) {
        textEl.textContent = translations[data.ctaKey || "showcase-open-repo"][currentLang];
      }
    } else {
      scrollBtn.onclick = () => {
        document.querySelector('#cases').scrollIntoView({behavior: 'smooth'});
      };
      const textEl = scrollBtn.querySelector("span");
      if (textEl) {
        textEl.textContent = translations["widget-btn-examples"][currentLang];
      }
    }
  }
};

  const initBentoShowcase = () => {
    const buttons = document.querySelectorAll(".service-tab-btn");
    const thumbBtns = document.querySelectorAll(".thumb-btn");

    const nav = document.querySelector(".services-nav-tabs");
    const thumbnails = document.querySelector(".showcase-thumbnails-strip");
    const landingButton = document.querySelector('.service-tab-btn[data-tab-index="8"]');
    const landingThumb = document.querySelector('.thumb-btn[data-thumb-index="8"]');
    if (nav && landingButton) nav.prepend(landingButton);
    if (thumbnails && landingThumb) thumbnails.prepend(landingThumb);

    const switchTab = (index) => {
      if (activeBentoIndex === index) return;
      activeBentoIndex = index;

      // Update sidebar tab active classes
      buttons.forEach((b) => {
        const isActive = Number(b.dataset.tabIndex) === index;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-selected", String(isActive));
      });

      // Update thumbnails active classes
      thumbBtns.forEach((tb) => tb.classList.toggle("active", Number(tb.dataset.thumbIndex) === index));

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

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => switchTab(Number(btn.dataset.tabIndex)));
    });

    thumbBtns.forEach((tb) => {
      tb.addEventListener("click", () => switchTab(Number(tb.dataset.thumbIndex)));
    });

    buttons.forEach((button) => {
      const active = Number(button.dataset.tabIndex) === activeBentoIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    thumbBtns.forEach((thumb) => thumb.classList.toggle("active", Number(thumb.dataset.thumbIndex) === activeBentoIndex));
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
    const gaugeCount = document.querySelector("#perf-number-counter");

    if (!runBtn || !codeArea) return;

    const testLogs = {
      ru: [
        "Running code linter check... OK",
        "Compiling component bundle: dashboard.tsx... OK",
        "Executing core integration tests... SUCCESS",
        "Verifying SSL handshake... Active",
        "Optimizing build asset sizes... 98% Score",
        "Diagnostics finished. System is stable."
      ],
      en: [
        "Running code linter check... OK",
        "Compiling component bundle: dashboard.tsx... OK",
        "Executing core integration tests... SUCCESS",
        "Verifying SSL handshake... Active",
        "Optimizing build asset sizes... 98% Score",
        "Diagnostics finished. System is stable."
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

      const countGauge = () => {
        if (!gaugeCount) {
          setTimeout(restore, 700);
          return;
        }

        let count = 0;
        const tick = () => {
          gaugeCount.textContent = String(Math.min(count, 98));
          count += 2;
          if (count <= 100) {
            setTimeout(tick, 15);
          } else {
            setTimeout(restore, 700);
          }
        };

        tick();
      };

      const printNextLog = () => {
        if (currentLine >= logs.length) {
          countGauge();
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


  const init = () => {
    initTextSplit();
    setRevealDelays();
    initReveal();
    initHeader();
    initSmoothAnchors();
    initMobileMenu();
    initCounters();
    initTilt();
    initSplineBackground();
    initCasesToggle();
    initAboutProof();
    initDetails();
    initLanguageSwitcher();
    initBentoShowcase();
    initLandingGallery();
    initChatToggler();
    initTestRunner();
    initHoverScrollMockups();
    animateHero();
    document.body.classList.add("loaded");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

// -------------------------------------------------------------
// Interactive Dual-Device Duet Screenshot Hover-Scrolling System
// -------------------------------------------------------------

  // -------------------------------------------------------------
  // Lazy Spline background with static fallbacks
  // -------------------------------------------------------------
  const initSplineBackground = () => {
    const shell = document.querySelector("[data-spline-shell]");
    if (!shell || window.innerWidth <= 900 || !canHover.matches || prefersReducedMotion.matches || navigator.connection?.saveData) return;

    const mountViewer = () => {
      if (shell.querySelector("spline-viewer")) return;

      const viewer = document.createElement("spline-viewer");
      viewer.setAttribute("url", "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode");
      viewer.setAttribute("loading", "lazy");
      viewer.setAttribute("unloadable", "");
      viewer.setAttribute("events-target", "global");
      viewer.setAttribute("loading-anim-type", "spinner-small-dark");

      const revealScene = () => shell.classList.add("is-loaded");
      viewer.addEventListener("load-complete", revealScene);
      viewer.addEventListener("unload", () => shell.classList.remove("is-loaded"));
      shell.appendChild(viewer);

      window.setTimeout(() => {
        if (viewer.shadowRoot?.querySelector("canvas")) revealScene();
      }, 4500);
    };

    const loadViewerModule = () => {
      if (customElements.get("spline-viewer")) {
        mountViewer();
        return;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js";
      script.addEventListener("load", mountViewer, { once: true });
      document.head.appendChild(script);
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadViewerModule, { timeout: 700 });
    } else {
      window.setTimeout(loadViewerModule, 200);
    }
  };

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

  // -------------------------------------------------------------
  const initAboutProof = () => {
    const panel = document.querySelector("[data-about-proof]");
    if (!panel || prefersReducedMotion.matches || !("IntersectionObserver" in window)) return;

    const counters = panel.querySelectorAll("[data-proof-count]");
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      panel.classList.add("is-visible");
      counters.forEach((counter) => {
        const target = Number(counter.dataset.proofCount);
        const startedAt = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - startedAt) / 900, 1);
          counter.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(panel);
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
  
  // 2. Bento Grid Case Cards Scrolling
  document.querySelectorAll('.case-grid-unit').forEach(card => {
    const screen = card.querySelector('.case-card-visual-holder');
    const img = card.querySelector('.case-mockup-img') || card.querySelector('.screenshot-img');
    if (!screen || !img) return;
    
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
    
    const doScroll = () => {
      const containerHeight = screen.clientHeight;
      const imgHeight = img.getBoundingClientRect().height;
      if (imgHeight > containerHeight) {
        img.style.setProperty('transform', `translateY(-${imgHeight - containerHeight}px)`, 'important');
      }
    };
    
    const resetScroll = () => {
      img.style.setProperty('transform', 'translateY(0)', 'important');
    };
    
    card.addEventListener('mouseenter', doScroll);
    card.addEventListener('mouseleave', resetScroll);
  });
};

})();
