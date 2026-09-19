# 音视频与字幕

audio/video 可包含多个 source，浏览器按 type 和支持选择。controls 提供原生控制；poster 是视频播放前图像；preload 是 none/metadata/auto 提示，不是强制保证。

现代浏览器通常限制有声 autoplay，静音媒体更可能允许。`play()` 返回 Promise，应处理用户激活不足或策略拒绝。

track 提供 captions、subtitles、descriptions、chapters 等文本轨。字幕包含对白及重要声音，字幕与仅翻译语言的 subtitles 目的不同。

监听 loadedmetadata、timeupdate、ended、error 等事件时要清理资源。长媒体和自适应码率通常由专用流媒体协议/播放器管理，而不是一次下载整个文件。
