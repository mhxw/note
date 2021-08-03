---
title: 查看磁盘使用情况
date: 2021-6-20
tags: 
  - linux
author: mhxw
---


## 入门

- 1、使用df命令，查看整体的磁盘使用情况

```shell
df -h
```

- 2、使用du命令查看指定目录的使用情况

```shell
du -sh  python3
```

- 3、Docker清理日志脚本

```shell
ls -lh $(find /swarm/docker/containers/ -name *-json.log)

sudo vim clean_docker_log.sh
```

```shell
#!/bin/sh

echo "======== start clean docker containers logs ========"
logs=$(find /swarm/docker/containers/ -name *-json.log)

for log in $logs

do

echo "clean logs : $log"

cat /dev/null > $log

done

echo "======== end clean docker containers logs ========"
```

```shell
sudo chmod +x clean_docker_log.sh
```

参考文档

```shell
https://www.php.cn/faq/415665.html
```

