---
title: 在Ubuntu18.04 上采用Docker 安装bitwardenrs和实现自动备份数据库
date: 2021-3-6
tags:
- docker
- ubuntu
author: mhxw
---

文章使用环境为ubuntu，使用docker运行bitwarden_rs服务。
## 一、安装docker
简单安装法：
```
sudo apt install docker.io
```
查看docker是否安装成功
```
docker -v
```
启动docker
```
sudo systemctl start docker
```
设置docker服务开机自启动
```
sudo systemctl enable docker
```
> 国内服务器建议配置镜像加速器
## 二、部署bitwarden_rs
bitwarden_rs是由rust编写的非官方客户端，优点是内存占用小，和官方兼容性高。
仓库：https://github.com/dani-garcia/bitwarden_rs
- 使用Docker拉取bitwarden_rs镜像
```
docker pull bitwardenrs/server:latest
```
- 运行
  其中`bw-data`为持久化保存的数据：网站图标缓存、密钥和数据库文件，您可以根据自己的需要调整路径。
```
docker run -d --name bitwarden -v /bw-data/:/data/ -p 8800:80 bitwardenrs/server:latest
```
### 其他配置
- 禁用新用户注册
```
docker run -d --name bitwarden \
  -e SIGNUPS_ALLOWED=false \
  -v /bw-data/:/data/ \
  -p 8800:80 \
  bitwardenrs/server:latest
```
- 禁用邀请
  即使禁用注册，组织管理员或所有者也可以邀请用户加入组织。受邀请后，即使`SIGNUPS_ALLOWED`实际上设置为，他们也可以向受邀请的电子邮件注册false。您可以通过将`INVITATIONS_ALLOWED`env变量设置为来完全禁用此功能false：
```
docker run -d --name bitwarden \
  -e SIGNUPS_ALLOWED=false \
  -e INVITATIONS_ALLOWED=false \
  -v /bw-data/:/data/ \
  -p 8800:80 \
  bitwardenrs/server:latest
```
- 启动管理员页面
  https://github.com/dani-garcia/bitwarden_rs/wiki
## 三、安装nginx做反向代理与支持ssl
- 安装nginx
```
sudo apt install nginx
```
修改配置文件开启ssl与反向代理，在`/etc/nginx/conf.d`下添加配置文件`youdomain.com.conf`，youdomain.com为用来访问的域名。

文件内容：
```
server
    {
        listen 80;
        #listen [::]:80;
        server_name youdomain.com;            #把youdomain.com修改为用来访问的域名
		rewrite ^/(.*) https://$server_name/$1 permanent;
    }

server
    {
        listen 443 ssl http2;
        #listen [::]:443 ssl http2;
        server_name youdomain.com;            #把youdomain.com修改为用来访问的域名
        
        location / {
            proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
  
        location /notifications/hub {
            proxy_pass http://127.0.0.1:3012;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
  
        location /notifications/hub/negotiate {
            proxy_pass http://127.0.0.1:8000;
        }
        # 加入robots.txt 防止搜索引擎爬虫抓取
        location = /robots.txt {
            root /home/wwwroot/Bitwarden;
        }
  }
```
在vhost目录/home/wwwroot/Bitwarden创建一个robots.txt 文件，写入以下内容禁止搜索引擎爬虫抓取
```
User-agent: *
Disallow: /
```
- 重启nginx
```
service nginx restart
```
## 四、备份数据
数据无价,设置定时备份数据库。bitwarden-rs的数据库在`/bw-data`目录，里面还有密钥文件和网站图标缓存，这些都是可选的，以下脚本只备份数据库。
```
#!/bin/bash
# https://gist.github.com/vitobotta/3a6c53c3693ff77cd0c920d0a541622d#file-bitwarden_rs-backup-sh-L25
export LC_ALL=C

now=$(date +"%Y%m%d-%H%M%S")
parent_dir="/home/<USER>/bitwarden/bw-data"
backups_dir="${parent_dir}/backups"
log_file="${backups_dir}/backup-progress.log.${now}"
tmp_sqlite_backup="backups/db.sqlite3.${now}"
archive="backups/backup.tar.gz.${now}"

error () {
  printf "%s: %s\n" "$(basename "${BASH_SOURCE}")" "${1}" >&2
  exit 1
}

trap 'error "An unexpected error occurred."' ERR

take_backup () {
  cd "${parent_dir}"
  
  sqlite3 db.sqlite3 ".backup '${tmp_sqlite_backup}'"
  /bin/tar czf "${archive}" "${tmp_sqlite_backup}" attachments

  rm "${tmp_sqlite_backup}"

  find "${backups_dir}/" -type f -mtime +30 -exec rm {} \;
}

printf "\n======================================================================="
printf "\nBitwarden Backup"
printf "\n======================================================================="
printf "\nBackup in progress..."

take_backup 2> "${log_file}"

if [[ -s "${log_file}" ]]
then
  printf "\nBackup failure! Check ${log_file} for more information."
  printf "\n=======================================================================\n\n"
else
  rm "${log_file}"
  printf "...SUCCESS!\n"
  printf "Backup created at ${backups_dir}/backup.tar.gz.${now}"
  printf "\n=======================================================================\n\n"
fi
```
设置定时任务，修改文件 /etc/crontab插入一下内容
```
00 1    * * *   root   /home/<USER>/bitwarden/bw-data/backups/bitwarden_rs-backup.sh
```
以上表示，每天凌晨 1 ，root 用户执行一次 `bitwarden_rs-backup.sh` 脚本。
> 后期加邮件提醒

注册完账号后，把`SIGNUPS_ALLOWED`选项改成fale重启实例关闭注册。
