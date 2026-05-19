---
layout: post
title: "Mask Self-Attention"
date: 2023-10-28 00:00:00 +0800
description:
tags: ["transformer", "attention"]
categories: ["Deep Learning"]
permalink: /2023/10/28/mask-attention/
---

# mask的简单说明

在transformer的self-attention中，一般包括两类的mask操作，padding mask 和 attention mask。其中padding mask是用于消除padding token对前文的影响；而attention mask是用于在解码器训练时消除后文token对前文token的影响。上面两种mask操作都用在对\(\frac{Q*K^{T}}{\sqrt{(d)}}\)的结果做softmax之前。通过在 \(\frac{Q*K^{T}}{\sqrt{(d)}}\)的结果的需要mask的位置写入\(-inf\)，使得相应位置在softmax后变成0。

# mask的实际过程

## padding mask

为了使得训练时一个batch的数据对齐，会对数据填充特殊的token到相同的长度。例如对 “看电视” 这个句子，一共是3个token（假设分词的时候一个字为一个token）, 而我们要把它填充到5个token，就可以在后面添加两个特殊的token，假设是0，那么填充后的句子就是“看电视<0><0>” 。则这个句子在attention时，\(\frac{Q*K^{T}}{\sqrt{(d)}}\)的结果为一个5*5的矩阵。这个矩阵在做softmax之前，我们就需要对后面的两列进行填充，使得padding的两个0不会影响前面的token。如下图所示，最后两行是不用mask的，因为最后两行是padding的token本身。

![padding mask](/assets/img/blog/mask-attention/padding_mask.png)

## attention mask

attention mask的目的是在进行decoder的训练时，为了防止当前token获取其后面的token的信息。因为在实际的解码中，当前token是不知道后面的token的情况的。例如“看电视”的“电”不能得到“视”的信息。实际的操作就是将获得的5*5的矩阵的上三角进行mask，使得每一个token只能得到其前面的token和其本身的信息。

![padding mask](/assets/img/blog/mask-attention/attention_mask.png)

## 两步操作合并

![padding mask](/assets/img/blog/mask-attention/full_mask.png)

# 代码示例

下面是简单的代码示例，演示mask attention的流程

```python
import math
import torch
import torch.nn.functional as F

q = torch.randn((5,6))
k = torch.randn((5,6))
v = torch.randn((5,6))
score = torch.matmul(q,k.transpose(0,1))/math.sqrt(6)

print("score before mask=============>")
print(score)

# paddding mask
pading_mask = torch.ones(1,5)
for i in range(3,5):
    pading_mask[0][i] = 0

score = score.masked_fill(pading_mask==0, -1e20)

print("padding mask===========>")
print(pading_mask)
print("score after padding mask=============>")
print(score)

# attention mask
attention_mask = torch.ones((5,5))
for i in range(5):
    for j in range(i+1,5):
        attention_mask[i][j] = 0

score = score.masked_fill(attention_mask==0, -1e20)

print("attention mask===========>")
print(attention_mask)
print("score after attention mask=============>")
print(score)

p_attn = F.softmax(score, dim=-1)
out = torch.matmul(p_attn, v)

print("softmax===============>")
print(p_attn)
print("attention result=============>")
print(out)
```

**输出结果:**

```text
score before mask=============>
tensor([[-0.1011,  0.9123, -0.7263,  0.3832, -0.5158],
        [ 0.9399,  1.6693,  0.5585, -0.8560,  0.8370],
        [ 0.5723, -1.0366, -0.3053,  0.5132,  0.1678],
        [-0.1386,  0.8009,  0.5447, -0.6551,  0.2071],
        [ 0.4491, -0.6820, -0.1343,  0.0158, -1.1316]])
padding mask===========>
tensor([[1., 1., 1., 0., 0.]])
score after padding mask=============>
tensor([[-1.0107e-01,  9.1226e-01, -7.2626e-01, -1.0000e+20, -1.0000e+20],
        [ 9.3988e-01,  1.6693e+00,  5.5847e-01, -1.0000e+20, -1.0000e+20],
        [ 5.7234e-01, -1.0366e+00, -3.0526e-01, -1.0000e+20, -1.0000e+20],
        [-1.3858e-01,  8.0090e-01,  5.4466e-01, -1.0000e+20, -1.0000e+20],
        [ 4.4912e-01, -6.8202e-01, -1.3425e-01, -1.0000e+20, -1.0000e+20]])
attention mask===========>
tensor([[1., 0., 0., 0., 0.],
        [1., 1., 0., 0., 0.],
        [1., 1., 1., 0., 0.],
        [1., 1., 1., 1., 0.],
        [1., 1., 1., 1., 1.]])
score after attention mask=============>
tensor([[-1.0107e-01, -1.0000e+20, -1.0000e+20, -1.0000e+20, -1.0000e+20],
        [ 9.3988e-01,  1.6693e+00, -1.0000e+20, -1.0000e+20, -1.0000e+20],
        [ 5.7234e-01, -1.0366e+00, -3.0526e-01, -1.0000e+20, -1.0000e+20],
        [-1.3858e-01,  8.0090e-01,  5.4466e-01, -1.0000e+20, -1.0000e+20],
        [ 4.4912e-01, -6.8202e-01, -1.3425e-01, -1.0000e+20, -1.0000e+20]])
softmax===============>
tensor([[1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
        [0.3253, 0.6747, 0.0000, 0.0000, 0.0000],
        [0.6189, 0.1238, 0.2573, 0.0000, 0.0000],
        [0.1805, 0.4619, 0.3575, 0.0000, 0.0000],
        [0.5317, 0.1716, 0.2967, 0.0000, 0.0000]])
attention result=============>
tensor([[ 2.3628, -1.1089, -1.1952,  0.4795,  0.4636,  0.9471],
        [ 0.8548, -0.6983,  0.9581,  0.3153,  0.6520, -0.1119],
        [ 1.5570, -1.0357, -0.4381,  0.6612,  0.7390,  1.0355],
        [ 0.5953, -0.8307,  0.7819,  0.6614,  0.9271,  0.6149],
        [ 1.3694, -1.0069, -0.2304,  0.6820,  0.7891,  1.0038]])
```
