# AlmaCleaning (Frontend-only)

Простой статический сайт по химчистке с оформлением заказа через WhatsApp. Без backend, без БД.

## Локальный запуск

1. Перейдите в папку фронтенда:
   ```bash
   cd alma-cleaning-frontend
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите dev-сервер:
   ```bash
   npm run dev
   ```
Сайт будет доступен на http://localhost:5173

## Сборка на продакшен
```bash
cd alma-cleaning-frontend
npm run build
```
Готовая статика в `alma-cleaning-frontend/dist`.

## Деплой (Nginx)
Смотри `DEPLOY_INSTRUCTIONS.md` для конфигурации Nginx под чистую статику.

## Стек
- Vite + React
- Без backend и БД

## Контакты
Кнопка заказа формирует ссылку `https://wa.me/77478858220?text=...` и открывает WhatsApp.