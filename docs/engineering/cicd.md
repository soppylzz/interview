# CI/CD 与环境管理

典型流水线是 clean install、lint、typecheck、test、build、部署、smoke test。CI 应使用已提交锁文件和固定工具版本，让同一提交可重复构建。

artifact 是一次构建的不可变结果，cache 是可丢弃的加速数据，deployment 是把 artifact 放入目标环境。不要把三者混用，否则缓存失效可能意外改变发布内容。

## 配置与发布

build-time env 会被编译进客户端产物；runtime config 在部署或启动时注入，适合 build once deploy many。浏览器能下载的任何变量都不是秘密，密钥必须留在服务端。

静态站点发布应先上传带 content hash 的不可变资源，再切换 HTML，避免 HTML 引用尚不存在的 chunk。旧资源保留一段时间可保护仍打开旧页面的用户。

滚动发布逐批替换实例；蓝绿维护两套环境并切流；金丝雀先给少量真实流量。三者都需 health check、关键路径 smoke test、监控阈值和可执行 rollback。

一个完整闭环还要记录提交、artifact、配置和发布时间，使告警能定位到具体 release，而不是仅知道“生产坏了”。
