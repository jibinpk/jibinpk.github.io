/* Interactivity: typed role, counters, lazy images, progress on scroll, theme toggle, smooth scroll, mobile nav */
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Typed role (simple)
  const roles = [
    'Technical Support Engineer',
    'Customer Success Enthusiast',
    'WordPress & WooCommerce Specialist',
    'Problem Solver • Empathy-first'
  ];
  let i = 0, j = 0, forward = true;
  const el = document.getElementById('typed-role');
  function typeStep() {
    if (!el) return;
    const word = roles[i];
    if (forward) {
      el.textContent = word.slice(0, ++j);
      if (j === word.length) { forward = false; setTimeout(typeStep, 1100); return; }
    } else {
      el.textContent = word.slice(0, --j);
      if (j === 0) { forward = true; i = (i + 1) % roles.length; }
    }
    setTimeout(typeStep, forward ? 60 : 40);
  }
  typeStep();

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', a.getAttribute('href'));
      }
      // close mobile nav if open
      const menuBtn = document.getElementById('menu-btn');
      const navList = document.getElementById('nav-list');
      if(menuBtn && menuBtn.getAttribute('aria-expanded') === 'true'){
        menuBtn.setAttribute('aria-expanded','false');
        navList.style.display = '';
      }
    });
  });

  // Mobile nav toggle
  const menuBtn = document.getElementById('menu-btn');
  const navList = document.getElementById('nav-list');
  if(menuBtn){
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      if(!expanded){
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
      } else {
        navList.style.display = '';
      }
    });
  }

  // Theme toggle (basic light/dark)
  const themeToggle = document.getElementById('theme-toggle');
  function setTheme(t){
    if(t === 'dark'){ document.documentElement.setAttribute('data-theme','dark'); themeToggle.textContent = '☀️'; themeToggle.setAttribute('aria-pressed','true') }
    else { document.documentElement.removeAttribute('data-theme'); themeToggle.textContent = '🌙'; themeToggle.setAttribute('aria-pressed','false') }
    localStorage.setItem('site-theme', t);
  }
  // load
  const saved = localStorage.getItem('site-theme') || 'light';
  setTheme(saved);
  themeToggle && themeToggle.addEventListener('click', () => setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  // Counters animation
  const counters = document.querySelectorAll('.hero-stats .num');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        let v = 0;
        const step = Math.max(1, Math.floor(target / 120));
        const t = setInterval(() => {
          v += step;
          if(v >= target){
            el.textContent = target + (target >= 100 ? '+' : '');
            clearInterval(t);
          } else { el.textContent = v; }
        }, 10);
        counterObserver.unobserve(el);
      }
    });
  }, {threshold: 0.5});
  counters.forEach(c => counterObserver.observe(c));

  // Progress bars animate on scroll
  const progresses = document.querySelectorAll('.progress');
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const value = el.getAttribute('data-value') || 0;
        el.querySelector('span').style.width = value + '%';
        progressObserver.unobserve(el);
      }
    });
  }, {threshold: 0.25});
  progresses.forEach(p => progressObserver.observe(p));

  // Lazy load images
  const lazyImgs = document.querySelectorAll('img.lazy');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        const img = ent.target;
        const src = img.getAttribute('data-src');
        if(src){ img.src = src; img.removeAttribute('data-src'); img.classList.remove('lazy'); }
        imgObserver.unobserve(img);
      }
    });
  }, {rootMargin:'200px'});
  lazyImgs.forEach(i => imgObserver.observe(i));

  // keyboard focus outline for keyboard users
  function handleFirstTab(e){
    if(e.key === 'Tab'){
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});
