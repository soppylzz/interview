# Network 基础索引

> 网络基础部分需要建立一条完整主线：应用产生 HTTP 消息，经 TLS 保护、TCP 或 QUIC 传输、IP 路由，最终到达目标服务。

## 建议顺序

1. [网络分层模型](./networkModel.md)
2. [HTTP 基础与报文](./http.md)
3. [TCP 与 UDP](./transport.md)
4. [DNS](./dns.md)
5. [HTTPS 与 TLS](./tls.md)
6. [HTTP 版本演进](./httpVersions.md)
7. [HTTP 消息体与内容协商](./httpTransfer.md)
8. [长连接与实时通信](./realtime.md)
9. [代理、网关与 CDN](./proxyAndCdn.md)
10. [IP 与局域网基础](./ip.md)
11. [网络排查](./troubleshooting.md)

## 主线

访问一个 HTTPS URL 时，网络侧大致经历以下过程：

1. 解析 URL，确定 scheme、host、port 和请求目标。
2. 查询 DNS，将域名解析为可连接的 IP 地址。
3. 建立传输连接：HTTP/1.1、HTTP/2 通常使用 TCP，HTTP/3 使用 QUIC。
4. 建立安全通道：HTTPS 通过 TLS 验证服务端身份并协商会话密钥。
5. 发送 HTTP 请求，经过代理、网关或 CDN 到达源站。
6. 服务端返回 HTTP 响应，客户端按消息边界读取并解码内容。
7. 根据连接策略复用或关闭连接。

## 核心对比

| 问题 | 关键点 |
| --- | --- |
| TCP 与 UDP | TCP 提供可靠有序字节流；UDP 提供无连接数据报 |
| HTTP 与 HTTPS | HTTPS 是运行在安全传输通道上的 HTTP |
| HTTP/1.1 与 HTTP/2 | 文本消息与二进制分帧；多连接与单连接多路复用 |
| HTTP/2 与 HTTP/3 | TCP 上多路复用与 QUIC 独立流 |
| 强缓存与协商缓存 | 属于浏览器缓存策略，详见 `docs/browser/cache.md` |
| HTTP keep-alive 与 TCP keepalive | 前者复用 HTTP 连接，后者探测空闲 TCP 连接状态 |

## 复习目标

- 能从网络角度完整说明一次 HTTPS 请求。
- 能解释 DNS、TCP、TLS、HTTP 各自解决的问题。
- 能画出 TCP 握手、挥手和 TLS 握手的主要过程。
- 能比较 HTTP/1.1、HTTP/2、HTTP/3。
- 能使用 Network 面板、curl 和 dig 判断故障所在阶段。
