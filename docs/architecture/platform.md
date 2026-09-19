# 多应用与平台化

Application shell 可统一导航、认证、配置、监控和设计系统，业务模块只接稳定平台 API。Plugin architecture 定义注册、生命周期、权限和版本契约。

构建时集成简单且易优化，runtime/module federation 支持独立部署，iframe 隔离强；选择取决于组织和发布边界。Shared dependency 的 singleton 需要版本治理和失败策略。

独立发布必须配合兼容协议、灰度和回滚；统一体验通过 design system、路由与可观测标准维持。平台团队提供 paved road 和支持，不把所有业务需求集中成瓶颈。

团队数量和自治收益不足时，模块化单体通常成本更低。
