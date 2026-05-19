---
layout: post
title: "in-place-dnn-inference"
date: 2023-07-13 00:00:00 +0800
description:
tags: []
categories: []
permalink: /2023/07/13/in-place-dnn-inference/
---

DNN模型进行推理时，使用`in-place`技术进行内存节约。

在神经网络推理时，理论上需要为每一层的输入和输出分配内存。但实际上，由于大多数层的输入和输出结果只在当时有用，推理下一层时就没用了，所以可以对内存进行重用，只为某些层进行内存的分配，而其他层则重用这些层分配的内存进行数据的存储。 https://mxnet.apache.org/versions/1.0.0/architecture/note_memory.html https://github.com/ultralytics/yolov5/issues/4647 Micro Darknet For Inference: ESL reference for inference accelerator design 利用了重用技术，但是只是在CPU内存上 https://forums.developer.nvidia.com/t/darknet-yolov3-optimized-for-jetson-unified-memory-and-mixed-precision/123133 使用了jetson上的统一内存管理
