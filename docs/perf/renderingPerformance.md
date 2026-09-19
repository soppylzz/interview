# 重排、重绘与合成

改变几何尺寸和位置通常会触发布局，改变颜色或阴影通常需要绘制，只改变已提升图层的 transform/opacity 往往可由合成完成。实际路径依浏览器和上下文，需用 DevTools 验证。

当样式写入尚未计算时读取 `offsetWidth`、`getBoundingClientRect` 等布局信息，浏览器可能被迫同步刷新。循环中读写交错会形成 layout thrashing。

```text
低效：write → read → write → read
改进：批量 read → 计算 → 在同一帧批量 write
```

transform 和 opacity 动画通常避免每帧布局/绘制，但合成层需要纹理内存、上传和管理，层数越多并不越快。`will-change` 只在即将发生高频变化时短期添加，结束后移除。

`contain` 告诉浏览器元素的布局、绘制或尺寸与外部隔离；`content-visibility: auto` 可跳过视口外子树的渲染工作。使用时仍需提供合理 intrinsic size，避免滚动条和布局位移。
