// =========================
// OKELE-JOINT WEBSITE SCRIPTS
// =========================

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded'); // Debug log
  
  // =========================
  // MOBILE NAVIGATION TOGGLE
  // =========================
  
  const navToggle = document.querySelector('.nav-toggle');
  const body = document.body;
  
  if (navToggle) {
    console.log('Toggle button found'); // Debug log
    
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Toggle clicked'); // Debug log
      body.classList.toggle('nav-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-container') && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        body.classList.remove('nav-open');
      });
    });
  } else {
    console.log('Toggle button NOT found'); // Debug log
  }
  
  // =========================
  // NAVBAR SCROLL EFFECT
  // =========================
  
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // =========================
  // SMOOTH SCROLLING
  // =========================
  
  window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      document.body.classList.remove('nav-open');
    }
  };
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        body.classList.remove('nav-open');
      }
    });
  });
  
  // =========================
  // ADD TO CART BUTTONS
  // =========================
  
  const addButtons = document.querySelectorAll('.btn-add');
  
  addButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const originalText = this.textContent;
      this.textContent = 'Added!';
      this.style.background = '#22c55e';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 2000);
    });
  });
  
  // =========================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // =========================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animatedElements = document.querySelectorAll('.dish-card, .location-card, .partner-card');
  animatedElements.forEach(el => observer.observe(el));
  
  // =========================
  // FOOTER YEAR
  // =========================
  
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// =========================
// HELPER: CHECK IF MOBILE
// =========================

function isMobile() {
  return window.innerWidth <= 768;
}