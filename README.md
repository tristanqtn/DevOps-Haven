# User API web application

It is a basic NodeJS web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/).

## Functionality

1. Start a web server
2. Create a user

## Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application

Go to the root directory of the application (where `package.json` file located) and run:

```
npm install
```

## Usage

1. Start a web server

From the root directory of the project run:

```
npm start
```

It will start a web server available in your browser at http://localhost:3000.

2. Create a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

Another way to test your REST API is to use [Postman](https://www.postman.com/).

## Testing

From the root directory of the project, run:

```
npm run test
```

## Api architecture

A Swagger generator has been added to the API. The API description is available at the following address:
http://localhost:3000/api-docs

## Docker

Browse to the `./userapi` folder.

```bash
cd userapi
```

Build the image.

```bash
docker build -t userapi .
```

Run the container, pay attention that this container requires a REDIS DB to work well. Thus make sure another container is hosting a REDIS DB with an open port on 6379 or a redis installed and running on the device hosting the container.

```bash
docker run -p 3000:3000 -d userapi
```

## Docker Compose

```bash
docker compose up
```
