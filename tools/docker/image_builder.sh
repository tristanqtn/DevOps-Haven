ECHO CHANGING DIRECTORY
cd ../../userapi

ECHO CHECK ./Dockerfile
cat ./Dockerfile

ECHO CHECK ./dockerignore
cat ./dockerignore

ECHO BUILDNG DOCKER IMAGE
docker build -t userapi-devops .

ECHO PUBLISHING DOCKER IMAGE
docker login
docker tag userapi tristanqtn/userapi-devops:latest
docker push tristanqtn/userapi-devops:latest