# 包管理器与依赖布局

npm、Yarn 和 pnpm 都根据清单与锁文件求解依赖图，但磁盘布局和严格程度不同。传统扁平化安装会尽量 hoist 依赖，源码可能意外访问未声明包，形成“幽灵依赖”。

pnpm 使用 content-addressable store 复用包内容，再通过链接构建项目依赖结构。这节省磁盘，并让可访问依赖更接近清单声明；工具若错误依赖真实路径布局，仍可能出现兼容问题。

## 版本约束

peer dependency 表示插件等包要与消费方共享某个宿主实例。两个依赖要求互不相容的 peer 范围时就会冲突。应先升级或统一依赖，`overrides/resolutions` 适合临时强制传递版本，但必须回归验证。

workspace 管理同仓库包，本地链接和 `workspace:` 协议可防止意外解析到注册表旧版本。CI 使用 frozen lockfile，确保清单与锁文件不一致时直接失败。

## 供应链

保护锁文件评审，固定 CI 工具版本，审查安装脚本与包来源，避免复制来历不明的 lockfile 变更。怀疑投毒时检查包名、解析版本、integrity、发布者和 tarball 内容，而不只看顶层 `package.json`。
