# 图片与响应式资源

img 的 alt 表达图片在当前上下文的用途；装饰图片用 `alt=""`。width/height 提供固有宽高比，帮助浏览器预留空间，CSS 仍可响应式缩放。

srcset 提供不同宽度或像素密度候选，sizes 描述图片预期布局宽度，浏览器结合视口和 DPR 选择。picture/source 用于 art direction 或格式切换，img 仍是 fallback 和语义载体。

首屏 LCP 图片不应懒加载，可按证据提高 fetchpriority；非首屏可 `loading="lazy"`。decoding 是解码提示，不保证固定时机。

figure/figcaption 适合需要独立说明的图像。CSS background 更适合装饰，不具备 img 的 alt、响应式候选和同等资源发现语义。
