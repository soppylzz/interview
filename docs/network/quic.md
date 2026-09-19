# QUIC 进阶

> QUIC 在 UDP 之上集成可靠传输、拥塞控制、TLS 1.3 和多路复用。HTTP/3 使用 QUIC，但 QUIC 本身是通用传输协议。

## 1. 核心对象

- Packet：QUIC 在线路上传输和确认的基本单位。
- Frame：packet 内的协议信息，例如 STREAM、ACK、CRYPTO。
- Stream：连接内独立、有序的字节流。
- Connection ID：标识 QUIC connection，不完全依赖 IP/port 四元组。

一个 UDP datagram 可以承载一个或多个 QUIC packet，一个 packet 又包含多个 frame。QUIC 的 ACK 确认 packet，不是直接确认 UDP datagram。

## 2. Stream

QUIC 提供单向或双向 stream。每个 stream 内保持顺序，但不同 stream 不需要等待彼此缺失的数据。

若 stream A 的数据丢失，A 需要等待重传；stream B 已完整到达的数据仍可交付应用。这消除了 TCP 单一字节流导致的跨 HTTP stream 队头阻塞。

所有 stream 仍共享连接路径和拥塞控制，因此网络拥塞会影响整条连接的可发送速率。

## 3. Connection ID 与迁移

TCP 连接由地址和端口标识，Wi-Fi 切换到移动网络后四元组变化，连接通常中断。QUIC 用 connection ID 让端点在地址改变后识别原连接，并通过 path validation 验证新路径。

连接迁移并非无条件成功：NAT、防火墙、服务端策略和 connection ID 管理都可能影响结果。

## 4. Loss Recovery

QUIC 自己维护 packet number、ACK range、RTT 估计和重传。丢失的数据通过新的 packet 重发，旧 packet number 不会原样复用，这使确认和加密 nonce 管理更清晰。

QUIC 不要求某一种固定拥塞算法，常复用 TCP 领域的 CUBIC、BBR 等思想。基于 UDP 不表示可以绕过拥塞控制。

## 5. TLS 1.3 集成

QUIC 把 TLS 1.3 handshake message 放进 CRYPTO frame。传输参数和加密级别与连接建立协作，减少 TCP handshake 后再进行 TLS handshake 的串行过程。

QUIC 的 packet header 和 frame 根据阶段受到不同程度保护，TLS 负责密钥协商和认证，但 QUIC 自己定义如何用这些密钥保护 packet。

## 6. 0-RTT

客户端使用先前会话信息可以在首次 flight 携带 early data。0-RTT 数据具有重放风险：攻击者可能复制 early packet，让服务端重复处理。

因此应用必须：

- 只允许安全、幂等或带业务防重放机制的操作。
- 不把握手完成前的数据等同于普通新鲜连接数据。
- 在服务端拒绝 0-RTT 时允许客户端重新发送。

## 7. 部署

QUIC 在用户态实现，升级快于操作系统 TCP，但也有代价：

- UDP 可能被部分网络限制，客户端需回退 HTTP/2。
- 加密让中间设备难以按传统 TCP 方式观察。
- 用户态加密和 packet 处理需要优化 CPU 使用。
- 负载均衡必须理解或稳定路由 connection ID。

## Interview

### QUIC 是否没有队头阻塞？

单个 stream 内仍有有序交付，丢包会阻塞该 stream。QUIC 避免的是一个 stream 丢包阻塞其他独立 stream，不是消除所有队头阻塞。

### QUIC 为什么能连接迁移？

它使用 connection ID 识别连接，而不是只依赖 IP 和端口。网络变化后，双方可验证新路径并继续使用原连接状态。
