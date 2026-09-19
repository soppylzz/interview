# Trace 与前后端关联

trace 表示一次端到端操作，span 表示其中一个有开始结束的工作单元，通过 traceId/spanId/parent 形成树。attribute 描述可检索维度，event 记录 span 内离散事件。

前端在用户交互/导航创建 root span，fetch/XHR 注入标准 Trace Context，后端继续传播到服务与数据库。自定义 header 可能触发 CORS 预检，服务端需允许且不能向不可信 origin 泄露内部关联。

span 记录 status、route、method、归一化 endpoint 和 release，禁止把用户 id、完整 URL 等无界值当索引维度。

头部采样在开始时决定，尾部采样可保留慢请求/错误但需要后端缓冲。前端被采样掉的 trace 仍可通过 request ID 与错误关联。
