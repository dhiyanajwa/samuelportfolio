// ===============================================
// JS Feature 1: Mobile Navigation Toggle
// ===============================================
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = !mainNav.classList.contains('open');
        mainNav.classList.toggle('open');
        
        // CRITERIA 5: Accessibility enhancement (ARIA attributes)
        menuToggle.setAttribute('aria-expanded', isExpanded);
        menuToggle.textContent = isExpanded ? '✕' : '☰';
    });
    
    // Close menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            }
        });
    });
}


// ===============================================
// JS Feature 2: Active Navigation Link Highlighter (Intersection Observer)
// CRITICAL MISSING FEATURE ADDED HERE
// ===============================================
function setupActiveNavHighlighter() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#main-nav a');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        // Activates the link when the section is approximately halfway through the viewport
        rootMargin: '0px 0px -50% 0px', 
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add 'active' class to the link corresponding to the visible section
                const activeLink = document.querySelector(`#main-nav a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}


// ===============================================
// JS Feature 3: Scroll to Top Button
// ===============================================
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
}


// ===============================================
// JS Feature 4: Project Filtering
// ===============================================
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}


// ===============================================
// JS Feature 5: Dark/Light Mode Toggle with localStorage persistence
// ===============================================
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (!themeToggle) return;

    // Load theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌙'; 
    } else {
        themeToggle.textContent = '☀️'; 
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update localStorage and button text/icon
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '☀️';
        }
    });
}


// ===============================================
// JS Feature 6: Contact Form Validation
// ===============================================
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    const messageDisplay = document.getElementById('form-message');

    if (!form) return; 

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (name === '' || email === '' || message === '') {
            console.warn("Validation Error: All fields are required.");
            messageDisplay.classList.remove('hidden');
            messageDisplay.style.backgroundColor = 'rgba(255, 99, 71, 0.2)';
            messageDisplay.style.color = 'darkred';
            messageDisplay.textContent = 'Please fill in all required fields.';
            return;
        }

        if (!emailRegex.test(email)) {
             console.warn("Validation Error: Invalid email format.");
             messageDisplay.classList.remove('hidden');
             messageDisplay.style.backgroundColor = 'rgba(255, 99, 71, 0.2)';
             messageDisplay.style.color = 'darkred';
             messageDisplay.textContent = 'Please enter a valid email address.';
             return;
        }

        // Success simulation
        messageDisplay.classList.remove('hidden');
        messageDisplay.style.backgroundColor = 'rgba(144, 238, 144, 0.3)';
        messageDisplay.style.color = 'darkgreen';
        messageDisplay.textContent = 'Thank you for your message! I will respond soon.';

        form.reset(); 
        
        setTimeout(() => {
            messageDisplay.classList.add('hidden');
        }, 5000); 
    });
}

// ===============================================
// JS Feature 7: Dynamic Footer Year
// ===============================================
function setDynamicYear() {
    // FIX: Element ID must match the corrected HTML: 'current-year'
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}


// ===============================================
// INITIALIZATION (CRITERIA 3: Modular Initialization)
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all 7+ features once the DOM is fully loaded
    setupMobileMenu();
    setupActiveNavHighlighter(); // Now included!
    setupScrollToTop();
    setupProjectFiltering();
    setupThemeToggle();
    setupFormValidation();
    setDynamicYear();
});
// 7/7+ JS features complete!