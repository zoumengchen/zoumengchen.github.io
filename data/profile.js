/* ============================================================
   data/profile.js
   ------------------------------------------------------------
   个人信息 + 社交链接 —— 你只需改这个文件就能更新基础资料
   ============================================================ */

// 全局暴露，给 main script 读取
window.SITE_PROFILE = {
  /* —— 基础信息 —— */
  name: 'zoumengchen',
  nameCN: '邹梦晨',
  monogram: 'ZM',                    // 左上角导航徽章里的字
  tagline: '独立设计师 · AIGC 创作 / 电商视觉 / 短剧漫剧',
  intro: '从一张商品图到一段短剧镜头——用 AI 与设计，让内容被看见。',
  location: '中国 · 江西',
  email: '3204913134@qq.com',
  phone: '19859923183',

  /* —— Hero 区统计数字（可改） —— */
  stats: [
    { num: '5',    label: '行业沉淀（年）' },
    { num: '120',  label: '交付作品' },
    { num: '30',   label: 'AIGC 项目' }
  ],

  /* —— Hero 头像 / 横版风景图框 ——
     Hero 区现在是横版风景图框（不再用竖版头像）。
     默认使用 assets/hero/landscape.jpg（富士山春日营地）。

     想换图：
       1. 把新图丢进 assets/hero/ 文件夹（建议横版 / 4:3 / < 1MB）
       2. 改下面 heroLandscape 字段为 'assets/hero/你的图.jpg'

     想换回用真实头像图：把 heroLandscape 留空，avatar 字段填头像图路径即可。 */
  heroLandscape: 'assets/hero/landscape.jpg',
  avatar: '', // 例如 'assets/avatar/my-photo.jpg'

  /* —— 社交链接 ——
     你只需要在 url 里填上你的主页地址，网站 Footer 就会自动显示。
     想隐藏某个就删掉那一项；想新增就照着格式加一项。 */
  socials: [
    { name: 'GitHub',     url: 'https://github.com/zoumengchen', icon: 'github' },
    { name: '小红书',     url: '',  icon: 'redbook' },
    { name: '微博',       url: '',  icon: 'weibo' },
    { name: '抖音',       url: '',  icon: 'douyin' },
    { name: 'B 站',       url: '',  icon: 'bilibili' },
    { name: '微信',       url: '',  icon: 'wechat' }
  ]
};