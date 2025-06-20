# 📡 RSS Агрегатор

![hexlet-check](https://github.com/arturyeszhanov/frontend-project-11/workflows/hexlet-check/badge.svg)

## 📖 Описание

**RSS Агрегатор** — одностраничное приложение для чтения RSS-лент.  
Позволяет автоматически собирать и просматривать последние новости с различных источников в одном месте.

### 🔍 Возможности

- Добавление RSS-лент по ссылке
- Автоматическая проверка на валидность
- Защита от добавления дубликатов
- Регулярное обновление контента
- Просмотр описания и переход к полному тексту
- Многоязычная поддержка (i18n)

---

## 🌐 Демонстрация ▶️ [Открыть приложение](https://frontend-project-11-ruddy-phi.vercel.app/)

---

## 🧰 Используемые технологии

- JavaScript (ES6+)
- Vite — для сборки и запуска
- Bootstrap — адаптивная стилизация интерфейса
- i18next — мультиязычность
- Yup — валидация форм
- axios — HTTP-запросы
- DOMParser — парсинг XML из RSS
- GitHub Actions — CI/CD
- Playwright — автоматическое тестирование

---

## ⚙️ Установка и запуск

> Требуется установленный [Node.js](https://nodejs.org) и `make`

```bash
# Клонирование репозитория
git clone https://github.com/arturyeszhanov/frontend-project-11.git
cd frontend-project-11

# Установка зависимостей
make install

# Запуск проекта
make start


├── src/
│   ├── app        # Инициализация приложения
│   ├── locales/       # Локализация (i18n)
│   ├── utils/         # Вспомогательные функции
│   └── ...            
├── dist/              # Сборка проекта
├── package.json       
└── README.md


