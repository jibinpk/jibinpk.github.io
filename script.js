// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Navigation functionality
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active navigation highlighting
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);

  // Typed text effect
  const typedElement = document.getElementById('typed-role');
  const roles = [
    'Technical Support Engineer',
    'Customer Success Specialist',
    'WordPress Expert',
    'Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 100;

    if (isDeleting) {
      typeSpeed /= 2;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typedElement) {
    typeEffect();
  }

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Animate counters when hero section is visible
        if (entry.target.classList.contains('hero-stats')) {
          animateCounters();
        }
        
        // Animate skill progress bars
        if (entry.target.classList.contains('skills-content')) {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.hero-stats, .about-content, .timeline, .skills-content, .projects-grid, .contact-content');
  animatedElements.forEach(el => observer.observe(el));

  // Skill bars animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(skillBar => {
      const progressBar = skillBar.querySelector('.progress-bar');
      const progress = skillBar.getAttribute('data-progress');
      
      setTimeout(() => {
        progressBar.style.width = progress + '%';
      }, 100);
    });
  }

  // Smooth scrolling for navigation links
  function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScroll(target);
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 400px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    `;

    notification.querySelector('.notification-close').style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
      removeNotification(notification);
    }, 5000);

    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      clearTimeout(autoRemove);
      removeNotification(notification);
    });
  }

  function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Scroll to top button
  const scrollTopButton = document.createElement('button');
  scrollTopButton.className = 'scroll-top';
  scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollTopButton.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollTopButton);

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopButton.classList.add('visible');
    } else {
      scrollTopButton.classList.remove('visible');
    }
  });

  // Lazy loading for images (if any are added later)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    highlightActiveSection();
  }, 10);

  window.addEventListener('scroll', debouncedScrollHandler);

  // Initialize AOS (Animate On Scroll) alternative
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in-up');
          }, index * 100);
          scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => scrollObserver.observe(el));
  }

  initScrollAnimations();

  // Console message for developers
  console.log('%c👋 Hello Developer!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
  console.log('%cThis portfolio was built with modern web technologies and best practices.', 'color: #6b7280; font-size: 12px;');
  console.log('%cFeel free to explore the code!', 'color: #6b7280; font-size: 12px;');

});
