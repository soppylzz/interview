# TCP 进阶

> TCP 通过滑动窗口、重传和拥塞控制，在不可靠 IP 网络之上提供可靠有序字节流。

## 1. MTU 与 MSS

- MTU：一条链路可承载的最大 IP packet 大小，Ethernet 常见值为 1500 bytes，但路径可能不同。
- MSS：TCP segment 中最大 payload 大小，不包含 IP 和 TCP header。

握手时双方通告各自可接收的 MSS。典型 IPv4/TCP 在 1500 MTU 下得到 1460 MSS，但 IP/TCP option 会改变实际值。

若 IP packet 大于路径 MTU：

- IPv4 可能分片，或在设置 Don't Fragment 时返回 ICMP 提示。
- IPv6 路由器不进行中途分片，由发送端根据 Path MTU 调整。

分片中任意一片丢失都会使整个原始 packet 无法重组，因此通常希望传输层避免产生 IP 分片。

## 2. 流量控制

接收方通过 advertised receive window 告知还能接收多少数据。发送方未确认数据量不能无限超过窗口，避免接收 buffer 被压垮。

窗口为零时，发送方暂停普通数据并周期性探测，等待接收方重新开放窗口。

## 3. 拥塞控制

发送方实际可发送量同时受接收窗口 rwnd 和拥塞窗口 cwnd 限制：

```text
send window = min(rwnd, cwnd)
```

经典机制：

- Slow Start：连接开始时快速扩大 cwnd，探测可用容量。
- Congestion Avoidance：接近阈值后更谨慎增加窗口。
- Fast Retransmit：收到多个重复 ACK 时，不等待 RTO 就重传疑似丢失 segment。
- Fast Recovery：丢包后降低速率，但避免总是完全回到初始状态。

现代操作系统可能使用 CUBIC、BBR 等不同算法，面试重点是拥塞信号如何限制发送，而不是背具体常数。

## 4. RTT 与 RTO

RTT 是报文往返时间。RTO 是判断确认等待过久并触发超时重传的时间。RTO 应根据平滑 RTT 和波动动态估算：过短会误重传，过长会让真实丢包恢复太慢。

TCP 也可通过 SACK 告知已收到的不连续区间，让发送方更精确地只重传缺失数据。

## 5. Nagle 与 Delayed ACK

Nagle 算法在存在未确认小数据时倾向于缓冲后续小数据，减少 tiny packet。Delayed ACK 允许接收方稍等，以便合并确认或随反向数据捎带 ACK。

二者叠加在小请求—小响应场景中可能增加延迟。`TCP_NODELAY` 可禁用 Nagle，但不应在不了解消息模式时机械开启；聚合应用写入通常比发送大量小包更有效。

## 6. 连接队列

服务端监听连接时常涉及：

- SYN backlog：保存尚未完成握手的连接状态。
- accept queue：保存已完成握手、等待应用 accept 的连接。

应用 accept 太慢、队列过小或遭遇大量连接时可能溢出。不同操作系统的队列语义和参数名称存在差异，排查需结合平台。

## 7. Half-close 与 RST

TCP 两个方向可以独立关闭。发送 FIN 后，本端不再发送普通数据，但仍可接收对方数据，称为 half-close。

RST 表示连接被立即重置，常见原因包括：

- 连接到未监听端口。
- 应用异常关闭带未读数据的 socket。
- 中间设备主动终止连接。
- 向已不存在的连接发送数据。

FIN 是有序关闭，RST 是异常或立即终止，应用观察到的错误不同。

## 8. TCP Keepalive

操作系统可在连接长时间空闲后发送 keepalive probe，探测对端或路径是否仍存在。它的默认空闲时间通常较长，且只能证明传输端点状态，不能证明应用逻辑健康。

需要快速检测业务失活时，通常还要应用层 heartbeat 和明确超时。

## Interview

### MSS 与 MTU 有什么关系？

MTU 限制链路中的 IP packet 大小，MSS 限制 TCP payload。MSS 通常根据可用 MTU 减去 IP、TCP header 得出，目标是减少 IP 分片。

### 流量控制与拥塞控制有什么区别？

流量控制根据接收端 buffer 能力防止压垮对端；拥塞控制根据网络路径状态防止发送过快造成网络拥塞。实际发送窗口受二者共同限制。
