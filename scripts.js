document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.futuristic-nav');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.4)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
    }
});

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.futuristic-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
            link.style.boxShadow = 'inset 0 0 20px rgba(0, 255, 255, 0.3)';
        } else {
            link.style.boxShadow = '';
        }
    });
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.querySelector('.counter')) {
                animateCounters();
            }
            
            if (entry.target.classList.contains('skill-item')) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    setTimeout(() => {
                        progressFill.style.width = progressFill.style.getPropertyValue('--progress');
                    }, 200);
                }
            }
        }
    });
}, observerOptions);

function copyEmail() {
    const email = 'subhajitmahantaofficial@gmail.com';
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showCopySuccess(copyBtn);
        }).catch(err => {
            fallbackCopyEmail(email, copyBtn);
        });
    } else {
        fallbackCopyEmail(email, copyBtn);
    }
}

function fallbackCopyEmail(email, button) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Failed to copy email:', err);
        alert('Email copied: ' + email);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    const originalClass = button.className;
    
    button.innerHTML = '<i class="bi bi-check2"></i> Copied!';
    button.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
    button.style.color = '#0a0a0a';
    button.style.transform = 'scale(1.05)';
    button.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.className = originalClass;
        button.style.background = '';
        button.style.color = '';
        button.style.transform = '';
        button.style.boxShadow = '';
    }, 2000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span><div class="loading"></div>';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }, 2000);
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'error' ? 'rgba(255, 71, 87, 0.9)' : 'rgba(0, 212, 170, 0.9)'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'error' ? 'rgba(255, 71, 87, 0.3)' : 'rgba(0, 212, 170, 0.3)'};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

function createDynamicParticles() {
    const background = document.querySelector('.animated-background');
    if (!background) return;

    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 6px #00ffff;
            animation: floatUp 4s linear forwards;
            z-index: 1;
        `;
        
        background.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }, 500);
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(floatStyle);
}

document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
    trigger.addEventListener('click', function() {
        const targetModal = document.querySelector(this.getAttribute('data-bs-target'));
        if (targetModal) {
            setTimeout(() => {
                targetModal.style.backdropFilter = 'blur(20px)';
            }, 150);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add animate-in class to all animatable elements
    const animatableElements = document.querySelectorAll('.futuristic-card, .glass-panel, .stat-item');
    animatableElements.forEach(el => {
        el.classList.add('animate-in');
        observer.observe(el);
    });
    
    const heroName = document.getElementById('heroName');
    if (heroName) {
        const originalText = heroName.textContent;
        typeWriter(heroName, originalText, 100);
    }

    createDynamicParticles();
    
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.width = '0%';
        });
    }, 100);
});

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

const debouncedScroll = debounce(() => {

}, 16);

window.addEventListener('scroll', debouncedScroll);


window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    

    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

