# 快速开始

欢迎来到 Vibe Coding 文档！本指南将帮助您快速上手。

## 环境要求

在开始之前，请确保您的系统满足以下要求：

- Node.js >= 16.0.0
- pnpm >= 8.0.0

## 安装

### 1. 克隆项目

```bash
git clone <repository-url>
cd vibe-code-docs
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm run docs:dev
```

启动后，访问 [http://localhost:5173](http://localhost:5173) 即可预览文档。

## 项目结构

```
vibe-code-docs/
├── docs/                      # 文档根目录
│   ├── index.md              # 英文首页
│   ├── zh/                   # 中文文档
│   │   ├── index.md          # 中文首页
│   │   └── guide/            # 中文指南
│   └── .vitepress/           # VitePress 配置
├── package.json              # 项目配置
└── README.md                # 项目说明
```

## 编写文档

### 添加新页面

1. 在相应的语言目录下创建 Markdown 文件
2. 文件会自动被 VitePress 识别并生成路由
3. 可通过文件路径访问对应页面

### 多语言支持

- 中文文档位于 `docs/zh/` 目录
- 英文文档位于 `docs/` 根目录

## 构建与部署

### 构建生产版本

```bash
pnpm run docs:build
```

### 预览构建结果

```bash
pnpm run docs:preview
```

## 下一步

- 查看 [Markdown 示例](/zh/markdown-examples) 学习文档编写
- 了解 [API 示例](/zh/api-examples) 掌握高级功能
