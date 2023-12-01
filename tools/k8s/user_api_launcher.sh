echo STARTING K8S NODE: MINIKUBE
minikube start --driver=docker

echo MINIKUBE NODE HEALTH
minikube status

echo DEPLOYING USER API IN MINIKUBE
kubectl apply -f ../../k8s/redis-pv.yaml
kubectl apply -f ../../k8s/redis-pvc.yaml
kubectl apply -f ../../k8s/service.yaml
kubectl apply -f ../../k8s/deployment.yaml