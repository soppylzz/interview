# 第三方登录与账号绑定

> “使用第三方登录”应优先基于 OIDC。仅用 OAuth 获取用户资料并自行推断身份，容易遗漏 issuer、subject、nonce 等认证约束。

本地外部身份主键使用 `(issuer, subject)`。Email 可能变化、未验证或在不同 provider 重复，不能只凭相同 email 静默合并账号。

## 流程

1. 完成 OIDC Code + PKCE 并验证 ID Token。
2. 用 iss/sub 查找已绑定身份。
3. 未绑定时让用户创建账号或在已认证状态下显式绑定。
4. 绑定敏感操作要求近期认证，并通知原账号。
5. 解绑前保证用户仍有其他登录方式。

第三方 access token 通常由可信后端持有，只在调用 provider API 必需时保存，并限制 scope、加密存储和处理撤销。用户拒绝或只批准部分 scope 时，应用应降级而非假定全部成功。

账号接管常来自自动 email 合并、绑定 CSRF、未验证 provider issuer、允许攻击者替换 callback transaction。绑定比普通登录更敏感。
