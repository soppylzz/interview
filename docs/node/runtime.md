# Node.js 运行时架构

Node.js 把 V8 的 JavaScript 执行能力、libuv 的事件循环和异步 I/O，以及文件、网络等核心模块组合成服务端运行时。

“Node.js 是单线程的”通常指一个 isolate 中的 JavaScript 默认在一条主线程执行。进程内部还可能有 V8 辅助线程、libuv worker pool，以及应用创建的 Worker Thread。

## I/O 与线程池

网络 socket 通常由操作系统的非阻塞通知机制驱动，不为每个连接占一个线程池线程。文件系统、`dns.lookup`、部分 crypto 和 zlib 操作可能进入 libuv worker pool，完成后再把 callback 排回事件循环。

`UV_THREADPOOL_SIZE` 只影响使用该池的任务。盲目增大会增加竞争和内存，也不能加速网络 I/O或主线程上的 JavaScript。

## 适用边界

Node 适合大量等待 I/O 的并发任务，因为等待期间主线程可处理其他回调。长时间 CPU 计算会占住主线程，使所有连接的回调、timer 和序列化一起延迟，应拆分、下放 Worker/进程或改用专用服务。

同步文件、加密和子进程 API 会直接阻塞主线程，适合启动脚本或一次性 CLI；请求处理路径应优先异步 API。判断瓶颈时同时观察 event loop delay、CPU profile 和线程池任务，而不是把所有延迟都归因于“单线程”。
