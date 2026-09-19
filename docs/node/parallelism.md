# Worker Threads、Child Process 与 Cluster

| 方案 | 隔离 | 典型用途 |
| --- | --- | --- |
| Worker Thread | 同进程、独立 isolate，可共享内存 | CPU 密集 JavaScript |
| child_process | 独立进程和内存 | 调外部命令、强隔离任务 |
| cluster | 多 Node 进程共享服务端口 | 单机利用多核的旧有/特定部署模式 |

Worker 创建和初始化有成本，短任务应进入复用的 worker pool。普通消息使用 structured clone；ArrayBuffer 可 transfer 所有权以避免复制；SharedArrayBuffer 可共享但需要 Atomics 和严格同步。

`spawn` 流式处理输出；`exec` 通过 shell 执行并把输出缓存在内存，既有上限也有注入风险；`execFile` 直接执行文件；`fork` 专门启动 Node 子进程并建立 IPC。大量持续输出应使用 spawn 的 stdout/stderr 管道。

IPC 适合结构化控制消息，管道适合字节流。所有任务都要定义超时、AbortSignal、退出码检查、意外退出重建和最大重试。

现代容器环境常直接运行多个单进程副本，由编排器负载均衡和重启。cluster 并非实现水平扩展的必需条件，应根据部署平台选型。
