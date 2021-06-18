---
title: Prometheus监控平台AlertManager配置告警
date: 2021-5-2
tags:
  - prometheus
  - alertmanager
author: MHXW
---

## 一. 前言

接上一篇[Prometheus+Grafana监控部署](./2021-4-25-install-prometheus-on-linux.md)，环境已经安装完成，本篇进行学习使用Alertmanager告警配置。

## 二、介绍

AlertManager是一个独立的告警模块，接收Prometheus等客户端发来的警报，之后通过分组、删除重复等处理，并将它们通过路由发送给正确的接收器。

## 三、安装部署

### 1、下载

https://prometheus.io/download/

### 2、解压

```shell
mkdir -p /mhxw/prometheus/alertmanager
wget https://github.com/prometheus/alertmanager/releases/download/v0.22.2/alertmanager-0.22.2.linux-amd64.tar.gz
tar -zxvf alertmanager-0.22.2.linux-amd64.tar.gz -C /mhxw/prometheus/
mv /mhxw/prometheus/alertmanager-0.22.2.linux-amd64/* /mhxw/prometheus/alertmanager
cd /mhxw/prometheus/alertmanager
```

- 查看版本

```shell
/mhxw/prometheus/alertmanager/alertmanager --version
```

### 3、编辑`alertmanager`配置文件

```shell
vim /mhxw/prometheus/alertmanager/alertmanager.yml
```

配置文件说明

- 全局配置（global）：用于定义一些全局的公共参数，如全局的SMTP配置，Slack配置等内容；
- 模板（templates）：用于定义告警通知时的模板，如HTML模板，邮件模板等；
- 告警路由（route）：根据标签匹配，确定当前告警应该如何处理；
- 接收人（receivers）：接收人是一个抽象的概念，它可以是一个邮箱也可以是微信，Slack或者Webhook等，接收人一般配合告警路由使用；
- 抑制规则（inhibit_rules）：合理设置抑制规则可以减少垃圾告警的产生

完整配置格式如下：

```shell
global:
  [ resolve_timeout: <duration> | default = 5m ]
  [ smtp_from: <tmpl_string> ] 
  [ smtp_smarthost: <string> ] 
  [ smtp_hello: <string> | default = "localhost" ]
  [ smtp_auth_username: <string> ]
  [ smtp_auth_password: <secret> ]
  [ smtp_auth_identity: <string> ]
  [ smtp_auth_secret: <secret> ]
  [ smtp_require_tls: <bool> | default = true ]
  [ slack_api_url: <secret> ]
  [ victorops_api_key: <secret> ]
  [ victorops_api_url: <string> | default = "https://alert.victorops.com/integrations/generic/20131114/alert/" ]
  [ pagerduty_url: <string> | default = "https://events.pagerduty.com/v2/enqueue" ]
  [ opsgenie_api_key: <secret> ]
  [ opsgenie_api_url: <string> | default = "https://api.opsgenie.com/" ]
  [ hipchat_api_url: <string> | default = "https://api.hipchat.com/" ]
  [ hipchat_auth_token: <secret> ]
  [ wechat_api_url: <string> | default = "https://qyapi.weixin.qq.com/cgi-bin/" ]
  [ wechat_api_secret: <secret> ]
  [ wechat_api_corp_id: <string> ]
  [ http_config: <http_config> ]

templates:
  [ - <filepath> ... ]

route: <route>

receivers:
  - <receiver> ...

inhibit_rules:
  [ - <inhibit_rule> ... ]
```

文件内容如下：

```shell
global:
  resolve_timeout: 5m
  smtp_smarthost: "smtp.qq.com:587"
  smtp_from: "****@foxmail.com"
  smtp_auth_username: "****@foxmail.com"
  #邮箱专用授权码
  smtp_auth_password: "****"
  #关闭TLS授权
  smtp_require_tls: true
route:
  group_by: ['mhxw_status','node_status'] #与prometheus配置文件alert_rules.yml中配置规则名对应
  group_wait: 30s #报警等待时间
  group_interval: 5m #报警间隔时间
  repeat_interval: 1h #重复报警间隔时间
  receiver: 'mhxw_receiver' #告警处理方式
receivers:
- name: 'mhxw_receiver'
  email_configs:
    - to: 'mhxw@gmail.com'
      send_resolved: true
inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'dev', 'instance']
```

- template目录下`node_status.tmpl`

```shell
{{ define "node.status.message" }}
{{- if gt (len .Alerts.Firing) 0 -}}
{{- range $index, $alert := .Alerts -}}
{{- if eq $index 0 -}}
**********MHXW告警通知**********
MHXW告警类型: {{ $alert.Labels.alertname }}
告警级别: {{ $alert.Labels.level }}
{{- end }}
=====================
MHXW告警主题: {{ $alert.Annotations.summary }}
MHXW告警详情: {{ $alert.Annotations.description }}
MHXW故障时间: {{ (.StartsAt.Add 28800e9).Format "2006-01-02 15:04:05" }}
{{ if gt (len $alert.Labels.instance) 0 -}}故障实例: {{ $alert.Labels.instance }}{{- end -}}
{{- end }}
{{- end }}

{{- if gt (len .Alerts.Resolved) 0 -}}
{{- range $index, $alert := .Alerts -}}
{{- if eq $index 0 -}}
**********恢复通知**********
告警类型: {{ $alert.Labels.alertname }}
告警级别: {{ $alert.Labels.level }}
{{- end }}
=====================
告警主题: {{ $alert.Annotations.summary }}
告警详情: {{ $alert.Annotations.description }}
故障时间: {{ (.StartsAt.Add 28800e9).Format "2006-01-02 15:04:05" }}
恢复时间: {{ (.EndsAt.Add 28800e9).Format "2006-01-02 15:04:05" }}
{{ if gt (len $alert.Labels.instance) 0 -}}故障实例: {{ $alert.Labels.instance }}{{- end -}}
{{- end }}
{{- end }}
{{- end }}

```

配置说明

- global: 全局配置，包括报警解决后的超时时间、SMTP 相关配置、各种渠道通知的 API 地址等等。

- route: 用来设置报警的分发策略，它是一个树状结构，按照深度优先从左向右的顺序进行匹配。

- receivers: 配置告警消息接受者信息，例如常用的 email、wechat、slack、webhook 等消息通知方式。

- inhibit_rules: 抑制规则配置，当存在与另一组匹配的警报（源）时，抑制规则将禁用与一组匹配的警报（目标）。

- smtp_smarthost: 这里为 QQ 邮箱 SMTP 服务地址，官方地址 smtp.qq.com 端口为 465 或 587，同时设置开启 POP3/SMTP 服务。

- smtp_auth_password: 这里为第三方登录 QQ 邮箱的授权码，非 QQ 账户登录密码，否则会报错，获取方式在 QQ 邮箱服务端设置开启 POP3/SMTP 服务时会提示。

### 4、检查AlertManager配置文件

```shell
/usr/local/Prometheus/alertmanager/amtool check-config /usr/local/Prometheus/alertmanager/alertmanager.yml
```

### 5、启动AlertManager

一种是采用`tmux`方式

- 新建会话

```shell
tmux new -s alertmanager
```

- 进入会话

```shell
tmux a -t alertmanager
/mhxw/prometheus/alertmanager/alertmanager --config.file=/mhxw/prometheus/alertmanager/alertmanager.yml --web.listen-address=:1998
```

一种是`systemd`采用开机启动方式

```shell
cat > /etc/systemd/system/alertmanager.service << "EOF"
[Unit]
Description=alertmanager
After=local-fs.target network-online.target network.target
Wants=local-fs.target network-online.target network.target
 
[Service]
ExecStart=/mhxw/prometheus/alertmanager/alertmanager --config.file=/mhxw/prometheus/alertmanager/alertmanager.yml --web.listen-address=:1998
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOF
```

```shell
systemctl daemon-reload

systemctl enable alertmanager

systemctl start alertmanager

systemctl status alertmanager
```

## 四、重新配置Prometheus

### 1、编辑prometheus.yml

```shell
vim /mhxw/prometheus/prometheus/prometheus.yml
```

- 告警配置连接

```shell
# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
       - alertmanager:1998
```

- 开启告警配置

```shell
rule_files:
   - "rules/*.yml"
```

- 监控AlertManager

```shell
- job_name: 'alertmanager'
    static_configs:
      - targets: ['localhost:1998']
```

- 文件内容

```shell
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets: ["localhost:1998"]

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
   - "rules/*.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
    - targets: ['localhost:9090']
#追加以下内容
  - job_name: 'node_exporter-1'
    static_configs:
    - targets: ['localhost:9101'] #安装node_exporter的服务器
#追加以下内容
  - job_name: 'mhxw'
    static_configs:
    - targets: ['47.242.76.64:26635'] #安装mhxw的服务器
#追加以下内容
  - job_name: 'alertmanager'
    static_configs:
    - targets: ['localhost:1998'] #alertmanager



```

- 检查并重新加载配置文件

```shell
/usr/local/Prometheus/promtool check config /usr/local/Prometheus/prometheus.yml
```

### 2、创建告警目录&添加报警规则 

在prometheus.yml的同级目录下，创建rules目录，在该rules目录下创建node_alerts.yml文件，内容如下：

```shell
mkdir rules && cd rules/

touch node_alerts.yml
```

文件内容

>注意
> 
> 为了方便测试，我这里把调整磁盘使用率阀值测试报警调整到1，然后重新加载配置。

```shell
groups:
  - name: node_status
    rules:
    - alert: DiskUsageAlert_warning
      expr: (1 - node_filesystem_free_bytes{fstype!="rootfs",mountpoint!="",mountpoint!~"/(run|var|sys|dev).*"} / node_filesystem_size_bytes) * 100 > 1
      for: 2m
      labels:
        level: warning
      annotations:
        summary: "主机 {{ $labels.instance }} 磁盘使用率高"
        description: "{{$labels.instance}}: 磁盘使用率超过80％ (当前占比为: {{ $value }})"
```

### 3、重启Prometheus

```shell
systemctl restart prometheus
```

警报有三种状态：

- Inactive 警报未激活；

- Pending：警报已满足测试表达式条件，但未达到for指定的持续时间；

- Firing：警报满足测试表达式条件，且持续时间达到了for指定的持续时间；

### 4、查看邮件

## 参考文档

```shell
https://zhuanlan.zhihu.com/p/74932366
http://www.linuxe.cn/post-514.html
https://www.cnblogs.com/longcnblogs/p/9620733.html
https://www.cnblogs.com/jiujuan/p/13262380.html
```
