# WebRTC 网络基础

> WebRTC 提供浏览器和原生客户端之间的实时音视频与数据通信。建立连接需要应用信令与 ICE 协作，不是调用一个 API 就天然点对点直连。

## 1. 三部分职责

- Signaling：交换 SDP、ICE candidate 和业务身份。WebRTC 不规定信令协议，可使用 HTTP、WebSocket 等。
- Connectivity：ICE 组合 STUN、TURN 和候选地址，寻找可用路径。
- Media/Data：音视频通常使用 SRTP，DataChannel 使用 SCTP over DTLS。

“P2P”是首选路径，不保证一定直连。无法穿透 NAT 或防火墙时，数据会通过 TURN relay。

## 2. ICE

ICE 收集多类 candidate：

- host candidate：本机接口地址。
- server reflexive candidate：通过 STUN 看到的公网映射地址。
- relay candidate：TURN server 分配的中继地址。

双方交换 candidate 后执行 connectivity check，为 candidate pair 测试可达性并选出有效路径。Trickle ICE 允许边收集边发送 candidate，缩短建立时间。

## 3. STUN 与 TURN

STUN 让客户端发现 NAT 映射后的公网地址，并帮助执行连接检查。它不负责转发正常媒体。

TURN 在无法直连时中继数据，兼容性更强，但增加服务器带宽成本和额外延迟。生产系统通常必须提供 TURN，不能假设 STUN 总能打洞成功。

## 4. NAT 的影响

NAT 会创建地址和端口映射，不同设备对外部目标、入站来源和映射生命周期的限制不同。对称 NAT、严格防火墙或 UDP 禁用环境会显著降低直连概率。

ICE 不要求前端准确判断 NAT “类型”再决定路径，而是通过实际 connectivity check 选择可用 candidate pair。

## 5. SDP

SDP 描述会话能力，例如：

- media 类型和方向。
- codec、payload type、时钟频率。
- ICE username fragment/password。
- DTLS fingerprint。
- candidate 或 bundling 信息。

Offer/Answer 协商并不传输媒体本身。应用应通过 WebRTC API 操作描述，而不是随意字符串替换 SDP。

## 6. 安全传输

- DTLS：在不可靠传输上完成握手和密钥协商。
- SRTP：加密并认证实时音视频包。
- SCTP：为 DataChannel 提供消息、可靠性和多 stream 能力。
- DTLS fingerprint：通过信令中的 SDP 绑定对端证书指纹。

WebRTC 媒体默认要求加密。信令本身仍需认证和完整性保护，否则攻击者可以替换协商信息或加入错误房间。

## 7. DataChannel 与 WebSocket

| 维度 | DataChannel | WebSocket |
| --- | --- | --- |
| 路径 | 对端直连或 TURN | 客户端到 WebSocket server |
| 传输 | SCTP over DTLS/ICE | WebSocket over TCP，或扩展传输 |
| 可靠性 | 可配置可靠、有序程度 | 可靠有序消息 |
| 建连 | ICE/SDP，较复杂 | HTTP handshake，较简单 |
| 场景 | P2P 数据、媒体协作 | 中心化消息、普通实时业务 |

## 8. 常见问题

- 建连慢：ICE gathering、TURN 距离、信令串行或候选检查慢。
- 有画面无声音：track、权限、codec、方向或播放策略问题。
- 企业网络失败：UDP 被阻止，TURN/TCP 或 TURN/TLS 未配置。
- 多人会议上行压力高：全 mesh 每个参与者向所有人发送，通常需要 SFU。
- 网络切换卡顿：ICE restart 或路径重新选择未处理。

## Interview

### WebRTC 是否必须有服务器？

需要信令服务交换协商信息，通常也需要 STUN，生产环境还应提供 TURN。媒体可能点对点传输，但多人会议通常使用 SFU/MCU 等服务器架构。

### STUN 与 TURN 有什么区别？

STUN 帮助发现公网映射并尝试直连；TURN 在直连失败时实际转发数据，因此成本更高但可达性更好。
