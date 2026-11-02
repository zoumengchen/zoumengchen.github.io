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