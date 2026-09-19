# Discovery、Metadata 与密钥轮换

> Metadata 让 Client 发现可信 issuer 的 endpoints 和能力；JWKS 让验证方获取签名公钥。

OIDC Discovery 常位于 `/.well-known/openid-configuration`，包括 issuer、authorization_endpoint、token_endpoint、jwks_uri 和支持的算法。响应中的 issuer 必须与预期和请求配置精确一致。

JWKS 的 key 常包含：`kty` 密钥类型、`kid` 标识、`use` 用途、`alg` 建议算法及公钥材料。验证流程根据 token kid 从受信 jwks_uri 选择候选 key，并仍限制允许算法。

## Rotation

1. Provider 先发布新公钥。
2. 开始用新私钥签名。
3. 验证方按 Cache-Control 缓存 JWKS；遇未知 kid 可受控刷新一次。
4. 保留旧公钥直到所有旧 token 过期并经过安全余量。
5. 再移除旧 key。

不能无条件请求 JWT header 中的 `jku/x5u`，否则攻击者可指定自己的 key endpoint。密钥位置来自可信 metadata/config。
