# 文件上传与下载安全

扩展名、客户端 Content-Type 和 magic bytes 都可伪造，只能作为多层信号。服务端应限制大小、类型、数量，重新生成安全文件名，存到 Web 根目录之外或独立无脚本 origin。

SVG、HTML、PDF 等可能包含主动内容；直接同源展示会获得危险能力。按风险转换、消毒或强制 attachment 下载，并返回正确 Content-Type 与 `X-Content-Type-Options: nosniff`。

规范化路径并生成服务端路径，不能拼接用户文件名，防止 `../` 穿越和覆盖。解压缩/媒体处理要限制展开大小、CPU 和嵌套，在隔离环境执行。

Object URL 只是在当前 origin 创建 blob 引用，使用后 revoke。下载授权应绑定用户和短期限，不能依赖不可猜 URL 作为唯一控制。
