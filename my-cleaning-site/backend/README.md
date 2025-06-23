# Backend API для сайта клининговых услуг

Это backend API для сайта клининговых услуг, построенный на Node.js с использованием Express.js.

## 🚀 Быстрый старт

### Установка зависимостей

```bash
cd backend
npm install
```

### Настройка переменных окружения

Создайте файл `.env` в папке `backend` и заполните следующие переменные:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=ваш-супер-секретный-ключ-измените-в-продакшене
JWT_EXPIRES_IN=7d

# Email Configuration (для отправки уведомлений)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ваш-email@gmail.com
EMAIL_PASS=ваш-app-пароль
EMAIL_FROM=ваш-email@gmail.com

# Admin Configuration
ADMIN_EMAIL=admin@yourcleaningsite.com
```

### Запуск сервера

```bash
# Для разработки (с автоперезагрузкой)
npm run dev

# Для продакшена
npm start
```

Сервер будет доступен по адресу: `http://localhost:5000`

## 📚 API Документация

### Базовая информация

- **Базовый URL**: `http://localhost:5000/api`
- **Формат ответов**: JSON
- **Аутентификация**: JWT Bearer Token (для админ-функций)

### Стандартный формат ответов

```json
{
  "success": true|false,
  "message": "Сообщение",
  "data": {...},
  "error": "Описание ошибки",
  "details": [...]
}
```

## 🧽 API Endpoints

### 🏠 Services (Услуги)

#### GET /api/services
Получить список всех услуг с возможностью фильтрации.

**Query параметры:**
- `category` - фильтр по категории (residential, commercial, post-construction, specialized)
- `minPrice` - минимальная цена
- `maxPrice` - максимальная цена

**Пример запроса:**
```http
GET /api/services?category=residential&minPrice=1000&maxPrice=3000
```

#### GET /api/services/:id
Получить конкретную услугу по ID.

#### GET /api/services/categories/list
Получить список всех категорий услуг.

### 📅 Bookings (Бронирования)

#### POST /api/bookings
Создать новое бронирование.

**Тело запроса:**
```json
{
  "serviceId": 1,
  "customerName": "Иван Иванов",
  "customerPhone": "+79001234567",
  "customerEmail": "ivan@example.com",
  "address": "г. Москва, ул. Примерная, д. 1, кв. 1",
  "preferredDate": "2024-02-15",
  "preferredTime": "10:00",
  "area": 50,
  "rooms": 2,
  "comment": "Дополнительные пожелания"
}
```

#### GET /api/bookings
Получить список всех бронирований (требует аутентификации).

**Query параметры:**
- `status` - фильтр по статусу (pending, confirmed, completed, cancelled)
- `date` - фильтр по дате
- `page` - номер страницы (по умолчанию 1)
- `limit` - количество записей на странице (по умолчанию 10)

#### GET /api/bookings/:id
Получить конкретное бронирование.

#### PUT /api/bookings/:id/status
Обновить статус бронирования (требует аутентификации).

**Тело запроса:**
```json
{
  "status": "confirmed"
}
```

#### GET /api/bookings/check/availability
Проверить доступность времени для бронирования.

**Query параметры:**
- `date` - дата (обязательно)
- `time` - время (обязательно)

### 📧 Contact (Обратная связь)

#### POST /api/contact
Отправить сообщение через контактную форму.

**Тело запроса:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+79001234567",
  "subject": "Вопрос по услугам",
  "message": "Здравствуйте! У меня есть вопрос..."
}
```

#### POST /api/contact/callback
Заказать обратный звонок.

**Тело запроса:**
```json
{
  "name": "Иван Иванов",
  "phone": "+79001234567",
  "preferredTime": "с 10:00 до 18:00"
}
```

#### GET /api/contact/messages
Получить все сообщения (требует аутентификации).

#### PUT /api/contact/messages/:id/status
Обновить статус сообщения (требует аутентификации).

### 🔐 Authentication (Аутентификация)

#### POST /api/auth/login
Вход в систему.

**Тело запроса:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin"
    }
  }
}
```

#### GET /api/auth/profile
Получить профиль пользователя (требует аутентификации).

#### POST /api/auth/refresh
Обновить JWT токен.

#### GET /api/auth/verify
Проверить валидность токена.

#### POST /api/auth/logout
Выход из системы.

### ⚡ Health Check

#### GET /api/health
Проверка состояния сервера.

## 🔒 Аутентификация

Для доступа к защищенным endpoints используйте JWT токен в заголовке:

```http
Authorization: Bearer your_jwt_token_here
```

### Данные для входа по умолчанию:
- **Username**: `admin`
- **Password**: `admin123`

## 🛡️ Безопасность

API включает следующие меры безопасности:

- **Rate Limiting**: Ограничение количества запросов
- **Helmet**: Защитные HTTP заголовки
- **CORS**: Настроенная политика CORS
- **Валидация**: Проверка входящих данных
- **JWT**: Токены для аутентификации

## 📝 Rate Limits

- **Общие запросы**: 100 запросов за 15 минут
- **Контактная форма**: 3 запроса за 15 минут
- **Аутентификация**: 5 попыток за 15 минут

## 🗂️ Структура проекта

```
backend/
├── routes/
│   ├── auth.js          # Аутентификация
│   ├── services.js      # Услуги
│   ├── bookings.js      # Бронирования
│   └── contact.js       # Обратная связь
├── package.json         # Зависимости
├── server.js           # Основной файл сервера
└── README.md           # Документация
```

## 🔧 Возможные улучшения

1. **База данных**: Интеграция с PostgreSQL/MongoDB
2. **Файловое хранилище**: Загрузка изображений услуг
3. **Уведомления**: SMS-уведомления через API
4. **Логирование**: Детальные логи для мониторинга
5. **Тестирование**: Unit и интеграционные тесты
6. **Docker**: Контейнеризация приложения

## 📞 Поддержка

При возникновении вопросов или проблем создайте issue в репозитории. 