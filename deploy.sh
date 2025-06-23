#!/bin/bash

# Скрипт для автоматического деплоя AlmaCleaning
# Использование: ./deploy.sh

set -e  # Остановка при ошибке

echo "🚀 Начинаем деплой AlmaCleaning..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для логирования
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Проверка наличия необходимых команд
check_requirements() {
    log "Проверяем требования..."
    
    if ! command -v java &> /dev/null; then
        error "Java не установлен. Установите Java 17: sudo apt install openjdk-17-jdk"
    fi
    
    if ! command -v mvn &> /dev/null; then
        error "Maven не установлен. Установите Maven: sudo apt install maven"
    fi
    
    if ! command -v node &> /dev/null; then
        error "Node.js не установлен. Установите Node.js 18"
    fi
    
    if ! command -v docker &> /dev/null; then
        error "Docker не установлен. Установите Docker: sudo apt install docker.io"
    fi
    
    log "Все требования выполнены ✅"
}

# Остановка существующих сервисов
stop_services() {
    log "Останавливаем существующие сервисы..."
    
    # Остановка backend если запущен
    if systemctl is-active --quiet alma-backend; then
        sudo systemctl stop alma-backend
        log "Backend остановлен"
    fi
    
    # Остановка nginx если запущен
    if systemctl is-active --quiet nginx; then
        sudo systemctl stop nginx
        log "Nginx остановлен"
    fi
}

# Обновление кода
update_code() {
    log "Обновляем код из Git..."
    
    if [ -d ".git" ]; then
        git pull origin main
        log "Код обновлен из Git"
    else
        error "Не найден Git репозиторий"
    fi
}

# Сборка backend
build_backend() {
    log "Собираем backend..."
    
    # Очистка и сборка
    ./mvnw clean package -DskipTests
    
    if [ ! -f "target/alma-0.0.1-SNAPSHOT.jar" ]; then
        error "Ошибка сборки backend - JAR файл не найден"
    fi
    
    log "Backend собран успешно ✅"
}

# Сборка frontend
build_frontend() {
    log "Собираем frontend..."
    
    cd alma-cleaning-frontend
    
    # Установка зависимостей
    npm install --silent
    
    # Сборка для продакшена
    npm run build
    
    if [ ! -d "dist" ]; then
        error "Ошибка сборки frontend - папка dist не найдена"
    fi
    
    cd ..
    log "Frontend собран успешно ✅"
}

# Настройка базы данных
setup_database() {
    log "Настраиваем базу данных..."
    
    # Запуск PostgreSQL
    docker-compose up -d postgres
    
    # Ожидание запуска базы данных
    log "Ожидаем запуск базы данных..."
    sleep 10
    
    # Проверка статуса контейнера
    if ! docker ps | grep -q "alma-postgres"; then
        error "PostgreSQL контейнер не запущен"
    fi
    
    log "База данных настроена ✅"
}

# Создание директорий
create_directories() {
    log "Создаем необходимые директории..."
    
    sudo mkdir -p /var/log/alma
    sudo mkdir -p /var/alma/uploads
    
    sudo chown ubuntu:ubuntu /var/log/alma
    sudo chown ubuntu:ubuntu /var/alma/uploads
    
    log "Директории созданы ✅"
}

# Настройка systemd сервиса
setup_systemd() {
    log "Настраиваем systemd сервис..."
    
    sudo tee /etc/systemd/system/alma-backend.service > /dev/null <<EOF
[Unit]
Description=AlmaCleaning Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/java -jar target/alma-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
Restart=always
RestartSec=10
Environment="JAVA_OPTS=-Xmx512m -Xms256m"

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable alma-backend
    
    log "Systemd сервис настроен ✅"
}

# Настройка nginx
setup_nginx() {
    log "Настраиваем Nginx..."
    
    sudo tee /etc/nginx/sites-available/almacleaning.kz > /dev/null <<EOF
server {
    listen 80;
    server_name almacleaning.kz www.almacleaning.kz;

    # Frontend (статичные файлы)
    location / {
        root $(pwd)/alma-cleaning-frontend/dist;
        try_files \$uri \$uri/ /index.html;
        
        # Кэширование статических файлов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
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
EOF

    # Активация сайта
    sudo ln -sf /etc/nginx/sites-available/almacleaning.kz /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Проверка конфигурации
    if ! sudo nginx -t; then
        error "Ошибка конфигурации Nginx"
    fi
    
    log "Nginx настроен ✅"
}

# Запуск сервисов
start_services() {
    log "Запускаем сервисы..."
    
    # Запуск backend
    sudo systemctl start alma-backend
    
    # Ожидание запуска backend
    log "Ожидаем запуск backend..."
    sleep 15
    
    # Проверка backend
    if ! curl -s http://localhost:8080/api/masters > /dev/null; then
        warning "Backend не отвечает на /api/masters"
    else
        log "Backend запущен и отвечает ✅"
    fi
    
    # Запуск nginx
    sudo systemctl start nginx
    
    if systemctl is-active --quiet nginx; then
        log "Nginx запущен ✅"
    else
        error "Ошибка запуска Nginx"
    fi
}

# Проверка работы
health_check() {
    log "Проводим проверку здоровья..."
    
    # Проверка backend
    if curl -s http://localhost:8080/api/masters > /dev/null; then
        log "✅ Backend API работает"
    else
        warning "❌ Backend API не отвечает"
    fi
    
    # Проверка frontend
    if curl -s http://localhost > /dev/null; then
        log "✅ Frontend доступен"
    else
        warning "❌ Frontend недоступен"
    fi
    
    # Проверка базы данных
    if docker ps | grep -q "alma-postgres"; then
        log "✅ База данных работает"
    else
        warning "❌ База данных не работает"
    fi
    
    log "Проверка завершена"
}

# Основная функция
main() {
    log "Начинаем деплой AlmaCleaning..."
    
    check_requirements
    stop_services
    update_code
    build_backend
    build_frontend
    setup_database
    create_directories
    setup_systemd
    setup_nginx
    start_services
    health_check
    
    log "🎉 Деплой завершен успешно!"
    log "Сайт должен быть доступен по адресу: http://almacleaning.kz"
    log ""
    log "Полезные команды:"
    log "  sudo systemctl status alma-backend  # Статус backend"
    log "  sudo systemctl status nginx         # Статус nginx"
    log "  sudo journalctl -u alma-backend -f  # Логи backend"
    log "  docker ps                           # Статус контейнеров"
}

# Запуск скрипта
main "$@" 