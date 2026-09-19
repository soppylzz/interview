# DNS 进阶

> DNS 进阶问题集中在缓存一致性、别名限制、传输扩展、查询隐私和回答完整性。

## 1. Negative Caching

解析器不仅缓存成功答案，也会缓存 NXDOMAIN 或名称存在但目标 record type 不存在的否定答案，避免反复查询权威服务器。

否定缓存时间与权威响应中的 SOA 信息相关。排查“记录已添加但仍返回不存在”时，除了新记录 TTL，还应考虑旧否定结果的缓存期限。

## 2. Zone Apex 与 CNAME

zone apex 需要同时存在 SOA、NS 等记录，而标准 CNAME 要求该名称不能与其他普通数据共存，因此 apex 通常不能直接配置传统 CNAME。

DNS provider 常提供 ALIAS、ANAME 或 CNAME flattening 等非标准管理功能，在权威回答时合成 A/AAAA。使用时需理解这是供应商行为，不是普通 CNAME record。

## 3. EDNS

传统 DNS over UDP 的消息大小有限。EDNS 通过 OPT pseudo-record 扩展：

- 更大的 UDP payload size。
- 新 flag 和 option。
- DNSSEC 所需能力协商。
- Extended DNS Error 等扩展。

过大的 UDP 响应可能触发 IP 分片并更易丢失，所以实现通常采用保守大小，并在需要时回退 TCP。

## 4. DoH 与 DoT

- DoT：DNS 消息通过 TLS 连接传输，常用专用端口。
- DoH：DNS 消息通过 HTTPS 传输，可复用 Web 基础设施。

它们主要加密客户端到所选递归解析器这一段，防止本地网络直接读取或篡改查询。递归解析器仍能看到查询，权威查询链也不会因此自动端到端加密。

DoH/DoT 改变隐私和运维可见性，但不验证 DNS 数据本身是否由权威 zone 正确签发。

## 5. DNSSEC

DNSSEC 用数字签名验证 DNS 数据的来源和完整性：

- Zone 用私钥为 record set 签名。
- 公钥通过 DNSKEY 发布。
- DS record 把子 zone 的密钥摘要连接到父 zone，形成从根开始的信任链。
- 验证解析器检查签名并设置 authenticated data 状态。

DNSSEC 不加密查询，也不隐藏域名。DoH/DoT 保护传输隐私，DNSSEC 验证数据真实性，解决的问题不同。

## 6. Split-horizon DNS

同一域名根据查询来源返回不同答案，例如企业内网返回私有地址，公网返回公共入口。这可简化命名，但可能导致：

- VPN 内外解析不同。
- 缓存跨网络切换后短期保留旧答案。
- 调试人员与用户看到不同结果。
- 证书和服务配置需要同时覆盖各环境。

## 7. TTL 与发布

计划切换记录时常见流程：

1. 提前降低旧记录 TTL。
2. 等待原 TTL 周期过去。
3. 切换到新目标。
4. 验证不同地区和解析器。
5. 稳定后恢复合理 TTL。

TTL 越短并不总越好：会提高权威查询量、增加解析延迟，并不能消除实现自定义缓存或已有长连接的影响。

## Interview

### DoH 是否能保证 DNS 回答没有被伪造？

DoH 验证并加密客户端与 DoH resolver 之间的 HTTPS 通道，因此能防止这一段被篡改，但客户端仍需信任 resolver。DNSSEC 用权威签名验证 DNS 数据本身。

### 为什么 apex 不能普通 CNAME？

CNAME 语义要求该名称不与其他数据共存，而 zone apex 必须拥有 SOA、NS 等记录，因此冲突。供应商的 flattening 是额外实现，并非普通 CNAME。
