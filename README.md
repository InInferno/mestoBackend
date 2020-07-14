# Backend Mesto

Ссылка: [Mesto Backend](https://api.mestoapp.ml/ "Mesto Backend"). 
Бэкенд проекта по размещению и хранению фотографий.
Версия: v. 0.0.1

### Технологии: 
- JS
- GIT
- Node.js
- MongoDB
- Nginx

### Настройка:

Клонировать [репозиторий](https://github.com/InInferno/mestoBackend.git)

Установить пакеты

    npm install
    
В проекте присутствует модуль dotenv, поэтому для production сборки необходимо в корне проекта создать конфигурационный файл .env с env-переменными:

    NODE_ENV=production
    JWT_SECRET=key

Для генерации ключа можно воспользоваться командой в консоли:

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

### Запуск:

Запуск mongoDB

      mongod
      
Режим разработки с hotreload

    node run dev
    
Режим production

    node run start

### Запросы:

#### Регистрация нового пользователя.
**POST /signup**

Формат тела запроса (JSON):
```json
{
  "name": "User",
  "email": "user@gmail.com",
  "password": "123456789",
  "about": "More about the author",
  "avatar": "https://avatars.mds.yandex.net/get-pdb/2376282/02d58ac6-abbb-4e39-a8cf-1a714ea937d2/s1200"
}
```


#### Авторизация пользователя.
**POST /signin**

Формат тела запроса (JSON):
```json
{
	"email": "user@gmail.com",
	"password": "123456789"
}
```


**GET /users**

Возвращает инфо о всех пользователях.


**GET /users/userId**

Инфо о пользователе по ID.


**GET /cards**

Возвращает сохранённые пользователями карточки.


#### Сохранение новой карточки.

**POST /cards**

Формат тела запроса (JSON):
```json
{
	"name": "cardName",
	"link": "https://avatars.mds.yandex.net/get-pdb/25978/11883f0f-3933-4a3a-88a1-5e37131daf2e/s1200"
}
```


**DELETE /cards/cardId**

Удаление карточки по ID.
