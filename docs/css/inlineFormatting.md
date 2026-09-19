# 行内格式化与文本溢出

> Inline formatting context 把文字和 inline-level box 排入 line box。理解 line-height、baseline 和 glyph metrics 才能解释常见的垂直对齐问题。

## 1. Line Box

Inline content 被分成若干 line box。每行高度由该行 inline box、strut、字体度量、line-height 和 vertical-align 共同决定，不是简单等于最大元素 height。

`line-height` 与 font-size 的差值称为 leading，通常分配到文字上方和下方。字体 glyph 可以超出 em box，视觉中心也不等于数学中心。

## 2. line-height 继承

```css
.a { line-height: 1.5; }   /* child uses 1.5 × its own font-size */
.b { line-height: 150%; }  /* percentage computes against parent's font-size first */
.c { line-height: 24px; }  /* child inherits fixed computed length */
```

正文通常推荐无单位值，使后代根据自身字号计算行高。

## 3. Baseline 与 vertical-align

inline-level box 默认按 baseline 对齐。`vertical-align` 只适用于 inline-level、inline-block 和 table-cell 等场景，不用于普通 block 的通用垂直居中。

- baseline：与父 baseline 对齐。
- middle：元素中点与父 baseline 加 x-height 一半的位置对齐，不是容器几何中心。
- top/bottom：与 line box 顶/底对齐。
- length/percentage：相对 baseline 位移。

## 4. 图片底部空隙

`img` 是 inline replaced element，默认 baseline 对齐。line box 需要为字体 descender 留空间，因此图片底部会出现间隙。

可按需求：

```css
img { display: block; }
/* or */
img { vertical-align: middle; }
```

把父 line-height 设为 0 也可能消除，但会影响父内其他文字，不应机械使用。

## 5. 文本溢出

单行：

```css
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

多行常用 line clamp：

```css
.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

省略只是视觉处理，完整内容是否可访问需根据交互补充。

## 6. 换行

- `white-space`：控制空白折叠和自动换行。
- `overflow-wrap: anywhere`：必要时可在任意点断行，避免溢出。
- `word-break`：控制单词/字符内部断行规则，受语言影响。
- `hyphens`：允许按语言词典断词并显示连字符。

## Interview

### line-height 能实现单行文字垂直居中吗？

把 line-height 设为容器高度可让单行文本的 line box 占满容器，视觉上常接近居中；它不适合多行，也受字体度量影响。通用布局应使用 Flex/Grid。
