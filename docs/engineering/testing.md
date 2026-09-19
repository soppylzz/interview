# 测试工程

单元测试验证小范围逻辑，组件测试验证组件交互，集成测试覆盖多个真实模块，E2E 在浏览器中验证关键用户路径。测试分布应根据风险、反馈速度和维护成本决定，不必机械追求固定金字塔比例。

jsdom/happy-dom 模拟 DOM，速度快，但布局、绘制、导航和部分 Web API 与真实浏览器不同。涉及尺寸、焦点、拖拽、兼容性和网络生命周期时应用 Playwright/Cypress 等真实浏览器测试。

## Test Double

- stub 提供预设返回；spy 记录调用；fake 是可工作的简化实现；mock 常同时带有行为预期。
- ESM import 提升和 live binding、CJS 缓存会影响 module mock 时机，测试框架的转换机制也会参与。
- fake timer 能控制宏任务时间，但 Promise 微任务、`nextTick` 和框架调度可能需要单独 flush。

snapshot 适合稳定且可审阅的结构，不适合替代行为断言。coverage 的 statement、branch、function、line 只说明执行到哪里，不证明断言有效。

flaky test 常来自未等待异步、共享状态、随机数据、时间/时区、网络和不稳定选择器。应消除根因、保存 trace，并限制重试只用于诊断，避免把失败隐藏起来。
