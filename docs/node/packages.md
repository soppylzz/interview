# 包与依赖解析

传统 bare specifier 会从当前模块所在目录向上查找 `node_modules`。实际解析还受包管理器链接布局、模块格式和 package exports 影响。

## package.json 字段

- `type` 决定包范围内 `.js` 的 ESM/CJS 解释。
- `main` 是传统主入口；`exports` 定义现代公开入口和条件。
- `imports` 定义本包内部的 `#` 映射。
- subpath exports 允许 `pkg/feature`，未导出的内部路径被封装。
- 包可用自身名称进行 self-reference，并遵守自己的 exports。

conditional exports 可区分 `import`、`require`、`node` 等条件。不要随意提供自定义 `browser` 条件而不验证工具支持；映射顺序和消费环境共同决定入口。

同一包若分别从 CJS 和 ESM 入口加载两套实现，可能形成不同单例和状态，即 dual package hazard。symlink 是否保留、Monorepo 链接和 pnpm 布局也可能让物理上相同代码获得不同模块身份。

`node:` 前缀明确引用内置模块，避免与同名第三方包混淆。解析问题应记录 specifier、importer、命中条件、真实路径和缓存身份。
