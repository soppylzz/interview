# DevTools 性能分析

先稳定复现：关闭无关扩展，固定页面数据，用一致的 network/CPU throttling 录制多次，并保留一个未限速结果。限速是对比工具，不等同于所有真实设备。

## Network

从导航开始读 waterfall，检查 TTFB、资源发现时机、优先级、串行依赖、缓存状态、transfer/resource size 和压缩。关键资源开始晚说明发现链问题；下载快但完成后长时间不显示，通常还要看主线程。

## Performance

- Main 轨道展示 task 和调用栈，红色标记帮助发现 Long Task。
- Interactions 把输入与呈现反馈关联；Frames 观察掉帧；Network 与主线程对齐资源完成时间。
- self time 是函数自身时间，total time 包括子调用；沿最宽栈向下找实际热点。
- forced reflow/layout 表明脚本读取迫使样式布局同步；Paint 和 Layers 帮助判断重绘区域与合成层。

Performance Insights/Lighthouse 适合快速发现常见模式和建立基线，手工 trace 更适合解释具体调用和交互。Coverage 显示本次路径未使用 JS/CSS，是拆包线索，不代表代码永远无用。

Memory 面板用 snapshot/allocation 找保留对象，Rendering 面板显示 paint flashing、布局边界和帧率。每次只改变一个主要因素，并用相同 trace 与线上 RUM 复验收益。
