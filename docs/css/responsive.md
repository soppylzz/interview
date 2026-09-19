# 响应式布局

> 响应式设计让布局根据可用空间、用户偏好和设备能力变化。断点应由内容开始失效的位置驱动，而不是只按设备名称划分。

## 1. Viewport Meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

它让移动浏览器使用设备 CSS viewport 宽度进行布局，避免默认使用较宽的虚拟 layout viewport 后整体缩放。

## 2. Media Query

```css
@media (width >= 48rem) {
  .layout {
    grid-template-columns: 16rem 1fr;
  }
}
```

除宽高外，还可查询 orientation、hover、pointer、resolution、prefers-reduced-motion、prefers-color-scheme、forced-colors 等。

移动优先通常先写窄屏基础样式，再用 min-width 增强；桌面优先常用 max-width 逐步简化。选择应保持规则方向一致，减少覆盖冲突。

## 3. 流式尺寸

```css
.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

h1 {
  font-size: clamp(2rem, 1rem + 3vw, 4rem);
}
```

- `min()` 取较小值。
- `max()` 取较大值。
- `clamp(min, preferred, max)` 把流式值限制在范围内。
- `calc()` 组合不同单位。

## 4. 自适应布局

Grid：

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
```

它根据空间自动改变列数，可减少只为常见宽度设置断点。Flex 更适合一维内容流和未知数量 item。

## 5. Container Query

Media query 查询 viewport 或设备；container query 查询组件祖先容器。可复用组件不知道自己出现在主栏还是侧栏时，container query 更贴合局部布局。

```css
.card-host {
  container-type: inline-size;
}

@container (width >= 30rem) {
  .card {
    grid-template-columns: 10rem 1fr;
  }
}
```

## 6. 设计原则

- 图片和媒体设置 `max-inline-size: 100%`。
- 避免依赖固定高度容纳可变文本。
- 保留用户缩放能力。
- 同时测试长文本、不同字号、触屏和键盘操作。
- visual order 不应破坏 DOM reading order。

## Interview

### Media query 与 container query 有什么区别？

Media query 根据 viewport、输出设备或用户偏好应用样式；container query 根据特定祖先容器的尺寸或样式，使组件响应实际可用空间。
