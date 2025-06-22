# 运行时 API 示例

此页面演示了一些 VitePress 运行时 API 的使用。

主要的 `useData()` API 可以用来访问当前页面的站点、主题和页面数据。它在 `.md` 和 `.vue` 文件中都有效：

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面 Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面 Frontmatter
<pre>{{ frontmatter }}</pre>

## 更多

查看文档了解 [完整的运行时 API 列表](https://vitepress.dev/reference/runtime-api#usedata)。
