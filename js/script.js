// JS Feature 1: Mobile Navigation Toggle
function setupMobileMenu() {
    // 1. Get references to the button and the navigation menu
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // 2. Event Listener: Listen for a click on the button
    menuToggle.addEventListener('click', () => {
        // 3. Toggle the 'open' class on the navigation menu
        // This class is what controls the display in CSS (display: block/none)
        mainNav.classList.toggle('open');
        
        // CRITERIA 5: Accessibility enhancement (ARIA attributes)
        const isExpanded = mainNav.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Change the button text/icon based on state
        menuToggle.textContent = isExpanded ? '✕' : '☰';
    });
    
    // Optional: Close menu when a link is clicked (useful for smooth scrolling)
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            }
        });
    });
}

// CRITERIA 3: Modular Code - Call the function to initialize the feature
document.addEventListener('DOMContentLoaded', setupMobileMenu);


// JS Feature 7: Dynamic Footer Year (Adding this now as it's simple)
function setDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    // Ensure the element exists before trying to update it
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
document.addEventListener('DOMContentLoaded', setDynamicYear);
// We now have 2/7 required JS features implemented!

// JS Feature 4: Project Filtering
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        // CRITERIA 3: Meaningful comments for complex logic
        button.addEventListener('click', function() {
            // 1. Get the filter value (e.g., 'web', 'mobile', 'all')
            const filterValue = this.getAttribute('data-filter');

            // 2. Update button active state (visual feedback)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 3. Iterate over all project cards
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Check if the card should be shown or hidden
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show the card (using opacity/visibility for smoother transition later if desired)
                    card.style.display = 'block'; 
                    // Optional: You could add a class here and use CSS for smooth fading
                } else {
                    // Hide the card
                    card.style.display = 'none';
                }
            });
        });
    });
}

// CRITERIA 3: Modular Code - Call the new function to initialize the feature
document.addEventListener('DOMContentLoaded', setupProjectFiltering);
// We now have 3/7 required JS features implemented!