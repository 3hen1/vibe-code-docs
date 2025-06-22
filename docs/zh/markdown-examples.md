# Markdown 扩展示例

此页面演示了 VitePress 提供的一些内置 markdown 扩展。

## 语法高亮

VitePress 使用 [Shiki](https://github.com/shikijs/shiki) 提供语法高亮，支持各种编程语言。

**输入:**

````markdown
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

**输出:**

```js
export default {
  name: 'MyComponent',
  // ...
}
```

## 自定义容器

**输入:**

```markdown
::: info 信息
这是一个信息框。
:::

::: tip 提示
这是一个提示。
:::

::: warning 警告
这是一个警告。
:::

::: danger 危险
这是一个危险警告。
:::

::: details 点击查看详情
这是一个详情块。
:::
```

**输出:**

::: info 信息
这是一个信息框。
:::

::: tip 提示
这是一个提示。
:::

::: warning 警告
这是一个警告。
:::

::: danger 危险
这是一个危险警告。
:::

::: details 点击查看详情
这是一个详情块。
:::

## 更多

查看 [VitePress 官方文档](https://vitepress.dev/) 了解完整的 markdown 扩展列表。
