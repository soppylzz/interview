# 字体优化

FOIT 是字体等待期间文字不可见，FOUT 是先显示 fallback 再切换 Web Font。`font-display` 用 block、swap、fallback、optional 等策略权衡品牌字体与及时可读，具体时间窗口由浏览器实现。

WOFF2 是 Web 常用压缩格式。子集化去掉不需字形，`unicode-range` 让浏览器按实际字符选择分片；分片过细则增加请求和缓存管理。

只 preload 首屏必用且 URL、crossorigin、格式完全匹配的字体。预加载所有字重会争抢 LCP 资源。

fallback 与目标字体度量不同会在切换时改变行宽和高度，引发 CLS。可用 `size-adjust`、`ascent-override`、`descent-override`、`line-gap-override` 调整 fallback 度量，并通过真实文本验证。

可变字体用一个文件覆盖多个轴，在使用多个字重时可能更省；只用单一字重时未必比子集静态字体小。系统字体栈零额外字体下载，适合对品牌字形要求较低、重视即时显示的界面。
