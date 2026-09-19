# 表单基础

form 的 action 是提交目标，method 常用 GET/POST，enctype 决定编码。GET 把成功控件序列化进 URL，适合可分享查询；包含文件通常使用 POST 与 multipart/form-data。

控件必须有 name 才会进入原生提交。disabled 控件不可交互且通常不提交；readonly 保留值并可提交。label 通过 for/id 或包裹控件建立名称和更大点击区域；fieldset/legend 组织一组相关控件。

input type 提供 email、number、date、file 等原生行为，并可影响移动键盘，但不同浏览器 UI 有差异。button 在 form 内默认可能是 submit，非提交按钮应显式 `type="button"`。

按 Enter 可能触发表单隐式提交。业务应监听 form 的 submit，而不是只监听按钮 click，才能覆盖键盘与辅助技术路径。
