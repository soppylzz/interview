# V8 内存与垃圾回收

调用栈保存执行帧和部分局部值，V8 heap 保存 JavaScript 对象；Buffer 等可能把主要字节放在 external memory。rss 是进程占用的驻留内存，还包括 V8、原生代码、线程栈和映射页。

## 指标

- `heapUsed`：当前 JS heap 已使用量。
- `heapTotal`：V8 已申请的 heap 空间。
- `external`：绑定到 JS 对象的外部内存。
- `rss`：操作系统观察到的进程驻留内存。

V8 基于对象通常朝生夕灭的假设做分代回收。新生代 minor GC 较频繁；存活对象晋升老生代，major GC 扫描范围和停顿影响通常更大。具体算法包含并行、增量和并发阶段，不能简单等同于一次完整 stop-the-world。

`--max-old-space-size` 提高老生代上限，只会推迟内存耗尽并改变 GC 行为，不能修复仍被引用的泄漏。

定位泄漏时在相同稳定负载下获取多份 heap snapshot，比较持续增长对象并沿 retaining path 找根引用；allocation profile 用于找高频分配位置。若 heap 稳定而 rss/external 增长，应检查 Buffer、native addon 和碎片。无界缓存、大对象与频繁短命分配分别需要容量限制、流式处理和减少分配。
