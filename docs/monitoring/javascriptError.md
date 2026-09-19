# JavaScript 异常采集

`window.onerror` 可获得部分 message/source/line/column/error；Window 的 error 事件还能在捕获阶段观察资源失败，需要区分 `event.error` 与元素 target。`unhandledrejection` 捕获当期未处理的 Promise rejection。

框架 error boundary/hook 能提供组件栈和恢复 UI，但不能替代全局采集。try/catch 只能捕获当前同步调用或 await 的 rejection。

事件记录 Error.name/message/stack/cause、route、release 和 breadcrumb。跨源脚本若缺少合适 CORS，错误详情可能被限制为 Script error；资源和 script 的 crossorigin/响应头需配合。

同一错误可能被框架、全局和手工 capture 多次，SDK 用事件 id/fingerprint/时间窗口去重，并避免捕获自身上报错误形成递归。
