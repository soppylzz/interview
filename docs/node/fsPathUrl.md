# 文件系统、路径与 URL

fs 提供同步、callback 和 Promise API。同步 API 简单但阻塞事件循环，适合启动或 CLI；服务器请求路径用异步 API。小文件可整体读取，大文件应使用 stream，避免文件大小直接成为峰值内存。

## 路径语义

`path.join` 拼接并规范化片段；`path.resolve` 从右向左构造绝对路径，遇到绝对片段即停止。`process.cwd()` 是进程启动/后来切换的工作目录；模块目录来自 `__dirname` 或 ESM 的 `import.meta.dirname`，二者不一定相同。

Windows 的盘符、反斜杠和 UNC 路径与 POSIX 不同。处理 ESM 资源时用 `pathToFileURL`、`fileURLToPath` 转换，避免手工剥离 `file://`。

## 文件生命周期

打开文件取得 descriptor，所有成功路径和失败路径最终都要关闭，优先使用能自动管理生命周期的高级 API。并发写同一文件可能交错或相互覆盖，需要单写者、锁、临时文件加原子 rename 等协议。

watch 的事件种类、文件名、递归能力和 rename 行为存在平台差异。开发工具需去抖并准备轮询或重新扫描，而不能把一次事件等同于一次准确修改。
