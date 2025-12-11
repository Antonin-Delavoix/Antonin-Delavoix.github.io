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

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Validation basique avant envoi
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                showFormStatus('Veuillez remplir tous les champs.', 'error');
                return;
            }

            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showFormStatus('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Si tout est OK, le formulaire sera soumis à FormSubmit
            showFormStatus('Envoi en cours...', 'success');
        });
    }

    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;

            // Masquer le message après 5 secondes (sauf pour "envoi en cours")
            if (message !== 'Envoi en cours...') {
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        }
    }
});

// Helper for scroll effects
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    header.classList.toggle('sticky', window.scrollY > 0);
});
