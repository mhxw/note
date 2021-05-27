---
title: 智能合约编译成Java文件
date: 2021-4-10
tags:
- web3j
- solidity
author: mhxw
---

## 概要

智能合约编译成java文件有几种方式，本文讲解最原始的那种。

## 编译环境

Windows 系统

## 一、安装solc

Solidity编写的以太坊智能合约可通过命令行编译工具solc来进行编译，成为以太坊虚拟机中的代码。solc编译后最终部署到链上形成我们所见到的各种智能合约。

> 注意
> 
> solc的版本与以太坊智能合约版本一致，如果您编译的是.0.5.16，只下载那个版本即可

示例代码

```shell
npm install -g solc@0.5.16
```

以下网址可查到solc的所有版本号

```shell
https://www.npmjs.com/package/solc
```

通过以下命令检查是否安装成功，正确会输出其版本号

```shell
solcjs -V
```

## 二、下载web3j命令行工具转

打开以下网址，选择tag中的最新分支，点击.zip文件下载

```shell
https://github.com/web3j/web3j/releases
```

## 三、使用web3j命令行工具转为java文件

- --solidityTypes：后面添加第一步生成的`.bin文件`和`abi`文件
- -o：java文件保存的位置
- -p：包名

```shell
web3j solidity generate --solidityTypes D:\Sol\Sol\mhxw.bin D:\Sol\Sol\mhxw.abi -o D:\Sol\java -p com.mhxw.service.contract
```
