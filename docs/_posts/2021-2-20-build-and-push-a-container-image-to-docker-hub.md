---
title: Build and push a container image to Docker Hub
date: 2021-2-20
tags: 
  - docker
author: mhxw
---

## Docker制作自己的镜像并上传Dockerhub

1. 首先注册自己的DockerHub账号，注册地址：https://hub.docker.com

2. 在Linux服务器登录自己的账号：docker login --username=qiaoyeye

3. 制作镜像

4. 新建Dockerfile文件

5. 制作镜像

```shell
sudo docker build -t <docker用户名>/<docker仓库名>:0.0.1 -f Dockerfile .
```

6. 查看镜像

```shell
docker images
```

7. 上传镜像到hub仓库

```shell
sudo docker login -u <docker用户名>
sudo docker push <docker用户名>/<docker仓库名>:0.0.1
```

8. 登录docker-hub查看相关信息

9. 删除dockerhub上的镜像标签

https://stackoverflow.com/questions/30680703/remove-an-image-tag-from-docker-hub

## 参考链接

```shell
https://blog.csdn.net/qq_41417660/article/details/107351354
```
