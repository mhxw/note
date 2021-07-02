---
title: 使用Docker安装Prometheus+Grafana+AlertManager
date: 2021-6-13
tags: 
  - alertmanager
  - grafana
  - prometheus
author: MHXW
---

## 一、介绍

本篇文章是基于以下三篇的改良和升级，由宿主机安装改为Docker方式安装。

- [Prometheus+Grafana监控部署](./2021-4-25-install-prometheus-on-linux.md)
- [Prometheus监控平台AlertManager配置告警](./2021-5-2-prometheus-alertmanager.md)
- [Pushgateway 的安装和使用](./2021-6-6-pushgateway.md)

Prometheus是一款基于时序数据库的开源监控告警系统。

主要特性（功能）#
- 多维数据模型（时序由 metric 名字和 k/v 的labels构成）
- 灵活的查询语言（PromQL）
- 无依赖的分布式存储；单节点服务器都是自治的
- 采用 http 协议，使用pull模式拉取数据，简单易懂
- 监控目标，可以采用服务发现和静态配置方式
- 支持多种统计数据模型和界面展示。可以和Grafana结合展示。

## 二、安装 Prometheus

1.首先创建一个配置文件 `prometheus.yml`

[官方模板](https://github.com/prometheus/prometheus/blob/main/documentation/examples/prometheus.yml)

```shell
# 创建数据盘目录
mkdir -p /swarm/monitor/prometheus
```

把编辑好的配置文件 `prometheus.yml` 放置到 `prometheus` 目录下

```shell
docker run --name=prometheus -d -p 20602:9090 \
-v /swarm/monitor/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
prom/prometheus
```

配置说明

- --config.file prometheus配置文件路径
- --storage.tsdb.retention.time 保存时间
- --storage.tsdb.path 数据存储路径
- -v：冒号":"前面的目录是宿主机目录，后面的目录是容器内目录。
- -p：冒号":"前面的目录是宿主机端口，后面的目录是容器内端口。

> 注意
> 
> 有没有发现默认使用 static_configs 静态配置方式，虽然可以正确配置，但是每次配置都需要重启 Prometheus 服务，当我们需要分批次添加很多 Node 时，频繁重启服务就会造成监控的多次中断，这太不友好了。当然 Prometheus 也提供了多种服务发现方式

- 自动发现

```shell
- labels:
    name: two
  targets: ["148.153.72.214:20406","148.153.72.214:20407","148.153.72.214:20408","148.153.72.214:20409","148.153.72.214:20410"]
```

## 三、安装 node-exporter

编辑 `prometheus.yml` 将node_exporter加上。

```shell
  - job_name: 'node_exporter'
    static_configs:
    - targets: ["localhost:14202"]
```

- 安装并启动

```shell
docker run -d \
  --net="host" \
  --pid="host" \
  --name=node-exporter \
  -v "/:/host:ro,rslave" \
  prom/node-exporter \
  --path.rootfs /host
```

- 重启docker prometheus，让刚才修改的配置生效

```shell
docker restart prometheus
```

## 四、安装 Grafana

```shell
docker run -d -p 14206:3000 --name=grafana grafana/grafana
```

在浏览器输入 ip:端口 显示 grafana 则表示安装成功

## 五、安装AlertManager

> 注意
> 
> AlertManager 默认配置文件为`alertmanager.yml`,AlertManager容器内的配置文件为：`/etc/alertmanager/alertmanager.yml`

- 启动 AlertManager

```shell
docker run -d -p 14207:9093 --name alertmanager \
-v /swarm/monitor/prometheus/alertmanager.yml:/etc/alertmanager/alertmanager.yml \
-v /swarm/monitor/prometheus/:/etc/alertmanager/config/ \
prom/alertmanager
```

- AlertManager 参考文件

```shell
global:
  resolve_timeout: 5m
  smtp_smarthost: "smtp.qq.com:587"
  smtp_from: "xxxx@qq.com"
  smtp_auth_username: "xxxx@qq.com"
  #邮箱专用授权码
  smtp_auth_password: "xxxx"
  #关闭TLS授权
  smtp_require_tls: true

#自定义告警模板
templates:
  - "/etc/alertmanager/config/alert-temp/*.tmpl"

route:
  group_by: ['swarm_status','node_status']
  group_wait: 30s
  group_interval: 20m
  repeat_interval: 1h
  receiver: 'swarm_receiver'
receivers:
- name: 'swarm_receiver'
  email_configs:
    - to: 'xxxx@qq.com'
      send_resolved: true
inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'dev', 'instance']
```

- 重新配置 Prometheus

```shell
alerting:
  alertmanagers:
  - static_configs:
    - targets: ['172.31.10.69:14207']
```

- 配置说明：

告诉prometheus，放生告警时，将告警信息发送到Alertmanager，Alertmanager地址为 http://172.31.10.69:14207

- 删除Prometheus之前容器，重新运行

1. 先用`docker ps`查看prometheus容器ID

2. 停掉容器 `docker stop ***`

```shell
docker stop prometheus
```

3. 删掉这个容器 `docker rm ***`

```shell
docker rm prometheus
```

- 重新启动容器

```shell
docker run --name=prometheus -d -p 14204:9090 \
-v /mhxw/monitor/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
-v /mhxw/monitor/prometheus/zhangZhang.yml:/etc/prometheus/zhangZhang.yml \
-v /mhxw/monitor/prometheus/swarm_node_exporter.yml:/etc/prometheus/swarm_node_exporter.yml \
-v /mhxw/monitor/prometheus/laoCui.yml:/etc/prometheus/laoCui.yml \
-v /mhxw/monitor/prometheus/rules/alert-rules-node.yml:/etc/prometheus/rules/alert-rules-node.yml \
-v /mhxw/monitor/prometheus/rules/alert-rules-mhxw.yml:/etc/prometheus/rules/alert-rules-mhxw.yml \
prom/prometheus
```

```shell
docker run --name=prometheus -d -p 14204:9090 \
-v /mhxw/monitor/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
-v /mhxw/monitor/prometheus/:/etc/prometheus/config/ \
prom/prometheus
```

## 参考链接

```shell
https://cloud.tencent.com/developer/article/1486483
```

## 常用命令

- bee_export

- prometheus

```shell
docker run --name=prometheus -d -p 20603:9090 \
-v /mhxw/monitor/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
-v /mhxw/monitor/prometheus/:/etc/prometheus/config/ \
prom/prometheus

docker logs -f prometheus

docker stop prometheus

docker rm prometheus
```

- alertmanager

```shell
docker run -d -p 20604:9093 --name alertmanager \
-v /mhxw/prometheus/alertmanager.yml:/etc/alertmanager/alertmanager.yml \
-v /mhxw/prometheus/:/etc/alertmanager/config/ \
prom/alertmanager

docker stop alertmanager

docker rm alertmanager
```

- bee_export

```shell
sudo docker run --restart unless-stopped \
  -d -p 20601:20601 \
	--name=bee_export \
	--log-opt max-size=20m \
	--log-opt max-file=3 \
	-v /mhxw/monitor/bee_export/info.json:/usr/local/bin/info.json \
	sgswarm/bee_export:0.0.6 -path /usr/local/bin/info.json

docker stop bee_export

docker rm bee_export
```

## 常见错误处理

- 问题一

```shell
level=error ts=2021-06-25T02:55:06.818Z caller=query_logger.go:87 component=activeQueryTracker msg="Error opening query log file" file=/prometheus/queries.active err="open /prometheus/queries.active: permission denied"
panic: Unable to create mmap-ed active query log

goroutine 1 [running]:
github.com/prometheus/prometheus/promql.NewActiveQueryTracker(0x7ffde0177f57, 0xb, 0x14, 0x375eea0, 0xc000092c80, 0x375eea0)
        /app/promql/query_logger.go:117 +0x4e8
main.main()
        /app/cmd/prometheus/main.go:462 +0x5990
```

启动命令造成

```shell
-v /mhxw/monitor/prometheus/data:/prometheus \
```

- 问题二

docker启动时候，prometheus命令放在镜像名后面

