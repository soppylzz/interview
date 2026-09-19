# 浏览器内存与泄漏

垃圾回收依据可达性：只要对象仍能从 root 经引用链到达，就不能回收。全局集合、闭包、timer、监听器和缓存常意外延长页面对象生命周期。

detached DOM tree 已不在文档中，却被 JavaScript 引用保留。组件卸载时应移除外部监听、取消 timer/请求/订阅，disconnect Observer，terminate Worker，并 revoke 不再使用的 Object URL。

## 如何判断泄漏

正常页面内存会随操作上升、GC 后下降，形成锯齿；短期峰值可能来自大响应或渲染；重复同一路径后 GC 基线持续增长才更像泄漏。

Heap Snapshot 查看某时刻对象及 retaining path；Comparison 对比操作前后对象增长；Allocation Timeline 找分配发生位置和仍存活对象。测试应重复固定操作并主动回到稳定状态，减少噪声。

WeakMap/WeakSet 不会因键的存在阻止对象回收，适合给外部对象附加元数据，但不能替代必要的事件和资源清理。泄漏最终会增加 GC 频率和停顿，引起卡顿，并可能触发标签页崩溃或被系统回收。
