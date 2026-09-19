# 监控 SDK 设计

SDK 可分 core、instrumentation plugin、processor、queue、transport。插件独立启停，避免所有采集器耦合发布。

patch fetch/XHR/history/console 时保存原函数、保证只 patch 一次、保持 this/descriptor/返回值，并支持卸载。页面多个 SDK 实例用全局 registry 协调，避免重复监听。

队列有事件数、单条和总字节上限；拥塞时优先保留错误，丢弃 debug/重复事件。所有内部路径 try/catch，不能让 SDK 异常影响业务。

SDK 记录自己的版本、初始化失败、丢弃原因和 transport 状态。远程配置需签名/权限、缓存和安全默认值，不能成为任意代码执行通道。
