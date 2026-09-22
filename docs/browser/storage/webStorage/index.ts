import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http"

/* ==================== config ==================== */

const PORT = 4000

/* ==================== page ==================== */

// the interesting logic is client-side: keep this page free of template literals
// so the server file needs no escaping inside the TS template
const PAGE = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>Web Storage 差异 Demo — localStorage vs sessionStorage</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 720px; margin: 32px auto; padding: 0 16px; line-height: 1.7; color: #343a40; }
  .card { border: 1px solid #dee2e6; border-radius: 8px; padding: 14px 20px; margin: 16px 0; }
  .muted { color: #868e96; font-size: 14px; }
  code { background: #f1f3f5; padding: 1px 5px; border-radius: 4px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #dee2e6; padding: 4px 10px; text-align: left; font-size: 14px; }
  td code { word-break: break-all; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 560px) { .cols { grid-template-columns: 1fr; } }
  button { margin: 2px 4px 2px 0; padding: 4px 10px; cursor: pointer; }
  input { padding: 3px 6px; }
  #log { margin: 0; padding-left: 20px; font-size: 14px; }
  #log li { margin: 2px 0; }
</style>
</head>
<body>
<h1>Web Storage 差异 Demo</h1>
<p class="muted">本标签 ID：<strong id="tab-id"></strong>（存在 sessionStorage 里——刷新不变，新标签页会变）</p>

<div class="card">
  <p><strong>建议实验步骤</strong></p>
  <ol class="muted">
    <li>分别向 localStorage 和 sessionStorage 各写入一条数据（API 完全相同）。</li>
    <li>点击「重新加载本页」——两者都还在：sessionStorage 的生命周期是页面会话，不是页面。</li>
    <li>点击「打开第二个标签页」——新标签能看到全部 localStorage，sessionStorage 却是空的：它按标签页隔离。</li>
    <li>回到旧标签再写一条 localStorage，切到新标签看事件日志：storage 事件只发给其他标签，且只对 localStorage 生效；写 sessionStorage 时谁也收不到。</li>
    <li>关闭新标签重新打开，或关掉浏览器再访问本页——sessionStorage 已清空，localStorage 仍在：生命周期差异。</li>
  </ol>
</div>

<div class="card">
  <p><strong>读写操作</strong> <span class="muted">（key/value 均为字符串，对象需自行 JSON 序列化）</span></p>
  <p>
    <input id="key" placeholder="key，如 theme" size="14">
    <input id="value" placeholder="value，如 dark" size="20">
  </p>
  <p>
    <button onclick="saveTo('local')">写入 localStorage</button>
    <button onclick="saveTo('session')">写入 sessionStorage</button>
    <button onclick="removeKey()">删除两种存储中该 key</button>
    <button onclick="clearBoth()">清空两者</button>
  </p>
  <p>
    <button onclick="reloadPage()">重新加载本页</button>
    <button onclick="openTab()">打开第二个标签页</button>
    <button onclick="testQuota()">写入 6MB 触发配额错误</button>
  </p>
</div>

<div class="card">
  <div class="cols">
    <div>
      <p><strong>localStorage 内容</strong> <span class="muted">(同 origin 所有标签共享)</span></p>
      <table><tbody id="local-rows"></tbody></table>
    </div>
    <div>
      <p><strong>sessionStorage 内容</strong> <span class="muted">(仅本标签可见)</span></p>
      <table><tbody id="session-rows"></tbody></table>
    </div>
  </div>
</div>

<div class="card">
  <p><strong>事件日志</strong> <span class="muted">(storage 事件只在“其他标签页”触发，发起修改的标签不会收到)</span></p>
  <ul id="log"></ul>
</div>

<p class="muted">注：通过 window.open 保留 opener 打开的新页面，部分浏览器会初始复制一份 sessionStorage，之后两边独立修改；两者都只存字符串、约 5MB 配额、同步阻塞主线程，且只存在于客户端，不会随 HTTP 请求发送。</p>

<script>
  var logEl = document.getElementById("log")
  var tabIdEl = document.getElementById("tab-id")

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
  }

  function log(message) {
    var item = document.createElement("li")
    item.textContent = message
    logEl.prepend(item)
    while (logEl.children.length > 30) logEl.removeChild(logEl.lastElementChild)
  }

  function tabId() {
    var id = sessionStorage.getItem("tabId")
    if (!id) {
      id = crypto.randomUUID().slice(0, 8)
      sessionStorage.setItem("tabId", id)
    }
    return id
  }

  function rows(storage) {
    var html = ""
    for (var i = 0; i < storage.length; i++) {
      var key = storage.key(i)
      html += "<tr><td>" + esc(key) + "</td><td><code>" + esc(storage.getItem(key)) + "</code></td></tr>"
    }
    return html || '<tr><td colspan="2" class="muted">(空)</td></tr>'
  }

  function render() {
    tabIdEl.textContent = tabId()
    document.getElementById("local-rows").innerHTML = rows(localStorage)
    document.getElementById("session-rows").innerHTML = rows(sessionStorage)
  }

  function storageOf(kind) {
    return kind === "local" ? localStorage : sessionStorage
  }

  // not "write": inline onclick resolves against document before window, so document.write would win
  function saveTo(kind) {
    var key = document.getElementById("key").value.trim()
    var value = document.getElementById("value").value
    var name = kind === "local" ? "localStorage" : "sessionStorage"
    if (!key) {
      log("请先输入 key")
      return
    }
    try {
      storageOf(kind).setItem(key, value)
      log("本标签写入 " + name + "[" + key + "] = " + value)
      render()
    } catch (error) {
      log("写入 " + name + " 失败：" + error)
    }
  }

  function removeKey() {
    var key = document.getElementById("key").value.trim()
    if (!key) {
      log("请先输入 key")
      return
    }
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
    log("本标签从两种存储中删除 " + key)
    render()
  }

  function clearBoth() {
    localStorage.clear()
    sessionStorage.clear()
    log("本标签清空两种存储（其他标签会收到 key=null 的 storage 事件）")
    render()
  }

  function testQuota() {
    try {
      localStorage.setItem("__big", "x".repeat(6 * 1024 * 1024))
      localStorage.removeItem("__big")
      log("写入约 6MB 竟然成功——本浏览器配额较大，试着加大到 50MB？")
    } catch (error) {
      log("写入约 6MB 抛出 " + error.name + "：超出配额，setItem 未生效")
    }
  }

  function reloadPage() {
    location.reload()
  }

  function openTab() {
    window.open(location.href, "_blank")
    log("已打开第二个标签页：去新标签对比两个表格，再在新标签里写入试试")
  }

  window.addEventListener("storage", function (event) {
    var area = event.storageArea === localStorage ? "localStorage" : "sessionStorage"
    var key = event.key === null ? "(clear)" : event.key
    log("收到其他标签的 storage 事件：" + area + "[" + key + "] " + event.oldValue + " → " + event.newValue)
    render()
  })

  render()
</script>
</body>
</html>`

/* ==================== demo ==================== */

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(`[webStorage] ${req.method} ${req.url}`)
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.end(PAGE)
})

server.on("error", (error) => {
  console.error(`[webStorage] failed to listen on :${PORT}`, error)
  process.exit(1)
})

server.listen(PORT)

console.log(`web storage demo
  open http://localhost:${PORT} in Chrome or Firefox

the whole demo runs in the browser:
  1. write a value into each storage
  2. reload this page (both survive)
  3. open a second tab (localStorage shared, sessionStorage empty)
  4. write again and watch the storage event arrive only in the other tab
  5. close tabs or restart the browser (sessionStorage is gone)`)

export {}
