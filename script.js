/**
 * Synthetix - Core Interactions
 * Minimal, modern JS for premium interactions and scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: trigger counter if it contains counters
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    runCounters(counters);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Number Counter Animation
    function runCounters(counters) {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            // Speed of counting (higher = slower)
            const speed = 200;

            const updateCounter = () => {
                const c = +counter.innerText;
                // Determine increment step
                const increment = target / speed;

                if (c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    // Use Bootstrap's Collapse API
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    // 5. Form Submit Frontend Simulation
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            // Show loading state
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulate network delay
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.disabled = false;

                // Show message container
                formMessage.classList.remove('d-none');

                // Success state
                btn.innerHTML = '<i class="ph-fill ph-check-circle me-2"></i> Inquiry Sent';
                btn.classList.replace('btn-glow', 'btn-success');

                formMessage.innerHTML = `<span class="text-success">Inquiry Sent Successfully! We will get back to you shortly.</span>`;
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.replace('btn-success', 'btn-glow');
                    formMessage.classList.add('d-none');
                }, 4000);
            }, 1500);
        });
    }
});
