# HTTP 基础与报文

> HTTP 是面向资源的应用层请求—响应协议。HTTP 语义独立于具体传输版本，HTTP/1.1、HTTP/2、HTTP/3 主要改变消息如何在线路上传递。

## 1. 核心概念

- Client：发起请求的一方。
- Server：接收请求并返回响应的一方。
- Resource：请求目标，例如文档、图片或一组数据。
- Representation：资源在某次响应中的具体表示，例如 JSON 或 HTML。
- Proxy：位于客户端和源站之间，转发或处理消息。

HTTP 被称为无状态协议，是指每个请求本身应携带完成处理所需的信息，协议不会自动记住上一次请求的业务状态。应用仍可通过 Cookie、Session、Token 或数据库保存状态。

## 2. URL

```text
https://user@example.com:8443/a/b?x=1#title
\___/   \__/ \_________/ \__/ \_/ \___/
scheme   userinfo host    port path query fragment
```

fragment 只供客户端定位文档内部位置，通常不会出现在 HTTP 请求中。URI 是统一资源标识符的总称；URL 通过位置和访问方式标识资源；URN 强调持久名称。

## 3. HTTP/1.1 报文

请求：

```http
GET /users/42 HTTP/1.1
Host: api.example.com
Accept: application/json

```

响应：

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 24

{"id":42,"name":"Ada"}
```

请求由 request line、header section、空行和可选 content 组成；响应把 request line 换成 status line。HTTP/2、HTTP/3 不使用这套文本线路格式，但保留相同的核心方法、状态码和字段语义。

## 4. Method

| Method | 典型语义 | Safe | Idempotent |
| --- | --- | --- | --- |
| GET | 获取资源表示 | 是 | 是 |
| HEAD | 只获取与 GET 对应的响应元数据 | 是 | 是 |
| POST | 提交数据或触发处理 | 否 | 通常否 |
| PUT | 用给定表示创建或整体替换目标资源 | 否 | 是 |
| PATCH | 部分修改资源 | 否 | 不保证 |
| DELETE | 删除目标资源 | 否 | 是 |
| OPTIONS | 查询通信选项 | 是 | 是 |

Safe 表示客户端不请求改变服务端状态；幂等表示执行一次与重复执行多次的预期效果相同。幂等并不表示响应必须完全相同，也不表示服务端不能记录日志。

GET 与 POST 的关键区别是协议语义。GET 请求内容并非被语法绝对禁止，但没有通用语义，部分实现会拒绝；URL 长度上限也是具体客户端、服务器和代理的实现限制，不是“GET 只能传多少字节”的统一 HTTP 规则。

## 5. Status Code

| 类别 | 含义 | 常见状态码 |
| --- | --- | --- |
| 1xx | 临时信息 | 100 Continue、103 Early Hints |
| 2xx | 请求成功 | 200、201 Created、204 No Content、206 Partial Content |
| 3xx | 重定向或缓存相关 | 301、302、303、304、307、308 |
| 4xx | 客户端请求问题 | 400、401、403、404、405、409、429 |
| 5xx | 服务端或上游失败 | 500、502、503、504 |

401 表示缺少或无效的认证凭据；403 表示服务器理解身份或请求，但拒绝授权。502 通常表示网关收到无效上游响应；503 表示服务暂不可用；504 表示网关等待上游超时。

### Redirect

- 301、308：永久重定向。
- 302、307：临时重定向。
- 303：后续请求使用 GET，常用于 POST 后跳转。
- 307、308：明确要求保留原方法和请求内容。

301、302 在历史客户端中可能把 POST 改为 GET，因此需要保留方法时应使用 307 或 308。

## 6. 常见字段

- `Host`：目标主机和可选端口，支持同一 IP 上的虚拟主机。
- `Content-Type`：当前消息内容的媒体类型。
- `Accept`：客户端希望接收的媒体类型。
- `Authorization`：携带认证凭据。
- `User-Agent`：发送方实现信息。
- `Referer`：当前请求来源页面 URL。字段名保留了历史拼写。
- `Origin`：发起请求的源，不包含路径。
- `Location`：重定向目标或新建资源位置。
- `Vary`：说明缓存选择响应时还需考虑哪些请求字段。

字段名不区分大小写。HTTP/2、HTTP/3 要求线路上的字段名使用小写。

## Interview

### HTTP 是否一定运行在 TCP 上？

不是。HTTP/1.1 和 HTTP/2 常运行在 TCP 上，HTTP/3 运行在基于 UDP 的 QUIC 上。HTTP 核心语义与具体传输协议分离。

### PUT 和 PATCH 有什么区别？

PUT 的语义是使用请求内容创建或替换目标资源的完整表示，并且是幂等的。PATCH 描述对资源的一组部分修改，是否幂等取决于 patch 格式和操作定义。
