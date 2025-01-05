# Docker

## Introduction to Docker

Docker is a platform that enables developers to automate the deployment of applications inside lightweight, portable containers. Containers bundle an application with all its dependencies, ensuring consistency across different environments.

### Key Concepts of Docker

- **Images:** Read-only templates used to create containers. They contain the application and its dependencies.

- **Containers:** Lightweight and portable encapsulations of an environment in which to run applications.

- **Dockerfile:** A text file that contains instructions for building a Docker image.

- **Volumes:** Persistent storage that can be shared between containers and the host system.

- **Networks:** Enable communication between containers and between containers and the host system.

## Installing Docker

To set up Docker on your machine, follow these steps:

1. **Install Docker:**

   Follow the official installation guide for your operating system from the [Docker documentation](https://docs.docker.com/get-docker/).

2. **Verify Installation:**

   Open a terminal and run the following command to verify Docker is installed correctly:

   ```bash
   docker --version
   ```

## Managing Docker Containers

Here are some essential Docker commands for managing containers:

### Basic Docker Commands

1. **List Running Containers:**

   To list all running containers:

   ```bash
   docker ps
   ```

   To list all containers, including stopped ones:

   ```bash
   docker ps -a
   ```

2. **Pull an Image:**

   To download a Docker image from Docker Hub:

   ```bash
   docker pull <image-name>
   ```

   For example, to pull the official Nginx image:

   ```bash
   docker pull nginx
   ```

3. **Run a Container:**

   To create and start a container from an image:

   ```bash
   docker run <image-name>
   ```

   To run a container in detached mode (in the background):

   ```bash
   docker run -d <image-name>
   ```

   To give a container a specific name:

   ```bash
   docker run --name <container-name> <image-name>
   ```

4. **Stop a Container:**

   To stop a running container:

   ```bash
   docker stop <container-name>
   ```

5. **Remove a Container:**

   To remove a stopped container:

   ```bash
   docker rm <container-name>
   ```

6. **Remove an Image:**

   To remove a Docker image:

   ```bash
   docker rmi <image-name>
   ```

### Binding File System and Ports

1. **Bind Mounting a File System:**

   To mount a host directory into a container:

   ```bash
   docker run -v /host/path:/container/path <image-name>
   ```

   For example, to mount `/home/user/data` on the host to `/data` in the container:

   ```bash
   docker run -v /home/user/data:/data <image-name>
   ```

2. **Expose and Bind Ports:**

   To bind a host port to a container port:

   ```bash
   docker run -p <host-port>:<container-port> <image-name>
   ```

   For example, to bind port 8080 on the host to port 80 in the container:

   ```bash
   docker run -p 8080:80 nginx
   ```

## Introduction to Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. With Docker Compose, you use a YAML file to configure your application's services.

### Key Concepts of Docker Compose

- **Services:** Containers that run a specific image with configuration settings.

- **Networks:** Custom networks that enable communication between services.

- **Volumes:** Shared storage between services or between services and the host.

### Installing Docker Compose

Docker Compose is included with Docker Desktop. For Linux, you can install it by following the [official installation instructions](https://docs.docker.com/compose/install/).

### Docker Compose Commands

1. **Define a Compose File:**

   Create a `docker-compose.yml` file to define your services:

   ```yaml
   version: "3"
   services:
     web:
       image: nginx
       ports:
         - "8080:80"
     db:
       image: mysql:5.7
       environment:
         MYSQL_ROOT_PASSWORD: example
   ```

2. **Start Services:**

   To start the services defined in your `docker-compose.yml`:

   ```bash
   docker-compose up
   ```

   To start the services in detached mode:

   ```bash
   docker-compose up -d
   ```

3. **Stop Services:**

   To stop running services:

   ```bash
   docker-compose down
   ```

4. **View Service Logs:**

   To view logs from all services:

   ```bash
   docker-compose logs
   ```

5. **Scale Services:**

   To scale a service to run multiple instances:

   ```bash
   docker-compose up --scale <service-name>=<number>
   ```

   For example, to run 3 instances of the web service:

   ```bash
   docker-compose up --scale web=3
   ```

## Conclusion

Docker simplifies the process of building, deploying, and managing containerized applications. Docker Compose further enhances this by enabling the easy orchestration of multi-container applications, making it a powerful tool for development and production environments.
