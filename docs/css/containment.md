# CSS Containment 与容器查询

> CSS containment 声明子树在尺寸、布局、样式或绘制上的独立性；container query 让组件根据容器而不是 viewport 应用样式。

它与 containing block 是不同概念。某些 containment 值会额外创建 containing block、BFC 或 stacking context，但不能因此混为一谈。

## 1. contain

- size：元素尺寸不依赖其内容，开发者需提供尺寸或 intrinsic size。
- inline-size：在 inline axis 提供尺寸 containment。
- layout：内部布局不影响外部，外部布局也不直接影响内部。
- paint：后代绘制被裁剪在 border box，并形成独立绘制范围。
- style：计数器、quote 等效果不越过边界；它不是通用样式隔离。
- content：layout + paint + style。
- strict：size + layout + paint + style。

错误添加 size containment 可能让 auto size 塌为零，因此 contain 是正确性承诺，不只是性能开关。

## 2. content-visibility

`content-visibility: auto` 允许浏览器跳过离屏子树的 layout/paint，在接近 viewport 时再处理。

```css
.section {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

intrinsic size 为跳过状态提供估计，`auto` 可在渲染后记住实际尺寸。该属性适合相对独立的长页面区段，不应用于必须立即测量或依赖精确滚动定位而未测试的内容。

## 3. Size Container Query

```css
.host {
  container: card / inline-size;
}

@container card (width >= 32rem) {
  .card {
    grid-template-columns: 12rem 1fr;
  }
}
```

`container-type: inline-size` 创建可查询 inline size 的容器，并带来相应 containment。未写名称时，查询选择满足条件的最近祖先 query container。

## 4. Container Units

- cqw/cqh：query container 宽/高的 1%。
- cqi/cqb：inline/block size 的 1%。
- cqmin/cqmax：对应较小/较大维度。

逻辑单位 cqi/cqb 更适合不同 writing mode。

## 5. Style Query

Style query 使用 `style()` 查询 container 的 computed style。当前实际开发应先检查目标环境支持范围；自定义属性是最常见的可用场景：

```css
@container style(--variant: featured) {
  .card { border-color: gold; }
}
```

## Interview

### Container query 会替代 media query 吗？

不会。Container query 适合组件根据局部空间变化；media query 还能查询 viewport、输入能力、颜色方案和减少动画等设备或用户偏好。
