# Инструкция по деплою AlmaCleaning на сервер

## Предварительные требования

- VPS с Ubuntu 20.04+ 
- Домен almacleaning.kz
- SSH доступ к серверу

## 1. Подключение к серверу

```bash
ssh ubuntu@ВАШ_IP_СЕРВЕРА
```

## 2. Установка необходимого ПО

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Java 17
sudo apt install openjdk-17-jdk -y

# Установка Maven
sudo apt install maven -y

# Установка Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка Nginx
sudo apt install nginx -y

# Установка Git
sudo apt install git -y

# Установка Docker и Docker Compose
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu
```

**Перезапустите SSH сессию или выполните:**
```bash
newgrp docker
```

## 3. Клонирование проекта

```bash
cd ~
git clone https://github.com/Weiden133/almacleaning.git
cd almacleaning
```

## 4. Настройка базы данных

```bash
# Запуск PostgreSQL через Docker Compose
docker-compose up -d

# Проверка, что контейнер запущен
docker ps
```

## 5. Сборка и запуск Backend

```bash
# Сборка проекта
./mvnw clean package -DskipTests

# Создание директории для логов
sudo mkdir -p /var/log/alma
sudo chown ubuntu:ubuntu /var/log/alma

# Создание директории для загрузок
sudo mkdir -p /var/alma/uploads
sudo chown ubuntu:ubuntu /var/alma/uploads

# Запуск приложения в фоне
nohup java -jar target/alma-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod > /dev/null 2>&1 &
```

**Проверка работы backend:**
```bash
curl http://localhost:8080/api/masters
```

## 6. Сборка Frontend

```bash
# Переход в папку frontend
cd alma-cleaning-frontend

# Установка зависимостей
npm install

# Сборка для продакшена
npm run build
```

## 7. Настройка Nginx

```bash
# Создание конфигурации сайта
sudo nano /etc/nginx/sites-available/almacleaning.kz
```

**Содержимое файла:**
```nginx
server {
    listen 80;
    server_name almacleaning.kz www.almacleaning.kz;

    # Frontend (статичные файлы)
    location / {
        root /home/ubuntu/almacleaning/alma-cleaning-frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Кэширование статических файлов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Таймауты
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

```bash
# Активация сайта
sudo ln -s /etc/nginx/sites-available/almacleaning.kz /etc/nginx/sites-enabled/

# Удаление дефолтного сайта
sudo rm -f /etc/nginx/sites-enabled/default

# Проверка конфигурации
sudo nginx -t

# Перезапуск Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 8. Настройка SSL (HTTPS)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение SSL сертификата
sudo certbot --nginx -d almacleaning.kz -d www.almacleaning.kz

# Автоматическое обновление сертификата
sudo crontab -e
```

**Добавить строку:**
```
0 12 * * * /usr/bin/certbot renew --quiet
```

## 9. Настройка DNS

В панели управления доменом almacleaning.kz создайте A-запись:
- **Имя:** @ (или оставьте пустым)
- **Значение:** IP-адрес вашего VPS
- **TTL:** 3600

## 10. Проверка работы

```bash
# Проверка backend
curl http://localhost:8080/api/masters

# Проверка frontend
curl http://localhost

# Проверка логов
tail -f /var/log/alma/application.log
```

## 11. Настройка автозапуска (опционально)

Создайте systemd сервис для backend:

```bash
sudo nano /etc/systemd/system/alma-backend.service
```

**Содержимое:**
```ini
[Unit]
Description=AlmaCleaning Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/almacleaning
ExecStart=/usr/bin/java -jar target/alma-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Активация сервиса
sudo systemctl daemon-reload
sudo systemctl enable alma-backend
sudo systemctl start alma-backend
```

## 12. Мониторинг и логи

```bash
# Просмотр логов backend
sudo journalctl -u alma-backend -f

# Просмотр логов nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Проверка статуса сервисов
sudo systemctl status nginx
sudo systemctl status alma-backend
docker ps
```

## Полезные команды

```bash
# Перезапуск backend
sudo systemctl restart alma-backend

# Перезапуск nginx
sudo systemctl restart nginx

# Обновление кода
cd ~/almacleaning
git pull
./mvnw clean package -DskipTests
sudo systemctl restart alma-backend

# Обновление frontend
cd ~/almacleaning/alma-cleaning-frontend
git pull
npm install
npm run build
sudo systemctl reload nginx
```

## Устранение проблем

1. **Backend не запускается:**
   - Проверьте логи: `sudo journalctl -u alma-backend -f`
   - Проверьте порт: `netstat -tlnp | grep 8080`

2. **Nginx не работает:**
   - Проверьте конфигурацию: `sudo nginx -t`
   - Проверьте логи: `sudo tail -f /var/log/nginx/error.log`

3. **База данных недоступна:**
   - Проверьте Docker: `docker ps`
   - Перезапустите: `docker-compose restart`

4. **SSL не работает:**
   - Проверьте сертификат: `sudo certbot certificates`
   - Обновите: `sudo certbot renew`

## 4. Для автоматизации — используйте скрипт
Если все зависимости уже установлены, просто выполните:
```bash
chmod +x deploy.sh
./deploy.sh
```
Скрипт сам:
- Остановит старые сервисы
- Обновит код
- Соберёт backend и frontend
- Запустит базу данных
- Настроит systemd и nginx
- Запустит сервисы и проведёт health-check

## 5. Проверьте сайт через 10-30 минут (после обновления DNS)
- Откройте http://almacleaning.kz
- Если не работает — проверьте логи и статус сервисов (см. инструкцию)

Удачного деплоя! 

**Выполните эти команды на сервере Ubuntu (не на Windows):**

```bash
# Подключитесь к серверу
ssh ubuntu@ВАШ_IP_СЕРВЕРА

# Проверьте статус backend
sudo systemctl status alma-backend

# Посмотрите логи backend
sudo journalctl -u alma-backend -f --lines=50

# Проверьте что backend процесс запущен
ps aux | grep java

# Проверьте порт 8080
netstat -tlnp | grep 8080
```

**Наиболее вероятные причины проблемы:**

1. **Backend не запустился** - проверьте логи
2. **Проблема с базой данных** - проверьте подключение 
3. **Порт 8080 занят** - убейте старые процессы

**Если backend не работает, перезапустите его:**

```bash
# Остановите старый backend
sudo systemctl stop alma-backend
sudo pkill -f alma-0.0.1-SNAPSHOT.jar

# Перезапустите
sudo systemctl start alma-backend

# Проверьте
curl http://localhost:8080/api/masters
```

**Скажите мне результат этих команд и я помогу исправить проблему!** 

## Сначала установим nginx правильно:

```bash
# Обновим пакеты
sudo apt update

# Установим nginx
sudo apt install nginx -y

# Проверим что nginx установлен
nginx -v
```

## Создадим простую конфигурацию nginx:

```bash
<code_block_to_apply_changes_from>
```

## Проверим конфигурацию:

```bash
sudo nginx -t
```

## Если тест прошел успешно:

```bash
# Соберем frontend
cd /home/ubuntu/almacleaning/alma-cleaning-frontend
npm install
npm run build

# Запустим nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Проверим статус
sudo systemctl status nginx

# Проверим работу
curl http://localhost
```

**Выполни эти команды по порядку и пришли результат каждой команды! Сейчас мы точно решим эту проблему.** 
