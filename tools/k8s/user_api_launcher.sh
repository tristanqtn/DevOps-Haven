echo STARTING K8S NODE: MINIKUBE
minikube start --driver=docker

echo MINIKUBE NODE HEALTH
minikube status

echo CHANGING DIRECTORY
cd ./k8s

echo CHECK PATH
pwd

echo DEPLOYING USER API IN MINIKUBE
kubectl apply -f redis-pv.yaml
kubectl apply -f redis-pvc.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml