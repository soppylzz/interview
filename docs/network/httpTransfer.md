# HTTP 消息体与内容协商

> HTTP 接收方必须知道消息内容的边界、媒体类型和编码方式，才能正确读取并解释数据。

## 1. 消息体边界

HTTP/1.1 在持久连接上不能简单依靠连接关闭判断每条消息结束，常见机制有：

- `Content-Length`：以十进制字节数说明内容长度。
- `Transfer-Encoding: chunked`：将内容分成若干 chunk，使用零长度 chunk 结束。
- 特定响应不允许内容，例如 HEAD 响应、204、304。
- 某些旧式响应用连接关闭表示结束，因而无法继续复用连接。

`Content-Length` 统计的是传输内容的字节数，不是 JavaScript 字符串长度。发送方不得为同一消息制造互相矛盾的边界信息，否则不同代理解析不一致可能造成 request smuggling。

HTTP/2、HTTP/3 使用带长度的 frame，并用 END_STREAM 表达 stream 结束，不使用 HTTP/1.1 的 chunked transfer coding。

## 2. Chunked Encoding

```http
HTTP/1.1 200 OK
Transfer-Encoding: chunked

4
Wiki
5
pedia
0


```

每个 chunk 先发送十六进制长度，再发送数据。它允许服务端在不知道最终长度时逐步发送响应。chunk 边界是传输边界，不一定对应业务消息或应用读取到的 chunk。

## 3. 类型与编码

- `Content-Type`：内容本身是什么，例如 `application/json; charset=utf-8`。
- `Content-Encoding`：内容经过了什么编码，例如 gzip 或 br。
- `Transfer-Encoding`：为了在线路上传输如何分帧，只逐跳生效。

接收方通常先移除 transfer coding，再移除 content coding，最后根据 media type 解释内容。

## 4. 内容协商

客户端使用请求字段表达偏好：

```http
Accept: application/json, text/html;q=0.8
Accept-Encoding: br, gzip
Accept-Language: zh-CN, en;q=0.8
```

服务端选择表示后，通过 `Content-Type`、`Content-Encoding`、`Content-Language` 告知结果。若响应会随请求字段变化，应正确设置 `Vary`，否则共享缓存可能返回错误变体。

服务器驱动协商方便，但会增加缓存 key 和行为复杂度。API 通常显式约定 JSON，而不是对大量格式动态协商。

## 5. 常见请求格式

### application/json

适合结构化数据，不直接承载二进制文件。JSON 不规定 Date、BigInt 等 JavaScript 类型的原生表示。

### application/x-www-form-urlencoded

把键值编码为 `key=value&key2=value2`，适合简单表单。重复 key、数组和嵌套对象的解释取决于应用约定。

### multipart/form-data

使用 boundary 分隔多个 part，每个 part 有独立首部，适合文件和字段混合提交。浏览器生成 FormData 时应让浏览器设置包含 boundary 的 Content-Type，不要手工只写媒体类型。

## 6. Range

客户端可请求部分字节：

```http
Range: bytes=1000-1999
```

服务端支持时返回：

```http
HTTP/1.1 206 Partial Content
Content-Range: bytes 1000-1999/5000
```

Range 常用于媒体拖动、断点下载和分段获取。`Accept-Ranges: bytes` 可表明支持范围请求。资源改变时需结合 ETag/Last-Modified 或 If-Range，避免拼接不同版本的数据。

## 7. 上传与下载

- 大文件应使用流，避免完整读入内存。
- 分片上传需要 upload ID、chunk index、校验值和最终合并协议。
- 失败重试必须明确幂等性，防止重复创建或重复计费。
- 断点下载依赖 Range，并验证资源版本。
- 应限制请求体、文件数量和单文件大小。

## Interview

### chunked 是否等于流式响应？

chunked 是 HTTP/1.1 的消息边界机制，常用于流式传输，但使用 chunked 不保证应用或代理会立即把每个 chunk 交给用户；各层仍可能缓冲。

### Content-Type 与 Accept 有什么区别？

Content-Type 描述当前消息携带的内容，Accept 表达接收方希望响应采用哪些媒体类型。
