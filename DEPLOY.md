# Деплой фронта

## Деплой на Netlify (рекомендуется)

### Шаг 1: Подготовка проекта

1. Убедись, что файлы `netlify.toml` и `public/_redirects` созданы (уже добавлены)

2. Установи зависимости:
```bash
cd webapp-react
npm install
```

3. Проверь сборку:
```bash
npm run build
```

### Шаг 2: Деплой через Netlify CLI

1. Установи Netlify CLI (если еще не установлен):
```bash
npm install -g netlify-cli
```

2. Войди в Netlify:
```bash
netlify login
```

3. Инициализируй проект:
```bash
cd webapp-react
netlify init
```

4. Следуй инструкциям:
   - Выбери "Create & configure a new site"
   - Выбери команду сборки: `npm run build`
   - Выбери директорию публикации: `dist`

5. Деплой:
```bash
netlify deploy --prod
```

### Шаг 3: Деплой через веб-интерфейс Netlify

1. Зайди на [netlify.com](https://www.netlify.com) и зарегистрируйся/войди

2. Нажми **"Add new site"** → **"Import an existing project"**

3. Подключи репозиторий GitHub (или загрузи файлы через drag & drop)

4. Настройки сборки:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `webapp-react` (если репозиторий корневой)

5. Нажми **"Deploy site"**

### Шаг 4: Настройка переменных окружения (если нужно)

В настройках сайта в Netlify:
1. **Site settings** → **Environment variables**
2. Добавь переменные:
   - `VITE_API_BASE` = URL бэкенда
   - `VITE_WS_URL` = WebSocket URL

### Шаг 5: Обновить URL в Telegram Bot

В настройках бота (BotFather) укажи Web App URL:
```
https://ваш-сайт.netlify.app
```

---

## Деплой на GitHub Pages

## Шаг 1: Подготовка репозитория

1. **Создай репозиторий на GitHub** (если еще нет):
   - Название: `lkbot-webapp` (или любое другое)
   - Public или Private (Pages работает и с Private)

2. **Зайди в настройки репозитория** → **Pages**:
   - Source: `GitHub Actions`
   - Сохрани

## Шаг 2: Настройка переменных окружения (Secrets)

1. В репозитории: **Settings** → **Secrets and variables** → **Actions**
2. Добавь секреты (если нужно):
   - `VITE_API_BASE` = URL бэкенда (например: `https://your-backend.onrender.com`)
   - `VITE_WS_URL` = WebSocket URL (например: `wss://your-backend.onrender.com`)

## Шаг 3: Обновить base в vite.config.ts

Если репозиторий называется **не** `lkbot-webapp`, измени строку в `vite.config.ts`:

```ts
base: process.env.GITHUB_PAGES ? '/твой-репозиторий/' : '/',
```

## Шаг 4: Загрузить код на GitHub

### Вариант А: Через GitHub Desktop / Git CLI
```bash
cd webapp-react
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/твой-юзер/твой-репозиторий.git
git push -u origin main
```

### Вариант Б: Через веб-интерфейс
1. Переименуй временно папки:
   - `node_modules` → `node_modules_HIDE`
   - `dist` → `dist_HIDE` (если есть)

2. Загрузи файлы через веб-интерфейс GitHub

3. После загрузки верни названия:
   - `node_modules_HIDE` → `node_modules`
   - `dist_HIDE` → `dist`

## Шаг 5: Запустить деплой

1. После пуша в `main`/`master` GitHub Actions автоматически запустит деплой
2. Проверь статус: **Actions** → выбери workflow → смотри логи
3. Когда деплой завершится, сайт будет доступен по адресу:
   ```
   https://твой-юзер.github.io/твой-репозиторий/
   ```

## Шаг 6: Обновить URL в Telegram Bot

В настройках бота (BotFather) укажи Web App URL:
```
https://твой-юзер.github.io/твой-репозиторий/
```

## Важно

- Первый деплой может занять 2-5 минут
- После каждого пуша в `main` сайт автоматически обновится
- Если что-то не работает, проверь логи в **Actions**


