# 组件设计与边界

组件应围绕一个可描述职责和稳定 API。Container/presentational 有助于分离数据与展示，但现代 hooks/composables 下更重要的是状态所有权和副作用边界。

controlled 由父级保存真值，适合统一协调；uncontrolled 由组件/DOM 保存，适合封装和低频读取。不要同时维护两份无同步协议的状态。

优先 composition、slot/children 和明确 event，避免大量布尔 props 形成组合爆炸。Headless component 封装状态/交互，设计系统组件提供视觉与可访问性。

组件开始直接请求多个领域、访问全局状态、承担路由/权限/表单全部逻辑时需要拆分。逃生口应受控，例如 className/slot，而不是开放任意内部修改。
