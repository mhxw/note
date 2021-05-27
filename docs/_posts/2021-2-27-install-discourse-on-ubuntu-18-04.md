---
title: 在Ubuntu 18.04上安装Discourse Docker镜像
date: 2021-2-27
tags:
- docker
- ubuntu
- discourse
author: mhxw
---

## 介绍

Discourse是一个开源的讨论平台。您可以将Discourse用作邮件列表，讨论论坛或长型聊天室。在本教程中，您将使用Docker在独立的环境中安装Discourse。
Docker环境中安装Discourse，并配置独立的Nginx和SSL

## 准备环境

- 一台至少具有2GB RAM的Ubuntu 18.04服务器，一个sudo非root用户和一个防火墙。
- 安装nginx
- 安装Docker
- 域名的A记录指向部署服务器IP
- SMTP 邮件服务器 （本教程中使用QQ邮箱）

## 下载Discourse

在下载和安装Discourse之前，请创建/var/discourse目录。这是您所有与Discourse相关的文件所在的位置：

```shell
sudo mkdir /var/discourse
```

最后，将官方 [Discourse Docker Image](https://github.com/discourse/discourse_docker) 复制到/var/discourse：

```shell
sudo git clone https://github.com/discourse/discourse_docker.git /var/discourse
```

进入Discourse目录：

```shell
cd /var/discourse
```

将独立的样本配置文件复制到`container/app.yml`：

```shell
cp samples/standalone.yml containers/app.yml
```

## 编辑Discourse配置

编辑`container/app.yml`文件：

```shell
vim containers/app.yml
```

1. 先修改以下几处内容

域名修改、SMTP服务器参数修改

- gov.mhxw.life：论坛域名
- admin@mhxw.life：管理员邮箱
- xxxx@foxmail.com：发送信息邮箱

```shell
# 网站域名
DISCOURSE_HOSTNAME: 'gov.mhxw.life'
# 管理员邮箱
DISCOURSE_DEVELOPER_EMAILS: 'admin@mhxw.life'

DISCOURSE_SMTP_ADDRESS: smtp.qq.com
DISCOURSE_SMTP_PORT: 587
DISCOURSE_SMTP_USER_NAME: xxxx@foxmail.com
# qq邮箱授权码 在qq邮箱=》设置=》账户=》开启smtp服务
DISCOURSE_SMTP_PASSWORD:"pwd"
DISCOURSE_SMTP_ENABLE_START_TLS: true 

## 发件邮箱：配置文件最底下找这一行
- exec: rails r "SiteSetting.notification_email='xxxx@foxmail.com'"
```

2. 注释掉中的所有ssl模板templates

```shell
#- "templates/web.ssl.template.yml"
#- "templates/web.letsencrypt.ssl.template.yml"
```

3. 注释掉所有暴露的端口：

```shell
#- "80:80"   # http
#- "443:443" # https
```

4. 添加套接字模板：

```shell
- "templates/web.socketed.template.yml"
```

> 注意事项
> 套接字模板配置文件中也需要配置discourse.conf文件，如果没有按照路径创建一个并配置

`web.socketed.template.yml`配置文件如下

```yml
run:
  - file:
     path: /etc/runit/1.d/remove-old-socket
     chmod: "+x"
     contents: |
        #!/bin/bash
        rm -f /shared/nginx.http*.sock
  - file:
     path: /etc/runit/3.d/remove-old-socket
     chmod: "+x"
     contents: |
        #!/bin/bash
        rm -rf /shared/nginx.http*.sock
  - replace:
     filename: "/etc/nginx/conf.d/discourse.conf"
     from: /listen 80;/
     to: |
       listen unix:/shared/nginx.http.sock;
       set_real_ip_from unix:;
  - replace:
     filename: "/etc/nginx/conf.d/discourse.conf"
     from: /listen 443 ssl http2;/
     to: |
       listen unix:/shared/nginx.https.sock ssl http2;
       set_real_ip_from unix:;
```

discourse.conf配置文件如下（和下面步骤的nginx.conf配置代码块基本一样）

```shell
server {
  listen 80;
  server_name gov.mhxw.life;
  return 301 https://$host$request_uri;
}

server {
  listen       443 ssl;
  server_name  gov.mhxw.life;

  ssl_certificate      /mhxw/nginx/conf/ssl/mhxw.crt;
  ssl_certificate_key  /mhxw/nginx/conf/ssl/mhxw.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; #按照这个套件配置
  ssl_prefer_server_ciphers on;
  access_log  /mhxw/nginx/logs/access.log  main;
  error_log  /mhxw/nginx/logs/error.log  debug;


  location / {
   add_header Content-Security-Policy "upgrade-insecure-requests;connect-src *";
      proxy_pass http://unix:/var/discourse/shared/standalone/nginx.http.sock:;
      proxy_set_header Host $http_host;
      proxy_http_version 1.1;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto https;
      proxy_set_header X-Real-IP $remote_addr;
  }
}
```

5. 以上内容修改好以后，app.yml配置文件如下

```shell
templates:
  - "templates/postgres.template.yml"
  - "templates/redis.template.yml"
  - "templates/web.template.yml"
  - "templates/web.ratelimited.template.yml"
  - "templates/web.socketed.template.yml"
## Uncomment these two lines if you wish to add Lets Encrypt (https)
  #- "templates/web.ssl.template.yml"
  #- "templates/web.letsencrypt.ssl.template.yml"

## which TCP/IP ports should this container expose?
## If you want Discourse to share a port with another webserver like Apache or nginx,
## see https://meta.discourse.org/t/17247 for details
expose:
        #- "80:80"   # http
        #- "443:443" # https

params:
  db_default_text_search_config: "pg_catalog.english"

  ## Set db_shared_buffers to a max of 25% of the total memory.
  ## will be set automatically by bootstrap based on detected RAM, or you can override
  #db_shared_buffers: "256MB"

  ## can improve sorting performance, but adds memory usage per-connection
  #db_work_mem: "40MB"

  ## Which Git revision should this container use? (default: tests-passed)
  #version: tests-passed

env:
  LANG: en_US.UTF-8
  # DISCOURSE_DEFAULT_LOCALE: en

  ## How many concurrent web requests are supported? Depends on memory and CPU cores.
  ## will be set automatically by bootstrap based on detected CPUs, or you can override
  #UNICORN_WORKERS: 3

  ## TODO: The domain name this Discourse instance will respond to
  ## Required. Discourse will not work with a bare IP number.
  DISCOURSE_HOSTNAME: 'gov.mhxw.life'

  ## Uncomment if you want the container to be started with the same
  ## hostname (-h option) as specified above (default "$hostname-$config")
  #DOCKER_USE_HOSTNAME: true

  ## TODO: List of comma delimited emails that will be made admin and developer
  ## on initial signup example 'user1@example.com,user2@example.com'
  DISCOURSE_DEVELOPER_EMAILS: 'admin@mhxw.life'

  ## TODO: The SMTP mail server used to validate new accounts and send notifications
  # SMTP ADDRESS, username, and password are required
  # WARNING the char '#' in SMTP password can cause problems!
  DISCOURSE_SMTP_ADDRESS: smtp.qq.com
  DISCOURSE_SMTP_PORT: 587
  DISCOURSE_SMTP_USER_NAME: xxxx@foxmail.com
  DISCOURSE_SMTP_PASSWORD: kknvfghgfqrbcee
  DISCOURSE_SMTP_ENABLE_START_TLS: true           # (optional, default true)

  ## If you added the Lets Encrypt template, uncomment below to get a free SSL certificate
  #LETSENCRYPT_ACCOUNT_EMAIL: me@example.com

  ## The http or https CDN address for this Discourse instance (configured to pull)
  ## see https://meta.discourse.org/t/14857 for details
  #DISCOURSE_CDN_URL: https://discourse-cdn.example.com

## The Docker container is stateless; all data is stored in /shared
volumes:
  - volume:
      host: /var/discourse/shared/standalone
      guest: /shared
  - volume:
      host: /var/discourse/shared/standalone/log/var-log
      guest: /var/log

## Plugins go here
## see https://meta.discourse.org/t/19157 for details
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/discourse/docker_manager.git

## Any custom commands to run after building
run:
  - exec: echo "Beginning of custom commands"
  ## If you want to set the 'From' email address for your first registration, uncomment and change:
  ## After getting the first signup email, re-comment the line. It only needs to run once.
  - exec: rails r "SiteSetting.notification_email='xxxx@foxmail.com'"
  - exec: echo "End of custom commands"
```

## 启动Discourse

启动引导程序：

```shell
./launcher bootstrap app
```

引导过程完成后，启动Discourse：

```shell
./launcher start app
```

## 升级或重新部署Discourse

您的Discourse平台现在可以使用了。如果将来需要升级Discourse，则可以从命令行中通过从Git存储库中提取最新版本的代码并重建应用程序来进行升级：

> 注意
> 
> 升级过程中注意规则的改变，例如升级可能加了新的规则自动删除不活跃的好友，多留意官方动态

```shell
cd /var/discourse
sudo git pull
sudo ./launcher rebuild app
```

## 参考链接

https://www.vultr.com/docs/how-to-install-discourse-on-ubuntu-18-04-87257
https://meta.discourse.org/t/running-other-websites-on-the-same-machine-as-discourse/17247
https://meta.discourse.org/t/wanting-to-run-discourse-alongside-apache/125075
