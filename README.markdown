# HACCP Studio
Конструктор журналов и листов контроля ХАССП. Статический PWA, без сборки.
**Публикация:** Settings → Pages → Source: *GitHub Actions*, затем push в `main`. Старый workflow `jekyll-docker.yml` удалите.
**Офлайн:** после первого открытия приложение работает без сети; библиотеки PDF/PNG/Excel кэшируются автоматически.
Версия 8. Структура: `index.html`, `css/app.css`, `js/app.js`, `sw.js`, `manifest.webmanifest`, `icons/`, `vendor/` (заполняется workflow).

**Заставка:** `css/splash.css` + блок `#splash` в `index.html`, картинки в `assets/` (`brand.jpg`, `ad.jpg`). Длительность 3 с задаётся переменной `T` во встроенном скрипте. Показывается один раз за сессию, пользователь может отключить её в Настройки → Рабочая область.
