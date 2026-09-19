# 前端分层与依赖方向

一种参考分层是 UI 展示与交互、application 编排用例、domain 表达业务规则、infrastructure 对接 HTTP/存储/监控。并非所有项目都需要四层，但职责应清楚。

页面负责路由级组合，组件负责可复用 UI，业务 service/use case 组织操作，repository/client 隔离远端协议。核心规则依赖接口，基础设施实现接口，使测试和替换更容易。

按技术目录容易让一个需求横跨全仓；按 feature 分组能让一起变化的代码靠近。共享基础放明确 public API，禁止任意深层 import。

barrel file 可简化入口，也可能隐藏循环依赖和扩大初始化副作用。用依赖规则/图检测跨层逆向引用与 cycle。
