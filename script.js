/* Main interactivity: typed role, counters, lazy images, progress on scroll, theme toggle, smooth scroll, mobile nav */

document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

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
      if (j === word.length) {
        forward = false;
        setTimeout(typeStep, 1200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --j);
      if (j === 0) {
        forward = true;
        i = (i + 1) % roles.length;
      }
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

  // Theme toggle (light/dark basic)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    if(isDark){
      document.documentElement.setAttribute('data-theme','light');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed','true');
    } else {
      document.documentElement.setAttribute('data-theme','');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed','false');
    }
  });

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
          } else {
            el.textContent = v;
          }
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

  // Lazy load images (simple)
  const lazyImgs = document.querySelectorAll('img.lazy');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        const img = ent.target;
        const src = img.getAttribute('data-src');
        if(src){
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
        }
        imgObserver.unobserve(img);
      }
    });
  }, {rootMargin:'200px'});
  lazyImgs.forEach(i => imgObserver.observe(i));

  // Accessibility: focus outline for keyboard only
  function handleFirstTab(e){
    if(e.key === 'Tab'){
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // Optional: Add subtle particle canvas if you want
  // (kept small and disabled by default; enable by uncommenting)
  /*
  (function initParticles(){
    const canvas = document.createElement('canvas');
    canvas.style.position='absolute';canvas.style.inset='0';canvas.style.pointerEvents='none';
    document.querySelector('.hero').appendChild(canvas);
    const ctx = canvas.getContext('2d'); function resize(){canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight}
    resize(); window.addEventListener('resize', resize);
    const dots = Array.from({length:30},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)/2,vy:(Math.random()-0.5)/2,r:1+Math.random()*2}));
    function frame(){ctx.clearRect(0,0,canvas.width,canvas.height);dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy; if(d.x<0)d.x=canvas.width; if(d.x>canvas.width)d.x=0; if(d.y<0)d.y=canvas.height; if(d.y>canvas.height)d.y=0; ctx.fillStyle='rgba(120,100,255,0.7)'; ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill()}); requestAnimationFrame(frame)}
    frame();
  })();
  */
});
