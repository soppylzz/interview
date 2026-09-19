# HTTP Server 基础

`http.createServer((req, res) => {})` 中，IncomingMessage 是 Readable，ServerResponse 是 Writable。框架的 router、middleware 和 body parser 最终仍建立在请求流、响应流和 socket 生命周期之上。

## 请求与响应

读取 body 时累加已接收字节并设置上限，超限立即停止处理；大上传应流式写入目标。状态码和 header 在首次写 body、`writeHead` 或 `flushHeaders` 时发送，发送后不能再修改。

流式响应能降低首字节时间和峰值内存，并把背压传到数据源。使用 `pipeline` 统一处理源、压缩和响应错误。

## 连接生命周期

keep-alive 复用 TCP 连接，但必须配置合理的空闲、header、request 和应用处理超时，防止连接长期占用。客户端提前断开时，通过请求/响应关闭事件或 AbortSignal 取消数据库查询、文件读取等下游工作。

Node 原生 HTTP 对象是 Node Stream 和可变响应接口；Web Fetch API 使用 Request、Response 和 Web Stream。二者可适配，但 header、取消和 socket 控制能力不同。

生产服务还应限制 header/body、处理反向代理信息、捕获流错误，并在优雅退出时停止接收新连接、等待在途请求后再销毁剩余 socket。
