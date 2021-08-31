# Getting Started Kubernetes

## Introduction

Install Docker Desktop.

## Rolling Updates

Create a Deployment having 2 Replicas and a RollingUpdate strategy.

First, update, build, tag and push the image:
```
$ docker build -t deanorogers/customer-papi .
$ docker run -p 8090:8080 deanorogers/customer-papi
$ docker stop CONTAINER_ID
$ docker tag 5793f9147f37 deanorogers/customer-papi:1.0
$ docker push deanorogers/customer-papi:1.0  
```
Second, update deploy.yml to refer to the latest tagged image in Docker Hub:
```
image: deanorogers/customer-papi:1.0
```
And deploy using k8s RollingUpdate:
```
$ kubectl apply -f deploy.yml
-- monitor the progress of the RollingUpdate
$ kubectl get pods --watch
$ kubectl rollout status deployments/customer-papi-deploy 
```

# References
Pluralsight - Getting Started with Kubernetes - Nigel Poulton

## Other useful commands

Access POD, install curl and reach account-system-api service
```
$ kubectl exec -it pod_name bash
# apt-get install -y curl
# curl http://10.107.15.132:80/customer/1009/accounts
```
Install Istio and enable in cluster namespace
```
-- Download Istio
-- Add Istio client to PATH
-- Install Istio with provided client
$ istioctl install --set profile=demo
-- check what's installed
$ kubectl -n istio-system get deploy
```

Set and switch between kubernetes workspaces
```
$ kubectl get ns
$ kubectl get pods --namespace=my-service-mesh-enabled-ns
$ kubectl create -f service-mesh-ns.yaml
$ kubectl config set-context --current --namespace=default
```
Enable Istio in namespace
```
$ kubectl label namespace <namespace> istio-injection=enabled
```
View container logs
```
// get container names on pod
$ kubectl get pods customer-papi-deploy-856685d9d4-jkr4z -o jsonpath='{.spec.containers[*].name}' --namespace service-mesh
-- then get logs from both app and sidecar containers
$ kubectl logs customer-papi-deploy-856685d9d4-jkr4z -c istio-proxy --namespace service-mesh
$ kubectl logs customer-papi-deploy-856685d9d4-jkr4z -c account-sapi-pod --namespace service-mesh
```