---
layout: post
title: "Linux安装Cuda"
date: 2023-06-25 00:00:00 +0800
description:
tags: ["Cuda", "Linux"]
categories: ["软件安装"]
permalink: /2023/06/25/Linux安装Cuda/
---

# 简介

NVIDIA提供的CUDA中包含了toolkit和driver，在安装多版本cuda的情况下，一般我们只安装toolkit部分，而driver部分一般是使用系统中的最高版本的cuda对应的driver，向后兼容的。就是说当我们安装的cuda版本比系统中最高版本高时，需要更新系统中的driver，即在安装时driver也需要安装以覆盖系统当前的driver。如果安装的是低版本的cuda，就不用了。

# 下载CUDA文件

[下载地址](https://developer.nvidia.com/cuda-downloads)，选择对应的系统，下载 `cuda_xxx.run`文件。 查看命令行参数

```text
sh cuda_12.0.0_525.60.13_linux.run --help
```

 安装

```text
sudo sh cuda_12.0.0_525.60.13_linux.run
```

 上面的命令会产生一个选择界面，可以选择是否安装driver、toolkit等，以及修改相应的安装路径，也可以使用命令行参数来完成这些事情。
