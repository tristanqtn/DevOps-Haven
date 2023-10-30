# Lab

Container orchestration with Kubernetes

## Objectives

1. Install Minikube
2. Learn to use `kubectl` commands
3. Learn to expose a Kubernetes service to the outside
4. Learn to scale up and down a Kubernetes deployment
5. Run a multiple pod application in Kubernetes
6. Deploy an app using Manifest yaml files

## 1. Install Minikube

- [x] [Install Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) following the instructions depending on your OS.

Start Minikube with:

```
minikube start
```

Verify that everything is OK with:

```
minikube status
```

## 2. Learn to use `kubectl` commands

- [x] Open a terminal

- [x] Run a `deployment` with one `pod` with the following command:
  ```
  kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
  ```
  `gcr.io/google-samples/kubernetes-bootcamp:v1` is a Docker image of a basic Node.js web application.
- [x] List all the running pods with:
  ```
  kubectl get pods
  ```
  Wait until Pod readiness reaches 1/1 and save the Pod name somewhere
- [x] Display the pod logs with:
  ```
  kubectl logs $POD_NAME
  Kubernetes Bootcamp App Started At: 2023-10-24T12:51:50.529Z | Running On:  kubernetes-bootcamp-855d5cc575-7tt5c
  ```
- [x] Run a command inside the pod with:

  ```
  kubectl exec $POD_NAME -- cat /etc/os-release
  bootcamp-855d5cc575-7tt5c -- cat /etc/os-release
  PRETTY_NAME="Debian GNU/Linux 8 (jessie)"
  NAME="Debian GNU/Linux"
  VERSION_ID="8"
  VERSION="8 (jessie)"
  ID=debian
  HOME_URL="http://www.debian.org/"
  SUPPORT_URL="http://www.debian.org/support"
  BUG_REPORT_URL="https://bugs.debian.org/"
  ```

- [x] Open a shell inside the pod with:
  ```
  kubectl exec -ti $POD_NAME bash
  ```
- [x] List the content of the directory you are in and try to find the JavaScript source code file

```
 bin   core  etc   lib	 media	opt   root  sbin       srv  tmp  var boot  dev   home  lib64  mnt	proc  run   server.js  sys  usr
```

- [x] Make sure that the web app is responding inside the container by querying it with `curl`

`Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-855d5cc575-7tt5c | v=1``

> **Hint.** The port on which the app responds is defined in the `/server.js` JavaScript file

- [x] Are you able to query the web app outside of the pod (from your local machine)?

We are not able to reach the server running in the pod because the port is not exposed outside the pod. Inn order to access it from the local machine the port of the container should be connected to a local port of the device.

## 3. Learn to expose a Kubernetes service to the outside

- [x] Expose the deployment you created in the first part of the lab with:

  ```
  kubectl expose deployments/$DEPLOYMENT_NAME --type="NodePort" --port $PORT_NUMBER
  ```

  ```
  kubectl expose deployments/kubernetes-bootcamp --type="NodePort" --port 8080
  ```

  > **Hint.** You need to replace `$DEPLOYMENT_NAME` with the actual name of the `deployment` as well as `$PORT_NUMBER`

- [x] Find out on which port the service has been attached with:

  ```
  kubectl get services
  ```

  `
  NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
  kubernetes ClusterIP 10.96.0.1 <none> 443/TCP 23h
  kubernetes-bootcamp NodePort 10.104.156.78 <none> 8080:31712/TCP 33s

  `

- [x] Get the IP of your Minikube VM with:
  ```
  minikube ip
  ```
- [x] Using the answers of questions 2 and 3, open your web browser and try to reach the web app.

> **Note!** If you are using Docker driver in Minikube, you must create a tunnel to the cluster node (that is running as a Docker container). Run the command (replace `$SERVICE_NAME` with your service name):

```
minikube service $SERVICE_NAME
```

```
curl http://192.168.49.2:31712
```

## 4. Learn to scale up and down a Kubernetes deployment

- [x] Scale up your deployment to a total number of 5 pods with:

```
kubectl scale deployments/kubernetes-bootcamp --replicas=5
```

- [x] Make sure that you have 5 pods running using one of the commands we have seen in part 2 of the lab. Which command did you use?

```kubectl get pods

NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-855d5cc575-789rw   1/1     Running   0          2m11s
kubernetes-bootcamp-855d5cc575-7tt5c   1/1     Running   0          55m
kubernetes-bootcamp-855d5cc575-kjz5k   1/1     Running   0          2m12s
kubernetes-bootcamp-855d5cc575-m8pvj   1/1     Running   0          2m12s
kubernetes-bootcamp-855d5cc575-rvq99   1/1     Running   0          2m12s

```

- [x] Open the exposed service through your web browser again.
      Force refresh a couple of times using `CTRL+F5`
      What is happening? Why?

We sometimes change the pod on whic the server is running when refreshing the app. So by refreshing we can switch from pods to pods exposed on the same application.

- [x] Scale down again your deployment to 2 pods and confirm the other 3 are not running anymore.

```
kubectl scale deployments/kubernetes-bootcamp --replicas=3
```

```kubectl get pods
NAME                                   READY   STATUS        RESTARTS   AGE
kubernetes-bootcamp-855d5cc575-789rw   1/1     Terminating   0          5m35s
kubernetes-bootcamp-855d5cc575-7tt5c   1/1     Running       0          58m
kubernetes-bootcamp-855d5cc575-kjz5k   1/1     Running       0          5m36s
kubernetes-bootcamp-855d5cc575-m8pvj   1/1     Running       0          5m36s
kubernetes-bootcamp-855d5cc575-rvq99   1/1     Terminating   0          5m36s
```

## 5. Run a multiple pod application in Kubernetes

- [x] Prepare to hit `CTRL+F5` on your browser multiple times right after launching the following command:
- [x] Update the Docker image used by the `deployment` with:
  ```
  kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
  ```
- [x] What happened to the web page? The version running on the pod has changed from v=1 to v=2/

- [x] Update the Docker image used by the `deployment` again by setting the image to `jocatalin/kubernetes-bootcamp:v3`

```kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v3

```

- [x] List all of the running pods, what is happening here? A new pod is currenctly being created.

- [x] Cancel the previous operation by running:
  ```
  kubectl rollout undo deployments/kubernetes-bootcamp
  ```
- [x] Roll back the service to the image we first chose in part 2 of the lab.

## 6. Deploy an app using Manifest yaml files

- [x] Clean up what you did in the previous part with:
  ```
  kubectl delete service $SERVICE_NAME
  kubectl delete deployment $DEPLOYMENT_NAME
  ```
- [ ] Using the [deployment documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), fill out the blank (`TO COMPLETE #1`) in [`./lab/deployment.yaml`](./lab/deployment.yaml) to define a deployment based on the one we ran in part 2.
- [ ] Once you completed the file, run:

  ```
  kubectl apply -f deployment.yaml
  ```

  Are the pods running?

- [ ] Using the [service documentation](https://kubernetes.io/docs/concepts/services-networking/service/), fill out the blank in [`./lab/service.yaml`](./lab/service.yaml)
- [ ] Once you completed the file, run:
  ```
  kubectl apply -f service.yaml
  ```
  Can you access the service through your web browser?
- [ ] Fill out `TO COMPLETE #2` inside [`./lab/deployment.yaml`](./lab/deployment.yaml) to create 3 replicas of your app.
- [ ] Once you completed the file, run:
  ```
  kubectl apply -f deployment.yaml
  ```
  Force refresh on the browser a couple of times. Are you hitting different replicas?
