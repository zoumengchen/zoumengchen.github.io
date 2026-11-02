/* ============================================================
   交互脚本：导航状态 / 滚动高亮 / 移动菜单 / 灯箱预览
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. 导航：滚动后变状态 ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 移动菜单切换 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

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

  // 点菜单项后自动关闭
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // 点击菜单外区域关闭
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* ---------- 3. 滚动高亮当前导航 ---------- */
  const sections = ['about', 'ecommerce', 'drama', 'life', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  const setActive = (id) => {
    navLinks.forEach(l => {
      const target = l.getAttribute('href').replace('#', '');
      l.classList.toggle('is-active', target === id);
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
  }

  /* ---------- 4. 灯箱：点作品图预览 ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = lightbox.querySelector('.lightbox__close');

  const openLightbox = (el) => {
    const title = el.querySelector('.work__title, .drama__title, .journal__title')?.textContent || '作品预览';
    const desc  = el.querySelector('.work__desc, .drama__desc, .journal__excerpt')?.textContent || '';
    const bg    = el.querySelector('[data-bg]')?.getAttribute('data-bg') || 'sage';

    const bgMap = {
      sage:   'linear-gradient(135deg, #6b7a55, #4a5a3a)',
      forest: 'linear-gradient(135deg, #4a5a3f, #2e3a25)',
      terra:  'linear-gradient(135deg, #d18858, #b36538)',
      tan:    'linear-gradient(135deg, #c9ad70, #a3863f)'
    };

    lightboxContent.innerHTML = `
      <div style="height:100%;display:flex;flex-direction:column;justify-content:flex-end;
                  padding:2rem;background:${bgMap[bg]};color:#f4ede0;">
        <div style="font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;opacity:.8;margin-bottom:.5rem;">PREVIEW</div>
        <h3 style="font-family:'Noto Serif SC',serif;font-size:1.5rem;font-weight:500;margin-bottom:.5rem;">${title}</h3>
        <p style="font-size:.9rem;opacity:.85;line-height:1.6;">${desc}</p>
        <p style="margin-top:1.4rem;font-size:.8rem;opacity:.6;font-style:italic;font-family:'Cormorant Garamond',serif;">
          这是一张占位插画 —— 在 index.html 中替换为你的真实作品图，此处就会显示图片。
        </p>
      </div>
    `;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.work, .drama, .journal').forEach(el => {
    el.addEventListener('click', () => openLightbox(el));
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMenu();
    }
  });

  /* ---------- 5. 元素入场动画 ---------- */
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          reveal.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    document.querySelectorAll('.work, .drama, .journal, .timeline__item, .stat').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .8s cubic-bezier(0.22,1,0.36,1), transform .8s cubic-bezier(0.22,1,0.36,1)';
      reveal.observe(el);
    });
  }

  /* ---------- 6. 当前年份 ---------- */
  // 已在 HTML 中硬编码 2026，留接口方便日后扩展
})();