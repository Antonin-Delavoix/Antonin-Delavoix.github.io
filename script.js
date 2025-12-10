document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuSrc = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuSrc && navMenu) {
        mobileMenuSrc.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuSrc.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuSrc.classList.remove('active');
        }));
    }

    // Scroll Animation (Fade In)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.section, .hero, .skill-card, .timeline-item');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Add some dynamic typing effect simple fallback or enhancement?
    // Kept simple for now as requested in plan.
});

// Helper for scroll effects
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    header.classList.toggle('sticky', window.scrollY > 0);
});
