(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{434:function(a,t,e){"use strict";e.r(t);var n=e(11),s=Object(n.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p",[a._v("文章使用环境为ubuntu，使用docker运行bitwarden_rs服务。")]),a._v(" "),e("h2",{attrs:{id:"一、安装docker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、安装docker"}},[a._v("#")]),a._v(" 一、安装docker")]),a._v(" "),e("p",[a._v("简单安装法：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("sudo apt install docker.io\n")])])]),e("p",[a._v("查看docker是否安装成功")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("docker -v\n")])])]),e("p",[a._v("启动docker")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("sudo systemctl start docker\n")])])]),e("p",[a._v("设置docker服务开机自启动")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("sudo systemctl enable docker\n")])])]),e("blockquote",[e("p",[a._v("国内服务器建议配置镜像加速器")])]),a._v(" "),e("h2",{attrs:{id:"二、部署bitwarden-rs"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二、部署bitwarden-rs"}},[a._v("#")]),a._v(" 二、部署bitwarden_rs")]),a._v(" "),e("p",[a._v("bitwarden_rs是由rust编写的非官方客户端，优点是内存占用小，和官方兼容性高。\n仓库：https://github.com/dani-garcia/bitwarden_rs")]),a._v(" "),e("ul",[e("li",[a._v("使用Docker拉取bitwarden_rs镜像")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("docker pull bitwardenrs/server:latest\n")])])]),e("ul",[e("li",[a._v("运行\n其中"),e("code",[a._v("bw-data")]),a._v("为持久化保存的数据：网站图标缓存、密钥和数据库文件，您可以根据自己的需要调整路径。")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("docker run -d --name bitwarden -v /bw-data/:/data/ -p 8800:80 bitwardenrs/server:latest\n")])])]),e("h3",{attrs:{id:"其他配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他配置"}},[a._v("#")]),a._v(" 其他配置")]),a._v(" "),e("ul",[e("li",[a._v("禁用新用户注册")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("docker run -d --name bitwarden \\\n  -e SIGNUPS_ALLOWED=false \\\n  -v /bw-data/:/data/ \\\n  -p 8800:80 \\\n  bitwardenrs/server:latest\n")])])]),e("ul",[e("li",[a._v("禁用邀请\n即使禁用注册，组织管理员或所有者也可以邀请用户加入组织。受邀请后，即使"),e("code",[a._v("SIGNUPS_ALLOWED")]),a._v("实际上设置为，他们也可以向受邀请的电子邮件注册false。您可以通过将"),e("code",[a._v("INVITATIONS_ALLOWED")]),a._v("env变量设置为来完全禁用此功能false：")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("docker run -d --name bitwarden \\\n  -e SIGNUPS_ALLOWED=false \\\n  -e INVITATIONS_ALLOWED=false \\\n  -v /bw-data/:/data/ \\\n  -p 8800:80 \\\n  bitwardenrs/server:latest\n")])])]),e("ul",[e("li",[a._v("启动管理员页面\nhttps://github.com/dani-garcia/bitwarden_rs/wiki")])]),a._v(" "),e("h2",{attrs:{id:"三、安装nginx做反向代理与支持ssl"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#三、安装nginx做反向代理与支持ssl"}},[a._v("#")]),a._v(" 三、安装nginx做反向代理与支持ssl")]),a._v(" "),e("ul",[e("li",[a._v("安装nginx")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("sudo apt install nginx\n")])])]),e("p",[a._v("修改配置文件开启ssl与反向代理，在"),e("code",[a._v("/etc/nginx/conf.d")]),a._v("下添加配置文件"),e("code",[a._v("youdomain.com.conf")]),a._v("，youdomain.com为用来访问的域名。")]),a._v(" "),e("p",[a._v("文件内容：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('server\n    {\n        listen 80;\n        #listen [::]:80;\n        server_name youdomain.com;            #把youdomain.com修改为用来访问的域名\n\t\trewrite ^/(.*) https://$server_name/$1 permanent;\n    }\n\nserver\n    {\n        listen 443 ssl http2;\n        #listen [::]:443 ssl http2;\n        server_name youdomain.com;            #把youdomain.com修改为用来访问的域名\n        \n        location / {\n            proxy_pass http://127.0.0.1:8000;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n            proxy_set_header X-Forwarded-Proto $scheme;\n        }\n  \n        location /notifications/hub {\n            proxy_pass http://127.0.0.1:3012;\n            proxy_set_header Upgrade $http_upgrade;\n            proxy_set_header Connection "upgrade";\n        }\n  \n        location /notifications/hub/negotiate {\n            proxy_pass http://127.0.0.1:8000;\n        }\n        # 加入robots.txt 防止搜索引擎爬虫抓取\n        location = /robots.txt {\n            root /home/wwwroot/Bitwarden;\n        }\n  }\n')])])]),e("p",[a._v("在vhost目录/home/wwwroot/Bitwarden创建一个robots.txt 文件，写入以下内容禁止搜索引擎爬虫抓取")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("User-agent: *\nDisallow: /\n")])])]),e("ul",[e("li",[a._v("重启nginx")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx restart\n")])])]),e("h2",{attrs:{id:"四、备份数据"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#四、备份数据"}},[a._v("#")]),a._v(" 四、备份数据")]),a._v(" "),e("p",[a._v("数据无价,设置定时备份数据库。bitwarden-rs的数据库在"),e("code",[a._v("/bw-data")]),a._v("目录，里面还有密钥文件和网站图标缓存，这些都是可选的，以下脚本只备份数据库。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('#!/bin/bash\n# https://gist.github.com/vitobotta/3a6c53c3693ff77cd0c920d0a541622d#file-bitwarden_rs-backup-sh-L25\nexport LC_ALL=C\n\nnow=$(date +"%Y%m%d-%H%M%S")\nparent_dir="/home/<USER>/bitwarden/bw-data"\nbackups_dir="${parent_dir}/backups"\nlog_file="${backups_dir}/backup-progress.log.${now}"\ntmp_sqlite_backup="backups/db.sqlite3.${now}"\narchive="backups/backup.tar.gz.${now}"\n\nerror () {\n  printf "%s: %s\\n" "$(basename "${BASH_SOURCE}")" "${1}" >&2\n  exit 1\n}\n\ntrap \'error "An unexpected error occurred."\' ERR\n\ntake_backup () {\n  cd "${parent_dir}"\n  \n  sqlite3 db.sqlite3 ".backup \'${tmp_sqlite_backup}\'"\n  /bin/tar czf "${archive}" "${tmp_sqlite_backup}" attachments\n\n  rm "${tmp_sqlite_backup}"\n\n  find "${backups_dir}/" -type f -mtime +30 -exec rm {} \\;\n}\n\nprintf "\\n======================================================================="\nprintf "\\nBitwarden Backup"\nprintf "\\n======================================================================="\nprintf "\\nBackup in progress..."\n\ntake_backup 2> "${log_file}"\n\nif [[ -s "${log_file}" ]]\nthen\n  printf "\\nBackup failure! Check ${log_file} for more information."\n  printf "\\n=======================================================================\\n\\n"\nelse\n  rm "${log_file}"\n  printf "...SUCCESS!\\n"\n  printf "Backup created at ${backups_dir}/backup.tar.gz.${now}"\n  printf "\\n=======================================================================\\n\\n"\nfi\n')])])]),e("p",[a._v("设置定时任务，修改文件 /etc/crontab插入一下内容")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("00 1    * * *   root   /home/<USER>/bitwarden/bw-data/backups/bitwarden_rs-backup.sh\n")])])]),e("p",[a._v("以上表示，每天凌晨 1 ，root 用户执行一次 "),e("code",[a._v("bitwarden_rs-backup.sh")]),a._v(" 脚本。")]),a._v(" "),e("blockquote",[e("p",[a._v("后期加邮件提醒")])]),a._v(" "),e("p",[a._v("注册完账号后，把"),e("code",[a._v("SIGNUPS_ALLOWED")]),a._v("选项改成fale重启实例关闭注册。")])])}),[],!1,null,null,null);t.default=s.exports}}]);