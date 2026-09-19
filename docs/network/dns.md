# DNS

> DNS 是分布式、分层的命名系统。它不只是“把域名变成 IP”，还承载邮件路由、服务委派、所有权验证等记录。

## 1. 域名层级

以 `www.example.com.` 为例：

```text
.                 root
└── com            TLD
    └── example    registrable domain
        └── www    host label
```

末尾的点表示 DNS 根，日常书写通常省略。权威区域 zone 不一定与视觉上的每一级域名完全相同，子域可以被 NS 记录委派给其他权威服务器。

## 2. 查询角色

- Stub Resolver：操作系统提供给应用的简单解析接口。
- Recursive Resolver：替客户端完成完整查询并缓存结果。
- Root Server：指向对应 TLD 权威服务器。
- TLD Server：指向目标域名的权威服务器。
- Authoritative Server：提供目标 zone 的最终记录。

客户端通常向递归解析器发起递归查询。若无缓存，递归解析器通过多次迭代查询逐级找到权威答案。

## 3. 可能经过的缓存

1. 浏览器或应用缓存。
2. 操作系统缓存。
3. 本地 hosts 文件或本地网络设备。
4. 递归解析器缓存。
5. 中间权威委派与记录缓存。

缓存受 TTL 控制，但具体实现可能设置上下限。修改 DNS 后不能假设所有客户端会立即看到新值。

## 4. 常见记录

| Record | 用途 |
| --- | --- |
| A | 名称指向 IPv4 地址 |
| AAAA | 名称指向 IPv6 地址 |
| CNAME | 一个名称作为另一名称的别名 |
| NS | 委派 zone 的权威服务器 |
| MX | 邮件交换服务器及优先级 |
| TXT | 任意文本，常用于验证和邮件策略 |
| PTR | 反向解析，IP 指向名称 |
| SOA | zone 起始信息及管理参数 |

CNAME 查询可能需要继续解析目标名称。一个名称配置多个 A/AAAA 记录可以用于简单分流和容错，但 DNS 本身不了解应用实例是否健康，通常还需健康检查和调度系统。

## 5. UDP 与 TCP

传统 DNS 查询通常先使用 UDP，因为无连接且开销小。以下情况可能使用 TCP：

- UDP 响应被截断，客户端看到 TC 标志后重试。
- zone transfer。
- DNS over TCP、DNS over TLS 等明确基于连接的传输。

EDNS 允许更大的 UDP 响应，但仍需考虑路径 MTU、分片和丢包。

## 6. 排查

```bash
dig example.com A
dig example.com AAAA
dig example.com CNAME
dig +trace example.com
```

关注：

- 返回状态，例如 NOERROR、NXDOMAIN、SERVFAIL。
- ANSWER、AUTHORITY、ADDITIONAL section。
- TTL 和实际回答的解析器。
- CNAME 链和最终 A/AAAA。
- 不同解析器返回是否一致。

NXDOMAIN 表示名称不存在；SERVFAIL 表示解析器未能完成查询，可能来自上游超时、DNSSEC 校验失败或权威配置问题。

## Interview

### DNS 查询都是递归查询吗？

不是。终端通常请求递归解析器递归完成查询；递归解析器向根、TLD、权威服务器发出的查询通常是迭代式的，对方返回答案或下一步委派。

### TTL 到期是否会主动推送新记录？

不会。TTL 到期表示缓存条目不应继续直接使用；下一次查询时解析器才重新获取记录。DNS 通常没有向所有缓存主动推送更新的机制。
