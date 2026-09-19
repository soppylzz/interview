# Scope、Audience 与权限模型

> OAuth scope 描述 Client 获得的委托权限；业务角色和对象级授权仍由 Resource Server 决定。

- scope：token 被允许执行的操作集合，例如 `orders:read`。
- audience：token 预期交给哪个 Resource Server。
- role：用户在业务中的角色，例如 admin。
- permission：对具体操作/资源的授权结果。
- claim：token 中的一个陈述，不天然等于权限。

Resource Server 必须验证 issuer、audience、有效期和所需 scope，再结合当前业务状态执行 RBAC/ABAC 或对象归属判断。只在前端隐藏按钮不构成授权。

Scope 应粗细适中并遵循最小权限。过粗导致 token 权力过大，过细会造成 consent 和管理爆炸。多个不同 Resource Server 通常使用各自 audience 的 token，避免一个 token 在所有服务通用。

增量授权只在功能需要时请求新 scope，减少初始 consent。最终授权范围可能小于请求范围，Client 必须按实际 token/response 工作。
