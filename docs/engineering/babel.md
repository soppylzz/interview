# Babel

Babel 是可组合的 JavaScript compiler，核心流程为 parse、transform、generate。它能转换语法和注入辅助代码，但不会自动完成类型检查，也不能保证目标环境拥有所用 Web API。

## 核心包与配置

- `@babel/parser` 生成 AST，traverse 遍历 NodePath，types 创建和校验节点，generator 输出代码。
- syntax plugin 只让 parser 接受语法；transform plugin 会改写 AST。
- preset 是一组 plugin 与配置。plugin 通常按声明顺序运行，preset 通常逆序展开，顺序可能改变输入输出关系。
- `preset-env` 根据 targets/Browserslist 选择转换，而不是机械地转换所有新语法。

## Polyfill 和辅助函数

`useBuiltIns` 配合 core-js 可按入口或使用情况注入全局 polyfill。`transform-runtime` 主要复用 Babel helper，并可使用不污染全局的 runtime 实现；二者解决的问题不完全相同。

Babel 的 TypeScript preset 只移除类型语法。项目仍要独立运行类型检查。`loose` 或 assumptions 可能得到更小产物，但某些边缘语义与规范实现不同，应由兼容目标和测试决定。

## 配置与缓存

根配置适合整个仓库，文件相对配置会受目录和 package 边界影响。Monorepo 中应明确 root、overrides 和忽略规则。缓存 key 至少要覆盖源码、Babel 配置、targets、插件版本、环境变量与 Node 版本。

遇到转换异常时输出实际加载的配置和单个文件转换结果，再检查插件顺序；只观察最终 bundle 很难定位是哪一阶段引入变化。
