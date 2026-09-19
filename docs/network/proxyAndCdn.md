# 代理、网关与 CDN

> 代理位于通信路径中。判断一种组件的职责时，要看它代表客户端还是服务端、工作在哪一层、是否理解业务语义。

## 1. Forward Proxy 与 Reverse Proxy

### Forward Proxy

代表客户端访问外部服务。目标服务器看到的连接来源通常是代理。典型用途包括企业出口、访问控制、隐私代理和客户端缓存。

### Reverse Proxy

代表服务端接收客户端请求，再转发给内部上游。客户端通常只知道代理入口。典型用途包括 TLS termination、负载均衡、缓存、压缩和路由。

## 2. Gateway 与 Load Balancer

- Reverse Proxy：广义转发入口，可处理 TLS、缓存、路由等。
- Load Balancer：把请求分配给多个实例，重点是容量和可用性。
- API Gateway：理解 API、身份、限流、路由、协议转换和策略。

真实产品可能同时承担多种角色，名称不能代替对实际职责的分析。

## 3. L4 与 L7

| 维度 | L4 Load Balancing | L7 Load Balancing |
| --- | --- | --- |
| 依据 | IP、端口、连接 | Host、path、header、Cookie 等 |
| 协议理解 | 不必理解 HTTP 语义 | 理解应用层协议 |
| TLS | 可透传 | 常终止 TLS 后检查 HTTP |
| 灵活性 | 较低但通用 | 路由与策略更丰富 |

常见策略包括 round robin、least connections、consistent hashing 和带权选择。Session affinity 能保持用户落到同一实例，但会影响负载均衡和故障迁移，优先考虑让服务状态可共享或外置。

## 4. CDN

CDN 把内容缓存在靠近用户的 edge node：

1. DNS 或 Anycast 把用户引导到合适节点。
2. 边缘节点检查缓存 key 和有效期。
3. 命中时直接响应。
4. 未命中或过期时向上级节点或 origin 回源。
5. 根据响应缓存策略保存内容。

缓存 key 通常包含 host、path、query，并可按配置考虑 header 或 Cookie。维度过多会降低命中率；维度不足可能把个性化响应错误共享。

CDN 不只服务静态文件，也可能提供 TLS、WAF、边缘计算、图片转换和动态路由。

## 5. 客户端信息

反向代理建立了新的上游连接，源站直接看到的 peer 往往是代理，因此常使用：

- `Forwarded`
- `X-Forwarded-For`
- `X-Forwarded-Proto`
- `X-Forwarded-Host`

客户端可以伪造普通请求字段。只有来自受信任代理的转发字段才能用于安全决策，代理还应覆盖或规范化外部传入值。

## 6. 常见故障

- CDN 缓存了不应共享的用户响应。
- HTML 更新早于静态 chunk，导致旧/新版本不匹配。
- 代理超时短于后端任务时间，出现 504。
- 请求体限制在代理层触发 413。
- TLS 在代理终止后，上游错误认为原请求为 HTTP，生成错误跳转。
- 缺少 sticky session，而应用把会话只存单实例内存。

## Interview

### 502 与 504 有何区别？

二者都常由网关或代理返回。502 表示从上游收到无效响应或连接异常；504 表示在规定时间内没有等到上游响应。

### CDN 与浏览器缓存有什么区别？

浏览器缓存是单个用户代理的私有或本地缓存；CDN 是服务端一侧的共享边缘缓存，可服务大量用户并减少回源。
