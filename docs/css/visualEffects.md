# 颜色、背景与绘制效果

> 视觉效果可能创建额外 stacking context、离屏缓冲或较大 paint area。先保证语义与可读性，再评估渲染成本。

## 1. Opacity 与 Alpha Color

```css
.a { opacity: 0.5; }
.b { background: rgb(0 0 0 / 0.5); }
```

opacity 把元素及全部后代作为整体应用透明度，并在小于 1 时创建 stacking context。Alpha background 只让该背景颜色透明，不让文字和子元素一起变淡。

## 2. Background

可用逗号声明多层背景，第一层绘制在最上方。每层可单独设置 image、position、size、repeat、origin、clip。

- cover：保持比例覆盖区域，可能裁剪。
- contain：保持比例完整显示，可能留空。
- gradient 是生成的 image，可参与多背景。

`background-attachment: fixed`、超大渐变和大量背景层在移动端可能有较高绘制成本，需要测量。

## 3. Shadow

- `box-shadow` 基于元素 box 轮廓，可有 inset 和 spread。
- `filter: drop-shadow()` 基于输入图像 alpha mask，适合透明 PNG/SVG 形状，不支持 box-shadow 相同的 spread/inset 模型。

大范围 blur shadow 会扩大需要计算和绘制的区域。

## 4. Filter 与 Backdrop Filter

`filter` 处理元素及其渲染结果；`backdrop-filter` 处理元素背后的已绘制内容，通常还需要半透明背景才能看到效果。

它们可能需要离屏渲染并创建 stacking context。大面积实时 blur 成本高，滚动页面尤其需要实测。

## 5. Blend Mode

`mix-blend-mode` 控制元素与背后内容混合，并会创建 stacking context。`background-blend-mode` 只混合元素自身多层背景。

`isolation: isolate` 可建立新的 stacking context，限制后代 blend 与外部背景混合。

## 6. currentColor

`currentColor` 取元素 color 的 computed value，可让 border、icon、shadow 跟随文本颜色：

```css
.icon {
  fill: currentColor;
  border-color: currentColor;
}
```

它适合主题和交互状态，减少重复 color token。

## Interview

### opacity 0 与透明背景一样吗？

不一样。opacity 作用于元素及后代的整体合成结果，并创建 stacking context；透明背景只影响背景层，内容仍正常显示。
