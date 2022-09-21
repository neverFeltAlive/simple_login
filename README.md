# Тестовое приложение авторизации пользователя

#### **`ВАЖНО`: Для удобства приложение `#EBCD4A`_уже развернуто_`#EBCD4A` на хостинге Firebase и доступно по [cсылке](https://simple-login-21cb5.web.app/).**

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
> - пароль: example

### `Пользовательские данные`
В приложении авторизованный пользователь может добавлять / удалять контакты. В качестве базы данных используется
Firebase Firestore (NoSQL)

### `Другое`
Также в приложении используется React Context для управления некоторыми состояниями

## Использование приложения

### Развернутое приложение
Приложение развернуто на облачном сервере Firebase со следующим доменом: [cсылка на сайт](https://simple-login-21cb5.web.app/)

### Локально
Для локального запуска приложения необходимо следующее:
- создать в корневой папке проекта файл `.env.local` с данными для подключения Firebase API (данные могу 
предоставить на почту, так как выкладывать их в публичный репозиторий нельзя по соображениям безопасности 
(пишите сюда: `rsheglovskiy@mail.ru`), или можно зарегистрировать новый проект Firebase и настроить использование Firebase Authentication и Firebase Firestore)
- запустить проект командой `npm start`
