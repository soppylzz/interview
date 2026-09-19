# Sender-Constrained Token

> Bearer Token 谁持有谁使用；sender-constrained token 还要求请求方证明持有与 token 绑定的密钥。

## DPoP

Client 为请求生成签名 proof JWT，常包含：

- `jti`：唯一 proof ID，用于重放检测。
- `htm`：HTTP method。
- `htu`：目标 URI。
- `iat`：签发时间。
- `ath`：access token hash。

Authorization Server 把 access token 绑定到 Client 公钥；Resource Server 同时验证 token 和 proof。窃取 token 但没有私钥的攻击者无法直接使用。

服务端可返回 DPoP nonce，要求后续 proof 绑定新鲜 challenge。仍需限制时间窗口并记录 jti/nonce，防止 proof 重放。

mTLS-bound token 用客户端 TLS 证书绑定，适合能部署证书的 confidential client；DPoP 在应用层使用签名，更适合浏览器/原生等场景。

若攻击者完全控制 Client 执行环境并能使用私钥签名，DPoP 无法消除风险。
