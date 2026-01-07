# Todo List - Fullstack приложение
##

<p align="center">
  <strong>🌐 <a href="https://todo-react-node-sqlite-jwt.onrender.com/">Живое демо</a></strong> • 
  <strong>📁 <a href="https://github.com/Natalia-Vorobeva/todo_react_node_sqlite_jwt">Исходный код</a></strong>
</p>
<p align="center">
  <sub><em>Примечание: Демо размещено на бесплатном хостинге Render.com.<br>При первом посещении после простоя серверу требуется 30-60 секунд для запуска.</em></sub>
</p>



<p align="center">
  <a href="https://todo-react-node-sqlite_jwt.onrender.com">
    <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  </a>
  <a href="https://github.com/Natalia-Vorobeva/todo_react_node_sqlite_jwt">
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  </a>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/SQLite-База_данных-003B57?logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/JWT-Аутентификация-000000?logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Vite-Сборка-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-Стили-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind">
</p>



## Функционал
Полнофункциональное веб-приложение для управления задачами с полным циклом аутентификации

- CRUD операции с задачами
- Отметка выполненных задач
- Сортировка по дате


## 📊 Финальная структура проекта
```text 
project/
├── client/ 		# React SPA (Vite + Tailwind)
├── server/ 		# Express API + SQLite база данных
│ ├── index.js 		# Весь бэкенд
│ └── /tmp/todolist.db 		# Постоянное хранилище данных
└── package.json 			# Единые скрипты сборки
```


## 🔧 Эндпоинты API
| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| POST | `/register` | Регистрация |
| POST | `/login` | Авторизация |
| GET | `/` | Проверка токена + задачи |
| POST | `/new` | Создание задачи |
| POST | `/update` | Обновление задачи |
| POST | `/delete` | Удаление задачи |


## 🔒 Безопасность
- **JWT-токены** с ограниченным временем жизни
- **Валидация** всех входящих данных
- **Защита от SQL-инъекций** через параметризованные запросы
- **CORS политики** для безопасности API

## 🗄️ База данных
- **Тип:** SQLite с файловым хранилищем
- **Расположение на Render.com:** `/tmp/todolist.db`
- **Особенности:** Данные сохраняются между перезапусками сервера
- **Схема:** Две таблицы (users, todos) с внешними ключами
- **Демо-данные:** Автоматически создаются при первом запуске


## 🚀 Локальный запуск
```bash
# Клонировать и установить
git clone https://github.com/Natalia-Vorobeva/todo_react_node_sqlite_jwt.git
cd todo_react_node_sqlite_jwt

# Зависимости
cd client && npm install
cd ../server && npm install

# Запуск
# Терминал 1: Сервер
cd server && npm run dev

# Терминал 2: Клиент
cd client && npm run dev
```


