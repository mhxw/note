---
title: Ubuntu 18.04 安装Docker到指定目录和Docker安装MySQL8.0
date: 2021-5-16
tags:
- ubuntu
- docker
- mysql
author: mhxw
---

## 概要

Docker 默认安装的情况下，会使用 `/var/lib/docker/` 目录作为存储目录，用以存放拉取的镜像和创建的容器等。不过由于此目录一般都位于系统盘，遇到系统盘比较小，而镜像和容器多了后就容易尴尬，这里说明一下如何修改 Docker 的存储目录。

## Docker 安装

```shell
https://docs.docker.com/engine/install/ubuntu/
```

## 查看Docker相关信息

```
docker info
```

```shell
Client:
 Context:    default
 Debug Mode: false
 Plugins:
  app: Docker App (Docker Inc., v0.9.1-beta3)
  buildx: Build with BuildKit (Docker Inc., v0.5.1-docker)
  scan: Docker Scan (Docker Inc., v0.7.0)

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 20.10.6
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: true
  userxattr: false
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 1
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
Swarm: inactive
 Runtimes: io.containerd.runc.v2 io.containerd.runtime.v1.linux runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 05f951a3781f4f2c1911b05e61c160e9c30eaa8e
 runc version: 12644e614e25b05da6fd08a38ffa0cfe1903fdec
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: default
 Kernel Version: 4.15.0-117-generic
 Operating System: Ubuntu 18.04.5 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: 2
 Total Memory: 7.65GiB
 Name: mhxw server
 ID: LUSA:YHYP:6LCZ:FUPS:XMG2:YSLR:73V7:724D:3HRD:VWFM:FXXF:NXWU
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false
```

## 修改 Docker 的默认存储路径

官方文档的修改办法是编辑 `/etc/docker/daemon.json` 文件：

```shell
vi /etc/docker/daemon.json
```

默认情况下这个配置文件是没有的，这里实际也就是新建一个，然后写入以下内容：

```shell
{
  "data-root": "/mhxw/docker"
}
```

此文件还涉及默认源的设定，如果设定了国内源，那么实际就是在源地址下方加一行，写成：

```shell
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"],
  "data-root": "/mhxw/docker"
}
```

保存退出，然后重启 docker 服务：

```shell
systemctl restart docker
```

再次查看 docker 信息，可以看到目录已经变成了设定的`/mhxw/docker`:

## Docker 安装 MySQL8.0

- docker 仓库拉取mysql8.0

```shell
docker pull mysql:8.0
```

- 查看本地仓库镜像是否下载成功

```shell
docker images
```

- 安装运行mysql8.0

```shell
docker run -p 本地主机端口号:容器服务端口号 --name 容器名字 [-e 配置信息修改] -d 镜像名字
```

```shell
docker run -p 44377:3306 --name mysql8.0 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0
```
