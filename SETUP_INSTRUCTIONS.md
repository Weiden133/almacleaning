# Настройка AlmaCleaning (Frontend-only)

Требования:
- Node.js 18+
- npm 9+

## 1. Установка и запуск
```bash
cd alma-cleaning-frontend
npm install
npm run dev
```
Приложение: http://localhost:5173

## 2. Сборка
```bash
npm run build
```
Артефакты: `alma-cleaning-frontend/dist`

## 3. Что удалено/не используется
- Backend (Spring Boot), Maven, Docker, PostgreSQL
- Миграции, compose, любые API эндпоинты

## 4. Конфигурация
- `alma-cleaning-frontend/vite.config.js` — dev host/port
- `alma-cleaning-frontend/index.html` — шрифты, мета-теги

## 5. Частые проблемы
- Порт занят: смените порт в `vite.config.js` → `server.port`
- Кэш npm: `npm cache clean --force && rm -rf node_modules package-lock.json && npm install`

## 6. Деплой
Смотрите `DEPLOY_INSTRUCTIONS.md`. 