---
title: Linux下查找进程id并强制停止进程的脚本
date: 2021-5-23
tags: 
  - linux
  - shell
author: mhxw
---

写一个简易脚本用来自动获取进程id并优雅关闭进程

<!-- more -->

## 思路

1、先获取进程id的方法，可以采用`awk`命令来获取

> 这里要把这个grep这个用 -v 来过滤掉，然后用awk命令，提取第2个参数就是进程id了

```markdown
ps -ef | grep 你的进程 | grep -v grep | awk '{print $2}'
```

2. 关闭进程

```markdown
kill -15 你的进程id
```

## 脚本代码

> 注意：使用时，需要把第一行的 sp-tomcat 替换换成你希望杀的进程

> 说明：可能有人会说查找进程出现多个进程id时，脚本会报错的。其实是不会的，出现多个进程id时，他们之间是有空格隔开来了的。刚好kill命令一次杀多个进程时，进程id需要用空格。所以不需要用for循环来杀进程

```
mhxw_pid=`ps -ef | grep sp-tomcat | grep -v grep | awk '{print $2}'`
if [ -z "$mhxw_pid" ];
then
  echo "[ not find sp-tomcat pid ]"
else
  echo "find result: $sp_pid "
  kill -15 $sp_pid
fi
```

