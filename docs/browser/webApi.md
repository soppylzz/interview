# 常用 Web API

JavaScript 语言定义语法和内建对象；fetch、DOM、URL、计时器等由浏览器宿主规范提供。学习 API 时应记录可用上下文、权限、安全上下文、生命周期、兼容和降级。

## 工具与取消

- AbortController 的 signal 可取消 fetch、支持 signal 的监听器及自定义异步任务；取消需向下游传播并释放资源。
- `URL` 负责可靠解析/拼接，`URLSearchParams` 管理查询参数，避免手写字符串。
- `structuredClone` 深复制可克隆类型和循环引用，也支持 transferable；函数和 DOM 节点不可克隆。
- FormData 组织表单字段与 Blob/File；由 fetch 自动设置 multipart boundary，不应手写错误 Content-Type。

## 文件与媒体

Blob 表示不可变字节数据，File 在 Blob 上增加名称和时间。FileReader 是事件式读取 API，现代 Blob 也提供 `text()`、`arrayBuffer()`、`stream()`。Object URL 引用本地 Blob，使用后调用 `URL.revokeObjectURL()`。

`matchMedia()` 查询并监听媒体条件，适合 JS 行为确需响应主题或视口能力时使用。`navigator.onLine` 只说明浏览器观察到某种网络连接，不能证明目标服务可达；真实操作仍需超时、错误和重试。

Clipboard、Fullscreen、Web Share 等常要求安全上下文、权限或短暂用户激活。Geolocation/Notification 必须处理拒绝、超时、不支持和权限变化，避免页面加载即骚扰式申请权限。
