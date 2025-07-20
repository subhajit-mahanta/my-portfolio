// scripts.js -- Complete Modern CS Portfolio JavaScript

// -------- SMOOTH NAVIGATION --------
// Smooth scroll for nav links
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    if (this.hash && document.querySelector(this.hash)) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({ behavior: "smooth" });

      // Close mobile nav if open
      const navCollapse = document.querySelector('.navbar-collapse.show');
      if (navCollapse) {
        new bootstrap.Collapse(navCollapse).toggle();
      }
    }
  });
});

// -------- CONTACT FORM VALIDATION --------
// Contact form validation and submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.checkValidity()) {
        alert('Thank you! Your message has been sent.');
        form.reset();
        form.classList.remove('was-validated');
      } else {
        form.classList.add('was-validated');
      }
    });
  }
});

// -------- FLOATING ACTION EMAIL COPY FUNCTIONALITY --------
// Main function for floating email copy
function copyFloatingEmail() {
  const emailText = document.getElementById('floatingEmailText').textContent;
  const btn = document.getElementById('floatingCopyBtn');
  const toast = document.getElementById('floatingToast');
  
  copyEmailToClipboard(emailText, btn, toast);
}

// Enhanced copy function with modern clipboard API
function copyEmailToClipboard(email, btn, customToast = null) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showModernFeedback(btn, customToast);
    }).catch(() => {
      fallbackCopy(email, btn, customToast);
    });
  } else {
    fallbackCopy(email, btn, customToast);
  }
}

// Fallback copy method for older browsers
function fallbackCopy(text, btn, toast) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '-9999px';
  
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showModernFeedback(btn, toast);
    } else {
      console.error('Fallback: Copying text command was unsuccessful');
    }
  } catch (err) {
    console.error('Fallback: Unable to copy', err);
  }
  
  document.body.removeChild(textArea);
}

// Show modern copy feedback with animations
function showModernFeedback(btn, toast) {
  const originalContent = btn.innerHTML;
  const originalBg = btn.style.background;
  
  // Update button to show success state
  btn.innerHTML = '<i class="bi bi-check2"></i>';
  btn.style.background = '#10b981';
  
  // Show floating toast
  if (toast) {
    toast.classList.add('show');
  }
  
  // Reset everything after 2.5 seconds
  setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.style.background = originalBg || '';
    if (toast) {
      toast.classList.remove('show');
    }
  }, 2500);
}

// -------- UTILITY FUNCTIONS --------
// Debounce function for performance optimization
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

// Check if element is in viewport (for future enhancements)
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// -------- PERFORMANCE OPTIMIZATIONS --------
// Optimize scroll performance
let ticking = false;
function updateOnScroll() {
  // Add any scroll-based functionality here
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}

// Optimized scroll listener
window.addEventListener('scroll', requestTick, { passive: true });

// -------- ACCESSIBILITY ENHANCEMENTS --------
// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Support Enter key for copy button
  if (e.key === 'Enter' && e.target.classList.contains('copy-btn')) {
    e.target.click();
  }
  
  // Support Escape key to close any open modals
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal.show');
    if (openModal) {
      const closeBtn = openModal.querySelector('.btn-close');
      if (closeBtn) closeBtn.click();
    }
  }
});

// -------- LOADING OPTIMIZATIONS --------
// Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
  // Preload resume PDF if it exists
  const resumeLink = document.querySelector('a[href="resume.pdf"]');
  if (resumeLink) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'resume.pdf';
    document.head.appendChild(link);
  }
  
  // Initialize any components that need DOM ready
  console.log('Portfolio loaded successfully!');
});

// -------- BROWSER COMPATIBILITY --------
// Polyfill for older browsers
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// -------- ERROR HANDLING --------
// Global error handler for debugging
window.addEventListener('error', function(e) {
  console.error('Portfolio Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);
});
