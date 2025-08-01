// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (!scrollProgress) {
    // Create scroll progress bar if it doesn't exist
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }
  
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
}

window.addEventListener('scroll', updateScrollProgress);

// Animate skill bars when they come into view
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && !bar.classList.contains('animated')) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
      bar.classList.add('animated');
    }
  });
}

// Fade in animation for sections
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    
    if (isVisible) {
      element.classList.add('visible');
    }
  });
}

// Add fade-in class to sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section > .container');
  sections.forEach(section => {
    section.classList.add('fade-in');
  });
  
  // Initial check for animations
  animateOnScroll();
  animateSkillBars();
});

window.addEventListener('scroll', () => {
  animateOnScroll();
  animateSkillBars();
});

// Contact Form Handling
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
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// Resume Download Functionality
function handleResumeDownload() {
  // In a real application, this would download an actual PDF file

  const link = document.createElement('a');
  link.href = 'Het_Resume.pdf';  // Path to your actual resume file
  link.download = 'Het_Resume.pdf'; // Optional: Set the download file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // alert('Resume download would start here. Please add your actual resume file to the project.');
}

// Add event listeners for resume download buttons
document.getElementById('download-resume')?.addEventListener('click', (e) => {
  e.preventDefault();
  handleResumeDownload();
});

document.getElementById('footer-resume')?.addEventListener('click', (e) => {
  e.preventDefault();
  handleResumeDownload();
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Uncomment the line below to enable typing effect
    // typeWriter(heroTitle, originalText, 150);
  }
});

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
});

// Add active state to navigation based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

console.log('Portfolio website loaded successfully!');
