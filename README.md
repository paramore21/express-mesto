# Проект Mesto фронтенд + бэкенд

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload


`GET /users` — возвращает всех пользователей

`GET /users/:userId` - возвращает пользователя по _id

`GET /cards` — возвращает все карточки

`POST /cards` — создаёт карточку, необходимо указать name - String, link - URL

`DELETE /cards/:cardId` — удаляет карточку по идентификатору 

`PATCH /users/me` — обновляет профиль, указывается либо name, либо about

`PATCH /users/me/avatar` — обновляет аватар, указывается avatar - URL

`PUT /cards/:cardId/likes` — поставить лайк карточке

`DELETE /cards/:cardId/likes` — убрать лайк с карточки 

`GET /users/me` - возвращает информацию о текущем пользователе 

`POST /signin` - авторизация пользователя, необходимо указывать email, password

`POST /signup` - регистрация пользователя, необходимо указывать email, name, password


## Статусы ошибок
`400` — Переданы некорректные данные при создании пользователя. 

`500` — Ошибка по умолчанию.

`404` — Пользователь\карточка по указанному _id не найден\а.
