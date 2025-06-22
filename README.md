# Vibe Coding Docs

[![VitePress](https://img.shields.io/badge/VitePress-1.6.3-blue)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5.17-green)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

> 基于 VitePress 构建的现代文档网站，支持中英双语，集成 AI 辅助开发功能。

## 🌟 项目特色

- 📝 **现代文档体验** - 基于 VitePress 构建，提供快速、优雅的文档浏览体验
- 🌍 **国际化支持** - 内置中英双语支持，轻松创建多语言文档
- 🤖 **AI 集成** - 集成 VS Code Copilot MCP Server，提供智能开发辅助
- ⚡ **快速开发** - 基于 Vite 的热重载，实时预览文档修改
- 📱 **响应式设计** - 完美适配桌面端和移动端

## 📦 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - 静态站点生成器
- **前端**: [Vue 3](https://vuejs.org/) - 现代前端框架
- **包管理**: [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器
- **AI 工具**: [@vscode/copilot-mcp-server](https://www.npmjs.com/package/@vscode/copilot-mcp-server) - VS Code Copilot 集成

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/[你的用户名]/vibe-code-docs.git
cd vibe-code-docs

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm run docs:dev
```

启动后，访问 http://localhost:5173 即可预览文档。

### 构建项目

```bash
# 构建生产版本
pnpm run docs:build
```

构建完成后，生成的静态文件将位于 `docs/.vitepress/dist/` 目录。

### 预览构建结果

```bash
# 预览构建后的网站
pnpm run docs:preview
```

## 🚀 GitHub Pages 部署

本项目已配置自动部署到 GitHub Pages：

### 自动部署

1. 推送代码到 `main` 分支
2. GitHub Actions 会自动构建并部署到 GitHub Pages
3. 网站将在 `https://[你的用户名].github.io/vibe-code-docs/` 可访问

### 手动触发部署

在 GitHub 仓库的 `Actions` 标签页，可以手动触发 "Deploy VitePress site to Pages" 工作流。

### 配置 GitHub Pages

1. 进入仓库设置页面
2. 在左侧菜单找到 `Pages`
3. 在 `Source` 部分选择 `GitHub Actions`
4. 保存设置

## 📂 项目结构

```
vibe-code-docs/
├── docs/                      # 文档根目录
│   ├── index.md              # 首页
│   ├── api-examples.md       # API 示例
│   ├── markdown-examples.md  # Markdown 示例
│   ├── en/                   # 英文文档
│   │   └── guide/
│   │       └── getting-started.md
│   └── zh/                   # 中文文档
│       └── guide/
│           └── getting-started.md
├── package.json              # 项目配置
├── pnpm-lock.yaml           # 依赖锁定文件
└── README.md                # 项目说明
```

## 📚 使用指南

### 添加新页面

1. 在相应的语言目录下创建 Markdown 文件
2. 文件会自动被 VitePress 识别并生成路由
3. 可通过文件路径访问对应页面

### 多语言配置

项目支持中英双语：
- 中文文档位于 `docs/zh/` 目录
- 英文文档位于 `docs/en/` 目录

### AI 辅助开发

项目集成了 Copilot MCP Server，可以在 VS Code 中获得智能代码建议和文档编写辅助。

```bash
# 启动 MCP 服务
pnpm run mcp:dev
```

## 🛠 可用脚本

| 命令 | 描述 |
|------|------|
| `pnpm run docs:dev` | 启动开发服务器 |
| `pnpm run docs:build` | 构建生产版本 |
| `pnpm run docs:preview` | 预览构建结果 |
| `pnpm run mcp:dev` | 启动 Copilot MCP Server |

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 开发规范

- 使用 pnpm 作为包管理器
- 遵循 Vue 3 和 VitePress 的最佳实践
- 保持中英文档同步更新
- 确保代码格式化和规范

## 🐛 问题反馈

如果你发现了 bug 或有功能建议，欢迎：

- 提交 [Issues](../../issues)
- 发起 [Pull Request](../../pulls)
- 联系项目维护者

## 📄 许可证

本项目基于 [ISC License](LICENSE) 开源。

## 🔗 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

⭐ 如果这个项目对你有帮助，别忘了给它一个 Star！
