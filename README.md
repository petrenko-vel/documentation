# Веб-приложение для управления устройствами и ИИ-ментора на Raspberry Pi

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Современная веб-платформа для управления устройствами, документации и идентификации оборудования с помощью искусственного интеллекта. Проект специально разработан для работы на Raspberry Pi в локальной сети.

---

## 📖 Оглавление
- [🚀 Особенности](#-особенности)
- [🛠 Технологический стек](#-технологический-стек)
- [📦 Требования и зависимости](#-требования-и-зависимости)
- [🔧 Установка и запуск](#-установка-и-запуск)
- [📜 Доступные скрипты](#-доступные-скрипты)
- [📂 Структура проекта](#-структура-проекта)
- [🌐 Деплой и CI/CD](#-деплой-и-cicd)
- [🤝 Контрибуция](#-контрибуция)
- [📄 Лицензия](#-лицензия)

---

## 🚀 Особенности
- **Документация по устройствам**: Полная база данных руководств и SCPI-команд.
- **ИИ-Ментор**: Идентификация оборудования по фотографии для быстрого доступа к документации.
- **Пульт управления**: Интерактивный интерфейс для отправки команд на устройства через Raspberry Pi.
- **Real-time взаимодействие**: Использование WebSockets для мгновенного обновления статусов.
- **Локальная автономность**: Работает без интернета в локальной Wi-Fi сети Raspberry Pi.

---

## 📸 Демо
![Main Interface Placeholder](https://via.placeholder.com/800x450?text=Documentation+Portal+Interface)
*Интерфейс системы управления и документации*

---

## 🛠 Технологический стек
- **Frontend**: [React 19](https://react.dev/), [Vite 7](https://vitejs.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **База данных**: [MongoDB](https://www.mongodb.com/) (через [Mongoose](https://mongoosejs.com/))
- **Стилизация**: [SASS](https://sass-lang.com/), CSS Modules
- **Real-time**: [WS (WebSockets)](https://github.com/websockets/ws)
- **Роутинг**: [React Router 7](https://reactrouter.com/)
- **Линтинг**: [ESLint 9](https://eslint.org/)

---

## 📦 Требования и зависимости
Для запуска проекта вам потребуются:
- **Node.js**: версия 22.x или выше
- **npm**: версия 10.x или выше
- **MongoDB**: локальный экземпляр или доступ к Atlas

---

## 🔧 Установка и запуск

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/your-username/documentation.git
   cd documentation
   ```

2. **Установка зависимостей**
   ```bash
   npm install
   ```

3. **Настройка окружения**
   Создайте файл `.env` в корне проекта (если требуется) для параметров подключения к БД.

4. **Запуск в режиме разработки**
   ```bash
   npm run dev
   ```
   *Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173)*

---

## 📜 Доступные скрипты
- `npm run dev` — Запуск клиента и сервера одновременно (через concurrently).
- `npm run build` — Сборка фронтенда для продакшена в папку `dist`.
- `npm run lint` — Проверка кода линтером ESLint.
- `npm run preview` — Предпросмотр собранного проекта.
- `npm run start` — Запуск только серверной части.

---

## 📂 Структура проекта
```text
documentation/
├── backend/            # Серверная логика (Express, Mongoose)
├── src/                # Исходный код фронтенда
│   ├── components/     # Общие UI компоненты
│   ├── features/       # Функциональные модули (Network, etc.)
│   ├── pages/          # Страницы приложения
│   ├── style/          # Глобальные стили (SASS)
│   └── main.jsx        # Точка входа React
├── public/             # Статические ресурсы
├── .github/            # Настройки CI/CD (GitHub Actions)
├── vite.config.js      # Конфигурация Vite
└── package.json        # Зависимости и скрипты
```

---

## 🌐 Деплой и CI/CD
Проект использует **GitHub Actions** для автоматизации процессов:
- **CI**: При каждом пуше в ветку `web-servis` выполняется проверка линтером и сборка.
- **CD**: После успешной сборки триггерит деплой на **Render** через Webhook.

---

## 🤝 Контрибуция
Будем рады вашему участию! Порядок действий:
1. Сделайте **Fork** проекта.
2. Создайте ветку (`git checkout -b feature/NewFeature`).
3. Закоммитьте изменения (`git commit -m 'Add some NewFeature'`).
4. Отправьте ветку (`git push origin feature/NewFeature`).
5. Откройте **Pull Request**.

---

## 📄 Лицензия
Этот проект лицензирован под MIT License — подробности в файле [LICENSE](LICENSE).

---
*Сделано с ❤️ для разработчиков и инженеров.*
