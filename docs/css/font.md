# 字体与 Web Font

> 字体渲染不仅由 font-family 决定，还涉及字体匹配、字形覆盖、字体度量、加载时机和 fallback。

## 1. 字体匹配

```css
body {
  font-family: Inter, "Noto Sans SC", system-ui, sans-serif;
}
```

浏览器按 family 列表和 style、weight、stretch 匹配字体。单个字体不含某字符 glyph 时可回退到列表中的其他字体，所以同一行可能混用多个字体。

请求 600 weight 而字体只提供 400/700 时，浏览器按匹配规则选近似 face，也可能合成粗体/斜体。可用 `font-synthesis` 控制合成。

## 2. @font-face

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

每条 @font-face 描述一个 face 或 variable range。WOFF2 通常适合现代 Web；字体 subset 和 unicode-range 可避免下载无关字形。

## 3. font-display

- auto：浏览器默认策略。
- block：短期隐藏文本等待字体，之后可 fallback。
- swap：立即 fallback，字体到达后交换。
- fallback：极短 block，有限交换期。
- optional：极短 block，浏览器可决定本次不下载/不交换。

FOIT 是等待字体时文字不可见；FOUT 是先显示 fallback 后交换。选择取决于品牌字体重要性、连接条件和布局稳定性。

## 4. 布局位移

fallback 与 Web Font 的 glyph width、ascent、descent 不同，交换时会换行或改变 box 高度。

可使用：

- 选择度量接近的 fallback。
- `size-adjust` 调整 fallback glyph 尺度。
- `ascent-override`、`descent-override`、`line-gap-override` 对齐度量。
- preload 真正关键且确定会使用的字体。

## 5. 可变字体

Variable font 在一个文件中提供 weight、width 等 axis，可能减少请求并支持连续值，但包含大量不用 glyph/axis 时文件仍可能很大，需要 subset 和实测。

## 6. 可访问性

- 正文使用足够字号和 line-height。
- 不阻止浏览器缩放。
- 无单位 line-height 更适合后代字号变化。
- 不把 icon font 的私有字符当作必须朗读的文本。
- 系统字体栈可减少加载和交换问题。

## Interview

### preload 所有字体会更快吗？

不会。Preload 提高优先级并抢占带宽，错误的 family、weight、subset 或未使用字体会延迟更关键资源。只预加载首屏确定需要的字体文件。
