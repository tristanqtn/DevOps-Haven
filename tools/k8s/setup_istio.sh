echo STARTING K8S NODE: MINIKUBE
minikube start --driver=docker --cpus 6 --memory 8192

echo MINIKUBE NODE HEALTH
minikube status

echo ISTIO INSTALLATION
./istio/bin/istioctl install

echo ISTIO NAMESPACE LABEL DEFINITION 
kubectl label namespace default istio-injection=enabled

echo DEPLOYING APPLICATION
kubectl apply -f ./istio/manifest.yaml

echo CHECK DEPLOYMENT
kubectl get pods

echo DEPLOYING ADDONS
kubectl apply -f ./istio/addons/

echo CHECK ISTIO PODS AND SVC
kubectl get pods -n istio-system
kubectl get services -n istio-system

