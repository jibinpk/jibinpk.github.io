// Small interactive enhancements: year, nav toggle, smooth scroll
document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
navToggle && navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  if(!expanded) {
    navList.style.display = 'flex';
  } else {
    navList.style.display = '';
  }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', a.getAttribute('href'));
      // close mobile nav if open
      if(window.innerWidth < 900 && navToggle) {
        navToggle.setAttribute('aria-expanded','false');
        navList.style.display = '';
      }
    }
  });
});
