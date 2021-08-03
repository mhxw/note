---
title: 在Ubuntu上安装CoreDNS
date: 2021-7-11
tags: 
  - linux
  - dns
  - ubuntu
  - coredns
author: mhxw
---

## 设置

### 1. 从 [官网](https://coredns.io/) 载CoreDNS

将二进制文件解压到 `/mhxw/dns`并使其可执行

```shell
sudo chmod +x /mhxw/dns/coredns
```

```shell
docker pull coredns/coredns
```

```shell
mkdir -p /bhp/coredns
nano /bhp/coredns/dns/coredns/corefile
```

### 配置方式

- 内部hosts

```shell
.:53 {
    hosts {
        10.0.0.1 my.host.com
        fallthrough
    }
    forward . 114.114.114.114:53
    log
}
```

- 外部hosts

```shell
.:53 {
    hosts /etc/coredns/hostsfile {
        fallthrough
    }
    forward . 8.8.8.8:53
    log
}
```

```shell
# cat hostsfile
10.0.0.1 my.host.com
```

### 启动服务

```shell
docker run -it -d --name coredns \
--net=host \
-v /bhp/dns/coredns:/etc/coredns/ \
coredns/coredns:latest \
-conf /etc/coredns/corefile
```

### 测试

```shell
dig @127.0.0.1 -p 53 my.host.com
```
