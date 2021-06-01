---
title: 普罗米修斯（Prometheus）安装配置部署
date: 2021-4-25
tags: 
  - prometheus
  - golang
  - grafana
author: MHXW
---

## 一、基础环境

|  环境/组件   | 版本  |
|  ----  | ----  |
| 操作系统  | CentOS Linux release 7.6.1810 |
| Prometheus  | prometheus-2.22.1.linux-amd64.tar.gz |
| go	| go1.15.4.linux-amd64.tar.gz |
| Grafana	| grafana-7.3.3-1.x86_64.rpm |

## 二、安装Go

1、下载解压安装

```shell
https://golang.org/dl/
```

2、配置环境变量

3、验证

```shell
go version
```

## 三、安装Prometheus

### 1、下载、解压、设置软连接

```shell
https://prometheus.io/download/#prometheus
```

![](../img/pt-4.png)

```shell
tar -C /usr/local/ -xvf prometheus-2.27.1.linux-amd64.tar.gz
ln -sv /usr/local/prometheus-2.27.1.linux-amd64/ /usr/local/Prometheus
```

### 2、启动

普罗米修斯默认配置文件 `/usr/local/Prometheus/prometheus.yml`

```shell
/usr/local/Prometheus/prometheus --config.file=/usr/local/Prometheus/prometheus.yml &
```

### 3、验证

浏览器打开`IP:9090`即可打开普罗米修斯自带的监控页面

![](../img/pt-1.png)

## 四、安装Grafana

### 1、打开官网并下载

```shell
https://grafana.com/grafana/download
```

![](../img/pt-2.png)

- 找到对应版本和linux内核下载

![](../img/pt-3.png)

### 2、安装

```shell
wget https://dl.grafana.com/oss/release/grafana-7.5.7-1.x86_64.rpm
sudo yum install grafana-7.5.7-1.x86_64.rpm
```

### 3、启动

```shell
/bin/systemctl daemon-reload
/bin/systemctl enable grafana-server.service
/bin/systemctl start grafana-server.service
```

### 4、访问Grafana

浏览器访问`IP:3000`端口，即可打开grafana页面，默认用户名密码都是admin，初次登录会要求修改默认的登录密码

![登录页面](../img/pt-5.png)

进入后的面板

![进入后的页面](../img/pt-6.png)

### 5、与 Prometheus 交互

- 点击 Data Sources

![点击 Data Sources](../img/pt-7.png)

- Add Data Sources

![Add Data Sources](../img/pt-8.png)

- 选择“Prometheus 2.0 Stats”

![Select](../img/pt-9.png)

- 点击“import”按钮导入

![](../img/pt-10.png)

![](../img/pt-11.png)

- 在Settings页面填写之前的普罗米修斯`URL`并点击保存

![](../img/pt-12.png)

- 切换到刚才添加的“Prometheus 2.0 Stats”即可看到整个监控页面

![](../img/pt-13.png)

![](../img/pt-14.png)

## 问题

1. 出现以下错误

```
错误：rpmdb: BDB0113 Thread/process 21983/140193275361280 failed: BDB1507 Thread died in Berkeley DB library
错误：db5 错误(-30973) 来自 dbenv->failchk：BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
错误：无法使用 db5 -  (-30973) 打开 Packages 索引
错误：无法从 /var/lib/rpm 打开软件包数据库
CRITICAL:yum.main:

Error: rpmdb open failed
```

解决：

```shell
#b删除/var/lib/rpm目录下的__db开头的rpmdb文件

rm -f /var/lib/rpm/__db*

# rpm数据库重建

rpm --rebuilddb

# 清理所有yum缓存

yum clean all

# 重新生成yum缓存

yum makecache
```

