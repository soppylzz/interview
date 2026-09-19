# 权限与功能控制

认证确认主体，授权判断主体能否对资源执行动作。RBAC 以角色赋权，ABAC 根据主体/资源/环境属性，resource-based authorization 检查具体对象关系。

前端可在路由、页面、组件和按钮层隐藏/禁用不可用操作，改善体验；每个 API 仍必须服务端授权，不能相信前端 role 或菜单。

权限模型尽量使用 capability/action，而不是到处判断角色名。权限变化后使缓存失效或重新获取，敏感操作可要求 recent authentication。

Feature flag 控制发布/实验，permission 控制访问，二者可同时作用但生命周期不同。删除过期 flag，避免组合爆炸。
