# Buffer、编码与二进制数据

Buffer 是 Node.js 的 Uint8Array 子类，表示一段字节；ArrayBuffer 是底层连续内存。字符、Unicode code point 和 UTF-8 字节不是同一概念，因此字符串 `length` 也不等于 `Buffer.byteLength(str, 'utf8')`。

## 创建与视图

- `Buffer.alloc(n)` 清零，适合普通使用。
- `Buffer.allocUnsafe(n)` 可能复用未清零内存，必须在读取前完全覆写。
- `Buffer.from(value)` 从字符串、数组或现有内存创建。

小 Buffer 可能从内部 pool 分配，以减少频繁内存申请。`subarray` 以及常见的 Buffer `slice` 行为共享底层内存，修改一个视图可能影响另一个；需要副本时显式复制。

UTF-8 是文本到字节的编码，hex/base64 是字节的文本表示。网络 chunk 可以把一个多字节字符拆开，逐块 `toString()` 会产生乱码，应使用 StringDecoder、流的 encoding 或增量 TextDecoder。

文件、压缩内容和二进制协议应保持字节形式，避免无意义转字符串造成编码破坏、复制和额外内存。
