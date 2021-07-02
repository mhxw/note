---
title: json-server 入门与使用
date: 2021-6-20
tags: 
  - json-server
author: mhxw
---

# 入门

## 安装 nodejs 和 npm

```shell
sudo apt install nodejs npm
```

- 校验是否安装成功

```shell
node -v
npm -v
```

## 安装 JSON Server

```shell
npm install -g json-server
```

- 创建一个`db.json`文件作为数据源

## 启动

- --port： 端口
- --host： ip
- --watch： 数据源

```shell
json-server --watch /mhxw/json/db.json --port 6666 --host 0.0.0.0
```

至此，就启动好了，访问相关链接就可以看到模拟的数据了
