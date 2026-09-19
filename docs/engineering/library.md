# Library 构建与发布

应用产物面向一次部署，通常可打入依赖；库产物要被多种环境消费，通常 external 掉 peer dependency，并仔细设计格式、兼容目标和公开入口。

## 包入口

优先用 `exports` 声明主入口、子路径和 `import/require` 等条件。`types` 或条件中的类型入口要与每个 JavaScript 入口对应；`typesVersions` 主要用于兼容旧 TypeScript 解析。declaration map 可把类型跳转指回源码。

ESM-only 最简单，适合现代生态；双格式包兼容面更广，但同一逻辑被 ESM 与 CJS 分别加载时可能产生两份单例，即 dual package hazard。设计共享状态时必须测试真实加载组合。

## 资源与优化

CSS、图片和 WASM 可内联、复制并导出 URL，或要求消费方处理。选择应写进包契约。准确的 `sideEffects` 能帮助消费者裁剪代码，同时要保留样式和注册型入口。

## 发布验证

1. 用 `npm pack --dry-run` 检查 tarball。
2. 在临时项目安装 tarball，而不是直接链接源码。
3. 分别验证 Node ESM/CJS、主流 bundler 和 TypeScript 类型解析。
4. 检查所有公开子路径、CSS 和声明文件。

发布失败往往来自清单与实际文件不一致，而不是编译本身。
