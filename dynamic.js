// Dynamic Website Enhancements
// Adds smooth animations, parallax effects, and interactive features

(function() {
  'use strict';

  // ============================================
  // 1. SMOOTH SCROLLING
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  });

  // ============================================
  // 2. NAVBAR SCROLL EFFECTS
  // ============================================
  let lastScroll = 0;
  const navbar = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
      // Add shadow on scroll
      if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(10px) saturate(180%)';
      }
      
      // Hide/show navbar on scroll (optional - can be enabled)
      // if (currentScroll > lastScroll && currentScroll > 100) {
      //   navbar.style.transform = 'translateY(-100%)';
      // } else {
      //   navbar.style.transform = 'translateY(0)';
      // }
    }
    
    lastScroll = currentScroll;
  });

  // ============================================
  // 3. ENHANCED SCROLL ANIMATIONS WITH STAGGER
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation delay
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.classList.add('animated');
        }, index * 100); // 100ms delay between each element
        
        // Unobserve after animation
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initialize enhanced scroll animations
  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
      '.card, .club-card, .team-member, .news-preview, .event-card, section h2, .hero h1, .hero p'
    );
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px) scale(0.95)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      animationObserver.observe(el);
    });
  });

  // ============================================
  // 4. PARALLAX EFFECTS
  // ============================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      hero.style.opacity = 1 - (scrolled / 500);
    }
  });

  // ============================================
  // 5. ANIMATED COUNTERS
  // ============================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.textContent) || 0;
        entry.target.classList.add('counted');
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.member-number').forEach(counter => {
      counterObserver.observe(counter);
    });
  });

  // ============================================
  // 6. ENHANCED BUTTON INTERACTIONS
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      // Ripple effect
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  });

  // ============================================
  // 7. CARD TILT EFFECT (3D)
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .club-card, .event-card, .team-member');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  });

  // ============================================
  // 8. TYPING ANIMATION FOR HERO TEXT
  // ============================================
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Optional: Uncomment to enable typing effect on hero
  // document.addEventListener('DOMContentLoaded', () => {
  //   const heroTitle = document.querySelector('.hero h1');
  //   if (heroTitle) {
  //     const originalText = heroTitle.textContent;
  //     heroTitle.textContent = '';
  //     setTimeout(() => {
  //       typeWriter(heroTitle, originalText, 50);
  //     }, 500);
  //   }
  // });

  // ============================================
  // 9. FLOATING ANIMATION FOR ELEMENTS
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.nav-logo img, .loader-img');
    
    floatingElements.forEach((el, index) => {
      el.style.animation = `float 3s ease-in-out infinite`;
      el.style.animationDelay = `${index * 0.5}s`;
    });
  });

  // ============================================
  // 10. PROGRESS INDICATOR (SCROLL PROGRESS)
  // ============================================
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #2563eb);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
      `;
      document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
  });

  // ============================================
  // 11. ENHANCED LOADING SCREEN
  // ============================================
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      // Add fade out animation
      setTimeout(() => {
        loadingScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(0.95)';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 800);
      }, 1000);
    }
  });

  // ============================================
  // 12. INTERACTIVE HOVER EFFECTS
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.card, .club-card, .btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });
  });

  // ============================================
  // 13. CURSOR EFFECTS (Optional - can be enabled)
  // ============================================
  // Uncomment to enable custom cursor
  // let cursor = document.createElement('div');
  // cursor.className = 'custom-cursor';
  // cursor.style.cssText = `
  //   width: 20px;
  //   height: 20px;
  //   border: 2px solid #3b82f6;
  //   border-radius: 50%;
  //   position: fixed;
  //   pointer-events: none;
  //   z-index: 9999;
  //   transition: transform 0.1s ease;
  // `;
  // document.body.appendChild(cursor);
  // 
  // document.addEventListener('mousemove', (e) => {
  //   cursor.style.left = e.clientX - 10 + 'px';
  //   cursor.style.top = e.clientY - 10 + 'px';
  // });

  console.log('✨ Dynamic enhancements loaded!');
})();

