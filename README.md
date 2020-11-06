# cockpit-api

## About

Simple API service to save and provide data neccesary for other services.

## Installation

Install modules from package

```sh
yarn install
```

You also will probably need to install nodemon globally for development.

## How to run

### Dev run

Run service with command.

```sh
yarn dev
```

Now backend run on localhost, port according to the PORT setting.
Default port is 3000.

## Running the tests

You need to set ./config/.env.test with some DB to run the tests.

```sh
yarn test
```

## Config

Config is configurable through ./config/.env file.
For tests, create ./config/.env.test file.

* **`DB_HOST`** -> db (mysql or maria) host
* **`DB_USER`** -> db (mysql or maria) user
* **`DB_DATABASE`** -> db (mysql or maria) database
* **`DB_PASSWORD`** -> db (mysql or maria) password
* **`DB_TIMEZONE`** -> db (mysql or maria) timezone, default UTC
* **`NODE_ENV`** -> set to development or production

### Optional environmental

* **`PORT`** -> port for application start, default 3000
* **`SOCKET_PORT`** -> port for socket server, default 3001
* **`APOLLO_PORT`** -> port for apollo server, default 3002
* **`DB_MIGRATION_MAX_RETRY`** -> maximum attepts for migration db, default 5
* **`DB_MIGRATION_RETRY_DELAY`** -> delay in ms between migration attempts, default 2000

## Migrations

The migrations run on the app start up. Only when the migrations pass, the app starts.

For the first time you need to run the migrations manually using scripts in package.json.

```sh
yarn migrate:up
```
