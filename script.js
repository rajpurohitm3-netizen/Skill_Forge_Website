// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = this.getInitialTheme();
        this.init();
    }

    getInitialTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        // Default to light
        return 'light';
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateThemeIcon();
        
        // Update body class for additional styling if needed
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.handleScroll();
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        this.navMenu?.classList.toggle('active');
        this.hamburger?.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.hamburger?.classList.remove('active');
    }
}

// Course Filter Management
class CourseFilterManager {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.courseCards = document.querySelectorAll('.course-card');
        this.blogCards = document.querySelectorAll('.blog-card');
        this.searchInput = document.getElementById('course-search');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterCourses(e));
        });

        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterBlog(e));
        });

        this.searchInput?.addEventListener('input', (e) => this.searchCourses(e.target.value));
    }

    filterCourses(e) {
        const filter = e.target.getAttribute('data-filter');
        
        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter courses
        this.courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBlog(e) {
        const filter = e.target.getAttribute('data-category');
        
        // Update active button
        this.categoryBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter blog posts
        this.blogCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchCourses(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        this.courseCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.course-category')?.textContent.toLowerCase() || '';
            
            if (title.includes(term) || description.includes(term) || category.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// FAQ Management
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question?.addEventListener('click', () => this.toggleFAQ(item));
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        this.faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Form Management
class FormManager {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.newsletterForms = document.querySelectorAll('.newsletter-form');
        this.init();
    }

    init() {
        this.contactForm?.addEventListener('submit', (e) => this.handleContactForm(e));
        this.newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleNewsletterForm(e));
        });
    }

    handleContactForm(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form submission
        this.showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.contactForm.reset();
    }

    handleNewsletterForm(e) {
        e.preventDefault();
        
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (this.validateEmail(email)) {
            this.showMessage('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';
        } else {
            this.showMessage('Please enter a valid email address.', 'error');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4ade80' : '#ef4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease forwards;
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupTextReveal();
        this.setupStaggeredAnimations();
        this.setupPageLoadAnimation();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    entry.target.classList.add('animated');
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .feature-card,
            .course-card,
            .testimonial-card,
            .blog-card,
            .instructor-card,
            .value-card,
            .diff-item,
            .animate-on-scroll
        `);

        animatedElements.forEach(el => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
            }
            observer.observe(el);
        });
    }

    setupScrollAnimations() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat h3, .impact-stat h3, .stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const suffix = element.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    }

    setupTextReveal() {
        const textElements = document.querySelectorAll('.text-reveal');
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        });

        textElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = text.split('').map(char => 
                char === ' ' ? ' ' : `<span>${char}</span>`
            ).join('');
            textObserver.observe(el);
        });
    }

    setupStaggeredAnimations() {
        const staggeredElements = document.querySelectorAll('.stagger-animation');
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            });
        });

        staggeredElements.forEach(el => staggerObserver.observe(el));
    }

    setupPageLoadAnimation() {
        // Add page load animation to main content
        const mainContent = document.querySelector('main, .container');
        if (mainContent) {
            mainContent.classList.add('page-load');
        }
    }
}

// Load More Functionality
class LoadMoreManager {
    constructor() {
        this.loadMoreBtn = document.getElementById('load-more');
        this.loadMoreArticlesBtn = document.getElementById('load-more-articles');
        this.init();
    }

    init() {
        this.loadMoreBtn?.addEventListener('click', () => this.loadMoreCourses());
        this.loadMoreArticlesBtn?.addEventListener('click', () => this.loadMoreArticles());
    }

    loadMoreCourses() {
        // Simulate loading more courses
        this.loadMoreBtn.textContent = 'Loading...';
        this.loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            this.loadMoreBtn.textContent = 'Load More Courses';
            this.loadMoreBtn.disabled = false;
            this.showMessage('More courses loaded!', 'success');
        }, 1000);
    }

    loadMoreArticles() {
        // Simulate loading more articles
        this.loadMoreArticlesBtn.textContent = 'Loading...';
        this.loadMoreArticlesBtn.disabled = true;
        
        setTimeout(() => {
            this.loadMoreArticlesBtn.textContent = 'Load More Articles';
            this.loadMoreArticlesBtn.disabled = false;
            this.showMessage('More articles loaded!', 'success');
        }, 1000);
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4ade80' : '#ef4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease forwards;
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// Course Enrollment
class EnrollmentManager {
    constructor() {
        this.enrollButtons = document.querySelectorAll('.btn-primary');
        this.init();
    }

    init() {
        this.enrollButtons.forEach(btn => {
            if (btn.textContent.includes('Enroll')) {
                btn.addEventListener('click', (e) => this.handleEnrollment(e));
            }
        });
    }

    handleEnrollment(e) {
        e.preventDefault();
        const courseTitle = e.target.closest('.course-card')?.querySelector('h3')?.textContent || 'this course';
        
        // Create modal or redirect to enrollment page
        this.showEnrollmentModal(courseTitle);
    }

    showEnrollmentModal(courseTitle) {
        const modal = document.createElement('div');
        modal.className = 'enrollment-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease forwards;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--bg-color);
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            color: var(--text-color);
            animation: slideInUp 0.3s ease forwards;
        `;

        modalContent.innerHTML = `
            <h3>Enroll in ${courseTitle}</h3>
            <p>Ready to start your learning journey? This course includes:</p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li>✓ Lifetime access to course materials</li>
                <li>✓ Certificate of completion</li>
                <li>✓ 1-on-1 mentor support</li>
                <li>✓ Access to private community</li>
                <li>✓ 30-day money-back guarantee</li>
            </ul>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button class="btn btn-primary" onclick="this.closest('.enrollment-modal').remove()">Enroll Now</button>
                <button class="btn btn-outline" onclick="this.closest('.enrollment-modal').remove()">Cancel</button>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Toast Notification System
class ToastManager {
    constructor() {
        this.toastContainer = this.createToastContainer();
    }

    createToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas ${this.getIcon(type)}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

// Enhanced Interactions Manager
class InteractionManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupRippleEffect();
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupKeyboardNavigation();
    }

    setupRippleEffect() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn, .card, .nav-link');
            if (button) {
                this.createRipple(e, button);
            }
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupHoverEffects() {
        // Add magnetic effect to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    setupClickEffects() {
        // Add click feedback to interactive elements
        document.querySelectorAll('.btn, .card, .nav-link').forEach(element => {
            element.addEventListener('mousedown', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('mouseup', () => {
                element.style.transform = '';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Smooth Scrolling
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    [data-color-scheme="dark"] .navbar.scrolled {
        background: rgba(15, 23, 42, 0.95) !important;
    }

    .nav-menu.active {
        left: 0 !important;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    /* Keyboard navigation styles */
    .keyboard-navigation *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
    }

    /* Loading states */
    .loading {
        pointer-events: none;
        opacity: 0.7;
    }

    /* Enhanced focus states */
    .btn:focus-visible,
    .nav-link:focus-visible,
    .card:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new CourseFilterManager();
    new FAQManager();
    new FormManager();
    new AnimationManager();
    new LoadMoreManager();
    new EnrollmentManager();
    new SmoothScrollManager();
    new ToastManager();
    new InteractionManager();
    new ChatBubbleManager();
    
    // Add page load animation
    document.body.classList.add('page-load');
    
    // Show welcome toast
    setTimeout(() => {
        if (window.toastManager) {
            window.toastManager.show('Welcome to SkillForge! 🎉', 'success', 3000);
        }
    }, 1000);
});

// Chat Bubble Management
class ChatBubbleManager {
    constructor() {
        this.chatOpenBtn = document.getElementById('chat-open-btn');
        this.chatBubble = document.getElementById('chat-bubble');
        this.chatCloseBtn = document.getElementById('chat-close-btn');
        this.chatForm = document.getElementById('chat-form');
        this.chatInput = document.getElementById('chat-input');
        this.chatMessages = document.getElementById('chat-messages');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.chatOpenBtn?.addEventListener('click', () => this.toggleChat());
        this.chatCloseBtn?.addEventListener('click', () => this.closeChat());
        this.chatForm?.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatBubble.contains(e.target) && !this.chatOpenBtn.contains(e.target)) {
                this.closeChat();
            }
        });

        // Handle Enter key in input
        this.chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit(e);
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.chatBubble?.classList.remove('chat-bubble-closed');
        this.isOpen = true;
        this.chatInput?.focus();
        
        // Update button icon
        const icon = this.chatOpenBtn?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-times';
        }
    }

    closeChat() {
        this.chatBubble?.classList.add('chat-bubble-closed');
        this.isOpen = false;
        
        // Update button icon
        const icon = this.chatOpenBtn?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-comments';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const message = this.chatInput?.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        const typingMsg = this.addMessage('Typing...', 'bot');
        typingMsg.classList.add('typing');

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            
            // Remove typing indicator
            typingMsg.remove();
            
            // Add bot response
            this.addMessage(data.reply, 'bot');
        } catch (error) {
            console.error('Error:', error);
            typingMsg.remove();
            this.addMessage('⚠ Error connecting to server. Please try again.', 'bot');
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', `${sender}-message`);
        messageDiv.textContent = text;
        
        this.chatMessages?.appendChild(messageDiv);
        this.scrollToBottom();
        
        return messageDiv;
    }

    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }
}

// Make toast manager globally available
window.toastManager = new ToastManager();

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page is visible, resume animations if needed
        document.querySelectorAll('.paused').forEach(el => {
            el.classList.remove('paused');
        });
    } else {
        // Page is hidden, pause animations to save resources
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.classList.add('paused');
        });
    }
});

// Performance optimization
window.addEventListener('load', () => {
    // Remove loading states
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
    
    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Optionally send error to analytics service
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        CourseFilterManager,
        FAQManager,
        FormManager,
        AnimationManager,
        LoadMoreManager,
        EnrollmentManager,
        SmoothScrollManager
    };
}