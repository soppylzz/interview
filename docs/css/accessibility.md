# CSS 可访问性

> CSS 不只改变外观，也会影响焦点可见性、阅读顺序、内容是否对辅助技术可见，以及用户偏好是否被尊重。

## 1. 焦点

键盘用户必须能看见当前位置。`:focus-visible` 让浏览器根据输入方式决定何时显示明显提示：

```css
:focus-visible {
  outline: 3px solid Highlight;
  outline-offset: 2px;
}
```

不要直接 `outline: none`。box-shadow 可作为增强，但在 forced colors 模式下 outline 往往更可靠。

## 2. 对比度与颜色

- 正文和背景需要足够对比度。
- placeholder 不能替代 label。
- 错误、成功、选中状态不能只靠红绿等颜色区分，还需文字、图标或形状。
- hover 信息也应能通过 focus 或其他输入方式获取。

## 3. 用户偏好

```css
@media (prefers-reduced-motion: reduce) { /* reduce motion */ }
@media (prefers-color-scheme: dark) { /* dark theme */ }
@media (forced-colors: active) { /* system colors */ }
```

减少动画不是移除所有反馈；应保留必要状态变化，降低大幅移动、视差和闪烁。

## 4. 隐藏内容

- `display: none`、`visibility: hidden`：通常同时从视觉和 accessibility tree 隐藏。
- `opacity: 0`：仍可能被聚焦、点击和朗读。
- `aria-hidden="true"`：影响 accessibility tree，不负责视觉隐藏或阻止焦点。
- visually hidden class：把可访问文本移出视觉显示，但仍供读屏读取。

隐藏交互元素时必须同时管理 focus，避免键盘进入不可见内容。

## 5. 顺序

Flex `order`、row-reverse、Grid placement 可改变视觉顺序，但通常不改变 DOM reading/focus order。视觉顺序和 DOM 顺序不一致会让键盘与读屏用户迷失，应让 DOM 表达逻辑顺序。

## 6. 缩放与响应式

- 不禁用 viewport zoom。
- 使用可重排布局，支持放大文字。
- 避免固定高度裁剪多语言或大字号文本。
- touch target 留足尺寸和间距。
- 横屏、窄屏和 200% zoom 下仍能访问内容。

## Interview

### 如何只在视觉上隐藏文字？

使用经过验证的 visually-hidden pattern，将内容裁剪为极小区域但保留在 accessibility tree。不要用 display none；也不要只用 opacity 0，因为它仍占空间并可能接收交互。
