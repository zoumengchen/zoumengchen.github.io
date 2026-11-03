/* ============================================================
   交互脚本 —— 从 data/profile.js + data/works.js 渲染整个网站
   ============================================================ */

(function () {
  'use strict';

  const P = window.SITE_PROFILE || {};
  const W = window.SITE_WORKS  || { ecommerce: [], drama: [], life: [] };

  /* ---------- 1. 注入个人信息 ---------- */
  const setText = (id, val) => { const el = document.getElementById(id); if (el && val != null) el.textContent = val; };

  setText('navMonogram', P.monogram);
  setText('navName',     P.name || P.nameCN);

  if (P.tagline) {
    const sub = document.getElementById('heroSubtitle');
    if (sub)   sub.innerHTML = P.tagline + (P.intro ? '<br />' + P.intro : '');
  }

  // Hero 统计（stats 为空数组时隐藏整个模块，不留悬空横线）
  const statsBox = document.getElementById('heroStats');
  if (statsBox) {
    if (Array.isArray(P.stats) && P.stats.length > 0) {
      statsBox.innerHTML = P.stats.map(s => `
        <div class="stat">
          <span class="stat__num">${s.num}<sup>+</sup></span>
          <span class="stat__label">${s.label}</span>
        </div>
      `).join('');
      statsBox.style.display = '';
    } else {
      statsBox.style.display = 'none';
    }
  }

  // Hero 横版风景图框
  const frame = document.getElementById('heroFrame');
  if (frame) {
    // 优先级：profile.heroLandscape > profile.avatar > 默认风景图
    const heroImg = P.heroLandscape || P.avatar || 'assets/hero/landscape.jpg';
    frame.innerHTML = `<img src="${heroImg}" alt="${P.name || '横版风景'}" loading="eager">`;
  }

  // 装饰带：从 HTML data-img 属性读取并设置背景
  document.querySelectorAll('.decorband[data-img]').forEach(el => {
    el.style.backgroundImage = `url('${el.dataset.img}')`;
  });

  if (P.email) {
    const e = document.getElementById('footerEmail');
    if (e) e.href = 'mailto:' + P.email;
  }

  /* ---------- 2. Footer 社交链接（只渲染填了 url 的） ---------- */
  const sBox = document.getElementById('footerSocials');
  if (sBox && Array.isArray(P.socials)) {
    const filled = P.socials.filter(s => s.url && s.url.trim());
    if (filled.length === 0) {
      sBox.innerHTML = '<span class="footer__placeholder">社交链接待填<br>见 data/profile.js</span>';
    } else {
      sBox.innerHTML = filled.map(s =>
        `<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}">${s.name}</a>`
      ).join('');
    }
  }

  /* ---------- 3. 导航：滚动后状态 ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 4. 移动菜单 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  const closeMenu = () => {
    navToggle.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('is-open');
    navMenu.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('is-open')) closeMenu();
  });

  /* ---------- 5. 滚动高亮 ---------- */
  const sections = ['about', 'ecommerce', 'drama', 'life', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  const setActive = (id) => navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href').replace('#', '') === id));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => es.forEach(en => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(s => {
      const io = new IntersectionObserver(es => es.forEach(en => en.isIntersecting && setActive(en.target.id)),
        { rootMargin: '-40% 0px -55% 0px' });
      io.observe(s);
    });
  }

  /* ---------- 6. 作品渲染 + 筛选 ---------- */
  // 按分类给背景色：fallback 渐变占位图（已切到浅蓝/薄荷/浅粉/金调）
  const BG_FOR = {
    sage:   'linear-gradient(135deg, #d4e8db, #8eb89e)',   // 薄荷绿
    forest: 'linear-gradient(135deg, #c8dde8, #5a8aa8)',   // 蓝
    terra:  'linear-gradient(135deg, #f0d8df, #d4a0b0)',   // 浅粉
    tan:    'linear-gradient(135deg, #e8dab8, #c9b68a)'    // 古典金
  };
  // 把分类标签映射到一个背景色，让没图也好看
  const CAT_BG = {
    // 电商
    '详情页': 'sage', '主图': 'terra', '主视觉': 'tan', 'Banner': 'forest', '包装': 'sage',
    // 漫剧
    '竖屏短剧': 'terra', '漫剧': 'sage', '分镜': 'forest',
    // 日常
    '手帐': 'tan', '在路上': 'sage', '厨房': 'terra', '读纸': 'forest', '灵感': 'tan'
  };
  function bgFor(category) { return BG_FOR[CAT_BG[category] || 'sage']; }

  /* —— 6.1 电商 —— */
  function renderEcommerce(filter) {
    const grid = document.getElementById('grid-ecommerce');
    const all = W.ecommerce || [];
    const list = filter === 'all' ? all : all.filter(w => w.category === filter);

    document.getElementById('empty-ecommerce').hidden = list.length > 0;

    grid.innerHTML = list.map(w => {
      const sizeClass = w.size === 'tall' ? 'work--tall' :
                        w.size === 'wide' ? 'work--wide' : '';
      const media = w.img
        ? `<img src="${w.img}" alt="${w.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
        : `<div class="work__media" data-bg="${CAT_BG[w.category] || 'sage'}">
             <span class="work__year">${w.year || ''}</span>
             <span class="work__type">${w.category || ''}</span>
           </div>`;
      return `
        <article class="work ${sizeClass}" data-id="${w.id}">
          ${media}
          <div class="work__info">
            <h3 class="work__title">${w.title}</h3>
            <p class="work__desc">${w.desc || ''}</p>
          </div>
        </article>`;
    }).join('');
  }

  /* —— 6.2 漫剧 —— */
  function renderDrama(filter) {
    const grid = document.getElementById('grid-drama');
    const all = W.drama || [];
    const list = filter === 'all' ? all : all.filter(w => w.category === filter);

    document.getElementById('empty-drama').hidden = list.length > 0;

    grid.innerHTML = list.map(w => {
      const bg = CAT_BG[w.category] || 'sage';
      const thumbInner = w.img
        ? `<img src="${w.img}" alt="${w.title}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">`
        : '';
      return `
        <article class="drama" data-id="${w.id}" data-link="${w.link || ''}">
          <div class="drama__thumb" data-bg="${bg}">
            ${thumbInner}
            <button class="drama__play" aria-label="播放预览">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <span class="drama__duration">${w.duration || ''}</span>
          </div>
          <div class="drama__info">
            <span class="drama__cat">${w.category || ''}</span>
            <h3 class="drama__title">${w.title}</h3>
            <p class="drama__desc">${w.desc || ''}</p>
          </div>
        </article>`;
    }).join('');
  }

  /* —— 6.3 日常 —— */
  function renderLife(filter) {
    const grid = document.getElementById('grid-life');
    const all = W.life || [];
    const list = filter === 'all' ? all : all.filter(w => w.category === filter);

    document.getElementById('empty-life').hidden = list.length > 0;

    grid.innerHTML = list.map(w => {
      const bg = CAT_BG[w.category] || 'sage';
      const media = w.img
        ? `<img src="${w.img}" alt="${w.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
        : `<div class="journal__media" data-bg="${bg}">
             <span class="journal__date">${w.date || ''}</span>
           </div>`;
      return `
        <article class="journal" data-id="${w.id}">
          ${media}
          <div class="journal__body">
            <span class="journal__tag">${w.category || ''}</span>
            <h3 class="journal__title">${w.title}</h3>
            <p class="journal__excerpt">${w.desc || ''}</p>
          </div>
        </article>`;
    }).join('');
  }

  // 6.0 入口：每个 section 渲染 + 筛选 UI 自动生成
  function setupSection(sectionKey, renderFn) {
    const filterBox = document.getElementById('filter-' + sectionKey);
    if (!filterBox) return;

    const items = W[sectionKey] || [];
    const cats = Array.from(new Set(items.map(w => w.category).filter(Boolean)));

    // 生成筛选按钮（"全部"已存在）
    cats.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'filterbar__btn';
      btn.dataset.filter = c;
      btn.textContent = c;
      filterBox.appendChild(btn);
    });

    filterBox.addEventListener('click', (e) => {
      const btn = e.target.closest('.filterbar__btn');
      if (!btn) return;
      filterBox.querySelectorAll('.filterbar__btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderFn(btn.dataset.filter);
      bindCardEvents();
    });

    renderFn('all');
  }

  setupSection('ecommerce', renderEcommerce);
  setupSection('drama',     renderDrama);
  setupSection('life',      renderLife);

  /* ---------- 7. 灯箱 ---------- */
  const lightbox         = document.getElementById('lightbox');
  const lightboxContent  = document.getElementById('lightboxContent');
  const lightboxClose     = lightbox.querySelector('.lightbox__close');

  function openMedia(data) {
    // data: { title, desc, img, bg, link }
    if (data.link) {
      // 有外部链接 → 新窗口打开
      window.open(data.link, '_blank', 'noopener');
      return;
    }
    if (data.img) {
      lightboxContent.innerHTML = `
        <div style="height:100%;display:flex;flex-direction:column;background:#f4ede0;">
          <img src="${data.img}" alt="${data.title}" style="width:100%;flex:1;object-fit:contain;background:#1d1d1b;">
          <div style="padding:1.4rem 1.6rem;border-top:1px solid #cabfa9;">
            <h3 style="font-family:'Noto Serif SC',serif;font-size:1.2rem;font-weight:500;color:#2b2520;margin-bottom:.3rem;">${data.title}</h3>
            <p style="font-size:.88rem;color:#5c534a;line-height:1.6;">${data.desc || ''}</p>
          </div>
        </div>`;
    } else {
      // 占位渐变
      lightboxContent.innerHTML = `
        <div style="height:100%;display:flex;flex-direction:column;justify-content:flex-end;
                    padding:2rem;background:${bgFor(data.category)};color:#f4ede0;">
          <div style="font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;opacity:.8;margin-bottom:.5rem;">PREVIEW · 待上传图片</div>
          <h3 style="font-family:'Noto Serif SC',serif;font-size:1.5rem;font-weight:500;margin-bottom:.5rem;">${data.title}</h3>
          <p style="font-size:.9rem;opacity:.85;line-height:1.6;">${data.desc || ''}</p>
          <p style="margin-top:1.4rem;font-size:.8rem;opacity:.7;font-style:italic;font-family:'Cormorant Garamond',serif;">
            将图片放进 assets/works/${data.section}/ 目录，
            然后在 data/works.js 对应作品的 img 字段填上路径，这里就会显示图片。
          </p>
        </div>`;
    }
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLightbox(); closeMenu(); }
  });

  // 绑定卡片点击事件（每次 render 完要重新绑）
  function bindCardEvents() {
    document.querySelectorAll('.work').forEach(card => {
      card.onclick = () => {
        const id = card.dataset.id;
        const data = (W.ecommerce || []).find(w => w.id === id);
        if (!data) return;
        openMedia({ ...data, section: 'ecommerce' });
      };
    });
    document.querySelectorAll('.drama').forEach(card => {
      card.onclick = () => {
        const id   = card.dataset.id;
        const link = card.dataset.link;
        const data = (W.drama || []).find(w => w.id === id);
        if (!data) return;
        openMedia({ ...data, link });
      };
    });
    document.querySelectorAll('.journal').forEach(card => {
      card.onclick = () => {
        const id = card.dataset.id;
        const data = (W.life || []).find(w => w.id === id);
        if (!data) return;
        openMedia({ ...data, section: 'life' });
      };
    });
  }
  bindCardEvents();

  /* ---------- 8. 入场动画 ---------- */
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(es => {
      es.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          reveal.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    const observe = (sel) => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity .8s cubic-bezier(0.22,1,0.36,1), transform .8s cubic-bezier(0.22,1,0.36,1)';
        reveal.observe(el);
      });
    };
    observe('.timeline__item, .stat');
    // 作品卡片在新渲染后再绑一次
    setTimeout(() => observe('.work, .drama, .journal'), 100);
  }
})();