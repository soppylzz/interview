# Source Map 与版本关联

线上堆栈先定位生成文件 URL、行列，再用对应 source map 映射到源码。准确性依赖部署 JS、map 和 release 完全一致。

每次构建生成唯一 release/dist，把所有同步和异步 chunk 的 map 上传为 artifact。code splitting 下 chunk URL/content hash 是关键索引；上传后可从 CDN 隐藏或删除 map 注释，平台仍能符号化。

hidden source map 减少浏览器直接发现，不等于 map 内容安全；监控平台访问需权限和保留期。若位置明显错乱，先核对 release、public path、压缩后文件和 map 是否同一次构建。

Source Map 的生成原理见 engineering，本篇关注发布关联与线上使用。
