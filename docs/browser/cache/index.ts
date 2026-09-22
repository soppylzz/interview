import { createServer, type IncomingMessage, type ServerResponse } from "node:http"

/* ==================== config ==================== */

const PORT = 5003

/* ==================== cache-controlled assets ==================== */

type Asset = {
  name: string
  policy: string
  etag: boolean
  lastModified: boolean
}

// fixed epoch so each version maps to one deterministic Last-Modified
const LAST_MODIFIED_EPOCH = Date.UTC(2026, 0, 1)

const ASSETS: Asset[] = [
  { name: "fresh.svg", policy: "public, max-age=60", etag: true, lastModified: false },
  { name: "short-fresh.svg", policy: "max-age=1", etag: true, lastModified: true },
  { name: "no-cache.svg", policy: "no-cache", etag: true, lastModified: false },
  { name: "last-modified.svg", policy: "no-cache", etag: false, lastModified: true },
  { name: "no-store.svg", policy: "no-store", etag: false, lastModified: false },
]

const assetByName = new Map(ASSETS.map((asset) => [asset.name, asset]))
const versions = new Map<string, number>()

function versionOf(asset: Asset): number {
  return versions.get(asset.name) ?? 1
}

function etagOf(asset: Asset): string {
  return `"${asset.name}-v${versionOf(asset)}"`
}

function lastModifiedOf(asset: Asset): string {
  return new Date(LAST_MODIFIED_EPOCH + versionOf(asset) * 1000).toUTCString()
}

// the rendered version doubles as observable content: a stale cache shows stale text
function assetSvg(asset: Asset): string {
  const version = versionOf(asset)
  const hue = (version * 67) % 360
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="44">` +
    `<rect width="150" height="44" rx="8" fill="hsl(${hue},70%,88%)" stroke="hsl(${hue},55%,38%)" stroke-width="2"/>` +
    `<text x="75" y="27" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" ` +
    `fill="hsl(${hue},55%,28%)">${asset.name} v${version}</text>` +
    `</svg>`
  )
}

/* ==================== conditional request handling ==================== */

function logRequest(req: IncomingMessage, status: number, note: string): void {
  console.log(`[cache-lab] ${req.method} ${req.url} -> ${status} ${note}`)
}

function validatorNote(req: IncomingMessage): string {
  const parts: string[] = []
  if (req.headers["if-none-match"]) parts.push(`If-None-Match: ${req.headers["if-none-match"]}`)
  if (req.headers["if-modified-since"]) {
    parts.push(`If-Modified-Since: ${req.headers["if-modified-since"]}`)
  }
  return parts.length ? `(${parts.join(", ")})` : "(first visit or bypassed cache)"
}

// If-None-Match takes precedence over If-Modified-Since
function clientHasCurrentValidator(
  req: IncomingMessage,
  etag: string,
  lastModified: string
): boolean {
  const ifNoneMatch = req.headers["if-none-match"]
  if (ifNoneMatch !== undefined) {
    return ifNoneMatch.split(",").some((candidate) => candidate.trim().replace(/^W\//, "") === etag)
  }
  const ifModifiedSince = req.headers["if-modified-since"]
  if (ifModifiedSince === undefined) return false
  const seen = Date.parse(ifModifiedSince)
  return Number.isFinite(seen) && seen >= Date.parse(lastModified)
}

function serveAsset(req: IncomingMessage, res: ServerResponse, asset: Asset): void {
  const etag = etagOf(asset)
  const lastModified = lastModifiedOf(asset)
  const headers: Record<string, string> = {
    "Cache-Control": asset.policy,
    "Content-Type": "image/svg+xml",
  }
  if (asset.etag) headers["ETag"] = etag
  if (asset.lastModified) headers["Last-Modified"] = lastModified

  if (clientHasCurrentValidator(req, etag, lastModified)) {
    res.writeHead(304, headers)
    res.end()
    logRequest(req, 304, validatorNote(req))
    return
  }
  res.writeHead(200, headers)
  res.end(assetSvg(asset))
  logRequest(req, 200, validatorNote(req))
}

// documents use no-cache like real entry HTML: stored, but revalidated on every reuse
function serveDocument(
  req: IncomingMessage,
  res: ServerResponse,
  html: string,
  etag: string
): void {
  const headers = {
    "Cache-Control": "no-cache",
    ETag: etag,
    "Content-Type": "text/html; charset=utf-8",
  }
  const ifNoneMatch = req.headers["if-none-match"]
  if (ifNoneMatch !== undefined && ifNoneMatch.split(",").some((c) => c.trim() === etag)) {
    res.writeHead(304, headers)
    res.end()
    logRequest(req, 304, `(document revalidated, ${etag})`)
    return
  }
  res.writeHead(200, headers)
  res.end(html)
  logRequest(req, 200, "(document: stored with no-cache, revalidated on next reuse)")
}

function sendJson(res: ServerResponse, data: unknown, status = 200): void {
  res.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  })
  res.end(JSON.stringify(data))
}

/* ==================== pages ==================== */

// client-side logic only; no template literals inside so the TS file needs no escaping
const STYLES = `
  body { font-family: system-ui, sans-serif; max-width: 860px; margin: 32px auto; padding: 0 16px; line-height: 1.7; color: #343a40; }
  .card { border: 1px solid #dee2e6; border-radius: 8px; padding: 14px 20px; margin: 16px 0; }
  .muted { color: #868e96; font-size: 14px; }
  code { background: #f1f3f5; padding: 1px 5px; border-radius: 4px; }
  button { margin: 2px 4px 2px 0; padding: 4px 10px; cursor: pointer; }
  .table-wrap { overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; font-size: 14px; }
  th, td { border: 1px solid #dee2e6; padding: 6px 10px; text-align: left; vertical-align: middle; }
  th { background: #f8f9fa; }
  img { vertical-align: middle; }
  ul, ol { padding-left: 20px; }
  #probe-log, #log { margin: 8px 0 0; padding-left: 20px; font-size: 14px; }
  #probe-log li, #log li { margin: 2px 0; }
  .v-reuse { color: #2b8a3e; font-weight: 600; }
  .v-revalidate { color: #f08c00; font-weight: 600; }
  .v-download { color: #1971c2; font-weight: 600; }
  a { color: #1971c2; }
`

const LAB_PAGE = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>HTTP Cache Demo — 复用情况观察</title>
<style>${STYLES}</style>
</head>
<body>
<h1>HTTP Cache Lab</h1>
<p class="muted">本页是一个按真实部署策略缩小的站点：文档本身用 <code>no-cache</code>（每次复用前都重新验证），
下方五张图片各持一种缓存策略。终端会打印每一个真正到达服务器的请求；
在 Network 面板显示 <code>(memory cache)</code> / <code>(disk cache)</code> 的资源<strong>根本不会出现在终端</strong>。</p>

<div class="card">
  <p><strong>观察步骤</strong></p>
  <ol>
    <li>首次加载：五个资源全部是 200 完整下载（终端逐条打印）。</li>
    <li>按 <code>F5</code> 普通刷新：fresh 的资源本地复用（终端安静）；<code>no-cache</code> 资源发条件请求拿 <code>304</code>；<code>no-store</code> 资源重新完整下载。</li>
    <li>在下方把某个资源的服务器版本改掉，再普通刷新：<code>no-cache.svg</code> 立刻拿到新 200；<code>fresh.svg</code> 仍然本地复用旧版本——这正是强缓存的代价。</li>
    <li>等 1 秒再刷新，看 <code>max-age=1</code> 的资源从「本地复用」变成「304 协商」。</li>
    <li>硬刷新（<code>Cmd/Ctrl+Shift+R</code>）或勾选 Network 的 Disable cache：全部绕过缓存。Chrome 与 Firefox 的普通刷新策略不同，可分别对比。</li>
  </ol>
</div>

<div class="card">
  <p><strong>五种策略的复用情况</strong>
  <span class="muted">（判定来自 PerformanceResourceTiming：<code>transferSize=0</code> 即没有网络传输；有传输但 body 为 0 即 304）</span>
  <button onclick="refreshTable()">重新观察</button></p>
  <div class="table-wrap">
  <table id="cache-table">
    <thead><tr><th>资源</th><th>响应策略</th><th>状态</th><th>transferSize</th><th>bodySize</th><th>判定</th></tr></thead>
    <tbody>
      <tr data-name="fresh.svg"><td><img src="/assets/fresh.svg" alt="fresh asset" width="150" height="44"></td><td><code>public, max-age=60</code></td><td class="obs-status">…</td><td class="obs-transfer">…</td><td class="obs-body">…</td><td class="obs-verdict">…</td></tr>
      <tr data-name="short-fresh.svg"><td><img src="/assets/short-fresh.svg" alt="short fresh asset" width="150" height="44"></td><td><code>max-age=1</code> + ETag</td><td class="obs-status">…</td><td class="obs-transfer">…</td><td class="obs-body">…</td><td class="obs-verdict">…</td></tr>
      <tr data-name="no-cache.svg"><td><img src="/assets/no-cache.svg" alt="no-cache asset" width="150" height="44"></td><td><code>no-cache</code> + ETag</td><td class="obs-status">…</td><td class="obs-transfer">…</td><td class="obs-body">…</td><td class="obs-verdict">…</td></tr>
      <tr data-name="last-modified.svg"><td><img src="/assets/last-modified.svg" alt="last-modified asset" width="150" height="44"></td><td><code>no-cache</code> + Last-Modified</td><td class="obs-status">…</td><td class="obs-transfer">…</td><td class="obs-body">…</td><td class="obs-verdict">…</td></tr>
      <tr data-name="no-store.svg"><td><img src="/assets/no-store.svg" alt="no-store asset" width="150" height="44"></td><td><code>no-store</code></td><td class="obs-status">…</td><td class="obs-transfer">…</td><td class="obs-body">…</td><td class="obs-verdict">…</td></tr>
    </tbody>
  </table>
  </div>
  <p class="muted">memory cache 与 disk cache 是浏览器内部存储层的实现细节：同一资源落在哪一层、保存多久都由浏览器决定；
  HTTP 语义层面只有「未验证复用 / 验证后复用 / 新响应」三种结果。</p>
</div>

<div class="card">
  <p><strong>修改服务器上的资源内容</strong>
  <span class="muted">（版本只改在服务器：刷新页面观察谁拿到新版本、谁还在用旧缓存）</span></p>
  <p>
    <button onclick="bump('fresh.svg')">fresh.svg <span id="ver-fresh.svg">v?</span></button>
    <button onclick="bump('short-fresh.svg')">short-fresh.svg <span id="ver-short-fresh.svg">v?</span></button>
    <button onclick="bump('no-cache.svg')">no-cache.svg <span id="ver-no-cache.svg">v?</span></button>
    <button onclick="bump('last-modified.svg')">last-modified.svg <span id="ver-last-modified.svg">v?</span></button>
    <button onclick="bump('no-store.svg')">no-store.svg <span id="ver-no-store.svg">v?</span></button>
  </p>
</div>

<div class="card">
  <p><strong>fetch 的 cache 选项</strong>
  <span class="muted">（对 <code>fresh.svg</code> 发起 fetch，不同 cache 选项表达不同的缓存意图，看终端确认谁真的发了请求）</span></p>
  <p>
    <button onclick="probe('default')">cache: default</button>
    <button onclick="probe('no-store')">cache: no-store</button>
    <button onclick="probe('no-cache')">cache: no-cache</button>
    <button onclick="probe('force-cache')">cache: force-cache</button>
    <button onclick="probe('only-if-cached')">cache: only-if-cached</button>
  </p>
  <p class="muted">推荐玩法：先修改 <code>fresh.svg</code> 的服务器版本，再依次点 force-cache（无网络请求、返回旧版本）和
  no-cache（条件请求拿到新版本 200），对比「强制用缓存」与「强制验证」。</p>
  <ul id="probe-log"></ul>
</div>

<script>
  var TABLE = document.getElementById("cache-table")
  var PROBE_LOG = document.getElementById("probe-log")

  function logProbe(message) {
    var item = document.createElement("li")
    item.textContent = message
    PROBE_LOG.prepend(item)
    while (PROBE_LOG.children.length > 30) PROBE_LOG.removeChild(PROBE_LOG.lastElementChild)
  }

  function latestEntry(name) {
    var list = performance.getEntriesByType("resource").filter(function (entry) {
      return entry.name.indexOf("/assets/" + name) !== -1
    })
    return list.length ? list[list.length - 1] : null
  }

  function fillCell(row, cls, text) {
    row.querySelector("." + cls).textContent = text
  }

  function refreshTable() {
    var rows = TABLE.querySelectorAll("tr[data-name]")
    Array.prototype.forEach.call(rows, function (row) {
      var name = row.getAttribute("data-name")
      var entry = latestEntry(name)
      var verdict = row.querySelector(".obs-verdict")
      if (!entry) {
        fillCell(row, "obs-status", "-")
        fillCell(row, "obs-transfer", "-")
        fillCell(row, "obs-body", "-")
        verdict.textContent = "尚未观察到加载"
        verdict.className = "obs-verdict"
        return
      }
      fillCell(row, "obs-status", entry.responseStatus ? String(entry.responseStatus) : "-")
      fillCell(row, "obs-transfer", String(entry.transferSize))
      fillCell(row, "obs-body", String(entry.encodedBodySize))
      if (entry.transferSize === 0) {
        verdict.textContent = "本地复用（强缓存，无网络）"
        verdict.className = "obs-verdict v-reuse"
      } else if (entry.encodedBodySize === 0) {
        verdict.textContent = "304 协商复用（body 未传输）"
        verdict.className = "obs-verdict v-revalidate"
      } else {
        verdict.textContent = "200 新响应（完整下载）"
        verdict.className = "obs-verdict v-download"
      }
    })
  }

  function refreshVersions() {
    fetch("/api/versions")
      .then(function (res) { return res.json() })
      .then(function (data) {
        Object.keys(data).forEach(function (name) {
          var el = document.getElementById("ver-" + name)
          if (el) el.textContent = "v" + data[name]
        })
      })
  }

  function bump(name) {
    fetch("/api/bump?asset=" + name, { method: "POST" })
      .then(function (res) { return res.json() })
      .then(function (data) {
        var el = document.getElementById("ver-" + name)
        if (el) el.textContent = "v" + data.version
        logProbe("服务器把 " + name + " 改成了 v" + data.version + "——现在刷新页面，看谁拿到新版本")
      })
  }

  function probe(mode) {
    var init = { cache: mode }
    if (mode === "only-if-cached") init.mode = "same-origin"
    fetch("/assets/fresh.svg", init)
      .then(function (res) {
        return res.text().then(function () {
          var etag = res.headers.get("ETag") || ""
          var match = etag.match(/v(\\d+)/)
          var entry = latestEntry("fresh.svg")
          var network = entry && entry.transferSize > 0 ? "走了网络" : "没走网络（本地复用）"
          logProbe("cache=" + mode + " → HTTP " + res.status + (match ? "，拿到 v" + match[1] : "") + "，" + network)
          refreshTable()
        })
      })
      .catch(function (error) {
        logProbe("cache=" + mode + " → 失败：" + error.message)
      })
  }

  window.addEventListener("pageshow", refreshTable)
  refreshTable()
  refreshVersions()
</script>
</body>
</html>`

const BFCACHE_PAGE = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>BFCache Demo — 后退/前进复用观察</title>
<style>${STYLES}</style>
</head>
<body>
<h1>BFCache Lab</h1>
<p class="muted">这一页观察 back/forward cache：后退导航到底复用了什么。页面离开时可能被整体存入 BFCache；
返回时要么<strong>整页快照恢复</strong>（JS 状态原样，连 HTTP cache 都不参与），要么<strong>重新初始化</strong>（此时文档和图片才走 HTTP cache）。</p>

<div class="card">
  <p><strong>当前执行状态</strong>
  <span class="muted">（执行 ID 在每次全新初始化时变化；BFCache 恢复时保持不变）</span></p>
  <p>执行 ID：<strong id="exec-id"></strong></p>
  <p>内存计数器：<strong id="counter">0</strong> <button onclick="addCount()">+1</button></p>
  <p>未提交草稿：<input id="draft" placeholder="随便输入一点内容"> <span class="muted">BFCache 恢复时输入框原样保留</span></p>
  <p><img src="/assets/fresh.svg" alt="cache probe" width="150" height="44">
  <span class="muted">这张图走 HTTP cache；BFCache 命中时它根本不会重新加载，终端不会有请求</span></p>
</div>

<div class="card">
  <p><strong>操作</strong></p>
  <p>1. 在草稿框输入文本、点几次计数器。</p>
  <p>2. <a href="/between">前往中间页 /between</a>，到达后按浏览器的「后退」键返回本页。</p>
  <p id="unload-toggle"></p>
</div>

<div class="card">
  <p><strong>生命周期日志</strong>
  <span class="muted">（<code>persisted=true</code> 即与 BFCache 有关；BFCache 恢复时下面的旧日志原样保留——DOM 本身就是快照）</span></p>
  <ul id="log"></ul>
</div>

<script>
  var params = new URLSearchParams(location.search)
  var hasUnload = params.has("unload")
  var execId = "exec-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 10000)
  var counter = 0
  var LOG = document.getElementById("log")

  function log(message) {
    var item = document.createElement("li")
    item.textContent = message
    LOG.prepend(item)
    while (LOG.children.length > 40) LOG.removeChild(LOG.lastElementChild)
  }

  function navType() {
    var entry = performance.getEntriesByType("navigation")[0]
    return entry ? entry.type : "unknown"
  }

  function refreshState() {
    document.getElementById("exec-id").textContent = execId
    document.getElementById("counter").textContent = String(counter)
  }

  function addCount() {
    counter++
    refreshState()
  }

  window.addEventListener("pageshow", function (event) {
    var type = navType()
    log("pageshow：persisted=" + event.persisted + "，导航类型=" + type +
      (hasUnload ? "（本页注册了 unload 监听）" : ""))
    if (event.persisted) {
      log("整页从 BFCache 恢复：执行 ID、计数器、草稿、日志都是离开前的样子，期间没有任何网络请求")
    } else if (type === "back_forward") {
      var entry = performance.getEntriesByType("navigation")[0]
      var reasons = entry && entry.notRestoredReasons
      if (reasons) {
        log("BFCache 未命中。notRestoredReasons=" + JSON.stringify(reasons))
      } else {
        log("BFCache 未命中（浏览器未提供 notRestoredReasons）：页面重新初始化了——" +
          "注意执行 ID 已变化，文档与图片这次走了 HTTP cache，看终端的 304")
      }
    }
    refreshState()
  })

  window.addEventListener("pagehide", function (event) {
    log("pagehide：persisted=" + event.persisted +
      (event.persisted ? "（离开的页面已存入 BFCache）" : ""))
  })

  if (hasUnload) window.addEventListener("unload", function () {})

  document.getElementById("unload-toggle").innerHTML = hasUnload
    ? '<a href="/bfcache">移除 unload 监听（换回无 unload 版本）</a>' +
      '<span class="muted"> 当前已注册 unload——部分浏览器会因此拒绝进入 BFCache</span>'
    : '<a href="/bfcache?unload=1">注册 unload 监听（常见 BFCache 阻碍因素）</a>'

  log("页面初始化完成：执行 ID " + execId)
  refreshState()
</script>
</body>
</html>`

const BETWEEN_PAGE = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>中间页</title>
<style>${STYLES}</style>
</head>
<body>
<h1>中间页</h1>
<p>你已离开 BFCache 实验页。现在按浏览器的「后退」键返回它，然后对照实验页上的日志：</p>
<div class="card">
  <p><strong>BFCache 命中</strong>：执行 ID、计数器、草稿、日志全部保持原样，本机终端没有出现任何新请求——整页快照恢复。</p>
  <p><strong>BFCache 未命中</strong>：实验页重新初始化（执行 ID 变了），它的文档与图片重新走 HTTP cache——终端出现条件请求 304 或直接复用。</p>
</div>
<p class="muted">本页与实验页的文档都带 <code>Cache-Control: no-cache</code>——这只约束 HTTP cache；
BFCache 保存的是整页运行状态，与这个头部无关，两种缓存作用在不同对象上。</p>
<p><a href="/bfcache">用「前进」回实验页（同样是一次历史导航）</a></p>
</body>
</html>`

/* ==================== demo ==================== */

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`)
  const pathname = url.pathname

  if (req.method === "GET" && pathname === "/") {
    serveDocument(req, res, LAB_PAGE, '"doc-lab-v1"')
    return
  }
  if (req.method === "GET" && pathname === "/bfcache") {
    serveDocument(req, res, BFCACHE_PAGE, '"doc-bfcache-v1"')
    return
  }
  if (req.method === "GET" && pathname === "/between") {
    serveDocument(req, res, BETWEEN_PAGE, '"doc-between-v1"')
    return
  }

  if (req.method === "GET" && pathname.startsWith("/assets/")) {
    const asset = assetByName.get(pathname.slice("/assets/".length))
    if (asset) {
      serveAsset(req, res, asset)
      return
    }
  }

  if (req.method === "POST" && pathname === "/api/bump") {
    const name = url.searchParams.get("asset") ?? ""
    const asset = assetByName.get(name)
    if (!asset) {
      sendJson(res, { error: `unknown asset: ${name}` }, 400)
      return
    }
    const version = versionOf(asset) + 1
    versions.set(name, version)
    console.log(
      `[cache-lab] bump ${name} -> v${version} (server content changed; caches do not know yet)`
    )
    sendJson(res, { name, version })
    return
  }

  if (req.method === "GET" && pathname === "/api/versions") {
    const data: Record<string, number> = {}
    for (const asset of ASSETS) data[asset.name] = versionOf(asset)
    sendJson(res, data)
    return
  }

  if (pathname === "/favicon.ico") {
    res.writeHead(204)
    res.end()
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
  res.end("not found")
  logRequest(req, 404, "")
})

server.on("error", (error) => {
  if ((error as NodeJS.ErrnoException).code === "EADDRINUSE") {
    console.error(
      `[cache-lab] port :${PORT} is taken — a previous instance of this demo is probably still running`
    )
    console.error(`[cache-lab] find it with: lsof -nP -i :${PORT}   then: kill <PID>`)
    process.exit(1)
  }
  console.error(`[cache-lab] failed to listen on :${PORT}`, error)
  process.exit(1)
})

server.listen(PORT)

console.log(`http cache + bfcache demo
  lab      http://localhost:${PORT}/
  bfcache  http://localhost:${PORT}/bfcache

1. open the lab, then reload with F5 and watch the Network Size column
   next to the terminal: strong-cache hits never reach this server,
   no-cache assets come back as 304, no-store downloads fully every time
2. bump an asset's version on the server, reload, and compare:
   no-cache flips to a fresh 200 while max-age=60 keeps serving the old body
3. try the fetch cache-mode buttons (force-cache vs no-cache after a bump)
4. open /bfcache, change some state, walk to /between, come back with the
   browser Back button: persisted=true means the whole page resumed with
   zero requests; also try /bfcache?unload=1 to register a known blocker

notes:
  - normal vs hard reload and Disable cache bypass different amounts of
    cache per browser; compare Chrome and Firefox
  - Chrome may disable bfcache while DevTools is open: if every back
    navigation misses, close DevTools or use the Application panel's
    Back/forward cache test`)

export {}
