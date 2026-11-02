# 作品管理指南

> 这份指南告诉你：**怎么往网站里加作品、删作品、改作品、传图片、加社交链接**。
> 所有操作都只需要编辑两个文件 + 拖图片到文件夹。不需要数据库、不需要付费、不需要懂代码。

---

## 📁 网站目录长这样

```
personal-website/
├── index.html          ← 网站主页面（一般不用改）
├── styles.css          ← 样式（一般不用改）
├── script.js           ← 脚本（一般不用改）
│
├── data/
│   ├── profile.js      ← ⭐ 你的个人资料 + 社交链接（改这个）
│   └── works.js        ← ⭐ 你的作品库（改这个）
│
└── assets/
    ├── avatar/         ← 头像图片放这里
    └── works/
        ├── ecommerce/  ← 电商设计图放这里
        ├── drama/      ← 短剧漫剧封面/截图放这里
        └── life/       ← 生活照片放这里
```

**你只需要碰 `data/` 这个文件夹和 `assets/` 这个文件夹。其他文件都不用动。**

---

## ➕ 新增一个作品

以"加一张电商详情页设计图"为例：

### 第 1 步：把图片放进文件夹

把你的图片（建议 .jpg 或 .webp，单张 < 1MB）拖进：

```
assets/works/ecommerce/
```

可以命名为 `001.jpg`、`002.jpg` 这样递增，方便管理。

### 第 2 步：在 `data/works.js` 加一条记录

打开 `data/works.js`，找到 `ecommerce: [ ... ]` 这一段，在最后一个 `{ }` 后面加一条（注意逗号）：

```js
{
  id: 'e003',                                    // 唯一编号，e + 递增数字
  title: '咖啡品牌 · 详情页设计',                  // 作品标题
  desc: '故事化长图，从产地到杯中的视觉叙事。',     // 一句话描述
  year: '2026',                                  // 完成年份
  category: '详情页',                            // 分类（决定筛选标签）
  img: 'assets/works/ecommerce/001.jpg',        // ← 图片路径！
  link: '',                                      // 外部链接（不填则点击打开灯箱预览）
  size: 'normal'                                 // 可选：'normal' / 'tall' / 'wide'
}
```

### 第 3 步：保存，刷新网页

立刻就能看到。

---

## ✏️ 更新作品

打开 `data/works.js`，找到那条作品的 `id`，改字段就行：

- 改标题 → 改 `title`
- 改图片 → 把新图丢进 `assets/works/ecommerce/`，改 `img` 路径
- 改分类 → 改 `category` 字段（前端筛选标签会自动跟着变）
- 改链接 → 改 `link` 字段

---

## ❌ 删除作品

在 `data/works.js` 里删掉那一条 `{ ... }` 整块即可。图片文件留不留都行，不影响网站。

---

## 🔍 筛选作品（用户视角）

每个作品区块上方有自动生成的**分类筛选标签**：
- 电商设计的 `category` 决定标签：详情页 / 主图 / 主视觉 / Banner / 包装 …
- 短剧漫剧：竖屏短剧 / 漫剧 / 分镜 …
- 生活日常：手帐 / 在路上 / 厨房 / 读纸 …

标签是从你写的 `category` 字段**自动聚合**出来的——你新增一个没出现过的分类，前端会自动多一个筛选按钮，不用改任何代码。

---

## 📸 上传头像

1. 把你的头像图（建议方形 / 4:5 竖图，< 500KB）放进 `assets/avatar/`
   （比如命名为 `me.jpg`）
2. 打开 `data/profile.js`，找到这一行：

```js
avatar: '', // 例如 'assets/avatar/my-photo.jpg'
```

改成：

```js
avatar: 'assets/avatar/me.jpg',
```

保存刷新即可。不填的话会显示默认占位插画。

---

## 🔗 添加社交链接（直达你的个人主页）

打开 `data/profile.js`，找到 `socials` 这一段：

```js
socials: [
  { name: 'GitHub',   url: 'https://github.com/zoumengchen', icon: 'github' },
  { name: '小红书',   url: '',  icon: 'redbook' },     // ← 空的，不会显示
  { name: '微博',     url: '',  icon: 'weibo' },
  ...
]
```

把 `url: ''` 改成你的真实主页地址，比如：

```js
{ name: '小红书', url: 'https://www.xiaohongshu.com/user/profile/你的ID', icon: 'redbook' }
```

填了的会自动出现在 Footer 的"关注我"列表里；留空的会自动隐藏，不报错。

**怎么找到自己的社交主页 URL？**
- 小红书：APP 打开自己主页 → 右上角分享 → 复制链接
- 微博：网页版打开自己主页，地址栏的 URL 就是
- 抖音：APP 分享 → 复制链接
- B 站：网页版"个人主页"地址栏
- 微信：填微信号对应的二维码页面 URL，或留空让访客扫码

---

## 🆕 加一个全新的作品分类

比如你想在电商区加一个"品牌海报"分类：

1. 上传图片到 `assets/works/ecommerce/`
2. 在 `data/works.js` 的 ecommerce 数组里加一条作品，`category` 写 `'品牌海报'`
3. 保存刷新——前端会自动出现"品牌海报"这个筛选标签

不用改任何代码。

---

## 🌐 把改动发布到公开网站

如果你已经部署到 GitHub Pages（参考 README.md），改完 `data/` 之后要推送到 GitHub：

```bash
cd personal-website
git add .
git commit -m "更新作品：新增XX"
git push
```

推上去后 1~2 分钟，公开网站就会更新。

---

## 🖼️ 替换网站里的图片 / 视频（完整路径表）

网站里所有图片都按用途放在不同文件夹。换图只需"把新图丢进对应文件夹 → 改 data 文件里的路径"。

### 当前所有图片资源清单

| 用途 | 当前文件 | 路径 | 怎么换 |
|---|---|---|---|
| Hero 横版风景图框 | 富士山春日营地 | `assets/hero/landscape.jpg` | 把新横版图丢进 `assets/hero/`，然后改 `data/profile.js` 的 `heroLandscape` 字段 |
| 整页水墨背景纹理 | 山水水墨插画 | `assets/decor/ink-wash.png` | 替换同路径文件即可，文件名保持不变 |
| 简历↔电商装饰带 | 海岸春景樱花 | `assets/decor/coast.png` | 替换同路径文件，或改 `index.html` 里 `data-img="assets/decor/coast.png"` |
| 电商↔短剧装饰带 | 日本乡间小火车 | `assets/decor/train.png` | 同上，改 `index.html` 对应的 `data-img` |
| 短剧↔生活装饰带 | 高山秋色 | `assets/decor/mountain.png` | 同上 |
| 生活↔联系装饰带 | 金黄秋叶河岸 | `assets/decor/autumn.png` | 同上 |
| 电商设计作品图 | 你的作品 | `assets/works/ecommerce/` | 在 `data/works.js` 的对应作品 `img` 字段填路径 |
| 短剧漫剧封面/截图 | 你的作品 | `assets/works/drama/` | 同上 |
| 生活日常照片 | 你的照片 | `assets/works/life/` | 同上 |
| 头像（可选） | 你的头像 | `assets/avatar/` | 在 `data/profile.js` 的 `avatar` 字段填路径 |

### 替换装饰带的两种方法

**方法 1（最简单）：直接替换同名文件**

把新图命名为 `coast.png`、`train.png` 等，覆盖 `assets/decor/` 里的同名文件。改完 commit + push，1~2 分钟后公开网站就更新。不需要改任何代码。

**方法 2：换文件名**

如果想用 `.jpg` 而不是 `.png`，或者文件名不一样：
1. 把新图丢进 `assets/decor/`
2. 打开 `index.html`，找到这一行（在 02 电商区块前面）：
   ```html
   <div class="decorband" data-img="assets/decor/coast.png" aria-hidden="true"></div>
   ```
3. 把 `data-img` 的值改成新路径，例如：
   ```html
   <div class="decorband" data-img="assets/decor/my-new-banner.jpg" aria-hidden="true"></div>
   ```

### 视频怎么加？

GitHub Pages 只能托管静态文件，**不能直接上传视频**。短剧漫剧的"视频"是通过外链跳转实现的：

1. 把视频上传到 B 站 / 视频号 / 抖音 / YouTube 等平台
2. 拿到视频的播放页 URL（例如 `https://www.bilibili.com/video/BV1xxx`）
3. 在 `data/works.js` 的对应短剧作品里，把 `link` 字段填上这个 URL：
   ```js
   {
     id: 'd001',
     title: '溯光 · 倒数三日',
     desc: 'AIGC 分镜 + 配色 + 后期合成 · 短剧系列。',
     year: '2026',
     category: '竖屏短剧',
     img: 'assets/works/drama/d001-cover.jpg',  // ← 封面图（一张图）
     link: 'https://www.bilibili.com/video/BV1xxx',  // ← 视频播放页 URL
     duration: 'EP.08'
   }
   ```
4. 用户点这个作品卡片 → 自动跳转到视频播放页

**封面图建议**：从视频里截一张代表性的画面（16:11 横版），命名为 `d001-cover.jpg` 丢进 `assets/works/drama/`。

### 图片格式与大小建议

- **格式**：照片用 `.jpg`，需要透明背景用 `.png`，矢量用 `.svg`
- **大小**：单张 ≤ 500KB（GitHub 单文件限 100MB，但大了网页加载慢）
- **Hero 风景图**：横版 4:3，建议 1200×900 像素
- **作品图**：横版 4:3 或 3:2，建议 800×600 起
- **装饰带**：超宽横版，建议 1920×400 起（裁切后视觉效果好）

可用 [tinypng.com](https://tinypng.com) 在线压缩图片，免费且不损画质。

---

## ❓ 常见问题

**Q：图片不显示？**
A：检查 `img` 路径大小写和后缀名是否和实际文件一致。

**Q：想换主页配色？**
A：编辑 `styles.css` 顶部的 `:root { ... }` 块，改颜色变量。

**Q：某个作品想点开直接跳外链？**
A：在 `data/works.js` 里那条作品的 `link` 字段填上完整 URL（含 https://）。

**Q：想把 short drama 改成竖屏短剧的封面图但不要点击灯箱？**
A：`link` 留空就会走灯箱，灯箱里会显示你填的 `img`。

---

有任何其它问题，回到 WorkBuddy 里问我。