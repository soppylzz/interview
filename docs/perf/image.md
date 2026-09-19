# 图片与媒体优化

JPEG 适合照片，PNG 适合无损和透明像素图，WebP/AVIF 通常能提供更高压缩率，SVG 适合可缩放图形与图标。格式选择还要考虑编码成本、解码速度、兼容和视觉质量。

## 响应式与关键图片

`srcset` 提供候选资源，`sizes` 告诉浏览器预期显示宽度，`picture/source` 可按媒体或格式选择。资源像素应接近 CSS 尺寸乘设备像素比，避免下载远超显示需求的图片。

非首屏图片适合 `loading="lazy"`；LCP 图片应在 HTML 中尽早发现，通常不懒加载，可按证据使用 `fetchpriority="high"` 或 preload。错误 preload、不同 URL 或缺少正确 `as` 可能造成重复请求。

`width/height` 或 `aspect-ratio` 提前预留空间以防 CLS。CSS background image 往往要等 CSS 下载解析后才被发现，也缺少 `<img>` 的语义、响应式和原生加载能力。

视频用 poster 提供首屏视觉，根据场景设置 metadata/none 等预加载策略；长视频通过流媒体和自适应码率匹配网络，而不是一次下载完整高码率文件。
