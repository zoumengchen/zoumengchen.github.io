# zoumengchen · 设计工作室作品集

> AIGC 创作 · 电商视觉 · 短剧漫剧 · 生活记录

一个静态个人作品集网站，托管在 GitHub Pages 上，零成本、无后端、纯前端渲染。

## ✨ 特性

- **纯静态**：HTML / CSS / 原生 JS，无构建步骤
- **数据驱动**：作品、资料、社交链接全部配置在 `data/` 目录
- **响应式**：桌面 / 平板 / 手机三端自适应
- **筛选**：作品区按分类自动生成筛选标签
- **灯箱**：点击作品卡片预览大图
- **SEO 友好**：含 OG 标签 / 语义化标签
- **打印友好**：尊重 `prefers-reduced-motion`

## 📂 目录结构

```
├── index.html          # 主页
├── styles.css          # 样式
├── script.js           # 渲染与交互
├── data/
│   ├── profile.js      # 个人资料 + 社交链接
│   └── works.js        # 作品库
├── assets/
│   ├── avatar/         # 头像
│   └── works/
│       ├── ecommerce/  # 电商设计
│       ├── drama/       # 短剧漫剧
│       └── life/         # 生活日常
└── MANAGE.md           # ⭐ 作品管理操作指南
```

## 🛠 本地预览

```bash
cd personal-website
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 🚀 部署到 GitHub Pages

1. 在 GitHub 建一个名为 `<你的用户名>.github.io` 的公开仓库
   （例如 `zoumengchen.github.io`）
2. 推送代码：

   ```bash
   git init -b main
   git add .
   git commit -m "init"
   git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
   git push -u origin main
   ```

3. 仓库 Settings → Pages → Source 选 `main` 分支根目录
4. 等 1~2 分钟，访问 `https://<你的用户名>.github.io`

## 📝 管理作品

见 [`MANAGE.md`](./MANAGE.md)。

## 🎨 风格

- 编辑式杂志排版 × 暖调复古工作室
- 配色：奶油纸 / 鼠尾草绿 / 陶土 / 金
- 衬线展示字：Cormorant Garamond + 思源宋体

---

© 2026 zoumengchen · 邹梦晨