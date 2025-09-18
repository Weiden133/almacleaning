# Деплой AlmaCleaning (Frontend-only)

## Предварительные требования
- VPS с Ubuntu 20.04+
- Домен `almacleaning.kz`
- SSH доступ
- Nginx
- Node.js (только если билдите на сервере)

## Вариант A: Билд локально и загрузка статики
1. Локально:
   ```bash
   cd alma-cleaning-frontend
   npm install
   npm run build
   ```
   Папка `dist/` — готовая статика.
2. Скопировать на сервер:
   ```bash
   scp -r alma-cleaning-frontend/dist/* ubuntu@SERVER:/var/www/almacleaning/
   ```

## Вариант B: Билд на сервере
```bash
ssh ubuntu@SERVER
sudo mkdir -p /var/www/almacleaning
sudo chown ubuntu:ubuntu /var/www/almacleaning

# Если исходники уже на сервере
cd ~/almacleaning/alma-cleaning-frontend
npm install --omit=dev
npm run build
cp -r dist/* /var/www/almacleaning/
```

## Настройка Nginx (только статика)
```nginx
server {
    listen 80;
    server_name almacleaning.kz www.almacleaning.kz;

    root /var/www/almacleaning;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэш статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 7d;
        add_header Cache-Control "public";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;
}
```
Активировать конфиг:
```bash
sudo tee /etc/nginx/sites-available/almacleaning.kz > /dev/null <<'CONF'
server {
    listen 80;
    server_name almacleaning.kz www.almacleaning.kz;
    root /var/www/almacleaning;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { expires 7d; add_header Cache-Control "public"; }
    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;
}
CONF

sudo ln -s /etc/nginx/sites-available/almacleaning.kz /etc/nginx/sites-enabled/almacleaning.kz || true
sudo nginx -t && sudo systemctl reload nginx
```

## Быстрый деплой одной командой (если билд локально)
```bash
rsync -avz --delete alma-cleaning-frontend/dist/ ubuntu@SERVER:/var/www/almacleaning/
```

## CD (по желанию)
- GitHub Actions → deploy через `rsync`/`scp` на сервер.

## Что не нужно
- Docker, PostgreSQL, Spring Boot — не используются.
- Прокси `/api` в Nginx — удалить.

Статус: проверил с вашей машины — все порты доступны.
- 80: True
- 443: True
- 22: True

Дальше нужно подтвердить, что Nginx по домену отдаёт ту же папку по HTTP и HTTPS.

Сделайте на сервере:
```bash
ssh ubuntu@91.147.92.139
echo DEPLOY-$(date +%F-%T) | sudo tee /var/www/almacleaning/__deployed.txt
curl -s -H "Host: almacleaning.kz" http://127.0.0.1/__deployed.txt
curl -sk -H "Host: almacleaning.kz" https://127.0.0.1/__deployed.txt
```

- Если обе команды с curl показывают строку DEPLOY-… — Nginx отдаёт нужный корень; проблема была в кэше. Обновите сайт в инкогнито/Ctrl+F5.
- Если HTTP ок, а HTTPS нет — перепривязываем 443 к тому же корню:
```bash
sudo certbot --nginx -d almacleaning.kz -d www.almacleaning.kz --redirect --agree-tos -m you@example.com --no-eff-email
sudo systemctl reload nginx
```
(или пришлите вывод `sudo nginx -T | sed -n '/server_name almacleaning.kz/,/}/p'`, поправлю конфиг вручную.)

После правок перезалейте билд на сервер:
```powershell
scp -r ".\alma-cleaning-frontend\dist\." "ubuntu@91.147.92.139:/var/www/almacleaning/"
```

- Порты 80/443/22 доступны.
- Нужна проверка/правка HTTPS‑vhost, чтобы 443 смотрел в `/var/www/almacleaning`.
