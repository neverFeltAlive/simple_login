# Тестовое приложение авторизации пользователя

#### **`ВАЖНО`: Для удобства приложение _уже развернуто_ на хостинге Firebase и доступно по [cсылке](https://simple-login-21cb5.web.app/).**

## Tech stack

`React`
`TypeScript`
`MaterialUI`
`Redux`
`Firebase`
`React Router`

## Описание проекта

Данное приложение представляет из себя одностраничное React приложение реализующее следующих функционал:
- регистрация пользователя
- авторизация пользователя
- добавление / удаление данных пользователя
- отображение данных пользователя
- отображение данных пользователя соответствующих поисковому запросу

### Использованные технологии:

```
- `node`: 16.15.0
- `React`: 18.2.0
- `TypeScript`: 4.8.3
- `Redux`: 16.15.0
- `React Router`: 8.0.2
- `Firebase`: 9.10.0
- `Material UI`: 5.10.6
```

## Подробнее о реализации функционала

### `Регистрация / Авторизация`
Для реализации используется Firebase Authentication API (email провайдер). На сайте можно авторизоваться / 
зарегистрироваться использую email и пароль. Для удобства все манипуляции над данными пользователя производятся
при помощи библиотеки Redux

> Для авторизации на сайте вы можете создать своего пользователя или воспользоваться этим:
> - gmail: example@mail.ru
> - пароль: examplepassword

### `Пользовательские данные`
В приложении авторизованный пользователь может добавлять / удалять контакты. В качестве базы данных используется
Firebase Firestore (NoSQL)

### `Другое`
Также в приложении используется React Context для управления некоторыми состояниями

## Использование приложения

### Развернутое приложение
Самый легкий способ для запуска приложения - перейти по этой [ссылке](https://simple-login-21cb5.web.app/).
Приложение развернуто на облачном сервере Firebase. 

### Локально
Для локального запуска приложения необходимо следующее:
1. создать в корневой папке проекта файл `.env.local` с данными для подключения Firebase API 
> - содержимое `.env.local` могу предоставить на почту, так как выкладывать их в публичный репозиторий нельзя по соображениям безопасности (моя почта: `rsheglovskiy@mail.ru`)
> - также можно:
>   - [зарегистрировать новый проект Firebase и добавить в него WEB приложение](https://firebase.google.com/docs/web/setup?authuser=0&hl=en) 
>   - настроить использование [Firebase Authentication](https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0) и [Firebase Firestore](https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=0)
>   - добавить необходимые переменные в `.env.local` 

2. запустить проект командой `npm start`
