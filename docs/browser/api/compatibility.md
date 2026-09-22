# 浏览器兼容与特性检测

特性检测直接判断当前环境是否支持所需能力，比根据 UA 推测浏览器版本更可靠：

```js
if ('IntersectionObserver' in window) {
  enableVisibilityTracking()
} else {
  enableScrollFallback()
}
```

CSS 可用 `@supports` 或 `CSS.supports()` 检测属性和值。检测 API 存在还不一定代表所有选项和行为可用，复杂能力应检查最小所需子特性并实际处理失败。

- polyfill 修改/补充全局 API。
- ponyfill 提供可导入函数，不修改全局。
- transpile 把新语法转换为目标环境可解析的语法。

语法转换不会自动提供运行时 API，polyfill 也不能让旧 parser 读懂新语法。

渐进增强从可用的基础功能开始，为支持环境添加体验；优雅降级从完整能力出发，为缺失能力准备退路。关键业务路径应优先保证基础可用。

Browserslist 声明目标环境，Babel 据此转换 JavaScript，Autoprefixer 根据目标处理 CSS 前缀。浏览器前缀来自实验实现和兼容历史，手工猜测容易漏掉语法差异，应由维护中的工具生成并结合真实设备测试。

UA 检测只在服务端内容协商或确定的浏览器缺陷规避等少数场景使用，并准备 UA 冻结、伪装和新版本出现时的默认行为。
