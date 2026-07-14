// Thomas Marshal Portfolio — App JS
// Handles nav scroll, animations, link verification, and interactivity

document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // 1. STICKY NAV: add shadow/bg on scroll
    // =============================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.background = 'rgba(5, 7, 15, 0.96)';
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
        } else {
            header.style.background = 'rgba(5, 7, 15, 0.75)';
            header.style.boxShadow = 'none';
        }
    });

    // =============================================
    // 2. ACTIVE NAV LINK on scroll
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#60a5fa';
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);

    // =============================================
    // 3. SCROLL REVEAL ANIMATION (all sections)
    // =============================================
    const revealElements = document.querySelectorAll(
        '.project-card, .skill-card, .cred-card, .contact-item-row, .hero-stats, .stat'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 60);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.04}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`;
        revealObserver.observe(el);
    });

    // =============================================
    // 4. MOUSE-TRACK GLOW on project cards
    // =============================================
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // =============================================
    // 5. SMOOTH SCROLL for all anchor links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =============================================
    // 6. LINK HEALTH CHECK (console warning only)
    // =============================================
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href === '') {
            console.warn('⚠️ Empty or broken external link detected:', link);
            link.style.opacity = '0.5';
            link.title = 'Link unavailable';
        }
    });

    console.log(`✅ Thomas Marshal Portfolio loaded. ${externalLinks.length} external links found.`);
});
