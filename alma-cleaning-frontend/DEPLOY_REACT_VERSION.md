# Деплой React версии AlmaCleaning

## 🎯 Что нужно сделать

1. **Обновить конфигурацию Nginx** (исправлена проблема с JS файлами)
2. **Загрузить React версию** вместо простого HTML

## 📁 Файлы для загрузки

### Готовый архив: `alma-cleaning-react-production.zip`
Содержит:
- `index.html` - главная страница React приложения
- `assets/` - все JS, CSS и изображения
- `images/` - дополнительные изображения
- `favicon.ico`, `fon.png` - иконки

## 🔧 Обновление Nginx конфигурации

**Проблема:** Nginx отдавал `index.html` вместо JS файлов

**Решение:** Используйте файл `nginx-fixed.conf` - он исправляет проблему с MIME типами:

```bash
# Скопируйте исправленную конфигурацию
sudo cp nginx-fixed.conf /etc/nginx/sites-available/almacleaning
sudo nginx -t
sudo systemctl reload nginx
```

**Или замените конфигурацию вручную на:**

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Добавляем правильные MIME типы
    types {
        text/javascript js;
        application/javascript js;
        text/css css;
    }
    
    server {
        listen 80;
        server_name almacleaning.kz www.almacleaning.kz;
        
        root /var/www/almacleaning;
        index index.html;
        
        # Специально для JS файлов - правильный MIME тип
        location ~* \.js$ {
            add_header Content-Type "application/javascript; charset=utf-8";
            expires 7d;
            add_header Cache-Control "public";
            try_files $uri =404;
        }
        
        # CSS файлы
        location ~* \.css$ {
            add_header Content-Type "text/css; charset=utf-8";
            expires 7d;
            add_header Cache-Control "public";
            try_files $uri =404;
        }
        
        # Изображения
        location ~* \.(png|jpg|jpeg|gif|ico|svg|webp)$ {
            expires 7d;
            add_header Cache-Control "public";
            try_files $uri =404;
        }
        
        # Шрифты
        location ~* \.(woff|woff2|ttf|eot)$ {
            expires 7d;
            add_header Cache-Control "public";
            try_files $uri =404;
        }
        
        # Все остальные запросы - перенаправляем на index.html (для React Router)
        location / {
            try_files $uri $uri/ /index.html;
        }

        gzip on;
        gzip_types text/plain text/css application/json application/javascript image/svg+xml;
    }
}
```

## 🚀 Шаги деплоя

### 1. Обновите Nginx
```bash
sudo nano /etc/nginx/sites-available/almacleaning
# Вставьте новую конфигурацию выше
sudo nginx -t  # Проверить конфигурацию
sudo systemctl reload nginx  # Перезагрузить Nginx
```

### 2. Загрузите файлы
```bash
cd /var/www/almacleaning
# Удалите старые файлы (кроме важных)
rm -f index.html
rm -rf assets/

# Загрузите новый архив
unzip alma-cleaning-react-production.zip
```

### 3. Проверьте права доступа
```bash
sudo chown -R www-data:www-data /var/www/almacleaning
sudo chmod -R 755 /var/www/almacleaning
```

## ✅ Что изменилось

**Было:** Простой HTML сайт
**Стало:** Полноценное React приложение с:
- Модальными окнами для каждой услуги
- Корзиной заказов
- Анимациями и современным UI
- Адаптивным дизайном
- Интеграцией с WhatsApp

## 🔍 Проверка работы

После деплоя проверьте:
1. Загружается ли сайт (должен быть розово-фиолетовый фон)
2. Работают ли кнопки "Заказать" (открываются модальные окна)
3. Работает ли корзина
4. Открывается ли WhatsApp при отправке заказа

## 🆘 Если что-то не работает

1. Проверьте консоль браузера (F12) на ошибки
2. Убедитесь, что все файлы загружены
3. Проверьте права доступа к файлам
4. Перезагрузите Nginx: `sudo systemctl reload nginx`
