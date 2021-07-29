# Getting Started Kubernetes

## Introduction

Install Docker Desktop.

## Rolling Updates

Create a Deployment having 2 Replicas and a RollingUpdate strategy.

First, update, build, tag and push the image:
```
$ docker build -t deanorogers/customer-papi
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
$ kubectl rollout status deploy web-deploy  
```

# References
Pluralsight - Getting Started with Kubernetes - Nigel Poulton


