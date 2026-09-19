# 变换、过渡与动画

> Transform 改变元素坐标空间；Transition 在属性值变化时插值；Animation 通过 keyframes 独立驱动时间序列。

## 1. Transform

常见函数：translate、scale、rotate、skew、matrix、perspective。多个 transform 的顺序会改变结果，因为每个操作会影响后续坐标系。

```css
/* These are not generally equivalent. */
.a { transform: translateX(100px) rotate(30deg); }
.b { transform: rotate(30deg) translateX(100px); }
```

`transform-origin` 指定变换参考点。transform 改变视觉位置和 hit testing，但通常不重新安排普通流兄弟的位置。

## 2. Transition

Transition 需要属性从一个可插值值变到另一个值：

```css
.button {
  transition: transform 160ms ease, opacity 160ms linear;
}
```

避免无差别 `transition: all`：它会让后来新增的尺寸、颜色等变化意外动画，也更难预测性能。

`display: none` 等离散值传统上不能连续插值；现代离散 transition 能力需检查属性和浏览器支持。

## 3. Animation

```css
@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
```

- duration/delay：时长和延迟。
- iteration-count：次数。
- direction：normal、reverse、alternate。
- fill-mode：动画执行区间外是否应用 keyframe 样式。
- play-state：running/paused。
- timing-function：linear、steps、cubic-bezier 等。

Animation 可自动开始和重复；Transition 由属性变化触发。

## 4. 性能

transform 和 opacity 常能跳过 layout 与 paint，只在 compositor 阶段更新，但不是绝对保证。大面积 layer、filter、阴影和纹理上传仍可能昂贵。

不要为了“GPU 加速”给大量元素长期设置 translateZ(0) 或 will-change。

## 5. 减少动态效果

```css
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    transition-duration: 0.01ms;
  }
}
```

应保留必要状态反馈，只移除大幅移动、闪烁或非必要动画。

## Interview

### transform 为什么通常比修改 left/top 流畅？

修改布局位置常要求重新 layout 和 paint；已有合成层上的 transform 可能只更新合成参数。但是否分层和是否需要重绘由浏览器决定，仍需实际测量。
