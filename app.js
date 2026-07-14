/* ============================================
   TJMM Portfolio 2026 — App JS
   Cursor spotlight | Nav scroll | Reveal on scroll
   ============================================ */

// ===== CURSOR SPOTLIGHT =====
const spotlight = document.getElementById('spotlight');
document.addEventListener('mousemove', e => {
    spotlight.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
});

// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.style.padding = '0.5rem 2rem';
    } else {
        nav.style.padding = '1rem 2rem';
    }
}, { passive: true });

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (match) match.classList.add('active');
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.bento-card, .skill-block, .cred-row, .contact-row, .stat-card, .resume-card, .lang-card');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ===== BENTO CARD TILT (subtle 3D) =====
document.querySelectorAll('a.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
});

// ===== ACTIVE NAV LINK STYLE =====
const style = document.createElement('style');
style.textContent = `.nav-links a.active { background: rgba(167,139,250,0.1); color: #f8fafc; }`;
document.head.appendChild(style);

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
