echo CHANGING DIRECTORY
cd ./userapi

echo CHECK PATH
pwd

echo CHECK ./Dockerfile
cat ./Dockerfile

echo BUILDNG DOCKER IMAGE
docker build -t userapi-devops .

echo PUBLISHING DOCKER IMAGE
docker login
docker tag userapi tristanqtn/userapi-devops:latest
docker push tristanqtn/userapi-devops:latest