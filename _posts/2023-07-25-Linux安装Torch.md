---
layout: post
title: "Linux安装Torch"
date: 2023-07-25 00:00:00 +0800
description:
tags: ["linux", "tool", "cuda", "torch"]
categories: ["软件安装"]
permalink: /2023/07/25/Linux安装Torch/
---

# 官网安装

在pytorch[官网](https://pytorch.org/get-started/locally/)查找合适的版本。 在conda 环境中，也使用pip安装最方便。例如：

```shell
pip install torch==1.13.0+cu116 torchvision==0.14.0+cu116 torchaudio==0.13.0 --extra-index-url https://download.pytorch.org/whl/cu116
```

 其中cu116表示机器的cuda版本是11.6，可通过nvidia-smi查看。

# 清华镜像

有时候国内的机器访问官网很慢，可以使用清华镜像安装，如

```shell
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple torch==1.13.0
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple #直接读取文件安装
```
