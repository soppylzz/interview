# Design System

Design token 表达颜色、间距、字体等决策；primitive 提供基础交互；component 组合语义与视觉；pattern 解决页面级重复流程。

组件默认满足键盘、焦点、对比度和 reduced motion。主题通过语义 token 映射，不让业务依赖具体色值；密度、响应式和国际化进入 API 设计。

扩展优先 slot/composition、variant 和受控 token，escape hatch 明确风险。随意穿透内部 class 会把实现变成公共契约。

采用 SemVer/changeset、迁移指南和 codemod，配合单元、可访问性与视觉回归。Design 与开发共享 token 和状态矩阵，评估成功看复用率、一致性和交付效率。
