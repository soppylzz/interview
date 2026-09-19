# JWT

> JWT 是携带 claims 的紧凑令牌格式，不等于 OAuth、Session 或“登录方案”。常见签名 JWT 是 JWS Compact Serialization。

## 结构

```text
BASE64URL(protected header).BASE64URL(payload).BASE64URL(signature)
```

Base64url 只是编码，任何拿到 JWT 的人都能读取 header/payload。JWS 提供完整性和来源验证，不提供机密性；需要加密时使用 JWE。

常见 claims：`iss` 签发者、`sub` 主体、`aud` 接收方、`exp` 过期、`nbf` 生效时间、`iat` 签发时间、`jti` 唯一标识。

## JOSE 关系

- JWT：claims container。
- JWS：签名或 MAC 保护的数据结构。
- JWE：加密的数据结构。
- JWK/JWKS：JSON 密钥/密钥集合。
- `alg`：算法；`kid`：帮助从受信 JWKS 选择密钥。

HS256 使用共享 secret，签发和验证方都能伪造 token；RS256/ES256 用私钥签名、公钥验证，更适合多个验证方。

## 验证

1. 固定允许的算法，不能盲信 token 的 `alg`。
2. 从可信配置或 JWKS 选择密钥，不能信任任意 header URL。
3. 验证签名。
4. 验证 `iss`、`aud`、`exp`、`nbf`，按协议验证 nonce 等业务 claims。
5. 进行 scope/permission 等授权判断。

只 decode 不 verify 等于信任用户提交的 JSON。

## Token 类型

OIDC ID Token 必须是 JWT；OAuth Access Token 可以是 JWT 或 opaque token；Refresh Token 通常无需让 Client 解析。自包含 JWT 可本地验证，但权限变化和撤销不会自动立即传播。

短有效期、refresh rotation、revocation state、denylist 或 key rotation 可缩小风险。“无状态 JWT”只表示验证时可能不查 Session，不代表系统无需用户、授权和撤销状态。

## Interview

### JWT 签名能防止泄漏吗？

不能。签名防篡改，不阻止读取或复制。Bearer JWT 一旦泄漏，攻击者可在有效期内原样使用，除非采用 sender-constrained token。
