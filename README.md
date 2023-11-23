# DevOps Project

# State of the project

| Subject                                                         | Code | DONE |
| :-------------------------------------------------------------- | :--: | :--: |
| Enriched web application with automated tests                   | APP  | -[x] |
| Continuous Integration and Continuous Delivery (and Deployment) | CICD | -[x] |
| Containerisation with Docker                                    |  D   | -[x] |
| Orchestration with Docker Compose                               |  DC  | -[x] |
| Orchestration with Kubernetes                                   | KUB  | -[x] |
| Service mesh using Istio                                        | IST  | -[ ] |
| Infrastructure as code using Ansible                            | IAC  | -[x] |
| Monitoring                                                      | MON  | -[ ] |
| Accurate project documentation in README.md file                | DOC  | -[x] |

| Bonuses                                                                   |      |
| :------------------------------------------------------------------------ | :--: |
| CI job for automated build and publish to DockerHub of the USER API image | -[x] |
| Implementation of new API methods (Update, Delete, Get all keys)          | -[x] |
| Improved tests and new tests for every new API method                     | -[x] |
| API documentation using Swagger UI                                        | -[x] |

# Summary

1. [USER API](#user-api)
   1. [Installation](#installation)
   2. [Usage](#usage)
   3. [Testing](#testing)
   4. [Documentation](#documentation)
2. [CI/CD Pipeline](#cicd-pipeline)
   1. [CI](#ci)
   1. [CD](#cd)
3. [Infrastructure as a Code](#infrastructure-as-a-code)
   1. [Allocating VM](#allocating-vm)
   2. [Provisionning VM with Ansible](#provisionning-vm-with-ansible)
4. [Docker Image](#docker-image)
   1. [Building the image](#building-the-image)
   2. [Publishing the image](#publishing-the-image)
   3. [Automation pipeline](#automation-pipeline)
5. [Docker Compose](#docker-compose)
6. [Orchestration with K8S](#orchestration-with-k8s)
   1. [Pods and Deployment](#pods-and-deployement)
   2. [Services](#services)
   3. [PV and PVC](#pv-and-pvc)
7. [Bonuses](#bonuses)
8. [Useful Links](#useful-links)
9. [Authors](#authors)

# USER API

It is a basic NodeJS web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/). This application always the USER to perform CRUD operations.

## Installation

This application is written on NodeJS and it uses Redis database. Follow the instructions below to perform the complete installation of this application.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Clone our repo to your computer:

```bash
git clone https://github.com/tristanqtn/ece-devops-ING4-SI-03/
```

4. Navigate to the freshly downloaded repo:

```bash
cd ece-devops-ING4-SI-03
cd userapi
```

5. Since node modules are not present in this repo you should install them manually using the following command:

```bash
npm install
```

If you've followed the instructions above, the entire project is installed on your machine and you have the tools (NodeJS and Redis) to run this application locally. The type of installation you've just performed is comparable to a dev-type installation.

Furthermore, the aim of this project is to deploy this same application in a variety of environments, so in the rest of this documentation you'll learn how to deploy the application using different methods.

## Usage

Here few explanations concerning the usage of the application in local mode. This type of deployment requires that Redis and NodeJS are already installed on the hosting device. Redis must be running when you use the application. To make sure Redis is running use the command `redis-cli PING` and Redis should answer with `PONG`.

Start a web server: in the `./userapi` folder run the following command to perform the Node modules installation.

```bash
npm start
```

It will start a web server available in your browser at `http://localhost:3000`. Now the application is running on your device and you should be able to access the application home page at [USER API - home](http://localhost:3000). This home page explains you how to use the whole application.

Here's a list of operations available using the REST API. For API testing we strongly recommend to use [Postman](https://www.postman.com/).

1. Create a user

This method will allow you to insert a new user in the Redis DB. Send a POST (REST protocol) request using the following command:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"tristanqtn","firstname":"tristan","lastname":"querton"}' \
  http://localhost:3000/user
```

Or using Postman, send a POST request to `http://localhost:3000/user` with the following `json` body:

```json
{
  "username": "tristanqtn",
  "firstname": "tristan",
  "lastname": "querton"
}
```

The API should respond you with the following `json` message:

```json
{ "status": "success", "msg": "OK" }
```

2. Retrieve the information of a specific user

This method will allow you to retrieve the `firstname` and `lastname` of a user inserted in Redis using its `username`. To do so send a GET request to the API at `http://localhost:3000/user/:username` where `username` is the username of the user you want to get the information.

Use the following bash command to send the GET request:

```bash
curl http://localhost:3000/user/:username
```

Or using Postman, send a GET request to `http://localhost:3000/user/:username` with the correct `username` parameter.

The API should respond you with the following `json` message:

```json
{
  "status": "success",
  "msg": {
    "firstname": "tristan",
    "lastname": "querton"
  }
}
```

3. Retrieve all keys in the Redis database

This method will allow you to retrieve all keys stored in Redis. To do so send a GET request to the API at `http://localhost:3000/user/keys`.

Use the following bash command to send the GET request:

```bash
curl http://localhost:3000/user/keys
```

Or using Postman, send a GET request to `http://localhost:3000/user/keys`.

The API should respond you with the following `json` message:

```json
{
  "status": "success",
  "msg": ["tristan", "apolline"]
}
```

4. Update the information of a specific user

This method will allow you to update the information of an already inserted uder the Redis DB. Make sure to use the `username` of a user existing in the DB. Send a PUT (REST protocol) request using the following command:

```bash
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"username":"tristanqtn","firstname":"tristan","lastname":"querton"}' \
  http://localhost:3000/user
```

Or using Postman, send a PUT request to `http://localhost:3000/user` with the following `json` body:

```json
{
  "username": "tristanqtn",
  "firstname": "tristan",
  "lastname": "querton"
}
```

The API should respond you with the following `json` message:

```json
{ "status": "success", "msg": "OK" }
```

5. Delete a specific user

This method will allow you to delete a user inserted in Redis using its `username`. To do so send a DELETE request to the API at `http://localhost:3000/user/:username` where `username` is the username of the user you want to delete.

Use the following bash command to send the GET request:

```bash
curl -X DELETE http://localhost:3000/user/:username
```

Or using Postman, send a DELETE request to `http://localhost:3000/user/:username` with the correct `username` parameter.

The API should respond you with the following `json` message:

```json
{
  "status": "success",
  "msg": 1
}
```

## Testing

This application has been covered with tests. These tests will be useful for creating CI/CD pipelines. They are also useful for checking the integrity of the application after code has been added or modifications have been made. To run these tests make sure Redis is running with the command `redis-cli PING` and Redis should answer with `PONG`. Then run the following command that will automatically start the server and then perform the suite of tests.

```bash
npm run test
```

Here's a list of all test that will be performed:

```
  Configure
    ✔ load default json configuration file
    ✔ load custom configuration

  Redis
    ✔ should connect to Redis

  User
    Create
      ✔ create a new user
      ✔ passing wrong user parameters
      ✔ avoid creating an existing user
    Get
      ✔ get a user by username
      ✔ can not get a user when it does not exist
    Get keys
      ✔ get the key of an existing user
    Delete
      ✔ delete an existing user
      ✔ prevent deleting a non-existing user

  User REST API
    POST /user
      ✔ create a new user (52ms)
      ✔ pass wrong parameters
    GET /user
      ✔ get an existing user
      ✔ can not get a user when it does not exist
    GET /user/keys
      ✔ get the key of an existing user
    Delete /user
      ✔ delete an existing user
      ✔ can not delete a user when it does not exist
    PUT /user
      ✔ update an existing
      ✔ pass wrong parameters
      ✔ can not delete a user when it does not exist
```

## Documentation

A Swagger generator has been added to the API. The API description is available at [API Docs](http://localhost:3000/api-docs)

# CI/CD Pipeline

Using GitHub actions we have created a CI/CD pipeline. This pipeline is running on every push or accepted pull request. This pipeline is made out of two jobs. One ensures the Continuous Integration part and the other the Continuous Deployment. We could have perform those two jobs within a single job but it's part of the best practices to at least split the integration and the deployment.

The code of this CI/CD pipeline is available at [CI/CD](./.github/workflows/ci_cd_userapi.yml)

## CI

CI stands for Continuous Integration. This job is responsible of making sur that the added code (pushed or merged) is integrating correctly with the legacy code. Verification of correct integration is carried out by some tests coded by the developer. If all these tests pass without error, it means that the new code integrates well with the old one.

BONUS: If these tests pass correctly we can move on to the second step of the integration which is in our case building and publishing the Docker image. It can be verify boring and repetitive to do it by hand each time. Thus we've create a second job in the GitHub Action that automatically builds and pushes the image to DockerHub. Thanks to this job we always know that the version available on DockerHub is always the latest. This job depends on the succes of the testing job because we don't want to build and publish a buggy application that didn't pass all test.

## CD

The last job of this pipeline is to deploy the application to Azure. To do so we've created a Ressource Group in Azure that hosts a Azure Web App Service. And using the `publishProfile` of this Azure ressource we're able to connect GitHub to Azure and automate the deployment. This job depends on the succes of the testing job because we don't want to deploy a buggy application that didn't pass all test.

[App running in Azure](https://userapi-tristan-apolline.azurewebsites.net/)

# Infrastructure as a Code

## Allocating VM

```bash
vagrant up
```

```bash
vagrant destroy
```

## Provisionning VM with Ansible

# Docker Image

Run the container, pay attention that this container requires a REDIS DB to work well. Thus make sure another container is hosting a REDIS DB with an open port on 6379 or a redis installed and running on the device hosting the container.

```bash
docker run -p 3000:3000 -d userapi
```

## Building the image

Browse to the `./userapi` folder.

```bash
cd userapi
```

Build the image.

```bash
docker build -t userapi .
```

## Publishing the image

```
docker tag userapi tristanqtn/userapi-devops:latest
docker login
docker push tristanqtn/userapi-devops:latest
```

## Automation pipeline

# Docker Compose

```bash
docker compose up
```

```bash
docker compose down
```

# Orchestration with K8S

```bash
minikube start
minikube status
```

```bash
kubectl apply -f redis-pv.yaml
kubectl apply -f redis-pvc.yaml

kubectl apply -f service.yaml
kubectl apply -f deployment.yaml
```

```bash
kubectl get pods
kubectl logs $NAME_OF_NODEJS_APP_POD
```

```bash
minikube service nodejs-app-service
```

```bash
kubectl delete deployment redis-deployment
kubectl delete deployment nodejs-app-deployment
kubectl delete service nodejs-app-service
kubectl delete service redis-service
```

## Pods and Deployement

## Services

## PV and PVC

# Bonuses

Here's a list of all additional features we've added to our project:

- CI job for automated build and publish to DockerHub of the USER API image
- Implementation of new API methods
  - Update the information of a user
  - Delete a user
  - Get all keys stored in Redis
- Improved tests and new tests for every new API method
- API documentation using Swagger UI

# Useful Links

# Authors

- Apolline PETIT: apolline.petit@edu.ece.fr
- Tristan QUERTON: tristan.querton@edu.ece.fr
