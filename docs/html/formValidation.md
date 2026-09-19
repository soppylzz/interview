# 表单校验与提交

required、pattern、min/max、type 等约束形成 Constraint Validation。`checkValidity()` 返回结果并触发 invalid，`reportValidity()` 还请求展示提示，`setCustomValidity()` 设置自定义错误，恢复有效必须清空字符串。

input 常在值变化时触发，change 通常在提交选择或失焦时触发。submit 在 form 上处理，可 `preventDefault` 接管；formdata 在构造提交数据时允许补充字段。

FormData 保留同名字段和 File，disabled 控件通常不进入数据。使用 fetch 发送 FormData 时不要手工设置 multipart boundary。

客户端校验用于即时反馈，可被禁用或伪造，服务端必须重新验证和授权。错误提示应与控件关联、可被读取，并在提交失败后把焦点/摘要引向可修正位置。
