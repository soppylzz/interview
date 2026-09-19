# Web Components 与 Shadow DOM

Web Components 主要由三部分组成：Custom Elements 定义自定义标签及生命周期；Shadow DOM 提供封装的 DOM 子树；`<template>` 保存可克隆、初始不渲染的内容。

Custom Element 名称必须包含连字符。构造函数中只做基础初始化，连接 DOM、属性变化和移除清理分别使用 connectedCallback、attributeChangedCallback、disconnectedCallback；重复连接时要保证幂等。

Shadow DOM 隔离普通选择器和内部结构，但不是安全边界。CSS custom property 可穿透继承，`:host` 选择宿主，`::part` 暴露明确样式入口。open root 可通过 `shadowRoot` 访问；closed 只隐藏常规引用，不能防御页面自身脚本。

`slot` 把 light DOM 子节点分发到影子树的插槽，节点所有权仍在外部。事件只有在 `composed: true` 时才能跨 Shadow 边界；跨越时 target 可能被 retarget，`composedPath()` 可查看实际传播路径。

Web Components 提供跨框架的浏览器组件契约，框架则通常提供状态、数据流和 SSR 工具。选型需考虑表单关联、可访问性、服务端渲染、样式主题及框架属性/事件互操作，不必二选一。
