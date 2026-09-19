# Source Map 与线上定位

Source map 把生成文件的行列位置映射回原始文件、行列及可选名称。常见字段包括 `sources`、`names`、压缩后的 `mappings` 和可内嵌源码的 `sourcesContent`。

`mappings` 按生成位置排序，并用 Base64 VLQ 记录相邻值的差量，从而紧凑保存大量位置。多层工具链需要组合前一层 map；任一 transform 丢弃 map 都会让最终定位中断。

## 交付方式

- inline map 直接嵌入文件，方便开发但显著增大体积。
- external map 单独发布并由注释关联。
- hidden map 不在客户端文件写关联注释，可只上传监控平台。

生产 source map 是否公开取决于调试需要与源码暴露策略。即使不公开，也应把每个 chunk 的 map 作为 release artifact 上传错误平台。

线上还原依赖精确的 release、构建标识、文件 URL 和 artifact。部署了新 JS 却关联旧 map，会把堆栈映射到错误代码。代码分割场景应保留 chunk 名称与 content hash，并验证上传的是部署产物对应的 map。
