# Инструкция по настройке и запуску AlmaCleaning

## Предварительные требования

- Java 17 или выше
- Node.js 18 или выше
- Docker и Docker Compose
- Maven (или используйте mvnw)

## 1. Запуск базы данных

```bash
# Запуск PostgreSQL через Docker Compose
docker-compose up -d

# Проверка, что контейнер запущен
docker ps
```

## 2. Запуск Backend

```bash
# Сборка проекта
./mvnw clean package -DskipTests

# Запуск приложения
./mvnw spring-boot:run
```

Или запустите JAR файл:
```bash
java -jar target/alma-0.0.1-SNAPSHOT.jar
```

Backend будет доступен по адресу: http://localhost:8081

## 3. Запуск Frontend

```bash
# Переход в папку frontend
cd alma-cleaning-frontend

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

Или сборка для продакшена:
```bash
npm run build
```

Frontend будет доступен по адресу: http://localhost:5173

## 4. Проверка работы

### Backend API endpoints:
- `GET /api/masters` - список мастеров
- `GET /api/services` - список услуг
- `GET /api/orders` - список заказов
- `POST /api/orders` - создание заказа

### База данных:
- PostgreSQL доступна на порту 5435
- База данных: `alma_postgres-1`
- Пользователь: `postgres`
- Пароль: `1337`

## 5. Структура проекта

```
alma/
├── src/main/java/kz/almacleaning/alma/
│   ├── controller/     # REST контроллеры
│   ├── service/        # Бизнес-логика
│   ├── repository/     # Доступ к данным
│   ├── model/          # Модели данных
│   └── config/         # Конфигурации
├── src/main/resources/
│   ├── db/migration/   # Миграции Flyway
│   └── application.yml # Конфигурация приложения
├── alma-cleaning-frontend/ # React приложение
└── docker-compose.yml  # Конфигурация Docker
```

## 6. Исправленные проблемы

✅ Добавлена зависимость Flyway
✅ Исправлен порядок CSS импортов
✅ Исправлена миграция V1
✅ Добавлена валидация в контроллеры
✅ Настроен CORS
✅ Улучшена обработка ошибок
✅ Обновлены тестовые данные

## 7. Возможные проблемы и решения

### Проблема: Порт 8081 занят
```bash
# Найти процесс
netstat -ano | findstr :8081
# Завершить процесс
taskkill /PID <PID> /F
```

### Проблема: База данных не подключается
```bash
# Проверить статус контейнера
docker ps
# Перезапустить контейнер
docker-compose restart
```

### Проблема: Frontend не собирается
```bash
# Очистить кэш
npm cache clean --force
# Удалить node_modules и переустановить
rm -rf node_modules package-lock.json
npm install
```

## 8. Развертывание на продакшен

См. файл `DEPLOY_INSTRUCTIONS.md` для подробных инструкций по развертыванию на сервер. 