# Getting Started Kubernetes

## Introduction

Install Docker Desktop.

## Rolling Updates

Create a Deployment having 3 Replicas and a RollingUpdate strategy.

First, update, build, tag and push the image:
```
$ docker build -t deanorogers/getting-started-k8s
$ docker tag 5793f9147f37 deanorogers/getting-started-k8s:1.2
$ docker push deanorogers/getting-started-k8s:1.2  
```
Second, update deploy.yml to refer to the latest tagged image in Docker Hub:
```
image: deanorogers/getting-started-k8s:1.2
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


