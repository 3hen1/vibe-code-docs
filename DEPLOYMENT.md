# GitHub 部署指南

本文档介绍如何将 Vibe Code Docs 项目部署到 GitHub Pages。

## 前提条件

- 拥有 GitHub 账户
- 本地已安装 Git
- 项目代码已准备就绪

## 部署步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称设置为：`vibe-code-docs`
4. 选择 "Public"（GitHub Pages 免费版需要公开仓库）
5. 不要勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

### 2. 连接本地仓库到 GitHub

```bash
# 添加远程仓库（替换 [username] 为你的 GitHub 用户名）
git remote add origin https://github.com/[username]/vibe-code-docs.git

# 推送代码到 GitHub
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 4. 等待部署完成

- 推送代码后，GitHub Actions 会自动开始构建
- 在 "Actions" 标签页可以查看部署进度
- 首次部署通常需要 2-5 分钟
- 部署完成后，网站将在以下地址可访问：
  ```
  https://[username].github.io/vibe-code-docs/
  ```

### 5. 验证部署

1. 等待 GitHub Actions 工作流完成（绿色勾选标记）
2. 访问部署的网站 URL
3. 检查所有页面和链接是否正常工作

## 自动化部署

项目已配置自动部署，每次推送到 `main` 分支时：

1. GitHub Actions 会自动触发构建
2. 使用 VitePress 构建静态网站
3. 自动部署到 GitHub Pages

## 故障排除

### 构建失败
- 检查 GitHub Actions 日志查看具体错误
- 确保所有依赖项正确安装
- 检查 VitePress 配置文件

### 页面无法访问
- 确认 GitHub Pages 已正确配置
- 检查仓库是否为公开状态
- 等待 DNS 传播（可能需要几分钟）

### 样式或资源加载问题
- 确认 `base` 配置正确设置为 `/vibe-code-docs/`
- 检查相对路径是否正确

## 更新网站

要更新网站内容：

1. 在本地修改文档
2. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新文档内容"
   git push origin main
   ```
3. GitHub Actions 会自动重新部署网站

## 自定义域名（可选）

如果你有自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为你的域名（如：`docs.example.com`）
3. 在域名服务商配置 CNAME 记录指向 `[username].github.io`
