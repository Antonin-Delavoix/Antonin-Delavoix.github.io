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
    const MAX_SUBMISSIONS = 3;
    const COOLDOWN_HOURS = 24;

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Vérifier le nombre d'envois
            const submissionData = getSubmissionData();

            if (submissionData.count >= MAX_SUBMISSIONS) {
                e.preventDefault();
                const hoursLeft = Math.ceil((COOLDOWN_HOURS * 60 * 60 * 1000 - (Date.now() - submissionData.firstSubmission)) / (60 * 60 * 1000));
                showFormStatus(`Limite d'envois atteinte (${MAX_SUBMISSIONS} max). Réessayez dans ${hoursLeft}h.`, 'error');
                return;
            }

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

            // Enregistrer la soumission
            recordSubmission();

            // Si tout est OK, le formulaire sera soumis à FormSubmit
            showFormStatus('Envoi en cours...', 'success');
        });
    }

    // Gestion du compteur d'envois
    function getSubmissionData() {
        const data = localStorage.getItem('formSubmissions');
        if (!data) {
            return { count: 0, firstSubmission: null };
        }

        const parsed = JSON.parse(data);
        const timeSinceFirst = Date.now() - parsed.firstSubmission;
        const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;

        // Réinitialiser si le délai est dépassé
        if (timeSinceFirst > cooldownMs) {
            localStorage.removeItem('formSubmissions');
            return { count: 0, firstSubmission: null };
        }

        return parsed;
    }

    function recordSubmission() {
        const data = getSubmissionData();
        const newData = {
            count: data.count + 1,
            firstSubmission: data.firstSubmission || Date.now()
        };
        localStorage.setItem('formSubmissions', JSON.stringify(newData));
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
