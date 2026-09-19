# 表单架构

Field state 包含 value/touched/error，form state 聚合 dirty/valid/submitting，server state 是加载的选项或提交结果；不要混成一个不可控对象。

同步校验处理格式，异步校验要 debounce、取消旧请求并防响应竞态；跨字段规则在 schema/form 层表达。客户端 schema 可复用类型，但服务端仍独立验证。

动态数组字段使用稳定 id，不用索引作为身份。条件字段隐藏时明确是保留、清空还是不提交。

自动保存需要版本、debounce、失败重试和冲突提示；草稿定义存储与过期。离开保护只在 dirty 且未保存时注册，成功提交后清理。
