# 页面间通信

| 方案 | 范围 | 特点 |
| --- | --- | --- |
| BroadcastChannel | 通常同源/同分区上下文 | 多方频道广播，不发送给自身 |
| storage event | 共享 localStorage 的其他页面 | 简单但只传字符串，不在修改页触发 |
| Shared Worker | 可连接的同源上下文 | 共享运行实例和 MessagePort |
| postMessage | 持有引用的窗口/iframe | 可跨源，必须验证来源 |
| MessageChannel | 两个端口 | 点对点、可转移端口 |

跨窗口发送时指定精确 `targetOrigin`；接收时同时校验 `event.origin`、必要时校验 `event.source`，并用 schema 验证消息结构。`*` 只适用于 origin 无法稳定表达且数据不敏感的特殊情况。

`window.opener` 让新窗口引用打开者，也可能带来反向导航风险。外链常使用 `noopener`；跨源隔离策略也可能切断 opener 关系。

通信方案还受存储分区、浏览器生命周期和页面关闭影响。重要消息设计 request id、ack、超时和重连，不把“调用 postMessage 成功”当成对方已经处理。
