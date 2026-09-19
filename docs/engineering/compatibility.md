# 浏览器兼容与 Polyfill

兼容问题应分为三层：Babel 等工具转换 JavaScript 语法，polyfill 提供缺失的运行时 API，PostCSS/Autoprefixer 等处理 CSS 兼容。Browserslist 可让这些工具共享目标环境，但各工具支持的特性范围仍不同。

## Transform 与 Polyfill

把箭头函数变成普通函数属于 transform；为环境添加 `Promise`、`Array.prototype.at` 等能力属于 polyfill。core-js 可按入口整体引入，或根据源码用法和 targets 注入。usage-based 体积较小，但动态调用、第三方代码和检测代码可能需要人工验证。

feature detection 直接判断能力是否存在，比根据 UA 猜测浏览器行为更稳健。只有服务端必须在返回前选择产物时，才可能需要结合 Client Hints 或经过维护的 UA 策略。

## 产物策略

differential serving 为现代和旧环境生成不同产物，可减小现代浏览器负担，但增加构建、缓存和测试矩阵。是否采用应由用户环境和收益决定。

`node_modules` 并不保证已符合项目 targets。依赖发布了新语法、错误入口或未经转换的 TS 时，可能需要纳入 transpile。先定位实际报错文件和目标环境，再扩大转换范围，以免显著拖慢构建。
