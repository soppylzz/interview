# Network 学习清单

> 用于筛选前端面试中的网络高频知识点。重点理解一次请求经过的协议层、HTTP 语义和不同协议版本解决的问题，不要求背诵协议报文的每个字段。

## 现有文件

- `base.md`：当前为空，可以在确定学习范围后作为网络基础知识汇总或索引。
- `pro.md`：当前为空，可以在确定学习范围后作为进阶协议汇总或索引。

下面按主题给出建议文件名。最终可以分别建文件，也可以合并到 `base.md`、`pro.md`。

## 内容边界

- 从输入 URL 到页面渲染的浏览器流程放在 `docs/browser/api/navigation.md`，本目录只展开其中的网络阶段。
- HTTP 缓存、CORS、Cookie 和浏览器存储放在 `docs/browser`。
- XSS、CSRF、CSP、中间人攻击等攻防内容放在独立的 Security 笔记；本目录只解释 HTTPS 建立安全连接的机制。
- Web Vitals、资源加载优化等内容放在独立的 Perf 笔记；本目录保留连接复用、压缩等协议本身的行为。

## P0：建议优先学习

### 1. 网络分层模型 `networkModel.md`

- [ ] OSI 七层与 TCP/IP 模型如何对应
- [ ] 应用层、传输层、网络层和链路层分别解决什么问题
- [ ] HTTP、TLS、TCP、UDP、IP、DNS 分别位于哪一层
- [ ] 数据在发送过程中如何封装，在接收过程中如何解封装
- [ ] IP 地址定位主机、端口定位进程的基本含义
- [ ] socket 是什么，它与 IP、端口、TCP 连接有什么关系
- [ ] 一次 HTTP 请求在各层使用了哪些标识和协议

### 2. HTTP 基础与报文 `http.md`

- [ ] HTTP 的请求、响应和无状态分别表示什么
- [ ] URL、URI、URN 的关系，URL 各部分的含义
- [ ] HTTP/1.1 请求行、状态行、首部和消息体的结构
- [ ] GET、HEAD、POST、PUT、PATCH、DELETE、OPTIONS 的语义
- [ ] safe 与 idempotent 的含义，常见方法是否安全、幂等
- [ ] GET 与 POST 的区别应从语义解释，避免把浏览器实现限制当作协议规则
- [ ] 常见状态码：200、201、204、206、301、302、303、304、307、308、400、401、403、404、405、409、429、500、502、503、504
- [ ] 301、302、303、307、308 在重定向时如何处理请求方法和请求体
- [ ] `Host`、`Content-Type`、`Accept`、`Authorization`、`Referer`、`User-Agent` 等常见首部
- [ ] HTTP 为什么通常被称为无状态协议，如何在应用层维护会话状态

### 3. TCP 与 UDP `transport.md`

- [ ] TCP 与 UDP 在连接、可靠性、顺序、拥塞控制、报文边界和开销上的区别
- [ ] TCP 三次握手的过程，每一步交换了什么状态
- [ ] 为什么建立 TCP 连接通常需要三次握手，而不是两次或四次
- [ ] TCP 四次挥手的过程，为什么关闭连接通常需要四次
- [ ] `TIME_WAIT` 为什么存在，连接过多时可能带来什么影响
- [ ] TCP 如何通过序列号、确认应答、校验和、超时重传保证可靠传输
- [ ] 滑动窗口与流量控制解决什么问题
- [ ] 拥塞控制与流量控制的区别
- [ ] TCP 粘包为什么产生，应用层如何划分消息边界
- [ ] 哪些场景更适合 UDP

### 4. DNS `dns.md`

- [ ] DNS 解决什么问题，域名的层级结构
- [ ] 浏览器、操作系统、本地网络和递归解析器中的 DNS 缓存
- [ ] 递归查询与迭代查询的区别
- [ ] 根域名服务器、顶级域名服务器、权威域名服务器和递归解析器的职责
- [ ] A、AAAA、CNAME、NS、MX、TXT、PTR 记录的用途
- [ ] TTL 如何影响缓存和域名切换
- [ ] 一个域名配置多个 IP 的作用
- [ ] DNS 查询通常为什么使用 UDP，什么时候会使用 TCP
- [ ] DNS 解析失败、超时和缓存未更新时如何排查

### 5. HTTPS 与 TLS `tls.md`

- [ ] HTTP 与 HTTPS 的关系，TLS 位于应用层与传输层之间意味着什么
- [ ] 对称加密、非对称加密、摘要和数字签名分别解决什么问题
- [ ] CA、数字证书和证书链如何建立对域名身份的信任
- [ ] 客户端验证证书时会检查哪些信息
- [ ] TLS 握手如何协商版本、密码套件和会话密钥
- [ ] 为什么握手阶段结合非对称密码，数据传输阶段主要使用对称密码
- [ ] TLS 1.2 与 TLS 1.3 握手轮次和密钥交换的主要区别
- [ ] SNI 与 ALPN 分别解决什么问题
- [ ] 会话恢复和 0-RTT 的基本作用及使用限制
- [ ] HTTPS 能提供机密性、完整性和身份认证，但不能解决哪些应用层问题

### 6. HTTP 版本演进 `httpVersions.md`

- [ ] HTTP/1.0、HTTP/1.1、HTTP/2、HTTP/3 分别解决了什么问题
- [ ] HTTP/1.1 持久连接的作用，和 TCP keepalive 是否是同一概念
- [ ] HTTP/1.1 管线化为什么没有得到广泛使用
- [ ] HTTP/1.1 队头阻塞是如何产生的
- [ ] HTTP/2 的二进制分帧、流、消息和连接是什么关系
- [ ] HTTP/2 多路复用、流优先级、服务器推送和 HPACK 的作用
- [ ] HTTP/2 为什么仍会受到 TCP 层队头阻塞影响
- [ ] HTTP/3、QUIC 和 UDP 的关系
- [ ] QUIC 如何通过独立流、连接迁移和集成 TLS 改善连接体验
- [ ] QPACK 为什么不能直接复用 HPACK 的动态表同步方式

## P1：高频补充

### 7. HTTP 消息体与内容协商 `httpTransfer.md`

- [ ] `Content-Length` 如何确定消息体边界
- [ ] `Transfer-Encoding: chunked` 的用途，以及与 `Content-Length` 的关系
- [ ] `Content-Type` 与 `Content-Encoding` 的区别
- [ ] gzip、Brotli 等内容编码如何通过 `Accept-Encoding` 协商
- [ ] `Accept`、`Accept-Language` 如何参与服务端内容协商
- [ ] multipart/form-data、application/x-www-form-urlencoded、application/json 的结构和使用场景
- [ ] Range 请求、`206 Partial Content`、`Content-Range` 的用途
- [ ] 大文件上传、断点续传和断点下载依赖哪些协议能力
- [ ] 流式响应与一次性返回完整消息体有什么区别

### 8. 长连接与实时通信 `realtime.md`

- [ ] 短轮询、长轮询、SSE、WebSocket 分别如何工作
- [ ] WebSocket 建立连接时为什么需要 HTTP Upgrade 握手
- [ ] WebSocket 帧、心跳、重连和消息顺序需要注意什么
- [ ] SSE 的单向通信、自动重连和事件格式
- [ ] SSE 与 WebSocket 在方向、协议、代理兼容和使用成本上的区别
- [ ] 即时通知、日志流、聊天和协作编辑分别适合什么方案
- [ ] HTTP keep-alive、TCP keepalive 和应用层心跳的区别

### 9. 代理、网关与 CDN `proxyAndCdn.md`

- [ ] 正向代理与反向代理的区别
- [ ] 反向代理、API Gateway 和负载均衡器的职责如何区分
- [ ] 四层负载均衡与七层负载均衡的区别
- [ ] 常见负载均衡策略以及会话保持的影响
- [ ] CDN 的边缘节点、回源和缓存命中过程
- [ ] DNS 调度与 Anycast 如何帮助用户连接到合适的节点
- [ ] `Forwarded`、`X-Forwarded-For`、`X-Forwarded-Proto` 的用途和可信边界
- [ ] 代理转发时 Host、客户端 IP 和协议信息为什么可能发生变化

### 10. IP 与局域网基础 `ip.md`

- [ ] IPv4 地址、子网掩码、网络号和主机号的含义
- [ ] 公网 IP、私网 IP、回环地址和链路本地地址
- [ ] NAT 解决什么问题，端口映射如何让多个设备共享公网地址
- [ ] IPv6 相比 IPv4 的主要变化
- [ ] ARP 如何在局域网中根据 IPv4 地址找到 MAC 地址
- [ ] DHCP 如何为设备分配 IP、网关和 DNS 配置
- [ ] 默认网关在跨网段通信中的作用
- [ ] localhost、`0.0.0.0` 和 `127.0.0.1` 的区别

### 11. 网络排查 `troubleshooting.md`

- [ ] 如何区分 DNS、连接、TLS、HTTP 和应用层错误
- [ ] 浏览器 Network 面板中 Queueing、DNS、Initial connection、SSL、TTFB、Content Download 表示什么
- [ ] `curl` 如何查看请求、响应头、重定向和连接过程
- [ ] `ping`、`traceroute`、`nslookup` 或 `dig` 分别用于排查什么
- [ ] 连接超时、连接拒绝、连接重置和 HTTP 超时有什么区别
- [ ] 502、503、504 分别更可能发生在哪一环
- [ ] 抓包时如何用五元组识别一条连接
- [ ] 为什么浏览器请求成功而命令行失败，或命令行成功而浏览器失败

## P2：有余力再学

### 12. TCP 进阶 `tcpAdvanced.md`

- [ ] MSS、MTU 与 IP 分片的关系
- [ ] 慢启动、拥塞避免、快速重传和快速恢复的基本过程
- [ ] RTT、RTO 如何影响重传判断
- [ ] Nagle 算法与延迟确认可能产生什么交互
- [ ] SYN backlog、accept queue 与连接建立的关系
- [ ] 半连接、半关闭和 RST 分别表示什么
- [ ] TCP keepalive 的探测机制和局限

### 13. DNS 进阶 `dnsAdvanced.md`

- [ ] 负缓存与 SOA 记录的关系
- [ ] CNAME 为什么通常不能直接用于 zone apex
- [ ] EDNS 扩展了 DNS 的哪些能力
- [ ] DNS over HTTPS 与 DNS over TLS 改变了哪一段解析链路
- [ ] DNSSEC 提供什么保证，与 DoH、DoT 有何区别
- [ ] split-horizon DNS 和内部域名解析

### 14. QUIC 进阶 `quic.md`

- [ ] QUIC 的 packet、stream、connection ID 分别是什么
- [ ] QUIC 为什么能够在网络切换后迁移连接
- [ ] QUIC 的丢包恢复和拥塞控制与 TCP 有何关系
- [ ] QUIC 如何在一个连接内隔离不同流的丢包影响
- [ ] QUIC 握手如何与 TLS 1.3 集成
- [ ] 0-RTT 数据的重放限制为什么需要应用层配合

### 15. WebRTC 网络基础 `webRtc.md`

- [ ] WebRTC 的信令、媒体传输和点对点连接分别负责什么
- [ ] ICE、STUN、TURN 如何帮助建立连接
- [ ] NAT 类型为什么会影响点对点连接
- [ ] SDP 用于协商哪些信息
- [ ] DTLS、SRTP、SCTP 在 WebRTC 中分别承担什么职责
- [ ] DataChannel 与 WebSocket 的连接模型有何区别

## 综合题

- [ ] 从网络角度说明访问一个 HTTPS URL 到收到响应的完整过程
- [ ] 画出 TCP 三次握手和四次挥手，并解释每一步的必要性
- [ ] 比较 TCP 与 UDP，并为实时音视频、文件下载、DNS 查询选择协议
- [ ] 从浏览器缓存开始，说明一次 DNS 查询可能经过哪些缓存与服务器
- [ ] 从证书验证和密钥协商两个角度说明 TLS 握手
- [ ] 比较 HTTP/1.1、HTTP/2、HTTP/3 的连接与多路复用方式
- [ ] 分析请求卡在 DNS、TCP、TLS、TTFB、下载阶段时可能的原因
- [ ] 为聊天消息、服务端通知、日志流选择轮询、SSE 或 WebSocket
- [ ] 说明反向代理、负载均衡、CDN 在一次请求链路中的位置
- [ ] 设计大文件的分片上传、断点续传与下载方案

## 建议取舍

- 时间较少：完成 P0，重点掌握 HTTP、TCP、DNS、TLS 和 HTTP 版本演进。
- 常规准备：完成 P0、P1，并能串联解释一次 HTTPS 请求的完整网络过程。
- 深入准备：补充 P2，并使用浏览器 Network 面板、`curl`、`dig` 实际观察一次请求，不必背诵协议报文的全部字段。
