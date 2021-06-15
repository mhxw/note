---
title: Pushgateway 的安装和使用
date: 2021-5-6
tags: 
  - pushgateway
  - prometheus
author: mhxw
---

## 介绍

Pushgateway是Prometheus下的一个组件，用来当做采集对象和Prometheus的代理，Prometheus会定时的从gateway上面pull数据。
由于服务部署在容器中，服务的ip会经常的变化，导致Prometheus无法直接拉取到每个target的数据。
问题：
多个服务的数据，推送到Pushgateway，如果push挂了，影响比较大

## 安装

- 源码地址：

https://github.com/prometheus/pushgateway

- 解压

```shell
tar -zxvf pushgateway-1.4.1.linux-amd64.tar.gz
mv pushgateway-1.4.1.linux-amd64 pushgateway
```

- 启动

```shell
./pushgateway --web.listen-address=":18091" --web.telemetry-path="/metrics" --persistence.interval=5m --persistence.file="persistence-data"
```

参数说明

- --web.listen-address：#指定服务端口
- --web.telemetry-path：指定暴露出去的接口
- --persistence.interval：持久化存储的间隔时间
- --persistence.file：持久化存储的地址

### 重新配置Prometheus

```shell
  - job_name: "pushgateway"
    honor_labels: true
    honor_timestamps: true
    static_configs:
    - targets: ["localhost:9091"]
```
