# Stream 与背压

Readable 产生数据，Writable 消费数据，Duplex 两端独立，Transform 在读写之间转换。普通模式中的 chunk 通常是 Buffer/字符串；object mode 可传 JavaScript 值，并使用不同的水位计量。

Readable 的 flowing mode 主动通过 `data` 推送，paused mode 由 `read()`、pipe 或 async iterator 按需消费。不要混用多种消费方式，否则容易丢失对流动状态的判断。

## 背压

`writable.write(chunk)` 返回 `false` 表示内部缓冲已达到水位，生产者应暂停，等待 `drain` 再写。忽略它会让待写数据不断堆在内存中。

`highWaterMark` 是开始施加背压的阈值，不是硬内存上限；并发流、对象大小和底层队列都会影响真实内存。

`pipeline()` 能把多段流连接起来，并统一传播错误、销毁相关流和报告完成，比手工连续 pipe 更可靠。Readable 也可用 `for await...of` 消费，在循环中自然等待下一块。

现代 Node 可在 Node Stream 与 Web Stream 间转换。转换时仍要检查对象模式、取消、错误和背压语义是否匹配。
