# 原型污染与对象注入

不安全深合并或动态路径写入允许攻击者修改 `Object.prototype` 或目标原型，常见路径是 `__proto__`、`constructor.prototype`。随后所有普通对象可能继承攻击属性。

影响取决于可利用 gadget：配置默认值、权限判断、模板选项或 DOM sink 可能把污染升级为绕过或 XSS。

防御包括只允许预期 key、拒绝危险路径、使用维护中的安全合并库、Map 或 `Object.create(null)` 存字典，并用 own-property 检查。解析 query/JSON 后仍需 schema 校验。

冻结单个对象不能阻止其他原型被污染，也不能替代修复写入入口。测试应使用干净 realm/进程，避免污染影响其他用例。
