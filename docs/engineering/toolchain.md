# Rollup、Rolldown、esbuild、SWC 与 Oxc

这些工具的能力存在重叠，比较时应明确是在谈 parser、transform、minifier、bundler 还是 lint。

| 工具 | 典型定位 |
| --- | --- |
| Rollup | ESM-first bundler，插件生态成熟，常用于库构建 |
| Rolldown | 原生实现的 bundler，强调 Rollup API/生态兼容 |
| esbuild | Go 实现的 parser、transform、minify 与 bundling 工具链 |
| SWC | Rust 实现的 JS/TS 编译与压缩基础设施 |
| Oxc | Rust 工具链，覆盖 parser、transform、lint、minify 等能力 |
| Babel | 高度可扩展的 JS compiler，转换和插件生态丰富 |

原生语言和并行架构常带来速度优势，但不能自动保证插件行为、source map、边缘语义和输出完全相同。Babel 适合依赖成熟插件或自定义语义转换的项目；新工具适合性能瓶颈明确且兼容性已验证的链路。

应用构建看重开发服务器、HMR、代码分割和资源处理；库构建更在意 external、多格式输出、声明文件与 package exports。选择工具还要评估框架集成、插件、诊断、缓存、维护状态和迁移成本，而不是只比较 benchmark。

工具职责会随版本快速变化。例如现代 Vite 与早期 Vite 的底层分工已经不同，面试回答应说明版本背景并描述稳定的构建原理。
