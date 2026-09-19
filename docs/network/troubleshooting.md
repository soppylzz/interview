# 网络排查

> 网络排查的核心是先确定失败发生在哪一层，再使用能观察该层的工具。不要看到“请求失败”就直接归因于跨域或后端。

## 1. 分层定位

| 阶段 | 常见现象 | 重点检查 |
| --- | --- | --- |
| DNS | name not resolved、NXDOMAIN | 记录、解析器、TTL、hosts |
| Connect | refused、timeout | IP、端口、监听、防火墙、路由 |
| TLS | certificate error、handshake failure | 域名、证书链、时间、SNI、协议 |
| HTTP | 4xx、5xx、redirect loop | 方法、URL、字段、代理、应用日志 |
| Content | truncated、decode error | 长度、压缩、代理缓冲、连接中断 |
| Browser policy | CORS、mixed content | Console、preflight、响应字段 |

## 2. Network Timing

浏览器 Network 面板常见阶段：

- Queueing/Stalled：等待调度、可用连接或代理处理。
- DNS Lookup：名称解析。
- Initial Connection：TCP 或 QUIC 建连。
- SSL：TLS 握手。
- Request Sent：发送请求。
- Waiting/TTFB：等待首字节，包含网络往返和服务端处理。
- Content Download：读取响应内容。

某个阶段长只能提供方向，不能单独证明原因。例如 TTFB 高可能是服务端慢、上游调用慢、缓存未命中或网络 RTT 高。

## 3. curl

```bash
curl -v https://example.com/
curl -I https://example.com/
curl -L https://example.com/
curl --connect-timeout 3 --max-time 10 https://example.com/
curl -o /dev/null -sS -w '%{http_code} %{time_connect} %{time_starttransfer}\n' https://example.com/
```

- `-v`：观察解析、连接、TLS 和请求响应字段。
- `-I`：发送 HEAD。
- `-L`：跟随重定向。
- `--resolve host:port:ip`：绕过 DNS，把域名连接到指定 IP，同时保留 Host/SNI。

命令行成功而浏览器失败，常见原因包括 CORS、Cookie、代理、浏览器缓存、证书信任库差异或扩展干预。浏览器成功而命令行失败，可能因为浏览器使用系统代理、已有认证状态、不同 DNS 或 HTTP 版本。

## 4. DNS 与路由工具

```bash
dig example.com
dig @1.1.1.1 example.com
nslookup example.com
ping example.com
traceroute example.com
```

- dig/nslookup：查询 DNS。
- ping：基于 ICMP 测试可达性和 RTT，但被禁 ping 不等于服务不可用。
- traceroute：观察路径跳点，部分路由器不回复也不等于后续路径失败。

## 5. 错误语义

- Connection refused：目标主机明确回复端口未监听或策略拒绝。
- Connection timeout：规定时间内未建连，可能是丢包、防火墙静默丢弃或路由问题。
- Connection reset：已存在或正在建立的连接收到 RST，被一端或中间设备重置。
- Request timeout：应用或代理等待请求/响应超过自身期限，不一定是 TCP 连接问题。
- 502：网关无法获得有效上游响应。
- 503：服务暂不可用或主动过载保护。
- 504：网关等待上游超时。

## 6. 五元组与抓包

一条 TCP/UDP flow 通常由源 IP、源端口、目标 IP、目标端口、协议识别。抓包排查时：

1. 先确认 DNS 返回的目标 IP。
2. 用五元组过滤目标连接。
3. 查看握手是否完成。
4. 查看是否重传、RST 或长时间无响应。
5. TLS 加密后通常不能直接看到 HTTP 内容，但仍能观察握手、包长和时序。

## 7. 标准排查顺序

1. 明确复现条件、URL、环境和时间。
2. 判断是所有用户、特定地区、特定浏览器还是单个账户。
3. 查 DNS 和目标 IP。
4. 查连接与 TLS。
5. 查 HTTP request/response 和重定向。
6. 关联代理、网关、应用日志与 trace ID。
7. 修复后用相同条件回归，并观察监控是否恢复。

## Interview

### 页面请求一直 pending，如何排查？

先看 Timing 卡在哪一阶段；再检查连接数、Service Worker、代理、请求是否真正发出、服务端是否收到、是否在等待上游或流式响应未结束。pending 是状态表现，不是单一原因。

### Postman 成功、浏览器失败通常是什么原因？

首先看浏览器 Console 和 Network。若请求已到服务端但被浏览器阻止读取，常见是 CORS；也可能是浏览器自动携带 Cookie、触发预检、mixed content、缓存或扩展导致。需要依据实际请求和响应判断。
