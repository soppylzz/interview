# Session Replay

多数 replay 记录初始 DOM、后续 mutation、输入/滚动和网络摘要，再在播放器重建，不是视频录屏。Canvas、iframe、Shadow DOM 和跨源内容可能需要特殊支持。

默认 mask 输入、文本和图片，阻止密码、支付、医疗等区域采集；第三方 iframe 通常不能读取。脱敏必须在客户端上报前完成。

Replay 成本包括 DOM 序列化、主线程、网络和存储。按会话采样，对发生错误/高延迟的会话提升保留，并设最大时长/体积。

用 sessionId、timestamp、error event id 与 trace 对齐。访问 replay 需要权限审计、用户同意依据和明确保留/删除策略。
