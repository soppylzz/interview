import { createServer, type IncomingMessage, type ServerResponse } from "node:http"

/* ==================== config ==================== */

const PORT = 5001

/* ==================== page ==================== */

// client-side logic only; no template literals inside so the TS file needs no escaping
const PAGE = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>Storage Management Demo — 配额、持久化与 OPFS</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 720px; margin: 32px auto; padding: 0 16px; line-height: 1.7; color: #343a40; }
  .card { border: 1px solid #dee2e6; border-radius: 8px; padding: 14px 20px; margin: 16px 0; }
  .muted { color: #868e96; font-size: 14px; }
  code { background: #f1f3f5; padding: 1px 5px; border-radius: 4px; }
  button { margin: 2px 4px 2px 0; padding: 4px 10px; cursor: pointer; }
  #log { margin: 0; padding-left: 20px; font-size: 14px; }
  #log li { margin: 2px 0; }
  #opfs-files { margin: 0; padding-left: 20px; font-size: 14px; }
</style>
</head>
<body>
<h1>Storage Management Demo</h1>

<div class="card">
  <p><strong>用量与持久化</strong> <span class="muted">（estimate() 是近似值，浏览器可能为隐私填充数值，更新也略有延迟）</span></p>
  <p id="storage-summary">读取中……</p>
  <p id="persist-status" class="muted">读取中……</p>
  <p>
    <button onclick="refreshEstimate()">刷新用量</button>
    <button onclick="requestPersist()">申请持久化存储（persist()）</button>
  </p>
</div>

<div class="card">
  <p><strong>OPFS</strong> <span class="muted">（origin 私有文件系统：无磁盘路径，文件名仅本 origin 内有意义，计入配额）</span></p>
  <p>
    <button onclick="opfsWrite()">写入草稿文件</button>
    <button onclick="opfsRead()">读取最新草稿</button>
    <button onclick="opfsList()">列出全部文件</button>
    <button onclick="opfsClear()">清空 OPFS</button>
  </p>
  <ul id="opfs-files"></ul>
</div>

<div class="card">
  <p><strong>QuotaExceededError 恢复</strong> <span class="muted">（逐块写入 10MB 直到报错，上限 200MB，随后按"可再生数据先删"清理）</span></p>
  <button onclick="quotaStress()">写入压力测试</button>
</div>

<div class="card">
  <p><strong>日志</strong></p>
  <ul id="log"></ul>
</div>

<script>
  var logEl = document.getElementById("log")

  function log(message) {
    var item = document.createElement("li")
    item.textContent = message
    logEl.prepend(item)
    while (logEl.children.length > 40) logEl.removeChild(logEl.lastElementChild)
  }

  function fmtBytes(value) {
    if (!value) return "0 B"
    if (value < 1024 * 1024) return (value / 1024).toFixed(1) + " KB"
    return (value / 1024 / 1024).toFixed(1) + " MB"
  }

  function refreshEstimate() {
    if (!navigator.storage || !navigator.storage.estimate) {
      document.getElementById("storage-summary").textContent = "当前环境不支持 estimate()"
      return
    }
    navigator.storage.estimate().then(function (estimate) {
      var usage = estimate.usage || 0
      var quota = estimate.quota || 0
      var ratio = quota ? ((usage / quota) * 100).toFixed(3) + "%" : "-"
      document.getElementById("storage-summary").innerHTML =
        "usage ≈ <strong>" + fmtBytes(usage) + "</strong> / quota ≈ <strong>" +
        fmtBytes(quota) + "</strong>（" + ratio + "）"
    })
  }

  function refreshPersisted() {
    if (!navigator.storage || !navigator.storage.persisted) return
    navigator.storage.persisted().then(function (persisted) {
      document.getElementById("persist-status").innerHTML = persisted
        ? "当前 origin 数据已标记为 <strong>persistent</strong>（自动回收优先级降低，但用户清理站点数据仍会删除）"
        : "当前 origin 数据为 <strong>best-effort</strong>：存储压力下可能被浏览器回收"
    })
  }

  function requestPersist() {
    if (!navigator.storage || !navigator.storage.persist) {
      log("当前环境不支持 persist()")
      return
    }
    navigator.storage.persist().then(function (granted) {
      log(granted
        ? "persist() 返回 true：数据被标记为 persistent"
        : "persist() 返回 false：不是错误，应用继续工作，只是数据仍视为可回收")
      refreshPersisted()
    })
  }

  function opfsSupported() {
    return !!(navigator.storage && typeof navigator.storage.getDirectory === "function")
  }

  async function opfsWrite() {
    if (!opfsSupported()) {
      log("当前环境不支持 OPFS（需要安全上下文，localhost 满足）")
      return
    }
    const root = await navigator.storage.getDirectory()
    const name = "draft-" + Date.now() + ".json"
    const handle = await root.getFileHandle(name, { create: true })
    const writable = await handle.createWritable()
    await writable.write(JSON.stringify({ text: "草稿内容", savedAt: new Date().toISOString() }))
    await writable.close()
    log("OPFS 写入 " + name + "——不暴露磁盘路径，随站点数据清理删除")
    refreshEstimate()
  }

  async function opfsNames() {
    const root = await navigator.storage.getDirectory()
    const names = []
    for await (const name of root.keys()) names.push(name)
    return names.sort()
  }

  async function opfsRead() {
    if (!opfsSupported()) {
      log("当前环境不支持 OPFS")
      return
    }
    const names = (await opfsNames()).filter(function (name) {
      return name.indexOf("draft-") === 0
    })
    if (!names.length) {
      log("还没有草稿文件，先写入一个")
      return
    }
    const latest = names[names.length - 1]
    const root = await navigator.storage.getDirectory()
    const file = await (await root.getFileHandle(latest)).getFile()
    log("读取 " + latest + "（" + fmtBytes(file.size) + "）：" + (await file.text()))
  }

  async function opfsList() {
    if (!opfsSupported()) {
      log("当前环境不支持 OPFS")
      return
    }
    const names = await opfsNames()
    const listEl = document.getElementById("opfs-files")
    listEl.innerHTML = ""
    if (!names.length) {
      var empty = document.createElement("li")
      empty.textContent = "(OPFS 为空)"
      empty.className = "muted"
      listEl.appendChild(empty)
      return
    }
    const root = await navigator.storage.getDirectory()
    for (const name of names) {
      const file = await (await root.getFileHandle(name)).getFile()
      var item = document.createElement("li")
      item.textContent = name + "（" + fmtBytes(file.size) + "）"
      listEl.appendChild(item)
    }
  }

  async function opfsClear() {
    if (!opfsSupported()) {
      log("当前环境不支持 OPFS")
      return
    }
    const names = await opfsNames()
    const root = await navigator.storage.getDirectory()
    for (const name of names) await root.removeEntry(name)
    log("已清空 OPFS 全部 " + names.length + " 个文件")
    refreshEstimate()
    opfsList()
  }

  async function quotaStress() {
    if (!opfsSupported()) {
      log("当前环境不支持 OPFS")
      return
    }
    const root = await navigator.storage.getDirectory()
    const chunk = 10 * 1024 * 1024
    var written = 0
    try {
      for (var i = 0; i < 20; i++) {
        const handle = await root.getFileHandle("stress-" + i + ".bin", { create: true })
        const writable = await handle.createWritable()
        await writable.write(new Blob([new Uint8Array(chunk)]))
        await writable.close()
        written++
        refreshEstimate()
      }
      log("写入 " + written * 10 + "MB 未触发 QuotaExceededError——本机配额很大，真实应用不能据此假设写入一定成功")
    } catch (error) {
      log("写入第 " + (written + 1) + " 块时抛出 " + error.name + "——按数据价值顺序清理：可再生的测试数据最先删")
    }
    for (var j = 0; j < written; j++) {
      try {
        await root.removeEntry("stress-" + j + ".bin")
      } catch (error) {
        // already gone or never created; nothing to recover from
      }
    }
    log("清理完成：压力测试文件已全部删除")
    refreshEstimate()
    opfsList()
  }

  if (!window.isSecureContext) {
    log("当前不是安全上下文：OPFS 等 API 可能不可用（localhost 属于安全上下文）")
  }

  refreshEstimate()
  refreshPersisted()
  opfsList()
</script>
</body>
</html>`

/* ==================== demo ==================== */

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(`[storageManagement] ${req.method} ${req.url}`)
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.end(PAGE)
})

server.on("error", (error) => {
  console.error(`[storageManagement] failed to listen on :${PORT}`, error)
  process.exit(1)
})

server.listen(PORT)

console.log(`storage management demo
  open http://localhost:${PORT} in Chrome or Firefox

experiments:
  - estimate(): approximate usage/quota, reacts to OPFS writes
  - persist(): request persistent storage, observe the boolean result
  - OPFS: write/read/list private origin files, all counted in quota
  - quota stress test: write 10MB chunks until QuotaExceededError
    (200MB safety cap), then clean up by data value`)

export {}
