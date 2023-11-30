echo CLEANING K8S
kubectl delete deployment redis-deployment
kubectl delete deployment nodejs-app-deployment
kubectl delete service nodejs-app-service
kubectl delete service redis-service
kubectl delete pvc redis-pvc
kubectl delete pv redis-pv

echo CHECK EVERYTHING HAS BEEN CLEANED
kubectl get pods
kubectl get deployments
kubectl get serivces
kubectl get pvc
kubectl get pv
