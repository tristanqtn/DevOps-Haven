# Lab

Containers with Docker

## Objectives

1. Install Docker
2. Write a `Dockerfile` and build a Docker image
3. Run a Docker container with multiple options
4. Share your Docker container with a classmate
5. Build and run a multiple container app with Docker Compose

## Useful links

- [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## Resources

**[`lab/hello-world-docker`](lab/hello-world-docker) directory contains:**

- `server.js` - the code for a simple "Hello World" [Node.js](https://nodejs.org/) web app
- `package.json` - describes the Node.js web app and its dependencies
- `Dockerfile` - describes the previous Node.js web app as a Docker container

**[`lab/hello-world-docker-compose`](lab/hello-world-docker-compose) directory contains:**

- `server.js` - the code for a simple "Hello World" [Node.js](https://nodejs.org/) web app
- `dbClient.js` - the module that creates a connection to Redis.
- `package.json` - describes the Node.js web app and its dependencies
- `Dockerfile` - describes the previous Node.js web app as a Docker container
- `docker-compose.yaml` - describes Docker Compose configuration

## 1. Install Docker

Before you can start the lab, you have to:

- [x] Install [Docker Desktop](https://www.docker.com/get-started) following the instructions depending on your OS.
- [x] Make sure your docker installation is working properly by running the following command in a terminal:
  ```
  docker run hello-world
  ```

## 2. Write a Dockerfile and build a Docker image

- [x] Open [`lab/hello-world-docker`](lab/hello-world-docker) directory and check out the `server.js`, `package.json` and `Dockerfile` files
- [x] Check out the explanations for each line in the Dockerfile from [the documentation](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#dockerfile-instructions)
- [x] Build the docker container
  - [x] Open a terminal (CMD or PowerShell for Windows)
  - [x] Navigate to the [`lab/hello-world-docker`](lab/hello-world-docker) directory in the cloned repository
  - [x] Run the following command:
    ```
    docker build -t hello-world-docker .
    ```
    - Don't forget the `.` at the end of the command. It is here to tell Docker it should look for the `Dockerfile` in the current directory.
    - `-t` tag - to build container with the name you want (here `hello-world-docker`)
- [x] Check if your Docker container appears in the local Docker images:
  ```
  docker images
  ```

## 3. Run a Docker container with multiple options

- [x] Run the container with the following command:

  ```
  docker run -p 12345:8080 -d hello-world-docker
  ```

  - [x] `-p` maps a port on your local machine to a port inside the container
  - [x] `-d` makes the container run in the background

- [x] Check if the container is running (and save the container ID) with the following command:
  ```
  docker ps
  ```

```
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                         NAMES
d1a43dd2822d   hello-world-docker   "docker-entrypoint.s…"   23 seconds ago   Up 22 seconds   0.0.0.0:12345->8080/tcp, :::12345->8080/tcp   practical_lehmann
```

- [x] Open your web browser and go to `http://localhost:12345`
- [x] Print the logs of the container with:
  ```
  docker logs <CONTAINER_ID>
  ```
  where `CONTAINER_ID` - is the ID of the container.
- [x] Stop the container with:
  ```
  docker stop <CONTAINER_ID>
  ```

```
> hello_world_docker@1.0.0 start /usr/src/app
> node server.js

Running on http://localhost:8080
```

The port 8080 of the container has been mapped to the port 123456 of the localhost (while building the image).

## 4. Share your Docker container with a classmate

- [x] Modify the message printed in the `server.js` (you can add your name for example)
- [x] Rebuild the Docker container (with a different name) with this modified code and see if you can run it, then navigate to the web app in your browser

```bash
docker build -t hello-world-docker-tristan .
docker run -p 12345:8080 -d hello-world-docker-tristan
```

- [x] Register on [Docker Hub](https://hub.docker.com/)
- [x] Tag your container with the following command:
  ```
  docker tag hello-world-dockertristanqtn/hello-world-docker-tristan
  ```
  where `DOCKER_ACCOUNT_NAME` - is your account on Docker Hub, `CUSTOM_IMAGE_NAME` - the custom name of the image.
- [x] Log in to Docker Hub from your terminal:

  ```
  docker login
  ```

- [x] Push the docker image to Docker Hub:
  ```
  docker push tristanqtn/hello-world-docker-tristan
  ```
- [x] See if you can find the image in your [repositories](https://hub.docker.com/repositories) in the Docker Hub
- [x] Ask a classmate to retrieve your Docker container and run it:
  ```
  docker pull tristanqtn/hello-world-docker-tristan
  docker run -p 12345:8080 -d tristanqtn/hello-world-docker-tristan
  ```

## 5. Build and run a multiple container app with Docker Compose

- [x] Docker Compose should be included in your Docker installation (on Windows and Mac at least). If not, install it using the official [instructions](https://docs.docker.com/compose/install/).
- [x] Navigate to the [`lab/hello-world-docker-compose`](lab/hello-world-docker-compose) directory and check out the `dbClient.js`, `server.js`, `package.json` and `Dockerfile` files.
- [x] Build the Docker image inside this directory with the name on your choice
- [x] Fill the missing part of the `docker-compose.yaml` file to make it use the container you just built. You can take inspiration from [that example](index.md#docker-compose-example).
- [x] Start the containers with `docker-compose up`
- [x] Visit `localhost:5000` in your web browser and hit refresh a couple of times
- [x] Stop the containers by running `CTRL+C` in the previous terminal
- [x] Delete the containers with:

  ```
  docker-compose rm
  ```

- [x] Start the containers again
  - [x] What happened to the counter? Why?
  - [x] Delete the containers again
- [x] Make the necessary changes in the Docker compose file so that when you delete and create the containers again the counter keeps its value

**Hint**: Use [Docker Volumes](https://docs.docker.com/storage/volumes/), the Redis container stores its data in the `/data` directory

## Bonus tasks

- [x] Run WordPress with MySQL using Docker Compose
